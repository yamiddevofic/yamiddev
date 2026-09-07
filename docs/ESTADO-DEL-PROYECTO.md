# Informe del estado del proyecto — yamid.dev

**Última actualización:** 6 de septiembre de 2026
**Punto de partida auditado:** commit `38876ec`
**Alcance:** código fuente del frontend, configuración de despliegue y verificación contra el sitio en producción.

---

## 1. Resumen ejecutivo

El proyecto pasó por una auditoría completa y, acto seguido, por la **retirada de WordPress**: la cuenta de hosting de Hostinger ya no existe y no se planea volver a usar un CMS. Eso convirtió buena parte de los hallazgos en trabajo de borrado, y el resultado es un proyecto mucho más pequeño y con menos superficie que vigilar.

### Antes y después

| | Auditoría inicial | Estado actual |
|---|---|---|
| Archivos versionados | 3 393 | **93** |
| Dependencias de producción | 28 | **17** |
| Vulnerabilidades críticas | 1 | **0** |
| Secretos versionados | 5 archivos | **0** |
| Servicios de infraestructura | 4 (Docker) | **0** |
| Blog | Roto (`403` de la API) | ✅ Markdown en el repo |
| Formulario de contacto | Roto (`403`) | ✅ Función serverless |
| Sitemap | ❌ | ✅ |
| Cabeceras de seguridad | Solo HSTS | ✅ 5 más en `vercel.json` |
| Pruebas | 0 | **94** (82 en verde) |

### Lo que sigue abierto

| # | Hallazgo | Impacto |
|---|---|---|
| 🟠 1 | La **hidratación de React falla** en la home por un `<a>` anidado dentro de otro `<a>` | Astro pierde su ventaja de SSR: la isla completa se vuelve a renderizar en cliente |
| 🟠 2 | `astro` y `sharp` con avisos de severidad alta | Requiere subir a Astro 7, que arrastra migrar a Tailwind v4 |
| 🟡 3 | `<main>` y `<h1>` duplicados; `<button>` anidado en `/curso` | HTML inválido, accesibilidad y SEO |
| 🟡 4 | Canonicals inconsistentes y título duplicado en la home | Señales contradictorias para los buscadores |
| 🟡 5 | `public/curso.png` pesa 3,3 MB y se usa como imagen de Open Graph | Las previsualizaciones sociales de `/curso` no se renderizan |
| 🟡 6 | Sin linter, sin formateador y sin CI | Las regresiones no se detectan antes de desplegar |

---

## 2. Arquitectura

```
yamiddev/
├── docs/                     # Documentación técnica y auditorías
├── frontend/                 # Astro 5 + islas React 18
│   ├── src/
│   │   ├── components/       # atomic design: atoms · molecules · organisms · ui
│   │   ├── content/blog/     # Artículos en Markdown
│   │   ├── layouts/          # MainLayout.astro (principal) · Layout.astro (legacy)
│   │   ├── lib/              # Datos estáticos y utilidades
│   │   ├── pages/            # Rutas, incluida la API /api/contact
│   │   └── styles/
│   ├── tests/                # Suite de Vitest
│   ├── content.config.ts     # Esquema de la colección de blog
│   └── .env.example
├── vercel.json               # Cabeceras de seguridad
├── CHANGELOG.md
└── README.md
```

### Métricas

| Métrica | Valor |
|---|---|
| Código fuente propio | 4 705 líneas |
| Archivos versionados | 93 |
| Dependencias de producción / desarrollo | 17 / 10 |
| Rutas generadas | 6 (`/`, `/blog/`, `/blog/[slug]/`, `/comunidad/`, `/curso/`, `/maintenance/`) |
| Tamaño de `dist/client` | 5,8 MB (436 kB de JS) |
| Tiempo de build | ~34 s |

### Despliegue

Todo vive en **Vercel detrás de Cloudflare**. El sitio es estático salvo `/api/contact`, que declara `prerender = false` y Vercel ejecuta como función serverless mediante `@astrojs/vercel`.

