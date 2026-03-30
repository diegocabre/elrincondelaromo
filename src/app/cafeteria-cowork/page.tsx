'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
};

export default function CafeteriaCowork() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12 overflow-hidden">
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-6xl flex flex-col gap-24"
      >
        {/* Header Title */}
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Nuestros Espacios</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight">
            Un lugar para saborear y crear
          </h1>
        </motion.div>

        {/* Bloque Cafetería */}
        <motion.section 
          variants={fadeUp}
          className="relative w-full flex flex-col md:flex-row items-center gap-12"
        >
          <div className="w-full md:w-1/2 relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="/assets/img/home/home1.jpg" 
                alt="Cafetería de Especialidad" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start px-4 md:px-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">Cafetería</h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed mb-8 font-light">
               Un espacio familiar y acogedor para venir por la mejor selección de desayunos, onces y pastelería. Disfruta de una pausa con nuestro exquisito café de especialidad.
            </p>
            
            <div className="bg-[#EACCA4]/30 border border-[#EACCA4] rounded-3xl p-8 w-full backdrop-blur-sm">
                <span className="block text-[#8B5E3C] font-semibold text-lg mb-4 uppercase tracking-wide">Nuestro Menú</span>
                <div className="flex flex-col gap-3">
                    <button className="w-full bg-white text-[#4A3B32] px-6 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-[#FDFCF8] transition-all flex justify-between items-center group">
                        <span className="font-medium">Carta consumo en local</span>
                        <span className="text-[#8B5E3C] transform transition-transform group-hover:translate-x-1">→</span>
                    </button>
                    <button className="w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl shadow-sm hover:shadow-lg hover:bg-[#6D492E] transition-all flex justify-between items-center group">
                        <span className="font-medium">Carta para llevar</span>
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="w-full flex justify-center py-4">
            <div className="w-24 h-px bg-[#EACCA4]"></div>
        </div>

        {/* Bloque Coworking */}
        <motion.section 
          variants={fadeUp}
          viewport={{ once: true, margin: "-100px" }}
          initial="hidden"
          whileInView="visible"
          className="relative w-full flex flex-col md:flex-row-reverse items-center gap-12"
        >
          <div className="w-full md:w-1/2 relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group">
              <Image
                src="/assets/img/cowork.jpg"
                alt="Espacio de Coworking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Optional overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col items-start px-4 md:px-10">
            <span className="text-[#8B5E3C] font-semibold tracking-wide uppercase text-sm mb-4 block">Productividad & Enfoque</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">Coworking</h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed mb-8 font-light">
              Un lugar pensado para que madres, padres, profesionales independientes y emprendedores tengan un espacio cálido, conectado y muy cómodo para teletrabajar.
            </p>
            <ul className="space-y-4 text-[#4A3B32] mb-8 font-medium">
                <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#8B5E3C] rounded-full"></span>
                    Wifi de alta velocidad
                </li>
                <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#8B5E3C] rounded-full"></span>
                    Ambiente climatizado y luminoso
                </li>
                <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#8B5E3C] rounded-full"></span>
                    Descuento en cafetería
                </li>
            </ul>
            <button className="px-10 py-4 bg-transparent border-2 border-[#8B5E3C] text-[#8B5E3C] rounded-full font-bold hover:bg-[#8B5E3C] hover:text-white transition-all duration-300">
                Ver Planes
            </button>
          </div>
        </motion.section>

      </motion.div>
    </main>
  );
}