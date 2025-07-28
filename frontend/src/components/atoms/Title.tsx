import { motion } from "framer-motion";
import React from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

export const Title = ({ children }: { children: React.ReactNode }, size: object = { size: 'default' }) => {
    return (
        <div className="text-center mt-4">
            <motion.h1
                variants={fadeInUp}
                className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight pt-12 md:pt-5"
            >
                <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400 flex items-center justify-center text-[3.7rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6rem] leading-[1] md:leading-[1]">
                {children}
                </span>
            </motion.h1>
        </div>
    )
}