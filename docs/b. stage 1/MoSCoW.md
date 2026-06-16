# Priorización MoSCoW
*(Basado en la "Definición del Producto" del Stage 0)*

---

## **MUST HAVE (Debe Tener)**
- Publicación y Acceso  
- Arquitectura Básica  
 - Inicio  
 - Servicios  
 - Casos de Éxito 
 - Proyectos
 - Contacto  
 - Footer  
- Responsividad  
- Claridad de Propuesta  
- CTA Visible  
- Aprobación de Stakeholders  

## **SHOULD HAVE (Debería Tener)**
- Velocidad de Carga  
- Sección "Sobre mí"  
- Accesibilidad Básica  
- Evidencia Técnica (Código & Docs)  
- Métricas de Resultados  
- Diseño Inspirado en Benchmarks  

## **COULD HAVE (Podría Tener)**
- Internacionalización (i18n)  
- Elementos Interactivos/Dinámicos  
- Sección "Código & Docs" Dedicada  
- Botón de "WhatsApp/Telegram"  
- Versión del Sitio  
- Opción de ver/descargar CV en PDF

## **WON'T HAVE (No Tendrá – por ahora)**
- Chatbot o IA Conversacional  
- Blog o Sección de Artículos Técnicos  
- Dashboard de Métricas en Tiempo Real  
- Modo Oscuro/Claro  
- Portafolio Multilingüe Completo  
- Integración Compleja con CRM/Lead Generation  
- Casos de Estudio Extremadamente Detallados
- Sistema de calificaciones 
- Sistema de comentarios


# Esquema de valor vs esfuerzo

1. **Una tabla de valor‑esfuerzo (matriz) con puntuaciones** que te permita visualizar rápidamente qué ítems “ganan” (alto valor / bajo esfuerzo) y cuáles requieren una decisión estratégica.  
2. **Un “road‑map” por sprints** basado en esa matriz y en la priorización MoSCoW, con ejemplos de **user stories**, **criterios de aceptación** y **estimaciones** (story points).  
3. **Recomendaciones prácticas** para validar, medir y ajustar la priorización a medida que avanza el proyecto.

---

## 1️⃣ Matriz Valor vs Esfuerzo (Scorecard)

| # | Ítem (MoSCoW) | Tipo | Valor (1‑5) | Esfuerzo (1‑5) | Ratio V/E | Comentario rápido |
|---|---------------------------|------|------------|--------------|-----------|------------------------------|
| **M1** | Publicación y Acceso | Must | **5** | **2** | **2.5** | Base del producto; “must‑have”. |
| **M2** | Arquitectura Básica (Inicio, Servicios, Casos de Éxito, Contacto, Footer) | Must | **5** | **3** | **1.7** | Estructura esencial. |
| **M3** | Responsividad | Must | **5** | **2** | **2.5** | Impacto en UX y SEO. |
| **M4** | Claridad de Propuesta | Must | **5** | **1** | **5.0** | Menor esfuerzo, gran valor. |
| **M5** | CTA Visible | Must | **5** | **1** | **5.0** | Facilita conversiones. |
| **M6** | Aprobación Stakeholders | Must | **4** | **1** | **4.0** | Simple de ejecutar. |
| **S1** | Velocidad de Carga | Should | **4** | **2** | **2.0** | Optimizar imágenes, lazy‑load. |
| **S2** | Sección “Sobre mí” | Should | **4** | **1** | **4.0** | Historias personales = confianza. |
| **S3** | Accesibilidad Básica (WCAG 2.1 AA) | Should | **4** | **2** | **2.0** | Mejora SEO y legal. |
| **S4** | Evidencia Técnica (Código & Docs) | Should | **3** | **2** | **1.5** | Buen para recruiters. |
| **S5** | Métricas de Resultados (Google Analytics, Tag Manager) | Should | **3** | **2** | **1.5** | Permite iterar. |
| **S6** | Diseño inspirado en Benchmarks | Should | **3** | **2** | **1.5** | Inspira confianza visual. |
| **C1** | Internacionalización (i18n) – versión en Inglés | Could | **3** | **4** | **0.75** | Valor futuro, esfuerzo medio‑alto. |
| **C2** | Elementos Interactivos/Dinámicos (animaciones, scroll‑effects) | Could | **2** | **3** | **0.66** | Aumenta wow‑factor, pero bajo ROI. |
| **C3** | Sección “Código & Docs” Dedicada | Could | **2** | **3** | **0.66** | Redundante con S4. |
| **C4** | Botón WhatsApp/Telegram | Could | **2** | **1** | **2.0** | Pequeña ganancia de contactos. |
| **C5** | Versión “Sitio descargable/ZIP” | Could | **1** | **2** | **0.5** | Baixo valor, solo para casos de uso muy específicos. |
| **W1** | Chatbot/IA Conversacional | Won’t | **1** | **5** | **0.2** | Muy alto esfuerzo, bajo valor para MVP. |
| **W2** | Blog/Artículos Técnicos | Won’t | **2** | **4** | **0.5** | Puede quedarse para fase 2. |
| **W3** | Dashboard Métricas en Tiempo Real | Won’t | **2** | **5** | **0.4** | Prioridad baja. |
| **W4** | Modo Oscuro/Claro | Won’t | **2** | **3** | **0.66** | Se puede post‑poner. |
| **W5** | Portafolio Multilingüe Completo | Won’t | **2** | **5** | **0.4** | Se deja para expansión internacional. |
| **W6** | Integración Compleja CRM/Lead Gen | Won’t | **3** | **5** | **0.6** | No es crítico para el MVP. |
| **W7** | Casos de Estudio Detallados | Won’t | **3** | **4** | **0.75** | Buen “nice‑to‑have”. |

