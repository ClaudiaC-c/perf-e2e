pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Clonando repositorio...'
                checkout scm
            }
        }

        stage('Levantar entorno con Docker Compose') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Esperar servicios') {
            steps {
                echo '⏳ Esperando que los servicios arranquen...'
                sh 'sleep 15'
            }
        }

        stage('Ejecutar pruebas JMeter') {
            steps {
                sh '''
                docker run --rm \
                  -v $PWD/jmeter:/jmeter \
                  -w /jmeter \
                  justb4/jmeter:5.6.3 \
                  -n -t plan-de-prueba.jmx \
                  -l /jmeter/out/results.jtl \
                  -e -o /jmeter/out/report
                '''
            }
        }

        stage('Archivar reportes') {
            steps {
                archiveArtifacts artifacts: 'jmeter/out/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            echo '🧹 Limpiando entorno...'
            sh 'docker compose down'
        }
    }
}
