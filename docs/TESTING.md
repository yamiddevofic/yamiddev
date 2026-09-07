# Estrategia de pruebas

Antes de la auditoría del 6 de septiembre de 2026 el proyecto **no tenía ninguna prueba**. Hoy son **94**, repartidas en cuatro niveles.

---

## Herramientas

| Herramienta | Uso |
|---|---|
| [Vitest](https://vitest.dev) 3 | Ejecutor de pruebas (comparte la configuración de Vite con Astro) |
| [happy-dom](https://github.com/capricorn86/happy-dom) | DOM en Node para las pruebas de componentes |
| [Testing Library](https://testing-library.com) | Consultas orientadas al usuario, no a la implementación |
| `@testing-library/user-event` | Interacciones realistas (escribir, hacer clic) |

Las pruebas de integración declaran `// @vitest-environment node`: hacen peticiones HTTP reales y el `fetch` de happy-dom las bloquearía por CORS.

---

## Comandos

```bash
cd frontend

npm test                  # toda la suite
npm run test:watch        # modo interactivo durante el desarrollo
npm run test:unit         # unitarias y de componentes (rápido, sin build)
npm run test:integration  # build + pruebas contra el sitio generado
npm run test:security     # solo la auditoría de secretos y dependencias
```

`test:integration` ejecuta `astro build` y sirve `dist/client` con un servidor estático propio en el puerto `4488` — configurable con `PREVIEW_PORT`. No usa `astro preview` porque el adaptador de Vercel no lo soporta; el servidor replica su resolución de rutas (`/ruta` → `/ruta/index.html`, y `404` si no existe).

---

## Estructura

```
frontend/tests/
├── setup.ts                     # matchers de jest-dom + limpieza entre pruebas
├── unit/                        # lógica pura
│   ├── utils.test.ts            # cn(): fusión de clases de Tailwind
│   ├── projectData.test.ts      # invariantes de los datos de proyectos
│   ├── coursesData.test.ts      # invariantes de los datos del curso
│   ├── blog.test.ts             # frontmatter y slugs de los artículos
│   └── contact.test.ts          # endpoint /api/contact (Resend simulado)
├── components/                  # componentes React con Testing Library
│   ├── Carousel.test.tsx        # render, enlaces externos, alt, validez del DOM
│   └── ContactForm.test.tsx     # etiquetas, envío, honeypot, estados de error
└── integration/                 # contra dist/client y el repositorio real
    ├── paths.ts                 # resolución de rutas compartida
    ├── server.ts                # servidor estático que emula a Vercel
    ├── pages.test.ts            # rutas, marcado semántico, metadatos SEO
    ├── assets.test.ts           # peso de bundles e imágenes, fuga de secretos
    └── security.test.ts         # secretos versionados y npm audit
```

---

## Qué cubre cada nivel

**Unitarias** — comportamiento aislado y determinista: fusión de clases de Tailwind, invariantes de los datos estáticos, formato del frontmatter de cada artículo, y el endpoint de contacto al completo con Resend simulado.

**De componentes** — lo que ve y hace una persona: que los campos del formulario estén etiquetados y sean obligatorios, que el honeypot esté oculto y viaje en el envío, que el estado de éxito limpie el formulario y el de error conserve lo escrito y muestre el mensaje del servidor, y que el carrusel renderice una tarjeta por proyecto con `alt` y `rel` correctos.

**De integración** — el sitio realmente construido: cada ruta responde `200`, las inexistentes `404`, cada página tiene un solo `<main>` y un solo `<h1>`, sin `<a>` anidados, con `title`/`description`/`canonical` coherentes, sitemap publicado, ningún bundle por encima de 200 kB, ninguna imagen por encima de 1 MB y ningún secreto en `dist/`.

**De seguridad** — higiene del repositorio: que no haya `.env` ni `wp-config.php` versionados, que ningún archivo lleve contraseñas literales, que no quede ningún PHP ni script `.save`, que `.env.example` no traiga valores reales, y que `npm audit` no reporte severidad alta ni crítica.

### El endpoint de contacto, en detalle

`tests/unit/contact.test.ts` importa el handler `POST` y lo invoca con peticiones reales, sustituyendo Resend por un espía. Verifica que:

- Envía el correo con datos válidos y usa el correo del visitante como `replyTo`.
- Rechaza correos mal formados, campos vacíos y mensajes que superan el límite.
- Descarta en silencio lo que caiga en el honeypot, **sin llamar a Resend**.
- Neutraliza los saltos de línea del asunto (inyección de cabeceras).
- Escapa el HTML del mensaje (`<script>` sale como `&lt;script&gt;`).
- Aplica el límite de 3 envíos por IP y responde `429` al cuarto.
- Responde `500` si faltan variables de entorno y `502` si Resend rechaza el envío.

---

## Resultado de la última ejecución

**7 de septiembre de 2026, tras corregir el formulario, el marcado y el SEO:**

```
Test Files  9 passed | 1 failed (10)
     Tests  93 passed | 1 failed (94)
```

Evolución:

| | Al auditar | Tras retirar WordPress | Ahora |
|---|---|---|---|
| Pruebas totales | 68 | 94 | 94 |
| En verde | 49 | 82 | **93** |
| En rojo | 19 | 12 | **1** |

### El fallo que queda

| Prueba que falla | Hallazgo |
|---|---|
| `npm audit sin vulnerabilidades altas ni críticas` | [A-2](./ESTADO-DEL-PROYECTO.md) — requiere subir a Astro 7 y migrar a Tailwind v4 |

No es una prueba defectuosa: es el hallazgo abierto haciéndose notar en cada ejecución, que es justo su función. Se pondrá en verde sola cuando se haga la migración.

### Lo que se puso en verde en esta ronda

Once pruebas, agrupadas por lo que las arreglaba:

| Corrección | Pruebas que apagó |
|---|---|
| El CTA del Carousel pasa de `<a>` a `<span>` | `Carousel › no anida un <a> dentro de otro <a>`, `/ no anida <a> dentro de <a>` |
| Cada proyecto declara un `id` | `projectData › cada proyecto tiene un id único` |
| `Hero` y `Maintenance` dejan de emitir su propio `<main>` | `/ tiene un único <main>`, `/comunidad/ tiene un único <main>`, `/maintenance/ tiene un único <main>` |
| El `<h1>` de `AboutMe` pasa a `<h2>`; `/curso` declara el suyo | `/ tiene un único <h1>`, `/curso/ tiene un único <h1>` |
| Canonicals unificados en `www.yamid.dev` | `los canonical usan siempre el mismo host` |
| `MainLayout` deja de duplicar el nombre del sitio | `el title de la home no repite el nombre del sitio` |
| `/maintenance` migrada a `MainLayout` | `/maintenance/ tiene title, description y canonical` |
| `curso.png` (3,3 MB) sustituida por `curso.jpg` (132 kB) | `ninguna imagen pública supera 1 MB` |

### Un cambio de transporte que tocó las pruebas

Las pruebas del formulario construían peticiones `application/x-www-form-urlencoded`. El endpoint pasó a JSON para esquivar el `403` de `security.checkOrigin`, así que el helper `peticion()` de `contact.test.ts` y las aserciones de `ContactForm.test.tsx` se actualizaron en consecuencia. Siguen siendo 18 pruebas y siguen cubriendo lo mismo.

---

## Verificaciones manuales realizadas

| Comprobación | Resultado |
|---|---|
| `astro build` | ✅ 6 páginas en ~30 s, sin errores |
| `/blog` y `/blog/bienvenida` en el navegador | ✅ Renderizan con el diseño original conservado |
| Consola del navegador en `/` | ✅ sin errores de hidratación (A-1 corregido) |
| Consola del navegador en `/curso` | ✅ sin `<button>` anidado |
| Viewport móvil (375 × 812) | ✅ sin desbordamiento horizontal |
| `git ls-files` en busca de secretos | ✅ nada |
| Sitemap generado en el build | ✅ `/sitemap-index.xml` |
| Envío real por `/api/contact` en producción | ✅ `200 {"status":"success"}` |
| Cabeceras de seguridad en producción | ✅ las 5 de `vercel.json` |

---

## Próximos pasos

1. Subir a Astro 7 y migrar a Tailwind v4: es lo único que separa a la suite del verde completo.
2. Añadir un workflow de CI que ejecute `npm test` en cada push.
3. Ampliar la cobertura de componentes: `Navbar` (tema, scrollspy y el nuevo enlace de página), `Course` (paginación y modal de clase bloqueada), `Technology`.
4. Considerar Playwright para recorridos completos y regresión visual.
