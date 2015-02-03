FROM debian:jessie

ENV DEBIAN_FRONTEND noninteractive

RUN \
	apt-get update && \
	apt-get install -y dbus wget curl git zip docker.io netcat-openbsd  && \
	apt-get clean autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#install nodejs
RUN \
	bash -c "curl -sL https://deb.nodesource.com/setup | bash -" && \
	apt-get install -y nodejs && \
	apt-get clean autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install npm globals
RUN npm install -g n node-gyp mocha bower grunt-cli
RUN n 0.10.33

RUN \
	apt-get update && \
	apt-get install -y openjdk-7-jre-headless && \
	apt-get clean autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#Download jenkins.war
RUN \
	mkdir -p /usr/share/jenkins/ && \
	curl -s -L http://mirrors.jenkins-ci.org/war/1.595/jenkins.war -o /usr/share/jenkins/jenkins.war

ENV JENKINS_HOME /var/jenkins_home
ENV JENKINS_VERSION 1.592
ENV JENKINS_UC https://updates.jenkins-ci.org
ENV HOME /root/
ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64

RUN echo 'DOCKER_OPTS="--insecure-registry webtest:5000"' >> /etc/default/docker

# Jenkins home directoy is a volume, so configuration and build history 
# can be persisted and survive image upgrades
VOLUME /var/jenkins_home

# `/usr/share/jenkins/ref/` contains all reference configuration we want
# or config file with your custom jenkins Docker image.
RUN mkdir -p /usr/share/jenkins/ref/init.groovy.d
COPY init.groovy /usr/share/jenkins/ref/init.groovy.d/tcp-slave-angent-port.groovy

# from a derived Dockerfile, can use `RUN plugins.sh plugins.txt` to setup /usr/share/jenkins/ref/plugins from a support bundle
ADD plugins.sh /usr/local/bin/plugins.sh
ADD plugins.txt /custom-plugins.txt
RUN /usr/local/bin/plugins.sh custom-plugins.txt

COPY jenkins-cli.jar /usr/local/bin/jenkins-cli.jar
COPY jenkins.sh /usr/local/bin/jenkins.sh

RUN git config --global user.name "Jenkins"
RUN git config --global user.email "webservices@myscript.com"

ADD myscriptjs.job.xml /myscriptjs.job.xml

ENTRYPOINT ["/usr/local/bin/jenkins.sh"]

EXPOSE 8080 50000
