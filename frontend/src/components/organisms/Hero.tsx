/* src/organisms/Hero.tsx */
import React, { type ReactNode } from "react";
import { motion } from "framer-motion";
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

  return (
    <motion.main
      id={id}
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={[
        "flex items-center justify-center isolate overflow-hidden w-full",
        // Fondo base
        "",
        // Padding responsivo
        padding,
        // Tipografía
        "text-gray-900 dark:text-gray-100",
        // Altura
        height,
      ].join(" ")}
    >
      {/* Fondo decorativo (siempre detrás) */}
      <div aria-hidden className="pointer-events-none w-full h-[100%] overflow-hidden absolute inset-0 z-0">
        {/* Blob superior-izq */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute -top-32 -left-28 h-[38rem] w-[38rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(56,189,248,0.08), transparent)",
          }}
        />
        {/* Blob inferior-der */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-24 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.28), rgba(59,130,246,0.10), transparent)",
          }}
        />
        {/* Patrón sutil */}
        <div className="absolute inset-0 opacity-30 dark:opacity-50 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:28px_28px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/5" />
      </div>

      {/* Contenido (forzado por encima) */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
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
              <span className="font-semibold">fluidas</span> y
              <span className="font-semibold"> modernas</span>
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
              <Button icon={Group} href="/comunidad" isMain={false} isLink>
                Únete a mi comunidad
              </Button>
              <Button icon={Phone} href="contact" isMain>
                Contáctate conmigo
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Separadores sutiles */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
    </motion.main>
  );
};

export default Hero;
