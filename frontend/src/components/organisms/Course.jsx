"use client";

import React, { createContext, useContext, useMemo, useReducer, useState } from "react";
import { Button } from "../molecules/Buttons"; // Usa tu botón del proyecto
import Group from "../atoms/icons/Group";
import { ArrowRight, HomeIcon, PlayCircle, Lock, Maximize2, Book, Pause } from 'lucide-react';
import { ToggleOpen, ToggleClose } from "../atoms/icons/Course";
import { Courses } from "../../lib/coursesData";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Datos de las clases
const CLASSES = [
  ...Courses
];

// Icono de bloqueo reutilizable
const LockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
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

export const Course = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  // Estado para el video activo y el modal de "bloqueado"
  const [activeVideo, setActiveVideo] = useState(CLASSES.find(c => c.available));
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Mostrar/ocultar lista de cursos
  const [showList, setShowList] = useState(true);
  // Paginación condicional
  const pageSize = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(CLASSES.length / pageSize);
  // Ref para contenedor del reproductor (para fullscreen)
  const playerRef = useRef(null);
  const preventNextResetRef = useRef(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 1280
  );

  // Al cambiar de clase, volvemos al estado de preview, excepto cuando se forzó autoplay desde la URL
  useEffect(() => {
    if (preventNextResetRef.current) {
      // Consumimos la excepción para este cambio
      preventNextResetRef.current = false;
      return;
    }
    setIsPlaying(false);
  }, [activeVideo]);

  // Lee el parámetro ?id= para preseleccionar el video y reproducir automáticamente
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      const selected = CLASSES.find(v => String(v.id) === String(idParam));
      if (selected && selected.available) {
        // Evita que el efecto de reset a preview cancele este autoplay inicial
        preventNextResetRef.current = true;
        setActiveVideo(selected);
        setIsPlaying(true);
      }
      return;
    }
  }, []);

  // Mantiene el layout sincronizado al redimensionar sin recargar la página.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1279px)');
    const actualizarViewport = (event) => {
      const siguienteEsMobile = event.matches;
      setIsMobile(siguienteEsMobile);
      setShowList(siguienteEsMobile ? false : true);
    };

    setIsMobile(mediaQuery.matches);
    setShowList(mediaQuery.matches ? false : true);
    mediaQuery.addEventListener('change', actualizarViewport);

    return () => mediaQuery.removeEventListener('change', actualizarViewport);
  }, []);

  // Toggle fullscreen del contenedor del reproductor
  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    const doc = document;
    const isFull = doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
    if (isFull) {
      if (doc.exitFullscreen) doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
      else if (doc.msExitFullscreen) doc.msExitFullscreen();
    } else {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
  };

  const handleClassSelection = (video) => {
    if (!video.available) {
      setShowLockedModal(true);
      return;
    }
    // Pulsar la clase que ya suena alterna pausa; cualquier otra la abre y
    // empieza a reproducirla. Antes esto vivia en un <button> anidado dentro
    // del <button> de la fila, que es HTML invalido y rompia la hidratacion.
    if (activeVideo?.id === video.id) {
      setIsPlaying((p) => !p);
    } else {
      setActiveVideo(video);
      setIsPlaying(true);
    }
  };

  // Convierte enlaces de YouTube (watch o youtu.be) a formato embed
  const getYouTubeEmbedUrl = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtube.com')) {
        const id = u.searchParams.get('v');
        if (id) return `https://www.youtube.com/embed/${id}`;
        if (u.pathname.includes('/embed/')) return url;
      }
      if (u.hostname === 'youtu.be') {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const passNextVideo = () => {
    const currentIndex = CLASSES.findIndex(v => v.id === activeVideo.id);
    if (currentIndex < CLASSES.length - 1) {
      const nextVideo = CLASSES[currentIndex + 1];
      if (nextVideo.available) {
        setActiveVideo(nextVideo);
      } else {
        setShowLockedModal(true);
      }
    }
  };

  return (
    <motion.section 
    initial="hidden"
    whileInView="visible"
    transition={{ delay: 0.2 }}
    variants={fadeInUp}
     className="mx-auto my-0 grid w-full max-w-6xl flex-grow px-4 py-8 text-gray-900 dark:text-gray-100 sm:px-6 sm:py-12 xl:px-0"
     >
      {/* Encabezado */}
      <div className="mb-8 border-b border-slate-200 pb-4 dark:border-slate-800">
         <div className="grid w-full grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 sm:flex sm:justify-between sm:gap-4">
        <div className="flex shrink-0 items-center">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-500 transition-colors hover:text-slate-950 dark:hover:text-white"
                    aria-label="Volver"
                    title="Volver"
                >
                    <HomeIcon className={`xs:w-4 xs:h-4 ls:w-4 ls:h-4 ms:w-4 ms:h-4 ss:w-4 ss:h-4 s:w-4 s:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transform `} />
                </button>
            </div>
            <div className="min-w-0 text-center sm:flex-1 sm:text-left">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-400">Pensar en código</p>
              <h2 className="mt-1 truncate text-sm font-semibold tracking-tight text-slate-950 dark:text-white sm:text-base">Clase {activeVideo.id}: {activeVideo.title}</h2>
            </div>
            {/* Boton de pasar a la siguiente clase */}
            <div className="flex shrink-0 items-center">
                <button
                    onClick={() => passNextVideo()}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-slate-950 dark:hover:text-white"
                    aria-label="Siguiente clase"
                    title="Siguiente clase"
                >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ToggleClose className="h-5 w-5 rotate-90" />
                </button>
            </div>
          </div>
      </div>

        {/* Contenedor principal: Grid en desktop, Flex en móvil */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 xl:grid-cols-12 xl:gap-10">
                
            {/* Columna del Reproductor de Video */}
            <div className={`mb-2 xl:mb-0 ${showList ? 'xl:col-span-7' : 'xl:col-span-12'}`}>
            <div className="-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] xl:mx-0 xl:w-auto">
            <div ref={playerRef} className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                {/* Botón de pantalla completa */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Pantalla completa"
                  className="absolute top-2 right-2 z-10 rounded-md bg-black/40 hover:bg-black/55 text-white p-2 backdrop-blur border border-white/20"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                {activeVideo ? (
                isPlaying ? (
                    <iframe
                    key={`yt-${activeVideo.id}`}
                    className="w-full h-full"
                    src={`${getYouTubeEmbedUrl(activeVideo.videoUrl)}?autoplay=1&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1&enablejsapi=1`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    />
                ) : (
                    <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="group absolute inset-0 w-full h-full"
                    aria-label="Reproducir video"
                    >
                    <img
                        src={activeVideo.posterUrl}
                        alt={`Previsualización de ${activeVideo.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-slate-950 transition-colors group-hover:bg-cyan-400">
                        <PlayCircle className="w-6 h-6" />
                        Reproducir
                        </span>
                    </div>
                    </button>
                )
                ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                    <p className="text-gray-400">Selecciona una clase para comenzar.</p>
                </div>
                )}
             </div>
             </div>
             {/* Descripción del video activo debajo del reproductor */}
            {activeVideo && (
                <div className="mb-5 mt-8 border-y border-slate-200 py-7 dark:border-slate-800">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-400">
                      Contenido de la clase
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white md:text-2xl">
                      {activeVideo.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                      {activeVideo.description}
                    </p>
                    {activeVideo?.categories?.length > 0 && (
                      <div className="mt-6">
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                              {activeVideo.categories.map((cat, idx) => (
                                <span
                                  key={`${cat}-${idx}`}
                                  className="inline-flex items-center gap-2 font-mono text-[0.7rem] text-slate-500 dark:text-slate-400"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                                  {cat}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                )}
            </div>
            {isMobile && (
            <button
                onClick={() => setShowList((v) => !v)}
                className="inline-flex items-center justify-center gap-2 h-10 w-auto rounded-md mb-4"
                aria-label={showList ? 'Ocultar lista' : 'Mostrar lista'}
                title={showList ? 'Ocultar lista' : 'Mostrar lista'}
            >
                {showList ? <ToggleClose className="w-5 h-5" />  : <ToggleOpen className="w-5 h-5" /> }
                {showList ? 'Ocultar' : 'Ver todos los cursos'}
            </button>
            )}
            {/* Columna de la Lista de Clases / Carrusel en móvil */}
            {showList && (
            <div className="flex flex-col items-start justify-start xl:col-span-5 xl:border-l xl:border-slate-200 xl:pl-8 xl:dark:border-slate-800">
              
              <h3 className="xs:text-[1rem] ls:text-[1rem] ms:text-[1rem] ss:text-[1rem] s:text-[1rem] sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[1.5rem] font-semibold mb-0 px-2 text-center pb-2 xl:px-0">Clases del curso</h3>
                {/* Lista vertical en mobile y desktop, con paginación condicional */}
                <div className="flex flex-col pb-4 lg:pb-0">
                    {(totalPages > 1 ? CLASSES.slice(page * pageSize, page * pageSize + pageSize) : CLASSES).map((video) => (
                        <button
                            key={video.id}
                            onClick={() => handleClassSelection(video)}
                            className={`group flex w-[100%] flex-none items-center border-b border-slate-200 px-2 py-4 text-left transition-colors dark:border-slate-800
                                ${activeVideo?.id === video.id 
                                    ? 'text-cyan-700 dark:text-cyan-400'
                                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}
                            `}
                            aria-disabled={!video.available}
                            aria-label={
                              !video.available
                                ? `${video.title} (bloqueada)`
                                : activeVideo?.id === video.id
                                  ? `${isPlaying ? 'Pausar' : 'Reproducir'}: ${video.title}`
                                  : `Reproducir: ${video.title}`
                            }
                        >
                            <div className="flex-shrink-0 mr-4 xs:mb-2 ls:mb-2 ms:mb-2 ss:mb-2 s:mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0 text-blue-500 dark:text-blue-400">
                                {video.available ? (
                                  <span
                                    aria-hidden="true"
                                     className="inline-flex p-1"
                                  >
                                    {activeVideo?.id === video.id && isPlaying ? (
                                      <Pause size={28} />
                                    ) : (
                                      <PlayCircle size={28} />
                                    )}
                                  </span>
                                ) : (
                                  <Lock size={28} />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold xs:text-[.77rem] ls:text-[.77rem] ms:text-[.77rem] ss:text-[.77rem] s:text-[.77rem] sm:text-[.77rem] md:text-[.95rem] lg:text-[.95rem] xl:text-[.95rem] text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {video.title}
                                </h4>
                                <p className={`text-xs mt-1 ${video.available ? 'text-green-500 dark:text-green-400' : 'text-amber-600 dark:text-amber-500'}`}>
                                    {video.available ? 'Disponible' : 'Próximamente'}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Controles de paginación (solo si es necesario) */}
                {totalPages > 1 && (
                <div className="flex items-center justify-center mt-2 px-2 lg:px-0 gap-2">
                    <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    className="px-3 py-1.5 text-sm rounded-md border border-gray-400 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40"
                    disabled={page === 0}
                    >
                    Anterior
                    </button>
                    <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`h-2.5 w-2.5 rounded-full ${i === page ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-800'}`}
                        aria-label={`Ir a la página ${i + 1}`}
                        />
                    ))}
                    </div>
                    <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    className="px-3 py-1.5 text-sm rounded-md border border-gray-400 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40"
                    disabled={page >= totalPages - 1}
                    >
                    Siguiente
                    </button>
                </div>
            )}
            
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
                    className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-6 text-white shadow-2xl "
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
                    <button onClick={() => window.location.href = "/comunidad"} className="w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2">
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
            </div>
            )}
        </div>
    </motion.section>
    );
}
