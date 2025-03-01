import { SiJavascript, SiReact, SiNodedotjs, SiAstro, SiTailwindcss, SiPython } from "react-icons/si";

const Technology = () => {
  const technologies = [
    { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { Icon: SiReact, name: "React", color: "text-blue-500" },
    { Icon: SiNodedotjs, name: "Node.js", color: "text-green-600" },
    { Icon: SiPython, name: "Python", color: "text-blue-600" },
    { Icon: SiAstro, name: "Astro", color: "text-purple-500" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" }
  ];

  return (
    <section className="w-full py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 mb-8">
        Tecnologías que manejo
      </h2>
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-transform hover:shadow-sm"
            >
              <tech.Icon className={`w-10 h-10 ${tech.color} mb-2`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;