No hay servidores, ni bases de datos, ni contenedores que mantener. `git push` despliega.

---

## 3. Cambios aplicados

### WordPress retirado por completo

Se eliminaron 3 310 archivos del núcleo de WordPress (110 MB) y todo el código que consumía su API: `lib/fetchPosts.ts`, `molecules/BlogPosts.tsx`, `organisms/Blog.jsx` y `pages/_blog.astro`. También la integración con Notion (`scripts/notion.ts`, `pages/_notion.astro`), que nunca llegó a usarse.

### El blog ahora son archivos Markdown

Los artículos viven en `src/content/blog/` y se validan contra un esquema declarado en `src/content.config.ts`:

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  category: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().default(false),
})
```

Si un artículo declara mal un campo, **el build falla con un mensaje claro** en lugar de publicar una página rota — justo lo contrario de lo que hacía la versión con WordPress, que se tragaba el error y publicaba un blog vacío.

Se conservó íntegro el diseño *bullet journal* del detalle de artículo. Se añadió `/blog` como índice, enlazado desde el navbar y el pie.

### Formulario de contacto reconstruido

`src/pages/api/contact.ts` es una función serverless que envía por [Resend](https://resend.com). Incluye:

- Validación de todos los campos en servidor, con límites de longitud.
- **Honeypot**: un campo oculto que un bot rellena y una persona no. Responde `200` sin enviar nada, para no enseñarle al bot que fue detectado.
- **Límite de 3 envíos por IP cada 10 minutos**, en memoria. Frena ráfagas mientras la instancia esté caliente; si el spam crece, hay que moverlo a Vercel KV o Upstash.
- **Neutralización de saltos de línea en el asunto**, contra la inyección de cabeceras de correo.
- **Escapado de HTML** del contenido antes de componer el mensaje.
- El correo del visitante va en `replyTo`, así que responder es contestar el correo.

Requiere tres variables de entorno en Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`. La plantilla está en `frontend/.env.example`.

### Infraestructura eliminada

Se borraron `docker-compose.yml`, los dos `Dockerfile`, `deploy.sh`, `deploy.sh.save` y `.env`. Sin WordPress ni MySQL, Docker solo añadía una capa sobre `npm run dev`, y `deploy.sh` era un `git push` con pasos de más: Vercel ya despliega solo.

### Dependencias podadas

Se retiraron 11 paquetes que no se usaban en ningún archivo: `swiper` (que además cargaba la **única vulnerabilidad crítica**), `aos`, `gsap`, `@notionhq/client`, `marked`, `shiki`, `usehooks-ts`, `@react-spring/web`, `@svgr/webpack`, los tres de FontAwesome, `astro-icon` y `@iconify-json/lucide`.

### Higiene y seguridad

- `.gitignore` reescrito. Los patrones anteriores (`./.env`) **no coincidían con nada** — el prefijo `./` no es válido en gitignore, y por eso los archivos de entorno acabaron versionados.
- `package-lock.json` pasa a versionarse: los builds ahora son reproducibles.
- `vercel.json` añade CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`.
- `@astrojs/sitemap` instalado: `/sitemap-index.xml` se genera en cada build.
- `rel="noopener noreferrer"` añadido a los cuatro enlaces externos del pie.

---

## 4. Hallazgos abiertos

### 🟠 A-1 · La hidratación de React falla en la home

Confirmado en el navegador, en desarrollo y en el build de producción:

```
Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>
Error: Hydration failed because the initial UI does not match what was rendered on the server.
Error: There was an error while hydrating. Because the error happened outside of a
       Suspense boundary, the entire root will switch to client rendering.
