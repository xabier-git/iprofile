#!/bin/bash

set -e
# Detener en caso de error
# === Verificación de versión de Node.js ===
REQUIRED_NODE_MAJOR=18
MAX_NODE_MAJOR_SUPPORTED=20

CURRENT_NODE_VERSION=$(node -v | sed 's/v//')
CURRENT_NODE_MAJOR=$(echo $CURRENT_NODE_VERSION | cut -d. -f1)

echo "🧪 Verificando versión de Node.js: v$CURRENT_NODE_VERSION"

# Detectar versiones impares (no LTS)
if (( $CURRENT_NODE_MAJOR % 2 != 0 )); then
  echo "⚠️  Advertencia: Estás usando Node.js v$CURRENT_NODE_VERSION (versión impar, no LTS)."
  echo "🔁 Se recomienda cambiar a una versión LTS como v$MAX_NODE_MAJOR_SUPPORTED o v$REQUIRED_NODE_MAJOR."
fi

# Verificar que sea una versión >= v18 y <= v20
if (( $CURRENT_NODE_MAJOR < $REQUIRED_NODE_MAJOR || $CURRENT_NODE_MAJOR > $MAX_NODE_MAJOR_SUPPORTED )); then
  echo "❌ ERROR: Node.js v$CURRENT_NODE_VERSION no es compatible. Usa una versión entre v$REQUIRED_NODE_MAJOR y v$MAX_NODE_MAJOR_SUPPORTED."
  exit 1
fi

# CONFIGURACIÓN
REPO_URL="https://github.com/xabier-git/iprofile.git"  # <-- CAMBIA ESTO si es necesario
REPO_DIR="iprofile"
FRONT_DIR="./iprofile-frontend"
BACK_DIR="./iprofile-backend"
K8S_DIR="./k8s"

BACKEND_IMAGE="iprofile-backend:latest"
FRONTEND_IMAGE="iprofile-frontend:latest"

echo "🚀 Verificando existencia de proyectos..."

# Verifica si el repo remoto existe antes de continuar
if ! git ls-remote "$REPO_URL" &> /dev/null; then
    echo "❌ ERROR: El repositorio remoto $REPO_URL no existe o no es accesible."
    exit 1
fi


if [ ! -d "$REPO_URL" ] ; then
    echo "🔄 No se encontro el repo. Clonando repositorio desde GitHub rama 'evolucion'..."
    git clone --branch evolucion "$REPO_URL" "$REPO_DIR"
    cd "$REPO_DIR"
else
    echo "✅ Proyectos encontrados. Actualizando desde rama 'evolucion'..."
    cd "$REPO_DIR"
    git fetch origin
    git checkout evolucion
    git pull origin evolucion
fi

# Asegurarse de estar en la raíz del proyecto
cd "$(dirname "$0")"

# === BACKEND ===
echo "📦 Backend: Instalando dependencias si es necesario..."
if [ ! -d "$BACK_DIR/node_modules" ]; then
    (cd $BACK_DIR && npm install)
else
    echo "✅ node_modules ya existe en backend."
fi

echo "🐳 Construyendo imagen backend..."
docker build -t $BACKEND_IMAGE $BACK_DIR

# === FRONTEND ===
echo "📦 Frontend: Instalando dependencias si es necesario..."
if [ ! -d "$FRONT_DIR/node_modules" ]; then
    (cd $FRONT_DIR && npm install)
else
    echo "✅ node_modules ya existe en frontend."
fi

echo "🏗️ Construyendo frontend Angular (ng build)..."
(cd $FRONT_DIR && npx ng build)

echo "🐳 Construyendo imagen frontend..."
docker build -t $FRONTEND_IMAGE $FRONT_DIR

# === K8s Deploy ===
echo "♻️ Eliminando recursos anteriores de Kubernetes..."
kubectl delete -f $K8S_DIR/ingress.yaml --ignore-not-found
kubectl delete -f $K8S_DIR/frontend-deployment.yaml --ignore-not-found
kubectl delete -f $K8S_DIR/frontend-service.yaml --ignore-not-found
kubectl delete -f $K8S_DIR/backend-deployment.yaml --ignore-not-found
kubectl delete -f $K8S_DIR/backend-service.yaml --ignore-not-found
# Nota: Si quieres borrar Mongo también, descomenta estas dos líneas
# kubectl delete -f $K8S_DIR/mongo-deployment.yaml --ignore-not-found
# kubectl delete -f $K8S_DIR/mongo-service.yaml --ignore-not-found

echo "📦 Aplicando manifiestos Kubernetes..."
kubectl apply -f $K8S_DIR/mongo-pvc.yaml
kubectl apply -f $K8S_DIR/mongo-deployment.yaml
kubectl apply -f $K8S_DIR/mongo-service.yaml

kubectl apply -f $K8S_DIR/backend-deployment.yaml
kubectl apply -f $K8S_DIR/backend-service.yaml

kubectl apply -f $K8S_DIR/frontend-deployment.yaml
kubectl apply -f $K8S_DIR/frontend-service.yaml

kubectl apply -f $K8S_DIR/ingress.yaml

echo "✅ Despliegue completo y actualizado."

