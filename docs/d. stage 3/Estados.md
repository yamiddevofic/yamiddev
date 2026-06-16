### Estados por sección — Portafolio (todas)

#### Primer fold

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Normal|✅|Siempre tiene contenido — vive en el código|
|Vacío|🟡 Caso edge|Solo posible mientras se construye|
|Cargando|❌|No depende de ninguna petición|
|Error|❌|No hay fuente externa que pueda fallar|

---

#### Servicios

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Normal|✅|Lista de servicios renderizada desde el código|
|Vacío|🟡 Caso edge|Array vacío mientras se construye|
|Cargando|❌|No aplica|
|Error|❌|No aplica|

---

#### Proyectos

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Normal|✅|Lista de proyectos renderizada desde el código|
|Vacío|🟡 Caso edge|Array vacío mientras se construye|
|Cargando|❌|No aplica|
|Error|❌|No aplica|

---

#### Sobre mí

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Normal|✅|Experiencia, habilidades y hobbies desde el código|
|Vacío|🟡 Caso edge|Solo si una lista (ej. habilidades) queda vacía|
|Cargando|❌|No aplica|
|Error|❌|No aplica|

---

#### Contacto — Links

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Normal|✅|Links a redes sociales y contacto directo|
|Vacío|🟡 Caso edge|Si falta un link, simplemente no se muestra|
|Cargando|❌|No aplica|
|Error|❌|No aplica|

---

#### Contacto — Formulario

|Estado|¿Aplica?|Descripción|
|---|---|---|
|Vacío|✅|Formulario sin llenar, esperando datos|
|Cargando|✅|Spinner en el botón mientras se envía|
|Éxito|✅|Mensaje enviado correctamente|
|Error|✅|Falla de red o Web3Forms no responde|