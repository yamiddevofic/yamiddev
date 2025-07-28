import { motion } from "framer-motion";
import React from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export const Text = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="w-full max-w-[90%] text-[clamp(1rem,2vw,1.5rem)] text-gray-700 dark:text-gray-300 font-light mx-auto line-height-[1.2] text-[1.4rem] sm:text-[1.5rem] font-inter bold leading-[1] pt-3 block md:hidden !mb-[20%]"
        >
            {children}
        </motion.p>
    )
}