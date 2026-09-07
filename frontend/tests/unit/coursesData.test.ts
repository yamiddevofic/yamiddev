import { describe, it, expect } from 'vitest';
import { Courses } from '@/lib/coursesData';

describe('coursesData', () => {
  it('todas las clases tienen id numérico y único', () => {
    const ids = Courses.map((c) => c.id);
    expect(ids.every((id) => Number.isInteger(id))).toBe(true);
    expect(new Set(ids).size).toBe(Courses.length);
  });

  it('hay al menos una clase disponible (Course usa find(c => c.available) como estado inicial)', () => {
    expect(Courses.some((c) => c.available)).toBe(true);
  });

  it('las clases disponibles apuntan a un videoUrl válido', () => {
    for (const c of Courses.filter((c) => c.available)) {
      expect(() => new URL(c.videoUrl)).not.toThrow();
    }
  });

  it('el poster de cada clase es una ruta pública absoluta', () => {
    for (const c of Courses) {
      expect(c.posterUrl.startsWith('/')).toBe(true);
    }
  });
});
