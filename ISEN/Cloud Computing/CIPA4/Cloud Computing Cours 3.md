#CloudComputing #DP #CIPA4 
# TP Git
## Basic commits
![](https://cdn.breizhhardware.fr/FAKA3/ZeDOlAPi85.png/raw)
![](https://cdn.breizhhardware.fr/FAKA3/FeKuhOzU03.png/raw)

## Basic staging
![](https://cdn.breizhhardware.fr/FAKA3/KaMiJEqa70.png/raw)
![](https://cdn.breizhhardware.fr/FAKA3/foGUYUME12.png/raw)

## Basic branching
![](https://cdn.breizhhardware.fr/FAKA3/RuBoMopA36.png/raw)

## ff-merge
![](https://cdn.breizhhardware.fr/FAKA3/fOwOhUJo22.png/raw)

## 3-way-merge
![](https://cdn.breizhhardware.fr/FAKA3/BodibOPO89.png/raw)

## Merge conflict
![](https://cdn.breizhhardware.fr/FAKA3/CUgimImu48.png/raw)

## Merge mergesort
![](https://cdn.breizhhardware.fr/FAKA3/NenINaJu95.png/raw)

## Rebase branch
![](https://cdn.breizhhardware.fr/FAKA3/lacAmIRI44.png/raw)

## Commit on wrong branch II
```Bash
git log --all
#get commit hash
git reset --hard HEAD~1
git switch new-feature 
git cherry-pick hash
ls
nano myapp.txt 
git add myapp.txt 
git status
git cherry-pick --continue
git merge master
git switch master
git log --oneline --graph --all
```

# TP Docker
```bash
# Our app
docker build -t getting-started .
docker run -dp 8080:3000 getting-started
docker ps
docker stop df7d1efc94cd
docker rm df7d1efc94cd

# Updating our app
nano src/static/js/app.js
docker build -t getting-started .
docker run -dp 8080:3000 getting-started

# Sharing our app
docker login nexus.mrqt.fr
docker build -t nexus.mrqt.fr/dockerr/getting-started:latest .
docker push nexus.mrqt.fr/dockerr/getting-started:latest

# Persisting our DB
docker run -d ubuntu bash -c "shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null"
docker exec 3b64c4b556b255f49d4587f34aea0b14201f05431af487068a9e35c0c98e2b0b cat /data.txt
# 3788
docker run -it ubuntu ls /
# bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
docker rm -f 3b64c4b556b255f49d4587f34aea0b14201f05431af487068a9e35c0c98e2b0b
docker volume create todo-db
docker ps
docker rm -f e7663a0b8f1d
docker run -dp 8080:3000 -v todo-db:/etc/todos getting-started
docker ps
docker rm -f c64257c38371
docker run -dp 8080:3000 -v todo-db:/etc/todos getting-started
docker volume inspect todo-db
#[
#    {
#        "CreatedAt": "2026-01-14T12:59:17Z",
#        "Driver": "local",
#        "Labels": null,
#        "Mountpoint": "/var/lib/docker/volumes/todo-db/_data",
#        "Name": "todo-db",
#        "Options": null,
#        "Scope": "local"
#    }
#]

# Using Bind Mounts
docker ps
docker rm -f adfa85f94341
docker run -dp 8080:3000 -w /app -v "$(pwd):/app" node:18-alpine sh -c "yarn install && yarn run dev"
docker ps
docker logs -f ec442a5d5d80
nano src/static/js/app.js
docker build -t getting-started .

# Multi-Container Apps
docker network create todo-app
docker run -d --network todo-app --network-alias mysql -v todo-mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=todos mysql:8.0
docker ps
docker exec -it cfdcbc8d1680 mysql -p
# secret
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| todos              |
+--------------------+
5 rows in set (0.00 sec)
mysql> exit
docker run -it --network todo-app nicolaka/netshoot
 89c761819671  ~  dig mysql


; <<>> DiG 9.20.17 <<>> mysql
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35535
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;mysql.                         IN      A

;; ANSWER SECTION:
mysql.                  600     IN      A       172.18.0.2

;; Query time: 0 msec
;; SERVER: 127.0.0.11#53(127.0.0.11) (UDP)
;; WHEN: Wed Jan 14 13:19:11 UTC 2026
;; MSG SIZE  rcvd: 44
 89c761819671  ~  exit
 
docker run -dp 8080:3000 -w /app -v "$(pwd):/app" --network todo-app -e MYSQL_HOST=mysql -e MYSQL_USER=root -e MYSQL_PASSWORD=secret -e MYSQL_DB=todos node:18-alpine sh -c "yarn install && yarn run dev"
docker ps
docker logs 57e59c98f9f8
```