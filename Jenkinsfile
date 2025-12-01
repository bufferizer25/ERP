pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        IMAGE_NAME = "${env.REGISTRY}/${env.GITHUB_REPO_OWNER}/${env.GITHUB_REPO_NAME}:latest"
        GITHUB_TOKEN = credentials('ghcr_token')   // Jenkins credential (secret text)
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
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Docker Login') {
            steps {
                sh """
                   echo $GITHUB_TOKEN | docker login $REGISTRY \
                   -u ${env.GITHUB_REPO_OWNER} --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE_NAME'
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
