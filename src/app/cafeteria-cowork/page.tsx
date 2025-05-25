import React from 'react';
import Image from 'next/image';

export default function CafeteriaCowork() {
    return (
        <main className="min-h-screen p-4 md:p-8 bg-[#f7f3ee] flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col gap-8">
                {/* Bloque Cafetería */}
                <section className="bg-[#f7f3ee] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-start gap-6 shadow">
                    <div className="flex-1 order-2 md:order-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#da983c]">Cafetería</h2>
                        <p className="text-[#6b4f3b] text-base md:text-lg mb-4">
                            Un espacio familiar y acogedor para venir por la mejor selección de desayunos, onces y pastelería.<br />
                            Con un exquisito café de especialidad.
                        </p>
                        <div className="bg-[#b7c7a3] rounded-[2rem] px-6 py-4 my-4 inline-block">
                            <span className="block text-white font-bold text-base md:text-lg mb-1">Conoce nuestros productos:</span>
                            <span className="block text-white text-base">Carta consumo en local</span>
                            <span className="block text-white text-base">Carta para llevar</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[320px] flex-shrink-0 flex justify-center md:justify-end mb-4 md:mb-0 order-1 md:order-2">
                        <video
                            src="/assets/video/cafeteria.MOV"
                            className="rounded-xl shadow-lg object-cover w-full h-[220px] max-w-[320px]"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </div>
                </section>

                {/* Bloque Coworking */}
                <section className="bg-[#f7f3ee] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-end gap-6 shadow">
                    <div className="w-full md:w-[320px] flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
                        <Image
                            src="/assets/img/cowork.jpg"
                            alt="Coworking"
                            width={320}
                            height={220}
                            className="rounded-xl object-cover w-full h-[220px]"
                            priority
                        />
                    </div>
                    <div className="flex-1 md:order-2">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#b7b7a4]">Espacio de Coworking</h2>
                        <p className="text-[#6b4f3b] text-base md:text-lg mb-2">
                            Un lugar pensado para que padres, madres, emprendedores y todo tipo de personas que teletrabajan, tengan un espacio cálido y cómodo para hacer coworking.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
} 