import React, { useState, useEffect, useRef } from 'react';
import { Projects } from '../lib/projectData';
import { motion } from 'framer-motion';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(1);
  const [gap, setGap] = useState(32);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        let items = 3; // Por defecto en desktop
        const newGap = window.innerWidth < 640 ? 20 : 32; // Gap ajustado
        setGap(newGap);

        if (window.innerWidth < 768) {
          items = 1; // En móvil
        } else if (window.innerWidth < 1280) {
          items = 2; // En tablet
        }

        setVisibleItems(items);

        if (carouselRef.current) {
          const containerWidth = carouselRef.current.clientWidth;
          // Reducimos el padding para aprovechar más espacio
          const paddingX = window.innerWidth < 640 ? 6 : 16; 
          const availableWidth = containerWidth - paddingX * 2;

          // Aumentamos el tamaño de las tarjetas
          const calculatedWidth =
            items === 1
              ? availableWidth - 16 // Menos margen para más ancho en móvil
              : (availableWidth - newGap * (items - 1)) / items;

          setItemWidth(calculatedWidth);
        }

        const maxIndex = Math.max(Projects.length - items, 0);
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
      }
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(Projects.length - visibleItems, 0);
      return Math.min(prev + 1, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0e1335] dark:to-[#030617] p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      <h2 className="text-4xl sm:text-6xl font-bold text-center mb-6 py-4 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 pt-3 sm:pt-5 js-show-on-scroll">
        Proyectos
      </h2>

      <div 
        className="relative w-full max-w-full mx-auto rounded-xl js-show-on-scroll"
        ref={carouselRef}
      >
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -currentIndex * (itemWidth + gap) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-4 sm:gap-8 p-1 sm:p-2"
            style={{ width: 'fit-content' }}
          >
            {Projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 js-show-on-scroll flex-shrink-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ width: itemWidth ? `${itemWidth}px` : '100%' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-full h-44 sm:h-56 overflow-hidden rounded-xl">
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className="w-full h-full object-cover dark:hidden hover:scale-105 transition-transform duration-500"
                  />
                  <img
                    src={project.image[1]}
                    alt={project.title}
                    className="w-full h-full object-cover hidden dark:block hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="flex flex-col justify-between h-full mt-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3 sm:line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center text-gray-500 text-xs mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.time === 'En desarrollo'
                        ? 'En desarrollo'
                        : 'Duración: ' + project.time}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.techStack
                        .slice(0, typeof window !== 'undefined' ? (window.innerWidth < 768 ? 4 : project.techStack.length) : project.techStack.length)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-100 px-2.5 py-1 text-xs rounded-full whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.techStack.length > 4 && typeof window !== 'undefined' && window.innerWidth < 768 && (
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2.5 py-1 text-xs rounded-full">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                    <a
                      href={project.url}
                      className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                    >
                      Ver proyecto
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {Projects.length > visibleItems && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 sm:p-3 rounded-full shadow-lg transition-all ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-110'
              }`}
              aria-label="Proyecto anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400"
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
              onClick={nextSlide}
              disabled={currentIndex >= Projects.length - visibleItems}
              className={`absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 sm:p-3 rounded-full shadow-lg transition-all ${
                currentIndex >= Projects.length - visibleItems ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-110'
              }`}
              aria-label="Proyecto siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400"
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
        
        {/* Indicadores de paginación */}
        <div className="flex justify-center mt-6 gap-1.5">
          {Array.from({ length: Math.ceil(Projects.length / visibleItems) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleItems)}
              className={`h-2 rounded-full transition-all ${
                index === Math.floor(currentIndex / visibleItems)
                  ? 'w-6 bg-blue-600 dark:bg-blue-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
