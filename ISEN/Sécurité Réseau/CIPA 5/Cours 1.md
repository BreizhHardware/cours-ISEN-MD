#Cyber #CIPA5 #Cisco #SécuritéRéseau
Un simulateur imite un système et l'autre vise à le reproduire le plus fidèlement possible le système d'origine

4 pilliers de l'IT/OT:
- Type de réseau
- Architecture

| Type de réseau |         |                                 |      |      |        |
| :------------: | :-----: | :-----------------------------: | ---- | ---- | ------ |
|      LAN       | éditeur | Cisco/Juniper/HPE/Dell/Ubiquiti | WLAN | Wifi | PAN    |
|      MAN       | editeur |          Opérateur FR           | WMAN |      | SD-WAN |
|      WAN       | editeur |        Opérateur FR / US        | WWAN |      | SD-WAN |

```CISCO
S1>enable
S1#conf term
S1(config)#banner motd "Interdit si pas personnel"
S1(config)#enable password cisco
S1(config)#line console 0 
S1(config-line)#login
S1(config-line)#password cisco
S1(config-line)#line vty 0 15
S1(config-line)#login
S1(config-line)#password cisco
S1(config-line)#exit
S1(config)#exit
S1#show run
S1#show startup
S1#copy running-config startup-config
S1#conf term
S1(config)#service password-encryption
S1(config)#interface vlan 1
S1(config-if)#ip address 1.1.1.1 255.0.0.0
S1(config-if)#no shutdown
S1#show interfaces status
S1#show ip interface brief
```

![](Pasted%20image%2020261002165703.png)


| Couche OSI |     Materiel      | Prot       |
| :--------: | :---------------: | ---------- |
|     7      | Firewall DNS DHCP |            |
|     6      |                   |            |
|     5      |                   |            |
|     4      |                   |            |
|     3      |      Router       | IP décimal |
|     2      |      Switch       | hexa - Mac |
|     1      |       Cable       | bit        |

Max 30 saut avant que le packet IP soit drop

Désactiver des interfaces
```CISCO
enable
conf t
interface range fastEthernet 0/4 - 24
shutdown
end
show run
```

Mettre un mdp et une banner sur un switch
```CISCO
enable
conf t
banner motd c interdit pour les personnes non autorise c
enable password cisco
line console 0
login
password cisco
exit
line vty 0 15
login
password cisco
end
wr
```