**Interpretación rápida**

- **Ratio ≥ 2.0** → *Quick Wins* (alto valor, bajo‑medio esfuerzo).  
- **Ratio 1.0‑1.9** → *Inversión razonable* (vale la pena en sprint 2‑3).  
- **Ratio < 1.0** → *Post‑pone* o *re‑evalúa* (p.ej., elementos “Could” con mucho esfuerzo).

---

## 2️⃣ Road‑map por sprints (4‑6 semanas aprox.)

> **Suposición**: Equipo de 2 desarrolladores + 1 designer + 1 PO.  
> **Velocidad estimada**: 30 [[Story Point|story points]] / sprint (2 semanas).

### Visualización (timeline)

```
Semana 1‑2  → Sprint 0 / 1 (MVP Core)
Semana 3‑4  → Sprint 2 (Calidad + Conversión)
Semana 5‑6  → Sprint 3 (Evidencia + Métricas)
Semana 7‑8  → Sprint 4 (i18n “light”)
Semana 9‑10 → Sprint 5 (Buffer / Pulido)
```

> **Tip**: Si tu equipo usa **Kanban**, conviértete en un flujo continuo y mantén los **WIP ≤ 3**. El tablero se rellenará con los ítems del **Must** primero, luego migrará a **Should** y finalmente a **Could**.

¡Claro! Vamos a desglosar ese párrafo paso a paso y con ejemplos sencillos, para que quede todo más claro.

---

## 1. ¿Qué es Kanban?

**Kanban** es una forma visual de organizar el trabajo.  
Se usa un **tablero** (físico o digital) dividido en columnas que representan los estados de una tarea, por ejemplo:

| Backlog | En Progreso | Listo |
|--------|------------|-------|
| (todas las ideas) | (lo que se está haciendo) | (terminado) |

Las tarjetas (o “ítems”) se van moviendo de una columna a otra a medida que avanzan.

---

## 2. Flujo continuo

En lugar de lanzar “sprints” (periodos de tiempo con un lote de tareas) como en Scrum, Kanban busca que **las tareas fluyan una a una**, tan pronto como haya capacidad para trabajarlas.  
Imagina una cinta de producción en la que cada pieza avanza al siguiente paso tan pronto como la máquina anterior termina.

### Beneficio
- Menos tiempo de espera.
- Problemas se detectan rápido porque siempre ves cuántas cosas están “atascadas”.

---

## 3. WIP ≤ 3 (Work‑In‑Progress)

**WIP** = “trabajo en curso”.  
El número **3** es un **límite** que se pone para evitar que haya demasiadas tareas simultáneas.

### ¿Por qué limitar a 3?
- Si intentas trabajar en 10 cosas a la vez, el tiempo de finalización de cada una se alarga y aumentan los errores.
- Con un límite bajo, te obligas a **terminar** lo que empezaste antes de comenzar algo nuevo.

**Ejemplo práctico**

