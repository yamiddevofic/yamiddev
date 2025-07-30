import { motion } from "framer-motion";
import React from "react";

export const Button = ({ children, icon, isMain, href, isLink }: { children: React.ReactNode, icon: React.ReactNode, isMain?: boolean, href: string, isLink?: boolean }) => { 

    const handleClick = (e : any, id : string) => {
        e.preventDefault();
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    return (
        <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={isLink ? href : `#${href}`}
        className={`group relative px-8 py-4 text-lg rounded-full bg-transparent border-2 border-blue-600 text-blue-600 font-medium transition-all duration-300 overflow-hidden xs:w-[100%] ls:w-[80%] ms:w-[80%] w-auto text-center md:mt-0 ${isMain ? "" : "!bg-blue-600 !text-white"}`}
        onClick={(e) => isLink ? null : handleClick(e, href)}
        >
        <span className={`absolute inset-0 w-0 bg-blue-600 transition-all duration-300 ease-out  ${isMain ? "group-hover:w-full bg-blue-600" : ""}`}></span>
        <span className="relative flex items-center justify-center gap-2">
            <span className="group-hover:translate-x-1 group-hover:text-white transition-transform z-10  xs:text-[1rem] ls:text-[1.1rem] ms:text-[1.1rem] ss:text-[1.1rem] sm:text-[1.5rem] md:text-[1.2rem] lg:text-[1.5rem] lx:text-[1.6rem]">{children}</span>
            <span className="text-xl z-10 ">{icon}</span>
        </span>
        </motion.a>
    )
}