import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Carousel from '@/components/organisms/Carousel';
import { Projects } from '@/lib/projectData';

describe('<Carousel />', () => {
  it('renderiza una tarjeta por proyecto', () => {
    render(<Carousel />);
    for (const p of Projects) {
      expect(screen.getByRole('heading', { name: p.title })).toBeInTheDocument();
    }
  });

  it('todos los enlaces externos llevan rel="noopener noreferrer"', () => {
    const { container } = render(<Carousel />);
    const externos = container.querySelectorAll('a[target="_blank"]');
    expect(externos.length).toBeGreaterThan(0);
    for (const a of externos) {
      expect(a.getAttribute('rel') ?? '').toContain('noopener');
      expect(a.getAttribute('rel') ?? '').toContain('noreferrer');
    }
  });

  it('las imágenes tienen texto alternativo', () => {
    const { container } = render(<Carousel />);
    for (const img of container.querySelectorAll('img')) {
      expect(img.getAttribute('alt')).toBeTruthy();
    }
  });

  it('los botones de navegación tienen aria-label', () => {
    render(<Carousel />);
    // Sólo se renderizan si hay más proyectos que huecos visibles.
    const botones = screen.queryAllByRole('button');
    for (const b of botones) expect(b).toHaveAccessibleName();
  });

  // REGRESIÓN: la tarjeta envuelve todo en un <a> y dentro incluye otro <a>
  // ("Ver proyecto"). El parser del navegador deshace el anidado, la marca del
  // servidor deja de coincidir con el árbol de React y la hidratación falla,
  // degradando toda la isla a render en cliente.
  it('no anida un <a> dentro de otro <a>', () => {
    const { container } = render(<Carousel />);
    expect(container.querySelectorAll('a a')).toHaveLength(0);
  });
});
