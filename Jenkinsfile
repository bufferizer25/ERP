pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        REPO_OWNER = "bufferizer25"
        REPO_NAME = "ERP"
        IMAGE_NAME = "ghcr.io/${REPO_OWNER}/${REPO_NAME}:latest"
        GITHUB_TOKEN = credentials('ghcr_token')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/bufferizer25/ERP'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Docker Login') {
            steps {
                bat """
                echo %GITHUB_TOKEN% | docker login %REGISTRY% ^
                -u %REPO_OWNER% --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                bat "docker push %IMAGE_NAME%"
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment Successful!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
