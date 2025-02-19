import React from 'react';
import { 
  User2, 
  History, 
  Palette, 
  Heart
} from 'lucide-react';

const AboutMe = () => {
  return (
    <div id="about-me" className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 class="text-[1.6rem] md:text-[2rem] font-bold text-cyan-400 text-center py-12">Sobre mí </h1>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors max-w-4xl w-full">
        {/* Sección: Presentación */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Imagen de Perfil con Borde Gradiente */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-spin-slow"></div>
            <img
              src="./dev.jpg"
              alt="Perfil"
              className="absolute inset-[3px] rounded-full object-cover bg-gray-100 dark:bg-gray-900 w-[calc(100%-6px)] h-[calc(100%-6px)]"
            />
          </div>
          {/* Contenido de Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <User2 className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Presentación</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-base md:text-lg">
              Mi nombre es Yamid Horacio Rodríguez, soy de Colombia, y cuento con más de 2 años de experiencia desarrollando aplicaciones web y móviles.
            </p>
            <p className="text-gray-600 dark:text-gray-300 font-bold text-base md:text-lg">
              Me especializo en crear experiencias digitales modernas y responsivas.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Sección: Mi Historia */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Mi Historia
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Desde joven he sentido una gran curiosidad por comprender el mundo que me rodea. Mi camino me ha llevado por diversas experiencias que han moldeado mi forma de ver la vida y la importancia del aprendizaje continuo. La pasión por descubrir y mejorar me ha impulsado a enfrentar nuevos desafíos y crecer tanto personal como profesionalmente.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Sección: Pasiones e Intereses */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Pasiones e Intereses
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Más allá del mundo digital, me apasiona la música, la literatura y el arte en todas sus formas. Disfruto explorando nuevas culturas y aprendiendo sobre diferentes perspectivas, lo cual enriquece mi creatividad y me inspira en cada proyecto personal que emprendo.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        {/* Sección: Filosofía y Valores */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Filosofía y Valores
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Creo firmemente en la importancia de la honestidad, la perseverancia y el respeto. Valoro el esfuerzo constante y la empatía, principios que me guían tanto en mi vida personal como profesional, y que me motivan a contribuir de manera positiva en cada entorno en el que me desenvuelvo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;