"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const NavLink = ({ href, children, onClick, className = "" }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative px-1 py-1 transition-colors duration-200 ${className}`}
            style={isActive ? {
                color: "var(--dark-fern)",
            } : {}}
        >
            <span
                className={`pb-1 border-b-4 transition-all duration-200 ${isActive ? "border-[--dark-fern]" : "border-transparent"
                    }`}
                style={{ display: "inline-block" }}
            >
                {children}
            </span>
        </Link>
    );
}; 