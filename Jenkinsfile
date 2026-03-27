pipeline {
    agent any

    environment {
        // Docker Hub naming: Lowercase, no spaces
        DOCKER_IMAGE = 'darshan11111/sakhashri-seals-corporation'
        DOCKER_CREDENTIALS_ID = 'dockercreds'
    }

    stages {
        stage('Build & Test') {
            steps {
                echo 'Building and starting containers...'
                sh 'docker-compose up --build -d'
                
                echo 'Waiting for application to become healthy...'
                // Wait up to 30 seconds for port 3000 to be responsive
                sh 'sleep 10 && curl --silent --fail http://localhost:3000/api/health || (docker-compose logs && exit 1)'
            }
        }

        stage('Docker Login & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh 'echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin'
                        
                        echo 'Tagging and Pushing Image...'
                        
                        // Using the explicit image name from docker-compose.yml for consistency
                        sh "docker tag sakhashri-app ${DOCKER_IMAGE}:latest"
                        sh "docker tag sakhashri-app ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                        
                        sh "docker push ${DOCKER_IMAGE}:latest"
                        sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                    }
                }
            }
        }
    }

    post {
        
        success {
            echo 'Deployment Pipeline Completed Successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check Jenkins logs and Docker Compose status.'
        }
    }
}
