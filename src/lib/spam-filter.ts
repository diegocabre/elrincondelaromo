/**
 * spam-filter.ts
 * ---------------
 * Utilidades para detectar envíos de formulario sospechosos (bots/phishing).
 * No requiere servicios externos de pago. Corre en el servidor (Server Actions).
 */

import dns from 'dns/promises';

// Dominios de correo desechables conocidos
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', 'guerrillamail.com', 'throwam.com',
  'trashmail.com', 'yopmail.com', 'sharklasers.com', '10minutemail.com',
  'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'mailnull.com',
  'spamgourmet.com', 'getairmail.com', 'spamex.com', 'mailexpire.com',
  'spamfree24.org', 'tempinbox.com', 'spammotel.com', 'notsharingmy.info',
  'mytrashmail.com', 'bouncr.com', 'guerrillamailblock.com',
  'grr.la', 'spam4.me', 'trashmail.at', 'trashmail.io',
  'filzmail.com', 'owlpic.com', 'tempr.email', 'discard.email',
  'spamgob.com', 'mailnesia.com', 'mt2015.com', 'spam.la',
  'tempsky.com', 'throwam.com', 'nwldx.com', 'spamthisplease.com',
]);

/**
 * Detecta si un string luce como texto aleatorio generado por bots.
 * Analiza la proporción de consonantes consecutivas y la mezcla
 * aleatoria de mayúsculas/minúsculas sin patrón humano.
 */
export function isRandomString(text: string): boolean {
  if (!text || text.trim().length === 0) return false;

  const clean = text.trim();

  // Textos muy cortos no se evalúan como aleatorios
  if (clean.length < 6) return false;

  // --- Regla 1: demasiadas consonantes consecutivas sin vocales ---
  const consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
  let maxConsecutiveConsonants = 0;
  let current = 0;
  for (const ch of clean) {
    if (consonants.includes(ch)) {
      current++;
      if (current > maxConsecutiveConsonants) maxConsecutiveConsonants = current;
    } else {
      current = 0;
    }
  }
  // Más de 5 consonantes seguidas es muy inusual en español
  if (maxConsecutiveConsonants >= 5) return true;

  // --- Regla 2: mezcla aleatoria de mayúsculas/minúsculas (CamelCase caótico) ---
  const letters = clean.replace(/[^a-zA-Z]/g, '');
  if (letters.length >= 8) {
    let transitions = 0;
    for (let i = 1; i < letters.length; i++) {
      const prev = letters[i - 1];
      const curr = letters[i];
      const prevUpper = prev === prev.toUpperCase();
      const currUpper = curr === curr.toUpperCase();
      if (prevUpper !== currUpper) transitions++;
    }
    // Si más del 45% de los caracteres tienen transición de caso → aleatorio
    const ratio = transitions / letters.length;
    if (ratio > 0.45) return true;
  }

  // --- Regla 3: ausencia de vocales (ratio muy bajo) ---
  const vowels = (clean.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/g) || []).length;
  const letterCount = letters.length;
  if (letterCount > 8 && vowels / letterCount < 0.10) return true;

  return false;
}

/**
 * Valida que el email no provenga de un dominio desechable conocido.
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

/**
 * Detecta si la parte local del email (antes del @) parece aleatoria.
 * Ej: "nul.ijo.zo.d.79" o "klade" seguido de dominio inventado.
 * Se eliminan puntos y dígitos para evaluar solo las letras.
 */
export function isRandomEmailLocal(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const local = email.split('@')[0];
  // Quitar puntos, guiones y números para evaluar solo las letras
  const lettersOnly = local.replace(/[\d.\-_+]/g, '');
  // Si quedan pocas letras tras quitar separadores, no evaluamos
  if (lettersOnly.length < 5) return false;
  return isRandomString(lettersOnly);
}

/**
 * Verifica que el dominio del email tenga registros MX válidos (acepta correos).
 * Si no tiene MX records, la dirección no puede recibir emails → probable falsa.
 * @returns true si el dominio tiene MX válido, false si no o si ocurre un error.
 */
export async function hasMxRecord(email: string): Promise<boolean> {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  try {
    const records = await dns.resolveMx(domain);
    // Debe haber al menos un registro MX con prioridad válida
    return Array.isArray(records) && records.length > 0;
  } catch {
    // ENOTFOUND, ENODATA, ESERVFAIL → dominio no existe o no acepta correos
    return false;
  }
}

/**
 * Valida que el mensaje tenga contenido real mínimo.
 */
export function isMessageTooShort(message: string, minLength = 10): boolean {
  return (message?.trim().length ?? 0) < minLength;
}

/**
 * Función síncrona: chequeos rápidos que NO requieren llamadas de red.
 * Úsala primero para rechazar spam obvio.
 */
export function isLikelySpam(
  name: string,
  email: string,
  message?: string,
  formTime?: string,
): { spam: boolean; reason: string } {
  // 1. Nombre aleatorio
  if (isRandomString(name)) {
    return { spam: true, reason: 'Nombre detectado como aleatorio (bot).' };
  }

  // 2. Mensaje aleatorio o demasiado corto
  if (message !== undefined) {
    if (isRandomString(message)) {
      return { spam: true, reason: 'Mensaje detectado como aleatorio (bot).' };
    }
    if (isMessageTooShort(message)) {
      return { spam: true, reason: 'Mensaje demasiado corto.' };
    }
  }

  // 3. Email desechable (lista negra)
  if (isDisposableEmail(email)) {
    return { spam: true, reason: 'Dominio de correo desechable.' };
  }

  // 4. Parte local del email aleatoria (ej: nul.ijo.zo.d.79@gmail.com)
  if (isRandomEmailLocal(email)) {
    return { spam: true, reason: 'Dirección de email con patrón aleatorio.' };
  }

  // 5. Tiempo mínimo de llenado (evita bots que envían inmediatamente)
  if (formTime) {
    const loadedAt = parseInt(formTime, 10);
    if (!isNaN(loadedAt)) {
      const elapsed = Date.now() - loadedAt;
      // Menos de 4 segundos = muy improbable que sea humano
      if (elapsed < 4000) {
        return { spam: true, reason: 'Formulario enviado demasiado rápido (bot).' };
      }
    }
  }

  return { spam: false, reason: '' };
}

/**
 * Función asíncrona: valida el email verificando registros DNS MX.
 * Llama a esta función DESPUÉS de isLikelySpam() para evitar consultas DNS innecesarias.
 * @returns { valid: boolean, reason: string }
 */
export async function validateEmailDomain(email: string): Promise<{ valid: boolean; reason: string }> {
  const hasRecords = await hasMxRecord(email);
  if (!hasRecords) {
    return {
      valid: false,
      reason: `El dominio del email no puede recibir correos (sin registros MX).`,
    };
  }
  return { valid: true, reason: '' };
}
