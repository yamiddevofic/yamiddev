#!/bin/bash
#!/bin/bash
set -e  # Detener la ejecución si ocurre algún error

# Configurar usuario de Git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Crear o actualizar la rama deploy
if git ls-remote --exit-code origin deploy; then
  # Si la rama deploy existe, eliminarla para evitar conflictos
  git push origin --delete deploy
fi

# Subir la carpeta dist a la rama deploy
git subtree push --prefix dist origin deploy
