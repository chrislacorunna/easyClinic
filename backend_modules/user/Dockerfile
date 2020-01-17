FROM gradle:6.0.1-jdk8 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build

FROM openjdk:8-jdk-alpine
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/*.jar /user.jar
ENTRYPOINT ["java","-jar","/user.jar"]


