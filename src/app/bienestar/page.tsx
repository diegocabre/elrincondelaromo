'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const terapias = [
    { title: "Terapia Individual", desc: "Sesiones personalizadas para abordar necesidades específicas y encontrar tu centro." },
    { title: "Terapia Familiar", desc: "Apoyo guiado para mejorar la dinámica, comunicación y el bienestar en el hogar." },
    { title: "Terapia de Pareja", desc: "Fortalecimiento de relaciones, resolución de conflictos y reencuentro." }
];

export default function BienestarPage() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState(false);

    const [selectedService, setSelectedService] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!selectedDate) return;
        
        const fetchTimes = async () => {
            setLoadingTimes(true);
            try {
                // Fetch de base de horas disponibles desde nuestra ruta API
                const res = await fetch(`/api/availability?date=${selectedDate}`);
                const data = await res.json();
                if (data.available) {
                    setAvailableTimes(data.available);
                }
            } catch (err) {
                console.error("Error buscando horas", err);
            } finally {
                setLoadingTimes(false);
            }
        };

        fetchTimes();
        setSelectedTime(''); // Reset hora si cambia la fecha
    }, [selectedDate]);

    const handleSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const finalDateTime = `${selectedDate}T${selectedTime}:00`;

        try {
            const { error } = await supabase
                .from('bookings')
                .insert([
                    {
                        service: selectedService,
                        date: finalDateTime,
                        name: name,
                        email: email,
                    }
                ]);

            if (error) {
                console.error("Error al insertar:", error);
                throw error;
            }

            setSuccessMessage(`¡Cita agendada para ${name}! Nos contactaremos contigo al email ${email} para confirmar los detalles.`);
            
            // Limpia el formulario
            setSelectedService('');
            setSelectedDate('');
            setSelectedTime('');
            setName('');
            setEmail('');
            setAvailableTimes([]);

        } catch {
            setErrorMessage("Hubo un error al intentar reservar. Por favor revisa tu conexión o intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="w-full max-w-6xl flex flex-col lg:flex-row gap-16"
            >
                {/* Info Section */}
                <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex flex-col">
                    <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Salud & Mente</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#4A3B32] leading-tight mb-6">
                        Espacio de Bienestar
                    </h1>
                    <p className="text-lg text-[#6B5A4E] font-light leading-relaxed mb-10">
                        Sanar y crecer es un proceso continuo. En el Rincón del Aromo ofrecemos un ambiente seguro, luminoso y profesional para acompañarte en tu bienestar emocional.
                    </p>

                    <div className="flex flex-col gap-6">
                        {terapias.map((t, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EACCA4]/20 flex flex-col hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-semibold text-[#4A3B32] mb-2">{t.title}</h3>
                                <p className="text-[#6B5A4E] text-sm">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Booking Form Section */}
                <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex items-start justify-center">
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl w-full border border-[#EACCA4]/40 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#8B5E3C]" />
                        
                        <h2 className="text-2xl font-bold text-[#4A3B32] mb-2 mt-2">Agenda tu Cita</h2>
                        <p className="text-[#6B5A4E] text-sm mb-6">Selecciona el servicio, elige una fecha para ver las horas disponibles, e ingresa tus datos.</p>

                        {successMessage && (
                            <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] rounded-xl text-sm font-medium">
                                {successMessage}
                            </div>
                        )}
                        
                        {errorMessage && (
                            <div className="mb-6 p-4 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] rounded-xl text-sm font-medium">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSchedule} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={name}
                                        placeholder="Ej. Juan Pérez"
                                        onChange={(e) => setName(e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={email}
                                        placeholder="tu@email.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Servicio</label>
                                <select 
                                    required
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                                >
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option value="Terapia Individual">Terapia Individual</option>
                                    <option value="Terapia Familiar">Terapia Familiar</option>
                                    <option value="Terapia de Pareja">Terapia de Pareja</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Día Abierto</label>
                                <input 
                                    type="date" 
                                    required
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                                />
                            </div>

                            {selectedDate && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Horas Disponibles</label>
                                    {loadingTimes ? (
                                        <p className="text-[#6B5A4E] text-sm">Cargando cupos...</p>
                                    ) : availableTimes.length > 0 ? (
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                            {availableTimes.map(time => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 rounded-xl border text-sm font-medium transition-all ${selectedTime === time ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]' : 'bg-transparent text-[#6B5A4E] border-[#EACCA4]/50 hover:border-[#8B5E3C]'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-sm">
                                            No hay horas disponibles para el día seleccionado. Intenta otro día.
                                        </div>
                                    )}
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading || !selectedTime}
                                className="mt-4 w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Procesando Reserva..." : (!selectedTime ? "Selecciona una hora" : "Confirmar Reserva")}
                            </button>
                        </form>
                    </div>
                </motion.div>

            </motion.div>
        </main>
    );
}