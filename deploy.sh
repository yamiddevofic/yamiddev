#!/bin/bash

# Asegúrate de estar en la rama principal
git checkout main

# Construir el proyecto (genera la carpeta dist)
npm run build

# Mueve el contenido de dist a la rama deploy
git subtree push --prefix dist origin deploy

