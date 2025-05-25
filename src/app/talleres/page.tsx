import React from 'react';

export default function Talleres() {
    return (
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-6">Talleres y Capacitación</h1>
            <div className="max-w-4xl mx-auto">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Nuestros Talleres</h2>
                    <p className="text-lg mb-4">
                        Ofrecemos una variedad de talleres y programas de capacitación diseñados para el desarrollo personal y profesional.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Programas Disponibles</h2>
                    <div className="grid gap-6">
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Talleres Artísticos</h3>
                            <p>Pintura, dibujo, manualidades y más</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Desarrollo Personal</h3>
                            <p>Liderazgo, comunicación efectiva, manejo del estrés</p>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Capacitación Profesional</h3>
                            <p>Habilidades digitales, emprendimiento, marketing</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Inscripciones</h2>
                    <p className="text-lg mb-4">
                        Para más información sobre nuestros talleres y proceso de inscripción, contáctanos.
                    </p>
                </section>
            </div>
        </main>
    );
} 