import { createServer, type Server } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { DIST } from './paths';

export const BASE = `http://localhost:${process.env.PREVIEW_PORT ?? 4488}`;

const TIPOS: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
};

let server: Server | undefined;

/**
 * Sirve dist/client tal como lo hace Vercel para las rutas estáticas.
 * El adaptador de Vercel no soporta `astro preview`, así que replicamos aquí
 * su resolución de rutas: /ruta → /ruta/index.html, y 404 si no existe.
 */
export async function startPreview(): Promise<void> {
  server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', BASE);
    let rel = decodeURIComponent(url.pathname);

    // Evita salir del directorio servido.
    const candidatos = rel.endsWith('/')
      ? [path.join(rel, 'index.html')]
      : [rel, path.join(rel, 'index.html'), `${rel}.html`];

    for (const c of candidatos) {
      const archivo = path.join(DIST, c);
      if (!archivo.startsWith(DIST)) break;
      try {
        if (!(await stat(archivo)).isFile()) continue;
        const cuerpo = await readFile(archivo);
        res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] ?? 'application/octet-stream' });
        res.end(cuerpo);
        return;
      } catch {
        /* siguiente candidato */
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404</h1>');
  });

  const port = Number(new URL(BASE).port);
  await new Promise<void>((resolve, reject) => {
    server!.once('error', reject);
    server!.listen(port, resolve);
  });
}

export async function stopPreview(): Promise<void> {
  if (!server) return;
  await new Promise<void>((resolve) => server!.close(() => resolve()));
  server = undefined;
}

/** Devuelve el HTML de una ruta junto con su status. */
export async function getHtml(ruta: string) {
  const res = await fetch(`${BASE}${ruta}`);
  return { status: res.status, html: await res.text() };
}
