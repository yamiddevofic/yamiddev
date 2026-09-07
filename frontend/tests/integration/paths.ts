import path from 'node:path';

/** Raíz del paquete frontend (vitest se ejecuta desde aquí). */
export const FRONTEND = process.cwd();

/** Raíz del repositorio. */
export const REPO = path.resolve(FRONTEND, '..');

/** Salida estática del build (el adaptador de Vercel escribe en dist/client). */
export const DIST = path.join(FRONTEND, 'dist', 'client');
