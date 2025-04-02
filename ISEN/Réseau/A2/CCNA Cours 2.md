#Réseau #A2 
[[CCNA Cours 1|Cours précédent]]
# Adresse IPV4
## Dans un /24 (255.255.255.0)
256 IP disponible
.0 réservé pour l'adresse réseau
.255 réservé pour le broadcast
Donc 254 adresse disponible (256-2 = 254)

## Préfix d'adresses réservées
### Adresses privés:
- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
### Link-local 
aka c'est la merde
- 169.254.0.0/16
	- 169.254.255.255
### Multicast:
- 224.0.0.0/4
	- 239.255.255.255
## Généralité
Dans une plage contant N adresse IP
- 1er adresse réseau = 1er adresse de la plage / non affectable a un hôte
- Ne adresse réseau = dernière adresse de la plage / non affectable a un hôte (broadcast)
N-2 adresse IP disponible

# TD
## Convertir un masque de sous-réseau <-> longueur de préfix
| 256 | 128 | 64  | 32  | 16  | 8   | 4   | 2   | 1   |
| --- | :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| 2^8 | 2^7 | 2^6 | 2^5 | 2^4 | 2^3 | 2^2 | 2^1 | 2^0 |
| /24 | /25 | /26 | /27 | /28 | /29 | /30 | /31 | /32 |

| <font style="color:red">255.252.0.0</font>     | /14                                |
| :--------------------------------------------- | :--------------------------------- |
| <font style="color:red">255.255.240.0</font>   | /20                                |
| <font style="color:red">255.255.255.224</font> | /27                                |
| 255.128.0.0                                    | <font style="color:red">/9</font>  |
| 255.255.248.0                                  | <font style="color:red">/21</font> |

| Description    | Décimal                                       | Binaire                                                            |                                           |
| :------------- | :-------------------------------------------- | :----------------------------------------------------------------- | ----------------------------------------- |
| Adresse IP     | 192.168.10.131                                | 11000000.10101000.00001010.10<font style="color:red">000011</font> |                                           |
| Masque         | 255.255.255.192                               | 11111111.11111111.11111111.11<font style="color:red">000000</font> | <font style="color:lightblue">=/26</font> |
| Adresse réseau | 192.168.10.<font style="color:red">128</font> | 11111111.11111111.11111111.10<font style="color:red">000000</font> |                                           |

## Déterminer: l'adresse réseau, le n° d'hôte et adresse de diffusion

|                  | Adresse réseau                        | N°hôte  | Adresse de diffusion                  | Masque          |
| :--------------- | :------------------------------------ | :------ | :------------------------------------ | --------------- |
| 10.10.210.150/16 | 10.10.<font style="color:red">0.0     | 210.150 | 10.10.<font style="color:red">255.255 | 255.255.0.0     |
| 10.10.210.150/22 | 10.10.<font style="color:red">208.0   | 2.150   | 10.10.<font style="color:red">211.255 | 255.255.252.0   |
| 10.10.210.150/28 | 10.10.210.<font style="color:red">144 | 6       | 10.10.210.<font style="color:red">159 | 255.255.255.240 |

## Calcul d'adresses

| Adresse IP/Préfixe | Adresse Réseau  | 1ère @hôte      | Dernière hôte   | @diffusion      | N° d'hôte     |
| :----------------- | :-------------- | :-------------- | :-------------- | :-------------- | ------------- |
| 10.101.99.17/23    | 10.101.98.0     | 10.101.98.1     | 10.101.99.254   | 10.101.99.255   | 10.101.1.17   |
| 209.165.200.227/27 | 209.165.200.224 | 209.165.200.225 | 209.165.200.254 | 209.165.200.255 | 209.165.200.3 |
| 17.16.117.77/20    | 172.16.112.0    | 172.16.112.1    | 172.16.127.254  | 172.16.127.255  | 172.16.5.77   |

[[CCNA Cours 3|Cours suivant]]

&copy; Félix MARQUET