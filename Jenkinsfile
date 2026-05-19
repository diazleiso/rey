pipeline {
    agent { label 'agente-docker-01' }

    tools {
        maven 'Maven3'
    }

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