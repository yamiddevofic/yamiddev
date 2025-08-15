import React from 'react';
import { motion } from 'framer-motion';

export const TitleSection = ({ title }) => {
    
    return (
        <motion.h2
            className="xs:text-[2.5rem] ls:text-[2.5rem] ms:text-[2.5rem] ss:text-[2.5rem] s:text-[2.5rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3rem] xl:text-[3rem] font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 py-2">
            {title}
        </motion.h2>
    );
};