"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeAbout() {
  return (
      <section className="w-full bg-[#FAEDDF] py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">
              La esencia del Rincón del Aromo
            </h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light mb-8">
              Somos Claudia, Javier y Camila. Nuestro propósito es ofrecer un
              espacio cálido y acogedor donde puedes desarrollar tus
              habilidades, disfrutar un buen café, y encontrar equilibrio en tu
              día a día.
            </p>
            <Link href="/about">
              <span className="text-[#8B5E3C] font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm">
                Conócenos
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center relative"
          >
            <div className="w-full max-w-sm aspect-[4/5] relative rounded-t-full overflow-hidden shadow-2xl ring-8 ring-white">
              <Image src="/assets/img/ventanal.png" alt="Logo aromos" fill />
            </div>
          </motion.div>
        </div>
      </section>
  );
}
