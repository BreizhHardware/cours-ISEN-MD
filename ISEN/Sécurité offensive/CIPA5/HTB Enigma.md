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

