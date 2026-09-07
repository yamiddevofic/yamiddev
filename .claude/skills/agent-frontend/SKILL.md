---
name: agent-frontend
description: Construir interfaz moderna y responsiva en yamid.dev (Astro 7 + React 18 + Tailwind v4). Úsalo siempre que haya que crear o modificar algo que se ve en pantalla — una sección, una tarjeta, un formulario, un hero, un menú, un layout, una landing— y también cuando el encargo hable de "que se vea bien en móvil", "hacerlo responsive", "modernizar el diseño", "ajustar espaciados", "que no se desborde", "dark mode" o "adaptar a pantallas pequeñas". Este proyecto tiene breakpoints de rango cerrado que se comportan al revés de lo que cualquiera espera de Tailwind, así que consúltalo antes de escribir la primera clase, aunque el cambio parezca trivial.
---

# UI moderna y responsiva en yamid.dev

Astro 7 estático con islas de React 18 y **Tailwind v4**. Sin `tailwind.config.js`: la configuración vive en `src/styles/global.css`.

Antes de escribir clases, lee la sección de breakpoints. Es lo que más se equivoca aquí.

---

## Los breakpoints de este proyecto se comportan al revés

Tailwind es mobile-first: `md:p-8` significa "de 768px **hacia arriba**". Los cinco breakpoints propios de este proyecto **no funcionan así**. Son de **rango cerrado**: aplican solo dentro de su franja y dejan de aplicar al salir de ella.

| Variante | Franja | Comportamiento |
|---|---|---|
| `xs` | 320–359 px | solo ahí |
| `ls` | 360–399 px | solo ahí |
| `ms` | 400–424 px | solo ahí |
| `ss` | 425–549 px | solo ahí |
| `s` | 550–639 px | solo ahí |
| `sm` `md` `lg` `xl` `2xl` | 640/768/1024/1280/1536 px **y hacia arriba** | acumulativo, el de Tailwind |

Por debajo de 320 px no hay variante: manda la utilidad sin prefijo.

### Qué provoca esto

Como no se acumulan, cubrir todo el rango móvil con variantes obliga a repetir la misma clase cinco veces. Hay bastante código así en el repo:

```jsx
// Lo que ya existe. No lo imites.
className="xs:py-[3.5rem] ls:py-[3.5rem] ms:py-[3.5rem] ss:py-[3.5rem] s:py-[3.5rem] sm:py-[3rem] md:py-[3rem] lg:py-[3rem]"
```

Ocho declaraciones para dos valores reales. Y basta olvidar una franja para que un móvil concreto —justo el de 400 px— se quede sin ese espaciado, con el fallo invisible en cualquier otro ancho.

### Cómo escribir responsive aquí

**Empieza sin prefijo y sube con los estándar.** La utilidad base cubre todo el móvil, `sm:` y `md:` se acumulan hacia arriba:

```jsx
// Dos declaraciones, cobertura completa, sin huecos posibles.
className="py-14 sm:py-12 md:py-12"

// O mejor aún, una sola: escala sola con el viewport.
className="py-[clamp(2rem,6vw,3.5rem)]"
```

**Usa `xs`/`ls`/`ms`/`ss`/`s` solo para corregir una franja concreta**, cuando algo se rompe en un ancho puntual y arreglarlo con los estándar estropearía el resto:

```jsx
// Legítimo: el título se desborda solo en los móviles más estrechos.
className="text-3xl xs:text-2xl"
```

Esa es la regla: **base + estándar para construir, rango cerrado para parchear**. Si te encuentras escribiendo la misma clase en cuatro o cinco variantes de rango, es señal de que ese valor debía ir sin prefijo.

---

## Escalas fluidas antes que saltos

Una interfaz moderna se lee bien en cualquier ancho, no solo en los cinco que probaste. `clamp()` interpola entre un mínimo y un máximo, y ahorra la mitad de los breakpoints. El proyecto ya lo usa en el hero:

```jsx
text-[clamp(2.5rem,6vw,4.5rem)]   // tipografía
py-[clamp(2rem,6vw,3.5rem)]       // espaciado
gap-[clamp(1rem,3vw,2rem)]        // separación en grids
```

Para maquetar, prefiere que el navegador decida cuántas columnas caben en vez de dictarlo por breakpoint:

```jsx
// Se reorganiza solo, sin una sola media query.
className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6"
```

Reserva las media queries para cambios de **estructura** —de columna a fila, mostrar u ocultar un menú—, no para ajustar números que pueden interpolarse.

---

## El tema oscuro no es opcional

`dark` se activa por clase (`@custom-variant dark`), y el layout renderiza en oscuro desde el servidor. **Cada color que escribas necesita su pareja**, o el elemento desaparecerá en uno de los dos temas:

```jsx
// Fondo, texto y borde, los tres con su variante.
className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800"
```

