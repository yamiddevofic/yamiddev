"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../molecules/Buttons"; // Usa tu botón del proyecto
import Group from "../atoms/icons/Group";
import { ArrowRight, PlayCircle, Lock, Maximize2, Book, Pause } from 'lucide-react';
import { ToggleOpen, ToggleClose } from "../atoms/icons/Course";
import { Courses } from "../../lib/coursesData";

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
  const isMobile = window.innerWidth < 1024;

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

  // En móviles, ocultar lista por defecto (< lg)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isMobile) {
      setShowList(false);
    }
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
    if (video.available) {
      setActiveVideo(video);
    } else {
      setShowLockedModal(true);
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
  return (
    <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="w-[95%] mx-auto bg-white dark:bg-gray-900 border border-gray-400/50 dark:border-gray-700/50 shadow-lg my-0 sm:my-20 px-3 sm:px-8 md:px-12 xs:pt-24 xs:pb-16 ls:pt-24 ls:pb-16 ms:pt-24 ms:pb-16 ss:pt-26 ss:pb-16 s:pt-26 s:pb-16 sm:pt-26 sm:pb-16 md:pt-10 md:pb-10 lg:pt-10 lg:pb-10 xl:pt-10 xl:pb-10 text-gray-900 dark:text-gray-100 rounded-lg"
    >
        <div className="flex items-center justify-between gap-2 mb-6 ">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2 xs:py-2 ls:py-2 ms:py-2 ss:py-2 s:py-2 sm:py-2 md:py-4 lg:py-4 xl:py-4 xs:px-2 ls:px-2 ms:px-2 ss:px-2 s:px-2 sm:px-2 md:px-4 lg:px-4 xl:px-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-[100%]">
            <Book className="w-6 h-6 mr-2" />
            <h3 className="xs:text-[.70rem] ls:text-[.72rem] ms:text-[.72rem] ss:text-[.72rem] s:text-[.72rem] sm:text-[.72rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] font-bold text-gray-900 dark:text-white">{activeVideo.title}</h3>
            </div>
            <div>   
            {!isMobile && (
                    <button
                        onClick={() => setShowList((v) => !v)}
                        className="inline-flex items-center justify-center h-11 w-11 rounded-md border border-gray-400 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 "
                        aria-label={showList ? 'Ocultar lista' : 'Mostrar lista'}
                        title={showList ? 'Ocultar lista' : 'Mostrar lista'}
                    >
                        {showList ? (
                        <ToggleClose className={`w-5 h-5 transform rotate-90`} />
                        ) : (
                        <ToggleOpen className={`w-5 h-5 transform rotate-90`} />
                        )}
                    </button>
                )}
            </div>
        </div>

        {/* Contenedor principal: Grid en desktop, Flex en móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 mx-auto max-w-7xl">
                
            {/* Columna del Reproductor de Video */}
            <div className={`mb-2 lg:mb-0 ${showList ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div ref={playerRef} className="aspect-video w-full bg-slate-900 xs:rounded-md ls:rounded-md ms:rounded-md ss:rounded-md s:rounded-md sm:rounded-md md:rounded-lg lg:rounded-md xl:rounded-md overflow-hidden shadow-2xl ring-1 ring-black/10 dark:ring-white/10 relative">
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
                        <span className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-[0_0_24px_rgba(59,130,246,0.55)] group-hover:shadow-[0_0_28px_rgba(59,130,246,0.7)] transition-shadow">
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
                {/* Título y descripción del video activo debajo del reproductor */}
                {activeVideo && (
                    <div className="mt-10 mb-5 px-2">
                        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">{activeVideo.description}</p>
                        {activeVideo?.categories?.length > 0 && (
                          <div className="mt-6">
                            <div className="flex flex-wrap gap-2">
                              {activeVideo.categories.map((cat, idx) => (
                                <span
                                  key={`${cat}-${idx}`}
                                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-slate-800/60 dark:to-slate-800/30 dark:text-blue-300 px-3 py-1 text-xs font-medium shadow-sm"
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
                className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-gray-400 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
                aria-label={showList ? 'Ocultar lista' : 'Mostrar lista'}
                title={showList ? 'Ocultar lista' : 'Mostrar lista'}
            >
                {showList ? <ToggleClose className="w-5 h-5" /> : <ToggleOpen className="w-5 h-5" />}
            </button>
            )}
            {/* Columna de la Lista de Clases / Carrusel en móvil */}
            {showList && (
            <div className="lg:col-span-5 mt-4">
                <h3 className="text-lg font-semibold mb-4 px-2 lg:px-0">Clases del curso</h3>
                {/* Lista vertical en mobile y desktop, con paginación condicional */}
                <div className="flex flex-col gap-3 sm:gap-4 pb-4 lg:pb-0">
                    {(totalPages > 1 ? CLASSES.slice(page * pageSize, page * pageSize + pageSize) : CLASSES).map((video) => (
                        <button
                            key={video.id}
                            onClick={() => handleClassSelection(video)}
                            className={`group flex-none lg:flex w-full items-center p-4 xs:rounded-md ls:rounded-md ms:rounded-md ss:rounded-md s:rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg xl:rounded-lg transition-all duration-300 border text-left
                                ${activeVideo?.id === video.id 
                                    ? 'bg-blue-50 dark:bg-slate-800/80 border-blue-500/50 ring-2 ring-blue-500/30' 
                                    : 'bg-white/50 dark:bg-slate-900/50 border-gray-400 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800'}
                            `}
                            aria-disabled={!video.available}
                        >
                            <div className="flex-shrink-0 mr-4 xs:mb-2 ls:mb-2 ms:mb-2 ss:mb-2 s:mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0 text-blue-500 dark:text-blue-400">
                                {video.available ? (
                                  <button
                                    type="button"
                                    aria-label={activeVideo?.id === video.id ? (isPlaying ? 'Pausar' : 'Reproducir') : 'Reproducir'}
                                    title={activeVideo?.id === video.id ? (isPlaying ? 'Pausar' : 'Reproducir') : 'Reproducir'}
                                    className="p-1 rounded hover:bg-blue-50 dark:hover:bg-slate-800"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (activeVideo?.id === video.id) {
                                        setIsPlaying((p) => !p);
                                      } else {
                                        setActiveVideo(video);
                                        setIsPlaying(true);
                                      }
                                    }}
                                  >
                                    {activeVideo?.id === video.id && isPlaying ? (
                                      <Pause size={28} />
                                    ) : (
                                      <PlayCircle size={28} />
                                    )}
                                  </button>
                                ) : (
                                  <Lock size={28} />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {video.title}
                                </h4>
                                <p className={`text-xs mt-1 ${video.available ? 'text-gray-500 dark:text-gray-400' : 'text-amber-600 dark:text-amber-500'}`}>
                                    {video.available ? 'Disponible' : 'Próximamente'}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Controles de paginación (solo si es necesario) */}
                {totalPages > 1 && (
                <div className="flex items-center justify-between mt-2 px-2 lg:px-0">
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
                        className={`h-2.5 w-2.5 rounded-full ${i === page ? 'bg-blue-500' : 'bg-gray-300 dark:bg-slate-700'}`}
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
