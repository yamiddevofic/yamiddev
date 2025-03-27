import React, { useState, useEffect, useRef } from 'react';
import { Projects } from '../lib/projectData';
import { motion } from 'framer-motion';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const carouselRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(1);
  const [gap, setGap] = useState(32); // Estado para manejar el gap dinámicamente

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        let items = 3; // Por defecto en desktop
        const newGap = window.innerWidth < 640 ? 16 : 32; // Gap de 16px en móvil, 32px en desktop
        setGap(newGap);

        if (window.innerWidth < 640) {
          items = 1; // En móvil
        } else if (window.innerWidth < 1024) {
          items = 2; // En tablet
        }

        setVisibleItems(items);

        if (carouselRef.current) {
          const containerWidth = carouselRef.current.clientWidth;
          const paddingX = window.innerWidth < 640 ? 8 : 24; // p-2 (8px) en móvil, sm:p-6 (24px) en desktop
          const availableWidth = containerWidth - paddingX * 2;

          const calculatedWidth =
            items === 1
              ? availableWidth - 32 // Margen total de 32px (16px a cada lado)
              : (availableWidth - newGap * (items - 1)) / items;

          setItemWidth(calculatedWidth);
        }

        // Ajustar el índice actual si es necesario
        const maxIndex = Math.max(Projects.length - items, 0);
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
      }
    };

    if (typeof window !== 'undefined') {
      handleResize(); // Ejecutar al montar el componente
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white bg-gradient-to-br from-white-50 to-white-50 dark:from-[#0e1335] dark:to-[#030617] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
      <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-center pb-4 sm:pb-8 mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 pt-3 sm:pt-5 js-show-on-scroll">
        Proyectos
      </h2>

      <div
        className="relative w-full max-w-10xl mx-auto rounded-xl overflow-hidden js-show-on-scroll"
        ref={carouselRef}
      >
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -currentIndex * (itemWidth + gap) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-4 sm:gap-8 p-2 sm:p-6"
            style={{ width: 'fit-content' }}
          >
            {Projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-gray.200 dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 js-show-on-scroll flex-shrink-0"
                style={{ width: itemWidth ? `${itemWidth}px` : '100%' }}
              >
                <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-md">
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className="w-full h-full object-cover dark:hidden"
                  />
                  <img
                    src={project.image[1]}
                    alt={project.title}
                    className="w-full h-full object-cover hidden dark:block"
                  />
                </div>

                {/* Contenido optimizado para móviles */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-800 dark:text-gray-100 pt-3 sm:pt-4 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-gray-600 dark:text-gray-300 mb-2 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="mt-1 sm:mt-2 text-gray-500 text-xs">
                      {project.time === 'En desarrollo'
                        ? 'En desarrollo'
                        : 'Duración: ' + project.time}
                    </p>
                    <div className="mt-1 sm:mt-2 flex flex-wrap gap-1">
                      {/* Limitar el número de tecnologías mostradas en móvil */}
                      {project.techStack
                        .slice(0, typeof window !== 'undefined' ? (window.innerWidth < 768 ? 3 : project.techStack.length) : project.techStack.length)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 text-xs rounded-full whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.techStack.length > 3 && typeof window !== 'undefined' && window.innerWidth < 768 && (
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 text-xs rounded-full">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                    <a
                      href={project.url}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mt-2 sm:mt-4 inline-block text-sm sm:text-base"
                    >
                      Ver más
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Botones de navegación ajustados para móvil */}
        {Projects.length > 1 && (Projects.length > 3 || (typeof window !== 'undefined' && window.innerWidth < 640)) && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-1.5 sm:p-2 rounded-full shadow-md transition-colors ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-gray-700'
              }`}
              aria-label="Proyecto anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              className={`absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 p-1.5 sm:p-2 rounded-full shadow-md transition-colors ${
                currentIndex >= Projects.length - visibleItems ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-gray-700'
              }`}
              aria-label="Proyecto siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
      </div>
    </div>
  );
};

export default Carousel;