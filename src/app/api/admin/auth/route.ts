import { NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        
        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email y contraseña requeridos' }, { status: 400 });
        }

        // Buscar al usuario por correo en la DB
        const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            // Utilizamos el fallback del .env por si la DB no está lista o es el primer setup
            const adminPass = process.env.ADMIN_PASSWORD || 'elrincondelaromo123';
            const adminEmail = process.env.ADMIN_EMAIL || 'contacto@rincondelaromo.com';
            
            if (email === adminEmail && password === adminPass) {
                 await createAdminSession('fallback-id', email);
                 return NextResponse.json({ success: true, message: 'Autenticado con fallback' });
            }
            return NextResponse.json({ success: false, message: 'Credenciales incorrectas' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);
        
        if (isValid) {
            await createAdminSession(user.id, user.email);
            return NextResponse.json({ success: true, message: 'Autenticado' });
        } else {
            return NextResponse.json({ success: false, message: 'Credenciales incorrectas' }, { status: 401 });
        }
    } catch (err) {
        console.error("Auth error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
