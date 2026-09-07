# Informe de seguridad — yamid.dev

**Última actualización:** 6 de septiembre de 2026
**Punto de partida auditado:** commit `38876ec`

> Este documento **no reproduce ningún valor secreto**. Las credenciales se identifican por su ubicación. El propio documento vive en un repositorio público.

---

## Resumen

| Severidad | Al auditar | Ahora |
|---|---|---|
| 🔴 Crítica | 3 | **0** |
| 🟠 Alta | 3 | **0** |
| 🟡 Media | 4 | **0** |
| 🔵 Baja | 3 | **0** |

La retirada de WordPress cerró la mayor parte de los hallazgos: sin CMS no hay base de datos, ni panel de administración, ni PHP, ni contenido de terceros que sanear. Lo que quedaba de secretos se sacó del control de versiones y las dependencias se podaron.

Los dos últimos puntos se cerraron el 7 de septiembre de 2026: las vulnerabilidades de dependencias con la subida a Astro 7, y el de credenciales tras comprobar que no se reutilizan en ningún otro servicio.

**`npm audit` no reporta hoy ninguna vulnerabilidad, de ninguna severidad.**

---

## Los últimos en cerrarse

### ✅ SEC-A · Vulnerabilidades altas en dependencias

**Resuelto.** Las tres cadenas quedaron así:

| Paquete | Antes | Ahora |
|---|---|---|
| `astro` | 5.18.2 | **7.3.1** — XSS en `define:vars` |
| `sharp` | 0.34.5 | **0.35.4** — CVE de libvips |
| `path-to-regexp` | 6.1.0 | **6.3.0** — GHSA-9wv6-86v2-598j |

`path-to-regexp` necesitó un `overrides` en `package.json`: `@vercel/routing-utils` la declara con versión exacta, así que subir `@astrojs/vercel` a la 11 no bastaba. npm proponía en su lugar *bajar* el adaptador a la 8, que habría sido un retroceso.

Subir el framework obligó a migrar a **Tailwind v4**, porque `@astrojs/tailwind` solo soporta Astro 3, 4 y 5. El detalle de esa migración está en [ESTADO-DEL-PROYECTO.md](./ESTADO-DEL-PROYECTO.md).

### ✅ SEC-B · Credenciales en el historial (evaluado y cerrado)

Las credenciales de `wordpress/.env` y `.env` siguen siendo recuperables del historial de Git, y el repositorio es público. **El riesgo se evaluó y está cerrado**, porque las tres condiciones que lo mantenían vivo no se cumplen:

| Condición | Estado |
|---|---|
| ¿El servidor sigue existiendo? | No. La cuenta de Hostinger está cancelada |
| ¿La base de datos sigue en pie? | No. Se retiró WordPress por completo |
| ¿Esas contraseñas se reutilizan en otros servicios? | No. Confirmado por Yamid el 7 de septiembre de 2026 |

Sin reutilización y sin servidor, esas credenciales no abren nada: son cadenas de texto sin destino.

Queda anotado por si el contexto cambia: **si alguna vez se levanta un servicio con alguno de esos usuarios o contraseñas, seguirían siendo públicas** y habría que elegir otras. No es una acción pendiente, es una condición a no violar.

### ✅ SEC-C · Enlaces externos sin `rel`

**Resuelto.** Los `target="_blank"` de `AboutMe.jsx` (×2) y `comunidad.astro` ya declaran `rel="noopener noreferrer"`; el de `Carousel.jsx` y los del pie ya lo tenían. Los navegadores modernos aplican `noopener` por defecto, pero ser explícito protege también en los que no.

---

## Lo que se resolvió

### ✅ SEC-01 · Credenciales de producción en repositorio público

**Era:** `wordpress/wp-config.php`, `wordpress/.env`, `.env`, `docker-compose.yml` y `deploy.sh.save` publicaban credenciales de MySQL, los ocho salts de WordPress y los accesos SSH de Hostinger.

**Ahora:** los cinco archivos están fuera del control de versiones. `git ls-files` no devuelve ningún `.env`, ningún `wp-config.php`, ningún `.php` y ningún `.save`. La configuración se declara en `frontend/.env.example`, sin valores reales.

**Causa raíz corregida:** el `.gitignore` anterior usaba `./.env` y `./frontend/.env`. **El prefijo `./` no es válido en gitignore: esos patrones no coincidían con nada.** Ahora son `**/.env` y `**/.env.*`, con excepción explícita para `.env.example`.

