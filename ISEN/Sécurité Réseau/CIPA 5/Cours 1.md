#Cyber #CIPA5 #Cisco #SécuritéRéseau
Un simulateur imite un système et l'autre vise à le reproduire le plus fidèlement possible le système d'origine

4 pilliers de l'IT/OT:
- Type de réseau

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
```