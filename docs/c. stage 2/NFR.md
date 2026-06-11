# Requisitos no funcionales
#### Rendimiento

| Requisito                    | Meta   | Justificación                                                                          |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------- |
| **Lighthouse Performance**   | ≥ 90   | El cliente potencial llega desde celular con conexión variable — si carga lento, se va |
| **First Contentful Paint**   | ≤ 1.5s | El primer elemento visible debe aparecer rápido para no perder al usuario impaciente   |
| **Largest Contentful Paint** | ≤ 2.5s | El contenido principal debe estar visible antes de 2.5 segundos                        |

---
#### Seguridad

| Requisito               | Meta                                                     | Justificación                                                              |
| ----------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| **HTTPS**               | Obligatorio                                              | Cloudflare Pages lo incluye automáticamente                                |
| **Sin datos sensibles** | No hay login, no hay base de datos, no hay panel privado | El sitio es completamente público y estático — no hay superficie de ataque |

---
#### Escalabilidad

| Requisito            | Meta                                                                   | Justificación                                                                |
| -------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Tráfico esperado** | Bajo y constante                                                       | No se esperan picos — el CDN de Cloudflare lo maneja sin configuración extra |
| **Mantenibilidad**   | Un solo desarrollador puede actualizar el sitio en menos de 15 minutos | Yamid es el único que mantiene el portafolio                                 |

---
#### Compatibilidad

| Requisito        | Meta                                                      | Justificación                              |
| ---------------- | --------------------------------------------------------- | ------------------------------------------ |
| **Dispositivos** | Mobile first — funcional en desktop                       | El usuario prioritario llega desde celular |
| **Navegadores**  | Chrome, Safari, Firefox — versiones de los últimos 2 años | Cubre el 95% de los usuarios reales        |

---
#### Otros posibles NFRs

| NFR                               | Descripción                                                          | ¿Aplica al MVP?                                                |
| --------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Accesibilidad**                 | Contraste mínimo WCAG 2.1 AA, navegable por teclado                  | 🟡 Should — mejora SEO y alcance                               |
| **SEO técnico**                   | Meta tags, Open Graph, sitemap.xml, robots.txt                       | 🔴 Sí — sin esto Google e IA no te indexan bien                |
| **Disponibilidad**                | El sitio debe estar online 99%+ del tiempo                           | 🔴 Sí — Cloudflare Pages lo garantiza por defecto              |
| **Tiempo de resolución DNS**      | yamid.dev debe resolver rápido tras la migración a Cloudflare        | 🟡 Puntual — solo relevante durante la migración               |
| **Tamaño de imágenes**            | Imágenes optimizadas, formatos modernos (WebP)                       | 🔴 Sí — impacto directo en velocidad en celular                |
| **Sin dependencias innecesarias** | Mínimo de librerías externas — solo lo que se usa                    | 🟡 Should — reduce peso del bundle                             |
| **Legibilidad del código**        | Código limpio y comentado en el repositorio público                  | 🔴 Sí — el repo es prueba técnica para contactos técnicos      |
| **Tiempo de build**               | El deploy en Cloudflare Pages debe completarse en menos de 2 minutos | 🟢 Nice to have                                                |
| **Favicon y metadata**            | Favicon, título y descripción correctos en todas las páginas         | 🔴 Sí — primera impresión en pestañas y resultados de búsqueda |