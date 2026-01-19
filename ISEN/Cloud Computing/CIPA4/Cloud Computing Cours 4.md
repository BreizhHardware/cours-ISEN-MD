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
`demo-flask.yml`
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
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: demo-flask-service
spec:
  selector:
    app: demo-flask
  ports:
  - port: 8080
    targetPort: 8080
  type: LoadBalancer 
```

```bash
kubectl apply -f demo-flask.yml
```


# TP Kube Partie 2
`cat-and-dog.yml`
```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: dog-config
data:
  start.py: |-
    #!/usr/bin/env python3
    import platform, json, urllib.request
    from flask import Flask
    app = Flask(__name__)
    @app.route('/')
    def homepage():
        with urllib.request.urlopen("https://api.thedogapi.com/v1/images/search?limit=1") as url:
            data = json.loads(url.read().decode())
            img_url = data[0]['url']
        html = '''
        <html><head>
        <style>
        html {{
            background: url({}) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }}
        h1 {{
            color: white;
            top: 30%;
            position: absolute;
            width: 100%;
            font-size: 70px;
        }}
        </style>
        </head><body><center><h1>DOG hello from<br/>{}</h1></center></body></html>
        '''.format(img_url, platform.node())
        return html
    if __name__ == "__main__":
        app.run(host='0.0.0.0', port=8080)
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-flask-cat
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-flask
  template:
    metadata:
      labels:
        app: demo-flask
        version: cat
    spec:
      containers:
      - name: demo-flask
        image: arnaudmorin/demo-flask:latest
        ports:
        - containerPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-flask-dog
spec:
  replicas: 3
  selector:
    matchLabels:
      app: demo-flask
  template:
    metadata:
      labels:
        app: demo-flask
        version: dog
    spec:
      containers:
      - name: demo-flask
        image: arnaudmorin/demo-flask:latest
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: config-volume
          mountPath: /app/start.py
          subPath: start.py
      volumes:
      - name: config-volume
        configMap:
          name: dog-config
          defaultMode: 0755
---
apiVersion: v1
kind: Service
metadata:
  name: demo-flask-service
spec:
  selector:
    app: demo-flask
  ports:
  - port: 8080
    targetPort: 8080
  type: LoadBalancer
```

