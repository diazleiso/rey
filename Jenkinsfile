pipeline {
    agent { label 'agente-docker-01' }

    environment {
        DOCKER_USER  = 'ldiazsoanit'
        IMAGE_NAME   = 'mi-backend-piloto'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
        FULL_IMAGE   = "${DOCKER_USER}/${IMAGE_NAME}"

        AZURE_REPO_URL = 'https://SOAINTCORP@dev.azure.com/SOAINTCORP/ECU_2026-0000001_REYBANPAC_IMPLEMENTACION_ARQUIECTURA%20CONTENEDRS/_git/ECU_2026-0000001_REYBANPAC_IMPLEMENTACION_ARQUIECTURA%20CONTENEDRS'
        BRANCH = 'master'
    }

    stages {
         stage('Clonar Repositorio AZURE') {
                    steps {
                        echo 'CLONADO DE AZURE REPO'
                         git(
                              url: "${AZURE_REPO_URL}",
                              branch: "${BRANCH}",
                              credentialsId: 'azure-devops-creds'
                              )
                        sh 'ls -la'
                    }
         }




        stage('Clonar Repositorio') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Testear Código') {
                    steps {
                        echo "Test Unitarios"

                    }
        }
        stage('Escanear Código con SonarQube') {
                    steps {
                        echo "Escanear Código con SonarQube"

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
                    credentialsId: 'docker_proyecto',
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


       stage('Despliegue en k8s') {
                   steps {
                       echo "☸️ Configurando acceso al clúster de Kubernetes..."

                       withKubeConfig([credentialsId: 'k8s_config']) {

                           echo "🔍 Probando conexión con el clúster..."
                           sh 'kubectl cluster-info'

                           echo "🚀 Asegurando la existencia del namespace..."
                           sh "kubectl apply -f manifiest-k8s/namespace.yaml || true"

                           echo "🔑 Inyectando credenciales de Docker Hub en Kubernetes..."
                           // Usamos la misma credencial de Jenkins para generar el secreto en K8s de forma segura
                           withCredentials([usernamePassword(
                               credentialsId: 'docker_proyecto',
                               usernameVariable: 'DOCKER_USER_K8S',
                               passwordVariable: 'DOCKER_TOKEN_K8S'
                           )]) {
                               sh """
                                   kubectl -n reybanpac-piloto create secret docker-registry regcred \
                                       --docker-server=https://index.docker.io/v1/ \
                                       --docker-username="${DOCKER_USER_K8S}" \
                                       --docker-password="${DOCKER_TOKEN_K8S}" \
                                       --dry-run=client -o yaml | kubectl apply -f -
                               """
                           }

                           echo "🚀 Aplicando manifiestos de Kubernetes (service, deployment)..."
                           sh "kubectl apply -f manifiest-k8s/backend-service.yaml"
                           sh "kubectl apply -f manifiest-k8s/backend-deployment.yaml"

                           echo "🔁 Actualizando la imagen del deployment al build actual: ${FULL_IMAGE}:${IMAGE_TAG}"
                           sh "kubectl -n reybanpac-piloto set image deployment/backend-piloto-deployment backend-piloto=${FULL_IMAGE}:${IMAGE_TAG}"

                           echo "⏳ Esperando a que el rollout termine..."
                           sh "kubectl -n reybanpac-piloto rollout status deployment/backend-piloto-deployment --timeout=120s"

                           echo "📋 Estado final de los pods en el namespace reybanpac-piloto"
                           sh "kubectl -n reybanpac-piloto get pods -o wide"
                       }
                   }
               }

    }
}