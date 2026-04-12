import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '@/lib/supabase';

// Configura las credenciales (Dejaremos un valor por defecto dummy mientras tanto para que no crashee)
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-00000000000-000000-000000' });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { item, payer } = body;
        
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
                        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/talleres?success=true`,
                        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/talleres?success=false`,
                        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/talleres?success=pending`
                    },
                    auto_return: "approved",
                    external_reference: registrationId, // Vinculamos la compra con nuestra BD
                }
            });
            
            // Opcional: Actualizar el preference_id en Supabase
            await supabase.from('workshop_registrations').update({ preference_id: result.id }).eq('id', registrationId);

            return NextResponse.json({ url: result.init_point });
        } catch (mpError) {
             console.error("Mercado Pago arrojó un error. Usando URL de mock temporalmente.");
             return NextResponse.json({ url: "https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=mockup_123" });
        }

    } catch (e) {
        return NextResponse.json({ error: "No se pudo procesar la solicitud" }, { status: 500 });
    }
}
