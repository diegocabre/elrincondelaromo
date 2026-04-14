"use client";

import React from 'react';
import Image from 'next/image';
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

interface Instructor {
    id: string;
    name: string;
    title: string;
    image_data?: string;
}

interface Schedule {
    id: string;
    period: string;
    day_names: string;
    class_name: string;
    time: string;
}

interface Price {
    id: string;
    category: string;
    description: string;
    price: string;
    category_group: string;
    instructor_id?: string;
}

interface BienestarInfoProps {
    therapies: Therapy[];
    instructors?: Instructor[];
    schedules?: Schedule[];
    prices?: Price[];
}

const formatPrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/\D/g, ''), 10);
    if (!isNaN(num)) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(num);
    }
    return priceStr;
};

export default function BienestarInfo({ therapies, instructors = [], schedules = [], prices = [] }: BienestarInfoProps) {
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
                            {schedules.filter(s => s.period.toUpperCase() === 'MAÑANA').map(s => (
                                <li key={s.id} className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2">
                                    <span className="font-medium">{s.day_names}</span> 
                                    <span>{s.class_name} <span className="font-bold text-[#4A3B32]">{s.time}</span></span>
                                </li>
                            ))}
                            {schedules.filter(s => s.period.toUpperCase() === 'MAÑANA').length === 0 && (
                                <li className="text-gray-400">Sin clases matutinas asignadas</li>
                            )}
                        </ul>
                    </div>

                    <div className="bg-[#FDFCF8] rounded-2xl p-6 border border-[#EACCA4]/50 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAEDDF] rounded-bl-full -z-0 opacity-50" />
                        <h3 className="text-[#8B5E3C] font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8B5E3C]"></span> TARDE</h3>
                        <ul className="space-y-3 text-sm text-[#6B5A4E]">
                            {schedules.filter(s => s.period.toUpperCase() === 'TARDE').map(s => (
                                <li key={s.id} className="flex justify-between border-b border-dashed border-[#EACCA4]/50 pb-2">
                                    <span className="font-medium">{s.day_names}</span> 
                                    <span>{s.class_name} <span className="font-bold text-[#4A3B32]">{s.time}</span></span>
                                </li>
                            ))}
                            {schedules.filter(s => s.period.toUpperCase() === 'TARDE').length === 0 && (
                                <li className="text-gray-400">Sin clases vespertinas asignadas</li>
                            )}
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
                    {instructors.filter(inst => prices.some(p => p.instructor_id === inst.id)).length > 0 ? (
                        instructors.filter(inst => prices.some(p => p.instructor_id === inst.id)).map(inst => (
                            <div key={inst.id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                                <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2 flex items-center gap-2">
                                    {inst.image_data ? (
                                        <Image src={inst.image_data} alt={inst.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-[#EACCA4] shadow-sm shrink-0" unoptimized />
                                    ) : (
                                        <div className="w-8 h-8 bg-[#FAEDDF] rounded-full flex items-center justify-center text-[#8B5E3C] shrink-0">
                                            <UserCircle2 size={20} strokeWidth={1.5} />
                                        </div>
                                    )}
                                    <div className="leading-tight">
                                        <span className="block">{inst.name}</span>
                                        <span className="text-xs text-[#8B5E3C] font-normal">{inst.title}</span>
                                    </div>
                                </h4>
                                {Array.from(new Set(prices.filter(p => p.instructor_id === inst.id).map(p => p.category))).map(cat => (
                                    <div key={cat} className="mb-4 last:mb-0">
                                        <h5 className="font-bold text-[#6B5A4E] text-sm mb-2">{cat}</h5>
                                        <ul className="text-sm text-[#6B5A4E] space-y-2">
                                            {prices.filter(p => p.instructor_id === inst.id && p.category === cat).map(p => (
                                                <li key={p.id} className="flex justify-between">
                                                    <span>{p.description}</span>
                                                    <span className="font-bold">{formatPrice(p.price)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        prices.length > 0 ? (
                            Array.from(new Set(prices.map(p => p.category))).map(cat => (
                                <div key={cat} className="bg-white p-5 rounded-2xl shadow-sm border border-[#EACCA4]/30 hover:border-[#8B5E3C]/50 transition-colors">
                                    <h4 className="font-bold text-[#4A3B32] mb-3 border-b border-[#FAEDDF] pb-2">{cat}</h4>
                                    <ul className="text-sm text-[#6B5A4E] space-y-2 mb-3">
                                        {prices.filter(p => p.category === cat).map(p => (
                                            <li key={p.id} className="flex justify-between">
                                                <span>{p.description}</span>
                                                <span className="font-bold">{formatPrice(p.price)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 p-4">No hay precios configurados actualmente.</p>
                        )
                    )}
                </div>
            </div>

            {/* SECCIÓN INSTRUCTORES */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2 border-b border-[#EACCA4] pb-2">
                    <Users className="text-[#8B5E3C]" /> Nuestros Instructores
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {instructors.length > 0 ? (
                        instructors.map((inst, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-[#EACCA4]/20 flex flex-col items-center text-center group hover:shadow-md transition-all">
                                {inst.image_data ? (
                                    <Image src={inst.image_data} alt={inst.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover mb-3 border border-[#EACCA4] group-hover:scale-110 transition-transform shadow-sm" unoptimized />
                                ) : (
                                    <div className="w-16 h-16 bg-[#FAEDDF] rounded-full flex items-center justify-center mb-3 text-[#8B5E3C] group-hover:scale-110 transition-transform">
                                        <UserCircle2 size={40} strokeWidth={1.5} />
                                    </div>
                                )}
                                <h4 className="font-bold text-[#4A3B32] text-sm">{inst.name}</h4>
                                <p className="text-xs text-[#8B5E3C] mt-1">{inst.title}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 p-4 col-span-full">No hay instructores registrados actualmente.</p>
                    )}
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
