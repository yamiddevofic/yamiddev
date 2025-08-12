"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { HomeFilled } from "../atoms/icons/HomeFilled";
import { AboutMe } from "../atoms/icons/AboutMe";
import { Contact } from "../atoms/icons/Contact";
import { Portfolio } from "../atoms/icons/Portfolio";
import { Computer } from "../atoms/icons/Computer";
import { Blog } from "../atoms/icons/Blog";
import { Course } from "../atoms/icons/Course";
import { Button } from "@/components/ui/button"; // shadcn/ui

const LINKS = [
  { title: "Inicio", id: "home", icon: HomeFilled },
  { title: "Sobre mí", id: "about-me", icon: AboutMe },
  { title: "Proyectos", id: "projects", icon: Portfolio },
  { title: "Tecnologías", id: "technology", icon: Computer },
  { title: "Curso", id: "course", icon: Course },
  { title: "Blog", id: "blog", icon: Blog },
  { title: "Contacto", id: "contact", icon: Contact },
];

// Colores por sección (activo y hover)
const SECTION_ACTIVE = {
  home: "text-cyan-600 dark:text-cyan-400",
  "about-me": "text-cyan-600 dark:text-cyan-400",
  projects: "text-cyan-600 dark:text-cyan-400",
  course: "text-cyan-600 dark:text-cyan-400",
  blog: "text-cyan-600 dark:text-cyan-400",
  technology: "text-cyan-600 dark:text-cyan-400",
  contact: "text-cyan-600 dark:text-cyan-400",
};

const SECTION_HOVER = {
  home: "hover:text-cyan-600 dark:hover:text-cyan-400",
  "about-me": "hover:text-cyan-600 dark:hover:text-cyan-400",
  projects: "hover:text-cyan-600 dark:hover:text-cyan-400",
  course: "hover:text-cyan-600 dark:hover:text-cyan-400",
  blog: "hover:text-cyan-600 dark:hover:text-cyan-400",
  technology: "hover:text-cyan-600 dark:hover:text-cyan-400",
  contact: "hover:text-cyan-600 dark:hover:text-cyan-400",
};

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: { scale: 1.06, transition: { duration: 0.15 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.98, y: 6, transition: { duration: 0.15 } },
};

const Navbar = ({ isMain = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [active, setActive] = useState("home");
  const reduced = useReducedMotion();
  const drawerRef = useRef(null);

  // Init theme from localStorage (sin dependencias extras)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  // Persist theme toggling
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  // Smooth scroll + cierre menú (solo aplica en home)
  const handleLinkClick = useCallback((e, id) => {
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

    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
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

  // Bloqueo de scroll cuando el panel está abierto + Escape para cerrar
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
        initial={reduced ? {} : "hidden"}
        animate={reduced ? {} : "visible"}
        className="fixed top-0 z-50 w-full border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-lg transition-colors duration-300"
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
            className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-[#00DCF0] dark:hover:text-[#39FFFA] transition-all duration-300"
          >
            yamid.dev
          </motion.a>

          <div className="flex items-center gap-4">
            {/* Nav desktop (solo en home) */}
            <nav
              aria-label="Principal"
              className={`gap-6 ${isMain ? "hidden md:hidden lg:flex xl:flex" : "hidden"}`}
            >
              {LINKS.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  variants={linkVariants}
                  whileHover={reduced ? {} : "hover"}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={active === item.id ? "page" : undefined}
                  className={`text-lg font-medium transition-colors cursor-pointer ${
                    active === item.id
                      ? SECTION_ACTIVE[item.id] || "text-cyan-600 dark:text-cyan-400"
                      : "text-gray-900 dark:text-gray-300"
                  } ${
                    SECTION_HOVER[item.id] ||
                    "hover:text-cyan-600 dark:hover:text-cyan-400"
                  }`}
                >
                  {item.title}
                </motion.a>
              ))}
            </nav>

            {/* Botón tema (desktop) */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="hidden md:flex bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-lg p-3 transition-all hover:scale-110 text-xl w-[35px] h-[35px] focus-visible:ring-2 focus-visible:ring-cyan-500"
              title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
              aria-label="Cambiar tema"
            >
              {theme === "light" ? <Moon className="text-xl" /> : <Sun className="text-xl" />}
            </Button>

            {/* Controles móviles:
                - En home: botón de menú (abre panel moderno)
                - En otras pantallas: SOLO botón Inicio + tema */}
            {isMain ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen((prev) => !prev)}
                className="md:hidden"
                aria-label={`${isOpen ? "Cerrar" : "Abrir"} menú`}
                aria-expanded={isOpen}
                aria-controls="mobile-panel"
                title={`${isOpen ? "Cerrar" : "Abrir"} menú`}
              >
                {isOpen ? <X /> : <Menu />}
              </Button>
            ) : (
              <div className="md:hidden flex items-center gap-2">
                <a
                  href="/"
                  title="Ir al inicio"
                  aria-label="Ir al inicio"
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {HomeFilled({ size: 18 })}
                  <span>Inicio</span>
                </a>
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-lg p-3 transition-all hover:scale-110 text-xl w-[35px] h-[35px] focus-visible:ring-2 focus-visible:ring-cyan-500"
                  title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
                  aria-label="Cambiar tema"
                >
                  {theme === "light" ? <Moon className="text-xl" /> : <Sun className="text-xl" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Overlay + Panel móvil (solo en home) */}
      <AnimatePresence>
        {isMain && isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={reduced ? {} : { opacity: 0 }}
              animate={reduced ? {} : { opacity: 1 }}
              exit={reduced ? {} : { opacity: 0 }}
              className="fixed inset-0 z-40 mt-12 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            {/* Panel centrado, compacto y elegante */}
            <motion.div
              id="mobile-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menú móvil"
              variants={reduced ? {} : panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed z-50 inset-x-0 top-16 mx-auto w-[92%] max-w-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              ref={drawerRef}
            >
              {/* Header del panel */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Navegación
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow p-2 w-9 h-9 focus-visible:ring-2 focus-visible:ring-cyan-500"
                    title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
                    aria-label="Cambiar tema"
                  >
                    {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9"
                    aria-label="Cerrar menú"
                    title="Cerrar"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Grid de acciones (compacto, bonito, responsive) */}
              <div className="px-4 pb-4">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 ">
                  {LINKS.map((item, i) => {
                    const isActive = active === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={reduced ? {} : { opacity: 0, y: 8 }}
                        animate={reduced ? {} : { opacity: 1, y: 0 }}
                        transition={{ delay: reduced ? 0 : 0.02 * i }}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleLinkClick(e, item.id)}
                          className={[
                            "group rounded-xl border p-3 flex flex-col items-center justify-center text-center",
                            "bg-white/80 dark:bg-slate-950/50 border-gray-200/60 dark:border-gray-700/60",
                            "hover:border-cyan-400/70 hover:bg-cyan-50/60 dark:hover:bg-cyan-400/10",
                            "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ",
                            isActive ? "border-cyan-400/70" : "",
                          ].join(" ")}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span
                            className={[
                              "mb-2 grid place-items-center",
                              "size-10",

                            ].join(" ")}
                          >
                            {item.icon({ size: 20 })}
                          </span>
                          <span
                            className={[
                              "text-[13px] font-medium leading-tight",
                              isActive
                                ? SECTION_ACTIVE[item.id] ||
                                  "text-cyan-600 dark:text-cyan-400"
                                : "text-gray-900 dark:text-gray-200",
                            ].join(" ")}
                          >
                            {item.title}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
