---
name: agent-frontend
description: Guía de maquetación UI/UX moderna, accesible y responsiva para yamid.dev (Astro 7 + React 18 + Tailwind v4). Activar SIEMPRE que se cree, modifique o ajuste la interfaz (layouts, heroes, cards, forms, menus, landings), se agreguen animaciones, se configure Dark Mode o se trabaje en accesibilidad y responsividad móvil.
---

# UI Moderna, Accesible y Responsiva en yamid.dev

> **Stack principal:** Astro 7 (SSR/Estático) + Islas de React 18 + Tailwind v4.
> **Configuración global:** `src/styles/global.css` (sin `tailwind.config.js`).

---

## 1. Sistema de breakpoints (regla crítica del proyecto)

Tailwind tradicional es *mobile-first* acumulativo (`md:` = 768px hacia arriba). **Este proyecto define breakpoints custom de rango cerrado** que aplican **únicamente** dentro de su franja.

| Variante | Franja | Tipo de rango | Comportamiento |
|---|---|---|---|
| *Sin prefijo* | 0 – 319 px | Base | Aplica desde 0px (utility first) |
| `xs` | 320 – 359 px | Cerrado | Solo aplica dentro de este rango |
| `ls` | 360 – 399 px | Cerrado | Solo aplica dentro de este rango |
| `ms` | 400 – 424 px | Cerrado | Solo aplica dentro de este rango |
| `ss` | 425 – 549 px | Cerrado | Solo aplica dentro de este rango |
| `s` | 550 – 639 px | Cerrado | Solo aplica dentro de este rango |
| `sm`, `md`, `lg`, `xl`, `2xl` | ≥ 640 / 768 / 1024 / 1280 / 1536 px | Acumulativo | Estándar de Tailwind (hacia arriba) |

### Regla de maquetación responsiva

❌ **Incorrecto:** no concatenes clases de rango cerrado para simular continuidad.

```jsx
// Nivel de error: alto. Fragilidad visual en rangos no cubiertos.
className="xs:py-14 ls:py-14 ms:py-14 ss:py-14 s:py-14 sm:py-12"
```

✅ **Correcto:** usa la utilidad base para cubrir móviles y escala con los breakpoints estándar. Los de rango cerrado quedan solo para parches puntuales.

```jsx
// Base para móvil + estándar para pantallas mayores
className="py-14 sm:py-12"

// Parche legítimo para un desbordamiento específico en móviles extra pequeños
className="text-3xl xs:text-2xl"
```

---

## 2. Tipografía y diagramación fluidas

Aprovecha interpolaciones nativas mediante `clamp()` y CSS Grid adaptativo para reducir la dependencia de media queries.

```jsx
// Tipografía y espaciado fluido sin brincos de breakpoint
className="text-[clamp(2.5rem,6vw,4.5rem)] py-[clamp(2rem,6vw,3.5rem)] gap-[clamp(1rem,3vw,2rem)]"

// Layout auto-adaptable (sin media queries explícitas)
className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-6"
```

---

## 3. Principios de diseño UI moderno y visual spacing

- **Jerarquía visual y contraste:** usa peso tipográfico (`font-medium`, `font-semibold`) e intensidad del color de texto (`text-slate-900` vs `text-slate-500`) para guiar el ojo, no solo el tamaño de letra.
- **Glassmorphism y profundidad:** capas de elevación suaves y transparencias con `backdrop-blur`.

```jsx
className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50"
```

- **Sintaxis de opacidad en Tailwind v4:** la opacidad se expresa con `/valor`. `bg-opacity-*` no existe en v4.
- **Variables semánticas:** prioriza tokens del sistema (`bg-background`, `text-foreground`, `border-border`, `bg-card`) sobre colores absolutos cuando aplique.

---

## 4. Accesibilidad (a11y) y estándares WCAG 2.1 AA

Las pruebas automatizadas del proyecto fallarán si se violan estas directrices.

**Semántica unívoca**

- Exactamente un `<main>` por página (provisto por `MainLayout`).
- Exactamente un `<h1>` por página. Jerarquía estricta: `<h1>` → `<h2>` → `<h3>`.

**Prohibición de anidamiento interactivo**

- ❌ Nunca coloques un `<a>` dentro de un `<a>`, ni un `<button>` dentro de un `<button>`.
- Impacto: rompe el parser HTML y provoca fallos irreparables de hidratación en las islas de React.

