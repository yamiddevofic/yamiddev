import { SiJavascript, SiReact, SiNodedotjs, SiAstro, SiTailwindcss, SiPython } from "react-icons/si";

function Technology() {
    const technologies = [
        { Icon: SiJavascript, name: "JavaScript", color: "text-yellow-500" },
        { Icon: SiReact, name: "React", color: "text-blue-500" },
        { Icon: SiNodedotjs, name: "Node.js", color: "text-green-600" },
        { Icon: SiPython, name: "Python", color: "text-blue-600" },
        { Icon: SiAstro, name: "Astro", color: "text-purple-500" },
        { Icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-500" }
    ];

    return (
        <div className="w-[100%] h-[100vh] mb-[5%] flex flex-col items-center justify-center">
            <h1 class="text-[1.5rem] md:text-[2rem] font-bold text-cyan-400 text-center py-4">Tecnologías que manejo </h1>
            <div className="max-w-6xl mx-auto w-[90%] md:w-[64%]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="tech-item group relative flex flex-col items-center justify-center p-6 rounded-lg 
                            bg-white dark:bg-gray-800 
                            border border-gray-200 dark:border-gray-700 
                            hover:border-gray-300 dark:hover:border-gray-600 
                            transition-all duration-300 cursor-pointer"
                        >
                            <tech.Icon className={`w-12 h-12 ${tech.color} mb-2`} />
                            <span className="tech-name text-sm text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Technology;
