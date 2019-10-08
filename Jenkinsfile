#!/usr/bin/groovy 
pipeline{
	agent any
	stages{
		stage('Prepare Environment'){
			steps{
				git branch: 'master',url: 'https://github.com/leap-cognizant/angularjs-springmvc-sample-boot.git'
				slackSend (color: '#00529B', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Prepare Environment Completed")
			}
		}
		stage('Unit Test'){
			steps{
				sh 'mvn clean test' 
				junit testResults: 'target/surefire-reports/*.xml'
				slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Unit Test Completed")
			}
		}
		stage('Security Analysis'){
			steps{
				checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'angularjs-springmvc-sample-boot-zap']], userRemoteConfigs: [[credentialsId: 'null', url: 'https://github.com/leap-cognizant/angularjs-springmvc-sample-boot.git']]])
				dir('angularjs-springmvc-sample-boot-zap'){
					startZap(host: "localhost" , port: 8095, timeout: 100, zapHome: "/opt/zaproxy" , allowedHosts:[''],sessionPath:"")
					runZapCrawler(host: "https://reqres.in")
					runZapAttack(scanPolicyName:'active',userId:1)
					archiveZap(failAllAlerts: 25, failHighAlerts: 25, failMediumAlerts:25, failLowAlerts: 25, falsePositivesFilePath: "zapFalsePositives.json")
					withSonarQubeEnv('SonarQube') {
						sh 'mvn clean compile $SONAR_MAVEN_GOAL -Dsonar.zaproxy.reportPath=$JENKINS_HOME/jobs/$JOB_NAME/builds/$BUILD_NUMBER/zap/zap-raw.xml' 
					}
					slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Security Analysis Completed (<${currentBuild.absoluteUrl}zap|Open>)")
				}
			}
		}
		stage('Static Code Analysis'){
			steps{
				checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'angularjs-springmvc-sample-boot-static']], userRemoteConfigs: [[credentialsId: 'null', url: 'https://github.com/leap-cognizant/angularjs-springmvc-sample-boot.git']]])
				dir('angularjs-springmvc-sample-boot-static'){
					withSonarQubeEnv('SonarQube') { sh 'mvn clean install $SONAR_MAVEN_GOAL cobertura:cobertura -Dcobertura.report.format=xml  -Dsonar.cobertura.reportPath=target/site/cobertura/coverage.xml -Dsonar.zaproxy.reportPath=$JENKINS_HOME/jobs/$JOB_NAME/builds/$BUILD_NUMBER/zap/zap-raw.xml'  }
					slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Static Code Analysis Completed (<${currentBuild.absoluteUrl}cobertura/|Open Code Coverage Report>) (<$SONAR_URL/dashboard?id=com.hantsylabs.restexample.springmvc%3Aangularjs-springmvc-sample-boot|Open SonarQube Report>)")
					cobertura coberturaReportFile: 'target/site/cobertura/coverage.xml'
				}
			}
		}
		stage('Smoke Test'){
			agent{
				docker{
					image 'weremsoft/gulp-xvfb-headless-chrome-protractor'
				}
			}
			steps{
				checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'Smoke']], userRemoteConfigs: [[credentialsId: 'null', url: 'https://github.com/leap-cognizant/Smoke.git']]])
				dir('Smoke'){
					sh '''chmod 777 ./ci/scripts/functional-test.sh
					./ci/scripts/functional-test.sh''' 
					junit testResults: 'tests/*.xml'
					slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Smoke Test Completed (<${env.BUILD_URL}${"testReport/"}|TestReports>) (<https://app.saucelabs.com/dashboard/tests|SauceLabs Video>)")
				}
			}
		}
		stage('Functional Tests'){
			parallel{
				stage('Regression Test'){
					agent{
						docker{
							image 'weremsoft/gulp-xvfb-headless-chrome-protractor'
						}
					}
					steps{
						checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'Integration']], userRemoteConfigs: [[credentialsId: 'null', url: 'https://github.com/leap-cognizant/Integration.git']]])
						dir('Integration'){
							sh '''chmod 777 ./ci/scripts/functional-test.sh
							./ci/scripts/functional-test.sh''' 
							junit healthScaleFactor: 1.1,testResults: 'tests/*.xml'
							slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - Regression Test Completed (<${env.BUILD_URL}${"testReport/"}|TestReports>) (<https://app.saucelabs.com/dashboard/tests|SauceLabs Video>)")
						}
					}
				}
				stage('API Test'){
					agent{
						docker{
							image 'node:7'
						}
					}
					steps{
						checkout([$class: 'GitSCM', branches: [[name: 'master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'api-postman']], userRemoteConfigs: [[credentialsId: 'null', url: 'https://github.com/leap-cognizant/api-postman.git']]])
						dir('api-postman'){
							sh '''chmod 777 ./ci/scripts/functional-test.sh
							./ci/scripts/functional-test.sh''' 
							junit testResults: 'tests/*.xml'
							slackSend (color: '#00FF00', message: "Job #${env.BUILD_NUMBER} '<${env.BUILD_URL}|${env.JOB_NAME} >' - API Test Completed (<${env.BUILD_URL}${"testReport/"}|TestReports>)")
						}
					}
				}
			}
		}
	}
}