import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

/**
 * Fondo de degradado animado del hero (shader de ruido fractal sobre un plano).
 *
 * Idea tomada de nesdesign.co, que carga su motor de degradados WebGL solo
 * cuando hace falta. Aqui se hace igual: este modulo se importa dinamicamente
 * desde el hero, nunca en la carga inicial.
 *
 * Devuelve una funcion para destruirlo, o null si WebGL no esta disponible.
 */
const VERTEX = /* glsl */ `
  void main() { gl_Position = vec4(position, 1.0); }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform vec2 u_res;
  uniform float u_time;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.x *= u_res.x / u_res.y;
    float t = u_time * 0.05;
    vec2 q = vec2(fbm(uv * 1.5 + t), fbm(uv * 1.5 - t + 4.0));
    float n = fbm(uv * 1.5 + q * 1.6 + t);
    vec3 base = vec3(0.016, 0.035, 0.075);   // slate-950
    vec3 teal = vec3(0.03, 0.42, 0.52);      // cyan oscuro
    vec3 glow = vec3(0.30, 0.78, 0.88);      // cyan claro
    vec3 col = mix(base, teal, smoothstep(0.25, 0.75, n));
    col = mix(col, glow, smoothstep(0.62, 0.95, n) * 0.5);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export function mountHeroGradient(host: HTMLElement): (() => void) | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
  } catch {
    return null;
  }

  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: { u_res: { value: new Vector2(1, 1) }, u_time: { value: 0 } },
  });
  scene.add(new Mesh(new PlaneGeometry(2, 2), material));

  const resize = () => {
    // Tope de 1.5 de pixel ratio: es un fondo difuso, no necesita mas.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    const buf = renderer.getDrawingBufferSize(new Vector2());
    material.uniforms.u_res.value.copy(buf);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  let raf = 0;
  let visible = true;
  const start = performance.now();
  const frame = (now: number) => {
    material.uniforms.u_time.value = (now - start) / 1000;
    renderer.render(scene, camera);
    raf = visible ? requestAnimationFrame(frame) : 0;
  };
  raf = requestAnimationFrame(frame);

  // Fuera de pantalla no se gasta GPU.
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  });
  io.observe(host);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    material.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