> ⚠️ **Los valores siguen en el historial de Git.** Como el servidor ya no existe, no hay nada que rotar, pero el historial sigue siendo público. Ver [Purgar el historial](#purgar-el-historial-opcional).

### ✅ SEC-02 · `phpinfo()` expuesto

`wordpress/info.php` desapareció con el resto del árbol de WordPress. No queda ningún archivo PHP en el repositorio, y hay una prueba que lo verifica.

### ✅ SEC-03 · Prototype pollution en `swiper` (crítica)

`swiper` no se importaba en ningún archivo del proyecto. Se desinstaló junto con otros diez paquetes sin usar. **Cero vulnerabilidades críticas.**

### ✅ SEC-05 · XSS desde contenido de WordPress

Los siete puntos que inyectaban HTML sin sanear desaparecieron con `BlogPosts.tsx` y `Blog.jsx`. El detalle de artículo sigue usando `set:html`, pero ahora recibe **Markdown del propio repositorio**, procesado por Astro en tiempo de build: el contenido solo puede venir de un commit tuyo.

### ✅ SEC-06 · CORS abierto en la API REST

Desapareció con `wp-config.php`. No hay API que exponer.

### ✅ SEC-07 · Formulario de contacto sin protección

**Era:** un `POST` a un `send_email.php` no versionado, sin CAPTCHA, sin límite de peticiones y sin validación auditable. Y desde la migración a Vercel, directamente roto (`403`).

**Ahora:** `src/pages/api/contact.ts`, una función serverless con:

| Defensa | Implementación |
|---|---|
| Validación en servidor | Todos los campos, con límites de longitud (nombre 100, correo 254, asunto 150, mensaje 5000) |
| Honeypot | Campo oculto `website`; si viene relleno responde `200` sin enviar, para no informar al bot |
| Límite por IP | 3 envíos cada 10 minutos, en memoria, con poda perezosa del mapa |
| Inyección de cabeceras | Los saltos de línea del asunto se colapsan a espacios |
| XSS en el correo | El contenido se escapa antes de componer el HTML |
| Fuga de configuración | Si faltan variables de entorno responde `500` genérico y registra el detalle solo en el servidor |

Las once defensas están cubiertas por pruebas en `tests/unit/contact.test.ts`, incluidas la inyección de cabeceras y el escapado de HTML.

> El límite por IP vive en memoria: frena ráfagas mientras la instancia serverless esté caliente, pero **no detiene un ataque distribuido**. Si el spam llega a ser un problema, hay que moverlo a Vercel KV o Upstash Redis.

### ✅ SEC-08 · WordPress desactualizado

No hay WordPress.

### ✅ SEC-09 · Sin cabeceras de seguridad

`vercel.json` añade, sobre todas las rutas:

```
Content-Security-Policy    default-src 'self'; frame-ancestors 'none'; …
X-Content-Type-Options     nosniff
X-Frame-Options            DENY
Referrer-Policy            strict-origin-when-cross-origin
Permissions-Policy         camera=(), microphone=(), geolocation=(), interest-cohort=()
```

HSTS ya venía de Cloudflare. La CSP permite `fonts.googleapis.com` y `fonts.gstatic.com` para las tipografías, y YouTube para los vídeos del curso.

> La CSP incluye `'unsafe-inline'` en `script-src` porque Astro emite scripts inline para hidratar las islas. Endurecerlo requiere nonces o hashes; es una mejora futura, no un bloqueo.

### ✅ SEC-10 · `.gitignore` con patrones inválidos

Corregido — ver SEC-01.

### ✅ SEC-13 · Núcleo de WordPress versionado

3 310 archivos y 110 MB eliminados. El repositorio pasó de 3 393 archivos versionados a **93**.

---

## Purgar el historial (opcional)

Las credenciales siguen siendo recuperables del historial de Git. Como el servidor al que daban acceso ya no existe, esto **ya no es contención de un incidente**: es higiene, con un beneficio práctico añadido — el clon del repositorio baja de ~110 MB a unos pocos.

```bash
pip install git-filter-repo

git filter-repo --path wordpress --path .env --path deploy.sh.save --invert-paths

git push origin --force --all
git push origin --force --tags
```

> ⚠️ Reescribir el historial es destructivo e invalida todos los clones y forks. **Haz una copia de seguridad del repositorio antes.**
>
> Y ten presente su límite: **este repositorio tiene 1 fork**, cuyos objetos sobreviven a la reescritura del original, así que purgar **no retira nada de circulación**. Dado que las credenciales ya no dan acceso a nada (ver SEC-B), esto es solo higiene y ahorro de tamaño — no hay ninguna urgencia detrás.

---

## Recomendaciones pendientes

- **Activar el escaneo de secretos** de GitHub (Settings → Code security → Secret scanning). Es gratuito en repositorios públicos y habría detectado esto el día uno.
- **Añadir un hook de pre-commit** con [gitleaks](https://github.com/gitleaks/gitleaks).
- **Ejecutar `npm run test:security` en CI**: la suite verifica que no se vuelvan a versionar `.env`, archivos PHP, contraseñas literales ni scripts `.save`.
- **Planificar la subida a Astro 7 + Tailwind v4** para cerrar SEC-A.

---

## Verificación

```bash
cd frontend && npm run test:security
```

De las siete comprobaciones, **seis pasan**. La única que falla es `npm audit`, por SEC-A.
