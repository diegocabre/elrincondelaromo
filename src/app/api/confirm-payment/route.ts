import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inicializar Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { external_reference, collection_id, payment_id } = body;

    // Mercado Pago returns either collection_id or payment_id depending on the product
    const mp_tx_id = payment_id || collection_id;

    if (!external_reference) {
      return NextResponse.json(
        { error: "Falta external_reference" },
        { status: 400 },
      );
    }

    // 1. Obtener la inscripción para verificar que existe y qué taller es
    const { data: registration, error: fetchError } = await supabase
      .from("workshop_registrations")
      .select("*, workshops(title, date_info)")
      .eq("id", external_reference)
      .single();

    if (fetchError || !registration) {
      return NextResponse.json(
        { error: "No se encontró la inscripción en BD" },
        { status: 404 },
      );
    }

    // Si ya estaba pagado, no reenviar correo ni hacer nada redundante
    if (registration.status === "pagado") {
      return NextResponse.json({ success: true, message: "Ya estaba pagado" });
    }

    // 2. Actualizar estado a pagado
    const { error: updateError } = await supabase
      .from("workshop_registrations")
      .update({
        status: "pagado",
        preference_id: String(mp_tx_id || registration.preference_id),
      })
      .eq("id", external_reference);

    if (updateError) {
      console.error("Error al actualizar inscripción:", updateError);
      return NextResponse.json(
        { error: "No se pudo actualizar el estado de BD" },
        { status: 500 },
      );
    }

    // 3. Enviar correo de confirmación con Resend
    if (resend) {
      const workshopTitle =
        registration.workshops?.title || "Taller Médico/Bienestar";
      const workshopDate =
        registration.workshops?.date_info || "Fecha por definir";
      const userName =
        `${registration.student_name} ${registration.student_surname}`.trim();
      const userEmail = registration.student_email;

      try {
        // Email al Cliente
        await resend.emails.send({
          from: "Rincón del Aromo <hola@rincondelaromo.com>",
          to: userEmail,
          subject: `Confirmación de Inscripción: ${workshopTitle}`,
          html: `
                        <div style="font-family: Arial, sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
                            <div style="background-color: #FAEDDF; padding: 20px; text-align: center; border-bottom: 2px solid #8B5E3C;">
                                <h1 style="color: #8B5E3C; margin: 0;">¡Inscripción Exitosa!</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff;">
                                <p style="font-size: 16px;">Hola <b>${userName}</b>,</p>
                                <p style="font-size: 16px;">Tu inscripción y pago para el taller han sido confirmados exitosamente.</p>
                                
                                <div style="background-color: #FDFCF8; border-left: 4px solid #8B5E3C; padding: 15px; margin: 25px 0;">
                                    <h3 style="margin-top: 0; color: #4A3B32;">Detalles del Taller</h3>
                                    <p style="margin-bottom: 5px;"><strong>🌟 Taller:</strong> ${workshopTitle}</p>
                                    <p style="margin-bottom: 0;"><strong>📅 Fecha:</strong> ${workshopDate}</p>
                                </div>
                                
                                <p style="font-size: 16px;">Nos alegra mucho contar con tu presencia. Te sugerimos llegar con unos 10 minutos de anticipación.</p>
                                <p style="font-size: 16px;">Si tienes alguna duda técnica o de la ubicación, contáctanos respondiendo a este correo o vía WhatsApp al número del centro.</p>
                                
                                <br/>
                                <p style="font-size: 14px; color: #666; margin-bottom: 0;">Con cariño,</p>
                                <p style="font-size: 16px; font-weight: bold; color: #8B5E3C; margin-top: 5px;">Rincón del Aromo</p>
                            </div>
                        </div>
                    `,
        });

        // Email opcional de Aviso al Administrador (Copia)
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
          await resend.emails.send({
            from: "Rincón del Aromo (Sistema) <hola@rincondelaromo.com>",
            to: adminEmail,
            subject: `NUEVO PAGO: ${userName} se inscribió a ${workshopTitle}`,
            html: `
                            <p><strong>NUEVO PAGO APROBADO:</strong></p>
                            <ul>
                                <li><strong>Alumno:</strong> ${userName}</li>
                                <li><strong>Email:</strong> ${userEmail}</li>
                                <li><strong>Teléfono:</strong> ${registration.student_phone}</li>
                                <li><strong>Taller:</strong> ${workshopTitle}</li>
                                <li><strong>Mercado Pago ID:</strong> ${mp_tx_id}</li>
                            </ul>
                        `,
          });
        }
      } catch (emailError) {
        console.error("Error silenciado al enviar correo:", emailError);
        // No retornamos error HTTP porque el pago igual fue exitoso
      }
    } else {
      console.warn("No se configuró RESEND_API_KEY, saltando envío de correo.");
    }

    return NextResponse.json({
      success: true,
      message: "Pago confirmado exitosamente.",
    });
  } catch (error) {
    const e = error as Error;
    console.error("Error fatal en /api/confirm-payment:", e);
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al procesar el retorno" },
      { status: 500 },
    );
  }
}
