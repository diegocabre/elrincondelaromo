import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '@/lib/supabase';

// Configura las credenciales (Dejaremos un valor por defecto dummy mientras tanto para que no crashee)
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-00000000000-000000-000000' });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { item, payer } = body;
        
        const reqUrl = new URL(request.url);
        const baseUrl = `${reqUrl.protocol}//${reqUrl.host}`;

        // 0. Validar disponibilidad y cupos del taller
        const { data: workshop, error: wsError } = await supabase
            .from('workshops')
            .select('*, workshop_registrations(count)')
            .eq('id', item.id)
            .single();

        if (wsError || !workshop) {
            return NextResponse.json({ error: "El taller no existe o no está disponible" }, { status: 404 });
        }

        if (workshop.status === 'realizado') {
            return NextResponse.json({ error: "Este taller ya ha finalizado" }, { status: 400 });
        }

        let capacity: number | null = null;
        try {
            const parsed = JSON.parse(workshop.description);
            if (parsed.capacity !== undefined && parsed.capacity !== null && parsed.capacity !== '') {
                const cap = Number(parsed.capacity);
                if (!isNaN(cap) && cap > 0) capacity = cap;
            }
        } catch {}

        const currentCount = workshop.workshop_registrations?.[0]?.count ?? 0;
        const isCapacityFull = capacity !== null && currentCount >= capacity;
        const isFull = workshop.status === 'lleno' || isCapacityFull;

        if (isFull) {
            if (workshop.status !== 'lleno') {
                await supabase.from('workshops').update({ status: 'lleno' }).eq('id', workshop.id);
            }
            return NextResponse.json({ error: "Lo sentimos, los cupos para este taller se han agotado." }, { status: 400 });
        }

        // 1. Guardar en Supabase el registro en estado Pendiente
        const { data: registration, error: dbError } = await supabase
            .from('workshop_registrations')
            .insert([{
                workshop_id: item.id,
                student_name: payer?.name || "",
                student_surname: payer?.surname || "",
                student_email: payer?.email || "",
                student_phone: payer?.phone || "",
                status: 'pendiente'
            }])
            .select()
            .single();

        if (dbError) {
            console.error("Error guardando inscripción en BD:", dbError);
            return NextResponse.json({ error: "No se pudo crear el registro en la base de datos" }, { status: 500 });
        }

        // Si con esta inscripción se completó la capacidad, marcar taller como lleno en BD
        if (capacity !== null && (currentCount + 1) >= capacity) {
            await supabase.from('workshops').update({ status: 'lleno' }).eq('id', item.id);
        }

        const registrationId = registration.id;

        // 2. Bloque con sdk para crear preferencia de Mercado Pago
        try {
            const preference = new Preference(client);
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: item.id.toString(),
                            title: item.title,
                            quantity: 1,
                            unit_price: Number(item.price),
                        }
                    ],
                    payer: {
                        name: payer?.name || "",
                        surname: payer?.surname || "",
                        email: payer?.email || "",
                        phone: {
                           number: payer?.phone || ""
                        }
                    },
                    back_urls: {
                        success: `${baseUrl}/talleres?success=true`,
                        failure: `${baseUrl}/talleres?success=false`,
                        pending: `${baseUrl}/talleres?success=pending`
                    },
                    auto_return: "approved",
                    external_reference: registrationId, // Vinculamos la compra con nuestra BD
                }
            });
            
            // Opcional: Actualizar el preference_id en Supabase
            await supabase.from('workshop_registrations').update({ preference_id: result.id }).eq('id', registrationId);

            return NextResponse.json({ url: result.init_point });
        } catch (error) {
             console.error("Mercado Pago arrojó un error:", error);
             const e = error as Error;
             return NextResponse.json({ error: "API MercadoPago: " + (e.message || JSON.stringify(e)) }, { status: 500 });
        }

    } catch (error) {
        const e = error as Error;
        return NextResponse.json({ error: "No se pudo procesar la solicitud general: " + e.message }, { status: 500 });
    }
}
