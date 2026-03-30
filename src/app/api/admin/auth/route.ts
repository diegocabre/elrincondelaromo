import { NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Verifica si la contraseña dada coincide con la clave de tu .env.local
        const adminPass = process.env.ADMIN_PASSWORD || 'elrincondelaromo123';
        
        if (body.password === adminPass) {
            // Crea una cookie httpOnly segura válida por 7 días
            await createAdminSession();
            
            return NextResponse.json({ success: true, message: 'Autenticado' });
        } else {
            return NextResponse.json({ success: false, message: 'Contraseña incorrecta' }, { status: 401 });
        }
    } catch (e) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
