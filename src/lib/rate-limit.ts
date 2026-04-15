/**
 * rate-limit.ts
 * ---------------
 * Rate limiting en memoria por IP para Server Actions.
 * Limita a MAX_REQUESTS envíos por IP dentro de WINDOW_MS.
 *
 * Nota: En Vercel serverless la memoria se reinicia entre instancias frias,
 * pero combinado con honeypot + spam-filter cubre la gran mayoría de ataques.
 */

const MAX_REQUESTS = 3;          // Máximo de envíos permitidos
const WINDOW_MS = 10 * 60 * 1000; // Ventana de tiempo: 10 minutos

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

// Map global que persiste mientras la instancia serverless está caliente
const store = new Map<string, RateLimitEntry>();

/**
 * Verifica y registra un intento de envío desde una IP dada.
 * @returns { allowed: boolean, remaining: number }
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.firstRequest > WINDOW_MS) {
    // Primera solicitud o ventana expirada → reiniciar contador
    store.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    // Límite alcanzado
    return { allowed: false, remaining: 0 };
  }

  // Incrementar contador
  entry.count++;
  store.set(ip, entry);
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

/**
 * Extrae la IP del cliente desde los headers de la petición de Next.js.
 * Compatible con Vercel (x-forwarded-for) y localhost.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for puede tener múltiples IPs separadas por coma; tomar la primera
    return forwarded.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || 'unknown';
}
