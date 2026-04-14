import { NextResponse } from 'next/server';
import { getSessionPayload } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';

export async function GET() {
    const session = await getSessionPayload();
    if (!session) {
        return NextResponse.json({ success: false, message: 'No autenticado' }, { status: 401 });
    }

    try {
        const { data: users, error } = await supabaseAdmin
            .from('admin_users')
            .select('id, email, created_at');

        if (error) throw error;
        
        return NextResponse.json({ success: true, users });
    } catch (err) {
        console.error("GET users error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getSessionPayload();
    if (!session || session.role !== 'admin') {
        return NextResponse.json({ success: false, message: 'No Autorizado' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password || password.length < 6) {
            return NextResponse.json({ success: false, message: 'Email y contraseña válida (mín 6 req)' }, { status: 400 });
        }

        // Hashear password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insertar en Supabase
        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .insert([{ email, password_hash }])
            .select('id, email, created_at')
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