| Columna | Límite WIP (ejemplo) |
|---------|---------------------|
| En Progreso | ≤ 3 tarjetas |
| En Revisión | ≤ 2 tarjetas |
| En Pruebas | ≤ 2 tarjetas |

Si ya tienes 3 tarjetas en “En Progreso”, no puedes mover otra ahí hasta que alguna salga de esa columna.

---

## 4. Prioridades: **Must**, **Should**, **Could**

Estos tres términos provienen de la **Matriz MoSCoW** (Must, Should, Could, Won’t). Sirven para clasificar **qué tan importante es cada ítem**.

| Prioridad | Qué significa | Cuándo se coloca en el tablero |
|----------|---------------|--------------------------------|
| **Must** | Es indispensable; sin ello el proyecto falla. | Se atienden **primero**. |
| **Should** | Muy útil, pero el proyecto puede seguir sin ello (aunque con cierta incomodidad). | Se atienden **después** de los Must. |
| **Could** | “Sería genial tenerlo”, pero no afecta la entrega ni la calidad. | Se atienden **último** o cuando hay tiempo sobrante. |

### Cómo se “rellena” el tablero

1. **Se extraen los ítems Must del backlog y se mueven a “En Progreso”.**  
   - Si ya hay 3 ítems en progreso, solo puedes mover más cuando termines uno de ellos.

2. **Una vez que no quedan Must o el WIP está bajo el límite, se pasan los Should.**  
   - Así mantienes siempre el trabajo más crítico al frente.

3. **Finalmente, cuando Must y Should están cubiertos y aún tienes capacidad, vas con los Could.**  

Esto evita que empieces a trabajar en cosas menos importantes mientras hay cosas críticas pendientes.

---

## 5. Ejemplo completo

Supongamos que estás desarrollando una pequeña app de notas.

| Backlog (lista completa) |
|--------------------------|
| **Must**: Guardar notas, Sincronizar con la nube, Seguridad (cifrado) |
| **Should**: Modo oscuro, Exportar a PDF, Búsqueda avanzada |
| **Could**: Plantillas de notas, Compartir en redes, Animaciones de UI |

### Paso a paso en el tablero

| Columna | Ítems (máx 3) |
|---------|--------------|
| **En Progreso** | 1️⃣ Guardar notas  <br> 2️⃣ Sincronizar con la nube  <br> 3️⃣ Seguridad (cifrado) |
| **En Revisión** | (vacía) |
| **Listo** | (vacía) |

- Cuando “Guardar notas” pasa a **Listo**, el WIP baja a 2.
- Ahora puedes añadir el siguiente ítem **Must** (si quedara alguno) o el primer **Should**:
  
  - **En Progreso**: 1️⃣ Sincronizar con la nube  <br> 2️⃣ Seguridad (cifrado)  <br> 3️⃣ Modo oscuro (**Should**)

Así, siempre el tablero tiene como máximo 3 tareas activas y siempre se están trabajando primero los Must.

---

## 6. Preguntas típicas que surgen

| Pregunta | Respuesta breve |
|----------|-----------------|
| **¿Qué pasa si tengo más de 3 Must?** | Primero añades 3, trabajas en ellos, y cuando alguna termina, sustituyes por el siguiente Must. El resto queda “en espera” en el backlog. |
| **¿Puedo cambiar el límite de 3?** | Sí, el número 3 es una recomendación inicial. Dependiendo de tu equipo y velocidad, puedes probar 2, 4, etc., pero siempre mantén **un límite** para que el flujo sea visible. |
| **¿Qué pasa si un ítem “Should” se vuelve urgente?** | Puedes **reclasificar** ese ítem a “Must” (y moverlo al frente del flujo). La clasificación es flexible; lo importante es que el tablero refleje la prioridad real. |
| **¿Cómo sé cuánto tiempo tardará cada ítem?** | En Kanban se usan métricas como **Lead Time** (tiempo total desde que entra al tablero hasta que está listo) y **Cycle Time** (tiempo que pasa en “En Progreso”). Con datos históricos puedes estimar mejor. |

---

## 7. Resumen rápido (para imprimir o guardar)

1. **Kanban = tablero visual** → columnas = estados.  
2. **WIP ≤ 3** → nunca más de 3 tarjetas en “En Progreso”.  
3. **Prioriza**: Must → Should → Could.  
4. **Flujo continuo** → cuando termina una tarjeta, otra entra inmediatamente (siguiendo la prioridad y el límite de WIP).  
5. **Revisa y ajusta**: cada semana revisa tu Lead/Cycle Time y si el límite de 3 sigue funcionando.

