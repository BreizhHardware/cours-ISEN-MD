#CIPA4 #CloudComputing #DP #Ansible #TP
## TP 3
```Bash
ssh root@135.125.246.84
```
mdp : moutarde42

### Step2
```yml
---
- hosts: demo
  gather_facts: yes
  tasks:
  - name: Install the git package
	apt:
		name: git
		state: present
  - name: Clone my flask application
	git:
		repo: 'https://github.com/arnaudmorin/demo-flask.git'
		dest: /root/demo-flask
```