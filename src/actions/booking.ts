"use server";

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { headers } from 'next/headers';
import { isLikelySpam } from '@/lib/spam-filter';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const ADMIN_EMAIL = 'contacto@rincondelaromo.com';

export async function createBookingAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const selectedService = formData.get('selectedService') as string;
  const selectedDate = formData.get('selectedDate') as string;
  const selectedTime = formData.get('selectedTime') as string;
  const isoDate = formData.get('isoDate') as string;
  // Campos de seguridad
  const honeypot = formData.get('website') as string;
  const formTime = formData.get('_ft') as string;

  // --- SEGURIDAD: Honeypot ---
  // Campo invisible que solo los bots rellenan
  if (honeypot) {
    console.warn('[SPAM] Honeypot activado en booking. IP probable bot.');
    // Devolvemos "éxito" falso para no alertar al bot
    return { success: true, message: `¡Cita agendada para ${name}! Nos contactaremos contigo al email ${email} para confirmar los detalles.` };
  }

  if (!name || !email || !selectedService || !isoDate) {
    return { success: false, error: 'Por favor, completa todos los campos para agendar.' };
  }

  // --- SEGURIDAD: Rate Limiting por IP ---
  const reqHeaders = await headers();
  const ip = getClientIp(reqHeaders);
  const rateCheck = checkRateLimit(`booking:${ip}`);
  if (!rateCheck.allowed) {
    console.warn(`[SPAM] Rate limit excedido para IP: ${ip} en formulario de agenda.`);
    return { success: false, error: 'Has enviado demasiadas solicitudes en poco tiempo. Por favor, espera unos minutos antes de intentar de nuevo.' };
  }

  // --- SEGURIDAD: Filtro de contenido inteligente ---
  // En booking no hay mensaje, solo validamos nombre y email
  const spamCheck = isLikelySpam(name, email, undefined, formTime);
  if (spamCheck.spam) {
    console.warn(`[SPAM] Detectado en booking. Razón: ${spamCheck.reason} | IP: ${ip} | Nombre: ${name}`);
    return { success: false, error: 'Los datos ingresados no son válidos. Por favor revísalos e intenta de nuevo.' };
  }

  // Se usa directamente el ISO date exacto del cupo para evitar errores de parseo por zonas o idiomas
  const finalDateTime = isoDate;

  try {
    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          service: selectedService,
          date: finalDateTime,
          name: name,
          email: email,
        }
      ]);

    if (error) {
      console.error("Error BD:", error);
      return { success: false, error: 'Error del servidor al intentar guardar tu reserva. Vuelve a intentar.' };
    }

    // DISPARO DE CORREOS AUTOMÁTICOS
    if (resend) {
      try {
        // Fechas para google calendar (asume cita de 1 hora aprox)
        const start = new Date(finalDateTime);
        const end = new Date(start.getTime() + 60 * 60 * 1000); 
        const formatDateForCal = (d: Date) => d.toISOString().replace(/-|:|\\.\\d\\d\\d/g, '');
        const calDates = `${formatDateForCal(start)}/${formatDateForCal(end)}`;
        const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cita+en+Rincón+del+Aromo+-+${encodeURIComponent(selectedService)}&details=Cita+para+${encodeURIComponent(name)}+en+Rincón+del+Aromo.&dates=${calDates}`;

        // 1. Correo al cliente confirmando la cita
        await resend.emails.send({
          from: 'Rincón del Aromo <noreply@rincondelaromo.com>',
          to: email,
          subject: 'Confirmación de Cita - Rincón del Aromo',
          html: `
            <div style="font-family: sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
              <div style="background-color: #FDFCF8; text-align: center; padding: 25px 20px; border-bottom: 1px solid #EACCA4;">
                <img src="https://rincondelaromo.com/assets/img/LOGO.png" alt="Rincón del Aromo Logo" style="max-width: 160px; height: auto;" />
              </div>
              <div style="padding: 30px;">
                <h2 style="color: #8B5E3C; margin-top: 0;">Reserva Exitosa</h2>
                <p>Hola <strong>${name}</strong>,</p>
                <p>Tu cita para <strong>${selectedService}</strong> ha quedado pre-agendada en nuestro sistema. Nos comunicaremos contigo prontamente para confirmar validaciones adicionales o pagos.</p>
                <div style="background-color: #FAEDDF; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #8B5E3C;">
                  <p style="margin: 0;"><strong>Fecha reservada:</strong> ${selectedDate} a las ${selectedTime}</p>
                </div>
                <div style="margin-top: 25px; text-align: center;">
                  <a href="${calUrl}" target="_blank" style="display: inline-block; background-color: #8B5E3C; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">
                    📅 Añadir a Google Calendar
                  </a>
                </div>
                <p style="margin-top: 30px; margin-bottom: 0;">Saludos,<br/><strong style="color: #8B5E3C;">Equipo Rincón del Aromo</strong></p>
              </div>
            </div>
          `,
        });

        // 2. Correo al Administrador
        await resend.emails.send({
          from: 'Notificaciones Web <noreply@rincondelaromo.com>',
          to: ADMIN_EMAIL,
          subject: `NUEVA RESERVA: ${selectedService} - ${name}`,
          html: `
            <div style="font-family: sans-serif; color: #4A3B32;">
              <h2 style="color: #8B5E3C;">Se ha agendado una nueva cita</h2>
              <p><strong>Cliente:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Servicio:</strong> ${selectedService}</p>
              <p><strong>Fecha agendada:</strong> ${selectedDate} a las ${selectedTime}</p>
              <hr style="margin:20px 0; border:1px solid #EACCA4;" />
              <p>Por favor ingresa al <a href="https://tudominio.com/admin/login">Panel de Administración</a> para gestionar la atención médica / reserva en la BD.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Los errores de email no deben bloquear el mensaje de éxito base de la db
        console.error("Error enviando Resend Booking", emailErr);
      }
    }

    return { 
        success: true, 
        message: `¡Cita agendada para ${name}! Nos contactaremos contigo al email ${email} para confirmar los detalles.` 
    };
  } catch (e) {
    console.error("Error Exception Booking:", e);
    return { success: false, error: "Hubo un error de conexión inesperado. Intenta de nuevo." };
  }
}
