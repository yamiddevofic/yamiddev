import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Projects } from '../lib/projectData'; // Ajusta la ruta según tu estructura

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Projects.length - 1 : prevIndex - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % Projects.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  return (
    <div className="relative w-full max-w-8xl mx-auto py-12 px-4 overflow-hidden flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-bold text-center pb-8 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 pt-5 pb-5">
        Proyectos
      </h2>
      
      <div 
        className="relative w-full max-w-4xl mx-auto rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Botones de navegación */}
        {Projects.length > 1 && (
          <>
            <button 
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Proyecto anterior"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
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
          
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Proyecto siguiente"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={Projects[currentIndex].title}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-auto flex flex-col rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900"
            onClick={() => window.open(Projects[currentIndex].url, '_blank')}
          >
            {/* Imagen con altura fija para mantener el mismo tamaño */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={Projects[currentIndex].image[0]}
                alt={Projects[currentIndex].title}
                className='w-full h-full object-cover dark:hidden'
                style={{ backgroundPosition: 'center' }}
              />
              <img
                src={Projects[currentIndex].image[1]}
                alt={Projects[currentIndex].title}
                className='w-full h-full object-cover dark:block'
                style={{ backgroundPosition: 'center' }}
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col justify-between p-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold line-clamp-1">
                  {Projects[currentIndex].title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3">
                  {Projects[currentIndex].description}
                </p>
              </div>
              <div>
                <p className="mt-2 text-gray-500 text-xs md:text-sm">
                  {Projects[currentIndex].time === "En desarrollo" ? "En desarrollo" : "Duración: " + Projects[currentIndex].time}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {Projects[currentIndex].techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 text-xs rounded-full whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicadores circulares */}
      {
      Projects.length > 1 && (
        <div className="flex mt-4 space-x-3 justify-center">
          {Projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
            aria-label={`Ir al proyecto ${index + 1}`}
          ></button>
        ))}
      </div>
      )}
    </div>
  );
};

export default Carousel;
