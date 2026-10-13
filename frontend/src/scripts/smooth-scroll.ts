import Lenis from 'lenis';

// Misma configuracion que seean.io: lerp 0.1 y rueda suavizada. El tactil
// queda nativo (syncTouch apagado) porque la inercia del movil ya es buena.
// Con movimiento reducido no se activa: el scroll es el del navegador.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
