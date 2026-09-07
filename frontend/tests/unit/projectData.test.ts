import { describe, it, expect } from 'vitest';
import { Projects } from '@/lib/projectData';

describe('projectData', () => {
  it('exporta al menos un proyecto', () => {
    expect(Array.isArray(Projects)).toBe(true);
    expect(Projects.length).toBeGreaterThan(0);
  });

  it('cada proyecto tiene los campos obligatorios', () => {
    for (const p of Projects) {
      expect(typeof p.title).toBe('string');
      expect(p.title.length).toBeGreaterThan(0);
      expect(typeof p.description).toBe('string');
      expect(Array.isArray(p.techStack)).toBe(true);
      expect(p.techStack.length).toBeGreaterThan(0);
      expect(typeof p.time).toBe('string');
    }
  });

  it('cada proyecto expone exactamente dos imágenes (claro/oscuro) con ruta absoluta', () => {
    for (const p of Projects) {
      expect(p.image).toHaveLength(2);
      for (const src of p.image) expect(src.startsWith('/')).toBe(true);
    }
  });

  it('cada proyecto tiene una URL https válida', () => {
    for (const p of Projects) {
      expect(() => new URL(p.url)).not.toThrow();
      expect(new URL(p.url).protocol).toBe('https:');
    }
  });

  // REGRESIÓN: Carousel.jsx usa key={project.id} y ningún proyecto define `id`,
  // por lo que React emite "Each child in a list should have a unique key".
  it('cada proyecto tiene un `id` único (usado como key de React en Carousel)', () => {
    const ids = Projects.map((p: any) => p.id);
    expect(ids.every((id) => id !== undefined && id !== null)).toBe(true);
    expect(new Set(ids).size).toBe(Projects.length);
  });
});
