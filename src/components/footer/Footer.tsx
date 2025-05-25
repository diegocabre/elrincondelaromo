import Image from "next/image";

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
                        <a
                            href="mailto:contacto@rincondelaromo.com"
                            className="text-sm text-[#da983c] underline"
                        >
                            contacto@rincondelaromo.com
                        </a>
                    </div>
                </div>
                {/* WhatsApp */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[#6b4f3b] font-medium">Escríbenos</span>
                    <a
                        href="https://wa.me/56987222243"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] text-white px-4 py-2 rounded flex items-center gap-2 font-semibold hover:bg-[#128C7E] transition-colors"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
                        </svg>
                        +56 9 8722 2243
                    </a>
                </div>
            </div>
        </footer>
    );
}