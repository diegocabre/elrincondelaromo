'use client';

import React, { useState } from 'react';
import { Settings, Lock, Loader2, Info } from 'lucide-react';

export default function AdminCuentaPage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (newPassword.length < 6) {
            setError('La nueva contraseña debe tener al menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/usuarios/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();
            
            if (res.ok && data.success) {
                setSuccess('Contraseña actualizada con éxito.');
                setCurrentPassword('');
                setNewPassword('');
            } else {
                setError(data.message || 'Error al actualizar contraseña.');
            }
        } catch {
            setError('Error de conexión al servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#4A3B32] flex items-center gap-3">
                    <Settings className="text-[#8B5E3C] w-8 h-8" />
                    Mi Cuenta
                </h1>
                <p className="text-[#6B5A4E] mt-2 border-l-4 border-[#8B5E3C] pl-4">
                    Administra los ajustes de seguridad de tu cuenta.
                </p>
            </header>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#EACCA4]/30">
                <h2 className="text-xl font-bold text-[#4A3B32] mb-6 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#8B5E3C]" />
                    Cambiar Contraseña
                </h2>

                <div className="bg-[#E8F5E9]/50 border border-[#81C784]/30 p-4 rounded-xl flex items-start gap-3 mb-6">
                    <Info className="w-5 h-5 text-[#388E3C] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#2E7D32]">
                        Te recomendamos usar una contraseña segura que incluya mayúsculas, números y símbolos para proteger tu cuenta administrativa.
                    </p>
                </div>

                {error && <div className="text-[#C62828] bg-[#FFEBEE] p-3 rounded-xl text-sm mb-6">{error}</div>}
                {success && <div className="text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-xl text-sm mb-6 font-medium border border-[#A5D6A7]">{success}</div>}

                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide mb-2">Contraseña Actual</label>
                        <input 
                            type="password" 
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-[#EACCA4]/50 rounded-xl focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#8B5E3C] bg-[#FDFCF8]"
                            placeholder="Introduce tu contraseña actual"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide mb-2">Nueva Contraseña</label>
                        <input 
                            type="password" 
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-[#EACCA4]/50 rounded-xl focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#8B5E3C] bg-[#FDFCF8]"
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full mt-4 bg-[#8B5E3C] hover:bg-[#6D492E] text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Actualizar Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
}
