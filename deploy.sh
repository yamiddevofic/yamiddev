#!/bin/bash
set -e  # Detener la ejecución si ocurre un error

# Configurar usuario de Git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Asegurarte de que estás trabajando en la rama main
git checkout main

# Asegurar sincronización con el remoto
git fetch origin deploy || true

# Resetear la rama remota si es necesario (opcional, sobrescribe cambios remotos)
git branch -D deploy || true  # Eliminar rama local deploy si existe
git push origin --delete deploy || true  # Eliminar rama remota deploy si existe

# Crear una nueva rama deploy y subir los cambios de la carpeta dist
git subtree push --prefix dist origin deploy
