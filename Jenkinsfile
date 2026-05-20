pipeline {
    agent { label 'agente-docker-01' }

    environment {
        DOCKER_USER  = 'diazleiso'
        IMAGE_NAME   = 'mi-backend-piloto'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
        // Formato requerido por Docker Hub: usuario/nombre-imagen
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
                echo "✅ ¡Imagen construida!"
            }
        }

        stage('Subir a Docker Hub') {
            steps {
                echo "🔑 Iniciando sesión en Docker Hub..."
                // Inyectamos las credenciales de forma segura usando el ID que creamos en Jenkins
                withCredentials([usernamePassword(
                    credentialsId: 'osiel11dc_dockerhub',
                    usernameVariable: 'DOCKER_HUB_USER',
                    passwordVariable: 'DOCKER_HUB_TOKEN'
                )]) {
                    sh """
                        echo "${DOCKER_HUB_TOKEN}" | docker login -u "${DOCKER_HUB_USER}" --password-stdin
                        echo "📤 Subiendo imágenes..."
                        docker push ${FULL_IMAGE}:${IMAGE_TAG}
                        docker push ${FULL_IMAGE}:latest
                        echo "🔒 Cerrando sesión..."
                        docker logout
                    """
                }
                echo "🎉 ¡Imágenes subidas a Docker Hub con éxito!"
            }
        }
    }
}