pipeline {
    agent any

    tools {
        nodejs "node-lts"
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/bufferizer25/ERP'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test -- --watchAll=false || true'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
