FROM --platform=linux/amd64 openjdk:21
LABEL maintainer="nilsotto@gmx.de"
EXPOSE 8080
ADD backend/target/color-up-2.jar color-up-2.jar
CMD [ "sh", "-c", "java -jar /color-up-2.jar" ]