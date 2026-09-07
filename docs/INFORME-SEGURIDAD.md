# Informe de seguridad — yamid.dev

**Última actualización:** 6 de septiembre de 2026
**Punto de partida auditado:** commit `38876ec`

> Este documento **no reproduce ningún valor secreto**. Las credenciales se identifican por su ubicación. El propio documento vive en un repositorio público.

---

## Resumen

| Severidad | Al auditar | Ahora |
|---|---|---|
| 🔴 Crítica | 3 | **0** |
| 🟠 Alta | 3 | **1** |
| 🟡 Media | 4 | **1** |
| 🔵 Baja | 3 | **1** |

La retirada de WordPress cerró la mayor parte de los hallazgos: sin CMS no hay base de datos, ni panel de administración, ni PHP, ni contenido de terceros que sanear. Lo que quedaba de secretos se sacó del control de versiones y las dependencias se podaron.

**Queda un punto abierto que solo tú puedes cerrar** (reutilización de contraseñas) y una deuda técnica de dependencias que necesita su propia sesión.

---

## Lo que queda abierto

### 🟠 SEC-A · Vulnerabilidades altas en dependencias

```
astro  <= 7.0.9  (instalada 5.18.2)     →  8 avisos de XSS y SSRF
sharp  < 0.35.0  (instalada 0.34.5)     →  CVE-2026-33327/33328/35590/35591
path-to-regexp  (vía @astrojs/vercel@9) →  GHSA-9wv6-86v2-598j
```

Las tres se resuelven subiendo a **Astro 7** con `@astrojs/vercel@11`. Se intentó y se revirtió: `@astrojs/tailwind` solo soporta Astro 3, 4 y 5, así que la subida arrastra una migración a **Tailwind v4** que toca los seis breakpoints personalizados del proyecto y requiere verificación visual completa.

El sitio es estático, lo que reduce mucho la explotabilidad de los vectores reflejados. **Es deuda, no urgencia** — pero conviene planificarla.

### 🟡 SEC-B · Contraseña reutilizada (requiere acción tuya)

La contraseña de la base de datos estuvo publicada en un repositorio público durante meses, junto con las credenciales SSH del servidor. El servidor ya no existe, así que **esas credenciales concretas ya no abren nada**.

**El riesgo residual es la reutilización.** Si esa contraseña —o una variante reconocible— protege hoy cualquier otro servicio, sigue comprometida: está indexada, clonada y probablemente en más de un conjunto de datos de credenciales filtradas.

**Es el único punto de este informe que no puede cerrarse desde el código.** Paso a paso:

1. **Identifica la contraseña.** Si no la recuerdas: `git show 38876ec:wordpress/.env`.
2. **Búscala en tu gestor de contraseñas.** La mayoría tienen un informe de «contraseñas reutilizadas» o permiten buscar por valor.
3. **Cámbiala en cada servicio donde aparezca**, empezando por el correo: quien controla el correo recupera todo lo demás.
4. **Revisa el acceso SSH.** Si ese par usuario/servidor sigue vivo en otra máquina, cambia su contraseña o —mejor— pásalo a autenticación por clave pública y desactiva el acceso por contraseña.
5. **Activa 2FA** donde puedas, empezando por GitHub y el correo.

> **Rotar es la mitigación, no purgar el historial.** El repositorio tiene un *fork*, y un fork conserva sus propios objetos: GitHub no los borra al reescribir el historial del original. Lo que ya se copió, copiado está.

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
> Y ten presente su límite: **este repositorio tiene 1 fork**, cuyos objetos sobreviven a la reescritura del original. Purgar reduce el tamaño del clon y limpia la vista, pero **no retira las credenciales de circulación**. Por eso la acción que de verdad cierra el riesgo es rotarlas (SEC-B), no esto.

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
