# CLAUDE.md

**Las reglas de este repo están en [AGENTS.md](./AGENTS.md). Léelo primero: es la fuente de verdad.**

Resumen de lo que más se incumple por descuido:

- **Nunca commitees en `main`.** Trabaja en rama; el merge lo hace Yamid.
- **`git push ssh <rama>`**, no `origin` (está por HTTPS y falla pidiendo credenciales).
- **No digas "terminado"** hasta verificarlo en el preview de Vercel.
- **Los docs van en un commit aparte** del cambio de código.

Este archivo solo añade lo específico de trabajar aquí con Claude Code.

---

## `npm install` está bloqueado

Instalar, desinstalar o actualizar paquetes lo bloquea el clasificador de permisos. No insistas ni busques rodeos: prepara los cambios de configuración que dependan de ello, pasa el comando a Yamid en un bloque `bash` y continúa con lo que no dependa de la instalación.

Al terminar él, verifica con `npm ls <paquete>` que quedó lo que esperabas antes de seguir.

## El directorio de trabajo persiste entre comandos

El shell **mantiene el `cwd` de una llamada a la siguiente**. Un `cd frontend` en un comando afecta a todos los siguientes, y entonces `ls frontend/vercel.json` busca `frontend/frontend/vercel.json` y responde que no existe.

Eso ya provocó un diagnóstico entero equivocado. **Usa rutas absolutas** cuando compruebes la existencia de archivos, o abre el comando con `cd /home/yamiddevofic/Projects/yamiddev`.

## Verificar en el navegador: mide, no mires

La regla 2 de AGENTS.md exige comprobar en un navegador cualquier cambio visual. Hazlo con `mcp__Claude_Browser__*`, y ten presente que **las capturas engañan**: el panel es estrecho, los viewports emulados se escalan y una captura tomada justo después de un `resize` sale con el tamaño anterior.

Lo que sí es concluyente:

```js
// Levanta un servidor sobre el build y mide propiedades computadas
getComputedStyle(el).paddingTop   // "56px", no "se ve bien"
matchMedia('(min-width:320px) and (max-width:359px)').matches
document.documentElement.scrollWidth > window.innerWidth   // desbordamiento
```

Así se encontró que el reset de CSS anulaba el `padding` de todo el sitio: la captura parecía correcta.

Para servir el build:

```bash
cd /home/yamiddevofic/Projects/yamiddev/frontend/dist/client && (python3 -m http.server 4321 >/dev/null 2>&1 &)
```

Recuerda pararlo al terminar y devolver el viewport con `resize_window` a `preset: "desktop"`.

## Comparar CSS antes y después de un cambio de estilos

Si tocas Tailwind o `global.css`, guarda el CSS generado antes del cambio en el scratchpad, reconstruye y compara **conjuntos de clases**, no bytes. El tamaño puede bajar legítimamente (v4 no duplica entre bundles) sin que falte nada.

Compara desescapando los selectores con Python; construir a mano el selector escapado de una clase como `xs:py-[3.5rem]` falla en silencio y da falsos negativos.

## Verificaciones que valen la pena aquí

```bash
cd /home/yamiddevofic/Projects/yamiddev/frontend
npm audit --json | python3 -c "import json,sys; print(json.load(sys.stdin)['metadata']['vulnerabilities'])"
npm ci --dry-run          # ¿el lockfile satisface package.json? Es lo que corre Vercel
```

Para producción, `curl` con `?cb=$(date +%s)` — Cloudflare cachea y sin eso mides una respuesta vieja. Comprobar que un deploy llegó se hace buscando el hash del CSS nuevo en el HTML servido, no esperando un tiempo fijo.
