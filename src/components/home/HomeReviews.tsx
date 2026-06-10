'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const GOOGLE_REVIEW_LINK = "https://g.page/r/CcnkvcURWo2mEAE/review";

// Reseñas de ejemplo, tú puedes modificar los nombres y textos por los reales de tus clientes.
const REVIEWS = [
    {
        id: 1,
        name: "Maria Eugenia Arrieche Linares",
        rating: 5,
        text: "En un lindo barrio residencial de Osorno, encontramos esta cafetería en una casa, amables, educados, lindo ambiente, todo bien.",
    },
    {
        id: 2,
        name: "Veronica Vasquez",
        rating: 5,
        text: "Muy acogedor, personal altamente calificado, niños felices, disfrutando actividades enriquecedoras para su desarrollo. La cafetería variedades de cafés y muchas cositas ricas.!..no te lo pierdas.!!",
    },
    {
        id: 3,
        name: "Juan Pablo Morales",
        rating: 5,
        text: "Llegué buscando un cowork tranquilo y encontré mi lugar favorito en Osorno. El internet es rápido y poder pedir un café de especialidad mientras trabajas no tiene precio.",
    },
    {
        id: 4,
        name: "Catalina Espinoza",
        rating: 5,
        text: "Tomé un taller de cerámica y me encantó la energía del lugar. El ambiente del Rincón del Aromo te invita a relajarte y desconectarte desde que cruzas la puerta.",
    },
    {
        id: 5,
        name: "Sebastián Rojas",
        rating: 4,
        text: "Excelente atención y un menú riquísimo para la tarde. Me fascina la propuesta que tienen combinando bienestar y cafetería en una misma casona. Completamente recomendado.",
    }
];

export default function HomeReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play del carrusel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
        }, 5000); // Cambia cada 5 segundos
        
        return () => clearInterval(timer);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="w-full py-24 px-6 md:px-12 bg-[#FAEDDF] flex flex-col items-center overflow-hidden relative">
            {/* Decors */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EACCA4] to-transparent"></div>
            
            <div className="max-w-4xl w-full flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-3 block">Testimonios</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">Lo que dicen nuestros clientes</h2>
                    <p className="text-[#6B5A4E] text-lg max-w-2xl mx-auto">
                        La experiencia y el bienestar de quienes nos visitan es nuestra mayor prioridad.
                    </p>
                </motion.div>
 
                {/* Carrusel */}
                <div className="relative w-full min-h-[250px] md:min-h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EACCA4]/30 flex flex-col items-center text-center w-full max-w-3xl"
                        >
                            <FaQuoteLeft className="text-[#EACCA4] text-4xl mb-4 opacity-50" />
                            <div className="flex gap-1 mb-4 text-[#dfa445]">
                                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="text-[#4A3B32] text-lg md:text-xl italic font-light mb-6">
                                &quot;{REVIEWS[currentIndex].text}&quot;
                            </p>
                            <h4 className="font-bold text-[#4A3B32]">{REVIEWS[currentIndex].name}</h4>
                            <span className="text-[#6B5A4E] text-xs uppercase tracking-wider mt-1 flex items-center gap-1 justify-center">
                                <FaGoogle className="text-sm" /> Reseña de Google
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
 
                {/* Controles de Puntos */}
                <div className="flex gap-3 mt-8">
                    {REVIEWS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[#dfa445] scale-125' : 'bg-[#EACCA4] hover:bg-[#dfa445]/60'}`}
                            aria-label={`Ir a reseña ${idx + 1}`}
                        />
                    ))}
                </div>
 
                {/* Botón de Acción Google */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <Link 
                        href={GOOGLE_REVIEW_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white border-2 border-[#dfa445] text-[#dfa445] px-8 py-4 rounded-xl font-bold hover:bg-[#dfa445] hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1"
                    >
                        <FaGoogle className="text-xl" />
                        ¡Valóranos en Google!
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
