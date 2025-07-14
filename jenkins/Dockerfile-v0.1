FROM jenkins/jenkins:lts

USER root

# Instalar Docker CLI y kubectl dentro del contenedor Jenkins
RUN apt-get update && \
    apt-get install -y docker.io curl apt-transport-https ca-certificates gnupg && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl && \
    usermod -aG docker jenkins

USER jenkins


#docker build -t my-jenkins .
#docker run -d --name jenkins \
#  -v /var/run/docker.sock:/var/run/docker.sock \
#  -v jenkins_home:/var/jenkins_home \
#  -p 8080:8080 -p 50000:50000 \
#  my-jenkins
