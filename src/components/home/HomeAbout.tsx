"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeAbout() {
  return (
    <section className="w-full bg-[#FAEDDF] py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex items-center justify-center relative"
        >
          <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image 
              src="/assets/img/home/Rincon1.jpeg" 
              alt="Somos Rincón del Aromo" 
              fill 
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col justify-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#4A3B32] mb-8 uppercase tracking-widest border-b-4 border-[#D4A373] pb-2 inline-block w-max">
            SOMOS
          </h2>
          <p className="text-xl md:text-2xl text-[#6B5A4E] leading-relaxed font-light mb-8 italic border-l-4 border-[#8B5E3C] pl-6">
            "Nuestro propósito es ofrecer un espacio cálido y acogedor donde puedes desarrollar tus habilidades, disfrutar un buen café, y encontrar equilibrio en tu día a día."
          </p>
          <Link href="/about">
            <span className="text-[#8B5E3C] font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm mt-4">
              Conoce nuestra historia
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
