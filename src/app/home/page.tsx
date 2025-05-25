'use client';

import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white">
            {/* Banner panorámico */}
            <div className="w-full h-[320px] md:h-[420px] relative">
                <Image
                    src="/assets/img/aromos.jpg"
                    alt="Foto panorámica del lugar"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center">Rincón del Aromo</h1>
                </div>
            </div>

            {/* Frase de bienvenida */}
            <div className="w-full bg-[#f7f3ee] py-6 px-4 text-center text-lg md:text-xl font-medium text-[#6b4f3b]">
                Somos un espacio que busca crear una comunidad en familia, amigos, padres, madres e hijos.
            </div>

            {/* ¿Qué hacemos? y Video */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 py-12 px-4 items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-[#6b4f3b]">¿Qué hacemos en Rincón del Aromo?</h2>
                    <ul className="space-y-3 text-lg">
                        <li>👦 After school y terapias infantiles</li>
                        <li>💼 Coworking y apoyo a emprendedores</li>
                        <li>🎨 Talleres para padres e hijos</li>
                        <li>🏡 Un rincón acogedor para disfrutar en familia</li>
                    </ul>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-xs md:max-w-sm aspect-[9/16] rounded-lg overflow-hidden shadow-lg bg-black flex items-center justify-center p-0">
                        {/* Video vertical tipo Instagram */}
                        <video
                            className="w-full h-full object-contain bg-black"
                            src="/assets/video/aromos.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                        />
                    </div>
                </div>
            </div>

            {/* Sección Somos */}
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center py-12 px-4 border-t border-[#e5ded6]">
                <div className="flex items-center justify-center">
                    <Image
                        src="/assets/img/LOGO.png"
                        alt="Foto del lugar"
                        width={350}
                        height={250}
                        className="rounded-xl object-cover shadow-md"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-[#6b4f3b]">Somos</h2>
                    <p className="text-lg text-[#6b4f3b]">
                        Somos Claudia, Javier y Camila y nuestro propósito es ofrecer un espacio cálido y acogedor para que las personas puedan desarrollar sus habilidades y desafíos junto a nosotros.
                    </p>
                </div>
            </div>

            {/* Galería de videos */}
            <div className="w-full max-w-6xl py-12 px-4">
                <h2 className="text-2xl font-bold mb-6 text-[#6b4f3b] text-center">Videos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(num => (
                        <video
                            key={num}
                            src={`/assets/video/home${num}.MOV`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="rounded-lg object-cover h-40 w-full bg-black"
                        />
                    ))}
                </div>
            </div>

            {/* Formulario de novedades */}
            <div className="w-full bg-[#f7f3ee] py-12 px-4 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4 text-[#6b4f3b]">¿Quieres recibir novedades?</h2>
                <form className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
                    <input
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="flex-1 px-4 py-2 rounded border border-[#e5ded6] focus:outline-none focus:ring-2 focus:ring-[#da983c]"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#da983c] text-white px-6 py-2 rounded font-semibold hover:bg-[#b97a2c] transition-colors"
                    >
                        Suscribirme
                    </button>
                </form>
            </div>

        </div>
    );
}

