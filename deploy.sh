#!/bin/bash

# Asegúrate de estar en la rama principal
git checkout main

# Guardar cambios de rama main
git add .
git commit -m "Deploy update: $(date '+%Y-%m-%d %H:%M:%S')"

# Construir el proyecto (genera la carpeta dist)
npm run build

# Mueve el contenido de dist a la rama deploy
git subtree push --prefix dist origin deploy

