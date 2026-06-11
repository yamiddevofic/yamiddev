# ¿Qué es un caso de estudio?
Un caso de estudio es una metodología de investigación que analiza en profundidad un fenómeno, proyecto o situación real, describiendo su contexto, procesos, actores y resultados. Sirve para extraer lecciones, identificar buenas prácticas y validar teorías, combinando datos cualitativos y cuantitativos. Se presenta de forma estructurada, con objetivo claro, metodología, hallazgos, conclusiones y recomendaciones, facilitando la transferencia de conocimiento y la toma de decisiones en entornos similares. Además, permite comparar escenarios, medir impactos y documentar resultados para futuras referencias estructurales.

## Ejemplo de caso de estudio  
**Tema:** Implementación de un Sistema de Gestión de Inventarios (SGI) en la Pyme “EcoTextiles S.A.”  

> **Objetivo del ejemplo:** Mostrar, paso a paso, cómo se estructura y presenta un caso de estudio completo, con todos los apartados típicos (contexto, objetivos, metodología, hallazgos, conclusiones y recomendaciones). El contenido es ficticio, pero está basado en buenas prácticas de investigación aplicada.

---

### 1. Título  
**“De la hoja de cálculo a la nube: análisis del impacto de la digitalización del inventario en una pyme textil peruana”**

---

### 2. Resumen ejecutivo (150‑200 palabras)  

EcoTextiles S.A., empresa familiar de 45 empleados ubicada en Arequipa, manejaba su inventario mediante hojas de cálculo Excel, lo que generaba errores de registro (≈ 12 % de discrepancias) y retrasos en la toma de decisiones. En noviembre 2022 se decidió implantar el SaaS “Inventario Cloud” (versión 3.2). El presente caso de estudio evalúa el proceso de adopción (planificación, capacitación, migración y puesta en marcha) y sus efectos en los indicadores clave de desempeño (KPIs) durante los 12 meses posteriores.  

Los resultados muestran una disminución del 85 % en errores de stock, una reducción del 30 % en tiempo de generación de reportes y un aumento del 15 % en la rotación de inventario, traduciéndose en un ahorro estimado de US $27 000 al año. Sin embargo, se identifican retos en la gestión del cambio y en la integración con el ERP financiero. Las lecciones aprendidas sirven de guía para pymes del sector manufacturero que consideren la digitalización de sus procesos logísticos.

---

### 3. Introducción  

| Elemento | Descripción |
|----------|-------------|
| **Marco teórico** | La adopción de sistemas ERP/SGI en pymes está asociada a mejoras en eficiencia operativa (Kumar & Saini, 2020). Sin embargo, la resistencia al cambio y la falta de recursos son barreras frecuentes (González et al., 2021). |
| **Problema** | Alta tasa de errores de inventario, reporting manual y lentitud en la toma de decisiones. |
| **Objetivo general** | Evaluar el impacto de la implementación del SGI “Inventario Cloud” en la gestión de inventarios de EcoTextiles S.A. |
| **Objetivos específicos** | 1. Medir la variación de los indicadores de precisión de stock, tiempos de reporte y rotación de inventario.<br>2. Identificar los factores críticos de éxito y los principales obstáculos durante la implementación.<br>3. Generar recomendaciones para pymes del sector textil que consideren digitalizar sus procesos logísticos. |
| **Alcance** | Análisis de los 12 meses posteriores a la puesta en marcha (nov 2022 – oct 2023). Se excluye la evaluación financiera completa del proyecto. |

---

### 4. Metodología  

| Paso | Descripción | Herramientas / Fuentes |
|------|-------------|------------------------|
| **Diseño** | Estudio de caso único con enfoque mixto (cualitativo + cuantitativo). | - |
| **Recolección de datos cuantitativos** | • Extractos de bases de datos del SGI (stock, movimientos, timestamps).<br>• Reportes mensuales de inventario (antes y después). | SQL, Excel, Tableau. |
| **Recolección de datos cualitativos** | • 8 entrevistas semiestructuradas (gerente general, jefe de producción, 2 supervisores de almacén, 2 operarios y 2 usuarios del SGI).<br>• 2 focus groups (usuarios finales). | Guía de entrevista, grabaciones de audio, notas de campo. |
| **Indicadores clave (KPIs)** | 1. **Precisión de stock** = (Registros correctos / Total registros) × 100. <br>2. **Tiempo de generación de reporte** (minutos). <br>3. **Rotación de inventario** = Costo de bienes vendidos / Inventario medio. | Métricas extraídas de los sistemas. |
| **Análisis cuantitativo** | • Comparación de promedios pre‑ y post‑implementación (t‑test para muestras relacionadas).<br>• Análisis de tendencia mensual (línea de tiempo). | SPSS, R. |
| **Análisis cualitativo** | • Codificación temática (software NVivo).<br>• Triangulación de fuentes (entrevistas + focus groups). | NVivo. |
| **Validez y confiabilidad** | • *Triangulación* de datos cuantitativos y cualitativos.<br>• *Re‑visión de pares* interna (equipo de investigación). | - |

