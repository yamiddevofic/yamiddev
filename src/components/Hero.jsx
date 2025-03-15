import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.main
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#0e1335] dark:to-[#030617] p-8 sm:p-12 lg:p-16 relative overflow-hidden"
    >
      {/* Fondo decorativo animado */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] animate-gradient-pan"></div>++++++++++++++++++-
      +
      
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl text-center space-y-8 md:space-y-10 lg:space-y-12 relative z-10"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight"
        >
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-cyan-400 dark:via-blue-500 dark:to-cyan-400 flex items-center justify-center">
            Yamid Dev Oficial
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl lg:max-w-3xl text-[clamp(1rem,2vw,1.5rem)] text-gray-700 dark:text-gray-300 font-light mx-auto"
        >
          Desarrollo experiencias digitales fluidas y modernas
          <span className="ml-2 inline-block animate-pulse">💻</span>
        </motion.p>

        <motion.div
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center sm:flex-row gap-4 md:gap-6 lg:gap-8 justify-center mt-8"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="group relative px-6 py-3 text-lg rounded-full bg-transparent border-2 border-blue-600 text-blue-600 font-medium transition-all duration-300 overflow-hidden w-full sm:w-auto text-center"
            onClick={(e) => handleLinkClick(e, "projects")}
          >
            <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center justify-center gap-2">
              <span className="group-hover:translate-x-1 group-hover:text-white transition-transform z-10">Descubre mi trabajo</span>
              <span className="text-xl z-10">🚀</span>
            </span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-3 text-lg rounded-full bg-blue-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/30 w-full sm:w-auto text-center hover:bg-blue-700"
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            <span className="flex items-center justify-center gap-2">
              Hablemos de tu proyecto
              <span className="text-xl animate-pulse">✨</span>
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default Hero;