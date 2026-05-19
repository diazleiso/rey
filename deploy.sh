#!/bin/bash

# Script para desplegar los manifiestos de Kubernetes del backend piloto Reybanpac
# Autor: SOAINT Chile
# Proyecto: ECU_2026-0000001_REYBANPAC_IMPLEMENTACION_ARQUITECTURA_CONTENEDRS

set -e  # Detener el script si hay errores

# Colores para salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio de manifiestos
MANIFESTS_DIR="./manifiest-k8s"

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  Despliegue Backend Piloto Reybanpac   ${NC}"
echo -e "${BLUE}===========================================${NC}"

# Verificar conexión a Kubernetes
echo -e "${YELLOW}Verificando conexión a Kubernetes...${NC}"
if ! kubectl cluster-info &> /dev/null; then
    echo -e "${RED}Error: No se puede conectar al cluster de Kubernetes${NC}"
    echo -e "${RED}Por favor, verifica tu configuración de kubectl${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Conexión a Kubernetes verificada${NC}"

# Verificar si el directorio de manifiestos existe
if [ ! -d "$MANIFESTS_DIR" ]; then
    echo -e "${RED}Error: El directorio de manifiestos no existe: $MANIFESTS_DIR${NC}"
    exit 1
fi

# Listar archivos que se van a aplicar
echo -e "${YELLOW}Archivos a aplicar:${NC}"
ls -la "$MANIFESTS_DIR"/*.yaml 2>/dev/null || echo -e "${YELLOW}No se encontraron archivos .yaml${NC}"

# Aplicar manifiestos en orden correcto
echo -e "${YELLOW}Aplicando manifiestos de Kubernetes...${NC}"

# 1. Crear namespace primero
echo -e "${YELLOW}Creando namespace...${NC}"
kubectl apply -f "$MANIFESTS_DIR/namespace.yaml"

# 2. Esperar a que el namespace esté disponible
echo -e "${YELLOW}Esperando a que el namespace esté disponible...${NC}"
sleep 3
# Verificar que el namespace existe
if ! kubectl get namespace reybanpac-piloto &> /dev/null; then
    echo -e "${RED}Error: El namespace no se creó correctamente${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Namespace disponible${NC}"

# 3. Eliminar deployment existente si existe
echo -e "${YELLOW}Verificando y eliminando deployment existente...${NC}"
if kubectl get deployment backend-piloto-deployment -n reybanpac-piloto &> /dev/null; then
    echo -e "${YELLOW}Eliminando deployment existente...${NC}"
    kubectl delete deployment backend-piloto-deployment -n reybanpac-piloto
    echo -e "${YELLOW}Esperando a que los pods se eliminen...${NC}"
    kubectl wait --for=delete pod -l app=backend-piloto -n reybanpac-piloto --timeout=60s || true
fi

# 4. Aplicar deployment
echo -e "${YELLOW}Aplicando deployment...${NC}"
kubectl apply -f "$MANIFESTS_DIR/backend-deployment.yaml"

# 5. Aplicar service
echo -e "${YELLOW}Aplicando service...${NC}"
kubectl apply -f "$MANIFESTS_DIR/backend-service.yaml"

# Verificar el estado del despliegue
echo -e "${YELLOW}Verificando estado del despliegue...${NC}"
kubectl get deployments -n reybanpac-piloto
kubectl get pods -n reybanpac-piloto
kubectl get services -n reybanpac-piloto

# Esperar a que el pod esté listo
echo -e "${YELLOW}Esperando a que el pod esté listo...${NC}"
kubectl wait --for=condition=ready pod -l app=backend-piloto -n reybanpac-piloto --timeout=300s

# Mostrar información del servicio
echo -e "${YELLOW}Información del servicio:${NC}"
kubectl get service backend-piloto-service -n reybanpac-piloto -o wide

# Mostrar logs del pod (últimas 20 líneas)
echo -e "${YELLOW}Últimas líneas del log del pod:${NC}"
POD_NAME=$(kubectl get pods -n reybanpac-piloto -l app=backend-piloto -o jsonpath='{.items[0].metadata.name}')
kubectl logs $POD_NAME -n reybanpac-piloto --tail=20

echo -e "${GREEN}===========================================${NC}"
echo -e "${GREEN}  ¡Despliegue completado exitosamente!   ${NC}"
echo -e "${GREEN}===========================================${NC}"
echo -e "${BLUE}Pod: $POD_NAME${NC}"
echo -e "${BLUE}Namespace: reybanpac-piloto${NC}"
echo -e "${BLUE}Servicio: backend-piloto-service:3000${NC}"
