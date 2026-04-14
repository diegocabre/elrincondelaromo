'use client';

import React, { useState, useEffect } from 'react';
import { UserCircle2, Plus, Mail, Loader2, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
    id: string;
    email: string;
    created_at: string;
}

export default function AdminUsuariosPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/usuarios');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/admin/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newEmail, password: newPassword })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSuccess('Usuario creado exitosamente');
                setNewEmail('');
                setNewPassword('');
                fetchUsers();
            } else {
                setError(data.message || 'Error al crear usuario');
            }
        } catch {
            setError('Error de red al crear usuario');
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-[#4A3B32] flex items-center gap-3">
                    <UserCircle2 className="text-[#8B5E3C] w-8 h-8" />
                    Gestión de Usuarios
                </h1>
                <p className="text-[#6B5A4E] mt-2 border-l-4 border-[#8B5E3C] pl-4">
                    Administra las cuentas con acceso al panel de control.
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Panel de creación */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EACCA4]/30 sticky top-24">
                        <h2 className="text-xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[#8B5E3C]" />
                            Nuevo Administrador
                        </h2>
                        
                        {error && <div className="text-[#C62828] bg-[#FFEBEE] p-3 rounded-lg text-sm mb-4">{error}</div>}
                        {success && <div className="text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-lg text-sm mb-4">{success}</div>}

                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Correo Electrónico</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-[#A69385]" />
                                    <input 
                                        type="email" 
                                        required
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-[#EACCA4]/50 rounded-xl focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#8B5E3C] bg-[#FDFCF8]"
                                        placeholder="usuario@correo.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Contraseña</label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-3 w-5 h-5 text-[#A69385]" />
                                    <input 
                                        type="password" 
                                        required
                                        minLength={6}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-[#EACCA4]/50 rounded-xl focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#8B5E3C] bg-[#FDFCF8]"
                                        placeholder="Mín. 6 caracteres"
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={creating}
                                className="w-full bg-[#8B5E3C] hover:bg-[#6D492E] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Crear Usuario'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Lista de usuarios */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#EACCA4]/30 overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#EACCA4]/30 bg-[#FAEDDF]">
                            <h3 className="font-bold text-[#8B5E3C]">Administradores Registrados</h3>
                        </div>
                        
                        <div className="p-0">
                            {loading ? (
                                <div className="flex justify-center p-12">
                                    <Loader2 className="w-8 h-8 text-[#8B5E3C] animate-spin" />
                                </div>
                            ) : users.length === 0 ? (
                                <div className="text-center p-12 text-[#6B5A4E]">
                                    No hay usuarios registrados o no se pudo cargar.
                                </div>
                            ) : (
                                <div className="divide-y divide-[#EACCA4]/20">
                                    {users.map((user) => (
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            key={user.id} 
                                            className="px-6 py-4 flex items-center gap-4 hover:bg-[#FDFCF8] transition-colors"
                                        >
                                            <div className="bg-[#EACCA4]/20 p-3 rounded-full text-[#8B5E3C]">
                                                <UserCircle2 className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-[#4A3B32]">{user.email}</p>
                                                <p className="text-sm text-[#A69385]">Creado: {new Date(user.created_at).toLocaleDateString()}</p>
                                                <p className="text-xs text-[#A69385] mt-1 font-mono">ID: {user.id.slice(0,8)}...</p>
                                            </div>
                                            {/* Opcional: Permitir eliminar si el ID no es el actual, omitido por seguridad en este MVP */}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
