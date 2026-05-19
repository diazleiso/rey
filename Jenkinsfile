pipeline {
    agent any

    environment {
        // Definimos el nombre y el tag de tu imagen para tener un código limpio
        IMAGE_NAME = 'mi-backend-piloto'
        IMAGE_TAG  = "${env.BUILD_NUMBER}" // Usa el número de build de Jenkins como versión
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
                echo "🚀 Entrando a backend-piloto y construyendo la imagen..."

                // Con 'cd' entramos a la carpeta, '&&' une los comandos si el anterior fue exitoso
                sh """
                    cd backend-piloto && \
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .
                """

                echo "✅ ¡Imagen ${IMAGE_NAME}:${IMAGE_TAG} construida con éxito!"

                // Opcional: listar las imágenes locales para confirmar que se creó
                sh 'docker images | grep mi-backend-piloto'
            }
        }
    }
}