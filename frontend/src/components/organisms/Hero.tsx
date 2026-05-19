/* src/organisms/Hero.tsx */
import React, { type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Title } from "../atoms/Title";
import { Text } from "../atoms/Text";
import { Button } from "../molecules/Buttons";
import Phone from "../atoms/icons/Phone";
import Group from "../atoms/icons/Group";

/**
 * Hero (patched)
 * — Z-index seguro (contenido forzado arriba)
 * — Animación sin estado (evita quedarse oculto si el efecto no corre)
 * — Ultra-responsive + dark mode
 */

type HeroProps = {
  children: ReactNode;
  isHome?: boolean;
  id?: string;
  height?: string;
  padding?: string;
};

const Hero: React.FC<HeroProps> = ({ children, isHome = true, id = "home", height = "min-h-[100vh]", padding = "px-4 sm:px-6 md:px-8 lg:px-12" }) => {
  // Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const { scrollY } = useScroll();

  // Transformaciones basadas en scroll
  // Transformaciones basadas en scroll
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const yText = useTransform(scrollY, [0, 300], [0, -300]); // Move up significantly
  const rotateImage = useTransform(scrollY, [0, 400], [0, 120]); // More rotation
  const scaleImage = useTransform(scrollY, [0, 400], [1, 0.6]); // Shrink more
  const opacityImage = useTransform(scrollY, [0, 400], [1, 0]);
  const xImage = useTransform(scrollY, [0, 400], [0, 200]); // Move right
  const yImage = useTransform(scrollY, [0, 400], [0, -100]); // Move up slightly

  return (
    <motion.main
      id={id}
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={[
        `${isHome ? "grid grid-cols-1 lg:grid-cols-[2fr_1fr] items-center justify-center isolate overflow-hidden w-full" : "grid grid-cols-1 items-center justify-center isolate overflow-hidden w-full"}`,
        "bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20",
        padding,
        "text-gray-900 dark:text-gray-100",
        height,
      ].join(" ")}
    >
      {/* Fondo decorativo */}
      <div aria-hidden="true" className="pointer-events-none w-full h-[100%] overflow-hidden absolute inset-0 z-0">
        {/* Gradiente animado superior */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-32 h-[45rem] w-[45rem] rounded-full blur-[120px]"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.25) 50%, rgba(59,130,246,0.15) 100%)",
          }}
        />
        {/* Gradiente animado inferior */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-48 -right-40 h-[50rem] w-[50rem] rounded-full blur-[140px]"
          style={{
            background: "linear-gradient(225deg, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.2) 50%, rgba(59,130,246,0.15) 100%)",
          }}
        />
        {/* Acento central sutil */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35rem] w-[35rem] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.04)_1px,transparent_1px)]" />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHBhdGggZD0iTTAgMGgzMDB2MzAwSDB6IiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-slate-950/40" />
      </div>

      {/* Contenido */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-5xl text-center"
        style={{ opacity, y: yText }}
      >
        {/* Badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Disponible para proyectos</span>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-2"
        >
          <Title>{children}</Title>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-6 md:mt-7 lg:mt-8"
        >
          <Text isHome={isHome}>
            Desarrollo experiencias digitales
            <span className="block text-balance">
              <span className="font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">fluidas</span> y
              <span className="font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> modernas</span>
            </span>
          </Text>
        </motion.div>

        {isHome && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mt-10 sm:mt-12 md:mt-14"
          >
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:gap-5 lg:gap-6">
              <Button 
                icon={Group} 
                href="/comunidad" 
                isMain={false} 
                isLink
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Aprender</span>
              </Button>
              <Button 
                icon={Phone} 
                href="contact" 
                isMain
                className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-300"
              >
                Contratar
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
      {isHome && (
        <motion.div
          className='lg:block hidden absolute right-[5%] top-[1.7%]'
          style={{
            rotate: rotateImage,
            scale: scaleImage,
            opacity: opacityImage,
            x: xImage,
            y: yImage
          }}
        >
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-2xl scale-110" />
            {/* Border ring */}
            <div className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-60" />
            <img 
              className="relative w-[420px] h-[420px] object-cover rounded-full border-2 border-white/20 dark:border-slate-800/40" 
              src="images/yamid.jpeg" 
              alt="Hero" 
            />
          </div>
        </motion.div>
      )}

      {/* Separadores sutiles */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-slate-600/40" />
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/40 to-transparent dark:via-slate-600/40" />
    </motion.main>
  );
};

export default Hero;
