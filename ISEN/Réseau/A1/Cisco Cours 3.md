#Cisco
Cours précédent dispo ici: [[Cisco Cours 2]]

## Multiplexage

* Correspondre plusieurs connexions dans un niveau à une seule connexion dans un autre niveau 
  * Plusieurs faisceaux lumineux dans une seule fibre optique
  * Plusieurs connexions voix sur un câble
  * Etc...

# Types de Primitives

* Primitive 
  * représentation abstraite d'une interaction entre un utilisateur et son fournisseur de service
  * peut contenir des paramètres tels que 
    * source
    * destination
    * message transmis (SDU ou Service Data Unit) https://cdn.breizhhardware.fr/FAKA3/tASIgEBU16.png

# Service sans Connexion

* Objectif 
  * permettre à un émetteur d'envoyer rapidement un message à un (ou plusieurs) receveur
* Principe 
  * L'émetteur confie son message au fournisseur du service via une primitive DATA.req
  * Le fournisseur du service achemine le message jusqu'au receveur et le délivre via une primitive DATA.ind
- Utilisation
  - utilie pour envoyer de petits messages
  - exemple: service postal
- Primitives
  - DATA.request(source, destination, SDU)
  - DATA.indication(source, destination, SDU)
https://cdn.breizhhardware.fr/FAKA3/kUpiYotE44.png
* Caractéristiques du service 
  * respect de la séquence 
    * aucune garantie
  * Pas d'établissement / terminaison de connexion
- Service confirmé
	- Envoyer data.confirm
https://cdn.breizhhardware.fr/FAKA3/nopIZEGO72.png

# Service Orienté Connexion

* Objectif 
  * établir une association logique entre 2 utilisateurs afin de permettre l'échange bidirectionnel de messages entre les 2 utilisateurs
* Principe 
  * Ouverture de la connexion
  * Les 2 utilisateurs peuvent envoyer des messages en profitant de cette connexion
  * Fermeture de la connexion 
https://cdn.breizhhardware.fr/FAKA3/VUjISIci34.png
https://cdn.breizhhardware.fr/FAKA3/bInEnuTu59.png
https://cdn.breizhhardware.fr/FAKA3/SEfOgEJE74.png
https://cdn.breizhhardware.fr/FAKA3/kUGEZIBe11.png
https://cdn.breizhhardware.fr/FAKA3/QAbaYaYi45.png
https://cdn.breizhhardware.fr/FAKA3/MOroRUwO61.png
* Caractéristiques générales 
  * Transmission bidirectionnelle 
    * Une fois la connexion ouverte, les 2 utilisateurs peuvent l'exploiter
  * Respect de la séquence 
    * garantie
  * fermeture de la connexion 
    * abrupte lorsqu'elle est provoquée par le fournisseur
    * ordonnée (souvent) ou abrupte (parfois) lorsqu'elle est initiée par un utilisateur

# Service Fiable Vs. Service Non Fiable

* Service Fiable 
  * Il n'y a jamais de données perdu
  * Le récepteur acquitte la réception de chaque msg
* Service Non Fiable 
  * Il n'y a aucune garantie de réception de données transmises

## Modèle de référence OSI
https://cdn.breizhhardware.fr/FAKA3/CibotAro61.png
### Couches OSI

* Physique 
  * Signaux
* Liaison 
  * Détection et correction des erreurs
  * Contrôle de flux
* Réseau 
  * Routage
* Transport 
  * Communication de bout en bout
  * Fiabilité et ordonnancement des paquets
* Session 
  * Contrôle de session
* Présentation 
  * Codage et Compression
  * Encryptage
* Application 
  * Application qui ont besoin de communiquer

### Modèle de Référence TCP/IP

https://cdn.breizhhardware.fr/FAKA3/BarusIwU46.png

### Service Fourni par IP

* Caractéristiques 
  * service sans connexion non fiable 
    * taille des msg: max 64 Kbytes
    * perte possible de messages
    * non respect de la séquence
    * erreurs de transmission possibles et non détectées 
https://cdn.breizhhardware.fr/FAKA3/pInaLOMa17.png

### TCP - UDP

* **Transmission Control Protocol:** 
  * Se base sur IP, est un protocole fiable, permet la transmission sans erreur d'un flux de bytes
* **User Datagram Protocol:** 
  * Se base sur IP, est un protocole non fiable, sans établissement d'une connexion

#### Service TCP

* Identification d'une application 
  * Adresse IP + TCP + numéro de port
* Caractéristiques du service TCP 
  * service orienté connexion
  * bidirectionnel
  * fiable
  * mode stream
  * fermeture de la connexion: abrupte par le fournisseur, ordonnée ou abrupte par les utilisateurs
  https://cdn.breizhhardware.fr/FAKA3/bEqUBARE62.png

#### Service UDP

* Identification d'une utilisation 
  * Adresse IP + UDP + numéro de port
* Caractéristique du service 
  * service sans connexion
  * non fiable
https://cdn.breizhhardware.fr/FAKA3/gePiGOYu36.png

#### TCP/IP PDU:

https://cdn.breizhhardware.fr/FAKA3/SecaMuVe13.png

#### TCP/IP Quelque Protocoles

https://cdn.breizhhardware.fr/FAKA3/DIxApiFI47.png

# Conclusion

* Principes suivis pour définir un modèle en couches
* Protocoles Vs. Services 
  * Protocole est exécuté entre entités paires 
    * Ensemble de règles de communication
  * Couche N fournit un service a la couche N+1 
    * Ensemble de primitive 
- Fonctionnalités du modèle en couches
	- Encapsulation
	- Fragmentation et assemblage
	- Contrôle de connexion
	- Livraison en ordre
	- Contrôle de flux/flot
	- Contrôle d'erreurs
	- Adressage
	- Multiplexage
	- Service de transmission
- Types de primitives utilisées
	- X.request, X.indication, X.response, X.confirm
- Service sans connexion Vs. Service orienté connexion
- Service fiable Vs. Service non fiable
- Modèle de référence OSI
	- 7 couches
- Modèle de référence TCP/IP
	- 5 couches

Démo 1: ![[Démo 1.pdf]]
 Cours suivant dispo ici: [[Cisco Cours 4]]