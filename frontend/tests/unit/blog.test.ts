import { describe, it, expect } from 'vitest';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src', 'content', 'blog');

async function posts() {
  const archivos = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    archivos.map(async (f) => ({ archivo: f, texto: await readFile(path.join(dir, f), 'utf8') }))
  );
}

/** Extrae un campo simple del frontmatter YAML. */
const campo = (texto: string, clave: string) =>
  texto.match(new RegExp(`^${clave}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');

describe('colección de blog', () => {
  it('hay al menos un artículo', async () => {
    expect((await posts()).length).toBeGreaterThan(0);
  });

  it('cada artículo abre con un bloque de frontmatter', async () => {
    for (const { archivo, texto } of await posts()) {
      expect(texto.startsWith('---\n'), `${archivo} no empieza con frontmatter`).toBe(true);
    }
  });

  it('cada artículo declara title, description y date', async () => {
    for (const { archivo, texto } of await posts()) {
      for (const clave of ['title', 'description', 'date']) {
        expect(campo(texto, clave), `${archivo} no declara "${clave}"`).toBeTruthy();
      }
    }
  });

  it('las fechas usan el formato YYYY-MM-DD y son válidas', async () => {
    for (const { archivo, texto } of await posts()) {
      const fecha = campo(texto, 'date')!;
      expect(fecha, `${archivo}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(fecha).getTime()), `${archivo}`).toBe(false);
    }
  });

  it('el nombre del archivo sirve como slug (minúsculas y guiones)', async () => {
    for (const { archivo } of await posts()) {
      expect(archivo.replace(/\.md$/, '')).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('la imagen destacada, si existe, es una ruta pública absoluta', async () => {
    for (const { archivo, texto } of await posts()) {
      const img = campo(texto, 'image');
      if (img) expect(img.startsWith('/'), `${archivo}`).toBe(true);
    }
  });
});
