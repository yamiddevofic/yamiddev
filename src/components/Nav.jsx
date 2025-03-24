"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Home} from "lucide-react";
import { HomeFilled } from "./icons/HomeFilled";
import { AboutMe } from "./icons/AboutMe";
import { Contact } from "./icons/Contact";
import { Portfolio } from "./icons/Portfolio";
import { Computer } from "./icons/Computer";
import { Button } from "@/components/ui/button"; // Shadcn UI

const sectionIds = [
  {title: "Inicio", id: "home", icon: HomeFilled},
  { title: "Proyectos", id: "projects", icon: Portfolio},
  { title: "Sobre mí", id: "about-me", icon: AboutMe },
  { title: "Tecnologías", id: "technology", icon: Computer },
  { title: "Contacto", id: "contact", icon: Contact },
];

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:dark:bg-slate-950 rounded-xl shadow-lgborder border-gray-200/50 dark:border-gray-700/50 fixed w-full top-0 z-50 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.a
            href="/"
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300 transition-all duration-300"
          >
            yamid.dev
          </motion.a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              {sectionIds.map((item) => (
                item.id === "project" ? null : (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    data-open={item.id === "projects" ? "projects" : undefined}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-lg font-medium transition-colors text-gray-900 dark:text-gray-300 hover:text-[#F28F16] dark:hover:text-[#F2CF66]"
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    {item.title}
                  </motion.a>
                )
              ))}
            </nav>
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className=' bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-lg p-3 transition-all hover:scale-110 text-xl w-[35px] h-[35px] hidden md:flex'
              title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
            >
              {theme === "light" ? <Moon className="text-xl"/> : <Sun className="text-xl"/>}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden"
              aria-label="Toggle menu"
              title={`${isOpen ? "Cerrar" : "Abrir"} menú`}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 mt-12"
            onClick={() => setIsOpen(false)}
          >
            <motion.ul
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 pt-3.5 w-3/4 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center justify-start overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {sectionIds.map((items) => (
                (
                  <motion.a
                    key={items.id}
                    href={`#${items.id}`}
                    data-open={items.id === "projects" ? "projects" : undefined}
                    className="text-xl font-medium transition-colors text-gray-900 dark:text-gray-300 h-[70px] w-full flex items-center justify-start p-5 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={(e) => handleLinkClick(e, items.id)}
                  >
                    <motion.li className="w-full h-full flex items-center justify-start p-5">
                      <motion.div className="flex items-center justify-start gap-4">
                        {items.icon({ size: 24 })}
                        {items.title}
                      </motion.div>
                    </motion.li>
                  </motion.a>
                )
              ))}
              <div className="w-full h-[150px] rounded-lg flex flex-col items-center p-4 bg-gray-200 dark:bg-gray-800 justify-center">
                <h2 className="mt-5 text-xl">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</h2>
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-lg p-5 transition-all hover:scale-110 text-2xl w-[50px] h-[50px] mt-4"
                  title={`Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`}
                >
                  {theme === "light" ? <Moon className="text-xl"/> : <Sun className="text-xl"/>}
                </Button>
              </div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
