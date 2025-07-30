import { motion } from "framer-motion";
import React from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export const Text = ({ children, isHome }: { children: React.ReactNode, isHome?: boolean }) => {
    return (
        <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className={isHome ? "w-full max-w-[95%] text-[clamp(1rem,2vw,1.5rem)] text-gray-700 dark:text-gray-300 font-light mx-auto line-height-[1.2] text-[1rem] xs:text-[1.17rem] ls:text-[1.324rem] ms:text-[1.4rem] ss:text-[1.36rem] s:text-[1.3rem] sm:text-[1.79rem] font-inter bold leading-[1] pt-3 block sm:hidden !mb-[5%] md:mb-[20%]" : "hidden"}
        >
            {children}
        </motion.p>
    )
}