```

**Causa:** en `src/components/organisms/Carousel.jsx`, la tarjeta entera se envuelve en un `<a>` (línea 153) que contiene otro `<a>` «Ver proyecto» (línea 209). El parser del navegador deshace el anidado al leer el HTML del servidor, el DOM deja de coincidir con el árbol de React y **toda la isla se descarta y se vuelve a renderizar en cliente**.

**Corrección:** dejar un solo enlace por tarjeta — mantener el `<a>` envolvente y convertir «Ver proyecto» en un `<span>` con estilo de botón.

### 🟠 A-2 · Vulnerabilidades altas pendientes

```
astro  <= 7.0.9  (instalada 5.18.2)     →  8 avisos de XSS y SSRF
sharp  < 0.35.0  (instalada 0.34.5)     →  CVE-2026-33327/33328/35590/35591
path-to-regexp  (vía @astrojs/vercel@9) →  GHSA-9wv6-86v2-598j
esbuild (bajo, solo Windows)
```

Las cinco se resuelven subiendo a **Astro 7** con `@astrojs/vercel@11`. Se intentó durante esta sesión y **se revirtió**: `@astrojs/tailwind` solo soporta Astro 3, 4 y 5, así que la subida obliga a migrar a **Tailwind v4**, que sustituye `tailwind.config.js` por directivas `@theme` en CSS. El proyecto define seis breakpoints personalizados con rangos `min`/`max` (`2xs`, `xs`, `ls`, `ms`, `ss`, `s`) usados a lo largo de todo el código; migrarlos requiere `@custom-variant` y verificación visual página por página.

**Es un trabajo que merece su propia sesión.** El sitio es estático, lo que reduce mucho la explotabilidad de los vectores reflejados, así que puede esperar — pero no indefinidamente.

### 🟡 A-3 · Marcado y accesibilidad

| Problema | Ubicación | Efecto |
|---|---|---|
| Dos `<main>` en la misma página | `MainLayout.astro:196` + `Hero.tsx:42` (`<motion.main role="main">`) | Landmark duplicado: la navegación por regiones se rompe |
| Dos `<h1>` en `/` y en `/curso` | `index.astro` + un organism | Jerarquía de encabezados ambigua |
| `<button>` dentro de `<button>` | `Course.jsx:307` → `319` | HTML inválido; fallo de hidratación en `/curso` |
| 15 `<img>` sin `width`/`height` | todo el sitio | Desplazamiento de layout (CLS) al cargar |
| `target="_blank"` sin `rel` | `AboutMe.jsx` (×2), `comunidad.astro`, `Carousel.jsx` | *Reverse tabnabbing* y fuga de `Referer` |
| `<style jsx>` sin styled-jsx instalado | `Carousel.jsx:258`, `ThinkInCode.jsx:305` | React emite `jsx="true"` como atributo inválido; el CSS apunta a `.no-scrollbar`, clase que ya no se usa |

### 🟡 A-4 · SEO

| Ruta | `<link rel="canonical">` |
|---|---|
| `/` | `https://yamid.dev/` (sin `www`, **hardcodeado** en `index.astro:22`) |
| `/curso/` | `https://yamid.dev/curso` (sin `www`) |
| `/comunidad/`, `/blog/`, `/blog/[slug]/` | `https://www.yamid.dev/...` (con `www`) |
| `/maintenance/` | *ninguno* |

`astro.config.mjs` declara `site: 'https://www.yamid.dev'` y el dominio sirve en `www`. Los canonicals sin `www` apuntan a una URL que redirige.

Además:
- **Título duplicado en la home:** `<title>Yamid Dev | Desarrollador Full Stack | Yamid Dev</title>` — `index.astro` ya incluye el nombre del sitio y `MainLayout` se lo vuelve a añadir.
- **`/maintenance` usa el layout antiguo** `Layout.astro`, con `<title>Astro Basics</title>` fijo, `lang="en"` y sin metadatos.
- **No hay página 404 personalizada** (`src/pages/404.astro`).

### 🟡 A-5 · Rendimiento

