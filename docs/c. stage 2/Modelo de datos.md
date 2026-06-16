
# Entidades y atributos

##  Perfil
| Campo         | Tipo   | Descripción                |
| ------------- | ------ | -------------------------- |
| `name`        | string | Yamid Dev                  |
| `rol`         | string | Rol en el que se desempeña |
| `bio`         | string | Descripción corta          |
| `location`    | string | Chitagá, Colombia          |
| `description` | string | Descripción más larga      |

## Experiencia laboral

| Campo         | Tipo     | Descripción                                      |
| ------------- | -------- | ------------------------------------------------ |
| `title`       | string   | Titulo de la experiencia laboral                 |
| `description` | string   | Descripción de la experiencia laboral en parrafo |
| `first_year`  | number   | Año en el que inició la experiencia laboral      |
| `final_year`  | number   | Año en el que finalizó la experiencia laboral    |
| `stack`       | string[] | Tecnologías con las que se trabajaron            |


## Contacto

| Campo      | Tipo   | Descripción |
| ---------- | ------ | ----------- |
| `email`    | string | Contacto    |
| `whatsapp` | string | Contacto    |
| `discord`  | string | Contacto    |

## Redes sociales

| Campo       | Tipo   | Descripción      |
| ----------- | ------ | ---------------- |
| `github`    | string | Link a GitHub    |
| `linkedin`  | string | Link a LinkedIn  |
| `instagram` | string | Link a Instagram |
| `tiktok`    | strin  | Link a TikTok    |

## Servicios
| Campo         | Tipo   | Descripción              |
| ------------- | ------ | ------------------------ |
| `name`        | string | Nombre del servicio      |
| `description` | string | Descripción del servicio |
| `price`       | number | Precio                   |

## Proyectos

| Campo         | Tipo     | Descripción                        |
| ------------- | -------- | ---------------------------------- |
| `title`       | string   | Nombre del proyecto                |
| `description` | string   | Qué problema resolvió y para quién |
| `stack`       | string[] | Tecnologías usadas                 |
| `githubUrl`   | string   | Link al repositorio                |
| `liveUrl`     | string   | Link al demo en vivo               |
| `image`       | string   | Ruta de la captura o imagen        |
| `featured`    | boolean  | Si aparece destacado en el hero    |

## Casos de éxito

| Campo         | Tipo    | Descripción                              |
| ------------- | ------- | ---------------------------------------- |
| `client`      | string  | Nombre del cliente o empresa             |
| `project`     | string  | Proyecto asociado                        |
| `problem`     | string  | Problema que tenía el cliente antes      |
| `solution`    | string  | Qué construiste para resolverlo          |
| `result`      | string  | Resultado concreto después de la entrega |
| `testimonial` | string  | Cita textual del cliente si la hay       |
| `approved`    | boolean | Si el cliente aprobó que se publique     |

## Relaciones entre entidades 

|Entidad A|Relación|Entidad B|Descripción|
|---|---|---|---|
|**Perfil**|Uno a uno|**Contacto**|El perfil tiene un único bloque de contacto|
|**Perfil**|Uno a uno|**Redes sociales**|El perfil tiene un único bloque de redes|
|**Perfil**|Composición|**Contacto**|Contacto no tiene sentido sin Perfil|
|**Perfil**|Composición|**Redes sociales**|Redes sociales no tiene sentido sin Perfil|
|**Perfil**|Uno a muchos|**Proyectos**|Todos los proyectos pertenecen al mismo perfil|
|**Perfil**|Uno a muchos|**Servicios**|Todos los servicios pertenecen al mismo perfil|
|**Perfil**|Uno a muchos|**Casos de éxito**|Todos los casos pertenecen al mismo perfil|
|**Proyectos**|Agregación|**Casos de éxito**|Un proyecto puede tener un caso de éxito asociado, pero existe aunque no lo tenga|
|**Casos de éxito**|Referencia|**Proyectos**|Un caso apunta al proyecto que lo originó mediante `project`|
|**Proyectos**|Independiente|**Servicios**|Un proyecto no pertenece a un servicio ni viceversa|
|**Servicios**|Independiente|**Redes sociales**|No tienen relación entre sí|
|**Servicios**|Independiente|**Contacto**|No tienen relación formal — el contacto aplica a todo el perfil|
|**Proyectos**|Independiente|**Redes sociales**|Un proyecto tiene su propio `githubUrl`, no depende de la entidad Redes|
