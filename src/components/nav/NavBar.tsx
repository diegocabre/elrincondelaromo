'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo/Logo';
import { Menu, X } from 'lucide-react';
import { NavLink } from './NavLink';

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Ocultar Navegación Global en el Panel de Administrador
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    const menuItems = [
        { href: '/home', label: 'Inicio' },
        { href: '/talleres', label: 'Talleres' },
        { href: '/bienestar', label: 'Clases' },
        { href: '/cafeteria-cowork', label: 'Co Work' },
        { href: '/concept-store', label: 'Concept Store' },
        { href: '/espacios', label: 'Espacios' },
        { href: '/contacto', label: 'Contacto' },
    ];

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-[#FDFCF8]/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link href="/home">
                    <div className="flex items-center justify-center transition-transform hover:scale-105">
                         <Logo />
                    </div>
                </Link>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[#4A3B32]"
                    aria-label="Abrir menú"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú desktop */}
                <div className="hidden md:flex gap-4 items-center bg-[#dfa445] px-8 py-3 rounded-full shadow-md border border-[#dfa445]/20">
                    {menuItems.map((item, idx) => (
                        <div key={item.href} className="flex items-center gap-4">
                            {idx > 0 && <span className="text-white/40 font-light select-none text-xs">|</span>}
                            <NavLink
                                href={item.href}
                                className="text-white/95 text-xs font-semibold tracking-wider uppercase hover:text-white transition-colors py-1 px-1"
                                activeClassName="text-white font-extrabold underline underline-offset-4 decoration-2"
                                ignoreDefaultActiveStyles={true}
                            >
                                {item.label}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`md:hidden absolute w-full bg-[#FDFCF8] border-b border-[#E8D1B5] shadow-lg transition-all duration-300 ${isOpen ? 'max-h-[85vh] py-6 overflow-y-auto' : 'max-h-0 py-0 overflow-hidden'}`}>
                <div className="flex flex-col gap-6 px-6">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-[#4A3B32] text-lg font-medium hover:text-[#dfa445] transition-colors"
                            activeClassName="text-[#dfa445] font-bold"
                            ignoreDefaultActiveStyles={true}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};
