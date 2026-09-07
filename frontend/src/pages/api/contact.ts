import type { APIRoute } from 'astro';
import { Resend } from 'resend';

/** Esta ruta se ejecuta bajo demanda; el resto del sitio sigue siendo estático. */
export const prerender = false;

const MAX = { name: 100, email: 254, subject: 150, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Ventana y cupo del límite por IP. */
const VENTANA_MS = 10 * 60 * 1000;
const MAX_ENVIOS = 3;

/**
 * Límite de peticiones en memoria. Sobrevive mientras la instancia serverless
 * esté caliente, así que frena ráfagas pero no un ataque distribuido. Si el
 * spam se vuelve un problema, hay que moverlo a un almacén compartido
 * (Vercel KV o Upstash Redis).
 */
const envios = new Map<string, number[]>();

function superaLimite(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (envios.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);

  if (recientes.length >= MAX_ENVIOS) {
    envios.set(ip, recientes);
    return true;
  }

  recientes.push(ahora);
  envios.set(ip, recientes);

  // Poda perezosa para que el Map no crezca sin límite.
  if (envios.size > 1000) {
    for (const [k, v] of envios) {
      if (v.every((t) => ahora - t >= VENTANA_MS)) envios.delete(k);
    }
  }

  return false;
}

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Evita la inyección de cabeceras a través del asunto del correo. */
const unaLinea = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

const escaparHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const destino = import.meta.env.CONTACT_TO_EMAIL;
  const remitente = import.meta.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !destino || !remitente) {
    console.error('Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL');
    return json({ status: 'error', message: 'El formulario no está configurado.' }, 500);
  }

  if (superaLimite(clientAddress)) {
    return json(
      { status: 'error', message: 'Has enviado demasiados mensajes. Inténtalo de nuevo en unos minutos.' },
      429
    );
  }

  let datos: URLSearchParams;
  try {
    datos = new URLSearchParams(await request.text());
  } catch {
    return json({ status: 'error', message: 'Petición mal formada.' }, 400);
  }

  // Honeypot: campo oculto que una persona nunca rellena. Respondemos 200 para
  // que el bot no aprenda que fue detectado, pero no enviamos nada.
  if (datos.get('website')) {
    return json({ status: 'success' }, 200);
  }

  const name = (datos.get('name') ?? '').trim();
  const email = (datos.get('email') ?? '').trim();
  const subject = (datos.get('subject') ?? '').trim();
  const message = (datos.get('message') ?? '').trim();

  const errores: string[] = [];
  if (!name) errores.push('El nombre es obligatorio.');
  if (!EMAIL_RE.test(email)) errores.push('El correo no es válido.');
  if (!subject) errores.push('El asunto es obligatorio.');
  if (!message) errores.push('El mensaje es obligatorio.');

  for (const [campo, limite] of Object.entries(MAX)) {
    const valor = { name, email, subject, message }[campo as keyof typeof MAX];
    if (valor.length > limite) errores.push(`El campo "${campo}" supera los ${limite} caracteres.`);
  }

  if (errores.length > 0) {
    return json({ status: 'error', message: errores.join(' ') }, 400);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: remitente,
      to: destino,
      replyTo: email,
      subject: `[yamid.dev] ${unaLinea(subject)}`,
      html: `
        <h2>Nuevo mensaje desde yamid.dev</h2>
        <p><strong>Nombre:</strong> ${escaparHtml(name)}</p>
        <p><strong>Correo:</strong> ${escaparHtml(email)}</p>
        <p><strong>Asunto:</strong> ${escaparHtml(subject)}</p>
        <hr />
        <p>${escaparHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend rechazó el envío:', error);
      return json({ status: 'error', message: 'No se pudo enviar el mensaje.' }, 502);
    }

    return json({ status: 'success' }, 200);
  } catch (e) {
    console.error('Fallo al enviar el correo de contacto:', e);
    return json({ status: 'error', message: 'No se pudo enviar el mensaje.' }, 500);
  }
};

/** Cualquier método distinto de POST no tiene sentido aquí. */
export const ALL: APIRoute = () =>
  json({ status: 'error', message: 'Método no permitido.' }, 405);
