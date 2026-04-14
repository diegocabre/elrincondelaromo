import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateToken() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email requerido' }, { status: 400 });
        }

        // Verify if user exists
        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .select('id, nombre')
            .eq('email', email)
            .single();

        if (error || !user) {
            // No revelamos si el usuario existe o no, pero devolvemos exitoso
            return NextResponse.json({ success: true, message: 'Si el correo está registrado, enviamos el pin' });
        }

        const token = generateToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour valid

        // Save token to DB
        const { error: updateError } = await supabaseAdmin
            .from('admin_users')
            .update({ 
                reset_token: token, 
                reset_token_expires: expiresAt.toISOString() 
            })
            .eq('id', user.id);

        if (updateError) throw updateError;

        // Send Email
        await resend.emails.send({
            from: 'El Rincón del Aromo <no-reply@rincondelaromo.com>', // Replace with your verified sender domain on Resend
            to: email,
            subject: 'Recuperación de Contraseña - Panel Administrativo',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #4A3B32;">
                    <h2 style="color: #8B5E3C;">Recuperación de Contraseña</h2>
                    <p>Hola ${user.nombre || 'Administrador'},</p>
                    <p>Has solicitado recuperar tu contraseña en el panel de administración de El Rincón del Aromo.</p>
                    <p>Tu código de seguridad temporal es:</p>
                    <div style="font-size: 24px; font-weight: bold; background: #FAEDDF; padding: 10px 20px; border-radius: 8px; text-align: center; letter-spacing: 5px; margin: 20px 0;">
                        ${token}
                    </div>
                    <p>Introduce este código en la pantalla de recuperación para crear una nueva contraseña.</p>
                    <p style="font-size: 12px; color: #A69385;">Este código expirará en 1 hora. Si no fuiste tú, ignora este mensaje.</p>
                </div>
            `
        });

        return NextResponse.json({ success: true, message: 'Instrucciones enviadas por correo' });
    } catch (err) {
        console.error("Forgot password error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
