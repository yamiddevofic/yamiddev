# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> 📌 **Nota**: A partir de la versión `0.1.0` se retomó el registro de cambios tras una serie de mejoras acumuladas.

## [Unreleased]
### Added
- Integración de Notion para mostrar información personal.
- Implementación de sección de contacto con correo electrónico.
- Implementación de páginas para cada artículo del blog.
### fixed
- Corrección de efecto no deseado en transición de scrolL
---
## [0.2.0] - 2025-04-10

### Added
- Integración de CMS Headless con WordPress para mostrar artículos del blog.
- Implementación de sección de blog dinámico consumiendo la API REST de WordPress.
- Sección de CV descargable incluida en el sitio web.
- Componente `BlogCard` para renderizar artículos con diseño limpio y adaptable.

### Changed
- Ajustado el layout principal para incluir navegación hacia la sección de blog y CV.
- Mejorada la experiencia visual del blog con estilos responsivos y soporte para modo oscuro.
- Configuraciones de fetch actualizadas para consumir correctamente los datos desde WordPress.

### Fixed
- Corrección de errores de formato de fecha con `date-fns` y localización en español.
- Solucionado problema donde no se reflejaban cambios de WordPress por URLs estáticas.

---
## [0.1.0] - 2025-04-09

### Added
- Configuración de contenedor con `Dockerfile` y `Dockerfile.dev`.
- Archivo `docker-compose.yml` para entorno de desarrollo.
- Sección de pantallazos en el README.
- Estructura detallada del proyecto en README.
- Ignorados `_astro`, `dist`, `.vscode` en `.gitignore`.

### Changed
- Refactorizada la estructura de carpetas bajo `src/`.
- Mejorado el archivo `README.md` con nuevas secciones y estilo.

### Fixed
- Corrección en las rutas de puertos para servir correctamente el sitio en Docker.

---

## [0.0.1] - 2024-12-25

### Added
- Initial project setup with basic structure and dependencies.

### Changed
- None

### Deprecated
- None

### Removed
- None

### Fixed
- None

### Security
- None
