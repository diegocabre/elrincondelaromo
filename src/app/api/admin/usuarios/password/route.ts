import { NextResponse } from 'next/server';
import { getSessionPayload } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';

export async function PUT(request: Request) {
    const session = await getSessionPayload();
    if (!session || !session.id) {
        return NextResponse.json({ success: false, message: 'No autenticado o sesión antigua' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword || newPassword.length < 6) {
            return NextResponse.json({ success: false, message: 'Faltan parámetros o contraseña nueva muy corta' }, { status: 400 });
        }

        // Obtener usuario actual
        const { data: user, error: userError } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('id', session.id)
            .single();

        if (userError || !user) {
            return NextResponse.json({ success: false, message: 'Usuario no encontrado' }, { status: 404 });
        }

        // Verificar password actual
        const isValid = await bcrypt.compare(currentPassword, user.password_hash);
        if (!isValid) {
            return NextResponse.json({ success: false, message: 'La contraseña actual es incorrecta' }, { status: 401 });
        }

        // Hashear la nueva contraseńa
        const salt = await bcrypt.genSalt(10);
        const new_password_hash = await bcrypt.hash(newPassword, salt);

        // Actualizar
        const { error: updateError } = await supabaseAdmin
            .from('admin_users')
            .update({ password_hash: new_password_hash })
            .eq('id', session.id);

        if (updateError) throw updateError;

        return NextResponse.json({ success: true, message: 'Contraseña actualizada' });
    } catch (err) {
        console.error("PUT password error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
