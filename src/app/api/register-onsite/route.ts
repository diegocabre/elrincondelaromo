import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { item, payer } = body;

        // 1. Guardar en Supabase directamente como 'confirmado' para pago en sitio
        const { data: registration, error: dbError } = await supabase
            .from('workshop_registrations')
            .insert([{
                workshop_id: item.id,
                student_name: payer?.name || "",
                student_surname: payer?.surname || "",
                student_email: payer?.email || "",
                student_phone: payer?.phone || "",
                status: 'confirmado',
                preference_id: 'pago_sitio' // Identificador especial
            }])
            .select("*, workshops(title, date_info)")
            .single();

        if (dbError || !registration) {
            console.error("Error guardando inscripción en BD:", dbError);
            return NextResponse.json({ error: "No se pudo crear el registro en la base de datos" }, { status: 500 });
        }

        // 2. Enviar correo de confirmación con Resend
        if (resend) {
            const workshopTitle = registration.workshops?.title || item.title || "Taller Médico/Bienestar";
            const workshopDate = registration.workshops?.date_info || item.date_info || "Fecha por definir";
            const userName = `${registration.student_name} ${registration.student_surname}`.trim();
            const userEmail = registration.student_email;

            try {
                // Email al Cliente
                await resend.emails.send({
                    from: "Rincón del Aromo <hola@rincondelaromo.com>",
                    to: userEmail,
                    subject: `Inscripción Confirmada: ${workshopTitle}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
                            <div style="background-color: #FAEDDF; padding: 20px; text-align: center; border-bottom: 2px solid #8B5E3C;">
                                <h1 style="color: #8B5E3C; margin: 0;">¡Inscripción Exitosa!</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff;">
                                <p style="font-size: 16px;">Hola <b>${userName}</b>,</p>
                                <p style="font-size: 16px;">Tu inscripción para el taller ha sido procesada con éxito y tu cupo está reservado.</p>
                                
                                <div style="background-color: #FDFCF8; border-left: 4px solid #8B5E3C; padding: 15px; margin: 25px 0;">
                                    <h3 style="margin-top: 0; color: #4A3B32;">Detalles del Taller</h3>
                                    <p style="margin-bottom: 5px;"><strong>🌟 Taller:</strong> ${workshopTitle}</p>
                                    <p style="margin-bottom: 0;"><strong>📅 Fecha:</strong> ${workshopDate}</p>
                                    <p style="margin-top: 10px; color: #d97706; font-weight: bold;">⚠️ Recuerda que el pago ($${Number(item.price).toLocaleString('es-CL')}) lo realizarás directamente el día del taller con el profesor a cargo.</p>
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

                // Email opcional de Aviso al Administrador
                const adminEmail = process.env.ADMIN_EMAIL;
                if (adminEmail) {
                    await resend.emails.send({
                        from: "Rincón del Aromo (Sistema) <hola@rincondelaromo.com>",
                        to: adminEmail,
                        subject: `NUEVA INSCRIPCIÓN (PAGO EN SITIO): ${userName} a ${workshopTitle}`,
                        html: `
                            <p><strong>NUEVA INSCRIPCIÓN CONFIRMADA (Pago pendiente en Sitio):</strong></p>
                            <ul>
                                <li><strong>Alumno:</strong> ${userName}</li>
                                <li><strong>Email:</strong> ${userEmail}</li>
                                <li><strong>Teléfono:</strong> ${registration.student_phone}</li>
                                <li><strong>Taller:</strong> ${workshopTitle}</li>
                                <li><strong>Monto a cobrar:</strong> $${Number(item.price).toLocaleString('es-CL')}</li>
                            </ul>
                            <p>Recuerda al profesor cobrar el arancel correspondiente el día de su clase.</p>
                        `,
                    });
                }
            } catch (emailError) {
                console.error("Error silenciado al enviar correo:", emailError);
            }
        } else {
            console.warn("No se configuró RESEND_API_KEY, saltando envío de correo.");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        const e = error as Error;
        console.error("Error en registro onsite:", e);
        return NextResponse.json({ error: "No se pudo procesar la solicitud: " + e.message }, { status: 500 });
    }
}
