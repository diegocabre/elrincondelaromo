import { NextResponse } from 'next/server';
import { getSessionPayload } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSessionPayload();
        if (!session) {
            return NextResponse.json({ success: false, message: 'No autenticado' }, { status: 401 });
        }
        
        // session tiene la estructura enviada en encryptSession (id, email, role, expiresAt, etc.)
        return NextResponse.json({ success: true, session });
    } catch (err) {
        console.error("GET admin/me error:", err);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
