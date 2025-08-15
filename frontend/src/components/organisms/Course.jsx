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
    initial="hidden"
    whileInView="visible"
    transition={{ delay: 0.2 }}
    variants={fadeInUp}
    className="w-[100%] mx-auto my-0 xs:px-5 ls:px-2 ms:px-2 ss:px-2 s:px-2 sm:px-2 md:px-2 lg:px-2 xl:px-2 xs:pt-5 ls:pt-5 ls:pb-0 ms:pt-5 ms:pb-0 ss:pt-5 ss:pb-0 s:pt-5 s:pb-0 sm:pt-5 sm:pb-0 md:pt-5 md:pb-5 lg:pt-5 lg:pb-5 xl:pt-5 xl:pb-5 text-gray-900 dark:text-gray-100 rounded grid"
    >
      {/* Fondo decorativo (siempre detrás) */}
      <div aria-hidden className="pointer-events-none w-full  overflow-hidden absolute inset-0 z-0 h-[125%] ">
        {/* Blob superior-izq */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute -top-32 -left-2 w-[100%] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(56,189,248,0.08), transparent)",
          }}
        />
        {/* Blob inferior-der */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="absolute -bottom-24 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.28), rgba(59,130,246,0.10), transparent)",
          }}
        />
        {/* Patrón sutil */}
        <div className="absolute inset-0 opacity-30 dark:opacity-50 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:28px_28px]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/5" />
      </div>
      {/* Encabezado */}
      <div className="flex items-center justify-between gap-2 mb-6 relative">
        <div className="grid grid-cols-[auto_1fr_auto]  place-items-center gap-2 xs:py-4 ls:py-4 ms:py-4 ss:py-4 s:py-4 sm:py-4 md:py-4 lg:py-4 xl:py-4 xs:px-2 ls:px-2 ms:px-2 ss:px-2 s:px-2 sm:px-2 md:px-4 lg:px-4 xl:px-4 bg-white dark:bg-slate-900 rounded-lg w-[100%] border border-gray-400/50 dark:border-gray-700/50">
            <button
              onClick={() =>  window.location.href = '/'}
              className="inline-flex items-center justify-center xs:h-8 xs:w-8 ls:h-8 ls:w-8 ms:h-8 ms:w-8 ss:h-8 ss:w-8 s:h-8 s:w-8 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-12 lg:w-12 xl:h-12 xl:w-12 rounded-md border border-gray-400 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 "
              aria-label='Ir al Inicio'
              title='Ir al Inicio'
            >
                <HomeIcon className={`xs:w-4 xs:h-4 ls:w-4 ls:h-4 ms:w-4 ms:h-4 ss:w-4 ss:h-4 s:w-4 s:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transform rotate-0`} />
            </button>
            <h3 className="xs:text-[.70rem] ls:text-[.77rem] ms:text-[.77rem] ss:text-[.77rem] s:text-[.77rem] sm:text-[.77rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] font-bold text-gray-900 dark:text-white text-right">{activeVideo.title}</h3>
            <div className="flex items-center">
            {!isMobile && (
                <button
                    onClick={() => setShowList((v) => !v)}
                    className="inline-flex items-center justify-center h-11 w-11 rounded-md border border-gray-400 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 "
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
      </div>

        {/* Contenedor principal: Grid en desktop, Flex en móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 mx-auto max-w-7xl relative">
                
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
            {/* Descripción del video activo debajo del reproductor */}
            {activeVideo && (
                <div className="mt-8 mb-5 px-2 py-4 bg-white dark:bg-slate-900 rounded-md border border-gray-400/50 dark:border-gray-700/50">
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
            <div className="lg:col-span-5 border border-gray-400/50 dark:border-gray-700/50 xs:rounded-tl-md xs:rounded-tr-md ls:rounded-tl-md ls:rounded-tr-md ms:rounded-tl-md ms:rounded-tr-md ss:rounded-tl-md ss:rounded-tr-md s:rounded-tl-md s:rounded-tr-md sm:rounded-tl-md sm:rounded-tr-md md:rounded-tl-md md:rounded-tr-md pt-8 lg:rounded-md xl:rounded-md  bg-white dark:bg-slate-900 grid flex flex-col items-start justify-center h-[calc(100vh-10rem)]">
              
              <h3 className="xs:text-[1rem] ls:text-[1rem] ms:text-[1rem] ss:text-[1rem] s:text-[1rem] sm:text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[1.5rem] font-semibold mb-0 px-2 lg:px-0 text-center pb-2">Clases del curso</h3>
                {/* Lista vertical en mobile y desktop, con paginación condicional */}
                <div className="flex flex-col pb-4 lg:pb-0">
                    {(totalPages > 1 ? CLASSES.slice(page * pageSize, page * pageSize + pageSize) : CLASSES).map((video) => (
                        <button
                            key={video.id}
                            onClick={() => handleClassSelection(video)}
                            className={`group flex-none lg:flex w-[100%] h-full items-center px-4 py-2 transition-all duration-300 border text-left
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
