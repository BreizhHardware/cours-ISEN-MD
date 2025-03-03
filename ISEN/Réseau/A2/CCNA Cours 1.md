#Réseau #A2
## Qu'est ce qu'un réseau informatique ?
Composé de plusieurs éléments informatique interconnecté
Composée d'un DNS, Routeur et d'un ou plusieurs client (pc, téléphone, iot, ...)
Mode de fonctionnement:
<font style="color:red">-> Client serveur</font>
<font style="color:red">-> Peer-to-peer (P2P)</font>
## Passerelle par défaut
Adresse par default identifiant votre par laquelle un hôte demande la route vers la ressource demandé. Il est possible de définir une autre passerelle (gateway)
## SPOF
**Single Point Of Failure**
## QOS
**Quality Of Service**: Prioriser la bande passante vers un service crucial plutôt qu'un autre (genre quand tu DL pour Breizhflix et que tu limite tes parents)
## Réseau fiable
Réseau redondé, HA master slave ou HA mesh, réseau qui évite un maximum les [[CCNA Cours 1#SPOF|SPOF]] et qui est évolutif (choix du masque), priorité de service ([[CCNA Cours 1#QOS|QOS]])
## PDU
**Protocol Data Unit**
Découpage des données en plusieurs paquets
## ARP
Protocole couche 2 ([rappel couche](https://www.manageengine.com/fr/network-monitoring/layer-2-protocols.html)) qui permet de demander l'IP associé à une adresse MAC pour une communication sur un réseau local. La requête ARP est envoyée en Broadcast à tous les host du réseau et seul l'appareil qui possède l'IP voulu réponds.
## MTU
**Maximum Transfer Unit** taille maximal d'une trame circulant sur le réseau. Si la taille de la trame dépasse le MTU, le paquet est drop. Le MTU est défini pour un réseau entier.
## NAT
**Network Address Translation**
- Source NAT: Lorsqu'un paquet arrive à une destination depuis une source particulière il est redirigé vers une autre IP (passerelle)
- Destination NAT (D NAT): Associe à un nom de domaine - ip public une redirection des paquets vers l'IP source

[[CCNA Cours 2|Cours suivant]]

&copy; Félix MARQUET