---

### ¿Te queda alguna duda específica?

- ¿Quieres ver cómo montar un tablero Kanban en una herramienta concreta (Trello, Jira, ClickUp, etc.)?  
- ¿Necesitas ejemplos de cómo priorizar con Must/Should/Could en tu proyecto actual?  

¡Dime y afinamos la explicación a tu caso!

---

## 3️⃣ Recomendaciones prácticas para ejecutar la priorización

| Tema | Acción concreta | Herramienta / Artefacto |
|------|----------------|--------------------------|
| **Valor** | Define **KPIs** que reflejen el valor de cada ítem (p.ej., % de conversión para CTA, tiempo medio de carga, NPS de “Sobre mí”). | Google Analytics, Hotjar, Formulario de feedback. |
| **Esfuerzo** | Usa **Planning Poker** (0‑½‑1‑2‑3‑5‑8‑13) para estimar story points y registra la media. | Jira, Trello, Miro (cards de estimación). |
| **Scorecard** | Cada ítem recibe **Valor × Peso** (ej. 1‑5) y **Esfuerzo × Peso**; calcula el ratio y ordénalo. | Excel / Google Sheets con fórmulas `=Valor/Esfuerzo`. |
| **Stakeholder Review** | Al final de cada sprint, muestra **Demo** y verifica “Aprobación de Stakeholders”. | Zoom + pantalla compartida / Notion con “Demo Log”. |
| **Retroalimentación continua** | Después de la publicación (Sprint 5) corre una encuesta corta a los visitantes. Usa los resultados para re‑priorizar los **Could** en una segunda fase. | Typeform o Google Forms. |
| **Gestión de riesgos** | Marca en rojo los ítems con **esfuerzo > 3** y **valor < 3**; crea **Plan B** (ej.: posponer la i18n o usar un traductor automático). | Matriz RACI en Confluence. |
| **Definición de “Done”** | Incluye: pruebas unitarias, pruebas en navegadores (Chrome, Safari, Firefox), auditoría de accesibilidad (Lighthouse ≥ 90), despliegue en entorno *staging* y **release**. | Cypress + Lighthouse CI. |

---

## 4️⃣ Próximos pasos sugeridos (para que empieces hoy)

1. **Crea el Scorecard** en Google Sheets usando la tabla de arriba como plantilla.  
2. **Agenda una reunión de planificación** (45 min) con el equipo:  
   - Repasa los criterios de valor y esfuerzo.  
   - Realiza el *Planning Poker* para asignar story points a cada historia.  
3. **Abre el backlog en Jira/Trello**: crea una columna “Must”, “Should”, “Could”. Arrastra los tickets según el ratio V/E.  
4. **Define los “Definition of Done”** y sube el checklist a Confluence o Notion.  
5. **Kick‑off Sprint 0**: configura repos, CI/CD y dominio.  

> ✨ **Resultado esperado al final del Sprint 1:** un sitio completamente publicado, accesible desde cualquier dispositivo, con la propuesta de valor clara y un CTA que genere al menos **3‑5 leads** de prueba.  

---

### Resumen rápido

| Prioridad | Acción clave | Valor/Esfuerzo | Sprint recomendado |
|-----------|--------------|---------------|--------------------|
| **Quick Wins** (ratio ≥ 2) | CTA visible, propuesta clara, footer, responsividad, i18n light, botón WhatsApp | Alto/​Bajo | Sprint 1 / 4 |
| **Inversión razonable** (ratio 1‑2) | Velocidad, accesibilidad, sección “Sobre mí”, métricas GA | Medio/​Medio | Sprint 2‑3 |
| **Post‑pone** (ratio < 1) | Animaciones, portal multilingüe completo, chatbot, dashboard real‑time | Bajo/​Alto | Futuro (Fase 2) |

Con esta hoja de ruta ya tienes una **vista clara de qué construir, cuándo y por qué**, y un marco para medir el éxito a lo largo del camino.  

¡Éxitos con el portafolio! 🚀 Si necesitas que profundicemos en alguna de las historias, en la configuración de CI/CD o en el diseño de los dashboards de métricas, avísame y lo armamos juntos.
