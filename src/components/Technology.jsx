import { 
  SiJavascript, SiReact, SiPython, SiFlask
} from "react-icons/si";

const Technology = () => {
  const coreTechnologies = [
    { 
      Icon: SiJavascript, 
      name: "JavaScript", 
      color: "text-yellow-400",
      bgColor: "bg-yellow-50"
    },
    { 
      Icon: SiReact, 
      name: "React", 
      color: "text-sky-500",
      bgColor: "bg-sky-50"
    },
    { 
      Icon: SiPython, 
      name: "Python", 
      color: "text-blue-400",
      bgColor: "bg-blue-50"
    },
    { 
      Icon: SiFlask, 
      name: "Flask", 
      color: "text-zinc-700",
      bgColor: "bg-zinc-100"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center pb-8 pt-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 js-show-on-scroll">
        Tecnologías Principales
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreTechnologies.map(({ Icon, name, color, bgColor }, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl ${bgColor} dark:bg-gray-800 flex flex-col items-center 
                       space-y-3 transition-transform duration-300 hover:scale-105 js-show-on-scroll`}
          >
            <div className={`p-3 rounded-full ${bgColor} dark:bg-gray-700`}>
              <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Technology;