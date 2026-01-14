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
1. ```
    docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started

```