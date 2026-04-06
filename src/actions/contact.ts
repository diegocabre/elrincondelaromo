"use server";

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Correo principal de la administradora de la página
const ADMIN_EMAIL = 'contacto@rincondelaromo.com'; 

export async function submitContactAction(formData: FormData) {
  const name = formData.get('nombre') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('asunto') as string;
  const message = formData.get('mensaje') as string;

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Por favor, completa todos los campos requeridos.' };
  }

  // Si no hay API KEY, devolvemos success pero avisamos por consola
  if (!resend) {
    console.warn("Falta RESEND_API_KEY en variables de entorno. La data de contacto recibida fue:", { name, email, subject, message });
    return { success: true, message: `Mensaje recibido. (Nota: Modo simulado, el servidor aún no tiene clave de envíos).` };
  }

  try {
    // 1. Enviar comprobante automático al CLIENTE (persona que consultó)
    await resend.emails.send({
      from: 'Rincón del Aromo <noreply@rincondelaromo.com>', // Solo si has verificado tu dominio en Resend. Si no tienes dominio verificado, Resend usa un dominio genérico como "onboarding@resend.dev" sólo para pruebas a la cuenta validada.
      // IMPORTANTE: En el Plan "Free" sin verificar un dominio propio (DNS), Resend SÓLO enviará a la dirección donde te registraste en Resend.
      to: email,
      subject: 'Hemos recibido tu mensaje - Rincón del Aromo',
      html: `
        <div style="font-family: sans-serif; color: #4A3B32; line-height: 1.6;">
          <h2 style="color: #8B5E3C;">¡Hola, ${name}!</h2>
          <p>Hemos recibido tu mensaje respecto a <strong>${subject}</strong>.</p>
          <p>Te responderemos lo más pronto posible a este correo.</p>
          <br/>
          <p>Tu mensaje fue:</p>
          <blockquote style="border-left: 4px solid #EACCA4; padding-left: 14px; color: #6B5A4E; font-style: italic;">
             ${message}
          </blockquote>
          <br/>
          <p>Saludos afectuosos,<br/><strong>Equipo del Rincón del Aromo</strong></p>
        </div>
      `,
    });

    // 2. Enviar la alerta interna a la ADMINISTRADORA para que actúe
    await resend.emails.send({
      from: 'Notificaciones Web <noreply@rincondelaromo.com>', // Ideal reemplazar con el generico si no hay dominio verificado
      to: ADMIN_EMAIL, 
      subject: `Nuevo Mensaje Web: ${subject} - de ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #4A3B32;">
          <h2 style="color: #8B5E3C;">Tienes un nuevo contacto desde la Página Web</h2>
          <p><strong>Emisor:</strong> ${name}</p>
          <p><strong>Email para responderle:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Asunto / Motivo:</strong> ${subject}</p>
          <div style="background-color: #FAEDDF; padding: 20px; border-radius: 8px; margin-top: 10px;">
            ${message}
          </div>
        </div>
      `,
    });

    return { success: true, message: '¡Tu mensaje ha sido enviado exitosamente! Nos contactaremos pronto contigo.' };
  } catch (error) {
    console.error("Error al enviar desde Resend:", error);
    return { success: false, error: 'Hubo un inconveniente con nuestro servidor de correos. Intenta más tarde.' };
  }
}
