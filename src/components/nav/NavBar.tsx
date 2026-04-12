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
        { href: '/about', label: 'Somos' },
        { href: '/cafeteria-cowork', label: 'Cafetería | Cowork' },
        { href: '/talleres', label: 'Talleres' },
        { href: '/bienestar', label: 'Clases' },
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
                <div className="hidden md:flex gap-8 items-center bg-white/60 backdrop-blur-md px-8 py-3 rounded-full shadow-sm border border-[#E8D1B5]/50">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            className="text-[#6B5A4E] text-sm font-medium tracking-wide uppercase hover:text-[#8B5E3C] transition-colors"
                        >
                            {item.label}
                        </NavLink>
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
                            className="text-[#4A3B32] text-lg font-medium hover:text-[#8B5E3C] transition-colors"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};
