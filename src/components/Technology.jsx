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
    <div className="w-full 2xl:w-4/5 h-auto flex flex-col">
      <h1 className="text-4xl md:text-5xl mb-8 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 pt-[15%] px-5">
        Tecnologías que manejo
      </h1>
      <div className="max-w-6xl mx-auto w-11/12 md:w-2/3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <tech.Icon className={`w-12 h-12 ${tech.color} mb-2`} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;
