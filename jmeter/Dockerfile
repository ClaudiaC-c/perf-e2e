FROM justb4/jmeter:5.6.3

# Copiamos el plan de pruebas y dataset
COPY plan-de-prueba.jmx /tests/plan-de-prueba.jmx
COPY usuarios.csv /tests/usuarios.csv

# Prometheus Listener JAR (para métricas)
ADD https://repo1.maven.org/maven2/kg/apc/jmeter-plugins-prometheus-listener/0.7/jmeter-plugins-prometheus-listener-0.7.jar /opt/apache-jmeter-5.6.3/lib/ext/

WORKDIR /tests
