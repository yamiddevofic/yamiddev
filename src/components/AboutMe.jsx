import React from 'react';
import { User2, Briefcase, Code, Server, MessageCircle, Book, Users } from 'lucide-react';
import ButtonProjects from './buttonProjects'

const ExperienceCard = ({ company, title, period, location, highlights, logo }) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 js-show-on-scroll">
    <div className="flex flex-col md-flex-row justify-between items-start mb-3 ">
      <div className="flex flex-col md:flex-row items-left md:items-center gap-3 w-full justify-between">
        <div className='flex items-center justify-center'>
          {logo && (
            <img 
              src={logo} 
              alt={`${company} logo`} 
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className={`${logo ? 'ml-4' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{company}</p>
          </div>
        </div>
        <div className="text-left md:text-right w-auto">
          <p className="text-xs text-gray-500 dark:text-gray-300">{period}</p>
          <p className="text-xs text-gray-500 dark:text-gray-300">{location}</p>
        </div>
      </div>
      
    </div>
    <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
      {highlights.map((highlight, index) => (
        <li key={index} className="flex items-start gap-2">
          <highlight.icon className="w-4 h-4 mt-1 text-blue-500 flex-shrink-0" />
          <span>{highlight.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const EducationCard = ({ title, institution, year, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-1">{institution}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{year}</p>
    <p className="mt-3 text-gray-700 dark:text-gray-200">{description}</p>
  </div>
);

const ModernAboutMe = () => {
  const experiences = [
    {
      company: "Platzi",
      title: "Estudiante",
      period: "Ago 2024 - Actualmente",
      location: "Remoto",
      logo: "https://static.platzi.com/media/uploads/icon_77b5127626.png",
      highlights: [
        { icon: Code, text: "Estudiando la Escuela de programación de Javascript" },
        { icon: Users, text: "Participación activa en la comunidad de Platzi" },
        { icon: Book, text: "Reforzando capacidad de autoaprendizaje, y formación continua" },
        { icon: Users, text: "Fortaleciendo habilidades blandas" },

      ]
    },
    {
      company: "Ega Kat Logistica",
      title: "Aprendiz en Prácticas",
      period: "May 2024 - Nov 2024",
      location: "Remoto",
      logo: "",
      highlights: [
        { icon: Code, text: "Estudio y análisis de servidores, CMS WordPress" },
        { icon: Server, text: "Soporte técnico de primer nivel" },
        { icon: MessageCircle, text: "Capacitación y atención a clientes" }
      ]
    },
    {
      company: "SENA",
      title: "Tecnólogo en análisis y desarrollo de software",
      period: "Jul 2022 - Nov 2024",
      location: "Presencial",
      logo: "./sena.png",
      highlights: [
        { icon: Code, text: "Tecnologías: Python, HTML, CSS, JavaScript, SQL, Node.js" },
        { icon: Book, text: "Desarrollo de MVP para tiendas de barrio" },
        { icon: Users, text: "Desarrollo de habilidades interpersonales y trabajo en equipo" }
      ]
    }
  ];

  return (
    <section className="pt-[10%] md:pt-[5%] pb-[5%] w-[100%] px-[5%]" id='about-me'>
      <h2 className="text-4xl md:text-5xl font-bold text-center py-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 js-show-on-scroll">
        Sobre mí
      </h2>
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 pt-12 md:pt-5">
        {/* Perfil */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-blue-500/30 dark:ring-blue-400/30 mb-4 md:mb-6 js-show-on-scroll">
            <img 
              src="./dev.jpg" 
              alt="Yamid Horacio Rodríguez"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 js-show-on-scroll">
            Yamid Horacio Rodríguez
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center js-show-on-scroll">
            Tecnólogo en Análisis y Desarrollo de Software
          </p>
          
          <div className="flex space-x-4 mb-4 md:mb-6 js-show-on-scroll">
            <a 
              href="https://github.com/yamiddevofic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/yamiddevofic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          {/* Información Personal */}
          <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 js-show-on-scroll mb-4 md:mb-6 shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 js-show-on-scroll">
            <div className="flex items-center mb-3">
              <User2 className="w-5 h-5 mr-2 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Sobre Mí</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cuento con más de 2 años de experiencia en programación web. 
              Apasionado por el aprendizaje continuo y la resolución creativa de problemas.
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-6">
              <div className='flex items-center justify-start w-screen'>
                <Briefcase className='mr-[2rem] text-blue-500'/>
                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 w-[100%]">
                  Experiencia Profesional
                </h2> 
              </div>                                  
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {experiences.map((exp, index) => (
              <ExperienceCard 
                key={index}
                company={exp.company}
                title={exp.title}
                period={exp.period}
                location={exp.location}
                highlights={exp.highlights}
                logo={exp.logo}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAboutMe;