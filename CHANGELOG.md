# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> 📌 **Nota**: A partir de la versión `0.1.0` se retomó el registro de cambios tras una serie de mejoras acumuladas.

## [Unreleased]

### Removed
- **WordPress retirado por completo**: eliminados 3 310 archivos del núcleo (110 MB) tras dar de baja el hosting. El repositorio pasa de 3 393 archivos versionados a 93.
- Eliminado todo el código que consumía la API de WordPress: `lib/fetchPosts.ts`, `molecules/BlogPosts.tsx`, `organisms/Blog.jsx` y `pages/_blog.astro`.
- Eliminada la integración con Notion, que nunca llegó a usarse: `scripts/notion.ts` y `pages/_notion.astro`.
- Eliminada la infraestructura de Docker (`docker-compose.yml`, ambos `Dockerfile`) y los scripts de despliegue (`deploy.sh`, `deploy.sh.save`): Vercel despliega con el push.
- Desinstaladas 15 dependencias sin usar: `swiper`, `aos`, `gsap`, `@notionhq/client`, `marked`, `shiki`, `usehooks-ts`, `@react-spring/web`, `@svgr/webpack`, `astro-icon`, `@iconify-json/lucide` y los tres paquetes de FontAwesome. Las dependencias de producción bajan de 28 a 17.
- Eliminados los archivos huérfanos `src/assets/js/script.js` y `content/SOP.md`.

### Added
- **Blog sobre Content Collections**: los artículos son archivos Markdown en `src/content/blog/`, validados contra un esquema en `src/content.config.ts`. Sin base de datos ni API; un frontmatter inválido hace fallar el build en lugar de publicar una página rota.
- Nueva página índice `/blog`, enlazada desde el navbar y el pie.
- **Endpoint de contacto serverless** en `src/pages/api/contact.ts`, con envío vía Resend, validación en servidor, honeypot, límite de 3 envíos por IP cada 10 minutos, neutralización de saltos de línea en el asunto y escapado de HTML.
- Adaptador `@astrojs/vercel` para ejecutar bajo demanda solo las rutas que lo declaran; el resto del sitio sigue siendo estático.
- `@astrojs/sitemap`: `/sitemap-index.xml` se genera en cada build.
- `vercel.json` con cinco cabeceras de seguridad: CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`.
- `frontend/.env.example` documentando las variables necesarias.
- Soporte de enlaces a otras páginas en el navbar mediante el campo `path`, sin romper el scrollspy de las secciones de la home.
- Suite de pruebas automatizadas con **Vitest**, **happy-dom** y **Testing Library** (94 pruebas): unitarias, de componentes, de integración contra el sitio construido y de seguridad del repositorio.
- Scripts `test`, `test:watch`, `test:unit`, `test:integration`, `test:security` y `audit` en `frontend/package.json`.
- Carpeta `docs/` con la documentación técnica: informe de estado, informe de seguridad y estrategia de pruebas.

### Changed
- `ContactForm` apunta a `/api/contact` en lugar del antiguo `send_email.php`, incluye el honeypot y muestra el mensaje de error que devuelve el servidor.
- `.gitignore` reescrito. Los patrones anteriores (`./.env`) **no coincidían con nada** — el prefijo `./` no es válido en gitignore, y por eso los archivos de entorno acabaron versionados.
- `package-lock.json` pasa a versionarse: los builds son reproducibles.
- La salida del build se mueve a `dist/client` por el adaptador de Vercel; el arnés de pruebas de integración sirve ese directorio con un servidor propio, ya que el adaptador no soporta `astro preview`.

### Fixed
- Añadido `rel="noopener noreferrer"` a los cuatro enlaces externos del pie.
- La página `/blog` declara un `<h1>` propio en lugar del `<h2>` de `TitleSection`.
- Corrección de efecto no deseado en la transición de scroll.

### Security
- 🔴→✅ Retirados del control de versiones los cinco archivos que publicaban credenciales de producción (`wordpress/wp-config.php`, `wordpress/.env`, `.env`, `docker-compose.yml`, `deploy.sh.save`), junto con la causa raíz: los patrones inválidos del `.gitignore`.
- 🔴→✅ Eliminado `wordpress/info.php`, que exponía `phpinfo()`. No queda ningún archivo PHP en el repositorio.
- 🔴→✅ Resuelta la vulnerabilidad crítica de *prototype pollution* en `swiper` (GHSA-hmx5-qpq5-p643) al desinstalar el paquete, que no se usaba.
- 🟠→✅ Eliminados los siete puntos de inyección de HTML sin sanear procedentes de WordPress.
- 🟡→✅ Añadidas las cabeceras de seguridad que faltaban.
- 🟡→✅ Formulario de contacto con protección anti-abuso, cubierta por pruebas.
- 🟠 **Pendiente**: `astro`, `sharp` y `path-to-regexp` con avisos de severidad alta. Se intentó subir a Astro 7 y se revirtió: arrastra una migración a Tailwind v4 que necesita su propia sesión.
- 🟡 **Requiere acción manual**: las credenciales siguen en el historial de Git. El servidor ya no existe, pero si esa contraseña se reutilizó en otro servicio, sigue comprometida.

### Known issues
Documentados en `docs/ESTADO-DEL-PROYECTO.md`, aún sin corregir:
- La hidratación de React falla en la home por un `<a>` anidado dentro de otro `<a>` en `Carousel.jsx`.
- `<button>` anidado dentro de `<button>` en `Course.jsx`.
- `key={project.id}` sobre datos sin campo `id` en `projectData.ts`.
- Canonicals inconsistentes (`www` frente a sin `www`) y título duplicado en la home.
- `/maintenance` usa el layout antiguo, sin metadatos.
- `<main>` y `<h1>` duplicados; 15 imágenes sin dimensiones explícitas.
- `public/curso.png` pesa 3,3 MB y se usa como imagen de Open Graph.

---
## [0.2.0] - 2025-04-10

### Added
- Integración de CMS Headless con WordPress para mostrar artículos del blog.
- Implementación de sección de blog dinámico consumiendo la API REST de WordPress.
- Sección de CV descargable incluida en el sitio web.
- Componente `BlogCard` para renderizar artículos con diseño limpio y adaptable.

### Changed
- Ajustado el layout principal para incluir navegación hacia la sección de blog y CV.
- Mejorada la experiencia visual del blog con estilos responsivos y soporte para modo oscuro.
- Configuraciones de fetch actualizadas para consumir correctamente los datos desde WordPress.

### Fixed
- Corrección de errores de formato de fecha con `date-fns` y localización en español.
- Solucionado problema donde no se reflejaban cambios de WordPress por URLs estáticas.

---
## [0.1.0] - 2025-04-09

### Added
- Configuración de contenedor con `Dockerfile` y `Dockerfile.dev`.
- Archivo `docker-compose.yml` para entorno de desarrollo.
- Sección de pantallazos en el README.
- Estructura detallada del proyecto en README.
- Ignorados `_astro`, `dist`, `.vscode` en `.gitignore`.

### Changed
- Refactorizada la estructura de carpetas bajo `src/`.
- Mejorado el archivo `README.md` con nuevas secciones y estilo.

### Fixed
- Corrección en las rutas de puertos para servir correctamente el sitio en Docker.

---

## [0.0.1] - 2024-12-25

### Added
- Initial project setup with basic structure and dependencies.

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None
