'use client';

import Image from 'next/image';

export default function LogoFondo() {
    return (
        <div className="relative z-0 pt-0">
            <Image
                src="/assets/img/LOGOH.svg"
                alt="Logo Rincón del Aromo"
                width={600}
                height={300}
                className="object-contain w-full max-w-[500px]"
                priority
            />
        </div>
    );
}
