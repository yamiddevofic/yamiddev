
## ¿Qué son los *story points*?

Los **story points** (puntos de historia) son una **unidad abstracta de medida** que el equipo usa para expresar *cuán grande* (en términos de esfuerzo, complejidad, incertidumbre y riesgo) es una historia de usuario o cualquier otro ítem del backlog.  
No son horas, ni días, ni líneas de código; son **relativos**: lo que importa es cuánto “más” o “menos” cuesta una historia comparada con otra que ya se conoce.

| Característica | Story points | Horas / días |
|----------------|-------------|--------------|
| **Naturaleza** | Abstracta, basada en _relatividad_ | Absoluta, basada en tiempo |
| **Objetivo**   | Comparar dificultad y riesgo | Calcular agenda concreta |
| **Ventaja**    | Reduce discusiones sobre “cuántas horas”; captura incertidumbre | Fácil de traducir a calendario (si el equipo es estable) |
| **Desventaja** | Necesita calibración y disciplina | Puede volverse una “contabilidad de tiempo” que frena la agilidad |

---
## ¿Cómo se crean y usan los story points?

### 1. **Definir una referencia (baseline)**
El equipo elige una historia “típica” que todos entienden bien y le asigna, por ejemplo, **5 puntos**. Esa historia pasa a ser la **referencia** contra la que se medirán las demás.

### 2. **Descomponer y describir las historias**
Cada ítem del backlog debe estar lo suficientemente claro (definido, con criterios de aceptación) para que el equipo pueda valorar su tamaño.

### 3. **Estimación en equipo (Planning Poker)**
1. Cada miembro del equipo (desarrolladores, diseñador, PO si participa en la discusión) recibe un set de tarjetas con valores de la serie de Fibonacci (1, 2, 3, 5, 8, 13, 20, 40, 100) o la variante “½, 1, 2, 3, 5, 8…”  
2. Se lee la historia y se discute brevemente los supuestos.  
3. Cada uno elige en secreto el número que cree que representa el esfuerzo relativo.  
4. Se revelan simultáneamente.  
5. Si hay disparidad, los que dieron los valores más extremos explican su razonamiento y se vuelve a votar hasta converger.  

> **Tip:** el “consenso” no tiene que ser unanimidad; basta con que la mayoría esté cómoda con el número acordado.

### 4. **Sumar los puntos del sprint → Velocidad**
Al final de cada sprint el equipo cuenta cuántos puntos realmente *terminó* (historias “Done”). Ese total es la **velocidad** del sprint.  
Al repetir la medición en varios sprints, la **velocidad promedio** se estabiliza (ej. 30 sp / sprint en tu caso).

### 5. **Planificación basada en la velocidad**
Si la velocidad promedio es 30 sp y el próximo sprint dura 2 semanas, el Product Owner puede comprometer historias cuyo total sea cercano a 30 sp, dejando un pequeño “colchón” (≈10 % – 15 %) para imprevistos.

---

## Aplicándolo a tu equipo (2 devs + 1 designer + 1 PO)

| Rol | Cómo participa en los story points |
|-----|--------------------------------------|
| **Desarrolladores** | Estiman la complejidad del código, interacción con otras capas, pruebas unitarias, etc. |
| **Designer** | Estima el trabajo de UI/UX, prototipos, revisiones y hand‑off. En Scrum suele crear **historias de diseño** paralelas a la de desarrollo; sus puntos también forman parte del total del sprint. |
| **Product Owner** | No se le “cuentan” puntos (no entrega valor directamente), pero ayuda a que las historias estén bien definidas y a aclarar criterios de aceptación, lo cual reduce la incertidumbre y, por ende, los puntos. |

### Ejemplo rápido

| Historia | Descripción breve | Estimación (sp) |
|---------|-------------------|-----------------|
| **Login** | Backend + UI + validación de token | 8 |
| **Registro** | Formulario, envío de mail, confirmación | 5 |
| **Diseño de la pantalla de perfil** | Mockups, componentes reutilizables | 3 |
| **Implementar búsqueda** | API, filtro en UI, pruebas | 13 |
| **Mejoras de accesibilidad** | Labels, ARIA, contraste | 3 |
| **Total** | — | **32 sp** |

Con una velocidad de **30 sp / sprint**, el equipo decide:

* Aceptar historias de 24 sp y dejar 6 sp como *buffer* para actividades de mantenimiento, bugs inesperados o tareas de investigación.  
* O bien, comprometer 30 sp y mover alguna historia “pequeña” (≤3 sp) al sprint siguiente.

---

## Ventajas de usar story points

