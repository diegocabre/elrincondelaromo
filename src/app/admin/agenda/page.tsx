'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, X, Lock } from 'lucide-react';

interface Booking {
    id: string;
    service: string;
    date: string;
    name: string;
    email: string;
}

interface BlockedHour {
    id: string;
    start_time: string;
    end_time: string;
    reason: string;
}

export default function AdminAgendaPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [blocks, setBlocks] = useState<BlockedHour[]>([]);
    const [loading, setLoading] = useState(true);

    const [blockDate, setBlockDate] = useState('');
    const [blockTime, setBlockTime] = useState('');
    const [blockReason, setBlockReason] = useState('');

    const fetchData = async () => {
        setLoading(true);
        // Traer Reservas
        const resBookings = await supabase.from('bookings').select('*').order('date', { ascending: false });
        if (resBookings.data) setBookings(resBookings.data);

        // Traer Bloqueos
        const resBlocks = await supabase.from('blocked_hours').select('*').order('start_time', { ascending: false });
        if (resBlocks.data) setBlocks(resBlocks.data);
        
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleBlockHour = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateIso = `${blockDate}T${blockTime}:00`;
        
        const { error } = await supabase.from('blocked_hours').insert([
            {
                start_time: dateIso,
                end_time: dateIso, // Para lógica simple asumimos que el inicio bloquea ese "bloque" exacto
                reason: blockReason || 'Bloqueo Manual'
            }
        ]);

        if (!error) {
            setBlockDate('');
            setBlockTime('');
            setBlockReason('');
            fetchData();
        } else {
            alert('Error al bloquear hora: ' + error.message);
        }
    };

    const handleDeleteBlock = async (id: string) => {
        if (!confirm('¿Deseas eliminar este bloqueo y liberar la hora?')) return;
        
        const { error } = await supabase.from('blocked_hours').delete().eq('id', id);
        if (!error) {
            fetchData();
        }
    };

    const formatDateTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' });
    };

    if (loading) return <div className="text-center py-20 text-[#8B5E3C] font-semibold">Cargando Agenda...</div>;

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-3xl font-bold text-[#4A3B32]">Agenda Bienestar</h1>

            {/* Formulario para bloquear hora */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30 flex flex-col xl:flex-row gap-8 items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-2 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#8B5E3C]"/> Bloquear Horario
                    </h2>
                    <p className="text-[#6B5A4E] text-sm mb-6">Bloquea un día y una hora específica para que no aperezca disponible al público (ej. feriados, hora de colación).</p>
                    
                    <form onSubmit={handleBlockHour} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Fecha</label>
                            <input type="date" required value={blockDate} onChange={(e)=>setBlockDate(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Hora Exacta</label>
                            <input type="time" required value={blockTime} onChange={(e)=>setBlockTime(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Motivo (Opcional)</label>
                            <input type="text" placeholder="Vacaciones..." value={blockReason} onChange={(e)=>setBlockReason(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <button type="submit" className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md h-[48px]">
                            Bloquear
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visualizador de Horas Bloqueadas */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#8B5E3C]"/> Horarios Bloqueados Restringidos
                    </h2>
                    {blocks.length === 0 ? (
                        <p className="text-sm text-[#6B5A4E]">No hay horarios bloqueados.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {blocks.map(b => (
                                <div key={b.id} className="flex items-center justify-between p-4 rounded-xl bg-[#FFEBEE] border border-[#FFCDD2]">
                                    <div>
                                        <p className="font-bold text-[#C62828] text-sm">{formatDateTime(b.start_time)}</p>
                                        {b.reason && <p className="text-xs text-[#C62828] mt-1 opacity-80">{b.reason}</p>}
                                    </div>
                                    <button onClick={() => handleDeleteBlock(b.id)} className="p-2 text-[#C62828] hover:bg-[#FFCDD2] rounded-lg transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reservas Recientes */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#8B5E3C]"/> Reservas de Pacientes
                    </h2>
                    {bookings.length === 0 ? (
                        <p className="text-sm text-[#6B5A4E]">No hay reservas agendadas.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {bookings.map(b => (
                                <div key={b.id} className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#EACCA4]/50 shadow-sm flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <span className="bg-[#E8D1B5]/30 text-[#8B5E3C] text-xs font-bold uppercase px-3 py-1 rounded-full">{b.service}</span>
                                        <span className="text-[#8B5E3C] font-semibold text-sm">{formatDateTime(b.date)}</span>
                                    </div>
                                    <h3 className="font-bold text-[#4A3B32] text-lg mt-2">{b.name}</h3>
                                    <p className="text-sm text-[#6B5A4E]">{b.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
