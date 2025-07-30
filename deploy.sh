#!/bin/bash
source .env

echo "🚀 Iniciando despliegue del frontend..."
echo "Entrando a tu contenedor docker..."
echo "Compilando el frontend..."
sudo docker exec -it yamid_frontend bash -c "npm run build"
echo "frontend compilado con exito"
echo ""

echo "🧹 Borrando archivos antiguos en el servidor remoto (excepto /wordpress)..."
ssh -p "$PUERTO" "$USUARIO@$SERVIDOR" <<EOF
  shopt -s extglob
  cd "$RUTA_REMOTA" || exit
  rm -rf !("wordpress")
EOF

echo "📤 Subiendo contenido de 'dist' al servidor remoto..."
scp -r -P "$PUERTO" "frontend$CARPETA_ORIGEN/"* "$USUARIO@$SERVIDOR:$RUTA_REMOTA/"

echo "✅ Despliegue del frontend completado."
echo "🎉 ¡Todo listo! Frontend desplegado con éxito."
