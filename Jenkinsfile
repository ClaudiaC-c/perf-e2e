pipeline {
    agent any
    stages {
        stage('Clonar repo') {
            steps {
                echo 'Clonando repositorio...'
                checkout scm
            }
        }
        stage('Prueba básica') {
            steps {
                echo '✅ Jenkins está leyendo bien el repo y el Jenkinsfile'
            }
        }
    }
}
