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

**6 de septiembre de 2026, tras la retirada de WordPress:**

```
Test Files  5 failed | 5 passed (10)
     Tests  12 failed | 82 passed (94)
```

Evolución desde la auditoría inicial:

| | Al auditar | Ahora |
|---|---|---|
| Pruebas totales | 68 | 94 |
| En verde | 49 | **82** |
| En rojo | 19 | **12** |

> **La suite sigue en rojo a propósito.** Cada fallo reproduce un defecto documentado y funciona como lista de verificación de la remediación.

### Los 12 fallos y su causa

| Prueba que falla | Hallazgo |
|---|---|
| `Carousel › no anida un <a> dentro de otro <a>` | [A-1](./ESTADO-DEL-PROYECTO.md) — fallo de hidratación de React |
| `/ no anida <a> dentro de <a>` | [A-1](./ESTADO-DEL-PROYECTO.md) |
| `projectData › cada proyecto tiene un id único` | [A-6](./ESTADO-DEL-PROYECTO.md) — `key={project.id}` sobre datos sin `id` |
| `/ tiene un único <main>` · `/comunidad/ tiene un único <main>` | [A-3](./ESTADO-DEL-PROYECTO.md) — landmark duplicado |
| `/ tiene un único <h1>` · `/curso/ tiene un único <h1>` | [A-3](./ESTADO-DEL-PROYECTO.md) — jerarquía de encabezados |
| `/maintenance/ tiene title, description y canonical` | [A-4](./ESTADO-DEL-PROYECTO.md) — layout antiguo sin metadatos |
| `los canonical usan siempre el mismo host` | [A-4](./ESTADO-DEL-PROYECTO.md) — mezcla de `www` y sin `www` |
| `el title de la home no repite el nombre del sitio` | [A-4](./ESTADO-DEL-PROYECTO.md) |
| `ninguna imagen pública supera 1 MB` | [A-5](./ESTADO-DEL-PROYECTO.md) — `curso.png` pesa 3,3 MB |
| `npm audit sin vulnerabilidades altas ni críticas` | [SEC-A](./INFORME-SEGURIDAD.md#-sec-a--vulnerabilidades-altas-en-dependencias) — requiere Astro 7 |

### Lo que se puso en verde

Con la retirada de WordPress y la reconstrucción del contacto pasaron a verde 7 pruebas que antes fallaban: las cinco de higiene de secretos, la del sitemap y la de metadatos del blog. Además se añadieron 26 nuevas, todas en verde: el endpoint de contacto (11), la colección de blog (6), el honeypot y el mensaje de error del formulario (2), y las rutas del blog (7).

---

## Verificaciones manuales realizadas

| Comprobación | Resultado |
|---|---|
| `astro build` | ✅ 6 páginas en ~34 s, sin errores |
| `/blog` y `/blog/bienvenida` en el navegador | ✅ Renderizan con el diseño original conservado |
| Consola del navegador en `/` | ❌ 7 errores de React por la hidratación (A-1) |
| Consola del navegador en `/curso` | ❌ `<button>` dentro de `<button>` |
| Viewport móvil (375 × 812) | ✅ sin desbordamiento horizontal |
| `git ls-files` en busca de secretos | ✅ nada |
| Sitemap generado en el build | ✅ `/sitemap-index.xml` |

---

## Próximos pasos

1. Corregir los defectos hasta que la suite quede en verde.
2. Añadir un workflow de CI que ejecute `npm test` en cada push.
3. Ampliar la cobertura de componentes: `Navbar` (tema, scrollspy y el nuevo enlace de página), `Course` (paginación y modal de clase bloqueada), `Technology`.
4. Considerar Playwright para recorridos completos y regresión visual una vez estabilizada la hidratación.
