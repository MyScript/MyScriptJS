#! /bin/bash

[ -z "${GIT_CREDENTIAL_LOGIN}" ] && echo "missing environment variable GIT_CREDENTIAL_LOGIN" && exit 1
[ -z "${GIT_CREDENTIAL_PASSWORD}" ] && echo "missing environment variable GIT_CREDENTIAL_PASSWORD" && exit 1

echo "machine zen.visionobjects.com" > ${HOME}/.netrc && \
echo "login ${GIT_CREDENTIAL_LOGIN}" >> ${HOME}/.netrc && \
echo "password ${GIT_CREDENTIAL_PASSWORD}" >> ${HOME}/.netrc


# Copy files from /usr/share/jenkins/ref into /var/jenkins_home
# So the initial JENKINS-HOME is set with expected content. 
# Don't override, as this is just a reference setup, and use from UI 
# can then change this, upgrade plugins, etc.
copy_reference_file() {
	f=${1%/} 
	echo "$f"
    rel=${f:23}
    dir=$(dirname ${f})
    echo " $f -> $rel"    
	if [[ ! -e /var/jenkins_home/${rel} ]] 
	then
		echo "copy $rel to JENKINS_HOME"
		mkdir -p /var/jenkins_home/${dir:23}
		cp -r /usr/share/jenkins/ref/${rel} /var/jenkins_home/${rel}; 
	fi; 
}
export -f copy_reference_file
find /usr/share/jenkins/ref/ -type f -exec bash -c 'copy_reference_file {}' \;

nohup bash -c "while ! curl --output /dev/null --silent --head --fail http://localhost:8080; do sleep 1 && echo -n .; done; cat /atkbackend.job.xml | java -jar  /usr/local/bin/jenkins-cli.jar -s http://localhost:8080 create-job atkbackend" > /dev/null &

# if `docker run` first argument start with `--` the user is passing jenkins launcher arguments
if [[ $# -lt 1 ]] || [[ "$1" == "--"* ]]; then
   exec java $JAVA_OPTS -jar /usr/share/jenkins/jenkins.war $JENKINS_OPTS "$@"
fi

# As argument is not jenkins, assume user want to run his own process, for sample a `bash` shell to explore this image
exec "$@"

