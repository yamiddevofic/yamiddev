---
name: agent-portfolio-clientes
description: Guía de estructura, copy, case studies, estilo y conversión para la vertiente de yamid.dev orientada a CAPTAR CLIENTES (freelance / proyectos a medida). Activar SIEMPRE que se cree o edite la home comercial, la página de servicios, un case study de cliente, la sección de precios/proceso, testimonios o cualquier CTA de contacto. NO usar para la vertiente de postulación a empresas — ver `agent-portfolio-empresas`.
---

# Portafolio para captar clientes — yamid.dev

> **Stack:** Astro 7 + islas React 18 + Tailwind v4. Para maquetación, breakpoints, a11y y animación, aplicar primero `agent-frontend`.
> **Audiencia:** dueño de negocio, emprendedor o coordinador que necesita resolver un problema y evaluar si vale la pena pagar.
> **Métrica de éxito:** contactos calificados, no visitas.

---

## 1. Principio rector

El visitante no está evaluando tu código. Está respondiendo tres preguntas en este orden:

1. ¿Esto es para mí? (encaje)
2. ¿Funciona de verdad? (prueba)
3. ¿Qué hago ahora? (acción)

Cada sección de la página existe para responder una de esas tres. Si una sección no responde ninguna, se elimina.

**Regla de lenguaje:** el copy describe **resultados**, no tareas. "Desarrollo web con React" es un commodity. "Sistemas de gestión para negocios que todavía llevan las cuentas en cuaderno" es una oferta.

---

## 2. Estructura y orden de secciones (home comercial)

Orden obligatorio. El orden es la estrategia: encaje → prueba → acción.

| # | Sección | Función | Regla dura |
|---|---|---|---|
| 1 | **Hero** | Encaje en 5 segundos | Titular con *para quién* + *qué resultado*. Un solo CTA primario |
| 2 | **Problema / dolor** | Reconocimiento | 3 dolores concretos en lenguaje del cliente, no técnico |
| 3 | **Servicios** | Oferta acotada | Máx. 3–4 servicios. Más de 4 = "hace de todo" = no experto |
| 4 | **Case studies** | Prueba | 2–3 destacados con resultado visible en la tarjeta |
| 5 | **Proceso** | Reducción de riesgo | 4–5 pasos nombrados. Elimina el miedo al freelance desorganizado |
| 6 | **Prueba social** | Confianza | Testimonios, logos, o comunidad/rol público si aún no hay testimonios |
| 7 | **Sobre mí** | Humanizar | Corto. Foto real. Ubicación. Nada de "apasionado por la tecnología" |
| 8 | **FAQ** | Objeciones | Precio, tiempos, soporte post-entrega, propiedad del código |
| 9 | **CTA final** | Cierre | Repetición del CTA primario, con fricción mínima |

**Prohibido en esta vertiente:** grid de logos de tecnologías como sección principal, gráfica de "nivel de habilidad" en porcentajes, timeline de estudios, contador de commits.

---

## 3. Copy, tono y mensajes clave

**Tono:** cercano y directo, en español neutro con giros colombianos naturales. Tuteo. Cero jerga técnica en las secciones 1–3.

### Fórmula del titular del hero

```
[Resultado concreto] para [segmento específico] — [diferenciador o restricción creíble]
```

- ❌ "Desarrollador Full Stack | React · Node · Astro"
- ✅ "Software a la medida para negocios de Norte de Santander que ya no caben en el Excel"

### Traducción obligatoria: tarea → resultado

| Lenguaje técnico (❌) | Lenguaje de cliente (✅) |
|---|---|
| API REST con Node.js y MongoDB | Tu inventario actualizado en tiempo real desde el celular |
| Automatización con Baileys | Pedidos que entran por WhatsApp y caen solos al sistema |
| Panel administrativo en React | Ves cuánto vendiste hoy sin preguntarle a nadie |
| Despliegue en Railway con CI | Si algo falla, se arregla el mismo día |

### Reglas de escritura

- Frases cortas. Máx. 20 palabras por oración en secciones comerciales.
- Segunda persona ("tu negocio"), no tercera ("el cliente").
- Números específicos siempre que existan. Sin números, usa hechos verificables (tiempo de entrega, cantidad de usuarios, años en operación).
- Nunca prometas resultados que no puedas sustentar. Un dato inventado destruye el activo completo.

---

## 4. Formato de case study (cliente)

Un case study **no** es una captura de pantalla con una lista de tecnologías. Es una historia con resultado.

### Estructura obligatoria

```markdown
# [Titular con el resultado, no el nombre del proyecto]
> Ej: "De cuaderno a caja: control diario de ventas para una tienda de barrio"

**Cliente:** [nombre o descripción si hay NDA] · **Sector:** … · **Duración:** …

## El punto de partida
Situación antes de entrar. Qué le costaba (tiempo, plata, errores).
2–4 frases. Sin tecnología.

## El problema real
Lo que descubriste que el cliente no había nombrado.
Esta sección es la que demuestra criterio.

## Qué construí
Decisiones y por qué. Aquí sí entra la tecnología, en 3–5 líneas máximo.

## El resultado
Antes → después. Con número si existe.
Si no hay número: cambio observable ("ya no cierra la tienda para cuadrar caja").

## Qué haría distinto
Una honestidad breve. Genera más confianza que cualquier testimonio.

[CTA contextual: "¿Tu negocio está en una situación parecida? Hablemos."]
```

