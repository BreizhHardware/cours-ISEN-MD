#CIPA5 #SécuritéOffensive #Cyber 

Audit != pentest
Audit: Pas forcément technique, comparer les docs avec ce qui se fait réellement, un audit peut être automatiser

# Outils par phase

|        Phase         |                    Outils principaux                     |                         Objectif                         |
| :------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
|    Reconnaissance    | WHOIS, Shodan, theHarvester, Amass, crt.sh, Google Dorks | Cartographier la surface d'attaque sans toucher la cible |
|       Scanning       |         Nmap, Nikto, gobuster, ffuf, feroxbuster         |                                                          |
|     Exploitation     |         Metasploit, SQLmap, Burp Suite, Impacket         |                                                          |
|  Post-Exploitation   |    kMimikatz, BloodHound, evil-winrm, secretsdunp.py     |                                                          |
| Privilege Escalation |           LinPEAS, winPEAS, GTFObins, PEASS-ng           |                                                          |

# Reconnaissance

2 parties, une active et une passive