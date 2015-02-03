- Build

        docker build -t webtest:5000/myscriptjsjenkins .

- Deploy

        docker push webtest:5000/myscriptjsjenkins

- Local launch

        GIT_LOGIN=XXXXX
        GIT_PASSWD=XXXXX
        JENKINS_DATA_DIR=XXXXX
        docker run -v /var/run/docker.sock:/var/run/docker.sock --privileged -e "GIT_CREDENTIAL_LOGIN=${GIT_LOGIN}" -e "GIT_CREDENTIAL_PASSWORD=${GIT_PASSWD}" -v ${JENKINS_DATA_DIR}:/var/jenkins_home --rm -it -p 8080:8080 webtest:5000/myscriptjsjenkins
