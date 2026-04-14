'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type ViewState = 'login' | 'forgot' | 'reset';

export default function AdminLoginPage() {
    const [view, setView] = useState<ViewState>('login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Recovery states
    const [recoveryToken, setRecoveryToken] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/agenda'); // O redirige al home dashboard del admin
            } else {
                setError(data.message || 'Error de Autenticación');
            }
        } catch {
            setError('Error conectando al servidor');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/admin/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSuccess('Se han enviado instrucciones a tu correo.');
                setTimeout(() => {
                    setSuccess('');
                    setView('reset');
                }, 2000);
            } else {
                setError(data.message || 'Error al solicitar recuperación');
            }
        } catch {
            setError('Error de red');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/admin/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token: recoveryToken, newPassword })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSuccess('Contraseña restablecida correctamente.');
                setTimeout(() => {
                    setSuccess('');
                    setPassword('');
                    setRecoveryToken('');
                    setView('login');
                }, 2000);
            } else {
                setError(data.message || 'El código es inválido o ha expirado');
            }
        } catch {
            setError('Error de red');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-10 shadow-2xl w-full max-w-md border border-[#EACCA4]/30 flex flex-col items-center overflow-hidden"
            >
                <div className="w-16 h-16 bg-[#8B5E3C] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-[#4A3B32] mb-2 text-center">Acceso Administrador</h1>
                
                <AnimatePresence mode="wait">
                    {view === 'login' && (
                        <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                            <p className="text-[#6B5A4E] text-sm text-center mb-8">
                                Autentícate para gestionar los horarios de bienestar y los talleres del sitio web.
                            </p>

                            {error && <div className="w-full bg-[#FFEBEE] text-[#C62828] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{error}</div>}
                            {success && <div className="w-full bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{success}</div>}

                            <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Correo Electrónico</label>
                                    <input
                                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="contacto@rincondelaromo.com"
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Contraseña</label>
                                    <input
                                        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                        placeholder="*************"
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center tracking-widest"
                                    />
                                </div>
                                
                                <div className="flex justify-end">
                                    <button type="button" onClick={() => { setError(''); setSuccess(''); setView('forgot'); }} className="text-sm text-[#8B5E3C] hover:underline">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                                <button type="submit" disabled={loading} className="w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex justify-center mt-2 disabled:opacity-50">
                                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'forgot' && (
                        <motion.div key="forgot" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                            <p className="text-[#6B5A4E] text-sm text-center mb-8">
                                Ingresa tu correo y te enviaremos un código de seguridad para restaurar tu acceso.
                            </p>

                            {error && <div className="w-full bg-[#FFEBEE] text-[#C62828] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{error}</div>}
                            {success && <div className="w-full bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{success}</div>}

                            <form onSubmit={handleForgotRequest} className="w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Correo Electrónico</label>
                                    <input
                                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu_correo_admin@..."
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center"
                                    />
                                </div>
                                <button type="submit" disabled={loading || !email} className="w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex justify-center mt-2 disabled:opacity-50">
                                    {loading ? 'Enviando...' : 'Pedir Código'}
                                </button>
                                <button type="button" onClick={() => { setError(''); setSuccess(''); setView('login'); }} className="w-full text-[#6B5A4E] py-2 text-sm hover:underline mt-2">
                                    Volver al inicio
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {view === 'reset' && (
                        <motion.div key="reset" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                            <p className="text-[#6B5A4E] text-sm text-center mb-8">
                                Hemos enviado un código a tu correo. Ingrésalo junto con tu nueva contraseña.
                            </p>

                            {error && <div className="w-full bg-[#FFEBEE] text-[#C62828] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{error}</div>}
                            {success && <div className="w-full bg-[#E8F5E9] text-[#2E7D32] text-sm font-medium px-4 py-3 rounded-xl mb-6 text-center">{success}</div>}

                            <form onSubmit={handleResetPassword} className="w-full flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Código de 6 dígitos</label>
                                    <input
                                        type="text" required value={recoveryToken} onChange={(e) => setRecoveryToken(e.target.value)}
                                        placeholder="123456" maxLength={6}
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center tracking-[1em] text-xl font-bold"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Nueva Contraseña</label>
                                    <input
                                        type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6}
                                        placeholder="Min 6 caracteres"
                                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32] text-center tracking-widest"
                                    />
                                </div>
                                <button type="submit" disabled={loading || !recoveryToken || !newPassword} className="w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex justify-center mt-2 disabled:opacity-50">
                                    {loading ? 'Guardando...' : 'Cambiar Contraseña'}
                                </button>
                                <button type="button" onClick={() => { setError(''); setSuccess(''); setView('login'); }} className="w-full text-[#6B5A4E] py-2 text-sm hover:underline mt-2">
                                    Cancelar
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </main>
    );
}
