pipeline {
    agent { label 'agente-docker' }


    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                checkout scm
            }
        }
    }
}