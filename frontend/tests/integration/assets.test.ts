// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

import { FRONTEND, DIST as dist } from './paths';

const publicDir = path.join(FRONTEND, 'public');

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

describe('artefactos de build', () => {
  // Inter se descarga en todas las paginas desde MainLayout, pero durante un
  // tiempo nadie la aplicaba: el sitio se renderizaba con la pila del sistema
  // y los dos pesos descargados se gastaban en tres elementos sueltos.
  it('la tipografia descargada se aplica de verdad', async () => {
    const cssDir = path.join(dist, '_astro');
    const hojas = (await readdir(cssDir)).filter((f) => f.endsWith('.css'));
    expect(hojas.length).toBeGreaterThan(0);
    const css = (await Promise.all(hojas.map((f) => readFile(path.join(cssDir, f), 'utf8')))).join('');
    expect(css).toMatch(/--font-sans:\s*["']?Inter/);
  });

  it('dist/ existe y contiene index.html', async () => {
    await expect(stat(path.join(dist, 'index.html'))).resolves.toBeDefined();
  });

  it('ningún bundle JS individual supera los 200 kB', async () => {
    const js = (await walk(path.join(dist, '_astro'))).filter((f) => f.endsWith('.js'));
    const pesados: string[] = [];
    for (const f of js) {
      const { size } = await stat(f);
      if (size > 200 * 1024) pesados.push(`${path.basename(f)} (${Math.round(size / 1024)} kB)`);
    }
    expect(pesados).toEqual([]);
  });

  it('ninguna imagen pública supera 1 MB (límite práctico para previsualizaciones OG)', async () => {
    const imgs = (await walk(publicDir)).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f));
    const pesadas: string[] = [];
    for (const f of imgs) {
      const { size } = await stat(f);
      if (size > 1024 * 1024) pesadas.push(`${path.relative(publicDir, f)} (${Math.round(size / 1024)} kB)`);
    }
    expect(pesadas).toEqual([]);
  });

  it('el build no filtra secretos en los bundles', async () => {
    const files = (await walk(dist)).filter((f) => /\.(js|html|css)$/.test(f));
    const patrones = [/DB_PASSWORD/, /NOTION_TOKEN/, /secret_[A-Za-z0-9]{20,}/, /ntn_[A-Za-z0-9]{20,}/];
    const hallazgos: string[] = [];
    for (const f of files) {
      const txt = await import('node:fs/promises').then((fs) => fs.readFile(f, 'utf8'));
      for (const p of patrones) if (p.test(txt)) hallazgos.push(`${path.relative(dist, f)} ~ ${p}`);
    }
    expect(hallazgos).toEqual([]);
  });
});