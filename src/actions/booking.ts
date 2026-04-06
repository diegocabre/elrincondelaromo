"use server";

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

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

  if (!name || !email || !selectedService || !isoDate) {
    return { success: false, error: 'Por favor, completa todos los campos para agendar.' };
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
        // 1. Correo al cliente confirmando la cita
        await resend.emails.send({
          from: 'Rincón del Aromo <noreply@rincondelaromo.com>',
          to: email,
          subject: 'Confirmación de Cita - Rincón del Aromo',
          html: `
            <div style="font-family: sans-serif; color: #4A3B32;">
              <h2 style="color: #8B5E3C;">Reserva Exitosa</h2>
              <p>Hola <strong>${name}</strong>,</p>
              <p>Tu cita para <strong>${selectedService}</strong> ha quedado pre-agendada en nuestro sistema. Nos comunicaremos contigo prontamente para confirmar validaciones adicionales o pagos.</p>
              <div style="background-color: #FAEDDF; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p><strong>Fecha reservada:</strong> ${selectedDate} a las ${selectedTime}</p>
              </div>
              <p style="margin-top:20px;">Saludos,<br/>Equipo Rincón del Aromo</p>
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
