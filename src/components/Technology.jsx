import { SiJavascript, SiReact, SiNodedotjs, SiAstro, SiTailwindcss, SiPython, SiDocker } from "react-icons/si";

const Technology = () => {
  const masteredTechnologies = [
    { Icon: SiPython, name: "Python", color: "text-blue-600" },
    { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { Icon: SiReact, name: "React", color: "text-blue-500" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" },
  ];

  const learningTechnologies = [
    { Icon: SiNodedotjs, name: "Node.js", color: "text-green-600" },
    { Icon: SiDocker, name: "Docker", color: "text-blue-600" },
    { Icon: SiAstro, name: "Astro", color: "text-purple-500" },
  ];

  const TechnologyGrid = ({ technologies, title }) => (
    <div className="mb-6 md:mb-10">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto mt-5">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 md:p-5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <tech.Icon className={`w-8 h-8 md:w-10 md:h-10 ${tech.color} mb-2`} />
            <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-8 md:py-16 min-h-0">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 mb-6 md:mb-10">
          Mis Tecnologías
        </h2>
        <div className="space-y-6 md:space-y-10">
          <TechnologyGrid technologies={masteredTechnologies} title="Tecnologías Dominadas" />
          <TechnologyGrid technologies={learningTechnologies} title="Tecnologías que estoy aprendiendo" />
        </div>
      </div>
    </section>
  );
};

export default Technology;