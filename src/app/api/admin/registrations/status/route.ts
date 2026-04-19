import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { regId, action } = body; // action can be 'pagado' or 'rechazado'

        if (!regId || !action) {
            return NextResponse.json({ error: "Datos insuficientes (regId, action)" }, { status: 400 });
        }

        // Obtener datos del alumno y taller antes de modificar
        const { data: registration, error: fetchError } = await supabase
            .from("workshop_registrations")
            .select("*, workshops(title, date_info)")
            .eq("id", regId)
            .single();

        if (fetchError || !registration) {
            return NextResponse.json({ error: "Inscripción no encontrada" }, { status: 404 });
        }

        const workshopTitle = registration.workshops?.title || "Taller";
        const workshopDate = registration.workshops?.date_info || "";
        const userName = `${registration.student_name} ${registration.student_surname}`.trim();
        const userEmail = registration.student_email;

        if (action === 'pagado') {
            // Actualizar DB
            const { error: updateError } = await supabase
                .from("workshop_registrations")
                .update({ status: "pagado" })
                .eq("id", regId);

            if (updateError) throw updateError;

            // Enviar Correo de Éxito
            if (resend) {
                await resend.emails.send({
                    from: "Rincón del Aromo <hola@rincondelaromo.com>",
                    to: userEmail,
                    subject: `¡Pago Confirmado!: ${workshopTitle}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
                            <div style="background-color: #FAEDDF; padding: 20px; text-align: center; border-bottom: 2px solid #8B5E3C;">
                                <h1 style="color: #8B5E3C; margin: 0;">¡Tu Pago fue Confirmado!</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff;">
                                <p style="font-size: 16px;">Hola <b>${userName}</b>,</p>
                                <p style="font-size: 16px;">Te escribimos para avisarte que <strong>tu pago ha sido validado exitosamente</strong> y tu cupo está 100% asegurado.</p>
                                
                                <div style="background-color: #FDFCF8; border-left: 4px solid #8B5E3C; padding: 15px; margin: 25px 0;">
                                    <h3 style="margin-top: 0; color: #4A3B32;">Detalles del Taller</h3>
                                    <p style="margin-bottom: 5px;"><strong>🌟 Taller:</strong> ${workshopTitle}</p>
                                    <p style="margin-bottom: 0;"><strong>📅 Fecha:</strong> ${workshopDate}</p>
                                </div>
                                
                                <p style="font-size: 16px;">Recuerda llegar con unos 10 minutos de anticipación.</p>
                                <br/>
                                <p style="font-size: 14px; color: #666; margin-bottom: 0;">¡Te esperamos!</p>
                                <p style="font-size: 16px; font-weight: bold; color: #8B5E3C; margin-top: 5px;">Rincón del Aromo</p>
                            </div>
                        </div>
                    `,
                });
            }
        } 
        else if (action === 'rechazado') {
            // Eliminar registro
            const { error: deleteError } = await supabase
                .from("workshop_registrations")
                .delete()
                .eq("id", regId);

            if (deleteError) throw deleteError;

            // Enviar Correo de Cancelación
            if (resend) {
                await resend.emails.send({
                    from: "Rincón del Aromo <hola@rincondelaromo.com>",
                    to: userEmail,
                    subject: `Pre-Inscripción Cancelada: ${workshopTitle}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; color: #4A3B32; max-width: 600px; margin: 0 auto; border: 1px solid #EACCA4; border-radius: 10px; overflow: hidden;">
                            <div style="background-color: #faebf0; padding: 20px; text-align: center; border-bottom: 2px solid #c8536b;">
                                <h1 style="color: #c8536b; margin: 0;">Inscripción Cancelada</h1>
                            </div>
                            <div style="padding: 30px; background-color: #ffffff;">
                                <p style="font-size: 16px;">Hola <b>${userName}</b>,</p>
                                <p style="font-size: 16px;">Te informamos que tu pre-inscripción de 24 horas para <strong>${workshopTitle}</strong> ha sido cancelada por nuestro sistema, al no haberse registrado el pago en el plazo estipulado.</p>
                                
                                <p style="font-size: 16px;">Con esto, tu cupo ha sido liberado. Si deseas volver a inscribirte (siempre que queden cupos disponibles), por favor vuelve a realizar el proceso en nuestra web.</p>
                                
                                <br/>
                                <p style="font-size: 14px; color: #666; margin-bottom: 0;">Atentamente,</p>
                                <p style="font-size: 16px; font-weight: bold; color: #8B5E3C; margin-top: 5px;">Rincón del Aromo</p>
                            </div>
                        </div>
                    `,
                });
            }
        }
        else {
            return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        const e = error as Error;
        console.error("Error en API status de inscripción:", e);
        return NextResponse.json({ error: "No se pudo procesar: " + e.message }, { status: 500 });
    }
}
