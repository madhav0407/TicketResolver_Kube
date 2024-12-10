pipeline {
     environment{
        dockerimage=""
        VAULT_PASS = credentials("ansible-vault-pass")
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
                sh '''
                echo "$VAULT_PASS" > /tmp/vault_pass.txt
                chmod 600 /tmp/vault_pass.txt
                ansible-playbook -i inventory --vault-password-file /tmp/vault_pass.txt deploy.yml
                rm -f /tmp/vault_pass.txt
                '''
            }
        }

    }
}
