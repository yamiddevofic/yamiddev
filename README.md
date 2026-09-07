# 🌐 Portafolio Web de Yamid Horacio Rodríguez

Código fuente de mi sitio personal, en producción en **[yamid.dev](https://www.yamid.dev/)**. Reúne mi trayectoria, proyectos, el curso *Pensar en Código*, el blog y formas de contacto.

![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

Sitio estático servido desde Vercel, sin base de datos ni servidores que mantener. La única ruta dinámica es el endpoint del formulario de contacto.

---

## ✨ Secciones

| Sección | Ruta |
|---|---|
| Inicio — hero, proyectos, sobre mí, tecnologías, contacto | `/` |
| Blog | `/blog` · `/blog/[slug]` |
| Curso «Pensar en Código» | `/curso` |
| Comunidad | `/comunidad` |
| Mantenimiento | `/maintenance` |

Diseño responsivo, modo claro/oscuro persistente, metadatos Open Graph y Twitter Cards, JSON-LD dinámico según el tipo de página y sitemap generado en cada build.

---

## 🛠 Stack

**Frontend** · [Astro 7](https://astro.build/) con islas de [React 18](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) y [Lucide](https://lucide.dev/)
**Contenido** · [Content Collections](https://docs.astro.build/en/guides/content-collections/) — los artículos son Markdown validado por esquema
**Correo** · [Resend](https://resend.com/) desde una función serverless
**Pruebas** · [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) + happy-dom
**Despliegue** · [Vercel](https://vercel.com/) detrás de [Cloudflare](https://www.cloudflare.com/)

---

## 🚀 Puesta en marcha

```bash
git clone https://github.com/yamiddevofic/yamiddev.git
cd yamiddev/frontend
npm install
cp .env.example .env    # rellena las variables si vas a probar el formulario
npm run dev
```

Disponible en **<http://localhost:4321>**.

### Variables de entorno

Solo las necesita `/api/contact`. El resto del sitio funciona sin ellas.

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de [Resend](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Dirección que recibe los mensajes |
| `CONTACT_FROM_EMAIL` | Remitente; debe pertenecer a un dominio verificado en Resend |

En producción se configuran en **Vercel → Settings → Environment Variables**. Sin ellas, el endpoint responde `500`.

---

## 📜 Scripts

Todos se ejecutan desde `frontend/`.

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción |
| `npm test` | Toda la suite de pruebas |
| `npm run test:watch` | Pruebas en modo interactivo |
| `npm run test:unit` | Solo unitarias y de componentes (rápido) |
| `npm run test:integration` | Build + pruebas contra el sitio generado |
| `npm run test:security` | Auditoría de secretos y dependencias |
| `npm run audit` | `npm audit` filtrado a severidad alta o superior |

> `npm run preview` no funciona con el adaptador de Vercel. Para probar el build, usa `npm run test:integration` o la CLI de Vercel.

---

## ✍️ Publicar un artículo

Crea un archivo `.md` en `frontend/src/content/blog/`. **El nombre del archivo es la URL**: `mi-articulo.md` se publica en `/blog/mi-articulo`.

```markdown
---
title: "Título del artículo"
description: "Resumen de una o dos frases, usado en la tarjeta y en los metadatos."
date: 2026-09-06
category: "Desarrollo"        # opcional
image: "/images/mi-post.jpg"  # opcional, ruta dentro de public/
draft: false                  # true lo mantiene fuera del sitio publicado
---

El contenido va aquí, en Markdown.
```

El frontmatter se valida contra el esquema de `src/content.config.ts`. Si falta un campo o tiene el tipo equivocado, **el build falla con un mensaje claro** en lugar de publicar una página rota.

Publicar es hacer `git push`.

---

## 🧪 Pruebas

94 pruebas en cuatro niveles: unitarias, de componentes, de integración contra el sitio construido y de seguridad del repositorio.

```bash
cd frontend && npm test
```

> **107 de 107 en verde.** Detalle en [`docs/TESTING.md`](./docs/TESTING.md).

---

## 📁 Estructura

```plaintext
yamiddev/
├── docs/                     # 📄 Documentación técnica y auditorías
│   ├── ESTADO-DEL-PROYECTO.md
│   ├── INFORME-SEGURIDAD.md
│   └── TESTING.md
├── frontend/
│   ├── public/               # Imágenes y CV, servidos desde la raíz
│   ├── src/
│   │   ├── components/       # Atomic design: atoms · molecules · organisms · ui
│   │   ├── content/blog/     # ✍️ Artículos en Markdown
│   │   ├── layouts/          # MainLayout.astro (principal) · Layout.astro
│   │   ├── lib/              # Datos estáticos y utilidades
│   │   ├── pages/            # Rutas del sitio + api/contact.ts
│   │   └── styles/           # Estilos globales
│   ├── tests/                # Suite de Vitest
│   │   ├── unit/
│   │   ├── components/
│   │   └── integration/
│   ├── astro.config.mjs
│   ├── content.config.ts     # Esquema de la colección de blog
│   ├── vitest.config.ts
│   └── .env.example
├── vercel.json               # Cabeceras de seguridad
├── CHANGELOG.md
└── README.md
```

---

## 📚 Documentación

| Documento | Contenido |
|---|---|
| [`docs/ESTADO-DEL-PROYECTO.md`](./docs/ESTADO-DEL-PROYECTO.md) | Estado actual: arquitectura, cambios aplicados, hallazgos abiertos y plan de acción |
| [`docs/INFORME-SEGURIDAD.md`](./docs/INFORME-SEGURIDAD.md) | Auditoría de seguridad: qué se resolvió, qué queda y cómo cerrarlo |
| [`docs/TESTING.md`](./docs/TESTING.md) | Estrategia de pruebas y resultado de la última ejecución |
| [`CHANGELOG.md`](./CHANGELOG.md) | Historial de cambios ([Keep a Changelog](https://keepachangelog.com/) + [SemVer](https://semver.org/)) |

---

## 🤝 Contribuir

1. Crea una rama desde `main`.
2. Ejecuta `npm test` antes de abrir un PR — no introduzcas fallos nuevos.
3. Registra los cambios relevantes en `CHANGELOG.md`, en `[Unreleased]`.
4. **Nunca commitees secretos.** Usa `.env` locales y mantén la plantilla en `.env.example`.

---

## 📬 Contacto

¿Hablamos de tecnología, colaboración o un proyecto?
[LinkedIn](https://www.linkedin.com/in/yamiddevofic/) · [GitHub](https://github.com/yamiddevofic) · [X](https://x.com/yamiddevofic)

---

## 🧠 Nota

Este proyecto está en constante evolución, al igual que mis habilidades como desarrollador. ¡Gracias por visitarlo y ser parte del camino!
