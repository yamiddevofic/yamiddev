#!/bin/bash
source .env


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
