import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const therapyId = searchParams.get('therapy_id');

        const nowIso = new Date().toISOString();

        // 1. Traer todas las horas HABILITADAS futuras
        let query = supabase
            .from('available_hours')
            .select('id, start_time')
            .gte('start_time', nowIso)
            .order('start_time', { ascending: true });

        if (therapyId) {
            query = query.eq('therapy_id', therapyId);
        }

        const { data: availableArray } = await query;

        // 2. Traer reservas futuras
        const { data: bookingsArray } = await supabase
            .from('bookings')
            .select('date')
            .gte('date', nowIso);

        const occupiedTimes = new Set<string>();
        bookingsArray?.forEach(b => {
             // El campo de la bd b.date está en ISO
             occupiedTimes.add(new Date(b.date).getTime().toString()); 
        });

        // 3. Crear matriz global indicando qué hora está abierta y cual Llenada/Asignada
        const allSlots = (availableArray || []).map(a => {
            const timeNum = new Date(a.start_time).getTime().toString();
            return {
                id: a.id,
                isoDate: a.start_time, // String ISO original de BD
                isFull: occupiedTimes.has(timeNum)
            };
        });

        return NextResponse.json({ slots: allSlots });
    } catch {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
