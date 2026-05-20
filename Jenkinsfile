pipeline {
    agent { label 'agente-docker-01' }

    environment {
        DOCKER_USER  = 'osiel11dc'
        IMAGE_NAME   = 'mi-backend-piloto'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
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
                    script {
                        // Escribir el archivo manteniendo la estructura YAML original
                        writeFile file: '.kubeconfig', text: KUBE_TXT

                        sh """
                            # Buscar CUALQUIER archivo yaml o yml en la carpeta y reemplazar la imagen
                            find manifiest-k8s/ -type f \\( -name "*.yml" -o -name "*.yaml" \\) -exec sed -i "s|IMAGE_TO_REPLACE|${FULL_IMAGE}:${IMAGE_TAG}|g" {} +

                            # Aplicar todo lo que esté dentro de la carpeta manifiest-k8s
                            kubectl --kubeconfig=.kubeconfig apply -f manifiest-k8s/

                            # Monitorear que el pod levante bien en Kubernetes
                            kubectl --kubeconfig=.kubeconfig rollout status deployment/backend-piloto-deployment -n reybanpac-piloto

                            # Destruir las credenciales temporales por seguridad
                            rm -f .kubeconfig
                        """
                    }
                }
                echo "🚀 ¡Despliegue finalizado con éxito en Kubernetes!"
            }
        }
    }
}