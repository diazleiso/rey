pipeline {
    agent { label 'agente-docker-01' }

    environment {
        // Tu usuario de Docker Hub
        DOCKER_USER  = 'osiel11dc'
        IMAGE_NAME   = 'mi-backend-piloto'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
        // Formato para Docker Hub: osiel11dc/mi-backend-piloto
        FULL_IMAGE   = "${DOCKER_USER}/${IMAGE_NAME}"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo "🚀 Construyendo la imagen de Node.js para Reybanpac..."
                sh """
                    cd backend-piloto && \
                    docker build -t ${FULL_IMAGE}:${IMAGE_TAG} -t ${FULL_IMAGE}:latest .
                """
                echo "✅ ¡Imagen construida con éxito!"
            }
        }

        stage('Subir a Docker Hub') {
            steps {
                echo "🔑 Iniciando sesión en Docker Hub..."
                withCredentials([usernamePassword(
                    credentialsId: 'osiel11dc_dockerhub',
                    usernameVariable: 'DOCKER_HUB_USER',
                    passwordVariable: 'DOCKER_HUB_TOKEN'
                )]) {
                    sh """
                        echo "\$DOCKER_HUB_TOKEN" | docker login -u "\$DOCKER_HUB_USER" --password-stdin

                        echo "📤 Subiendo imagen con versión del build..."
                        docker push ${FULL_IMAGE}:${IMAGE_TAG}

                        echo "📤 Subiendo imagen con tag latest..."
                        docker push ${FULL_IMAGE}:latest

                        echo "🔒 Cerrando sesión..."
                        docker logout
                    """
                }
                echo "🎉 ¡Imágenes arriba en Docker Hub!"
            }
        }

        stage('Desplegar en Kubernetes') {
            steps {
                echo "☸️ Iniciando despliegue en el Namespace: reybanpac-piloto..."

                withCredentials([string(credentialsId: 'osiel11dc_kubeconfig', variable: 'KUBE_TXT')]) {
                    sh """
                        # 1. Crear el archivo temporal de acceso
                        echo "${KUBE_TXT}" > .kubeconfig

                        # 2. Buscar CUALQUIER archivo yaml o yml en la carpeta y reemplazar la imagen
                        find manifiest-k8s/ -type f \\( -name "*.yml" -o -name "*.yaml" \\) -exec sed -i "s|IMAGE_TO_REPLACE|${FULL_IMAGE}:${IMAGE_TAG}|g" {} +

                        # 3. Aplicar de golpe todo lo que esté dentro de la carpeta manifiest-k8s
                        kubectl --kubeconfig=.kubeconfig apply -f manifiest-k8s/

                        # 4. Monitorear que el pod levante bien en Kubernetes
                        kubectl --kubeconfig=.kubeconfig rollout status deployment/backend-piloto-deployment -n reybanpac-piloto

                        # 5. Destruir las credenciales temporales del disco por seguridad
                        rm -f .kubeconfig
                    """
                }
                echo "🚀 ¡Despliegue finalizado con éxito en Kubernetes!"
            }
        }
    }
}