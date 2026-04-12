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
    const { error: clientError } = await resend.emails.send({
      from: 'Rincón del Aromo <noreply@rincondelaromo.com>', // Requiere que rincondelaromo.com esté verificado en Resend
      to: email,
      subject: 'Hemos recibido tu mensaje - Rincón del Aromo',
      html: `
        <div style="font-family: sans-serif; color: #4A3B32; line-height: 1.6; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #FDFCF8; text-align: center; padding: 30px 20px; border-bottom: 1px solid #EACCA4;">
            <img src="https://rincondelaromo.com/assets/img/LOGO.png" alt="Rincón del Aromo Logo" style="max-width: 180px; height: auto;" />
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #8B5E3C; margin-top: 0;">¡Hola, ${name}!</h2>
            <p>Hemos recibido tu mensaje respecto a <strong>${subject}</strong>.</p>
            <p>Te responderemos lo más pronto posible a este correo.</p>
            <br/>
            <p>Tu mensaje fue:</p>
            <blockquote style="border-left: 4px solid #EACCA4; padding-left: 14px; color: #6B5A4E; font-style: italic; background-color: #FAEDDF; padding: 15px; border-radius: 4px;">
               ${message}
            </blockquote>
            <br/>
            <p style="margin-bottom: 0;">Saludos afectuosos,<br/><strong style="color: #8B5E3C;">Equipo del Rincón del Aromo</strong></p>
          </div>
        </div>
      `,
    });

    if (clientError) {
      console.error("Error al enviar comprobante al cliente:", clientError);
      // Fallback
    }

    // 2. Enviar la alerta interna a la ADMINISTRADORA para que actúe
    const { error: adminError } = await resend.emails.send({
      from: 'Notificaciones Web <noreply@rincondelaromo.com>', 
      to: ADMIN_EMAIL, 
      subject: `Nuevo Mensaje Web: ${subject} - de ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #FDFCF8; text-align: center; padding: 20px; border-bottom: 1px solid #EACCA4;">
            <img src="https://rincondelaromo.com/assets/img/LOGO.png" alt="Rincón del Aromo Logo" style="max-width: 150px; height: auto;" />
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #8B5E3C; margin-top: 0;">¡Nuevo contacto desde la web!</h2>
            <p><strong>Emisor:</strong> ${name}</p>
            <p><strong>Email para responderle:</strong> <a href="mailto:${email}" style="color: #8B5E3C;">${email}</a></p>
            <p><strong>Asunto / Motivo:</strong> ${subject}</p>
            <div style="background-color: #FAEDDF; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #8B5E3C;">
              ${message}
            </div>
          </div>
        </div>
      `,
    });

    if (adminError) {
      console.error("Error al enviar alerta a administradora:", adminError);
      return { success: false, error: 'Hubo un inconveniente con nuestro servidor de correos (Error interno). Intenta más tarde.' };
    }

    return { success: true, message: '¡Tu mensaje ha sido enviado exitosamente! Nos contactaremos pronto contigo.' };
  } catch (error) {
    console.error("Error crítico al enviar desde Resend:", error);
    return { success: false, error: 'Hubo un inconveniente crítico con nuestro servidor de correos. Intenta más tarde.' };
  }
}

