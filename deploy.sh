#!/bin/bash
source .env

### 🚀 FRONTEND: build y despliegue ###

echo "🚀 Ejecutando build en el contenedor..."
docker exec -it "$CONTENEDOR" bash -c "npm run build"

echo "📦 Copiando contenido de 'dist' del contenedor al host..."
rm -rf "$CARPETA_ORIGEN"
mkdir -p "$CARPETA_ORIGEN"
docker cp "$CONTENEDOR":/app/dist/. "$CARPETA_ORIGEN"

echo "🧹 Borrando archivos antiguos en el servidor remoto (excepto /wordpress)..."
ssh -p "$PUERTO" "$USUARIO@$SERVIDOR" <<EOF
  shopt -s extglob
  cd "$RUTA_REMOTA" || exit
  rm -rf !("wordpress")
EOF

echo "📤 Subiendo contenido de 'dist' al servidor remoto..."
scp -r -P "$PUERTO" "$CARPETA_ORIGEN/"* "$USUARIO@$SERVIDOR:$RUTA_REMOTA/"

echo "✅ Despliegue del frontend completado."
echo "🎉 ¡Todo listo! Frontend desplegado con éxito."
