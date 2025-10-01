pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Clonando repositorio..."
                checkout scm
            }
        }

        stage('Levantar entorno con Docker Compose') {
            steps {
                echo "🚀 Levantando entorno con Docker Compose..."
                sh 'docker compose up -d --build'
            }
        }

        stage('Esperar servicios') {
            steps {
                echo "⏳ Esperando que los servicios arranquen..."
                sh 'sleep 20'
            }
        }

        stage('Ejecutar pruebas JMeter') {
            steps {
                echo "🧪 Ejecutando pruebas con JMeter..."
                sh '''
                    docker run --rm --network=perf-e2e_perfnet \
                        -v $PWD/jmeter:/tests \
                        justb4/jmeter \
                        -n -t /tests/plan-de-prueba.jmx -l /tests/resultados.jtl -e -o /tests/reporte
                '''
            }
        }

        stage('Archivar reportes') {
            steps {
                echo "📦 Archivando reportes de JMeter..."
                archiveArtifacts artifacts: 'jmeter/reporte/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Limpiando entorno..."
            sh 'docker compose down'
        }
    }
}

