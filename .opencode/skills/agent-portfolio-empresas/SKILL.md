---
name: agent-portfolio-empresas
description: Guía de estructura, copy, case studies técnicos, estilo y SEO para la vertiente de yamid.dev orientada a POSTULARSE A EMPRESAS (reclutadores, tech leads, hiring managers). Activar SIEMPRE que se cree o edite la home técnica, la página de proyectos con detalle de arquitectura, el CV descargable, la sección "Ahora" o los enlaces a GitHub/demos. NO usar para la vertiente comercial freelance — ver `agent-portfolio-clientes`.
---

# Portafolio para postularse a empresas — yamid.dev

> **Stack:** Astro 7 + islas React 18 + Tailwind v4. Para maquetación, breakpoints, a11y y animación, aplicar primero `agent-frontend`.
> **Audiencia:** dos lectores en secuencia. Primero un reclutador que escanea en segundos desde el celular; después un tech lead que abre el repo y busca criterio.
> **Métrica de éxito:** entrevistas, no likes.

---

## 1. Principio rector

En 2026 cualquiera puede generar un CV impecable con IA. Lo que ya no se puede fingir es **evidencia de trabajo real**: proyectos desplegados, mantenidos y documentados, con decisiones que solo puede defender quien las tomó.

La regla que ordena todo el sitio:

> Todo lo que afirmes debe tener a un clic la prueba que lo sostiene.

Corolario: **una lista de tecnologías no prueba nada.** Un enlace a un sistema en producción con su repo, su README y su registro de decisiones, sí.

---

## 2. Estructura y orden de secciones (home técnica)

| # | Sección | Función | Regla dura |
|---|---|---|---|
| 1 | **Hero** | Identificación en 6 s | Rol + stack principal + ubicación/disponibilidad. Sin adjetivos |
| 2 | **Ahora** | Actividad reciente | Fechado. Qué estás construyendo/estudiando este mes |
| 3 | **Proyectos** | Evidencia | 3–5 máximo. Cada uno con demo viva + repo + write-up |
| 4 | **Stack** | Escaneo del reclutador | Agrupado por dominio y por nivel de uso real. Sin barras de porcentaje |
| 5 | **Experiencia** | Contexto | Cronológica, breve, con resultado por entrada |
| 6 | **Formación / comunidad** | Trayectoria | SENA, UNAD, Chitagá Tech, JAC. Corto |
| 7 | **Contacto + CV** | Acción | Correo protegido, LinkedIn, GitHub, CV en PDF |

**Regla de las 3 evidencias:** cada proyecto listado debe tener los tres enlaces. Si falta uno, el proyecto no va en la home.

1. Demo en vivo funcionando
2. Repositorio público con commits legibles
3. Write-up técnico propio

**Sección "Ahora" — no negociable.** Un bloque corto y fechado en la parte alta:

> *Septiembre 2026 — Construyendo el módulo de inventario de Marvy Shopmarket; estudiando Ingeniería de Sistemas en la UNAD; abierto a roles backend/full-stack remotos.*

Un "Ahora" desactualizado es peor que no tenerlo: prueba que el sitio está muerto. Si no lo vas a actualizar cada mes, no lo pongas.

---

## 3. Copy, tono y mensajes clave

**Tono:** preciso, sobrio, sin marketing. Escribe como escribirías un buen mensaje de commit: qué, por qué, con qué consecuencia.

### Fórmula del hero

```
[Rol concreto] · [3–4 tecnologías reales] · [ubicación / modalidad]
Una línea de contexto verificable.
```

- ❌ "Desarrollador apasionado por crear experiencias digitales increíbles"
- ✅ "Desarrollador full-stack — Node.js, TypeScript, React, Astro. Colombia, remoto. Construyo y mantengo sistemas en producción para negocios reales."

### Reglas de escritura

- **Verbo + objeto + consecuencia.** "Migré el guardado de sesión a SQLite; eliminó las reconexiones manuales tras cada reinicio."
- Prohibidas: *apasionado, autodidacta motivado, siempre aprendiendo, amante del código limpio*. No aportan información.
- Menciona los errores. "Se cayó en producción por X; lo detecté con Y; el fix fue Z" es el párrafo más creíble de un portafolio.
- Nada de "nivel: 85 %". El nivel se demuestra con el proyecto, no se declara.

### Cómo agrupar el stack

Por uso real, con honestidad calibrada:

- **En producción:** Node.js, TypeScript, React, Astro, SQLite, Docker
- **En proyectos personales:** Python, Flask, MySQL, Flutter
- **Explorando:** [lo que sea cierto este mes]

---

## 4. Formato de case study (técnico)

Escrito para que un tech lead pueda hacerte preguntas sobre él en una entrevista, y para que puedas responderlas.

### Estructura obligatoria

```markdown
# [Nombre del sistema] — [qué resuelve en una línea]

**Rol:** [qué hiciste tú exactamente] · **Estado:** [en producción desde… / archivado]
**Enlaces:** Demo viva · Repositorio · [Registro de decisiones]

## Contexto y restricciones
Para quién, con qué límites reales (presupuesto, conectividad, hardware,
plazo, usuarios sin experiencia técnica). Las restricciones son las que
hacen interesantes las decisiones.

## Arquitectura
Diagrama o descripción del flujo. Qué habla con qué.

## Tres decisiones y su porqué
La sección más importante del documento. Para cada una:
- La decisión
- Las alternativas que descartaste
- El criterio que las separó
- El costo que aceptaste a cambio

## Qué falló
Un problema real en operación: cómo lo detectaste, cómo lo diagnosticaste,
el commit que lo arregló. Con enlace al commit.

## Qué haría distinto hoy
Demuestra que el proyecto siguió vivo en tu cabeza después de entregarlo.
```

