import React from 'react';

/**
 * Titular de seccion.
 *
 * Antes era un <h2> centrado con degradado de azul a esmeralda y tamano fijo
 * de 3rem. Chocaba de frente con la vertiente tecnica, que usa titulares
 * alineados a la izquierda, en solido y con clamp; y el texto en degradado
 * baja el contraste justo donde mas hace falta.
 *
 * Ahora reproduce el mismo titular que escriben a mano las secciones .astro de
 * la home, para que las dos vertientes se lean como un solo sitio. `lede`
 * dibuja la linea de apoyo que ya llevaban esas secciones.
 *
 * Sin framer-motion: no habia animacion declarada, solo el coste de importarla.
 */
export const TitleSection = ({ title, lede, id }) => (
  <div className="max-w-3xl">
    <h2
      id={id}
      className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-white"
    >
      {title}
    </h2>
    {lede && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{lede}</p>}
  </div>
);
