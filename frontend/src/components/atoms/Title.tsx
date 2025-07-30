import { motion } from "framer-motion";
import React from "react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

export const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="text-center mt-4">
            {children}
        </div>
    )
}