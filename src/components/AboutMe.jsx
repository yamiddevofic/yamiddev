import { User2, History, Palette } from 'lucide-react';

const AboutMe = () => {
  return (
    <section id="about-me" className="w-full py-20 flex flex-col items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-from-gray-100 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-center pb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 hidden md:flex">
        Sobre mí
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-4xl w-full backdrop-blur-sm bg-opacity-80 dark:bg-opacity-60 border-t border-l border-gray-100 dark:border-gray-700">
        {/* Sección: Presentación */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Imagen de Perfil con Borde Gradiente */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse group-hover:animate-none"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
            <img
              src="./dev.jpg"
              alt="Perfil"
              className="absolute inset-[3px] rounded-full object-cover bg-gray-100 dark:bg-gray-900 w-[calc(100%-6px)] h-[calc(100%-6px)] transition-all duration-300 group-hover:inset-[2px] group-hover:w-[calc(100%-4px)] group-hover:h-[calc(100%-4px)]"
            />
          </div>
          
          {/* Contenido de Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                <User2 className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Presentación</h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Mi nombre es <span className="font-semibold text-blue-600 dark:text-blue-400">Yamid Horacio Rodríguez</span>, 
              <span className="font-semibold"> tecnólogo en análisis y desarrollo de software</span> del 
              <span className="font-semibold text-emerald-600 dark:text-emerald-400"> SENA</span>, y cuento con más de 2 años 
              de experiencia programando aplicaciones web.
            </p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        
        {/* Sección: Mi Historia */}
        <div className="mb-8 transform hover:translate-x-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30">
              <History className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mi Historia</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
            Desde joven he sentido una gran curiosidad por comprender el mundo que me rodea. 
            Mi camino me ha llevado por diversas experiencias que han moldeado mi forma de ver la vida 
            y la importancia del aprendizaje continuo. La pasión por descubrir y mejorar 
            me ha impulsado a enfrentar nuevos desafíos y crecer tanto personal como profesionalmente.
          </p>
        </div>
        
        {/* Sección: Pasiones e Intereses */}
        <div className="transform hover:translate-x-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/30">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pasiones e Intereses</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-11">
            Más allá del mundo digital, me apasiona la música, la literatura y el arte en todas sus formas. 
            Disfruto explorando nuevas culturas y aprendiendo sobre diferentes perspectivas, 
            lo cual enriquece mi creatividad y me inspira en cada proyecto personal que emprendo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;