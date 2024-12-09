pipeline {
     environment{
        dockerimage=""
    }
    agent any
    stages {
        stage('Git clone') {
            steps {
            git branch: 'master',url: 'https://github.com/madhav0407/TicketResolver_Kube.git'
            }
        }
        stage('Docker Build Image') {
            steps {
                script{
                    dockerimage=docker.build "madhavsood04/ticketresolver_frontend"
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script{
                    docker.withRegistry('','DockerHubCred'){
                    dockerimage.push()
                    }
                }
            }
        }
          stage("Removing Image from local"){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        
        stage('Ansible pull docker image') {
            steps {
                ansiblePlaybook colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                inventory: 'inventory',
                playbook: 'deploy.yml'
                // vaultCredentialsId: 'vault-pass'
            }
        }
      
    }
}