- **`public/curso.png` pesa 3,3 MB** y se usa como imagen de Open Graph en `/curso`. WhatsApp, X y LinkedIn descartan previsualizaciones por encima de ~1 MB: **la tarjeta social de esa página no se renderiza**.
- Ninguna imagen pasa por `astro:assets`; todas viven en `public/` sin optimización, sin WebP/AVIF y sin `srcset`.
- Solo 2 de 15 imágenes usan `loading="lazy"`.
- El tema se aplica **después** de hidratar React (`Navbar.jsx:75`), mientras `MainLayout` fuerza `class="dark"` en el servidor. Quien tenga el tema claro guardado ve un destello oscuro, agravado por el fallo de hidratación de A-1. `Layout.astro` sí tiene el script inline correcto — falta portarlo a `MainLayout`.

### 🟡 A-6 · Configuración

| Problema | Detalle |
|---|---|
| `tsconfig.json` con rutas erróneas | `"paths": { "@/*": ["/src/*"] }` e `"include": ["/src"]` usan rutas **absolutas del sistema de archivos**; deberían ser `./src/*` y `./src`. Funciona de casualidad porque el alias real lo resuelve Vite. |
| `@types/react` desalineado | Declarado `^19.0.2`, pero React instalado es **18.3.1** |
| `react` y `react-dom` sin declarar | Solo llegan como *peer dependencies* de `@astrojs/react` |
| `import { Astro } from "astro"` | `MainLayout.astro:2` — `astro` no exporta `Astro`; import inútil |
| `import { time } from "framer-motion"` | `projectData.ts:1` — import sin usar en un archivo de datos |
| Proyectos sin `id` | `Carousel.jsx:141` usa `key={project.id}` y ningún proyecto de `projectData.ts` define ese campo |
| Archivos huérfanos | `atoms/Text.tsx`, `atoms/icons/Fire.jsx` |
| Sin linter ni CI | No hay ESLint, Prettier ni `.github/workflows/` |

---

## 5. Estado de las pruebas

```
Test Files  5 failed | 5 passed (10)
     Tests  12 failed | 82 passed (94)
```

Los 12 fallos reproducen los hallazgos de la sección anterior. Detalle en [TESTING.md](./TESTING.md).

---

## 6. Plan de acción

### Antes del próximo despliegue

1. **Configurar las variables de entorno en Vercel** (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) — sin ellas `/api/contact` responde `500`.
2. **Verificar la contraseña filtrada.** Aunque el servidor de Hostinger ya no exista, si esa contraseña se reutilizó en algún otro servicio, sigue comprometida. Ver [INFORME-SEGURIDAD.md](./INFORME-SEGURIDAD.md#lo-que-queda-abierto).

### Esta semana

3. Eliminar el `<a>` anidado del Carousel y el `<button>` anidado de Course.
4. Añadir `id` a cada proyecto en `projectData.ts`.
5. Unificar los canonicals en `https://www.yamid.dev` y quitar el nombre del sitio duplicado del título de la home.
6. Comprimir `public/curso.png` por debajo de 300 kB.
7. Migrar `/maintenance` a `MainLayout` y eliminar `Layout.astro`.

### Este mes

8. Corregir `<main>` y `<h1>` duplicados; añadir `rel="noopener noreferrer"` a los enlaces externos restantes.
9. Migrar las imágenes a `astro:assets` con dimensiones explícitas.
10. Mover el script de tema a un bloque inline en `MainLayout` para eliminar el parpadeo.
11. Añadir `404.astro`, ESLint, Prettier y un workflow de CI que ejecute `npm test`.
12. **Planificar la subida a Astro 7 + Tailwind v4** en una sesión dedicada.

---

## 7. Lo que está bien

- **El build es rápido y limpio** — 6 páginas en ~34 s, sin errores.
- **El SEO está bien pensado**: Open Graph, Twitter Cards y JSON-LD dinámico según el tipo de página.
- **El responsive funciona de verdad**: verificado a 375 px sin desbordamiento horizontal.
- **Los bundles son razonables**: el mayor pesa 137 kB (44 kB con gzip).
- **Ninguna imagen carece de `alt`.**
- **El endpoint de contacto está bien defendido** para lo que es: validación, honeypot, límite por IP, escapado de HTML y neutralización de cabeceras, todo cubierto por pruebas.
- **La organización por atomic design** hace el código fácil de recorrer.
