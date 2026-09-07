---
title: "El blog vuelve, ahora sin base de datos"
description: "Por qué migré los artículos de WordPress a archivos Markdown dentro del propio repositorio, y qué gano con ello."
date: 2026-09-06
category: "Desarrollo"
draft: false
---

Durante un tiempo este blog se alimentó de una instalación de WordPress en modo *headless*: Astro pedía los artículos a su API REST durante el build y generaba una página por cada uno.

Funcionaba, pero traía consigo un servidor que mantener, una base de datos que respaldar, un núcleo que actualizar y una superficie de ataque que vigilar. Todo eso para publicar texto.

## Lo que hace ahora

Cada artículo es un archivo Markdown en `src/content/blog/`. Astro lo valida contra un esquema, lo convierte en HTML durante el build y genera la página estática. No hay base de datos, no hay API, no hay nada que se caiga a las tres de la mañana.

Publicar es escribir un archivo y hacer `git push`.

## Cómo escribir uno nuevo

Crea un archivo `.md` en `src/content/blog/`. El nombre del archivo será la URL: `mi-articulo.md` se publica en `/blog/mi-articulo`.

Arriba va el *frontmatter*, que Astro valida al construir:

- `title` y `description` son obligatorios.
- `date` en formato `YYYY-MM-DD`.
- `category` e `image` son opcionales.
- `draft: true` lo mantiene fuera del sitio publicado.

Si algo falta o tiene el tipo equivocado, el build falla con un mensaje claro en lugar de publicar una página rota.
