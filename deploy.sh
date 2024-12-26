#!/bin/bash
set -e  # Detener la ejecución si ocurre un error

# Configurar usuario de Git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Asegurarte de que estás en la rama main
git checkout main

# Eliminar la rama deploy si existe localmente y remotamente
git branch -D deploy || true
git push origin --delete deploy || true

# Crear una nueva rama deploy con el contenido de dist
git subtree push --prefix dist origin deploy
