import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // Solo proteger el path /admin completo indicando exclusión del login y apis base
    const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
    
    if (isAdminRoute) {
        const cookie = request.cookies.get('admin_session')?.value;
        const verifiedToken = await verifySession(cookie);
        
        // Si no hay token o es invalido, botar al user al login
        if (!verifiedToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }
    
    // Si intenta ir al login pero ya está autenticado, lo movemos al panel
    if (path.startsWith('/admin/login')) {
         const cookie = request.cookies.get('admin_session')?.value;
         const verifiedToken = await verifySession(cookie);
         if (verifiedToken) {
             return NextResponse.redirect(new URL('/admin/agenda', request.url));
         }
    }

    return NextResponse.next();
}

// Configurar a cuáles rutas aplica el middleware
export const config = {
    matcher: ['/admin/:path*'],
};
