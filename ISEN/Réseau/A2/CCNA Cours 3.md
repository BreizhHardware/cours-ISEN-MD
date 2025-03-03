#Réseau #A2 
[[CCNA Cours 2|Cours précédent]]

# Échauffement

| Adresse IP/Préfixe | Adresse Réseau | 1ère @hôte    | Dernière hôte | @diffusion    | @hôte |
| :----------------- | :------------- | :------------ | :------------ | :------------ | ----- |
| 192.168.2.189/26   | 192.168.2.128  | 192.168.2.129 | 192.168.2.190 | 192.168.2.191 | 61    |

# Vlan
Plusieurs réseau sur un seul réseau physique
Composée d'un tag (Ex: VLAN 10 Admin)

Une interface peut avoir 2 mode:
-> <u>Mode Access (laisse passer un seul VLAN)</u>
-> <u>Mode trunk (laisse passer plusieurs VLAN (de 1 à 4094))</u>

# Couche OSI

| Nom de la couche | Description / Exemple | PDU                   |
| :--------------- | :-------------------- | :-------------------- |
| 7. Application   | Termius               | ∅                     |
| 6. Présentation  |                       | ∅                     |
| 5. Session       | SSH                   | ∅                     |
| 4. Transport     | TCP/IP                | <u>Sègment</u>        |
| 3. Réseau        | Adresse IP            | <u>Paquet IP</u>      |
| 2. Liaison       | Adresse MAC           | <u>Trame Ethernet</u> |
| 1. Physique      | Câble                 | ∅                     |

# Packet Tracer
## VLAN
### Commande packet tracer
#### Activer la modification:
```BASH
Switch> enable
```
#### Activation de la modification des VLAN:
```BASH
Switch# vlan database
```
#### Crée VLAN:
```BASH
Switch(config)# vlan 10
```
#### Nommer VLAN:
```BASH
Switch(config-vlan)# name ADMIN
```
#### Changer d'interface:
```BASH
Switch(config)# interface FastEthernet0/3
```
#### Agréger un VLAN:
```BASH
Switch(config-if)# switchport access vlan 10
```
#### Lister les VLAN:
```BASH
Switch# show vlan
```
#### Aller en mode config:
```BASH
Switch# conf
```
#### Changer le mode:
```BASH
Switch(config-if)# switchport mode acces 
```
or
```BASH
Switch(config-if)# switchport mode trunk
```
#### Activation d'une interface:
```BASH
Router(config)# interface g0/0/0
Router(config-if)# no shutdown
Router(config-if)# exit
```
#### Création d'une sous interface liée a un VLAN:
Exemple pour vlan 10 ici (convention)
```BASH
Router(config)# interface g0/0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.0.1 255.255.255.0
Router(config-subif)# no shutdown
Router(config-subif)# exit
```
#### Renommer équipement:
```BASH
Switch(config)# hostname SwitchMainVLAN
```
#### Désactiver Translating "conf" ....domain server (255.255.255.255)
```BASH
Switch# conf
Switch(config)# no ip domain lookup
```
#### Creation serveur DHCP sur un switch:
```BASH
Switch# conf
Switch(config)# ip dhcp excluded-address 192.168.0.1 192.168.0.2
Switch(config)# ip dhcp pool Admin
Switch(dhcp-config)# network 192.168.0.0 255.255.255.0
Switch(dhcp-config)# default-router 192.168.0.1
Switch(dhcp-config)# dns-server 1.1.1.1
Switch(dhcp-config)# exit
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.0.253 255.255.255.0
Switch(config-if)# no shutdown
Switch(config-if)# exit
Switch(config)# exit
Switch# copy running-config startup-config
```
#### Lister toutes les interfaces
```BASH
Switch# conf
Switch(config)# show ip interfaces brief
```

[[CCNA Cours 4|Cours suivant]]

&copy; Félix MARQUET