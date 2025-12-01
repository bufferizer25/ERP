pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        IMAGE_NAME = "${env.REGISTRY}/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}:latest"
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
                dir('batch14-cicd') {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('batch14-cicd') {
                    bat 'npm test'
                }
            }
        }

        stage('Build App') {
            steps {
                dir('batch14-cicd') {
                    bat 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME% ./batch14-cicd'
            }
        }

        stage('Docker Login') {
            steps {
                bat """
                    echo %GITHUB_TOKEN% | docker login %REGISTRY% ^
                    -u %GITHUB_REPO_OWNER% --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %IMAGE_NAME%'
            }
        }
    }

    post {
        success {
            echo "🎉 Deployment Successful! Image pushed: $IMAGE_NAME"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
