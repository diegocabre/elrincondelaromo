import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, token, newPassword } = body;

        if (!email || !token || !newPassword || newPassword.length < 6) {
            return NextResponse.json({ success: false, message: 'Datos incompletos o contraseña muy corta (min 6)' }, { status: 400 });
        }

        // Validate Token
        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .select('id, reset_token, reset_token_expires')
            .eq('email', email)
            .single();

        if (error || !user) {
            return NextResponse.json({ success: false, message: 'Usuario o token inválido' }, { status: 400 });
        }

        if (user.reset_token !== token) {
            return NextResponse.json({ success: false, message: 'Token incorrecto' }, { status: 400 });
        }

        if (new Date() > new Date(user.reset_token_expires)) {
            return NextResponse.json({ success: false, message: 'El token ha expirado. Solicita uno nuevo' }, { status: 400 });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(newPassword, salt);

        // Update DB
        const { error: updateError } = await supabaseAdmin
            .from('admin_users')
            .update({ 
                password_hash: password_hash,
                reset_token: null,
                reset_token_expires: null
            })
            .eq('id', user.id);

        if (updateError) throw updateError;

        return NextResponse.json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        console.error("Reset password error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
