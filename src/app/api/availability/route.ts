import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
        return NextResponse.json({ error: 'Falta parámetro de fecha' }, { status: 400 });
    }

    try {
        // Horario base de atención (9 AM a 18 PM)
        const baseHours = [
            '09:00', '10:00', '11:00', '12:00', '13:00', 
            '14:00', '15:00', '16:00', '17:00'
        ];

        // Fechas limite para ese dia (YYYY-MM-DD)
        const startOfDay = `${dateParam}T00:00:00.000Z`;
        const endOfDay = `${dateParam}T23:59:59.999Z`;

        // Traer reservas de ese día
        const { data: bookingsArray } = await supabase
            .from('bookings')
            .select('date')
            .gte('date', startOfDay)
            .lte('date', endOfDay);

        // Traer bloqueos
        const { data: blocksArray } = await supabase
            .from('blocked_hours')
            .select('start_time, end_time')
            .gte('start_time', startOfDay)
            .lte('start_time', endOfDay);

        // Convertir reservas y bloqueos a formatos HH:MM
        const occupiedTimes = new Set<string>();

        bookingsArray?.forEach(b => {
             const timeStr = new Date(b.date).toISOString().substring(11, 16);
             occupiedTimes.add(timeStr);
        });

        blocksArray?.forEach(b => {
             const timeStr = new Date(b.start_time).toISOString().substring(11, 16);
             occupiedTimes.add(timeStr);
        });

        // Filtrar horas disponibles
        const availableHours = baseHours.filter(hour => !occupiedTimes.has(hour));

        return NextResponse.json({ date: dateParam, available: availableHours });
    } catch {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
