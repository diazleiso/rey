pipeline {
    // CAMBIO CRÍTICO: Apuntar al agente correcto que configuraste en tu clúster
    agent { label 'agente-docker-01' }

    environment {
        IMAGE_NAME = 'mi-backend-piloto'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                checkout scm
                echo '=== ARCHIVOS CLONADOS ==='
                sh 'ls -la'
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo "🚀 Entrando a backend-piloto y construyendo la imagen usando agente-docker-01..."

                sh """
                    cd backend-piloto && \
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .
                """

                echo "✅ ¡Imagen ${IMAGE_NAME}:${IMAGE_TAG} construida con éxito!"
            }
        }
    }
}