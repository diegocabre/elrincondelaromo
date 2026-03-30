import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura las credenciales (Reemplazar con variables de entorno reales luego)
// const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Simulación: cuando tengas las credenciales habilitamos esto
        /*
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: body.item.id.toString(),
                        title: body.item.title,
                        quantity: 1,
                        unit_price: body.item.price,
                    }
                ],
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL}/talleres?success=true`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL}/talleres?success=false`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL}/talleres?success=pending`
                },
                auto_return: "approved",
            }
        });
        
        return NextResponse.json(result.init_point);
        */

        // Por ahora simulamos la redirección
        console.log("Mock MercadoPago Checkout for:", body.item.title);
        return NextResponse.json("https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=mockup_123");

    } catch (error) {
        return NextResponse.json({ error: "No se pudo crear la preferencia" }, { status: 500 });
    }
}
