"use client";
import Image from "next/image";
import { motion } from "framer-motion";
export const Logo = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-24 sm:w-32 md:w-40 lg:w-48 h-10 sm:h-12 md:h-16 lg:h-20"
        >
            <Image
                src="/assets/img/LOGOF.png"
                alt="DS Soluciones Logo"
                fill
                className="object-contain"
                priority
            />
        </motion.div>

    );
};




