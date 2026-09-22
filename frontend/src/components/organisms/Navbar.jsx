"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Navegacion del sitio.
 *
 * `path` marca un enlace a otra pagina; sin el, es un desplazamiento a una
 * seccion de la pagina actual.
 *
 * Las secciones solo se listan en la home, porque son sus anclas y desde otra
 * pagina no existirian. Las paginas se listan siempre: antes la navegacion
 * entera se ocultaba fuera de la home y no habia forma de volver.
 *
 * El menu movil es una hoja tipografica a ancho completo bajo la cabecera:
 * sin rejilla de tarjetas ni iconos, la hamburguesa se transforma en equis
 * en el propio boton y el indice numerado va en mono, como el resto de
 * metaetiquetas del sitio.
 */
const SECCIONES_HOME = [
  { title: "Inicio", id: "inicio" },
  { title: "Proyectos", id: "proyectos" },
  { title: "Trayectoria", id: "trayectoria" },
  { title: "Contacto", id: "contacto" },
];

const PAGINAS = [
  { title: "Servicios", id: "servicios", path: "/clientes" },
  { title: "Curso", id: "curso", path: "/curso" },
  { title: "Blog", id: "blog", path: "/blog" },
  { title: "Comunidad", id: "comunidad", path: "/comunidad" },
];

/** Mismo acento para toda la navegacion, en ambas vertientes. */
const ENLACE_ACTIVO = 'text-cyan-700 dark:text-cyan-400';
const ENLACE_BASE =
  'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white';

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: { scale: 1.06, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
};

const Navbar = ({ isMain = true }) => {
  // Fuera de la home las anclas no existen, asi que se sustituyen por un
  // enlace de vuelta.
  const LINKS = isMain
    ? [...SECCIONES_HOME, ...PAGINAS]
    : [{ title: "Inicio", id: "inicio", path: "/" }, ...PAGINAS];
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const reduced = useReducedMotion();

  // Smooth scroll + cierre menu (solo aplica en home)
  const handleLinkClick = useCallback((e, id, path) => {
    // Enlace a otra pagina: navegacion normal del navegador.
    if (path) {
      setIsOpen(false);
      return;
    }
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  }, []);

  // Scrollspy con IntersectionObserver (solo tiene efecto en home)
  useEffect(() => {
    if (!isMain || typeof window === "undefined") return;

    const sections = LINKS.filter((l) => !l.path)
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.4, 0.6] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [isMain]);

  // Bloqueo de scroll cuando el panel esta abierto + Escape para cerrar
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Header con glassmorphism sutil y borde existente */}
      <motion.header
        variants={navVariants}
        initial={false}
        animate={reduced ? undefined : "visible"}
        className="fixed top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-colors duration-300 supports-[backdrop-filter]:bg-white/60 motion-reduce:transition-none dark:border-slate-800/70 dark:bg-slate-950/80 dark:supports-[backdrop-filter]:bg-slate-950/60"
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm"
        >
          Saltar al contenido
        </a>

        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.a
            href="/"
            whileHover={reduced ? {} : { scale: 1.06 }}
            className="inline-flex items-center min-h-[44px] text-2xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-[#00DCF0] dark:hover:text-[#39FFFA] transition-all duration-300"
          >
            yamid.dev
          </motion.a>

          <div className="flex items-center gap-4">
            {/* Nav desktop */}
            <nav
              aria-label="Principal"
              className="gap-6 hidden lg:flex xl:flex"
            >
              {LINKS.map((item) => (
                <motion.a
                  key={item.id}
                  href={item.path ?? `#${item.id}`}
                  variants={linkVariants}
                  whileHover={reduced ? {} : "hover"}
                  onClick={(e) => handleLinkClick(e, item.id, item.path)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 motion-reduce:transition-none dark:focus-visible:ring-cyan-400 ${
                      active === item.id ? ENLACE_ACTIVO : ENLACE_BASE
                    }`}
                >
                  {item.title}
                </motion.a>
              ))}
            </nav>

            {/* Hamburguesa animada (hasta lg: la desktop nav entra en lg) */}
            <motion.button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.95 }}
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 motion-reduce:transition-none dark:text-slate-200 dark:hover:bg-white/10 dark:focus-visible:ring-cyan-400 lg:hidden"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="mobile-panel"
              title={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="relative block h-5 w-6" aria-hidden="true">
                <motion.span
                  className="absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-current"
                  animate={isOpen ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute left-0 top-[9px] block h-0.5 w-6 rounded-full bg-current"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.15 }}
                />
                <motion.span
                  className="absolute left-0 top-[18px] block h-0.5 w-6 rounded-full bg-current"
                  animate={isOpen ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
                />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Overlay + hoja del menu movil */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              animate={reduced ? {} : { opacity: 1 }}
              exit={reduced ? {} : { opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              variants={reduced ? {} : panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-950/95 pb-5 pt-[4.75rem] backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/85"
            >
              <nav aria-label="Menú móvil">
                <ul className="divide-y divide-white/10 px-4">
                  {LINKS.map((item, i) => {
                    const isActive = active === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={reduced ? {} : { opacity: 0, y: 6 }}
                        animate={reduced ? {} : { opacity: 1, y: 0 }}
                        transition={{
                          delay: reduced ? 0 : 0.03 * i,
                          duration: 0.2,
                        }}
                      >
                        <a
                          href={item.path ?? `#${item.id}`}
                          onClick={(e) => handleLinkClick(e, item.id, item.path)}
                          aria-current={isActive ? "page" : undefined}
                          className={[
                            "flex min-h-[48px] items-center justify-between gap-4 px-2 text-[0.95rem] font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none",
                            isActive
                              ? "text-cyan-700 dark:text-cyan-400"
                              : "text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white",
                          ].join(" ")}
                        >
                          <span>{item.title}</span>
                          <span
                            aria-hidden="true"
                            className="font-mono text-[0.7rem] text-slate-400 dark:text-slate-600"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
