"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { UserCircle2 } from 'lucide-react';

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
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(num);
    }
    return priceStr;
};

const formatDayName = (dayStr: string) => {
    const mapping: { [key: string]: string } = {
        'mar': 'MARTES',
        'mié': 'MIÉRCOLES',
        'lun': 'LUNES',
        'jue': 'JUEVES',
        'vie': 'VIERNES',
        'sáb': 'SÁBADO',
        'dom': 'DOMINGO',
        'lun y vie': 'LUNES Y VIERNES',
        'mar y jue': 'MARTES Y JUEVES',
    };
    const key = dayStr.toLowerCase().trim();
    return mapping[key] || dayStr.toUpperCase();
};

export default function BienestarInfo({ therapies, instructors = [], schedules = [], prices = [] }: BienestarInfoProps) {
    
    // Función para obtener horarios asociados a una instructora o su clase
    const getInstructorSchedules = (instName: string, instTitle: string) => {
        return schedules.filter(s => {
            const className = s.class_name.toLowerCase();
            const firstName = instName.split(' ')[0].toLowerCase();
            const titleL = instTitle.toLowerCase();
            
            return className.includes(firstName) || 
                   className.includes(titleL) || 
                   (firstName === 'waleska' && className.includes('yoga')) ||
                   (firstName === 'carito' && (className.includes('pilates') || className.includes('zumba'))) ||
                   (firstName === 'tania' && className.includes('inglés'));
        });
    };

    // Agrupamos instructores para renderizar sus tarjetas correspondientes
    // Aseguramos que muestre los instructores activos
    const activeInstructors = instructors.length > 0 ? instructors : [
        { id: 'eaee53c8-3b34-49f4-a135-7cf57ee258d0', name: 'Waleska Barrientos', title: 'Yoga Kundalini' },
        { id: '07755768-6276-43e2-820f-7009ae4a3f1e', name: 'Carito', title: 'Pilates / Zumba' },
        { id: '0f5a95f5-0dfd-4b42-afc4-5c240bdbcf7e', name: 'Tania Talki Talk', title: 'Inglés' }
    ];

    return (
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp} 
            className="w-full flex flex-col items-center pb-10"
        >
            {/* Header de la Página */}
            <div className="text-center max-w-3xl mb-16">
                <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-4 block">Salud & Mente</span>
                <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-6">
                    SERVICIOS & CLASES
                </h1>
                <h2 className="text-2xl font-semibold text-[#6e721b] mb-4">
                    Movimiento y Bienestar
                </h2>
                <p className="text-lg text-[#6B5A4E] font-light leading-relaxed mb-2">
                    Un espacio para reconectar contigo, moverte y sentirte bien.
                </p>
                <p className="text-sm text-[#dfa445] font-medium leading-relaxed italic">
                    Elige la clase que más te acomode, revisa nuestros horarios fijos y reserva tu cupo en el formulario.
                </p>
            </div>

            {/* Grilla de Tarjetas de Instructor (3 Columnas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {activeInstructors.map((inst) => {
                    const instPrices = prices.filter(p => p.instructor_id === inst.id);
                    const instSchedules = getInstructorSchedules(inst.name, inst.title);
                    
                    // Definir tipo de clase principal para la tarjeta
                    let classType = "Clase";
                    if (inst.title.toLowerCase().includes("yoga")) classType = "Yoga";
                    else if (inst.title.toLowerCase().includes("pilates")) classType = "Pilates";
                    else if (inst.title.toLowerCase().includes("inglés")) classType = "Inglés";
                    else if (inst.title.toLowerCase().includes("zumba")) classType = "Zumba";

                    // Crear mensaje personalizado para WhatsApp
                    const whatsappMsg = encodeURIComponent(`¡Hola! Me interesa tomar un cupo de tu clase de ${classType} con ${inst.name}.`);
                    const whatsappLink = `https://wa.me/56987222243?text=${whatsappMsg}`;

                    return (
                        <div 
                            key={inst.id} 
                            className="bg-white rounded-[2rem] p-8 shadow-lg border border-[#dfa445]/10 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Cabecera de la Tarjeta (Perfil de Instructora) */}
                            <div className="flex flex-col items-center w-full">
                                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#dfa445]/30">
                                    {inst.image_data ? (
                                        <Image 
                                            src={inst.image_data} 
                                            alt={inst.name} 
                                            fill 
                                            className="object-cover" 
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#FAEDDF] flex items-center justify-center text-[#dfa445]">
                                            <UserCircle2 size={56} strokeWidth={1.5} />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-[#4A3B32]">{inst.name}</h3>
                                <p className="text-xs text-[#dfa445] font-semibold tracking-wider uppercase mt-1 mb-4">{inst.title}</p>
                                
                                <div className="w-full h-px bg-[#dfa445]/20 my-4"></div>
                                
                                {/* Tipo de Clase */}
                                <h4 className="text-lg font-bold text-[#6e721b] mb-4">{classType}</h4>
                                
                                {/* Horarios */}
                                <div className="mb-6 w-full">
                                    <h5 className="text-xs font-bold text-[#4A3B32]/70 tracking-widest uppercase mb-3">HORARIOS:</h5>
                                    {instSchedules.length > 0 ? (
                                        <ul className="space-y-2 text-sm text-[#6B5A4E] font-medium">
                                            {instSchedules.map((s) => (
                                                <li key={s.id} className="leading-relaxed">
                                                    <span className="font-bold text-[#4A3B32]">{formatDayName(s.day_names)}</span>: {s.time} hrs
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-[#6B5A4E]/60 italic">Horarios a convenir</p>
                                    )}
                                </div>

                                <div className="w-full h-px bg-[#dfa445]/20 my-4"></div>
                                
                                {/* Precios */}
                                <div className="mb-6 w-full">
                                    {instPrices.length > 0 ? (
                                        <ul className="space-y-2 text-sm text-[#6B5A4E] font-medium">
                                            {instPrices.map((p) => (
                                                <li key={p.id} className="flex justify-between items-center px-4">
                                                    <span className="font-light">{p.description}</span>
                                                    <span className="font-bold text-[#4A3B32]">{formatPrice(p.price)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-[#6B5A4E]/60 italic">Consultar valores</p>
                                    )}
                                </div>
                            </div>

                            {/* Botón WhatsApp de Contacto */}
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-6 rounded-full w-full font-bold hover:bg-[#128C7E] transition-all text-xs tracking-wider shadow-sm hover:shadow-md"
                            >
                                <FaWhatsapp className="text-lg" />
                                <span>CONTACTATE CON LA INSTRUCTORA</span>
                            </a>
                        </div>
                    );
                })}
            </div>
            
            {/* Terapias Adicionales / Servicios Holísticos (Opcional, de respaldo abajo) */}
            {therapies.length > 0 && (
                <div className="mt-20 pt-10 border-t border-[#dfa445]/20 w-full max-w-4xl text-center">
                    <h3 className="text-2xl font-bold text-[#4A3B32] mb-8">Otros Servicios de Bienestar</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {therapies.map((t) => (
                            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#dfa445]/10 flex flex-col text-left hover:border-[#6e721b]/30 transition-colors">
                                <h4 className="text-lg font-bold text-[#6e721b] mb-2">{t.title}</h4>
                                <p className="text-[#6B5A4E] text-sm leading-relaxed font-light">{t.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
