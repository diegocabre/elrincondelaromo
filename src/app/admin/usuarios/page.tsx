'use client';

import React, { useState, useEffect } from 'react';
import { UserCircle2, Plus, Mail, Loader2, KeyRound, Type, Trash2, Edit2, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
    id: string;
    email: string;
    nombre: string;
    created_at: string;
}

export default function AdminUsuariosPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    // Edit modal states
    const [editUser, setEditUser] = useState<User | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [savingEdit, setSavingEdit] = useState(false);

    useEffect(() => {
        checkSession();
        fetchUsers();
    }, []);

    const checkSession = async () => {
        try {
            const res = await fetch('/api/admin/me');
            const data = await res.json();
            if (data.success && data.session) {
                // Considerar contacto@rincondelaromo.com como super admin (hardcoded temporalmente por facilidad en UI, o si el env lo cambiaron será igual, pero el server realmente lo restringe)
                // Usaremos esto solo visualmente
                setIsSuperAdmin(data.session.email === 'contacto@rincondelaromo.com');
            }
        } catch {
            console.error("No session found");
        }
    };

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
                body: JSON.stringify({ email: newEmail, nombre: newName, password: newPassword })
            });
            const data = await res.json();
            
            if (res.ok && data.success) {
                setSuccess('Usuario creado exitosamente');
                setNewEmail('');
                setNewName('');
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

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que deseas eliminar a este administrador?")) return;
        
        try {
            const res = await fetch(`/api/admin/usuarios?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (res.ok && data.success) {
                setUsers(users.filter(u => u.id !== id));
            } else {
                alert(data.message || 'Error al eliminar');
            }
        } catch {
            alert('Error de red al eliminar');
        }
    };

    const openEdit = (u: User) => {
        setEditUser(u);
        setEditName(u.nombre || '');
        setEditEmail(u.email);
        setEditPassword('');
    };

    const handleSaveEdit = async () => {
        if (!editUser) return;
        setSavingEdit(true);
        try {
            const res = await fetch('/api/admin/usuarios', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: editUser.id,
                    email: editEmail,
                    nombre: editName,
                    password: editPassword || undefined
                })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setEditUser(null);
                fetchUsers();
            } else {
                alert(data.message || 'Error al editar');
            }
        } catch {
            alert("Error de red");
        } finally {
            setSavingEdit(false);
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
                {/* Panel de creación (sólo super admin) */}
                <div className="md:col-span-1">
                    {isSuperAdmin ? (
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EACCA4]/30 sticky top-24">
                        <h2 className="text-xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-[#8B5E3C]" />
                            Nuevo Administrador
                        </h2>
                        
                        {error && <div className="text-[#C62828] bg-[#FFEBEE] p-3 rounded-lg text-sm mb-4">{error}</div>}
                        {success && <div className="text-[#2E7D32] bg-[#E8F5E9] p-3 rounded-lg text-sm mb-4">{success}</div>}

                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Nombre Completo</label>
                                <div className="relative">
                                    <Type className="absolute left-3 top-3 w-5 h-5 text-[#A69385]" />
                                    <input 
                                        type="text" 
                                        required
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-[#EACCA4]/50 rounded-xl focus:ring-2 focus:ring-[#8B5E3C]/50 focus:border-[#8B5E3C] bg-[#FDFCF8]"
                                        placeholder="Camila Alvear"
                                    />
                                </div>
                            </div>
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
                    ) : (
                        <div className="bg-[#FAEDDF] p-6 rounded-2xl border border-[#EACCA4] text-[#6B5A4E]">
                            <p className="text-sm">Inicia sesión con la cuenta de super administrador para crear nuevos usuarios.</p>
                        </div>
                    )}
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
                                            className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#FDFCF8] transition-colors"
                                        >
                                            <div className="bg-[#EACCA4]/20 p-3 rounded-full text-[#8B5E3C]">
                                                <UserCircle2 className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                {editUser?.id === user.id ? (
                                                    <div className="flex flex-col gap-2 mt-2 w-full">
                                                        <input 
                                                            type="text" 
                                                            value={editName} onChange={e=>setEditName(e.target.value)} 
                                                            className="text-sm px-2 py-1 border rounded w-full" 
                                                            placeholder="Nombre"
                                                        />
                                                        <input 
                                                            type="email" 
                                                            value={editEmail} onChange={e=>setEditEmail(e.target.value)} 
                                                            className="text-sm px-2 py-1 border rounded w-full" 
                                                            placeholder="Email"
                                                        />
                                                        <input 
                                                            type="password" 
                                                            value={editPassword} onChange={e=>setEditPassword(e.target.value)} 
                                                            className="text-sm px-2 py-1 border rounded w-full" 
                                                            placeholder="Nueva contraseña (opcional)"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button onClick={handleSaveEdit} disabled={savingEdit} className="bg-green-600 text-white p-1 rounded hover:bg-green-700">
                                                                <Check className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => setEditUser(null)} className="bg-gray-400 text-white p-1 rounded hover:bg-gray-500">
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <p className="font-semibold text-[#4A3B32]">
                                                            {user.nombre || 'Sin nombre'}
                                                        </p>
                                                        <p className="text-sm text-[#A69385]">{user.email}</p>
                                                    </>
                                                )}
                                            </div>
                                            {isSuperAdmin && editUser?.id !== user.id && (
                                                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                                    <button 
                                                        onClick={() => openEdit(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
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
