'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo/Logo';
import { Menu, X } from 'lucide-react';
import { NavLink } from './NavLink';

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'Somos' },
        { href: '/cafeteria-cowork', label: 'Cafetería|Cowork' },
        { href: '/after-school', label: 'After School' },
        { href: '/talleres', label: 'Talleres' },
        { href: '/terapia', label: 'Terapia' },
        { href: '/contacto', label: 'Contacto' },
    ];

    return (
        <nav className="px-4 sm:px-6 py-4" style={{ backgroundColor: 'var(--harvest-gold)' }}>
            <div className="flex justify-between items-center">
                <Link href="/">
                    <div className="bg-white border-4 border-white rounded-full shadow-md flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-all">
                        <Logo />
                    </div>
                </Link>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-[--chestnut] pr-2"
                    aria-label="Abrir menú"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú desktop */}
                <div className="hidden md:flex gap-6 text-[--chestnut] text-lg font-medium">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            className="hover:text-[--dark-fern]"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <div className="mt-4 flex flex-col gap-4 md:hidden text-[--chestnut] text-lg font-medium pl-4">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-[--dark-fern]"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};
