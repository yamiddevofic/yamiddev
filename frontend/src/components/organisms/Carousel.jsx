import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Projects } from '../../lib/projectData';
import { TitleSection } from '../atoms/TitleSection'

const Carousel = () => {
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const GAP_PX = 16; // gap-4

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        let items = 3; // Por defecto en desktop
        
        if (window.innerWidth < 768) {
          items = 1; // En móvil
        } else if (window.innerWidth < 1280) {
          items = 2; // En tablet
        }
        
        // No exceder el total de proyectos para autoajuste en desktop
        items = Math.min(items, Projects.length);
        setVisibleItems(items);
        
        // Ajustar currentIndex si es necesario
        const maxIndex = Math.max(Projects.length - items, 0);
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollByItems = (direction) => {
    const track = trackRef.current;
    const item = firstItemRef.current;
    if (!track || !item) return;
    
    const itemWidth = item.offsetWidth;
    const scrollDistance = itemWidth + GAP_PX;
    
    track.scrollBy({ 
      left: direction * scrollDistance, 
      behavior: "smooth" 
    });
    
    // Actualizar currentIndex para los indicadores
    if (direction > 0) {
      setCurrentIndex(prev => Math.min(prev + 1, Projects.length - visibleItems));
    } else {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index) => {
    const track = trackRef.current;
    const item = firstItemRef.current;
    if (!track || !item) return;
    
    const itemWidth = item.offsetWidth;
    const scrollDistance = (itemWidth + GAP_PX) * index;
    
    track.scrollTo({ 
      left: scrollDistance, 
      behavior: "smooth" 
    });
    
    setCurrentIndex(index);
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative isolate w-full overflow-hidden  px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-14 md:py-16 lg:py-20 text-gray-900 dark:text-gray-100"
    >
      {/* Encabezado */}
      <div className="mx-auto max-w-6xl text-center mb-5 md:mb-7">
        <TitleSection title="Proyectos"/>
      </div>

      {/* Carrusel */}
      <div className="relative mx-auto">
        {/* Botón izquierdo */}
        {Projects.length > visibleItems && (
          <button
            onClick={() => scrollByItems(-1)}
            disabled={currentIndex === 0}
            aria-label="Proyecto anterior"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center h-12 w-12 rounded-full border border-white/20 bg-white/80 backdrop-blur hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all shadow-lg ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Pista de slides */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x scroll-smooth no-scrollbar gap-5 px-1 cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {Projects.map((project, idx) => (
            <motion.div
              key={project.id}
              ref={idx === 0 ? firstItemRef : undefined}
              className="group relative flex-none w-[92%] xs:w-[90%] sm:w-[85%] snap-start bg-white dark:bg-slate-950 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50 rounded-xl"
              style={
                visibleItems > 1
                  ? { flex: `0 0 calc((100% - ${(visibleItems - 1) * GAP_PX}px) / ${visibleItems})` }
                  : undefined
              }
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <article className="relative h-auto rounded-xl border border-white/10 dark:border-white/10 bg-transparent dark:bg-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {/* Imagen */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                    <img
                      src={project.image[0]}
                      alt={project.title}
                      className="w-full h-full object-cover dark:hidden group-hover:scale-105 transition-transform duration-500"
                    />
                    <img
                      src={project.image[1]}
                      alt={project.title}
                      className="w-full h-full object-cover hidden dark:block group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Contenido */}
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1.5 text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="mt-auto space-y-2.5">
                      {/* Tiempo */}
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.time === 'En desarrollo' ? 'En desarrollo' : `Duración: ${project.time}`}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 text-[11px] rounded-full whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 text-[11px] rounded-full">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="pt-2">
                        <a
                          href={project.url ? project.url : '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 rounded-md text-sm hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                        >
                          Ver proyecto
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Botón derecho */}
        {Projects.length > visibleItems && (
          <button
            onClick={() => scrollByItems(1)}
            disabled={currentIndex >= Projects.length - visibleItems}
            aria-label="Proyecto siguiente"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center h-12 w-12 rounded-full border border-white/20 bg-white/80 backdrop-blur hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all shadow-lg ${
              currentIndex >= Projects.length - visibleItems ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7m7-7H3"
              />
            </svg>
          </button>
        )}
      </div>


      {/* Estilos para ocultar scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
};

export default Carousel;