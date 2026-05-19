/* src/organisms/Hero.tsx */
import React, { type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../molecules/Buttons";
import Phone from "../atoms/icons/Phone";
import Group from "../atoms/icons/Group";

type HeroProps = {
  children: ReactNode;
  isHome?: boolean;
  id?: string;
  height?: string;
  padding?: string;
};

const Hero: React.FC<HeroProps> = ({
  children,
  isHome = true,
  id = "home",
  height = "min-h-[100vh]",
  padding = "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
}) => {
  const { scrollY } = useScroll();

  // Premium, subtle scroll-driven parallax transitions (elegant and minimalist)
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yText = useTransform(scrollY, [0, 400], [0, -60]);
  
  const yImage = useTransform(scrollY, [0, 500], [0, 40]);
  const scaleImage = useTransform(scrollY, [0, 500], [1, 0.94]);
  const opacityImage = useTransform(scrollY, [0, 500], [1, 0]);

  // Entry animation variants for micro-interactions
  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.main
      id={id}
      role="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={[
        "relative w-full overflow-hidden flex items-center justify-center isolate",
        "bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
        height,
        padding,
      ].join(" ")}
    >
      {/* Sleek Minimalist Background Overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft, Breathing Ambient Glows */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] h-[35rem] w-[35rem] sm:h-[45rem] w-[45rem] rounded-full blur-[100px] sm:blur-[130px]"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.15) 50%, rgba(59,130,246,0.1) 100%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.05, 0.95, 1.05],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-[20%] -right-[10%] h-[40rem] w-[40rem] sm:h-[50rem] w-[50rem] rounded-full blur-[110px] sm:blur-[140px]"
          style={{
            background: "linear-gradient(225deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 50%, rgba(59,130,246,0.1) 100%)",
          }}
        />

        {/* Crisp & Minimal Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)]" />

        {/* Film-grain texture for premium aesthetic */}
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.018] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHBhdGggZD0iTTAgMGgzMDB2MzAwSDB6IiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wNSIvPjwvc3ZnPg==')]" />
        
        {/* Soft Vignette Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 dark:to-slate-950/60" />
      </div>

      {/* Grid Container: Mobile-First Responsive Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Core Copy & Typography */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          style={{ opacity: opacityText, y: yText }}
        >
          {/* Active Status Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
              Disponible para nuevos proyectos
            </span>
          </motion.div>

          {/* Mobile Profile Photo (Mobile-First: Visible only on Mobile/Tablet, hidden on Desktop) */}
          {isHome && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="block lg:hidden mb-6 relative group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-cyan-500/40" />
              <img
                className="relative w-28 h-28 xs:w-24 xs:h-24 sm:w-36 sm:h-36 object-cover rounded-full border border-white/20 dark:border-slate-900/40 shadow-xl"
                src="dev.jpg"
                alt="Yamid Dev"
              />
            </motion.div>
          )}

          {/* Main Title Component Slot */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {children}
          </motion.div>

          {/* Subtitle / Description (Modern & Completely Responsive) */}
          {isHome && (
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-slate-600 dark:text-slate-400 font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
            >
              Desarrollo{" "}
              <span className="font-medium bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-cyan-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                experiencias digitales
              </span>{" "}
              de alto impacto, combinando diseño minimalista, rendimiento óptimo y código limpio y moderno.
            </motion.p>
          )}

          {/* CTA Action Buttons */}
          {isHome && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-8 sm:mt-10 w-full"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 max-w-md mx-auto lg:mx-0">
                <Button
                  icon={Group}
                  href="/comunidad"
                  isMain={false}
                  isLink
                  className="w-full sm:w-auto group relative overflow-hidden bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 shadow-lg transition-all duration-300"
                >
                  <span className="relative z-10">Aprender</span>
                </Button>
                <Button
                  icon={Phone}
                  href="contact"
                  isMain
                  className="w-full sm:w-auto relative bg-transparent hover:bg-slate-100/50 dark:hover:bg-slate-900/50 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 transition-all duration-300"
                >
                  Contratar
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Interactive Profile Image (Visible only on Desktop) */}
        {isHome && (
          <motion.div
            className="hidden lg:flex justify-center items-center relative w-full"
            style={{
              y: yImage,
              scale: scaleImage,
              opacity: opacityImage,
            }}
          >
            <div className="relative group">
              {/* Premium radial glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 blur-3xl scale-110 group-hover:scale-125 transition-transform duration-500" />
              
              {/* Sleek outer double borders with fine gradient ring */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-cyan-500/30 group-hover:from-indigo-500/50 group-hover:to-cyan-500/50 transition-colors duration-500" />
              <div className="absolute inset-[-1px] rounded-full bg-slate-200 dark:bg-slate-800/80" />
              
              <img
                className="relative w-[340px] h-[340px] xl:w-[400px] xl:h-[400px] object-cover rounded-full border-4 border-white dark:border-slate-950 shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                src="dev.jpg"
                alt="Yamid Dev Desktop"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Modern, Subtle Section Border Lines */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-slate-800/50" />
    </motion.main>
  );
};

export default Hero;
