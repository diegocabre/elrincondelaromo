import React from 'react';

export default function Terapia() {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-6">Terapia</h1>
            <div className="max-w-4xl mx-auto">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios de Terapia</h2>
                    <p className="text-lg mb-4">
                        Ofrecemos un espacio seguro y profesional para el bienestar emocional y mental.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Tipos de Terapia</h2>
                    <div className="grid gap-6">
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Terapia Individual</h3>
                            <p>Sesiones personalizadas para abordar necesidades específicas</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Terapia Familiar</h3>
                            <p>Apoyo para mejorar la dinámica familiar y la comunicación</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Terapia de Pareja</h3>
                            <p>Fortalecimiento de relaciones y resolución de conflictos</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Nuestro Enfoque</h2>
                    <p className="text-lg mb-4">
                        Trabajamos con un enfoque integral, considerando las necesidades únicas de cada persona y utilizando técnicas basadas en evidencia.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Agenda tu Cita</h2>
                    <p className="text-lg mb-4">
                        Para agendar una cita o solicitar más información, contáctanos a través de nuestro formulario de contacto.
                    </p>
                </section>
            </div>
        </main>
    );
} 