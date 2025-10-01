pipeline {
    agent any

    stages {
        stage('Build & Deploy Stack') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Run JMeter Tests') {
            steps {
                sh '''
                    docker build -t perf-e2e-jmeter ./jmeter
                    docker run --network=perf-e2e_perfnet \
                        -v ${WORKSPACE}/out:/out \
                        perf-e2e-jmeter \
                        -n -t /test/plan-de-prueba.jmx \
                        -Jhost=node_app -Jport=3000 \
                        -l /out/resultados.jtl \
                        -e -o /out/report
                '''
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'out/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            sh 'docker compose down'
        }
    }
}
