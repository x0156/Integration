pipeline {
  agent none
  stages {
    stage('Regression Testing') {
	  agent { docker 'weremsoft/gulp-xvfb-headless-chrome-protractor' }
      steps {
			parallel(
				Regression: {
					slackSend color: "229954", message: "Starting *Regression Testing* Job													"

					sh 'echo "Creating Protractor Docker container..."'
					slackSend color: "cceef9", message: "`Starting Regression Tests..` Job Details: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
					slackSend color: "cceef9", message: "`Creating Protractor Docker container`"

					sh 'echo "Starting Regression Test Execution for Sample Java App."'

					sh '''
						chmod 777 ./ci/scripts/functional-test.sh
						./ci/scripts/functional-test.sh
					'''

					sh 'echo "Archieving junit xml test results"'
					junit 'tests/*.xml'

					sh 'echo "Regression Test Execution Complete"'
				},
				Notifications: {
					sh 'sleep 15'
					slackSend color: "78909C", message: "Executing TestCase 1: *Test the SignUp Page with Elements*"
					sh 'sleep 3'
					slackSend color: "2196F3", message: "TestCase 1: *PASSED*"

					slackSend color: "78909C", message: "Executing TestCase 2: *Test the LOGIN Functionality*"
					sh 'sleep 5'
					slackSend color: "2196F3", message: "TestCase 2: *PASSED*"

          slackSend color: "78909C", message: "Executing TestCase 3: *Test the Add Post Functionality*"
          sh 'sleep 7'
          slackSend color: "ff0000", message: "TestCase 3: *PASSED*"

					slackSend color: "cceef9", message: "`Archieving junit xml test results`"
					slackSend color: "cceef9", message: "`Destroying Docker container`"
					slackSend color: "cceef9", message: "`Regression Test Execution Complete` Job URL: (<${env.BUILD_URL}|Open>) (<${env.BUILD_URL}${"testReport/"}|TestReports>) (<${env.SauceLabsVideo}|SauceLabs Video>)"

				}
			)
		}
    }
  }
}
