pipeline {
  agent any
  stages {
    stage('Test') {
      agent {
        docker { image 'node:latest' }
      }
      steps {
        sh 'npm i'
        sh 'npm run build'
      }
    }
  }
}
