import { User2, History, Palette } from 'lucide-react';

const AboutMe = () => {
  return (
    <section id="about-me" className="w-full py-[18%] md:py-[9%] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center pb-12 hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500">
        Sobre mí
      </h1>
      
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm max-w-4xl w-full">
        {/* Sección: Presentación */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Imagen de Perfil con Borde Gradiente */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"></div>
            <img
              src="./dev.jpg"
              alt="Perfil"
              className="absolute inset-[2px] rounded-full object-cover bg-gray-100 dark:bg-gray-900 w-[calc(100%-4px)] h-[calc(100%-4px)]"
            />
          </div>
          
          {/* Contenido de Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <User2 className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Presentación</h2>
            </div>
            <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-4">
              Mi nombre es <span className="font-semibold">Yamid Horacio Rodríguez</span>, <span className="font-semibold">tecnólogo en análisis y desarrollo de software</span> en el <span className="font-semibold"> SENA</span>, y cuento con más de 2 años de experiencia programando aplicaciones web.
            </p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="my-6 h-px bg-gray-200 dark:bg-gray-700" />
        
        {/* Sección: Mi Historia */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mi Historia</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Desde joven he sentido una gran curiosidad por comprender el mundo que me rodea. Mi camino me ha llevado por diversas experiencias que han moldeado mi forma de ver la vida y la importancia del aprendizaje continuo. La pasión por descubrir y mejorar me ha impulsado a enfrentar nuevos desafíos y crecer tanto personal como profesionalmente.
          </p>
        </div>
        
        {/* Sección: Pasiones e Intereses */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Pasiones e Intereses</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Más allá del mundo digital, me apasiona la música, la literatura y el arte en todas sus formas. Disfruto explorando nuevas culturas y aprendiendo sobre diferentes perspectivas, lo cual enriquece mi creatividad y me inspira en cada proyecto personal que emprendo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;