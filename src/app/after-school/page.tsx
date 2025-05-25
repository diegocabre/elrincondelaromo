import React from 'react';
import Image from "next/image";

export default function AfterSchool() {
    return (
        <main className="min-h-screen p-4 md:p-8 bg-[#f7f3ee] flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">CONOCE NUESTRO AFTER SCHOOL</h1>
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-6 w-full items-center mb-6">
                    <div className="w-full md:w-1/2 text-[#6b4f3b] text-base md:text-lg text-center md:text-left mb-4 md:mb-0">
                        <p>
                            Entendemos que cada familia tiene rutinas diferentes, por eso, ofrecemos un proyecto educativo que garantiza que los niños y niñas siempre tengan un lugar seguro, acogedor que aporta a su crecimiento y necesidades.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-56 h-40 relative mx-auto">
                            <Image src="/assets/img/after1.jpg" alt="Niños After School" fill className="rounded-lg object-cover" />
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-[#e5ded6] my-4"></div>
                <div className="w-full flex flex-col md:flex-row gap-6 items-start mb-4">
                    <div className="w-full md:w-1/2 text-center">
                        <h2 className="text-lg font-semibold mb-2 text-[#6b4f3b]">¿Qué incluye?</h2>
                        <ul className="text-[#6b4f3b] text-base space-y-1">
                            <li>Horarios Flexibles</li>
                            <li>Actividades dirigidas</li>
                            <li>Cowork para tutores en el lugar</li>
                            <li>Matrícula Gratis</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        {/* Galería de fotos After School */}
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-3 justify-center">
                            {[2, 3, 4, 5].map((num) => (
                                <div key={num} className="rounded-lg overflow-hidden shadow mx-auto">
                                    <Image
                                        src={`/assets/img/after${num}.jpg`}
                                        alt={`After School ${num}`}
                                        width={180}
                                        height={120}
                                        className="object-cover w-full h-24 md:h-28"
                                        priority
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-[#e5ded6] my-4"></div>
                <div className="w-full text-center mb-2">
                    <h2 className="text-lg font-semibold text-[#6b4f3b] mb-1">¿Por qué elegirnos?</h2>
                    <h3 className="text-base font-bold text-[#6b4f3b] mb-2">Contamos con Profesionales de la Educación</h3>
                    <p className="text-[#6b4f3b] text-base mb-2">
                        Contamos con un equipo de profesionales altamente calificados para ofrecer una atención personalizada y especializada a tu hija y/o hijo. En un espacio de apoyo, contención y flexibilidad.
                    </p>
                </div>
                <div className="w-full border-t border-[#e5ded6] my-4"></div>
                <div className="w-full text-center mb-2">
                    <h3 className="text-base font-bold text-[#6b4f3b] mb-1">Jornadas y Horarios Flexibles</h3>
                    <p className="text-[#6b4f3b] text-base mb-2">
                        Entendemos que cada familia tiene rutinas diferentes y que un After School puede ser agotador para los niños. Por eso, ofrecemos horarios flexibles y un proyecto educativo que garantiza que los niños y niñas siempre tengan un lugar seguro, acogedor que aporta a su crecimiento y necesidades.
                    </p>
                </div>
                <div className="w-full border-t border-[#e5ded6] my-4"></div>
                <div className="w-full text-center mb-2">
                    <h3 className="text-base font-bold text-[#6b4f3b] mb-1">Zona Residencial</h3>
                    <p className="text-[#6b4f3b] text-base mb-2">
                        Estamos ubicados en un sector residencial tranquilo y seguro. Nuestro centro tiene por objeto ofrecer un ambiente seguro y tranquilo, ideal para el bienestar de tu hijo o hija.<br />
                        ¡Un entorno perfecto para su desarrollo!
                    </p>
                </div>
                <div className="w-full border-t border-[#e5ded6] my-4"></div>
                <div className="w-full text-center mt-2">
                    <span className="block text-lg font-bold text-[#da983c]">INSCRIPCIONES O MÁS INFORMACIÓN, ESCRÍBENOS!</span>
                </div>
            </div>
        </main>
    );
} 