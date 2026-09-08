/* src/organisms/ThinkInCode.tsx */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

  return (
    <section id="course" className="w-[95%] md:w-[90%] mx-auto py-14 sm:py-16">
      <TitleSection
        title="Curso"
        lede="Pensar en código: un curso práctico para aprender a pensar como programador."
      />

      {/* Carrusel de clases */}
      <div className="relative mt-8">
        {/* Botón izquierdo */}
        {CLASSES.length > visibleItems && (
          <button
            onClick={() => scrollByItems(-1)}
            disabled={currentIndex === 0}
            aria-label="Clase anterior"
            className={`absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-md bg-white text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 motion-reduce:transition-none sm:grid dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800 ${currentIndex === 0 ? 'cursor-not-allowed opacity-40' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div
              key={cls.id}
              ref={idx === 0 ? firstItemRef : undefined}
              className="group relative w-[92%] xs:w-[90%] sm:w-[85%] flex-none snap-start overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-md motion-reduce:transition-none dark:bg-slate-900 dark:ring-slate-800"
              style={visibleItems > 1 ? { flex: `0 0 calc((100% - ${(visibleItems - 1) * GAP_PX}px) / ${visibleItems})` } : undefined}
            >
              {/* Container de la imagen */}
              <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800">
                {/* Imagen o placeholder */}
                {cls.available && cls.posterUrl && !imageErrors[cls.id] ? (
                  <img
                    src={cls.posterUrl}
                    alt={cls.title}
                    width={1360}
                    height={720}
                    decoding="async"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(cls.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-slate-400 dark:text-slate-500">
                      <PlayCircle className="mx-auto mb-2 h-10 w-10" aria-hidden="true" />
                      <p className="text-sm font-medium">{cls.available ? 'Vista previa' : 'Próximamente'}</p>
                    </div>
                  </div>
                )}

                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                  {cls.available ? (
                    <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 font-mono text-[0.7rem] text-emerald-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-emerald-400 dark:ring-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
                      Disponible
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 rounded bg-white px-2 py-1 font-mono text-[0.7rem] text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
                      <LockIcon />
                      Próximamente
                    </div>
                  )}
                </div>

                {/* Botón de acción en hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleClassSelection(cls)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-slate-900/80 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 motion-reduce:transition-none"
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
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 dark:text-white">{cls.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Botón derecho */}
        {CLASSES.length > visibleItems && (
          <button
            onClick={() => scrollByItems(1)}
            disabled={currentIndex >= CLASSES.length - visibleItems}
            aria-label="Clase siguiente"
            className={`absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-md bg-white text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 motion-reduce:transition-none sm:grid dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800 ${currentIndex >= CLASSES.length - visibleItems ? 'cursor-not-allowed opacity-40' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* CTA: Ir al curso */}
      <div className="mt-8">
        <a
          href="/curso"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-slate-900 px-5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
        >
          Ir al curso completo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      {/* Modal: Contenido bloqueado */}
      {showLockedModal && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
        onClick={() => setShowLockedModal(false)}
        >
        <motion.div
            initial={{ scale: 0.9, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-lg bg-slate-900 p-6 text-white shadow-2xl ring-1 ring-slate-700"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="mb-4 inline-flex items-center gap-2 rounded bg-slate-800 px-2.5 py-1 font-mono text-xs text-slate-300 ring-1 ring-slate-700">
            <LockIcon />
            Contenido bloqueado
            </div>
            <h3 className="mb-2 text-xl font-semibold">Disponible próximamente</h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-300">
            Únete a mi comunidad para saber cuándo se liberan las nuevas clases y recibir material exclusivo.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
            <button onClick={() => 
              window.location.href = "/comunidad"
              } className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none sm:w-auto">
                <Group className="w-2 h-2 mr-2" />
                Unirme a la comunidad
            </button>
            <button
                onClick={() => setShowLockedModal(false)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md px-4 text-sm font-medium text-slate-200 ring-1 ring-slate-700 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none sm:w-auto"
            >
                Cerrar
            </button>
            </div>
        </motion.div>
        </motion.div>
    )}
    </section>
  );
};

export default ThinkInCode;