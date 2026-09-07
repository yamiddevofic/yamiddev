import React, { useState } from 'react';
import { Code, Server, MessageCircle, Book, Users, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { TitleSection } from '../atoms/TitleSection';

/**
 * Trayectoria unificada: la experiencia laboral y la formacion comparten forma,
 * asi que viven en una sola lista y el panel las recorre con las flechas. El
 * campo `tipo` solo sirve para etiquetar la tarjeta.
 */
const TRAYECTORIA = [
  {
    tipo: 'Experiencia',
    company: 'Ega Kat Logística',
    title: 'Aprendiz en Prácticas',
    period: 'May 2024 - Nov 2024',
    location: 'Remoto',
    highlights: [
      { icon: Code, text: 'Estudio y análisis de servidores, CMS WordPress' },
      { icon: Server, text: 'Soporte técnico de primer nivel' },
      { icon: MessageCircle, text: 'Capacitación y atención a clientes' },
    ],
  },
  {
    tipo: 'Formación',
    company: 'Platzi',
    title: 'Estudiante',
    period: 'Ago 2024 - Actualmente',
    location: 'Remoto',
    highlights: [
      { icon: Code, text: 'Estudiando la Escuela de programación de JavaScript' },
      { icon: Users, text: 'Participación activa en la comunidad de Platzi' },
      { icon: Book, text: 'Reforzando capacidad de autoaprendizaje y formación continua' },
    ],
  },
  {
    tipo: 'Formación',
    company: 'SENA',
    title: 'Tecnólogo en análisis y desarrollo de software',
    period: 'Jul 2022 - Nov 2024',
    location: 'Presencial',
    highlights: [
      { icon: Code, text: 'Tecnologías: Python, HTML, CSS, JavaScript, SQL, Node.js' },
      { icon: Book, text: 'Desarrollo de MVP para tiendas de barrio' },
      { icon: Users, text: 'Desarrollo de habilidades interpersonales y trabajo en equipo' },
    ],
  },
];

const REDES = [
  {
    nombre: 'GitHub',
    href: 'https://github.com/yamiddevofic',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    nombre: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yamiddevofic',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
];

const ModernAboutMe = () => {
  const [indice, setIndice] = useState(0);
  const activo = TRAYECTORIA[indice];
  const mover = (paso) =>
    setIndice((i) => (i + paso + TRAYECTORIA.length) % TRAYECTORIA.length);

  // Sin animacion de entrada sobre la seccion entera, a proposito. El patron
  // initial={opacity:0} + whileInView deja el contenido invisible si el
  // observador no llega a dispararse, y eso ya pasa en esta misma pagina: con
  // la seccion delante, #course se queda en 0.05 de opacidad y #contact en 0.
  // El contenido no puede depender de que una animacion arranque; las
  // microinteracciones viven en los controles.
  return (
    <section
      id="about-me-section"
      className="w-[95%] md:w-[90%] mx-auto py-14 sm:py-12"
    >
      <TitleSection title="Sobre mí" />

      {/* Dos columnas a partir de lg; debajo se apilan foto y panel.
          El overflow-hidden recorta la foto contra las esquinas redondeadas. */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/60 dark:ring-slate-800">
        {/* Columna de la foto: alto fijo en movil, completo junto al panel en escritorio */}
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[600px] bg-slate-200 dark:bg-slate-800">
          <img
            src="./dev.jpg"
            alt="Yamid Horacio Rodríguez"
            width={715}
            height={731}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          {/* Degradado inferior para que el texto de abajo no compita con la foto */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
        </div>

        {/* Panel oscuro */}
        <div className="flex flex-col justify-center gap-6 bg-slate-900 p-[clamp(1.5rem,4vw,3rem)] text-slate-200">
          <div>
            <h3 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-white">
              Yamid Horacio Rodríguez
            </h3>
            <p className="mt-2 text-sm font-medium tracking-wide text-cyan-400">
              — Tecnólogo en Análisis y Desarrollo de Software
            </p>
          </div>

          <p className="max-w-prose text-sm leading-relaxed text-slate-400">
            Tecnólogo en Análisis y Desarrollo de Software por el SENA. Trabajo con JavaScript,
            React, Astro y Python, y sigo formándome en la Escuela de JavaScript de Platzi. Mi
            experiencia reúne soporte técnico, administración de CMS y desarrollo de aplicaciones
            web.
          </p>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-base font-semibold text-white">Experiencia y formación</h4>
              <div className="flex shrink-0 gap-1">
                {[
                  { icono: ChevronLeft, paso: -1, etiqueta: 'Anterior' },
                  { icono: ChevronRight, paso: 1, etiqueta: 'Siguiente' },
                ].map(({ icono: Icono, paso, etiqueta }) => (
                  <button
                    key={etiqueta}
                    type="button"
                    onClick={() => mover(paso)}
                    aria-label={`${etiqueta}: ${etiqueta === 'Anterior' ? 'anterior' : 'siguiente'} entrada de la trayectoria`}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none"
                  >
                    <Icono size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {/* aria-live: al pulsar las flechas cambia el contenido sin recargar,
                y quien use lector de pantalla necesita enterarse. */}
            <div aria-live="polite">
              <article className="rounded-lg bg-slate-800/70 p-5 ring-1 ring-slate-700/60">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h5 className="font-semibold text-cyan-400">
                    {activo.company} · {activo.title}
                  </h5>
                  <span className="text-xs text-slate-500">{activo.period}</span>
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={12} aria-hidden="true" />
                  {activo.location} · {activo.tipo}
                </p>

                <ul className="mt-4 space-y-2">
                  {activo.highlights.map(({ icon: Icono, text }) => (
                    <li key={text} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Icono size={15} className="mt-0.5 shrink-0 text-cyan-500" aria-hidden="true" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            {/* Posición dentro de la lista: sin esto no se ve que hay más entradas */}
            <div className="mt-3 flex justify-center gap-1.5">
              {TRAYECTORIA.map((item, i) => (
                <button
                  key={item.company}
                  type="button"
                  onClick={() => setIndice(i)}
                  aria-label={`Ver ${item.company}`}
                  aria-current={i === indice ? 'true' : undefined}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-200 motion-reduce:transition-none ${
                      i === indice ? 'w-6 bg-cyan-500' : 'w-1.5 bg-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {REDES.map(({ nombre, href, path }) => (
              <a
                key={nombre}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${nombre} de Yamid Horacio Rodríguez`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAboutMe;
