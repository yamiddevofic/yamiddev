import React, { useState } from 'react';
import { Github } from '../atoms/icons/Github';
import { Linkedin } from '../atoms/icons/Linkedin';

/**
 * Sección de contacto de la vertiente técnica.
 *
 * El skill agent-portfolio-empresas pide aquí formulario, correo protegido y CV
 * fechado, y su criterio de estilo es "legibilidad sobre efecto": el bloque de
 * cierre no es sitio para gradientes ni escalados al pasar el ratón.
 *
 * No hay animación de entrada sobre la sección. El patrón initial={opacity:0} +
 * whileInView deja el contenido invisible si el observador no llega a
 * dispararse, y en esta misma página ya ocurría: medido con la sección delante,
 * #contact se quedaba en opacidad 0. Un formulario invisible no recibe envíos.
 */

/** Clases compartidas por los campos, para que no se desincronicen entre sí. */
const CAMPO =
  'w-full min-h-[44px] rounded-md bg-white px-3.5 py-2.5 text-sm text-slate-900 ring-1 ring-slate-300 transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 motion-reduce:transition-none dark:bg-slate-950 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-slate-500 dark:focus-visible:ring-cyan-400';

const ETIQUETA = 'block text-sm font-medium text-slate-700 dark:text-slate-300';

const ENLACES = [
  { nombre: 'GitHub', href: 'https://github.com/yamiddevofic', Icono: Github },
  { nombre: 'LinkedIn', href: 'https://www.linkedin.com/in/yamiddevofic', Icono: Linkedin },
];

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Honeypot: un bot rellena todos los campos; una persona nunca ve este.
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(result.message ?? '');
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage('');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="w-[95%] md:w-[90%] mx-auto py-14 sm:py-16">
      <div className="max-w-3xl">
        <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight text-slate-900 dark:text-white">
          Contacto
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Para oportunidades laborales o consultas técnicas. Respondo en menos de 24 horas.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_18rem] lg:gap-12">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Dos columnas desde sm: nombre y correo caben en una línea sin
              apretar, y el formulario se lee de una pasada. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="name" className={ETIQUETA}>Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={CAMPO}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className={ETIQUETA}>Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={CAMPO}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="subject" className={ETIQUETA}>Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={CAMPO}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className={ETIQUETA}>Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className={`${CAMPO} resize-y`}
            />
          </div>

          {/* Honeypot: fuera de la vista y fuera del recorrido del tabulador. */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="website">No rellenes este campo</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-slate-900 px-6 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none sm:w-auto dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-950"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="-ml-1 mr-2 h-4 w-4 animate-spin motion-reduce:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Enviando…
              </>
            ) : (
              'Enviar mensaje'
            )}
          </button>

          {/* role=status: el resultado llega sin recargar, y quien use lector de
              pantalla necesita enterarse de que se envió o de que falló. */}
          <div role="status" aria-live="polite">
            {submitStatus === 'success' && (
              <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-600/30 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-500/30">
                Mensaje enviado. Respondo en menos de 24 horas.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-600/30 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-500/30">
                {errorMessage || 'No se pudo enviar el mensaje. Inténtalo de nuevo.'}
              </p>
            )}
          </div>
        </form>

        {/* Columna lateral: las otras vías de contacto que pide el skill, sin
            correo en crudo — un mailto: se lo llevan los rastreadores. */}
        <aside className="space-y-6 lg:border-l lg:border-slate-200 lg:pl-8 dark:lg:border-slate-800">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">También aquí</h3>
            <ul className="mt-3 space-y-1">
              {ENLACES.map(({ nombre, href, Icono }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2.5 rounded-md px-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 motion-reduce:transition-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-cyan-400"
                  >
                    <Icono />
                    {nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Currículum</h3>
            <a
              href="/docs/yamid-rodriguez-cv-2026-09.pdf"
              download
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md px-4 text-sm font-medium text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-slate-950"
            >
              Descargar PDF
            </a>
            {/* La fecha va en el nombre del archivo y a la vista: un CV sin
                fecha se lee como viejo. */}
            <p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              Actualizado 09/2026
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactForm;
