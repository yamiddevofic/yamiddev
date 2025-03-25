import { 
  SiJavascript, 
  SiReact, 
  SiPython, 
  SiFlask,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiAstro,
  SiMysql,
  SiWordpress
} from "react-icons/si";

const Technology = () => {
  const technologies = {
    frontend: [
      { 
        Icon: SiHtml5,
        name: "HTML5",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20"
      },
      {
        Icon: SiCss3,
        name: "CSS3",
        color: "text-blue-600",
        bgColor: "bg-blue-600/10",
        borderColor: "border-blue-600/20"
      },
      { 
        Icon: SiJavascript, 
        name: "JavaScript", 
        color: "text-yellow-400",
        bgColor: "bg-yellow-400/10",
        borderColor: "border-yellow-400/20"
      },
      { 
        Icon: SiReact, 
        name: "React", 
        color: "text-sky-500",
        bgColor: "bg-sky-500/10",
        borderColor: "border-sky-500/20"
      },
      {
        Icon: SiTailwindcss,
        name: "Tailwind",
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/20"
      },
      {
        Icon: SiAstro,
        name: "Astro",
        color: "text-purple-600",
        bgColor: "bg-purple-600/10",
        borderColor: "border-purple-600/20"
      }
    ],
    backend: [
      { 
        Icon: SiPython, 
        name: "Python", 
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20"
      },
      { 
        Icon: SiFlask, 
        name: "Flask", 
        color: "text-gray-700 dark:text-gray-300",
        bgColor: "bg-gray-700/10 dark:bg-gray-300/10",
        borderColor: "border-gray-700/20 dark:border-gray-300/20"
      },
      {
        Icon: SiNodedotjs,
        name: "Node.js",
        color: "text-green-600",
        bgColor: "bg-green-600/10",
        borderColor: "border-green-600/20"
      },
      {
        Icon: SiMysql,
        name: "MySQL",
        color: "text-blue-600",
        bgColor: "bg-blue-600/10",
        borderColor: "border-blue-600/20"
      }
    ],
    tools: [
      {
        Icon: SiGit,
        name: "Git",
        color: "text-orange-600",
        bgColor: "bg-orange-600/10",
        borderColor: "border-orange-600/20"
      },
      {
        Icon: SiWordpress,
        name: "WordPress",
        color: "text-blue-600",
        bgColor: "bg-blue-600/10",
        borderColor: "border-blue-600/20"
      }
    ]
  };

  const TechSection = ({ title, items }) => (
    <div className="mb-12 last:mb-0">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 js-show-on-scroll">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {items.map(({ Icon, name, color, bgColor, borderColor }, index) => (
          <div
            key={index}
            className={`relative group overflow-hidden rounded-2xl border ${borderColor}
                       backdrop-blur-sm bg-white/50 dark:bg-gray-900/50
                       transition-all duration-300 hover:scale-105 hover:shadow-xl
                       cursor-pointer js-show-on-scroll`}
          >
            {/* Fondo con efecto de gradiente */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                           bg-gradient-to-br ${bgColor}`} />
            
            {/* Contenido */}
            <div className="relative p-6 flex flex-col items-center gap-4">
              <div className={`p-3 rounded-xl ${bgColor} ${borderColor} border
                             transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className={`w-8 h-8 ${color} transition-all duration-300 
                                group-hover:transform group-hover:rotate-[-3deg]`} />
              </div>
              <span className={`text-base font-medium text-gray-800 dark:text-gray-200
                              transition-colors duration-300 group-hover:${color}`}>
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center pb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 js-show-on-scroll">
        Stack Tecnológico
      </h2>
      
      <TechSection title="Frontend" items={technologies.frontend} />
      <TechSection title="Backend" items={technologies.backend} />
      <TechSection title="Herramientas" items={technologies.tools} />
    </section>
  );
};

export default Technology;