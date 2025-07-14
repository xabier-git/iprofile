FROM jenkins/jenkins:lts

USER root

# Instalar paquetes necesarios
RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y gnupg2
RUN apt-get install -y lsb-release
RUN apt-get install -y software-properties-common
RUN apt-get install -y apt-transport-https
RUN apt-get install -y ca-certificates
RUN apt-get install -y docker.io
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y unzip

# Instalar bash
RUN apt-get install -y bash

RUN apt-get clean

SHELL ["/bin/bash", "-c"]
# Descargar kubectl
# Obtener la versión estable de kubectl
RUN export KUBECTL_VERSION=$(curl -s https://dl.k8s.io/release/stable.txt)
RUN echo "KUBECTL_VERSION=${KUBECTL_VERSION}"
RUN curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
SHELL ["/bin/sh", "-c"]

# Instalar kubectl
RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && rm kubectl

# Dar acceso a Docker
RUN usermod -aG docker jenkins

USER jenkins

# despues de levantae el dockercompose
# Visita http://localhost:8080
# obten la clave:
#docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
