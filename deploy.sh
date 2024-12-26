#!/bin/bash
set -e  # Detener la ejecución si ocurre algún error

# Configurar usuario de Git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Asegurar sincronización con la rama remota (evitar conflictos)
git fetch origin deploy || true
git pull origin deploy || true

# Subir la carpeta dist a la rama deploy
git subtree push --prefix dist origin deploy --force

