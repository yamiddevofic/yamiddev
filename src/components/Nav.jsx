"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, color } from "framer-motion";
import { Menu, X} from "lucide-react";
import { HomeFilled } from "./icons/HomeFilled";
import { AboutMe } from "./icons/AboutMe";
import { Contact } from "./icons/Contact";
import { Portfolio } from "./icons/Portfolio";
import { Computer } from "./icons/Computer";
import { Button } from "@/components/ui/button"; // Shadcn UI

const sectionIds = [
  { title: "Inicio", id: "home", icon: HomeFilled },
  { title: "Sobre mí", id: "about-me", icon: AboutMe },
  { title: "Tecnología", id: "technology", icon: Computer },
  { title: "Proyectos", id: "projects", icon: Portfolio },
  { title: "Contacto", id: "contact", icon: Contact },
];

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

const itemsVariants = {
  hover: {color: "red"}
}

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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-slate-900 shadow-md fixed w-full top-0 z-50 transition-colors duration-300"
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <nav className="hidden md:flex gap-6">
            {sectionIds.map((item) => (
              <motion.button key={item.id} id={item.id}>
                <motion.a
                  href={`#${item.id}`}
                  variants={linkVariants}
                  whileHover="hover"
                  className="text-lg font-medium transition-colors text-gray-900 dark:text-gray-300 hover:text-[#F28F16] dark:hover:text-[#F2CF66]"
                  onClick={handleLinkClick}
                >
                  {item.title}
                </motion.a>
              </motion.button>
            ))}
          </nav>
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
              className="fixed right-0 top-0 pt-3.5 w-3/4 h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col flex items-center justify-start overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {sectionIds.map((items) => (
                <motion.button key={items.id} className="w-full h-full flex items-center justify-start max-h-[5rem] bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg  transition-all duration-300 cursor-pointer"
                variants={itemsVariants} whileHover="hover">
                    <motion.a
                        href={`#${items.id}`}
                        className="text-xl font-medium transition-colors text-gray-900 dark:text-gray-300 h-[100%] w-full"
                        onClick={handleLinkClick}
                      >
                      <motion.li key={items.id} className="w-full h-full flex items-center justify-start p-5">
                        
                          <motion.div className="flex items-center justify-start gap-4">
                            {items.icon({ size: 24 })}
                            {items.title}
                          </motion.div>
                    </motion.li>
                    </motion.a>
                </motion.button>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="ghost"
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-full shadow-lg p-4 transition-all hover:scale-110 z-50"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </Button>
    </>
  );
};

export default Navbar;
