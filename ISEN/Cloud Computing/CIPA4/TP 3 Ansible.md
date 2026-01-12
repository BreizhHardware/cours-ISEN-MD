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

### Step3
```yaml
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
	- name: Install pip
		apt:
			name: python3-pip
			state: present
	- name: Install flask requirements
		pip:
			requirements: /root/demo-flask/requirements.txt
```

### Step4
```yaml
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
	- name: Install pip
		apt:
			name: python3-pip
			state: present
	- name: Install flask requirements
		pip:
			requirements: /root/demo-flask/requirements.txt
	- name: Start the flask application in background
		shell: "nohup /root/demo-flask/start.sh &"
```

### Step5
```Yaml
---
- hosts: demo
  gather_facts: yes
  tasks:
  - name: Installer le paquet git
	apt:
	  name: git
	  state: present
  - name: Cloner mon application Flask
	git:
	  repo: 'https://github.com/arnaudmorin/demo-flask.git'
	  dest: /root/demo-flask
  - name: Installer pip
	apt:
	  name: python3-pip
	  state: present
  - name: Installer les dépendances Flask
	pip:
	  requirements: /root/demo-flask/requirements.txt
  - name: Démarrer l'application Flask en arrière-plan
	shell: "nohup /root/demo-flask/start.sh &"
  

- hosts: localhost
  become: yes
  vars:
	proxy_port: 80
	flask_port: 8080
	server_name: "135.125.246.84"
  tasks:
  - name: Installer Nginx
	apt:
	  name: nginx
	  state: present
  - name: Configurer Nginx comme reverse proxy
	template:
	  src: nginx.conf.j2
	  dest: /etc/nginx/sites-available/demo
	notify: Restart Nginx
  - name: Activer la configuration du site
	file:
	  src: /etc/nginx/sites-available/demo
	  dest: /etc/nginx/sites-enabled/demo
	  state: link
	notify: Restart Nginx
  - name: Afficher l'URL d'accès au site
	debug:
	  msg: "Votre application est accessible à l'URL : http://{{ server_name }}"
  

handlers:
  - name: Restart Nginx
	service:
	  name: nginx
	  state: restarted
```

#### Fichier : `templates/nginx.conf.j2`
```nginx
server {     
	listen {{ proxy_port }};    
	server_name {{ server_name }};     
	
	location / {        
		proxy_pass http://127.0.0.2:{{ flask_port }};        
		proxy_set_header Host $host;        
		proxy_set_header X-Real-IP $remote_addr;    
	} 
}
```