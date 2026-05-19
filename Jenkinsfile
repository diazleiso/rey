pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                // Paso 1: Descarga el código de GitHub
                checkout scm

                echo '=== LISTANDO CONTENIDO DEL ESPACIO DE TRABAJO ==='

                // Paso 2: Muestra una lista simple de los archivos clonados
                sh 'ls -la'



                // Paso 3: Si quieres ver el texto interno de un archivo específico (ej: pom.xml)
                // sh 'cat pom.xml'
            }
        }
    }
}