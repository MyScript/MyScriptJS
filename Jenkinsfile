pipeline {
    agent any

    environment {
        PROJECTNAME = 'myscriptjs ${env.BRANCH_NAME}'
        PROJECTHOME = '/tmp/myscriptjs'
        SELENIUM_ENV = 'chrome'
        PROJECT_DIR= "${WORKSPACE.replace('/var/jenkins_home/workspace','/dockervolumes/cloud/master/jenkins/workspace')}"
        MAKE_ARGS=" PROJECT_DIR=${env.PROJECT_DIR} HOME=${env.PROJECTHOME} SELENIUM_ENV=${env.SELENIUM_ENV} BUILDID=${env.BUILD_NUMBER} "
    }

    stages {

      stage ('purge'){
        steps {
          sh "make ${env.MAKE_ARGS} purge"
        }
      }

      stage ('prepare'){
        steps {
          sh "make ${env.MAKE_ARGS} prepare"
        }
      }

      stage ('docker'){
        steps {
          sh "make ${env.MAKE_ARGS} docker"
        }
      }

      stage ('test'){
        steps {
          sh "make ${env.MAKE_ARGS} test"
        }
      }

      stage ('docs'){
        steps {
          sh "make ${env.MAKE_ARGS} docs"
        }
      }
    }

    post {
        always {
             sh "make ${env.MAKE_ARGS} killdocker"
        }

        success {
            slackSend color: "good", message: "${env.PROJECTNAME}: Build success ${env.JOB_NAME} ${env.BUILD_NUMBER}."
        }
        unstable {
            slackSend color: "warning", message: "${env.PROJECTNAME}: Unstable build, ${currentBuild.fullDisplayName} is unstable"
        }
        failure {
            slackSend color: "danger", message: "@group ${env.PROJECTNAME}: FAILURE, ${currentBuild.fullDisplayName} failed see there ${env.BUILD_URL}"
        }
        /* changed {
            slackSend color: "good", message: "${env.PROJECTNAME}: Build changed"
        }*/
    }
}
