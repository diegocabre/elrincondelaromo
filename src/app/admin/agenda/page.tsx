'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, CheckCircle, X, PlusCircle, LayoutList } from 'lucide-react';

interface Booking {
    id: string;
    service: string;
    date: string;
    name: string;
    email: string;
}

interface AvailableHour {
    id: string;
    start_time: string;
    therapy_id?: string;
}

interface Therapy {
    id: string;
    title: string;
    description: string;
}

export default function AdminAgendaPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [availableSlots, setAvailableSlots] = useState<AvailableHour[]>([]);
    const [therapies, setTherapies] = useState<Therapy[]>([]);
    const [loading, setLoading] = useState(true);

    const [openDate, setOpenDate] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [openTherapyId, setOpenTherapyId] = useState('');
    const [openQuantity, setOpenQuantity] = useState(1);

    const [therapyTitle, setTherapyTitle] = useState('');
    const [therapyDesc, setTherapyDesc] = useState('');

    const fetchData = async () => {
        setLoading(true);
        // Traer Reservas
        const resBookings = await supabase.from('bookings').select('*').order('date', { ascending: false });
        if (resBookings.data) setBookings(resBookings.data);

        // Traer Horas Habilitadas
        const resAvailable = await supabase.from('available_hours').select('*').order('start_time', { ascending: false });
        if (resAvailable.data) setAvailableSlots(resAvailable.data);

        // Traer Terapias Dinámicas
        const resTherapies = await supabase.from('therapies').select('*').order('created_at', { ascending: true });
        if (resTherapies.data) setTherapies(resTherapies.data);
        
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenHour = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!openTherapyId) {
            alert('Debes seleccionar una terapia a la cual asociar el horario.');
            return;
        }
        const [year, month, day] = openDate.split('-').map(Number);
        const [hour, minute] = openTime.split(':').map(Number);
        const d = new Date(year, month - 1, day, hour, minute);
        const dateIso = d.toISOString();
        
        const rowsToInsert = Array.from({ length: openQuantity }).map(() => ({
            start_time: dateIso,
            therapy_id: openTherapyId
        }));

        const { error } = await supabase.from('available_hours').insert(rowsToInsert);

        if (!error) {
            setOpenDate('');
            setOpenTime('');
            setOpenQuantity(1);
            fetchData();
        } else {
            alert('Error al habilitar hora: ' + error.message);
        }
    };

    const handleDeleteHour = async (id: string) => {
        if (!confirm('¿Deseas eliminar esta hora y cerrarla al público?')) return;
        const { error } = await supabase.from('available_hours').delete().eq('id', id);
        if (!error) fetchData();
    };

    const handleAddTherapy = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('therapies').insert([
            { title: therapyTitle, description: therapyDesc }
        ]);

        if (!error) {
            setTherapyTitle('');
            setTherapyDesc('');
            fetchData();
        } else {
            alert('Error al crear terapia: ' + error.message);
        }
    };

    const handleDeleteTherapy = async (id: string) => {
        if (!confirm('¿Eliminar esta terapia defintivamente? Desaparecerá de tu sitio web.')) return;
        const { error } = await supabase.from('therapies').delete().eq('id', id);
        if (!error) fetchData();
    };

    const handleDeleteBooking = async (id: string) => {
        if (!confirm('¿Seguro quieres cancelar/eliminar esta reserva? El cliente NO será notificado automáticamente mediante correo. Además, el cupo numérico quedará inmediatamente liberado al público nuevamente.')) return;
        const { error } = await supabase.from('bookings').delete().eq('id', id);
        if (!error) fetchData();
    };

    const formatDateTime = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleString('es-CL', { dateStyle: 'long', timeStyle: 'short' });
    };

    if (loading) return <div className="text-center py-20 text-[#8B5E3C] font-semibold">Cargando Agenda y Terapias...</div>;

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-3xl font-bold text-[#4A3B32]">Agenda Bienestar (Dinámica)</h1>

            {/* SECCIÓN TERAPIAS DYNAMICA */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30 flex flex-col xl:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-2 flex items-center gap-2">
                        <LayoutList className="w-5 h-5 text-[#8B5E3C]"/> Gestor de Servicios/Terapias
                    </h2>
                    <p className="text-[#6B5A4E] text-sm mb-6">Agrega los servicios que ofreces. Aparecerán de inmediato en el formulario web.</p>
                    
                    <form onSubmit={handleAddTherapy} className="flex flex-col md:flex-row gap-4 items-end mb-8">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Título de Terapia</label>
                            <input type="text" placeholder="Ej: Terapia de Pareja" required value={therapyTitle} onChange={(e)=>setTherapyTitle(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 flex-[2]">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Breve Descripción</label>
                            <input type="text" placeholder="Resolver conflictos..." required value={therapyDesc} onChange={(e)=>setTherapyDesc(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <button type="submit" className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md h-[48px] flex items-center gap-2">
                            <PlusCircle size={18}/> Crear
                        </button>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {therapies.map(t => (
                             <div key={t.id} className="p-4 rounded-xl border border-[#EACCA4] bg-[#FDFCF8] flex flex-col shadow-sm relative group">
                                <button onClick={() => handleDeleteTherapy(t.id)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={16}/>
                                </button>
                                <h3 className="font-bold text-[#4A3B32]">{t.title}</h3>
                                <p className="text-xs text-[#6B5A4E] mt-1">{t.description}</p>
                             </div>
                         ))}
                    </div>
                </div>
            </div>

            {/* Formulario para Habilitar hora */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30 flex flex-col xl:flex-row gap-8 items-start">
                <div className="flex-1 w-full">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B5E3C]"/> Habilitar Horario al Público
                    </h2>
                    <p className="text-[#6B5A4E] text-sm mb-6">Solo los días y horas que agregues aquí estarán abiertos al público para reservar.</p>
                    
                    <form onSubmit={handleOpenHour} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Terapia</label>
                            <select required value={openTherapyId} onChange={(e)=>setOpenTherapyId(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]">
                                <option value="" disabled>Selecciona Terapia</option>
                                {therapies.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Fecha</label>
                            <input type="date" required value={openDate} onChange={(e)=>setOpenDate(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Hora</label>
                            <input type="time" required value={openTime} onChange={(e)=>setOpenTime(e.target.value)} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 w-24">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase" title="¿Cuántas personas pueden reservar esta hora?">Cupos</label>
                            <input type="number" min="1" required value={openQuantity} onChange={(e)=>setOpenQuantity(Number(e.target.value))} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center" title="Capacidad de personas"/>
                        </div>
                        <button type="submit" className="bg-[#2E7D32] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors shadow-md h-[48px]">
                            Abrir
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Visualizador de Horas Habilitadas */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#8B5E3C]"/> Cupos Habilitados (Lista Blanca)
                    </h2>
                    {availableSlots.length === 0 ? (
                        <p className="text-sm text-[#6B5A4E]">No hay cupos abiertos actualmente.</p>
                    ) : (
                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
                            {Object.values(availableSlots.reduce((acc, b) => {
                                const key = `${b.start_time}_${b.therapy_id}`;
                                if (!acc[key]) acc[key] = { ...b, count: 0, ids: [] };
                                acc[key].count += 1;
                                acc[key].ids.push(b.id);
                                return acc;
                            }, {} as any)).map((group: any) => (
                                <div key={group.ids[0]} className="flex items-center justify-between p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
                                    <div>
                                        <p className="font-bold text-[#2E7D32] text-sm">{formatDateTime(group.start_time)}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-[#2E7D32] opacity-80">{group.therapy_id ? therapies.find(t => t.id === group.therapy_id)?.title : 'Cupo Global'}</p>
                                            {group.count > 0 && <span className="text-[10px] bg-[#C8E6C9] text-[#1B5E20] px-2 py-0.5 rounded-full font-bold">{group.count} cupos vivos</span>}
                                        </div>
                                    </div>
                                    <button onClick={async () => {
                                        if (!confirm(`¿Deseas eliminar y CERRAR AL PÚBLICO absolutamente todos los cupos (${group.count}) de este horario?`)) return;
                                        const { error } = await supabase.from('available_hours').delete().in('id', group.ids);
                                        if (!error) fetchData();
                                    }} className="p-2 text-[#C62828] hover:bg-[#FFCDD2] rounded-lg transition-colors border border-transparent hover:border-[#FFCDD2]" title="Cerrar cupo">
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
                        <CheckCircle className="w-5 h-5 text-[#8B5E3C]"/> Reservas Concretadas
                    </h2>
                    {bookings.length === 0 ? (
                        <p className="text-sm text-[#6B5A4E]">No hay reservas agendadas.</p>
                    ) : (
                        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                            {bookings.map(b => (
                                <div key={b.id} className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#EACCA4]/50 shadow-sm flex flex-col gap-2 relative group mt-4">
                                    <button 
                                        onClick={() => handleDeleteBooking(b.id)} 
                                        className="absolute -top-3 -right-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg border border-red-200 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-600 hover:text-white"
                                        title="Cancelar esta reserva liberando el cupo"
                                    >
                                        Cancelar / Eliminar
                                    </button>
                                    <div className="flex justify-between items-start">
                                        <span className="bg-[#E8D1B5]/30 text-[#8B5E3C] text-xs font-bold uppercase px-3 py-1 rounded-full">{b.service}</span>
                                        <span className="text-[#8B5E3C] font-semibold text-sm mr-2">{formatDateTime(b.date)}</span>
                                    </div>
                                    <h3 className="font-bold text-[#4A3B32] text-lg mt-2">{b.name}</h3>
                                    <p className="text-sm text-[#6B5A4E] truncate max-w-full">{b.email}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
