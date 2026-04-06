"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full flex flex-col">
            <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Salud & Mente</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#4A3B32] leading-tight mb-6">
                Espacio de Bienestar
            </h1>
            <p className="text-lg text-[#6B5A4E] font-light leading-relaxed mb-10">
                Sanar y crecer es un proceso continuo. En el Rincón del Aromo ofrecemos un ambiente seguro, luminoso y profesional para acompañarte en tu bienestar emocional.
            </p>

            <div className="flex flex-col gap-6">
                {therapies.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EACCA4]/20 flex flex-col hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold text-[#4A3B32] mb-2">{t.title}</h3>
                        <p className="text-[#6B5A4E] text-sm">{t.description}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
