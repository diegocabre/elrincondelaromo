'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function CafeteriaCowork() {
  const plans = [
    {
      title: "Cowork Session",
      desc: "Ideal para una reunión, estudio o una mañana productiva.",
      duration: "2 horas de cowork",
      features: ["Café refill incluido"],
      price: "$5.900"
    },
    {
      title: "Creative Day",
      desc: "Para quienes necesitan tiempo y espacio para avanzar en sus proyectos.",
      duration: "4 horas de cowork",
      features: ["Café refill incluido"],
      price: "$8.900"
    },
    {
      title: "Full Day",
      desc: "Tu oficina favorita por todo el día.",
      duration: "Jornada completa de cowork",
      features: ["Café refill incluido", "15% de descuento en cafetería"],
      price: "$12.900"
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12 overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-6xl flex flex-col gap-20"
      >
        {/* Cabecera Principal */}
        <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto mb-4">
          <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-4 block">Nuestros Espacios</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-2">
            Productividad con aroma a café.
          </h1>
        </motion.div>

        {/* Sección Cafetería */}
        <motion.section 
          variants={fadeUp}
          className="relative w-full flex flex-col md:flex-row items-stretch gap-12"
        >
          {/* Columna Izquierda: Imagen */}
          <div className="w-full md:w-1/2 relative min-h-[400px] md:h-auto rounded-[2rem] overflow-hidden shadow-xl border border-[#dfa445]/10">
            <Image 
              src="/assets/img/home/home1.jpg" 
              alt="Cafetería de Especialidad" 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>

          {/* Columna Derecha: Texto */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-2 md:px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">Cafetería</h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed mb-6 font-light">
              Café de especialidad, opciones dulces y saladas, cowork, talleres y una comunidad que cree en el poder de las buenas ideas.
            </p>
            <p className="text-lg text-[#6B5A4E] leading-relaxed mb-8 font-light">
              Ya sea para trabajar, reunirte, aprender o simplemente desconectarte un momento, aquí siempre encontrarás un lugar para ti.
            </p>
            
            <div className="w-full">
              <a 
                href="https://menu.fu.do/rincondelaromo/qr-menu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn_gq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex justify-between items-center w-full max-w-xs bg-[#dfa445] text-white px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:bg-[#c99136] transition-all group font-medium"
              >
                <span>Carta consumo local</span>
                <span className="transform transition-transform group-hover:translate-x-1 ml-4">→</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="w-full flex justify-center py-4">
          <div className="w-24 h-px bg-[#dfa445]/20"></div>
        </div>

        {/* Sección Planes CoWork */}
        <motion.section 
          variants={fadeUp}
          className="w-full flex flex-col items-center gap-12"
        >
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-4">Planes CoWork</h2>
            <h3 className="text-xl text-[#dfa445] font-semibold mb-6">En cafetería</h3>
            <p className="text-[#6B5A4E] font-light leading-relaxed mb-4">
              Un espacio pensado para crear, pausar y hacer crecer tu proyecto.
            </p>
            
            {/* Características Incluidas */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-[#4A3B32] font-medium">
              {["Wifi de alta velocidad", "Enchufes disponibles", "Calefacción", "Ambiente tranquilo y acogedor", "Café de especialidad"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Check size={16} className="text-[#dfa445] stroke-[3px]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#6B5A4E]/80 mt-4 italic">Valores por persona.</p>
          </div>

          {/* Grilla de Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {plans.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#6e721b] text-white rounded-[2rem] p-8 shadow-lg flex flex-col justify-between items-center text-center border border-[#6e721b]/20 min-h-[380px]"
              >
                <div className="flex flex-col items-center w-full">
                  <h4 className="text-2xl font-bold mb-4 tracking-wide">{plan.title}</h4>
                  <p className="text-white/80 text-sm font-light mb-6 min-h-[40px] leading-relaxed">
                    {plan.desc}
                  </p>
                  <div className="w-full h-px bg-white/20 mb-6"></div>
                  <ul className="space-y-2 text-sm font-medium mb-6">
                    <li className="text-white">{plan.duration}</li>
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="text-white/90 font-light">{feat}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-3xl font-extrabold tracking-wide mt-auto">
                  {plan.price}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Frase Cierre */}
          <div className="text-center mt-8">
            <p 
              className="text-[#6B5A4E] text-lg md:text-xl italic font-light max-w-3xl leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;Ven por un café, quédate por las ideas. <br className="md:hidden" /> Reserva tu espacio y disfruta una nueva forma de trabajar en Osorno.&rdquo;
            </p>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}