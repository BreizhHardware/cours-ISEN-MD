#CIPA4 #CloudComputing #DP #Ansible #TP
## TP 4
```Bash
ssh root@135.125.246.84
```
mdp : moutarde42

### Step2
### 1. Structure des dossiers
```bash

mkdir -p roles/{flask_app,nginx_proxy}/tasks roles/{flask_app,nginx_proxy}/templates roles/{flask_app,nginx_proxy}/handlers
```

### 2. Rôle `flask_app`
#### Fichier : `roles/flask_app/tasks/main.yml`
```yaml
--- 
- name: Installer le paquet git   
  apt:    
    name: git    
    state: present 
- name: Cloner l'application Flask   
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
```

### 3. Rôle `nginx_proxy`
#### Fichier : `roles/nginx_proxy/tasks/main.yml`
```yaml
`--- 
- name: Installer Nginx   
  apt:    
    name: nginx    
    state: present 
- name: Configurer Nginx comme reverse proxy   
  template:    
    src: nginx.conf.j2    
    dest: /etc/nginx/sites-available/{{ server_name }}  
  notify: Restart Nginx 
- name: Activer la configuration du site   
  file:    
    src: /etc/nginx/sites-available/{{ server_name }}    
    dest: /etc/nginx/sites-enabled/{{ server_name }}    
    state: link  
  notify: Restart Nginx`
```
#### Fichier : `roles/nginx_proxy/handlers/main.yml`
```yaml
--- 
- name: Restart Nginx   
  service:    
    name: nginx    
    state: restarted`
```
#### Fichier : `roles/nginx_proxy/templates/nginx.conf.j2`
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

### 4. Playbook principal

#### Fichier : `playbook-role.yml`
```yaml

---
- hosts: demo   
  roles:    
  - flask_app 
    
- hosts: localhost   
  become: yes  
  vars:    
    proxy_port: 80    
    flask_port: 8080    
    server_name: "135.125.246.84"
  roles:    
    - role: nginx_proxy
```