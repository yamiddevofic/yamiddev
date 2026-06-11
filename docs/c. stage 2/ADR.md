# Registro de decisión de arquitectura
---

### ADR-001 — Stack tecnológico del portafolio

**Fecha:** Junio 2026 **Estado:** Aprobado

---
#### Decisión

El portafolio yamid.dev se construirá con **Astro + React + TypeScript + TailwindCSS 4**.

---

#### Contexto

Se necesita un sitio público que cargue rápido, sea fácil de mantener solo, y demuestre habilidades técnicas reales a clientes potenciales y contactos técnicos. El contenido es mayormente estático — proyectos, habilidades, contacto — con poca o ninguna lógica dinámica en el MVP.

---

#### Por qué esta decisión

|Criterio|Razonamiento|
|---|---|
|**Astro**|Genera HTML estático por defecto — carga casi instantánea sin JavaScript innecesario. Ideal para un sitio de contenido como un portafolio.|
|**React**|Se usa solo donde hay interactividad real (islas). Además es el framework que Yamid ya domina y que los clientes técnicos reconocen.|
|**TypeScript**|Añade rigor al código y demuestra buenas prácticas ante contactos técnicos que revisan el repositorio.|
|**TailwindCSS 4**|Permite diseño consistente y rápido sin escribir CSS desde cero. Compatible nativamente con Astro.|

---

#### Alternativas descartadas

|Alternativa|Por qué se descartó|
|---|---|
|**Next.js**|Demasiado para un sitio estático — agrega complejidad de servidor innecesaria en el MVP|
|**WordPress**|Yamid lo domina pero no demuestra las habilidades técnicas que quiere mostrar|
|**HTML/CSS puro**|No escala bien y no demuestra dominio de herramientas modernas|
|**Vue / Nuxt**|Stack válido pero Yamid no lo domina al mismo nivel que React|

---

#### Consecuencias

- El sitio tendrá métricas de rendimiento altas desde el inicio (Lighthouse > 90)
- El repositorio en GitHub será público y visible como prueba de código real
- El mantenimiento futuro lo puede hacer Yamid solo sin dependencias externas complejas
- Si en el futuro se necesita lógica dinámica (blog con CMS, formulario propio), Astro lo soporta sin cambiar el stack base
