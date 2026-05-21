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


       stage('Despligue en k8s ') {
                          steps {
                              echo "Despliegue en k8s"

                          }
                      }

    }
}