---

### 5. Resultados  

#### 5.1. Hallazgos cuantitativos  

| KPI | Antes de SGI (promedio) | Después de SGI (promedio) | Cambio % | Significancia (p‑valor) |
|-----|------------------------|--------------------------|----------|------------------------|
| Precisión de stock | 88 % | 97,5 % | **+9,5 %** | 0,001 |
| Tiempo de generación de reporte | 45 min | 31 min | **‑31 %** | 0,006 |
| Rotación de inventario | 4,2 veces/año | 4,8 veces/año | **+14,3 %** | 0,018 |

> **Interpretación:** La digitalización redujo significativamente los errores de registro y el tiempo dedicado a la elaboración de informes, lo que permitió una mejor planificación de la producción y una mayor eficiencia de capital de trabajo.

#### 5.2. Hallazgos cualitativos  

| Tema emergente | Evidencia (citas) | Implicación |
|----------------|-------------------|-------------|
| **Resistencia al cambio** | “Al principio, muchos compañeros tenían miedo de perder el control; pensaban que el sistema nos reemplazaría.” (Supervisor de almacén) | Necesidad de comunicar beneficios y garantizar participación activa. |
| **Capacitación práctica** | “Los talleres en la propia planta, con casos reales, fueron claves para que todos nos sintiéramos cómodos.” (Operario) | Enfoque de aprendizaje basado en la práctica favorece la adopción. |
| **Integración con ERP financiero** | “Aún no se sincroniza bien con nuestro contable; a veces ingresamos datos dos veces.” (Jefe de producción) | Falta de integración completa genera trabajo duplicado; prioridad para fase 2. |
| **Mejora de la toma de decisiones** | “Ahora podemos ver el nivel de stock en tiempo real antes de lanzar una orden de producción.” (Gerente General) | Aceleración del ciclo de planificación. |

#### 5.3. Análisis de costos y beneficios (estimación)  

| Concepto | Valor (US $) |
|----------|--------------|
| **Inversión inicial** (licencia + implementación) | 45 000 |
| **Ahorro en errores (costo de retrabajo, devoluciones)** | 22 000 / año |
| **Ahorro en tiempo de reporte (salario 8 h × $15/h)** | 5 000 / año |
| **Beneficio por mayor rotación (menor capital inmovilizado)** | 30 000 / año |
| **ROI (primer año)** | **+28 %** |

---

### 6. Discusión  

| Aspecto | Contribución al conocimiento | Comparación con literatura |
|----------|----------------------------|----------------------------|
| **Precisión de stock** | Mejora del 9,5 % demostrada con datos reales de una pyme del sector textil. | Coincide con Kumar & Saini (2020) que reportan mejoras del 8‑12 % en pymes manufactureras. |
| **Gestión del cambio** | Identifica la capacitación práctica y la comunicación transparentes como factores críticos. | Refuerza González et al. (2021) sobre la importancia de la “participación activa”. |
| **Integración de sistemas** | Señala que la falta de integración total limita los beneficios esperados. | Alineado con estudios de sistemas ERP en pymes (Muller et al., 2022) que destacan la integración como barrera frecuente. |
| **Retorno económico** | ROI positivo en el primer año, pese a la inversión inicial. | Confirma la viabilidad económica de la digitalización en pymes de bajo margen (Silva & Ramos, 2023). |

---

### 7. Conclusiones  