1. **Enfoque en el valor, no en el tiempo.**  
   Se habla de “qué tan difícil” y no de “cuántas horas”. Eso permite que el equipo discuta incertidumbre y riesgos sin quedar atrapado en estimaciones de tiempo poco realistas.

2. **Facilita la comparación entre equipos.**  
   La velocidad (sp/sprint) es una métrica relativa que se estabiliza con la práctica; sirve para prever la entrega de funcionalidades a nivel de proyecto.

3. **Promueve la colaboración.**  
   La estimación conjunta (Planning Poker) obliga a que todos los miembros compartan conocimientos y puntos ciegos.

4. **Reduce la presión de los “horas‑estimadas”.**  
   Al no traducir directamente a horas, el equipo no se siente castigado por “no cumplir” un plazo; el focus está en *entregar* los criterios de aceptación.

---

## Riesgos y malas prácticas a evitar

| Problema | Síntoma | Solución |
|----------|--------|----------|
| **Confundir story points con horas** | Se pide “5 sp = 5 h”. | Recordar que los puntos son relativos; sólo después de varios sprints se puede inferir una relación aproximada (ej. 1 sp ≈ 4 h **para ese equipo**). |
| **Estimaciones de “costo”** | Se usan los puntos para asignar salarios o premiar individualmente. | Los puntos miden *trabajo del equipo*; la recompensa debe basarse en la entrega de valor, no en la cantidad de puntos. |
| **Sobrecargar al PO** | El Product Owner interviene constantemente en la sesión de estimación con “yo sé cuánto tardará”. | El PO facilita la claridad del objetivo, pero la estimación del esfuerzo corresponde al equipo técnico y de diseño. |
| **No revisar la velocidad** | Se asume que la velocidad siempre será 30 sp. | Revisar cada sprint: si la velocidad sube o baja, ajustar la planificación y, si es necesario, re‑calibrar la escala de puntos. |
| **Historias demasiado grandes** | Se estiman 20 sp o más. | Dividir en historias más pequeñas (ideal < 8 sp) para mejorar predictibilidad y evitar bloqueos. |

---

## Pasos concretos para arrancar con story points en tu equipo

1. **Reunir al equipo completo** (2 devs, 1 designer, PO) y decidir una escala (Fibonacci u otra).  
2. **Seleccionar una historia conocida** (por ejemplo, “Página de login”) y asignarle 5 sp.  
3. **Ejecutar una sesión de Planning Poker** con 5–10 historias del backlog.  
4. **Sumar los puntos estimados** y comparar con la capacidad de cada miembro:  
   *Suposición de capacidad:* si cada desarrollador dedica 80 h al sprint (2 semanas) y el diseñador 60 h, la velocidad esperada es alrededor de 30 sp (según tu hipótesis).  
5. **Hacer el sprint** y, al final, **contar los puntos “Done”**. Esa será la velocidad real del sprint.  
6. **Registrar la velocidad** en un gráfico (ej. “Burn‑up”) y usar la media de los últimos 3–5 sprints para la planificación futura.  
7. **Revisar** en la retrospectiva si la escala resulta intuitiva o si ciertos ítems fueron sobre/ sub‑estimados; ajustar la referencia y volver a estimar si es necesario.

---

## Preguntas frecuentes (FAQ)

| Pregunta | Respuesta |
|----------|-----------|
| **¿Los story points incluyen pruebas?** | Sí. La estimación debe cubrir todo el trabajo necesario para que la historia cumpla *definición de terminado* (coding, pruebas unitarias, integración, test de UI, documentación). |
| **¿Cómo trato los bugs emergentes?** | Los bugs críticos pueden “robar” capacidad del sprint y, por lo tanto, reducir los puntos entregados. La práctica común es tratarlos como *trabajo no planificado* y ajustar la velocidad retrospectivamente. |
| **¿Puedo mezclar puntos de desarrollo y de diseño?** | Sí, siempre que ambas actividades estén dentro de la misma historia o se estimen como ítems separados. Lo importante es que el total de puntos refleje el esfuerzo total del sprint. |
| **¿Qué pasa si el diseñador tiene menos capacidad que los devs?** | La velocidad del sprint se calcula sumando los puntos completados por todo el equipo. Si el diseñador aporta, por ejemplo, 6 sp en un sprint, esos 6 sp forman parte de los 30 sp totales. La planificación debe respetar la capacidad real de cada rol (p.ej., no asignar 20 sp de UI si sólo puede hacer 6). |
| **¿Se pueden hacer estimaciones sin “Planning Poker”?** | Sí, se pueden usar técnicas como *Affinity Estimation* (agrupación por similitud) o *T-Shirt Sizing* + conversión a puntos. Sin embargo, el Poker aporta discusión y alineación, lo cual suele producir estimaciones más consistentes. |

