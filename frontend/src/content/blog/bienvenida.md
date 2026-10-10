---
title: "Migración del blog de WordPress a Markdown"
description: "Motivos y funcionamiento de la migración de los artículos de WordPress a archivos Markdown dentro del repositorio."
date: 2026-09-06
category: "Desarrollo"
draft: false
---

Durante un tiempo, este blog obtenía sus artículos de una instalación de WordPress en modo *headless*: durante la compilación, Astro los solicitaba a la API REST de WordPress y generaba una página por cada uno.

El esquema funcionaba, pero exigía mantener un servidor, respaldar una base de datos, actualizar el núcleo de WordPress y vigilar su superficie de ataque, todo ello para publicar contenido de texto.

## Funcionamiento actual

Cada artículo es un archivo Markdown en `src/content/blog/`. Astro lo valida contra un esquema, lo convierte en HTML durante la compilación y genera una página estática. No intervienen base de datos ni API, de modo que no hay servicios que puedan fallar en tiempo de ejecución.

Publicar un artículo consiste en añadir un archivo al repositorio y ejecutar `git push`.

## Formato de un artículo

El nombre del archivo determina la URL: `mi-articulo.md` se publica en `/blog/mi-articulo`.

El encabezado (*frontmatter*) se valida durante la compilación:

- `title` y `description` son obligatorios.
- `date` sigue el formato `YYYY-MM-DD`.
- `category` e `image` son opcionales.
- `draft: true` excluye el artículo del sitio publicado.

Si falta un campo obligatorio o su tipo es incorrecto, la compilación se detiene con un mensaje de error en lugar de publicar una página defectuosa.