1. **Impacto operativo:** La implementación del SGI “Inventario Cloud” mejoró de forma significativa la precisión del stock, redujo los tiempos de generación de reportes y aumentó la rotación de inventario, generando un ahorro estimado de US $27 000 al año para EcoTextiles S.A.  
2. **Factores críticos de éxito:** <br>• Capacitación práctica y adaptada al puesto de trabajo.<br>• Comunicación clara sobre beneficios y participación de usuarios clave desde la etapa de diseño.<br>• Apoyo continuo del equipo de TI interno y del proveedor del software.  
3. **Principales obstáculos:** <br>• Resistencia al cambio inicial, mitigada mediante talleres y demostraciones de valor.<br>• Falta de integración completa con el ERP financiero, que genera duplicidad de esfuerzos.  
4. **Lecciones aprendidas:** La digitalización de procesos logísticos en pymes es factible y rentable, siempre que se acompañe de un plan estructurado de gestión del cambio y se priorice la interoperabilidad entre sistemas.

---

### 8. Recomendaciones  

| Área | Acción recomendada | Prioridad |
|------|-------------------|-----------|
| **Gestión del cambio** | Desarrollar un “road‑map” de comunicación que incluya testimonios de usuarios piloto y métricas de mejora temprana. | Alta |
| **Capacitación** | Implementar un programa de “learning‑by‑doing” de 4 semanas con casos reales de la empresa. | Alta |
| **Integración de sistemas** | Planificar una fase 2 de proyecto para conectar “Inventario Cloud” con el ERP financiero vía API REST. | Media |
| **Monitoreo y mejora continua** | Definir un panel de KPI en tiempo real (stock, tiempo de ciclo, costo de errores) y revisiones trimestrales. | Media |
| **Escalabilidad** | Evaluar la incorporación de módulos de planificación de demanda (forecasting) en los próximos 12 meses. | Baja |

---

### 9. Limitaciones del estudio  

1. **Caso único:** Los resultados pueden no ser generalizables a pymes con estructuras organizativas muy diferentes.  
2. **Periodo de análisis de 12 meses:** No se evalúan impactos a mediano plazo (3‑5 años) como la madurez del uso del SGI.  
3. **Datos financieros limitados:** El cálculo de ahorro se basa en estimaciones de costo de errores y tiempo, no en auditoría financiera completa.

---

### 10. Referencias  

- González, L., Pérez, M., & Torres, A. (2021). *Gestión del cambio en la adopción de tecnologías de la información en pymes.* Journal of Business Innovation, 12(3), 45‑62.  
- Kumar, R., & Saini, P. (2020). *Impact of ERP implementation on operational performance of small manufacturing firms.* International Journal of Production Economics, 227, 107595.  
- Muller, J., Schmidt, H., & Riedel, K. (2022). *System integration challenges in SMEs adopting cloud ERP solutions.* Information Systems Frontiers, 24(5), 1153‑1171.  
- Silva, R., & Ramos, J. (2023). *Cost‑benefit analysis of digital inventory systems in low‑margin industries.* Journal of Applied Management, 19(2), 78‑93.  

---

## Anexo: Plantilla de caso de estudio (para replicar)

| Sección | Preguntas guía |
|---------|----------------|
| **Título** | ¿Qué fenómeno o proyecto se estudia? ¿En qué contexto? |
| **Resumen ejecutivo** | Breve descripción del caso, objetivos, metodología, hallazgos y conclusiones clave (150‑200 palabras). |
| **Introducción** | Marco teórico, problema, objetivos, alcance. |
| **Metodología** | Tipo de estudio, técnicas de recolección y análisis, indicadores, validación. |
| **Resultados** | Presentar datos cuantitativos (tablas, gráficos) y cualitativos (citas, temas). |
| **Discusión** | Comparar con literatura, explicar implicaciones, limitaciones. |
| **Conclusiones** | Resumir hallazgos y su relevancia. |
| **Recomendaciones** | Acciones prácticas para la organización y para otras similares. |
| **Limitaciones** | Qué no cubre el estudio y posibles sesgos. |
| **Referencias** | Bibliografía completa. |
| **Anexos** | Instrumentos de recolección, tablas extensas, cálculos financieros, etc. |

---

### ¿Cómo usar este caso de estudio?

1. **Adaptar al sector:** Cambie las variables (KPIs) por aquellas que sean críticas en su industria (p. ej., tiempo de entrega en logística, índice de satisfacción en salud).  
2. **Reemplazar datos:** Sustituya los valores ficticios por los reales obtenidos en su organización.  
3. **Seguir la estructura:** Mantenga los apartados tal como aparecen; la claridad y la lógica secuencial facilitan la lectura y la difusión del conocimiento.  

Con este modelo, cualquier profesional o académico puede documentar de forma rigurosa y comprensible la experiencia de una intervención real, generando valor tanto para su propia organización como para la comunidad de práctica. ¡Éxitos en tus futuros casos de estudio!


