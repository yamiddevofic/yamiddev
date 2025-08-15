import { motion } from "framer-motion";
import React from "react";


const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

export const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div className="text-center mt-4" initial="hidden" whileInView="visible" transition={{ delay: 0.2 }} variants={fadeInUp}>
            {children}
        </motion.div>
    )
}