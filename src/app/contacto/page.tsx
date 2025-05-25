import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Contacto() {
    return (
        <main className="min-h-screen p-8 bg-[#f7f3ee]">
            <h1 className="text-4xl font-bold mb-6 text-[#6b4f3b] text-center">Contacto</h1>
            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-[#6b4f3b]">Información de Contacto</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-[#6b4f3b]">Dirección</h3>
                                <p className="text-[#6b4f3b]">Isla Maulin 1871, Osorno, Región de Los Lagos</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#6b4f3b]">Teléfono</h3>
                                <Link
                                    href="https://wa.me/56987222243"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#25D366] hover:text-[#128C7E] transition-colors flex items-center gap-2"
                                >
                                    <FaWhatsapp className="text-xl" />
                                    +56 9 8722 2243
                                </Link>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#6b4f3b]">Email</h3>
                                <Link
                                    href="mailto:contacto@rincondelaromo.com"
                                    className="text-[#da983c] hover:text-[#c88a35] transition-colors"
                                >
                                    contacto@rincondelaromo.com
                                </Link>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#6b4f3b]">Instagram</h3>
                                <Link
                                    href="https://www.instagram.com/rincondelaromo/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E1306C] hover:text-[#C13584] transition-colors flex items-center gap-2"
                                >
                                    <FaInstagram className="text-xl" />
                                    @rincondelaromo
                                </Link>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#6b4f3b]">Horarios</h3>
                                <div className="space-y-2">
                                    <div>
                                        <p className="font-medium text-[#6b4f3b]">After School</p>
                                        <p className="text-[#6b4f3b]">8:30 - 19:00</p>
                                        <p className="text-[#da983c] font-medium">¡CUPOS LIMITADOS! 🌾</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#6b4f3b]">Cafetería y Cowork</p>
                                        <p className="text-[#6b4f3b]">Lunes a Viernes: 08:00 - 20:30</p>
                                        <p className="text-[#6b4f3b]">Sábados: 09:00 - 19:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-[#6b4f3b]">Envíanos un Mensaje</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="nombre" className="block mb-2 text-[#6b4f3b]">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#da983c]"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-[#6b4f3b]">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#da983c]"
                                    placeholder="tu@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="mensaje" className="block mb-2 text-[#6b4f3b]">Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#da983c]"
                                    rows={4}
                                    placeholder="Tu mensaje"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#da983c] text-white px-6 py-2 rounded hover:bg-[#c88a35] transition-colors w-full"
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