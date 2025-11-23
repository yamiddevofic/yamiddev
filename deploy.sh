#!/bin/bash

echo "🚀 Iniciando despliegue a Vercel..."
echo ""

# Paso 1: Sincronizar archivos del contenedor al host
echo "🔄 Sincronizando archivos del contenedor al sistema host..."
CONTAINER_NAME="yamid_frontend"

# Verificar si el contenedor está corriendo
if ! sudo docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "⚠️  El contenedor ${CONTAINER_NAME} no está corriendo."
  read -p "¿Continuar de todas formas? (y/n): " CONTINUE
  if [[ "$CONTINUE" != "y" && "$CONTINUE" != "Y" ]]; then
    echo "❌ Despliegue cancelado."
    exit 1
  fi
else
  echo "✅ Contenedor ${CONTAINER_NAME} encontrado"
  
  # Copiar archivos compilados si existen (dist, .astro, etc.)
  echo "📦 Copiando archivos generados del contenedor..."
  
  # Copiar dist si existe
  if sudo docker exec ${CONTAINER_NAME} test -d /app/dist 2>/dev/null; then
    sudo docker cp ${CONTAINER_NAME}:/app/dist ./frontend/dist 2>/dev/null || true
    echo "  ✓ Carpeta dist sincronizada"
  fi
  
  # Copiar .astro si existe
  if sudo docker exec ${CONTAINER_NAME} test -d /app/.astro 2>/dev/null; then
    sudo docker cp ${CONTAINER_NAME}:/app/.astro ./frontend/.astro 2>/dev/null || true
    echo "  ✓ Carpeta .astro sincronizada"
  fi
  
  echo "✅ Archivos sincronizados"
fi

echo ""

# Paso 2: Verificar si hay cambios en git
echo "🔍 Verificando cambios en git..."
if [[ -n $(git status --porcelain) ]]; then
  echo "📝 Cambios detectados. Preparando commit..."
  
  # Agregar todos los cambios
  git add .
  
  # Solicitar mensaje de commit o usar uno por defecto
  read -p "💬 Mensaje de commit (Enter para usar mensaje automático): " COMMIT_MSG
  if [[ -z "$COMMIT_MSG" ]]; then
    COMMIT_MSG="Deploy: Actualización automática $(date '+%Y-%m-%d %H:%M:%S')"
  fi
  
  # Hacer commit
  git commit -m "$COMMIT_MSG"
  echo "✅ Commit realizado"
  
  # Push a repositorio
  echo "📤 Subiendo cambios al repositorio..."
  git push
  echo "✅ Cambios subidos al repositorio"
else
  echo "ℹ️  No hay cambios locales para commitear"
fi

echo ""

# Paso 3: Desplegar a Vercel
echo "🚀 Desplegando a Vercel..."

# Preguntar si desplegar a producción o preview
read -p "🎯 ¿Desplegar a producción? (y/n, default: n): " DEPLOY_PROD

if [[ "$DEPLOY_PROD" == "y" || "$DEPLOY_PROD" == "Y" ]]; then
  echo "🌟 Desplegando a PRODUCCIÓN..."
  npx vercel --prod
else
  echo "🔍 Desplegando a PREVIEW..."
  npx vercel
fi

echo ""
echo "✅ Despliegue completado."
echo "🎉 ¡Todo listo! Frontend desplegado con éxito en Vercel."
