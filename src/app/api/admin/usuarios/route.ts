import { NextResponse } from 'next/server';
import { getSessionPayload } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';

const SUPER_ADMIN = process.env.ADMIN_EMAIL || 'contacto@rincondelaromo.com';

function isSuperAdmin(email: string) {
    return email === SUPER_ADMIN;
}

export async function GET() {
    const session = await getSessionPayload();
    if (!session) {
        return NextResponse.json({ success: false, message: 'No autenticado' }, { status: 401 });
    }

    try {
        const { data: users, error } = await supabaseAdmin
            .from('admin_users')
            .select('id, email, nombre, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        
        return NextResponse.json({ success: true, users });
    } catch (err) {
        console.error("GET users error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSessionPayload();
    if (!session || !isSuperAdmin(session.email as string)) {
        return NextResponse.json({ success: false, message: 'Sólo el Administrador Principal puede crear usuarios' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { email, password, nombre } = body;

        if (!email || !password || password.length < 6 || !nombre) {
            return NextResponse.json({ success: false, message: 'Email, nombre y contraseña válidos (mín 6 req)' }, { status: 400 });
        }

        // Hashear password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insertar en Supabase
        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .insert([{ email, nombre, password_hash }])
            .select('id, email, nombre, created_at')
            .single();

        if (error) {
            if (error.code === '23505') { // unique violation
                return NextResponse.json({ success: false, message: 'Email ya registrado' }, { status: 400 });
            }
            throw error;
        }

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error("POST user error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getSessionPayload();
    if (!session || !isSuperAdmin(session.email as string)) {
        return NextResponse.json({ success: false, message: 'Sólo el Administrador Principal puede borrar usuarios' }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'ID de usuario requerido' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('admin_users')
            .delete()
            .eq('id', id);

        if (error) throw error;
        
        return NextResponse.json({ success: true, message: 'Usuario borrado' });
    } catch (err) {
        console.error("DELETE user error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSessionPayload();
    if (!session || !isSuperAdmin(session.email as string)) {
        return NextResponse.json({ success: false, message: 'Sólo el Administrador Principal puede editar usuarios' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, email, nombre, password } = body;

        if (!id || !email || !nombre) {
            return NextResponse.json({ success: false, message: 'Campos incompletos' }, { status: 400 });
        }

        const updateData: { email: string; nombre: string; password_hash?: string } = { email, nombre };

        if (password) {
            if (password.length < 6) return NextResponse.json({ success: false, message: 'Mínimo 6 chars para password' }, { status: 400 });
            const salt = await bcrypt.genSalt(10);
            updateData.password_hash = await bcrypt.hash(password, salt);
        }

        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .update(updateData)
            .eq('id', id)
            .select('id, email, nombre, created_at')
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error("PUT user error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
