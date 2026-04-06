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
            .select('id, start_time, therapy_id')
            .gte('start_time', nowIso)
            .order('start_time', { ascending: true });

        if (therapyId) {
            query = query.eq('therapy_id', therapyId);
        }

        const { data: availableArray } = await query;

        // 2. Traer reservas futuras
        const { data: bookingsArray } = await supabase
            .from('bookings')
            .select('service, date')
            .gte('date', nowIso);

        // Traer Terapias para mapear título
        const { data: therapiesArray } = await supabase.from('therapies').select('id, title');
        const therapyTitleToId = new Map<string, string>();
        therapiesArray?.forEach(t => therapyTitleToId.set(t.title, t.id));

        // Contar reservas
        const bookingsCountMap = new Map<string, number>();
        bookingsArray?.forEach(b => {
             const timeNum = new Date(b.date).getTime().toString();
             const tId = therapyTitleToId.get(b.service) || 'UNKNOWN';
             const key = `${timeNum}_${tId}`;
             bookingsCountMap.set(key, (bookingsCountMap.get(key) || 0) + 1);
        });

        // Agrupar cupos disponibles (capacidad = num de filas repetidas)
        const capacityMap = new Map<string, number>();
        const firstIdMap = new Map<string, string>();

        (availableArray || []).forEach(a => {
            const timeNum = new Date(a.start_time).getTime().toString();
            const key = `${timeNum}_${a.therapy_id}`;
            capacityMap.set(key, (capacityMap.get(key) || 0) + 1);
            if (!firstIdMap.has(key)) firstIdMap.set(key, a.id);
        });

        // Crear array final de horas únicas
        const allSlots: any[] = [];
        capacityMap.forEach((capacity, key) => {
             const [timeNum, tId] = key.split('_');
             
             // Buscar el objeto original para tener la fecha ISO
             const a = availableArray?.find(x => new Date(x.start_time).getTime().toString() === timeNum && String(x.therapy_id) === tId);
             
             if (a) {
                  const bCount = bookingsCountMap.get(key) || 0;
                  allSlots.push({
                      id: firstIdMap.get(key) || a.id,
                      isoDate: a.start_time,
                      isFull: bCount >= capacity
                  });
             }
        });

        // Ordenar en caso de que Map desordene
        allSlots.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());

        return NextResponse.json({ slots: allSlots });
    } catch {
        return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
    }
}
