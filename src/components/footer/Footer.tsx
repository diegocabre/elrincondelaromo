import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-[#f7f3ee] py-8 px-4 border-t border-[#e5ded6]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Logo y datos */}
                <div className="flex items-center gap-4">
                    <Image
                        src="/assets/img/LOGO.png"
                        alt="Logo Rincón del Aromo"
                        width={60}
                        height={60}
                        className="rounded"
                    />
                    <div>
                        <div className="font-bold text-[#6b4f3b]">Rincón del Aromo</div>
                        <div className="text-sm text-[#6b4f3b]">
                            Isla Maulin 1871, Osorno, Región de Los Lagos
                        </div>
                        <Link
                            href="mailto:contacto@rincondelaromo.com"
                            className="text-sm text-[#da983c] underline"
                        >
                            contacto@rincondelaromo.com
                        </Link>
                        <Link
                            href="https://www.instagram.com/rincondelaromo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 text-sm text-[#E1306C] hover:text-[#C13584] transition-colors flex items-center gap-2"
                        >
                            <FaInstagram className="text-xl" />
                            @rincondelaromo
                        </Link>
                    </div>
                </div>
                {/* WhatsApp */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[#6b4f3b] font-medium">Escríbenos</span>
                    <Link
                        href="https://wa.me/56987222243"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-[#128C7E] transition-colors"
                    >
                        <FaWhatsapp className="text-xl" />
                        +56 9 8722 2243
                    </Link>
                </div>
            </div>
        </footer>
    );
}