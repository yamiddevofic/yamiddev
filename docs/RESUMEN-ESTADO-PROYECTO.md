# Resumen del estado del proyecto — yamid.dev

## Estado general

`yamid.dev` es un portafolio personal construido como sitio estático con Astro, React y Tailwind. El proyecto se encuentra en un estado funcional y saneado:

- WordPress fue retirado completamente.
- No quedan servidores, bases de datos ni contenedores que mantener.
- El blog funciona mediante Markdown versionado en el repositorio.
- El formulario de contacto opera como función serverless.
- Las vulnerabilidades críticas y altas documentadas fueron corregidas.
- Las cabeceras de seguridad están activas en producción.
- La suite documentada tiene 107 pruebas en verde.
- El repositorio está limpio y la rama actual es `feat/vertiente-empresas`.

El estado documentado más reciente corresponde al commit `a1c2da5`, contrastado contra producción el 7 de septiembre de 2026.

## Conformación técnica

- Astro 7.
- React 18 para componentes interactivos mediante islas.
- Tailwind CSS 4 integrado como plugin de Vite.
- TypeScript y JavaScript/JSX coexistiendo en los componentes.
- Organización basada en atomic design: `atoms`, `molecules`, `organisms` y `ui`.

### Estructura principal

```text
yamiddev/
├── docs/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── content/blog/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── styles/
│   ├── tests/
│   ├── content.config.ts
│   ├── astro.config.mjs
│   ├── vercel.json
│   └── .env.example
├── CHANGELOG.md
└── README.md
```

### Rutas actuales

- `/`
- `/clientes`
- `/blog/`
- `/blog/[slug]/`
- `/comunidad/`
- `/curso/`
- `/maintenance/`
- `/api/contact`

La rama actual incluye dos vertientes de posicionamiento: una comercial para captar clientes y otra técnica orientada a empresas, reclutadores y responsables técnicos.

## Despliegue

```text
Usuario
  ↓
Cloudflare
  ↓
Vercel
  ├── Sitio estático generado por Astro
  └── Función serverless /api/contact
```

Aspectos importantes:

- El `Root Directory` de Vercel es `frontend/`.
- El archivo válido de configuración es `frontend/vercel.json`.
- El dominio canónico es `https://www.yamid.dev`.
- `yamid.dev` redirige hacia `www.yamid.dev`.
- Astro genera el sitio estático.
- La única ruta dinámica es `/api/contact`.
- No hay Docker, WordPress, MySQL ni scripts de despliegue propios que mantener.
- Un `git push` genera el despliegue correspondiente en Vercel.

## Contenido y blog

Los artículos están en `frontend/src/content/blog/` y se validan mediante `src/content.config.ts`. Si el frontmatter no cumple el esquema, el build falla en lugar de publicar una página incompleta.

Esta solución proporciona:

- Menor superficie de ataque.
- Builds reproducibles.
- Sin dependencia de una API externa.
- Contenido versionado junto al código.
- Validación automática de los artículos.

## Formulario de contacto

El endpoint está en `frontend/src/pages/api/contact.ts` y utiliza Resend. Requiere estas variables de entorno:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

El cuerpo se envía como `application/json` deliberadamente. No debe cambiarse a `application/x-www-form-urlencoded`, porque Astro puede rechazar las peticiones de formulario con `403` detrás de Cloudflare y Vercel.

Defensas implementadas:

- Validación de campos en servidor.
- Límites de longitud.
- Honeypot mediante `website`.
- Límite de tres envíos por IP cada diez minutos.
- Neutralización de saltos de línea en el asunto.
- Escapado del contenido HTML.
- Uso del correo del visitante como `replyTo`.
- Errores genéricos para no filtrar configuración interna.

El rate limit se almacena en memoria de la función serverless. Reduce ráfagas mientras la instancia está caliente, pero no cubre ataques distribuidos. Si el spam se convierte en un problema, debería migrarse a Vercel KV, Upstash Redis u otra solución persistente.

## Seguridad

La migración eliminó la mayor parte de los riesgos históricos:

- Se retiró WordPress y todo el código PHP.
- Se eliminaron credenciales operativas del árbol actual.
- Se eliminaron Dockerfiles y scripts antiguos de despliegue.
- Se eliminó `swiper`, que introducía una vulnerabilidad crítica.
- Se actualizaron Astro y `sharp`.
- Se fijó `path-to-regexp` mediante `overrides`.
- Se añadió una política CSP y otras cabeceras de seguridad.
- Se añadió un sitemap.
- Se corrigieron enlaces externos sin `rel`.

