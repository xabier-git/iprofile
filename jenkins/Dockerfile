FROM jenkins/jenkins:lts

USER root

# Instalar paquetes necesarios
RUN apt-get update && \
 apt-get install -y sudo && \
 apt-get install -y git && \
 apt-get install -y curl && \
 apt-get install -y gnupg2 && \
 apt-get install -y lsb-release && \
 apt-get install -y software-properties-common && \
 apt-get install -y apt-transport-https && \
 apt-get install -y ca-certificates && \
 apt-get install -y docker.io && \
 apt-get install -y nodejs && \
 apt-get install -y npm && \
 apt-get install -y unzip

# Instalar bash
RUN apt-get install -y bash
RUN apt-get clean

# Cambia el shell a bash para los siguientes comandos
SHELL ["/bin/bash", "-c"]
# Descargar kubectl
# Obtener la versión estable de kubectl
#RUN export KUBECTL_VERSION=$(curl -s https://dl.k8s.io/release/stable.txt)
#RUN echo "KUBECTL_VERSION=${KUBECTL_VERSION}"
#RUN curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"

#RUN curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
#    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
#    rm kubectl

# Descargar e instalar kubectl en un solo RUN
RUN KUBECTL_VERSION=$(curl -Ls https://dl.k8s.io/release/stable.txt) && \
    echo "KUBECTL_VERSION=${KUBECTL_VERSION}" && \
    curl -L "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl" -o kubectl && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
    rm kubectl && \
    kubectl version --client

# Vuelve al shell por defecto si lo necesitas
SHELL ["/bin/sh", "-c"]

# Instalar kubectl
#RUN install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && rm kubectl && \
#    kubectl version --client


# Dar acceso a Docker
# Configurar Docker
RUN usermod -aG docker jenkins 
#&& \
#    chmod 666 /var/run/docker.sock

# Configurar npm global sin sudo
RUN mkdir -p /usr/local/lib/node_modules && \
    chown -R jenkins:jenkins /usr/local/lib/node_modules

USER jenkins



# despues de levantae el dockercompose
# Visita http://localhost:8082
# obten la clave:
#docker exec -it iprofile-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