### Reglas

- **Resultado en la tarjeta del listado**, no escondido dentro del detalle.
- Máximo 2–3 case studies destacados en home. El resto en `/proyectos`.
- Cada uno debe apuntar a un tipo de comprador distinto (comercio local, institución/estudiante, proyecto digital).
- Capturas reales del producto funcionando, no mockups en portátiles flotantes.
- Si hay NDA: describe el problema y el resultado, anonimiza el nombre. Nunca inventes un cliente.

**Pool disponible en yamid.dev:** Marvy Shopmarket (comercio local), Krysion Fit (plataforma para cliente externo), PlantaQR (entrega puntual, cliente estudiante), Marao (e-commerce), QRTa (SaaS de menú digital). Elegir por encaje con el comprador objetivo, no por dificultad técnica.

---

## 5. CTAs y conversión

**Un solo CTA primario en toda la página.** Las páginas con un CTA único convierten mejor que las que ofrecen opciones que compiten entre sí.

| Ubicación | Copy del CTA | Intención |
|---|---|---|
| Hero | "Cuéntame tu proyecto" | Baja fricción, alta intención |
| Fin de case study | "¿Quieres un resultado parecido?" | Contextual, aprovecha la prueba recién leída |
| Fin de servicios | "Agendemos una llamada de 20 min" | Concreta el siguiente paso |
| Footer | Repetición del primario | Red de seguridad |

### Reglas técnicas de conversión

- **Formulario, nunca `mailto:`.** El `mailto:` rompe en móvil y expone el correo a scrapers.
- Campos mínimos: nombre, forma de contacto, descripción del proyecto. Cada campo extra reduce envíos.
- WhatsApp como canal secundario visible (es el canal real del comprador local).
- Estado de confirmación explícito tras enviar, con tiempo de respuesta prometido ("te respondo en menos de 24 h") — y cúmplelo.
- Analítica ligera (Plausible o Umami). Sin analítica no hay iteración posible.

### SEO comercial

- Página por servicio con intención de búsqueda real (`/servicios/sistema-para-tiendas`), no una sola página que lo mezcle todo.
- Incluir señales geográficas cuando el servicio sea local (Chitagá, Norte de Santander, Colombia) en `<title>`, `<h1>` y contenido — nunca amontonadas en un pie de página.
- `<title>` orientado a lo que el cliente busca, no a tu nombre: "Software para tiendas de barrio | Yamid Dev".
- Schema `Person` + `Service` + `LocalBusiness` en JSON-LD.
- Open Graph propio por case study (imagen con el resultado, no el logo).

---

## 6. Estilo visual

**Principio:** sobriedad con carácter. Debe verse profesional y confiable, no experimental. Un cliente que no entiende de código juzga la seriedad por la limpieza.

- **Densidad baja.** Aire generoso, bloques bien separados, una idea por pantalla.
- **Tipografía:** una familia con un peso fuerte para titulares y uno regular para cuerpo. Titulares fluidos con `clamp()`.
- **Color:** un acento único usado con disciplina — CTAs y datos de resultado. Todo lo demás en neutros.
- **Imágenes:** producto real en contexto real. Pesan menos de 1 MB, formato `.webp`.
- **Animación:** funcional y discreta (150–300 ms, solo `transform`/`opacity`). Nada que retrase la lectura del titular.
- **Dark mode:** soportado, pero el modo claro es el que se diseña primero — es el que verá un comprador desde el celular a plena luz.
- **Móvil primero de verdad:** el comprador local abre desde WhatsApp en el celular. Si el hero no se entiende a 360 px, la página no sirve.

---

## 7. Prueba social sin testimonios todavía

Mientras no haya testimonios escritos, la confianza se construye con hechos verificables:

- Proyectos entregados y en operación (con link vivo).
- Rol público: fundador de Chitagá Tech, vicepresidente de JAC. Señal de arraigo y responsabilidad, no de tecnología.
- Formación en curso (SENA, UNAD) mencionada como contexto, nunca como argumento principal de venta.
- Contenido educativo propio (Think in Code, Yamid Dev Formación) como evidencia de dominio explicado.

**Al cerrar cada proyecto, pide el testimonio.** Tres preguntas: qué problema tenías, cómo fue trabajar conmigo, qué cambió. Publicar con nombre y negocio si el cliente autoriza.

---

## 8. Criterios de aceptación

Antes de dar por terminado un cambio en esta vertiente:

- [ ] Un desconocido entiende **para quién** es el servicio en menos de 6 segundos.
- [ ] Hay exactamente **un** CTA primario por página.
- [ ] Cada case study destacado muestra un resultado en su tarjeta del listado.
- [ ] Ningún `mailto:` visible en el HTML.
- [ ] Todos los enlaces de demo en vivo funcionan (verificados, no asumidos).
- [ ] El copy de las secciones 1–3 no contiene ni un nombre de tecnología.
- [ ] Probado a 360 px, 425 px y 1280 px sin desbordamiento horizontal.
- [ ] Formulario probado de extremo a extremo: se envía, llega y confirma.

```bash
cd frontend && npm run build && npx vitest run
```

```js
console.assert(
  !document.body.innerHTML.includes('mailto:'),
  'Error: hay un mailto: expuesto en la página'
);
console.assert(
  document.querySelectorAll('[data-cta="primary"]').length === 1,
  'Error: debe existir exactamente un CTA primario'
);
```