'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      
      {/* Header Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex flex-col items-center max-w-3xl text-center mb-24"
      >
        <motion.div variants={fadeUp} className="w-32 h-32 relative mb-8 rounded-full shadow-lg overflow-hidden bg-white p-4">
           <Image
            src="/assets/img/LOGO.png"
            alt="Logo El Rincón del Aromo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.span variants={fadeUp} className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4">
          Nuestra Historia
        </motion.span>
        
        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-[#4A3B32] mb-6 leading-tight">
          Un espacio donde te sientes como en casa
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl text-[#6B5A4E] font-light leading-relaxed">
         Somos Claudia, Javier y Camila. Nuestro propósito es ofrecer un lugar cálido y acogedor para que las personas puedan desarrollar sus habilidades, encontrar equilibrio y enfrentar nuevos desafíos junto a nosotros.
        </motion.p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Claudia */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center group cursor-default">
          <div className="w-48 h-48 relative mb-6 rounded-full overflow-hidden shadow-xl ring-8 ring-white transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
            <Image
              src="/assets/img/claudia.png"
              alt="Claudia Vasquez"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-1">Claudia Vásquez</h2>
          <div className="text-[#8B5E3C] font-medium tracking-wide text-sm uppercase mb-4">Educadora Diferencial</div>
          <ul className="text-sm text-[#6B5A4E] space-y-2 opacity-80 pb-6 border-b border-[#EACCA4] max-w-xs px-4">
            <li>Magíster en Educación Especial y Comunicación</li>
            <li>Especialista en dificultades del aprendizaje y lenguaje</li>
            <li>Certificaciones en Neurociencia y Educación Emocional</li>
          </ul>
        </motion.div>

        {/* Javier */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center group cursor-default">
          <div className="w-48 h-48 relative mb-6 rounded-full overflow-hidden shadow-xl ring-8 ring-white transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
            <Image
              src="/assets/img/javier.jpg"
              alt="Javier Cisterna"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-1">Javier Cisterna</h2>
          <div className="text-[#8B5E3C] font-medium tracking-wide text-sm uppercase mb-4">Ingeniero Civil Industrial</div>
          <ul className="text-sm text-[#6B5A4E] space-y-2 opacity-80 pb-6 border-b border-[#EACCA4] max-w-xs px-4">
            <li>Ingeniero en Prevención de Riesgos</li>
            <li>Magíster en Gestión de Personas y Capital Humano</li>
          </ul>
        </motion.div>

        {/* Camila */}
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center group cursor-default">
          <div className="w-48 h-48 relative mb-6 rounded-full overflow-hidden shadow-xl ring-8 ring-white transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
            <Image
              src="/assets/img/camila.jpg"
              alt="Camila Alvear"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#4A3B32] mb-1">Camila Alvear</h2>
          <div className="text-[#8B5E3C] font-medium tracking-wide text-sm uppercase mb-4">Periodista</div>
          <ul className="text-sm text-[#6B5A4E] space-y-2 opacity-80 pb-6 border-b border-[#EACCA4] max-w-xs px-4">
            <li>Magíster en Medios de Comunicación</li>
            <li>Magíster en Responsabilidad Social Corporativa y Sostenibilidad</li>
            <li>Diplomada en Comunicación Estratégica</li>
          </ul>
        </motion.div>

      </motion.div>
    </div>
  );
}