pipeline {
    agent { label 'agente-docker-01' }

    environment {
        IMAGE_NAME = 'mi-backend-piloto'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"


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
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .
                """
                echo "✅ ¡Imagen construida!"
            }
        }
    }
}