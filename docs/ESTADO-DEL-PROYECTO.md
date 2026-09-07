# Informe del estado del proyecto — yamid.dev

**Última actualización:** 7 de septiembre de 2026
**Punto de partida auditado:** commit `38876ec`
**Estado verificado en:** commit `014d197`, contrastado contra el sitio en producción.

---

## 1. Resumen ejecutivo

El proyecto pasó por una auditoría completa, la **retirada de WordPress** y una ronda de correcciones verificada en producción. La cuenta de hosting de Hostinger ya no existe y no se planea volver a usar un CMS.

### Antes y después

| | Auditoría inicial | Estado actual |
|---|---|---|
| Archivos versionados | 3 393 | **93** |
| Dependencias de producción | 28 | **17** |
| Vulnerabilidades críticas | 1 | **0** |
| Secretos versionados | 5 archivos | **0** (pero ver ⚠️ abajo) |
| Servicios de infraestructura | 4 (Docker) | **0** |
| Blog | Roto (`403` de la API) | ✅ Markdown en el repo |
| Formulario de contacto | Roto (`403`) | ✅ Verificado de extremo a extremo |
| Sitemap | ❌ | ✅ |
| Cabeceras de seguridad | Solo HSTS | ✅ **5 más, activas en producción** |
| Pruebas | 0 | **94** (93 en verde) |
| Tamaño de `dist/client` | 5,8 MB | **2,7 MB** |

### Lo que sigue abierto

| # | Hallazgo | Impacto |
|---|---|---|
| ⚠️ 1 | **Credenciales en el historial de un repo público con 1 fork** | Requiere rotar contraseñas, no limpiar el historial |
| 🟠 2 | `astro` y `sharp` con 5 avisos de severidad alta | Requiere subir a Astro 7, que arrastra migrar a Tailwind v4 |
| 🟡 3 | Sin linter, sin formateador y sin CI | Las regresiones no se detectan antes de desplegar |
| 🟡 4 | `tsconfig.json` con rutas absolutas erróneas | Funciona de casualidad: el alias real lo resuelve Vite |
| 🟡 5 | Imágenes sin `astro:assets` ni dimensiones explícitas | Desplazamiento de layout (CLS) al cargar |

---

## 2. Arquitectura

```
yamiddev/
├── docs/                     # Documentación técnica y auditorías
├── frontend/                 # Astro 5 + islas React 18
│   ├── src/
│   │   ├── components/       # atomic design: atoms · molecules · organisms · ui
│   │   ├── content/blog/     # Artículos en Markdown
│   │   ├── layouts/          # MainLayout.astro
│   │   ├── lib/              # Datos estáticos y utilidades
│   │   ├── pages/            # Rutas, incluida la API /api/contact
│   │   └── styles/
│   ├── tests/                # Suite de Vitest
│   ├── content.config.ts     # Esquema de la colección de blog
│   ├── vercel.json           # Cabeceras de seguridad
│   └── .env.example
├── CHANGELOG.md
└── README.md
```

### Métricas

| Métrica | Valor |
|---|---|
| Código fuente propio | 4 749 líneas |
| Archivos versionados | 93 |
| Dependencias de producción / desarrollo | 17 / 10 |
| Rutas generadas | 6 (`/`, `/blog/`, `/blog/[slug]/`, `/comunidad/`, `/curso/`, `/maintenance/`) |
| Tamaño de `dist/client` | 2,7 MB |
| Tiempo de build | ~30 s |

### Despliegue

Todo vive en **Vercel detrás de Cloudflare**. El sitio es estático salvo `/api/contact`, que declara `prerender = false` y Vercel ejecuta como función serverless mediante `@astrojs/vercel`.

Dos detalles que costaron un diagnóstico y conviene no olvidar:

