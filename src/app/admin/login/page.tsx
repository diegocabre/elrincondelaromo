'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/agenda'); // O redirige al home dashboard del admin
            } else {
                setError(data.message || 'Error de Autenticación');
            }
        } catch (err) {
            setError('Error conectando al servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-10 shadow-2xl w-full max-w-md border border-[#EACCA4]/30 flex flex-col items-center"
            >
                <div className="w-16 h-16 bg-[#8B5E3C] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-[#4A3B32] mb-2 text-center">Acceso Administrador</h1>
                <p className="text-[#6B5A4E] text-sm text-center mb-8">
                    Autentícate para gestionar los horarios de bienestar y los talleres del sitio web.
                </p>

                {error && (
                    <div className="w-full bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Clave Maestra</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*************"
                            className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center tracking-widest"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex justify-center mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Verificando...' : 'Iniciar Sesión'}
                    </button>
                </form>

            </motion.div>
        </main>
    );
}
