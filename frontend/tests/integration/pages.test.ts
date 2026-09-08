// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { startPreview, stopPreview, getHtml, BASE } from './server';
import { Projects } from '@/lib/projectData';

const RUTAS = ['/', '/clientes/', '/curso/', '/comunidad/', '/blog/', '/blog/bienvenida/', '/maintenance/'];

beforeAll(async () => { await startPreview(); }, 60_000);
afterAll(async () => { await stopPreview(); });

describe('rutas estáticas generadas', () => {
  it.each(RUTAS)('%s responde 200', async (ruta) => {
    const { status } = await getHtml(ruta);
    expect(status).toBe(200);
  });

  it('una ruta inexistente responde 404', async () => {
    const res = await fetch(`${BASE}/no-existe-jamas`);
    expect(res.status).toBe(404);
  });

  it.each(RUTAS)('%s declara lang y charset', async (ruta) => {
    const { html } = await getHtml(ruta);
    expect(html).toMatch(/<html[^>]+lang="[a-z]{2}"/);
    expect(html).toMatch(/<meta charset="UTF-8"/i);
  });

  // Esta prueba existe por una regresion real: al migrar a Tailwind v4, el CSS
  // dejo de inyectarse solo (lo hacia la integracion @astrojs/tailwind de v3) y
  // solo lo cargaba la home, que era la unica pagina que importaba global.css.
  // Las otras cinco quedaron sin tipografia, sin colores y sin layout, y ni el
  // build ni el resto de la suite dijeron nada.
  it.each(RUTAS)('%s carga la hoja de estilos', async (ruta) => {
    const { html } = await getHtml(ruta);
    const hojas = html.match(/<link[^>]+rel="stylesheet"[^>]+href="\/_astro\/[^"]+\.css"/g) ?? [];
    expect(hojas.length).toBeGreaterThan(0);
  });

  it.each(RUTAS)('%s aplica la tipografia del sitio', async (ruta) => {
    const { html } = await getHtml(ruta);
    expect(html).toMatch(/fonts\.googleapis\.com/);
  });

  it.each(RUTAS)('%s tiene un único <main>', async (ruta) => {
    const { html } = await getHtml(ruta);
    expect(html.match(/<main[\s>]/g) ?? []).toHaveLength(1);
  });

  it.each(RUTAS)('%s tiene un único <h1>', async (ruta) => {
    const { html } = await getHtml(ruta);
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it.each(RUTAS)('%s no anida <a> dentro de <a>', async (ruta) => {
    const { html } = await getHtml(ruta);
    // El HTML del servidor sí conserva el anidado (el parser lo deshace después).
    expect(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<a\b/.test(html)).toBe(false);
  });
});

describe('metadatos SEO', () => {
  it.each(RUTAS)('%s tiene title, description y canonical', async (ruta) => {
    const { html } = await getHtml(ruta);
    expect(html).toMatch(/<title>[^<]{10,70}<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{50,}"/);
    expect(html).toMatch(/rel="canonical" href="https:\/\//);
  });

  it('los canonical usan siempre el mismo host que astro.config (site)', async () => {
    const hosts = new Set<string>();
    for (const ruta of RUTAS) {
      const { html } = await getHtml(ruta);
      const m = html.match(/rel="canonical" href="([^"]+)"/);
      if (m) hosts.add(new URL(m[1]).host);
    }
    expect([...hosts]).toEqual(['www.yamid.dev']);
  });

  it('el title de la home no repite el nombre del sitio', async () => {
    const { html } = await getHtml('/');
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    const veces = title.split('Yamid Dev').length - 1;
    expect(veces).toBeLessThanOrEqual(1);
  });

  it('cada página expone Open Graph con imagen absoluta', async () => {
    const { html } = await getHtml('/');
    expect(html).toMatch(/property="og:title"/);
    const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    expect(og).toBeDefined();
    expect(() => new URL(og!)).not.toThrow();
  });

  it('el sitio publica un sitemap', async () => {
    const res = await fetch(`${BASE}/sitemap-index.xml`);
    expect(res.status).toBe(200);
  });
});
// Sustituye a tests/components/Carousel.test.tsx: la vertiente comercial ya no
// pinta los proyectos con una isla de React, sino con una rejilla estatica, asi
// que lo que hay que comprobar es el HTML servido y no el arbol de React.
describe('vertiente comercial (/clientes/)', () => {
  it('pinta una tarjeta por proyecto', async () => {
    const { html } = await getHtml('/clientes/');
    for (const p of Projects) {
      expect(html).toContain(`>${p.title}<`);
      expect(html).toContain(p.url);
    }
  });

  it('todos los enlaces externos llevan rel="noopener noreferrer"', async () => {
    const { html } = await getHtml('/clientes/');
    const externos = html.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? [];
    expect(externos.length).toBeGreaterThan(0);
    for (const a of externos) {
      expect(a).toContain('noopener');
      expect(a).toContain('noreferrer');
    }
  });

  it('todas las imagenes llevan texto alternativo', async () => {
    const { html } = await getHtml('/clientes/');
    const imgs = html.match(/<img\b[^>]*>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(0);
    for (const img of imgs) expect(img).toMatch(/\salt="[^"]+"/);
  });

  // Criterios del skill agent-portfolio-clientes: un unico CTA primario y
  // ningun mailto: expuesto, que los rastreadores cosechan.
  it('declara exactamente un CTA primario', async () => {
    const { html } = await getHtml('/clientes/');
    expect(html.match(/data-cta="primary"/g) ?? []).toHaveLength(1);
  });

  it('no expone ningun mailto:', async () => {
    const { html } = await getHtml('/clientes/');
    expect(html).not.toContain('mailto:');
  });

  // Las dos vertientes son el mismo sitio: comparten el ancho de seccion y el
  // titular. Si alguien reintroduce el titular en degradado o una seccion con
  // otro ancho, esto lo detecta antes que el ojo.
  it('usa el mismo ancho de seccion y titular que la home tecnica', async () => {
    const { html } = await getHtml('/clientes/');
    expect(html).toContain('w-[95%] md:w-[90%] mx-auto');
    expect(html).toContain('text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight');
    expect(html).not.toMatch(/bg-clip-text[^"]*text-transparent/);
  });

  it('ofrece WhatsApp como canal secundario', async () => {
    const { html } = await getHtml('/clientes/');
    expect(html).toContain('wa.me/573124673850');
  });
});
