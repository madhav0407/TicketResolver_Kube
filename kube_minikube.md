# Setup K8s on Jenkins - Run these before executing Jenkins Pipeline

```bash
minikube start
```

After starting Minikube, the kubeconfig file should be created automatically in the default location (~/.kube/config). Verify it exists:

```bash
ls ~/.kube/config
```

Make sure minikube context is setup

```bash
kubectl config current-context
```

Once the config file exists, copy it to the jenkins directory

```bash
sudo mkdir -p /var/lib/jenkins/.kube
sudo cp ~/.kube/config /var/lib/jenkins/.kube/config
sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube
chmod 600 /var/lib/jenkins/.kube/config
```

Test the kubectl with jenkins user

```bash
sudo -u jenkins kubectl cluster-info --kubeconfig=/var/lib/jenkins/.kube/config
```

If this gives you a client key error, then run these cmds

```bash
ls -l /home/{user}/.minikube/profiles/minikube/
```

```bash
sudo chown -R {user}:jenkins /home/{user}/.minikube/profiles/minikube
sudo chmod -R 755 /home/{user}/.minikube/profiles/minikube
```

Then run the previous cmd to grant jenkins user permission.