### Reglas

- **"Lo construí" no basta. "Lo desplegué y lo mantengo" es el estándar.** Indica desde cuándo está en operación.
- Al menos un proyecto debe mostrar el ciclo completo: diseño → despliegue → incidente → corrección.
- Los proyectos deben cubrir dominios distintos, no repetir el mismo CRUD tres veces.
- Sin clones de tutorial. Sin apps de tareas, clima o calculadora.
- El README del repo importa tanto como la página: propósito, cómo correrlo, decisiones. Un repo sin README anula la evidencia.

**Pool disponible en yamid.dev:** automatización de WhatsApp con Baileys (sistema propio en operación), Marvy Shopmarket (dominio de negocio real, en desarrollo desde 2023), QRTa (SaaS multi-tenant), sistema de censo de la JAC (datos y gobernanza comunitaria), Krysion Fit (cliente externo). Elegir por **profundidad demostrable**, no por cantidad.

---

## 5. CTAs, conversión y SEO

En esta vertiente la "conversión" es que te escriban o te agenden.

| Ubicación | Acción | Regla |
|---|---|---|
| Hero | Ver proyectos | Lleva a la evidencia, no a "sobre mí" |
| Fin de cada proyecto | Demo / Repo | Ambos, siempre visibles |
| Header y footer | Contacto · GitHub · LinkedIn | Persistente, sin scroll obligatorio |
| Contacto | Formulario + CV en PDF | El PDF debe estar fechado en el nombre del archivo |

### Reglas técnicas

- Correo protegido: formulario o correo ofuscado. Nunca `mailto:` en crudo.
- CV descargable: `yamid-[apellido]-cv-2026-09.pdf`. Un CV sin fecha se lee como viejo.
- Todos los enlaces de demo verificados periódicamente. Un demo caído (404, servicio dormido, dominio vencido) es peor que no listarlo — sugiere abandono.
- Analítica ligera (Plausible / Umami) para saber qué proyecto miran.
- Datos de GitHub en vivo si se muestran; una captura de contribuciones envejece y se nota.

### SEO

- `<title>`: "Yamid [Apellido] — Desarrollador Full-Stack Node.js / React". Nombre + rol + stack.
- Página propia por proyecto, indexable, con URL estable. Es lo que compartes en una postulación.
- JSON-LD `Person` con `sameAs` hacia GitHub y LinkedIn.
- Open Graph por proyecto: al compartir el enlace en un chat de reclutamiento, la tarjeta debe verse bien.
- **Rendimiento como argumento:** si tu portafolio de frontend carga lento, ya diste una respuesta técnica. LCP < 2.5 s en 4G.

---

## 6. Estilo visual

**Principio:** el diseño debe demostrar criterio, no llamar la atención. La regla es *contenido legible primero, personalidad después*.

- **Legibilidad sobre efecto.** Si una animación retrasa la lectura del nombre y el rol, se va.
- **Densidad media.** Más información por pantalla que en la vertiente comercial: el reclutador está escaneando, no leyendo.
- **Tipografía:** una familia sans para interfaz y una monoespaciada para código, stack y datos técnicos. La mono es señal de dominio cuando se usa con propósito, no de decoración.
- **Color:** neutro dominante con un acento. El dark mode aquí sí es de primera clase; muchos revisores técnicos lo prefieren.
- **Código real visible** en los write-ups, con resaltado de sintaxis, no capturas de código en imagen (no se copia, no se indexa, no es accesible).
- **Diagramas** propios y simples para arquitectura. Un diagrama honesto vale más que tres párrafos.
- **Móvil obligatorio:** los reclutadores filtran desde el celular. Si rompe en móvil, es un mal indicio precisamente para un puesto de frontend.

---

## 7. Errores que descalifican

Cada uno de estos anula el efecto del resto del sitio:

- Proyectos de tutorial presentados como propios.
- Enlace de demo roto.
- "Ahora" o CV con fecha de hace más de seis meses.
- Barras de porcentaje de habilidad.
- Lista de 25 tecnologías sin proyecto que respalde ninguna.
- Repos públicos sin README ni commits legibles.
- Texto genérico de "sobre mí" que no dice nada verificable.
- Portafolio que se rompe en móvil.

---

## 8. Criterios de aceptación

Abre el sitio en incógnito y ponte un cronómetro de 2 minutos:

- [ ] Un desconocido sabe **qué haces** en menos de 6 segundos.
- [ ] Los 3–5 proyectos tienen demo viva + repo + write-up, los tres funcionando.
- [ ] Al menos un proyecto documenta un incidente real y su corrección, con enlace al commit.
- [ ] El bloque "Ahora" tiene fecha del mes en curso.
- [ ] El CV en PDF descarga y su nombre incluye año y mes.
- [ ] No hay `mailto:` ni barras de porcentaje en el HTML.
- [ ] LCP < 2.5 s en throttling 4G (DevTools → Lighthouse).
- [ ] Probado a 360 px, 768 px y 1280 px sin desbordamiento horizontal.

```bash
cd frontend && npm run build && npx vitest run
```

```js
// Enlaces externos de proyecto sin verificar → revisar a mano
[...document.querySelectorAll('a[href^="http"]')]
  .map(a => a.href)
  .forEach(u => console.log('Verificar manualmente:', u));

console.assert(
  !document.body.innerHTML.includes('mailto:'),
  'Error: hay un mailto: expuesto en la página'
);
```