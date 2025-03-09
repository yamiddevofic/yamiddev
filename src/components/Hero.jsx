import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-cyan-400 via-emerald-500 to-blue-600 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* Efecto de partículas animadas */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Capa de gradiente animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.4)_0%,_rgba(0,0,0,0)_70%)]"
      />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl text-center space-y-4 sm:space-y-6 md:space-y-8 backdrop-blur-lg bg-white/10 dark:bg-black/30 border border-white/20 dark:border-cyan-500/30 p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl relative overflow-hidden"
      >
        {/* Efecto de brillo al hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
          <div className="absolute -inset-8 bg-[conic-gradient(from_90deg_at_50%_50%,_#00ccff_0%,_#00ff88_50%,_#00ccff_100%)] animate-spin-slow" />
        </div>

        <motion.h1
          whileHover={{ scale: 1.02 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-white bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 dark:from-cyan-300 dark:via-emerald-300 dark:to-blue-400 drop-shadow-xl"
        >
          Yamid Dev Oficial
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 dark:text-cyan-100 font-mono tracking-tight"
        >
          {`< Full-Stack Developer & UI/UX Architect />`}
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center my-4 md:my-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#portfolio"
            className="relative overflow-hidden bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-cyan-500/30 hover:border-cyan-300 dark:hover:border-emerald-400 px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 group"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-white dark:from-emerald-400 dark:to-cyan-400">
              Ver mi trabajo
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="relative overflow-hidden bg-cyan-500/90 hover:bg-cyan-400 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-emerald-500 dark:hover:from-cyan-600 dark:hover:to-emerald-600 px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300 group"
          >
            <span className="text-white">Contáctame</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 sm:gap-5 justify-center mt-6 sm:mt-8 md:mt-10"
        >
          {[
            { 
              href: "mailto:yamid@example.com",
              icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
              label: 'Email'
            },
            {
              href: "https://github.com/yamiddev",
              icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
              label: 'GitHub'
            },
            {
              href: "https://linkedin.com/in/yamiddev",
              icon: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z',
              label: 'LinkedIn'
            }
          ].map((item, index) => (
            <motion.a
              key={index}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-cyan-500/30 rounded-lg hover:bg-white/10 dark:hover:bg-cyan-500/10 transition-all duration-300 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-100 dark:text-cyan-400 group-hover:text-cyan-300 dark:group-hover:text-emerald-300 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span className="sr-only">{item.label}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Efecto de gradiente inferior */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cyan-500/20 to-transparent dark:from-black/80 pointer-events-none" />
    </main>
  );
};

export default Hero;