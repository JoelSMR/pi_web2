# syntax=docker/dockerfile:1.7

# Imagen única con Maven + JDK 21 (compila y ejecuta)
FROM maven:3.9.9-eclipse-temurin-21-alpine

# Directorio de trabajo
WORKDIR /app

# 1) Copiamos solo el pom para cachear dependencias
COPY pom.xml ./

# Opcional: calentar dependencias para cache (acelera builds)
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -q -DskipTests dependency:go-offline

# 2) Copiamos el código fuente
COPY src ./src

# 3) Compilamos el JAR (reempacado por Spring Boot)
RUN --mount=type=cache,target=/root/.m2 \
    mvn -B -DskipTests clean package

# Puerto de la app
EXPOSE 8080

# Ajustes JVM opcionales
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError -Djava.security.egd=file:/dev/urandom"

# 4) Ejecutamos el JAR correcto (evitando original- y -plain)
CMD sh -c 'JAR=$(ls -1 target/*.jar | grep -v -E "/original-.*\\.jar$|\\-plain\\.jar$" | head -n1) \
  && echo "Running $JAR" \
  && java -jar "$JAR"'