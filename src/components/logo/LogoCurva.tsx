'use client';

import { motion } from 'framer-motion';

export const LogoCurva = () => {
    return (
        <motion.svg
            className="absolute bottom-[-40px] left-0 w-full z-10" // <- aquí lo levantás
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
            <path
                d="M0,0 C360,100 1080,0 1440,100 L1440,100 L0,100 Z"
                fill="white"
            />
        </motion.svg>
    );
};
