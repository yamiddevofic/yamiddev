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

# Crear un commit en la rama main que actualice la referencia a la rama deploy
git checkout main
git add .
git commit -m "Deploy to Hostinger 🚀"
git push origin main

# Volver a la rama deploy
git checkout deploy

# Imprimir mensaje de éxito
echo "Deploy exitoso 🎉"
