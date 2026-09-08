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

/** Icono en linea: es el unico de esta vista que no esta en atoms/icons. */
const WhatsAppIcono = () => (
  <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.14 1.595 5.945L0 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.585 0 11.946-5.359 11.949-11.945a11.9 11.9 0 0 0-3.421-8.4" />
  </svg>
);

const WHATSAPP =
  'https://wa.me/573124673850?text=Hola%20Yamid,%20estoy%20interesado%20en%20tu%20trabajo';

/**
 * `variante` decide a quien le habla el bloque, no como se ve: el marcado y
 * las clases son los mismos en las dos vertientes a proposito. A un reclutador
 * le sirve el CV; a un duenno de negocio le sirve WhatsApp, y el CV le sobra.
 */
const ContactForm = ({ variante = 'empresas' }) => {
  const esClientes = variante === 'clientes';
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
          {esClientes
            ? 'Cuéntame qué necesita tu negocio, sin tecnicismos. Respondo en menos de 24 horas.'
            : 'Para oportunidades laborales o consultas técnicas. Respondo en menos de 24 horas.'}
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
            <label htmlFor="subject" className={ETIQUETA}>
              {esClientes ? 'Tu negocio o proyecto' : 'Asunto'}
            </label>
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
            <label htmlFor="message" className={ETIQUETA}>
              {esClientes ? '¿Qué necesitas resolver?' : 'Mensaje'}
            </label>
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
              {esClientes && (
                <li>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2.5 rounded-md px-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 motion-reduce:transition-none dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-cyan-400"
                  >
                    <WhatsAppIcono />
                    WhatsApp
                  </a>
                </li>
              )}
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

          {!esClientes && (
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Currículum</h3>
            <a
              href="/docs/Yamid_Rodriguez-HV.pdf"
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
          )}
        </aside>
      </div>
    </section>
  );
};

export default ContactForm;
