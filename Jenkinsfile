pipeline {
    agent { label 'agente-docker-01' }

    environment {
        // Tu usuario real de Docker Hub
        DOCKER_USER  = 'osiel11dc'
        IMAGE_NAME   = 'mi-backend-piloto'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
        // Formato obligatorio para Docker Hub: osiel11dc/mi-backend-piloto
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
                echo "🚀 Construyendo la imagen..."
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
                    credentialsId: 'dockerhub_diazleiso',
                    usernameVariable: 'DOCKER_HUB_USER',
                    passwordVariable: 'DOCKER_HUB_TOKEN'
                )]) {
                    // Combinamos de forma segura las variables de Jenkins y de Linux
                    sh """
                        echo "\$DOCKER_HUB_TOKEN" | docker login -u "\$DOCKER_HUB_USER" --password-stdin

                        echo "📤 Subiendo imagen con tag de compilación..."
                        docker push ${FULL_IMAGE}:${IMAGE_TAG}

                        echo "📤 Subiendo imagen con tag latest..."
                        docker push ${FULL_IMAGE}:latest

                        echo "🔒 Cerrando sesión..."
                        docker logout
                    """
                }
                echo "🎉 ¡Proceso terminado! Tus imágenes ya están públicas en tu perfil de Docker Hub."
            }
        }
    }
}