- **El Root Directory del proyecto en Vercel es `frontend/`**, porque ahí vive el `package.json` de Astro. Por eso `vercel.json` tiene que estar en `frontend/vercel.json`: el de la raíz del repo se ignora en silencio, y el síntoma es que el sitio despliega bien pero sin cabeceras.
- **El dominio canónico es `www.yamid.dev`.** `yamid.dev` responde `307` hacia él.

No hay servidores, ni bases de datos, ni contenedores que mantener. `git push` despliega.

---

## 3. Cambios aplicados

### WordPress retirado por completo

Se eliminaron 3 310 archivos del núcleo de WordPress (110 MB) y todo el código que consumía su API: `lib/fetchPosts.ts`, `molecules/BlogPosts.tsx`, `organisms/Blog.jsx` y `pages/_blog.astro`. También la integración con Notion (`scripts/notion.ts`, `pages/_notion.astro`), que nunca llegó a usarse.

### El blog ahora son archivos Markdown

Los artículos viven en `src/content/blog/` y se validan contra un esquema declarado en `src/content.config.ts`. Si un artículo declara mal un campo, **el build falla con un mensaje claro** en lugar de publicar una página rota — justo lo contrario de lo que hacía la versión con WordPress, que se tragaba el error y publicaba un blog vacío.

Se conservó íntegro el diseño *bullet journal* del detalle de artículo. Se añadió `/blog` como índice, enlazado desde el navbar y el pie.

### Formulario de contacto reconstruido y verificado

