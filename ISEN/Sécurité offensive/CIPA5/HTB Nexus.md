Port enum:
```bash
nmap -p- nexus.htb
```

Subdomain enum:
```bash
wfuzz -c --hw 10 -Z -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt -H "Host: FUZZ.nexus.htb" http://nexus.htb 
```

