// Technology.tsx
import { 
  SiJavascript, SiReact, SiPython, SiFlask, SiHtml5, SiCss3,
  SiTailwindcss, SiNodedotjs, SiGit, SiAstro, SiMysql, SiWordpress
} from "react-icons/si";
import { motion } from "framer-motion";
import React from "react";
import { TitleSection } from "../atoms/TitleSection";

type TechItem = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  textClass: string;     // color de texto base
  bgClass: string;       // fondo del badge
  borderClass: string;   // borde del badge/tarjeta
  hoverTextClass: string; // color de texto al hover/focus (literal, no dinámico)
};

type TechGroups = Record<"frontend" | "backend" | "databases" | "tools", TechItem[]>;

const technologies: TechGroups = {
  frontend: [
    { Icon: SiHtml5, name: "HTML5", textClass: "text-orange-500", bgClass: "bg-orange-500/10", borderClass: "border-orange-500/20", hoverTextClass: "group-hover:text-orange-500" },
    { Icon: SiCss3, name: "CSS3", textClass: "text-blue-600", bgClass: "bg-blue-600/10", borderClass: "border-blue-600/20", hoverTextClass: "group-hover:text-blue-600" },
    { Icon: SiJavascript, name: "JavaScript", textClass: "text-yellow-400", bgClass: "bg-yellow-400/10", borderClass: "border-yellow-400/20", hoverTextClass: "group-hover:text-yellow-400" },
    { Icon: SiReact, name: "React", textClass: "text-sky-500", bgClass: "bg-sky-500/10", borderClass: "border-sky-500/20", hoverTextClass: "group-hover:text-sky-500" },
    { Icon: SiTailwindcss, name: "Tailwind", textClass: "text-cyan-500", bgClass: "bg-cyan-500/10", borderClass: "border-cyan-500/20", hoverTextClass: "group-hover:text-cyan-500" },
    { Icon: SiAstro, name: "Astro", textClass: "text-purple-600", bgClass: "bg-purple-600/10", borderClass: "border-purple-600/20", hoverTextClass: "group-hover:text-purple-600" },
  ],
  backend: [
    { Icon: SiPython, name: "Python", textClass: "text-blue-500", bgClass: "bg-blue-500/10", borderClass: "border-blue-500/20", hoverTextClass: "group-hover:text-blue-500" },
    { Icon: SiFlask, name: "Flask", textClass: "text-gray-700 dark:text-gray-300", bgClass: "bg-gray-700/10 dark:bg-gray-300/10", borderClass: "border-gray-700/20 dark:border-gray-300/20", hoverTextClass: "group-hover:text-gray-700 dark:group-hover:text-gray-300" },
    { Icon: SiNodedotjs, name: "Node.js", textClass: "text-green-600", bgClass: "bg-green-600/10", borderClass: "border-green-600/20", hoverTextClass: "group-hover:text-green-600" },
  ],
  databases: [
    { Icon: SiMysql, name: "MySQL", textClass: "text-blue-600", bgClass: "bg-blue-600/10", borderClass: "border-blue-600/20", hoverTextClass: "group-hover:text-blue-600" },
  ],
  tools: [
    { Icon: SiGit, name: "Git", textClass: "text-orange-600", bgClass: "bg-orange-600/10", borderClass: "border-orange-600/20", hoverTextClass: "group-hover:text-orange-600" },
    { Icon: SiWordpress, name: "WordPress", textClass: "text-blue-600", bgClass: "bg-blue-600/10", borderClass: "border-blue-600/20", hoverTextClass: "group-hover:text-blue-600" },
  ],
};

const TechCard: React.FC<{ item: TechItem }> = ({ item }) => {
  const { Icon, name, textClass, bgClass, borderClass, hoverTextClass } = item;

  return (
    <motion.div
      layout
      whileHover={{ y: -2, scale: 1.03 }}
      whileFocus={{ y: -2, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={[
        "relative group overflow-hidden rounded-2xl border ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-md transition-shadow",
        borderClass,
        "backdrop-blur-sm bg-white/60 dark:bg-gray-900/50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500",
      ].join(" ")}
      role="figure"
      aria-label={name}
      tabIndex={0}
    >
      {/* Glow de fondo al hover */}
      <div className={`absolute inset-0 opacity-0 ${hoverTextClass.replace("group-hover:", "")}/10 group-hover:opacity-100 transition-opacity duration-300 blur-2xl`} />

      <div className="relative p-7 md:p-8 flex flex-col items-center gap-4">
        <div className={`p-3 rounded-xl ${bgClass} ${borderClass} border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`w-8 h-8 ${textClass} transition-transform duration-300 group-hover:-rotate-3`} aria-hidden="true" />
        </div>
        <span className={`text-base font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 ${hoverTextClass}`}>
          {name}
        </span>
      </div>
    </motion.div>
  );
};

const TechSection: React.FC<{ title: string; items: TechItem[] }> = ({ title, items }) => (
  <section aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()} className="mb-14 last:mb-0">
    <h3 id={title.replace(/\s+/g, "-").toLowerCase()} className="text-2xl font-bold mb-7 text-gray-800 dark:text-gray-200">
      {title}
    </h3>
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7 md:gap-8">
      {items.map((item) => (
        <TechCard key={item.name} item={item} />
      ))}
    </div>
  </section>
);

const Technology: React.FC = () => {
  return (
    <main className="relative mx-auto w-[95%] md:w-[90%] px-6 sm:px-8 md:px-12 lg:px-16 py-14 bg-white dark:bg-slate-950 rounded-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 ">
      <header className="pb-5 text-center">
        <TitleSection title="Stack Tecnológico"/>
      </header>

      <TechSection title="Frontend" items={technologies.frontend} />
      <TechSection title="Backend" items={technologies.backend} />
      <TechSection title="Herramientas" items={technologies.tools} />
      <TechSection title="Bases de datos" items={technologies.databases} />
    </main>
  );
};

export default Technology;