`src/pages/api/contact.ts` es una función serverless que envía por [Resend](https://resend.com). Incluye validación en servidor con límites de longitud, honeypot, límite de 3 envíos por IP cada 10 minutos, neutralización de saltos de línea en el asunto y escapado de HTML. El correo del visitante va en `replyTo`.

**El cuerpo viaja como JSON, no como formulario, y esto es deliberado.** Astro activa por defecto `security.checkOrigin`, que rechaza con `403` las peticiones cuyo `Content-Type` sea de formulario y cuyo `Origin` no coincida con el host que ve el servidor. Detrás de Cloudflare y Vercel esa comparación nunca cuadraba, así que el formulario devolvía `403 Cross-site POST form submissions are forbidden` **a todos los visitantes**.

JSON esquiva la comprobación sin perder la defensa: un formulario HTML no puede enviar `application/json` a otro origen sin disparar un preflight CORS que este endpoint no responde, así que el navegador sigue bloqueando el intento cross-site.

Requiere tres variables de entorno en Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`. Ya están configuradas y **el envío está verificado de extremo a extremo**.

### Marcado, accesibilidad y SEO

| Corregido | Antes | Ahora |
|---|---|---|
| `<a>` anidado en Carousel | Rompía la hidratación de toda la isla | El CTA es un `<span>` |
| `<button>` anidado en Course | HTML inválido | La lógica de play/pausa vive en el botón de la fila |
| `<main>` duplicado | `MainLayout` + `Hero` + `Maintenance` | Uno solo, en `MainLayout` |
| `<h1>` duplicado en `/` | `index.astro` + `AboutMe` | Uno; el de `AboutMe` pasó a `<h2>` |
| `<h1>` ausente en `/curso` | `<Course>` es `client:only` | Declarado en la página con `sr-only` |
| Canonicals | Mezcla de `yamid.dev` y `www.` | Todos con `www`, como declara `astro.config` |
| Título de la home | `Yamid Dev \| … \| Yamid Dev` | `Desarrollador Full Stack \| Yamid Dev` |
| `/maintenance` | `<title>Astro Basics</title>`, `lang="en"` | `MainLayout` con metadatos propios y `noindex` |
| Imagen Open Graph de `/curso` | `curso.png`, 3,3 MB | `curso.jpg`, 1200×630, 132 kB |

Sobre la imagen: las redes descartan las previsualizaciones por encima de ~1 MB, así que la tarjeta social de esa página sencillamente no se renderizaba.

### Infraestructura eliminada

Se borraron `docker-compose.yml`, los dos `Dockerfile`, `deploy.sh`, `deploy.sh.save` y `.env`. Sin WordPress ni MySQL, Docker solo añadía una capa sobre `npm run dev`, y `deploy.sh` era un `git push` con pasos de más.

### Dependencias podadas

Se retiraron 11 paquetes sin uso: `swiper` (que además cargaba la **única vulnerabilidad crítica**), `aos`, `gsap`, `@notionhq/client`, `marked`, `shiki`, `usehooks-ts`, `@react-spring/web`, `@svgr/webpack`, los de FontAwesome, `astro-icon` y `@iconify-json/lucide`.

### Higiene y seguridad

- `.gitignore` reescrito. Los patrones anteriores (`./.env`) **no coincidían con nada** — el prefijo `./` no es válido en gitignore, y por eso los archivos de entorno acabaron versionados.
- `package-lock.json` pasa a versionarse: los builds ahora son reproducibles.
- `vercel.json` añade CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`. **Las cinco están activas en producción.**
- `@astrojs/sitemap` instalado: `/sitemap-index.xml` se genera en cada build.

---

## 4. Hallazgos abiertos

### ⚠️ A-1 · Credenciales en el historial de un repositorio público

`git rm` sacó `.env` y `wordpress/.env` del árbol, pero **no del historial**. Siguen siendo recuperables desde cualquier commit anterior a `0f14c20`, y el repositorio es **público y tiene 1 fork**. Lo expuesto:

```
wordpress/.env  →  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
.env            →  USUARIO, SERVIDOR, PUERTO, RUTA_REMOTA  (acceso SSH)
```

El servidor de Hostinger ya no existe, así que esa base de datos es inalcanzable. **El riesgo real es la reutilización**: si esa contraseña o ese usuario SSH se repiten en otro servicio, siguen expuestos.

**Reescribir el historial no resuelve esto.** Un fork conserva sus propios objetos y GitHub no los borra al limpiar el original, así que la única mitigación fiable es **rotar las credenciales**. El procedimiento está en [INFORME-SEGURIDAD.md](./INFORME-SEGURIDAD.md).

### 🟠 A-2 · Vulnerabilidades altas pendientes

```
astro           <= 7.0.9  (instalada 5.18.2)  →  XSS en define:vars
sharp           <  0.35.0 (instalada 0.34.5)  →  CVE-2026-33327 y otros de libvips
path-to-regexp  (vía @astrojs/vercel@9)       →  GHSA-9wv6-86v2-598j
esbuild         (baja, solo Windows)
```

Las cinco altas se resuelven subiendo a **Astro 7** con `@astrojs/vercel@11`. La dificultad es que `@astrojs/tailwind` solo soporta Astro 3, 4 y 5, así que la subida **obliga a migrar a Tailwind v4**, que sustituye `tailwind.config.js` por directivas `@theme` en CSS.

Lo que hace falta migrar, ya inventariado:

- **Cinco breakpoints personalizados con rangos `min`/`max`** (`xs`, `ls`, `ms`, `ss`, `s`), usados entre 35 y 38 veces cada uno. En v4 se declaran con `@custom-variant`. El `2xs` no se usa en ningún sitio.
- **`darkMode: "class"`**, que en v4 se expresa como `@custom-variant dark`.
- **Las variables de color** `hsl(var(--x))`, que pasan al bloque `@theme`.
- **Tres plugins que se pueden eliminar sin más**: `tailwind-scrollbar-hide` y `tailwindcss-animate` no se usan en ninguna clase, y `@tailwindcss/typography` **nunca estuvo activo** — el `require("tailwindcss-animate", "@tailwindcss/typography")` pasa el segundo nombre como argumento ignorado, no como plugin.

Un detalle a resolver durante la migración: `tailwind.config.js` declara **`keyframes` y `animation` dos veces** en el mismo objeto. La segunda definición gana, así que las animaciones `grow` y `shrink` **hoy no existen**, pese a que `animate-grow` se usa una vez en el código.

El sitio es estático, lo que reduce mucho la explotabilidad de los vectores reflejados, así que puede esperar — pero no indefinidamente.

### 🟡 A-3 · Configuración

| Problema | Detalle |
|---|---|
| `tsconfig.json` con rutas erróneas | `"paths": { "@/*": ["/src/*"] }` e `"include": ["/src"]` usan rutas **absolutas del sistema de archivos**; deberían ser `./src/*` y `./src` |
| `@types/react` desalineado | Declarado `^19.0.2`, pero React instalado es **18.3.1** |
| `react` y `react-dom` sin declarar | Solo llegan como *peer dependencies* de `@astrojs/react` |
| `import { Astro } from "astro"` | `MainLayout.astro:2` — `astro` no exporta `Astro`; import inútil |
| Archivos huérfanos | `atoms/Text.tsx`, `atoms/icons/Fire.jsx` |
| Sin linter ni CI | No hay ESLint, Prettier ni `.github/workflows/` |

### 🟡 A-4 · Rendimiento e imágenes

- Ninguna imagen pasa por `astro:assets`; todas viven en `public/` sin optimización, sin WebP/AVIF y sin `srcset`.
- 15 `<img>` sin `width`/`height`, lo que provoca desplazamiento de layout al cargar.
- Solo 2 de 15 imágenes usan `loading="lazy"`.
- El tema se aplica **después** de hidratar React (`Navbar.jsx:75`), mientras `MainLayout` fuerza `class="dark"` en el servidor. Quien tenga el tema claro guardado ve un destello oscuro.

---

## 5. Estado de las pruebas

```
Test Files  9 passed | 1 failed (10)
     Tests  93 passed | 1 failed (94)
```

El único fallo es `npm audit no reporta vulnerabilidades altas ni críticas`, que es el hallazgo A-2 y depende de la migración a Astro 7. Detalle en [TESTING.md](./TESTING.md).

Conviene subrayar qué significa que esa prueba siga en rojo: **no es una prueba defectuosa, es el hallazgo abierto haciéndose notar en cada ejecución.** Es su función.

---

## 6. Plan de acción

### Ahora

1. **Rotar la contraseña de `wordpress/.env`** y el acceso SSH en cualquier servicio donde se hayan reutilizado. Es lo único de esta lista con exposición real hacia fuera.

### Esta semana

2. **Migrar a Astro 7 + `@astrojs/vercel@11` + Tailwind v4.** Cierra las 5 vulnerabilidades altas y el último test en rojo. El inventario de lo que hay que tocar está en A-2.
3. Corregir las rutas de `tsconfig.json` y alinear `@types/react` con el React instalado.

### Este mes

4. Migrar las imágenes a `astro:assets` con dimensiones explícitas.
5. Mover el script de tema a un bloque inline en `MainLayout` para eliminar el parpadeo.
6. Añadir `404.astro`, ESLint, Prettier y un workflow de CI que ejecute `npm test`.

---

## 7. Lo que está bien

- **El build es rápido y limpio** — 6 páginas en ~30 s, sin errores.
- **El SEO está bien pensado**: Open Graph, Twitter Cards y JSON-LD dinámico según el tipo de página, y desde esta ronda los canonicals y los encabezados son coherentes.
- **El responsive funciona de verdad**: verificado a 375 px sin desbordamiento horizontal.
- **Los bundles son razonables**: el mayor pesa 137 kB (44 kB con gzip).
- **Ninguna imagen carece de `alt`.**
- **El endpoint de contacto está bien defendido** para lo que es: validación, honeypot, límite por IP, escapado de HTML y neutralización de cabeceras, todo cubierto por pruebas y verificado en producción.
- **La organización por atomic design** hace el código fácil de recorrer.