Para opacidad, la sintaxis de v4 es la barra. **`bg-opacity-*` no existe** y falla en silencio:

```jsx
className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm"   // correcto
className="bg-white bg-opacity-50"                              // no hace nada
```

Los colores semánticos del sistema (`bg-background`, `text-foreground`, `border-border`, `bg-card`…) ya cambian solos con el tema y no necesitan pareja. Úsalos cuando encajen.

---

## Accesibilidad: lo que la suite comprueba

Estas cuatro cosas tienen pruebas que fallan si las rompes, así que no son opinión:

- **Un solo `<main>` por página.** `MainLayout` ya lo pone; ningún componente debe emitir otro.
- **Un solo `<h1>` por página.** El resto de encabezados bajan a `<h2>`/`<h3>` respetando la jerarquía.
- **Nada de `<a>` dentro de `<a>` ni `<button>` dentro de `<button>`.** Además de HTML inválido, en una isla de React el navegador deshace el anidado al parsear y **la hidratación falla**: el componente entero se descarta y se vuelve a renderizar en cliente. Si una tarjeta entera es un enlace, el CTA de dentro es un `<span>` con estilo de botón.
- **Sin desbordamiento horizontal** a ningún ancho.

Más allá de las pruebas: área táctil de al menos 44×44 px en lo que se pulsa con el dedo, `alt` en toda imagen, foco visible en lo interactivo (no mates el `outline` sin poner un `focus-visible:ring`), y contraste suficiente en ambos temas.

---

## Movimiento

`framer-motion` está disponible y el proyecto lo usa. El movimiento moderno es breve y sirve para orientar, no para lucirse: entradas de 200–400 ms, y anima `transform` y `opacity` —que la GPU compone— en vez de `width`, `height` o `top`, que fuerzan recálculo de layout.

Respeta a quien pide menos animación:

```jsx
className="motion-safe:animate-fadeInUp motion-reduce:animate-none"
```

Animaciones ya declaradas en `@theme`: `animate-grow`, `animate-shrink`, `animate-fadeInUp`, `animate-fadeOutDown`.

---

## Dónde va cada cosa

`src/components/` sigue atomic design:

| Carpeta | Qué contiene |
|---|---|
| `atoms/` | elementos indivisibles: un botón, un icono |
| `molecules/` | combinaciones pequeñas: un campo con su etiqueta |
| `organisms/` | secciones completas: hero, navbar, formulario, carrusel |
| `ui/` | primitivas de shadcn |

**`.astro` por defecto; React solo cuando hay estado, efectos o eventos.** Un componente Astro no envía JavaScript al cliente; una isla de React sí, y cada isla tiene coste. Si la sección solo pinta contenido, no la conviertas en React.

Al hidratar, elige la directiva por lo que necesita el componente: `client:load` si debe ser interactivo de inmediato, `client:visible` si está por debajo del pliegue, `client:only="react"` si no puede renderizarse en el servidor. Ten en cuenta que **lo que es `client:only` no existe en el HTML del servidor**: si ahí dentro va el `<h1>` de la página o texto que deba indexarse, decláralo fuera, en el `.astro`.

---

## Imágenes

Viven en `public/`. Dales siempre `width` y `height`: sin dimensiones, el navegador no reserva el hueco y el contenido salta cuando la imagen carga.

```jsx
<img src="/foo.jpg" alt="Descripción real" width={1200} height={630} loading="lazy" decoding="async" />
```

Quita `loading="lazy"` en lo que se ve al abrir la página —retrasarlo empeora la carga percibida— y déjalo en todo lo demás.

Peso: ninguna imagen de `public/` debe pasar de 1 MB, y hay una prueba que lo comprueba. Las que sirven de vista previa social van en 1200×630. Para reducir una:

```bash
node -e "require('sharp')('public/x.png').resize(1200,630,{fit:'cover'}).jpeg({quality:85,mozjpeg:true}).toFile('public/x.jpg')"
```

---

## Antes de dar por terminado

```bash
cd frontend && npm run build && npx vitest run
```

Y si el cambio se ve en pantalla, **compruébalo en un navegador midiendo, no mirando**. Una captura no distingue un padding aplicado de uno anulado:

```js
getComputedStyle(el).paddingTop                              // "56px", no "se ve bien"
document.documentElement.scrollWidth > window.innerWidth     // desbordamiento
```

Prueba al menos a 340 px (dentro de `xs`), a 400 px (dentro de `ms`) y en escritorio. Las franjas intermedias son justo donde se cuelan los huecos de los breakpoints de rango.

Este proyecto ya se rompió dos veces de formas que el build y la suite daban por buenas: un CSS que anulaba el `padding` de todo el sitio y páginas enteras sirviéndose sin hoja de estilos. Las dos aparecieron midiendo en el navegador y en ningún otro sitio.
