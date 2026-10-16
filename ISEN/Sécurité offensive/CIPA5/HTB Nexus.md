Port enum:
```bash
nmap -p- nexus.htb
```

Subdomain enum:
```bash
wfuzz -c --hw 10 -Z -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.nexus.htb" http://nexus.htb 
```

DB Password:
Aller sur le git regarder l'history du .env et boom

Version de krayin CRM:
Se logger sur billing avec le mail trouvé (j.matthew@nexus.htb) et le mot de passe (N27xh!!2ucY04)

Exploitation CVE-2026-38526
Dans le formulaire d'envoie de mail il y a un endroit pour upload une PJ.
On crée `shell.`