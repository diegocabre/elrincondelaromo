'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#FDFCF8] text-[#4A3B32]">
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/assets/img/aromos.jpg"
          alt="Rincón del Aromo - Espacio cálido"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FDFCF8]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-12"
        >
          <span className="text-[#E8D1B5] font-medium tracking-[0.2em] uppercase text-sm mb-4">
            El Refugio en la Ciudad
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-sm mb-6 leading-tight">
            Donde la comunidad <br className="hidden md:block"/> florece.
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-light mb-10 max-w-2xl">
            Cafetería, Coworking, Talleres y Bienestar. Todo en un ambiente diseñado para la conexión y el crecimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/cafeteria-cowork">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#8B5E3C] text-white rounded-full font-medium hover:bg-[#6D492E] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                Reserva un Espacio
              </button>
            </Link>
            <Link href="/talleres">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-medium hover:bg-white hover:text-[#8B5E3C] transition-all duration-300">
                Ver Talleres
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Summary Section */}
      <section className="w-full py-24 px-6 md:px-12 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#4A3B32] mb-4">
            Nuestros Espacios
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-24 h-1 bg-[#D4A373] mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={fadeInUp} className="group cursor-pointer">
            <Link href="/cafeteria-cowork">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
                <Image src="/assets/img/home/home1.jpg" alt="Cafetería" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Cafetería</h3>
                  <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">Café de especialidad en un ambiente relajado.</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp} className="group cursor-pointer">
            <Link href="/cafeteria-cowork">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
                <Image src="/assets/img/home/home2.jpg" alt="Coworking" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Coworking</h3>
                  <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">Inspírate y trabaja con comodidad.</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeInUp} className="group cursor-pointer">
            <Link href="/talleres">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
                <Image src="/assets/img/home/home3.jpg" alt="Talleres" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Talleres</h3>
                  <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">Aprende, crea y conecta en comunidad.</p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={fadeInUp} className="group cursor-pointer">
            <Link href="/terapia">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
                <Image src="/assets/img/home/home4.jpg" alt="Bienestar" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Bienestar</h3>
                  <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">Clases y terapias para cuerpo y mente.</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Minimalist */}
      <section className="w-full bg-[#FAEDDF] py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6">La esencia del Rincón del Aromo</h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light mb-8">
              Somos Claudia, Javier y Camila. Nuestro propósito es ofrecer un espacio cálido y acogedor donde puedes desarrollar tus habilidades, disfrutar un buen café, y encontrar equilibrio en tu día a día.
            </p>
            <Link href="/about">
              <span className="text-[#8B5E3C] font-semibold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-wide text-sm">
                Conócenos
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-current"><path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
               <Image
                src="/assets/img/LOGO.png"
                alt="Logo aromos"
                fill
                className="object-cover bg-white p-12"
              />
            </div>
            {/* Pequeño video circular como elemento de diseño asimétrico */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white z-10 hidden md:block">
                 <video
                    className="w-full h-full object-cover"
                    src="/assets/video/aromos.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-24 px-6 text-center max-w-3xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-[#4A3B32] mb-4">Únete a nuestra comunidad</h2>
          <p className="text-[#6B5A4E] mb-8">Suscríbete para recibir noticias de nuevos talleres, promociones en coworking y tips de bienestar.</p>
          <form className="flex flex-col sm:flex-row gap-0 shadow-lg rounded-full overflow-hidden border border-[#EACCA4]">
              <input
                  type="email"
                  placeholder="tu@correo.com"
                  className="flex-1 px-6 py-4 bg-white focus:outline-none text-[#4A3B32]"
                  required
              />
              <button
                  type="submit"
                  className="bg-[#8B5E3C] text-white px-8 py-4 font-semibold hover:bg-[#6D492E] transition-colors"
              >
                  Suscribirme
              </button>
          </form>
        </motion.div>
      </section>
      
    </div>
  );
}

