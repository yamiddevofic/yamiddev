# Instrucciones para agentes — yamid.dev

Portafolio personal de Yamid: **Astro 7** estático con islas de **React 18** y **Tailwind v4**, desplegado en **Vercel detrás de Cloudflare**. La única ruta dinámica es `/api/contact`, que corre como función serverless.

Todo el código, los comentarios, la documentación y los mensajes de commit van **en español**.

---

## Las cinco reglas

### 1. Nunca commitees en `main`

`main` despliega a producción. Trabaja siempre en una rama:

```bash
git checkout -b fix/descripcion-corta
```

Puedes hacer push de tu rama —eso genera un preview en Vercel—, pero **el merge a `main` lo hace Yamid**. No lo hagas tú, ni siquiera con la suite en verde.

> **El remoto que funciona es `ssh`, no `origin`.** `origin` está configurado por HTTPS y falla pidiendo credenciales. Usa `git push ssh <rama>`.

### 2. No digas "terminado" hasta verificarlo en el preview

En este orden, y sin saltarte pasos:

```bash
cd frontend
npm run build          # sin errores
npx vitest run         # 94/94 en verde
```

Si el cambio toca **estilos, marcado o comportamiento en pantalla**, además ábrelo en un navegador y **mide**: propiedades computadas, no capturas. Comprueba a ancho móvil y de escritorio.

Después haz push de la rama, espera el deploy de preview de Vercel y **verifica ahí el resultado** antes de avisar.

Esto no es ceremonia. Dos fallos graves de este proyecto —el formulario devolviendo `403` a todos los visitantes, y un reset de CSS que anulaba el `padding` de todo el sitio— **pasaron el build y los tests sin una sola queja**. Solo aparecieron midiendo el sitio real.

### 3. Arregla lo trivial, reporta lo demás

Si te cruzas con algo roto **de una línea y en un archivo que ya estás tocando** —un `rel="noopener"` que falta, un import muerto, un typo— arréglalo y menciónalo.

Todo lo demás se reporta y espera decisión: refactorizar un componente, migrar un sistema, **cambiar cualquier dependencia**.

### 4. La documentación se actualiza en un commit aparte

Si tu cambio deja falso algo de `docs/` —un conteo de tests, un hallazgo que cierras, una versión— corrígelo. Pero **en un commit separado**, para que el historial de código quede limpio:

```
fix: arreglar el marcado invalido del carousel
docs: reflejar el arreglo del carousel
```

Los documentos vivos son `docs/ESTADO-DEL-PROYECTO.md`, `docs/TESTING.md` y `docs/INFORME-SEGURIDAD.md`.

### 5. Leer producción es libre; escribir, no

**Sin preguntar:** peticiones de lectura a producción, cabeceras, logs, métricas, y POST deliberadamente inválidos para probar validaciones (no tienen efecto).

**Pide permiso antes de:** enviar un correo de prueba por el formulario, escribir en cualquier servicio externo, o tocar configuración de Vercel.

---

## Comandos

```bash
cd frontend
npm run dev            # desarrollo
npm run build          # build de producción
npx vitest run         # la suite completa (94 pruebas)
npx vitest run tests/unit/contact.test.ts    # un archivo suelto
```

Las pruebas de integración leen `dist/`, así que **reconstruye antes de ejecutarlas** si cambiaste código que afecte al HTML generado.

---

## Trampas de este proyecto

Cosas que ya costaron un diagnóstico. No las redescubras.

### `vercel.json` va en `frontend/`, no en la raíz

El **Root Directory** del proyecto en Vercel es `frontend/`, porque ahí vive el `package.json`. Vercel solo lee el `vercel.json` de su root directory: el de la raíz del repo **se ignora en silencio**.

El síntoma es engañoso —el sitio despliega perfectamente, pero sin ninguna cabecera de seguridad—, así que si las cabeceras no aparecen, mira primero dónde está el archivo.

### El endpoint de contacto habla JSON a propósito

`src/pages/api/contact.ts` espera `application/json`. **No lo cambies a `application/x-www-form-urlencoded`.**

Astro activa por defecto `security.checkOrigin`, que rechaza con `403` las peticiones con `Content-Type` de formulario cuyo `Origin` no coincide con el host que ve el servidor. Detrás de Cloudflare y Vercel esa comparación nunca cuadra, y el formulario devolvía `403` a todos los visitantes.

JSON esquiva esa comprobación sin perder la defensa: un formulario HTML no puede enviar `application/json` a otro origen sin un preflight CORS que este endpoint no responde.

### El reset de CSS tiene que estar dentro de `@layer base`

En `src/styles/global.css`, el bloque `* { margin: 0; padding: 0 }` está envuelto en `@layer base`. **Debe seguir así.**

Tailwind v4 emite sus utilidades en `@layer utilities`, y en CSS una regla **sin capa gana a cualquier regla dentro de una**, sin importar la especificidad. Si ese reset sale de la capa, anula el `padding` y el `margin` de todo el sitio —y ni el build ni los tests lo detectan.

### Tailwind v4: la configuración vive en el CSS

No hay `tailwind.config.js` ni `postcss.config.js`. Todo está en `src/styles/global.css`:

- `@custom-variant dark` para el tema por clase
- `@custom-variant xs|ls|ms|ss|s` para los **breakpoints de rango cerrado** (aplican solo dentro de su franja, no de ahí hacia arriba). Se usan unas 180 veces: si tocas sus límites, rompes el responsive entero.
- `@theme` para colores, radios y animaciones

`bg-opacity-*` no existe en v4. La opacidad va con barra: `bg-white/50`.

### El dominio canónico lleva `www`

`yamid.dev` responde `307` hacia `https://www.yamid.dev`. Los canonical y `astro.config.mjs` usan la forma con `www`; mantenlo así.

### El override de `path-to-regexp` es necesario

`package.json` fuerza `path-to-regexp@^6.3.0` mediante `overrides`. No lo quites: `@vercel/routing-utils` la declara con versión exacta vulnerable, y sin el override `npm audit` vuelve a reportar una alta.

---

## Estilo

**Commits:** Conventional Commits en español, con el cuerpo sin tildes.

```
fix: arreglar el formulario de contacto y el HTML anidado invalido

Explica QUE fallaba y POR QUE se eligio esta solucion, no solo que
archivos cambiaron. El diff ya dice lo segundo.
```

**Comentarios en código:** escasos, pero cuando algo es contraintuitivo, explica el porqué. El proyecto tiene varias decisiones que parecen errores hasta que se lee la razón —el JSON del endpoint, el reset dentro de `@layer`—; esas merecen su comentario.

**Componentes:** atomic design en `src/components/` (`atoms`, `molecules`, `organisms`, `ui`).
