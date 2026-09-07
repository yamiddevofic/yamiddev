import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { TitleSection } from '../atoms/TitleSection';
import { TRAYECTORIA } from '../../lib/trayectoriaData';

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

/** Cada tipo de hito lleva su color, para distinguirlos de un vistazo. */
const COLOR_TIPO = {
  'Formación': 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  'Experiencia': 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  'Proyecto': 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
  'Comunidad': 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
};

const ModernAboutMe = () => {
  const [indice, setIndice] = useState(0);
  const activo = TRAYECTORIA[indice];
  const total = TRAYECTORIA.length;
  const mover = (paso) => setIndice((i) => (i + paso + total) % total);

  // Los años se repiten entre hitos; para el salto rapido solo interesa el
  // primero de cada uno, que hace de entrada a esa etapa.
  const saltos = TRAYECTORIA.reduce((acc, h, i) => {
    if (!acc.some((s) => s.anio === h.anio)) acc.push({ anio: h.anio, i });
    return acc;
  }, []);

  // Sin animacion de entrada sobre la seccion entera, a proposito. El patron
  // initial={opacity:0} + whileInView deja el contenido invisible si el
  // observador no llega a dispararse, y eso ya pasa en esta misma pagina: con
  // la seccion delante, #course se queda en 0.05 de opacidad y #contact en 0.
  // El contenido no puede depender de que una animacion arranque.
  return (
    <section id="about-me-section" className="w-[95%] md:w-[90%] mx-auto py-14 sm:py-12">
      <TitleSection title="Sobre mí" />

      {/* Dos columnas a partir de lg; debajo se apilan foto y panel. */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/60 dark:ring-slate-800">
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[640px] bg-slate-200 dark:bg-slate-800">
          <img
            src="./dev.jpg"
            alt="Yamid Horacio Rodríguez"
            width={715}
            height={731}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
        </div>

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
            Desarrollador, educador y líder comunitario en Chitagá. Lo que empezó como una búsqueda
            de camino profesional se convirtió en una trayectoria alrededor del software, la
            formación y la creación de oportunidades desde el territorio.
          </p>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-base font-semibold text-white">Experiencia y formación</h4>
              <div className="flex shrink-0 items-center gap-1">
                <span className="mr-1 text-xs tabular-nums text-slate-400" aria-hidden="true">
                  {indice + 1}/{total}
                </span>
                {[
                  { Icono: ChevronLeft, paso: -1, etiqueta: 'Etapa anterior' },
                  { Icono: ChevronRight, paso: 1, etiqueta: 'Etapa siguiente' },
                ].map(({ Icono, paso, etiqueta }) => (
                  <button
                    key={etiqueta}
                    type="button"
                    onClick={() => mover(paso)}
                    aria-label={etiqueta}
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none"
                  >
                    <Icono size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {/* aria-live: el contenido cambia sin recargar y hay que anunciarlo. */}
            <div aria-live="polite">
              <article className="min-h-[16rem] rounded-lg bg-slate-800/70 p-5 ring-1 ring-slate-700/60">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[0.7rem] font-medium ring-1 ${COLOR_TIPO[activo.tipo]}`}>
                    {activo.tipo}
                  </span>
                  <span className="text-xs text-slate-400">{activo.periodo}</span>
                </div>

                <h5 className="mt-2 font-semibold text-cyan-400">{activo.titulo}</h5>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={12} aria-hidden="true" />
                  {activo.lugar}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">{activo.descripcion}</p>

                {activo.tecnologias && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {activo.tecnologias.map((t) => (
                      <li
                        key={t}
                        className="rounded bg-slate-900/70 px-2 py-0.5 text-[0.7rem] text-slate-400 ring-1 ring-slate-700/60"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </div>

            {/* Salto por año: con doce hitos, una fila de puntos no dice nada. */}
            <div className="mt-3 flex flex-wrap gap-1">
              {saltos.map(({ anio, i }) => {
                const activoAqui = activo.anio === anio;
                return (
                  <button
                    key={anio}
                    type="button"
                    onClick={() => setIndice(i)}
                    aria-label={`Ir a ${anio}`}
                    aria-current={activoAqui ? 'true' : undefined}
                    className={`inline-flex min-h-[44px] items-center rounded-md px-2.5 text-xs font-medium tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 motion-reduce:transition-none ${
                      activoAqui
                        ? 'bg-cyan-500 text-slate-900'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {anio}
                  </button>
                );
              })}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
