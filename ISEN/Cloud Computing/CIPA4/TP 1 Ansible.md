#CIPA4 #CloudComputing #DP #Ansible #TP
## TP 1
```Bash
ssh root@135.125.246.84
```
mdp : moutarde42

### Installation
Install ansible on `localhost`

```text
apt install ansible
```

### Ad-hoc ping
Q: What happened behing the scene?
It ping the localhost.

### Ad-hoc shell
Q: what command can you use to get the IP of your machine?
```Bash
ansible localhost -m shell -a "ip a"
```

### Ad-hoc setup
Q: using this module, what other command can you use to retrieve the ip of your host?
```Bash
ansible localhost -m setup -a "filter=ansible_default_ipv4"
```