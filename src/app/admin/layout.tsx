'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Calendar, BookOpen, UserCircle2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    // Si es la página de login, no mostrar el Layout lateral
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-[#FDFCF8]">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-white shadow-xl border-r border-[#EACCA4]/30">
                <div className="p-8 border-b border-[#EACCA4]/30 flex flex-col items-center">
                    <UserCircle2 className="w-16 h-16 text-[#8B5E3C] mb-4" />
                    <h2 className="text-xl font-bold text-[#4A3B32]">Admin Panel</h2>
                    <p className="text-sm text-[#6B5A4E] text-center">Gestión Rincón del Aromo</p>
                </div>

                <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
                    <Link
                        href="/admin/agenda"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            pathname.includes('/admin/agenda') 
                                ? 'bg-[#8B5E3C] text-white shadow-md' 
                                : 'text-[#6B5A4E] hover:bg-[#FAEDDF] hover:text-[#8B5E3C]'
                        }`}
                    >
                        <Calendar className="w-5 h-5" /> Agenda Bienestar
                    </Link>
                    
                    <Link
                        href="/admin/talleres"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            pathname.includes('/admin/talleres') 
                                ? 'bg-[#8B5E3C] text-white shadow-md' 
                                : 'text-[#6B5A4E] hover:bg-[#FAEDDF] hover:text-[#8B5E3C]'
                        }`}
                    >
                        <BookOpen className="w-5 h-5" /> Talleres Activos
                    </Link>
                </nav>

                <div className="p-4 border-t border-[#EACCA4]/30">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-[#C62828] bg-[#FFEBEE] hover:bg-[#FFCDD2] transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Mobile Topbar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50 p-4 flex justify-between items-center border-b border-[#EACCA4]/30">
                <span className="font-bold text-[#8B5E3C]">Admin Panel</span>
                <div className="flex items-center gap-4">
                     <Link href="/admin/agenda" className={`p-2 rounded-lg ${pathname.includes('/admin/agenda') ? 'bg-[#FAEDDF] text-[#8B5E3C]' : 'text-[#6B5A4E]'}`}>
                        <Calendar className="w-5 h-5" />
                    </Link>
                    <Link href="/admin/talleres" className={`p-2 rounded-lg ${pathname.includes('/admin/talleres') ? 'bg-[#FAEDDF] text-[#8B5E3C]' : 'text-[#6B5A4E]'}`}>
                        <BookOpen className="w-5 h-5" />
                    </Link>
                    <button onClick={handleLogout} className="p-2 rounded-lg text-[#C62828]">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <main className="flex-1 w-full overflow-y-auto">
                <div className="p-6 md:p-10 pt-24 md:pt-10 w-full xl:max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