---

## Resumen rápido

| Concepto | Qué es | Cómo se usa |
|---------|--------|-------------|
| **Story point** | Unidad relativa de esfuerzo, complejidad, incertidumbre y riesgo. | Se asigna a cada historia mediante consenso (Planning Poker). |
| **Velocidad** | Promedio de puntos completados por sprint. | Sirve para predecir cuántos puntos podrá entregar el equipo en futuros sprints. |
| **Planificación** | Seleccionar del backlog historias cuyo total ≈ velocidad. | Dejar margen (≈10‑15 %) para imprevistos. |
| **Equipo** | Todos los que realizan trabajo (devs, diseñador). PO facilita claridad pero no se le “asigna” puntos. | Cada rol estima sus propias tareas; los puntos totales del sprint los refleja el equipo completo. |

Con una **velocidad estimada de 30 story points por sprint de 2 semanas**, tu equipo tiene una guía práctica para decidir cuántas funcionalidades pueden comprometerse, mantener la calidad y, sobre todo, entregar valor de forma predecible.

---

### Próximo paso recomendado

1. **Organiza una primera sesión de estimación** (30‑45 min) con el objetivo de calibrar la referencia (5 sp para una historia “típica”).  
2. **Ejecuta el sprint** y registra los puntos “Done”.  
3. **En la retrospectiva**, compara la velocidad real con la esperada (30 sp) y ajusta la escala si es necesario.  

¡Con práctica y disciplina los story points se convierten en una brújula muy útil para que tu equipo navegue con seguridad por el backlog! 🚀

| Sprint                              | Objetivo principal                              | Historias (ejemplo)                                                                                                                                                                                                                                                          | Story Points | Comentario de riesgo                                                                    |
| ----------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------- |
| **0 – Preparación**                 | **Setup de entorno** + definición de “Done”     | 0.1 Configurar repo Git, CI, hosting (Vercel/Netlify) – 2p<br>0.2 Definir criterios de aceptación y “Definition of Done” – 1p                                                                                                                                                | **3**        | Riesgo bajo.                                                                            |
| **1 – MVP Core**                    | Publicar sitio funcional con contenido esencial | 1.1 Publicación y acceso (dominio, HTTPS) – 3p<br>1.2 Arquitectura básica (5 páginas) – 6p<br>1.3 Responsividad (mobile‑first) – 4p<br>1.4 Claridad de propuesta + CTA visible – 3p<br>1.5 Footer + contacto (formulario básico) – 4p<br>1.6 Aprobación de stakeholders – 2p | **22**       | *Must‑have* críticos.                                                                   |
| **2 – Calidad & Conversion**        | Mejorar usabilidad y medir resultados           | 2.1 Velocidad de carga (optimizar imágenes, lazy‑load) – 3p<br>2.2 Accesibilidad básica (ARIA, contraste) – 4p<br>2.3 Sección “Sobre mí” – 2p<br>2.4 Botón WhatsApp/Telegram – 1p<br>2.5 Configurar GA4 + Tag Manager – 3p                                                   | **13**       | **Total sprint 1 = 35** → ajuste: mover 2.1 a sprint 3 si la velocidad ya es aceptable. |
| **3 – Evidencia y Métricas**        | Proveer pruebas técnicas y métricas             | 3.1 Evidencia técnica: link a GitHub + README – 2p<br>3.2 Métricas de resultados (dashboard simple en GA) – 3p<br>3.3 Diseño inspirado en benchmarks (UI kit + style guide) – 4p                                                                                             | **9**        | **Sprint 3 = 22 pts** → queda capacidad para “quick win” de i18n.                       |
| **4 – Internacionalización ligera** | Ampliar alcance sin romper lógica               | 4.1 i18n página principal (es‑en) – 4p<br>4.2 Test de contenido traducido – 2p                                                                                                                                                                                               | **6**        | **Sprint 4 = 28 pts** (con margen para ajustes o bugs).                                 |
| **5 – Pulido final + Buffer**       | Correcciones, pruebas de usuario, documentación | 5.1 Test de usabilidad (5 usuarios) – 3p<br>5.2 Corrección bugs críticos – 4p<br>5.3 Documentación de entrega (hand‑off) – 2p                                                                                                                                                | **9**        | Incluye cualquier “Could” que haya quedado pendiente (p.ej., animaciones simples).      |
|                                     |                                                 |                                                                                                                                                                                                                                                                              |              |                                                                                         |
