
# 🌐 Portafolio Web de Yamid Horacio Rodríguez

¡Bienvenido a mi portafolio web! Este sitio presenta mi trayectoria profesional, proyectos destacados y las tecnologías que domino como desarrollador de software.

## 🧾 Descripción

Este proyecto contiene el código fuente de mi sitio personal, accesible en [yamid.dev](https://www.yamid.dev/). En él comparto información sobre mi formación, experiencia laboral, proyectos realizados y formas de contacto.

## ✨ Características

- **Secciones principales**:
  - **Sobre mí**: Presentación personal y trayectoria.
  - **Proyectos**: Galería de trabajos destacados con detalles y capturas.
  - **Tecnologías**: Herramientas y lenguajes que utilizo y estoy aprendiendo.
  - **Contacto**: Formulario de contacto directo y enlaces a redes sociales.

- **Diseño responsivo**: Optimizado para dispositivos móviles y de escritorio.

## 🛠 Tecnologías Utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Herramientas y Otros**:
  - [Astro](https://astro.build/)
  - [Docker](https://www.docker.com/)

## 🚀 Instalación y Uso

Puedes correr este proyecto localmente usando Docker:

### 1. Clonar el repositorio

```bash
git clone https://github.com/yamiddevofic/yamiddev.git
cd yamiddev
```

### 2. Iniciar la aplicación con Docker

Asegúrate de tener [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

```bash
docker-compose up
```

Esto construirá la imagen y servirá la aplicación en [http://localhost:4321](http://localhost:4321)

### 3. Ver los cambios en tiempo real

Gracias al volumen montado en Docker, cualquier cambio en tu código fuente se reflejará automáticamente en el navegador si estás en modo desarrollo.

---
## 📁 Estructura del Proyecto

```plaintext
yamiddev/
├── dist/                 # Archivos generados para producción
├── public/               # Archivos públicos accesibles desde la raíz
├── src/                  # Código fuente del sitio web
│   ├── components/       # Componentes reutilizables (Nav, People, etc.)
│   ├── layouts/          # Diseños base del sitio
│   ├── lib/              # Librerías o utilidades
│   ├── pages/            # Páginas del sitio
│   └── styles/           # Archivos de estilo
├── .dockerignore         # Exclusiones para la imagen Docker
├── .gitignore            # Exclusiones de Git
├── astro.config.mjs      # Configuración de Astro
├── CHANELOG.md           # Historial de cambios
├── components.json       # Configuración de componentes
├── docker-compose.yml    # Orquestación de contenedores
├── Dockerfile            # Imagen para producción
├── Dockerfile.dev        # Imagen para desarrollo
├── package.json          # Dependencias y scripts de npm
├── postcss.config.js     # Configuración de PostCSS
├── tailwind.config.js    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Documentación del proyecto

## 🌍 Sitio en producción

Puedes visitar el sitio en: **[yamid.dev](https://www.yamid.dev/)**

---

## 📬 Contacto

¿Quieres hablar de tecnología, colaborar o contratarme?  
Puedes contactarme directamente desde el sitio o en [LinkedIn](https://www.linkedin.com/in/yamiddevofic/).

---

## 🧠 Nota

Este proyecto está en constante evolución, así como mis habilidades como desarrollador. ¡Gracias por visitarlo!