No debe eliminarse este bloque de `frontend/package.json`:

```json
"overrides": {
  "path-to-regexp": "^6.3.0"
}
```

Las credenciales antiguas siguen siendo recuperables desde el historial público de Git, aunque el riesgo se considera cerrado porque la cuenta de Hostinger fue cancelada, WordPress ya no existe y no se reutilizan esas credenciales. Si el contexto cambia, deberán reemplazarse.

## Testing

La infraestructura de pruebas utiliza Vitest, happy-dom, Testing Library y `@testing-library/user-event`.

La suite cubre:

- Utilidades y datos estáticos.
- Frontmatter y slugs del blog.
- Endpoint y formulario de contacto.
- Componentes React.
- Rutas generadas y marcado semántico.
- Metadatos SEO y sitemap.
- Pesos de bundles e imágenes.
- Fuga de secretos y dependencias vulnerables.

Resultado documentado más reciente:

```text
Test Files  10 passed
Tests       107 passed
```

Comandos principales:

```bash
cd frontend
npm run build
npm test
npm run test:unit
npm run test:integration
npm run test:security
```

Las pruebas de integración requieren reconstruir el proyecto porque trabajan contra `dist/client`.

## Pendientes técnicos

### Configuración

- Corregir las rutas absolutas de `tsconfig.json` para que sean relativas.
- Alinear `@types/react` con React 18.
- Declarar explícitamente `react` y `react-dom` como dependencias directas.
- Eliminar el import inútil de `Astro` en `MainLayout.astro`.
- Revisar los posibles archivos huérfanos `atoms/Text.tsx` y `atoms/icons/Fire.jsx`.

### Herramientas de calidad

- Añadir ESLint.
- Añadir Prettier.
- Añadir CI en `.github/workflows/` para ejecutar las pruebas en cada push.
- Considerar un hook de pre-commit con gitleaks.

### Rendimiento visual

- Migrar imágenes a `astro:assets`.
- Añadir dimensiones explícitas a las imágenes.
- Considerar WebP/AVIF y `srcset`.
- Revisar el uso de `loading="lazy"`.
- Mover la aplicación del tema a un script inline en `MainLayout` para evitar el destello inicial oscuro.

### Cobertura futura

Ampliar pruebas para `Navbar`, cambio de tema, scrollspy, `Course`, paginación, modal de clase bloqueada y `Technology`. También se puede considerar Playwright para recorridos completos y regresión visual.

## Reglas que deben respetarse

### Tailwind v4

La configuración vive principalmente en `frontend/src/styles/global.css`. No utilizar `bg-opacity-*`; usar la sintaxis de barra, por ejemplo `bg-white/50`.

El reset global debe permanecer dentro de `@layer base`. Moverlo fuera puede anular los márgenes y paddings de las utilidades de Tailwind.

### Vercel y dominio

- No mover `vercel.json` a la raíz.
- Mantener `frontend/` como Root Directory.
- Utilizar siempre `https://www.yamid.dev` en canonicals y configuración de Astro.

### Flujo de trabajo

- No trabajar directamente sobre `main`.
- No hacer merge a `main`.
- Trabajar en ramas.
- Usar el remoto `ssh`, no `origin`.
- Antes de considerar un cambio terminado, ejecutar build, pruebas y verificación visual cuando corresponda.
- Después del push, comprobar el preview de Vercel.

## Inconsistencias de la documentación

La documentación original necesita una actualización separada:

1. `docs/README.md` todavía describe el proyecto como Astro, React y WordPress headless.
2. `docs/TESTING.md` comienza indicando 94 pruebas, aunque después registra correctamente 107.
3. `docs/INFORME-SEGURIDAD.md` conserva al final recomendaciones antiguas sobre subir a Astro 7 y un `npm audit` fallido.
4. `docs/ESTADO-DEL-PROYECTO.md` indica seis rutas, pero el checkout actual incluye también `/clientes`.
5. Las fechas y commits documentados no están completamente alineados.

## Conclusión

El proyecto está técnicamente saludable para continuar su evolución. La deuda principal ya no está relacionada con WordPress, vulnerabilidades graves o infraestructura, sino con documentación, CI, configuración de TypeScript, alineación de dependencias, optimización de imágenes y cobertura adicional de interfaz.

La prioridad inmediata debería ser mantener la documentación coherente con la rama y el código actuales, especialmente durante el desarrollo de la vertiente orientada a empresas.
