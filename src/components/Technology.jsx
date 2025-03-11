import { 
  SiJavascript, SiReact, SiNodedotjs, SiAstro, 
  SiTailwindcss, SiPython, SiDocker, SiGit, 
  SiMongodb, SiExpress, SiPostgresql, SiRedis,
  SiAmazon, SiGraphql, SiNextdotjs, SiTypescript,
  SiKubernetes, SiFlask, SiPhp,
  SiMysql, SiLaravel
} from "react-icons/si";

const Technology = () => {
  const masteredTechnologies = [
    { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
    { Icon: SiReact, name: "React", color: "text-blue-500" },
    { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" },
    { Icon: SiGit, name: "Git", color: "text-orange-600" },
    { Icon: SiAstro, name: "Astro", color: "text-purple-500" },
    { Icon: SiPython, name: "Python", color: "text-blue-600" },
    {Icon: SiFlask, name: "FLask", color: "text-black"},
    { Icon: SiMysql, name: "MySQL", color: "text-orange-600"},
  ];

  const learningTechnologies = [
    { Icon: SiNodedotjs, name: "Node.js", color: "text-green-600" },
    { Icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
    { Icon: SiExpress, name: "Express", color: "text-gray-400" },
    { Icon: SiDocker, name: "Docker", color: "text-blue-600" },
    { Icon: SiKubernetes, name: "Kubernetes", color: "text-blue-600"},
    { Icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
    { Icon: SiPhp, name: "PHP", color: "text-blue-700"},
    { Icon: SiLaravel, name: "Laravel", color: "text-red-700"}
  ];

  const TechnologyGrid = ({ technologies, title }) => (
    <div className="mb-10">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-transparent bg-clip-text 
                     bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 py-10">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 md:p-6 min-h-[120px] rounded-lg 
                       bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                       shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <tech.Icon className={`w-8 h-8 md:w-10 md:h-10 ${tech.color} mb-3`} />
            <span className="text-sm md:text-[0.95rem] font-medium text-gray-700 dark:text-gray-300 text-center">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-12 md:py-20 min-h-0" id="technology">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text py-5 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500">
          Tecnologías
        </h2>
        <div className="space-y-12 md:space-y-14">
          <TechnologyGrid technologies={masteredTechnologies} title="Tecnologías Dominadas" />
          <TechnologyGrid technologies={learningTechnologies} title="Tecnologías en Aprendizaje" />
        </div>
      </div>
    </section>
  );
};

export default Technology;
