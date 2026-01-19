#DP #CIPA4 #CloudComputing 
# TP Kube
## Creating a service
Q: using curl, which command can you run to perform a HTTP request to your `first-dep` deployment?
```bash
curl http://135.125.246.84:8080
```

Q: how many pods do you have? Why?
1 pods, it use 1 by default

## Edit your deployment
Q: how can you do a curl request to a specific pod?
```bash
╰λ kubectl get pods -o wide
NAME                         READY   STATUS    RESTARTS   AGE     IP           NODE      NOMINATED NODE   READINESS GATES
first-dep-6d75bd9fc8-l4f65   1/1     Running   0          5m50s   10.42.0.9    isen-41   <none>           <none>
first-dep-6d75bd9fc8-zngh4   1/1     Running   0          4s      10.42.0.11   isen-41   <none>           <none>
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://10.42.0.9
curl: (7) Failed to connect to 10.42.0.9 port 80 after 0 ms: Couldn't connect to server
[ble: exit 7]
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://10.42.0.9:8080
Hello Kubernetes bootcamp! | Running on: first-dep-6d75bd9fc8-l4f65 | v=1
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://10.42.0.11:8080
Hello Kubernetes bootcamp! | Running on: first-dep-6d75bd9fc8-zngh4 | v=1
```

Q: how many pods do you have?
2

Q: is the output always the same? Explain why.
```bash
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://135.125.246.84:8080
Hello Kubernetes bootcamp! | Running on: first-dep-6d75bd9fc8-zngh4 | v=1
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://135.125.246.84:8080
Hello Kubernetes bootcamp! | Running on: first-dep-6d75bd9fc8-l4f65 | v=1
```
No it balance between all pods to balance the load.

## Updating the app
Q: do you see the `v=2`?
Yes
```bash
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ kubectl get pods
NAME                         READY   STATUS        RESTARTS   AGE
first-dep-588887cc8d-2jqbw   1/1     Running       0          15s
first-dep-588887cc8d-6jpqj   1/1     Running       0          12s
first-dep-588887cc8d-bpj8r   1/1     Running       0          11s
first-dep-6d75bd9fc8-l4f65   1/1     Terminating   0          8m51s
first-dep-6d75bd9fc8-mg6fl   1/1     Terminating   0          69s
first-dep-6d75bd9fc8-zngh4   1/1     Terminating   0          3m5s
╭─ 💁 root at 💻 isen-41 in 📁 ~
╰λ curl http://135.125.246.84:8080
Hello Kubernetes bootcamp! | Running on: first-dep-588887cc8d-6jpqj | v=2
```

## Demo-flask
demo-flask.yml
```Yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-flask
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-flask
  template:
    metadata:
      labels:
        app: demo-flask
    spec:
      containers:
      - name: demo-flask
        image: arnaudmorin/demo-flask:latest
        ports:
        - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: demo-flask-service
spec:
  selector:
    app: demo-flask
  ports:
  - port: 808
    targetPort: 5000
  type: LoadBalancer 
```

