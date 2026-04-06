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
      
      {/* Header Title */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="w-full max-w-6xl text-center md:text-left mb-12 border-b border-[#E8D1B5] pb-6"
      >
        <span className="text-[#8B5E3C] font-semibold tracking-[0.3em] uppercase text-sm mb-2 block">
          Nuestra Identidad
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32]">
          SOMOS
        </h1>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch"
      >
        {/* Left Column: Image */}
        <motion.div variants={fadeUp} className="relative w-full h-[50vh] lg:h-auto min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl border border-[#E8D1B5]/30">
           <Image
            src="/assets/img/home/Rincon2.jpeg"
            alt="El Rincón del Aromo"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
        </motion.div>

        {/* Right Column: Text Blocks */}
        <motion.div variants={staggerContainer} className="flex flex-col justify-center space-y-12 py-4">
          
          <motion.div variants={fadeUp} className="relative border-l-4 border-[#8B5E3C] pl-6 md:pl-8">
             <p className="text-xl md:text-2xl text-[#4A3B32] font-medium leading-relaxed">
               Rincón del Aromo es un espacio familiar e inclusivo que nace con el propósito de acompañar el desarrollo de niños y el bienestar de adultos. Integramos aprendizaje, juego, movimiento y comunidad, creando un lugar donde todos pueden florecer.
             </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative pl-6 md:pl-8 text-lg text-[#6B5A4E] font-light leading-loose">
             <div className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-[#E8D1B5]" />
             <p>
               Contamos con una cafetería acogedora, espacios de coworking, salas equipadas y áreas pensadas para que tanto niños como adultos se sientan cómodos, contenidos y felices.
             </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative pl-6 md:pl-8 text-lg text-[#6B5A4E] font-light leading-loose">
             <div className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full bg-[#E8D1B5]" />
             <p className="font-medium text-[#8B5E3C]">
               Más que un lugar, somos un punto de encuentro. Un espacio donde crecer, compartir y sentirse parte.
             </p>
          </motion.div>

        </motion.div>
      </motion.div>

    </div>
  );
}