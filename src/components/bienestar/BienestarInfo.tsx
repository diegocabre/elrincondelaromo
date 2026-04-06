"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, Users, CheckCircle2, UserCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface Therapy {
    id: string;
    title: string;
    description: string;
}

export default function BienestarInfo({ therapies }: { therapies: Therapy[] }) {
    return (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col pb-10">
            <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Salud & Mente</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#4A3B32] leading-tight mb-6">
                Movimiento y Bienestar
            </h1>
            <p className="text-lg text-[#6B5A4E] font-light leading-relaxed mb-4">
                Un espacio para reconectar contigo, moverte y sentirte bien.
            </p>
            <p className="text-md text-[#8B5E3C] font-medium leading-relaxed mb-10">
                Elige la clase que más te acomode, revisa nuestros horarios fijos y reserva tu cupo en el formulario.
            </p>

            {/* SECCIÓN HORARIOS FIJOS */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2 border-b border-[#EACCA4] pb-2">
                    <Clock className="text-[#8B5E3C]" /> Horarios Generales
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 relative">
                    <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#EACCA4]/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAEDDF] rounded-bl-full -z-0 opacity-50" />
                        <h3 className="text-[#8B5E3C] font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8B5E3C]"></span> MAÑANA</h3>
                        <ul className="space-y-3 text-sm text-[#6B5A4E]">
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Lun y Mié</span> <span>Yoga (Cami) <span className="font-bold text-[#4A3B32]">08:10</span></span></li>
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Martes</span> <span>Yoga (Wale) <span className="font-bold text-[#4A3B32]">09:00</span></span></li>
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Lun y Vie</span> <span>Pilates (Caro) <span className="font-bold text-[#4A3B32]">11:15</span></span></li>
                            <li className="flex justify-between pb-1"><span className="font-medium">Sábado</span> <span>Zumba (Caro) <span className="font-bold text-[#4A3B32]">10:00</span></span></li>
                        </ul>
                    </div>

                    <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#EACCA4]/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAEDDF] rounded-bl-full -z-0 opacity-50" />
                        <h3 className="text-[#8B5E3C] font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8B5E3C]"></span> TARDE</h3>
                        <ul className="space-y-3 text-sm text-[#6B5A4E]">
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Mar y Jue</span> <span>Inglés <span className="font-bold text-[#4A3B32]">15:00 / 16:00 / 17:00</span></span></li>
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Mar y Jue</span> <span>Pilates (Caro) <span className="font-bold text-[#4A3B32]">18:15</span></span></li>
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Lunes</span> <span>Yoga (Cami) <span className="font-bold text-[#4A3B32]">19:00</span></span></li>
                            <li className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2"><span className="font-medium">Miércoles</span> <span>Yoga (Wale) <span className="font-bold text-[#4A3B32]">19:00</span></span></li>
                            <li className="flex justify-between pb-1"><span className="font-medium">Jueves</span> <span>Yoga (Cami) <span className="font-bold text-[#4A3B32]">19:30</span></span></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* SECCIÓN PRECIOS */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2 border-b border-[#EACCA4] pb-2">
                    <Tag className="text-[#8B5E3C]" /> Planes y Precios
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Yoga Plan */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                        <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">🧘‍♀️ Yoga (Vinyasa / Kundalini)</h4>
                        <ul className="text-sm text-[#6B5A4E] space-y-2 mb-3">
                            <li className="flex justify-between"><span>4 clases</span><span className="font-bold">$40.000</span></li>
                            <li className="flex justify-between"><span>5 clases</span><span className="font-bold">$50.000</span></li>
                            <li className="flex justify-between"><span>8 clases</span><span className="font-bold">$60.000</span></li>
                            <li className="flex justify-between"><span>12 clases</span><span className="font-bold">$70.000</span></li>
                        </ul>
                        <div className="pt-2 border-t border-dashed border-[#EACCA4]/50 flex justify-between text-xs font-semibold text-[#8B5E3C]">
                            <span>Clase de prueba</span><span>$12.000</span>
                        </div>
                    </div>

                    {/* Pilates & Zumba */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                            <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">🤸‍♀️ Pilates</h4>
                            <ul className="text-sm text-[#6B5A4E] space-y-2 mb-2">
                                <li className="flex justify-between"><span>4 clases</span><span className="font-bold">$30.000</span></li>
                                <li className="flex justify-between"><span>8 clases</span><span className="font-bold">$50.000</span></li>
                            </ul>
                            <div className="pt-2 flex justify-between text-xs font-semibold text-[#8B5E3C]">
                                <span>Clase individual</span><span>$8.000</span>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                            <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">💃 Zumba</h4>
                            <ul className="text-sm text-[#6B5A4E] space-y-2 mb-2">
                                <li className="flex justify-between"><span>4 clases</span><span className="font-bold">$20.000</span></li>
                            </ul>
                            <div className="pt-2 flex justify-between text-xs font-semibold text-[#8B5E3C]">
                                <span>Clase individual</span><span>$8.000</span>
                            </div>
                        </div>
                    </div>

                    {/* Kundalini & English */}
                    <div className="flex flex-col gap-4 sm:col-span-2 md:grid md:grid-cols-2">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                            <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">🌿 Kundalini Yoga</h4>
                            <ul className="text-sm text-[#6B5A4E] space-y-2 mb-2">
                                <li className="flex justify-between"><span>4 clases</span><span className="font-bold">$40.000</span></li>
                            </ul>
                            <div className="pt-2 flex justify-between text-xs font-semibold text-[#8B5E3C]">
                                <span>Clase individual</span><span>$10.000</span>
                            </div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                            <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">🇬🇧 Clases de Inglés (GB)</h4>
                            <ul className="text-sm text-[#6B5A4E] space-y-2">
                                <li className="flex justify-between"><span>4 clases</span><span className="font-bold">$65.000</span></li>
                                <li className="flex justify-between"><span>8 clases</span><span className="font-bold">$110.000</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN INSTRUCTORES */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2 border-b border-[#EACCA4] pb-2">
                    <Users className="text-[#8B5E3C]" /> Nuestros Instructores
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: "Carito Calderon", title: "Pilates y Zumba" },
                        { name: "Camila", title: "Vinyasa Yoga" },
                        { name: "Waleska", title: "Kundalini Yoga" },
                        { name: "Tania", title: "Inglés" },
                    ].map((inst, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-[#EACCA4]/20 flex flex-col items-center text-center group hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-[#FAEDDF] rounded-full flex items-center justify-center mb-3 text-[#8B5E3C] group-hover:scale-110 transition-transform">
                                <UserCircle2 size={40} strokeWidth={1.5} />
                            </div>
                            <h4 className="font-bold text-[#4A3B32] text-sm">{inst.name}</h4>
                            <p className="text-xs text-[#8B5E3C] mt-1">{inst.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Terapias Dinámicas Originales */}
            {therapies.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[#EACCA4]/50">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-[#8B5E3C]" /> Otros Servicios de Bienestar
                    </h2>
                    <div className="flex flex-col gap-4">
                        {therapies.map((t) => (
                            <div key={t.id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/20 flex flex-col hover:border-[#8B5E3C]/40 transition-colors">
                                <h3 className="text-lg font-bold text-[#4A3B32] mb-1">{t.title}</h3>
                                <p className="text-[#6B5A4E] text-sm leading-relaxed">{t.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