**Targets táctiles**

- Todo elemento interactivo (botones, enlaces, checkboxes) debe tener un área mínima de 44 × 44 px (`min-h-[44px] min-w-[44px]`).

**Foco e interacción por teclado**

Nunca remuevas el contorno por defecto sin proveer una alternativa visible:

```jsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
```

**Imágenes y contraste**

- Toda `<img>` debe incluir un atributo `alt` descriptivo.
- La relación de contraste mínima del texto regular con su fondo debe ser 4.5:1 (3:1 para texto grande ≥ 24px), tanto en Light Mode como en Dark Mode.

---

## 5. Microinteracciones y movimiento usable

Las animaciones deben orientar al usuario sobre el flujo de navegación, sin causar fatiga ni mareos.

- **Duración óptima:** 150 ms a 300 ms.
- **Propiedades aceleradas por GPU:** anima exclusivamente `transform` y `opacity`. Evita animar `width`, `height`, `margin` o `padding`.
- **Accesibilidad motora/vestibular:** respeta la preferencia del sistema para reducir movimiento.

```jsx
className="transition-transform duration-200 ease-out motion-reduce:transition-none"
```

- **Clases del sistema (`@theme`):** `animate-grow`, `animate-shrink`, `animate-fadeInUp`, `animate-fadeOutDown`.

---

## 6. Arquitectura de componentes y estrategia de hidratación

Estructura en `src/components/`:

- `atoms/`: componentes indivisibles (botones, badge, avatar, icono).
- `molecules/`: uniones funcionales simples (campo de búsqueda, input + label).
- `organisms/`: secciones complejas (hero, navbar, formulario de contacto, grid de cards).
- `ui/`: primitivas reutilizables (Shadcn/Radix).

### Reglas de selección de framework

- `.astro` es el valor por defecto. Genera HTML puro sin costo de JS en cliente.
- React solo cuando exista interactividad real (estado con `useState`, efectos con `useEffect` o eventos de usuario).

### Directivas de hidratación en Astro

- `client:load`: solo para elementos interactivos en el LCP / above-the-fold (ej. menú móvil principal).
- `client:visible`: para componentes por debajo del pliegue (ej. carrusel inferior, modales).
- `client:only="react"`: exclusivamente para componentes que dependan de APIs globales del browser (`window`, `localStorage`).

> **Advertencia:** el contenido dentro de `client:only` NO se procesa en el HTML inicial del servidor. No coloques etiquetas SEO ni `<h1>` dentro.

---

## 7. Optimización de multimedia e imágenes

- **Ubicación:** `public/`.
- **Atributos obligatorios:** toda imagen debe declarar `width`, `height` y `alt`.

```jsx
<img
  src="/projects/hero.webp"
  alt="Captura de pantalla de la plataforma yamid.dev"
  width={1200}
  height={630}
  loading="lazy"
  decoding="async"
/>
```

- **Above-the-fold:** omite `loading="lazy"` en las imágenes visibles en la primera pantalla para optimizar el LCP.
- **Límite de tamaño:** máximo 1 MB por imagen en `public/`. Reduce dimensiones o formato (preferir `.webp` / `.avif`) con `sharp`:

```bash
node -e "require('sharp')('public/origen.png').resize(1200,630,{fit:'cover'}).webp({quality:80}).toFile('public/destino.webp')"
```

---

## 8. Criterios de aceptación y checklist de verificación

Antes de dar por completado un cambio en la interfaz, ejecuta la validación funcional en terminal y navegador.

**1. Suite de pruebas y build**

```bash
cd frontend && npm run build && npx vitest run
```

**2. Inspección computada en el navegador (DevTools Console)**

Verifica que no existan desbordamientos horizontales ni colisiones de espaciado mediante cálculo en el DOM:

```js
// 1. Validar que no hay desbordamiento horizontal
console.assert(
  document.documentElement.scrollWidth <= window.innerWidth,
  'Error: existe desbordamiento horizontal en el viewport actual'
);

// 2. Verificar estilos computados en un elemento crítico
const el = document.querySelector('main');
console.log('Padding superior aplicado:', getComputedStyle(el).paddingTop);
```

**3. Anchos mínimos obligatorios de prueba manual**

- 340 px (dentro del rango `xs`)
- 400 px (dentro del rango `ms`)
- 768 px (tablet / breakpoint `md`)
- 1280 px (escritorio / breakpoint `xl`)