import React from 'react';

export default function Contacto() {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-6">Contacto</h1>
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold">Dirección</h3>
                                <p>Av. Principal #123, Ciudad</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Teléfono</h3>
                                <p>+56 9 1234 5678</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>contacto@losaromos.cl</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Horario de Atención</h3>
                                <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                                <p>Sábados: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Envíanos un Mensaje</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="nombre" className="block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="w-full p-2 border rounded"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 border rounded"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="mensaje" className="block mb-2">Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    placeholder="Tu mensaje"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
} 