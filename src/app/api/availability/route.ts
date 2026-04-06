import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
        return NextResponse.json({ error: 'Falta parámetro de fecha' }, { status: 400 });
    }

    try {
        // Fechas limite para ese dia (YYYY-MM-DD)
        const startOfDay = `${dateParam}T00:00:00.000Z`;
        const endOfDay = `${dateParam}T23:59:59.999Z`;

        // 1. Traer horas HABILITADAS (Whitelist)
        const { data: availableArray } = await supabase
            .from('available_hours')
            .select('start_time')
            .gte('start_time', startOfDay)
            .lte('start_time', endOfDay);

        const enabledTimes = new Set<string>();
        availableArray?.forEach(a => {
             // Formateo seguro para extraer HH:MM
             const timeStr = new Date(a.start_time).toISOString().substring(11, 16);
             enabledTimes.add(timeStr);
        });

        // 2. Traer reservas existentes de ese día
        const { data: bookingsArray } = await supabase
            .from('bookings')
            .select('date')
            .gte('date', startOfDay)
            .lte('date', endOfDay);

        const occupiedTimes = new Set<string>();
        bookingsArray?.forEach(b => {
             const timeStr = new Date(b.date).toISOString().substring(11, 16);
             occupiedTimes.add(timeStr);
        });

        // 3. Cruzar: Habilitadas Menos Ocupadas
        const finalAvailableHours = Array.from(enabledTimes)
             .filter(hour => !occupiedTimes.has(hour))
             .sort(); // ordenadas de menor a mayor

        return NextResponse.json({ date: dateParam, available: finalAvailableHours });
    } catch {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
