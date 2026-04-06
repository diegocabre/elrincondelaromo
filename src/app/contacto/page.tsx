'use client';

import React, { useState } from 'react';
import { FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { submitContactAction } from '@/actions/contact';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function ContactoPage() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        
        const res = await submitContactAction(formData);
        
        if (res.success && res.message) {
            setSuccessMessage(res.message);
            document.querySelector("form")?.reset();
        } else {
            setErrorMessage(res.error || 'Error al enviar.');
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="w-full max-w-6xl flex flex-col gap-16"
            >
                <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
                    <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Hablemos</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-6">
                        Contacto
                    </h1>
                    <p className="text-lg text-[#6B5A4E] font-light">
                        Estamos aquí para responder tus consultas, sugerencias o simplemente para conversar sobre tu próxima visita al Rincón del Aromo.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
                    
                    {/* Tarjeta de Información */}
                    <motion.div variants={fadeUp} className="lg:col-span-2 bg-[#FAEDDF] rounded-[2rem] p-10 flex flex-col gap-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-[#4A3B32] mb-2">Encuéntranos</h2>
                        
                        <div className="flex gap-4 items-start">
                            <div className="text-[#8B5E3C] mt-1"><FaMapMarkerAlt size={20} /></div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Dirección</h3>
                                <p className="text-[#4A3B32] mt-1">Isla Maulin 1871, Osorno, <br/> Región de Los Lagos</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="text-[#8B5E3C] mt-1"><FaWhatsapp size={20} /></div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">WhatsApp</h3>
                                <Link
                                    href="https://wa.me/56987222243"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#4A3B32] hover:text-[#8B5E3C] transition-colors mt-1 block font-medium"
                                >
                                    +56 9 8722 2243
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="text-[#8B5E3C] mt-1"><FaEnvelope size={20} /></div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Email</h3>
                                <Link
                                    href="mailto:contacto@rincondelaromo.com"
                                    className="text-[#4A3B32] hover:text-[#8B5E3C] transition-colors mt-1 block font-medium"
                                >
                                    contacto@rincondelaromo.com
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="text-[#8B5E3C] mt-1"><FaClock size={20} /></div>
                            <div>
                                <h3 className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Horarios</h3>
                                <div className="mt-2 space-y-4">
                                    <div>
                                        <p className="font-semibold text-[#4A3B32]">Cafetería y Cowork</p>
                                        <p className="text-[#6B5A4E] text-sm">Lun - Vie: 08:00 - 20:30</p>
                                        <p className="text-[#6B5A4E] text-sm">Sábados: 09:00 - 19:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Redes Sociales */}
                        <div className="mt-4 pt-6 border-t border-[#EACCA4]/50">
                             <Link
                                href="https://www.instagram.com/rincondelaromo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-white text-[#4A3B32] py-4 rounded-xl hover:bg-[#FDFCF8] hover:text-[#8B5E3C] transition-colors shadow-sm"
                            >
                                <FaInstagram className="text-2xl" />
                                <span className="font-medium">Síguenos en Instagram</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Formulario de Contacto */}
                    <motion.div variants={fadeUp} className="lg:col-span-3 bg-white rounded-[2rem] p-10 shadow-xl border border-[#EACCA4]/30">
                        <h2 className="text-2xl font-bold text-[#4A3B32] mb-8">Envíanos un Mensaje</h2>
                        
                        {successMessage && (
                            <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] rounded-xl text-sm font-medium">
                                {successMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="mb-6 p-4 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] rounded-xl text-sm font-medium">
                                {errorMessage}
                            </div>
                        )}

                        <form action={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nombre" className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Nombre completo</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#EACCA4]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] transition-all"
                                        placeholder="Ej. Camila Silva"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#EACCA4]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] transition-all"
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <label htmlFor="asunto" className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Asunto</label>
                                <div className="relative">
                                    <select
                                        id="asunto"
                                        name="asunto"
                                        className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#EACCA4]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] transition-all appearance-none"
                                        required
                                    >
                                        <option value="">Selecciona un motivo</option>
                                        <option value="cowork">Reserva Cowork</option>
                                        <option value="talleres">Información sobre Talleres</option>
                                        <option value="bienestar">Clases de Bienestar</option>
                                        <option value="otros">Otras consultas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8B5E3C]">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="mensaje" className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Mensaje</label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    className="w-full px-4 py-3 bg-[#FDFCF8] border border-[#EACCA4]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] transition-all resize-y min-h-[150px]"
                                    placeholder="¿En qué podemos ayudarte?"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#8B5E3C] text-white mt-4 px-8 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50"
                            >
                                {loading ? "Enviando..." : "Enviar Mensaje"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </main>
    );
}