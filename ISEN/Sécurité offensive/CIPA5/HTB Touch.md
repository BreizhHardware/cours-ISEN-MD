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
