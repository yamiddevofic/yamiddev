/* src/organisms/ThinkInCode.tsx */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../molecules/Buttons"; // Usa tu botón del proyecto
import Group from "../atoms/icons/Group";
import { ArrowRight, PlayCircle, Lock } from 'lucide-react';
import { Courses } from "../../lib/coursesData";
import { TitleSection } from "../atoms/TitleSection";

// Datos de las clases
const CLASSES = [
  ...Courses
];

// Icono de bloqueo reutilizable
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      d="M7 10V8a5 5 0 1 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ThinkInCode = () => {
  // Estado para el video activo y el modal de "bloqueado"
  const [activeVideo, setActiveVideo] = useState(CLASSES.find(c => c.available));
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  
  // Paginación condicional
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(CLASSES.length / pageSize);

  // SOLUCIÓN 1: Usar tipo genérico para evitar referencia directa a HTMLVideoElement
  const videoRef = useRef(null);

  // Efecto para pausar el video anterior al cambiar
  useEffect(() => {
    if (videoRef.current && typeof videoRef.current.pause === 'function') {
        videoRef.current.pause();
        videoRef.current.load();
    }
    // Al cambiar de clase, volvemos al estado de preview
    setIsPlaying(false);
  }, [activeVideo]);

  const handleClassSelection = (video) => {
    if (video.available) {
      // Navega al curso con el id seleccionado como query param
      if (typeof window !== 'undefined') {
        window.location.href = `/curso?id=${video.id}&autoplay=1`;
      }
    } else {
      setShowLockedModal(true);
    }
  };

  const handleImageError = (classId) => {
    setImageErrors(prev => ({ ...prev, [classId]: true }));
  };

  // Carrusel (basado en Carousel.jsx)
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const GAP_PX = 16; // gap-4

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        let items = 3; // desktop
        if (window.innerWidth < 768) {
          items = 1; // móvil
        } else if (window.innerWidth < 1280) {
          items = 2; // tablet
        }
        items = Math.min(items, CLASSES.length);
        setVisibleItems(items);
        const maxIndex = Math.max(CLASSES.length - items, 0);
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
    track.scrollBy({ left: direction * scrollDistance, behavior: 'smooth' });
    if (direction > 0) {
      setCurrentIndex(prev => Math.min(prev + 1, CLASSES.length - visibleItems));
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
    track.scrollTo({ left: scrollDistance, behavior: 'smooth' });
    setCurrentIndex(index);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="course"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-950 border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-lg relative isolate xs:w-[95%] ls:w-[95%] ms:w-[95%] ss:w-[95%] s:w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] xl:w-[90%] mx-auto overflow-hidden rounded-lg xs:my-[10%] ls:my-[15%] ms:my-[15%] ss:my-[15%] s:my-[15%] sm:my-[15%] md:my-[5%] lg:my-[5%] xl:my-[5%] xs:px-3 ls:px-3 ms:px-3 ss:px-3 s:px-3 sm:px-3 md:px-14 lg:px-14 xl:px-14 xs:py-12 ls:py-12 ms:py-12 ss:py-12 s:py-12 sm:py-12 md:py-12 lg:py-12 xl:py-12 text-gray-900 dark:text-gray-100"
    >
      {/* Encabezado */}
      <div className="mx-auto max-w-6xl text-center mb-10 md:mb-12">
        <TitleSection title="Curso"/>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-[90%] mx-auto font-bold">
        Pensar en código es un curso práctico y claro para aprender a pensar como programador.</p>
      </div>

      {/* Carrusel de cursos */}
      <div className="relative mx-auto max-w-6xl xs:pl-2 ls:pl-2 ms:pl-2 ss:pl-2 s:pl-2 sm:pl-2 md:pl-0 lg:pl-0 xl:pl-0">
        {/* Botón izquierdo */}
        {CLASSES.length > visibleItems && (
          <button
            onClick={() => scrollByItems(-1)}
            disabled={currentIndex === 0}
            aria-label="Clase anterior"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center h-12 w-12 rounded-full border border-white/20 bg-white/80 backdrop-blur hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all shadow-lg ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Pista de slides */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain touch-pan-x scroll-smooth no-scrollbar gap-4 px-1 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CLASSES.map((cls, idx) => (
            <motion.div
              key={cls.id}
              ref={idx === 0 ? firstItemRef : undefined}
              className="group relative flex-none w-[92%] xs:w-[90%] sm:w-[85%] snap-start bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={visibleItems > 1 ? { flex: `0 0 calc((100% - ${(visibleItems - 1) * GAP_PX}px) / ${visibleItems})` } : undefined}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Container de la imagen */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                {/* Imagen o placeholder */}
                {cls.available && cls.posterUrl && !imageErrors[cls.id] ? (
                  <img
                    src={cls.posterUrl}
                    alt={cls.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(cls.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400 dark:text-gray-600">
                      <PlayCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">{cls.available ? 'Vista previa' : 'Próximamente'}</p>
                    </div>
                  </div>
                )}

                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  {cls.available ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      Disponible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-500/90 text-white text-xs font-medium">
                      <LockIcon />
                      Próximamente
                    </div>
                  )}
                </div>

                {/* Botón de acción en hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleClassSelection(cls)}
                    className="flex items-center gap-2 px-4 py-5 bg-black/20 backdrop-blur-sm border border-black/30 rounded-lg text-white font-medium hover:bg-black/20 transition-colors"
                  >
                    {cls.available ? (
                      <>
                        <PlayCircle className="w-4 h-4 " />
                        Ver clase
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Bloqueado
                      </>
                    )}
                  </button>
                </div>
              </div>
              {/* Título pequeño debajo del elemento */}
              <div className="px-3 py-3">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">{cls.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botón derecho */}
        {CLASSES.length > visibleItems && (
          <button
            onClick={() => scrollByItems(1)}
            disabled={currentIndex >= CLASSES.length - visibleItems}
            aria-label="Clase siguiente"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:grid place-items-center h-12 w-12 rounded-full border border-white/20 bg-white/80 backdrop-blur hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all shadow-lg ${currentIndex >= CLASSES.length - visibleItems ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* CTA: Ir al curso */}
      <div className="text-center mt-10">
        <a
          href="/curso"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Ir al curso completo
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
      {/* Modal: Contenido bloqueado */}
      {showLockedModal && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setShowLockedModal(false)}
        >
        <motion.div
            initial={{ scale: 0.9, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 text-white shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm border border-white/20">
            <LockIcon />
            Contenido bloqueado
            </div>
            <h3 className="text-xl font-semibold mb-2">Disponible próximamente</h3>
            <p className="text-sm text-gray-200 leading-relaxed mb-6">
            Únete a mi comunidad para saber cuándo se liberan las nuevas clases y recibir material exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
            <button onClick={() => 
              window.location.href = "/comunidad"
              } className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2">
                <Group className="w-2 h-2 mr-2" />
                Unirme a la comunidad
            </button>
            <button
                onClick={() => setShowLockedModal(false)}
                className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200"
            >
                Cerrar
            </button>
            </div>
        </motion.div>
        </motion.div>
    )}
      {/* Estilos para ocultar scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
};

export default ThinkInCode;