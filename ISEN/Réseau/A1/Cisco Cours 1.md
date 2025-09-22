#Cisco
intro dispo ici [[Cisco Intro]]

# La communication de données Vs. Réseautage

* **La communication de données:** deux nœuds qui communiquent.
* **Réseautage:** deux ou plusieurs nœuds qui communiquent.

## Taches Principales

* Génération de signaux
* Transmission de signaux
* Synchronisation
* Adressage et routage
* Contrôle de connexions
* Détection d’erreurs et correction
* Contrôle de flux
* Codage de messages

## Structure de réseau

* Périphérique (edge) 
  * Hôtes et applications
* Accès (access) 
  * Ethernet, Wifi, DSL, 3G
- Coeur (core)
  - Internet

# Communiquer - comment ?

* Broadcast - diffusion
* Point à point
* Multicast

### Diffusion - Broadcast

* Tous les ordinateurs sont connectés à un seul câble. Le réseau de communication est alors partagé par tous les ordinateurs du réseau. Chaque paquet envoyé par un hôte est reçu par tous les autres
* Le destinataire est déterminé par un champ d'adresse au sein du message.
* Les machines ne tiennent pas compte des messages qui ne les concernent pas.

### Point à point

* Les routeurs sont interconnectés selon une certaine topologie. Quand un message arrive à un routeur, il est stocké et ensuite réexpédié sur une ligne libre vers le routeur de destination. Le message peut passer par plusieurs routeurs intermédiaires.

### Multicast

* Communication entre une partie et une sous partie

## L'importance des Topologies

* La structure des topologies influence largement la performance d'un réseau: 
  * Chemins les plus courts ?
  * Distribution de la charge dans le réseau par différent cheminements ?
  * Nombre de bonds ou arc à traverser ?
  * Complexité pour calculer les cheminements les plus favorables ?
  * Stratégies de routage ?

# Comment réaliser une communication point-à-point ?

Commutation de circuit Vs. Commutation de paquets

* Commutation à circuit Pas de perte de donnée Sécurisé (par d'interférence) Long (1 circuits par communication)
* Communication de paquets Séparation des données Plus fiable/Performant Plus lent (Saturation des câbles)

# Type de réseaux

* Réseau locaux (LANs) 
  * Réseau à diffusion
  * Privé
  * Réseau d'ordinateurs
  * Distance typique: 10 km
  * Performance typique: 10 MBit/sec - 1GBit/sec (ou plus)
* MAN 
  * Réseau à diffusion dans les villes
  * Haute performance
  * Distance typique: 100 km
  * Performance typique: 100 MBit/s - 1 GBit/sec (ou plus)
* WAN 
  * Réseau à grande distance, géographiquement étendu
  * Utilisation des réseaux de télécommunication publics
  * Liaison point-à-point
  * Distance typique: 1000 km
* **PAN** - Personal Area Network
* **BAN** - Body Area Network

# Communication entre 2 machines ?

## C'est quoi un Protocole ?

* Un protocole est un ensemble de règle qui régissent la communication entre 2 machines.
* Protocoles de réseaux
* Éléments clés: 
  * Syntaxe:
	  * Formats des données
	  * Niveaux de signal
  * Sémantique:
	  * Information de Contrôle
	  * Traitement d'erreur
  * Temps:
	  * Séquencement
***Exemple de Protocole: HTTP***
- Pour retrouer
	- http://www.somehost.com/path/ift6055.html
- Ouvrir une socket a www.somehost.com sur le port 80 et envoyer
	- GET /path/file.html HTTP/1.0
	- From: someuser@jmarshall.com
	- User-Agent: HTTPTool/1.0
	- [Blank line here]
- Le serveur renvoie la response sur la même socket
	- HTTP/1.0 200 OK
	- Date: ......
	- Content-Type: text/html
	- Content-Length: 1354
	- Content

# C'est quoi un Service ?
- Un Service est un ensemble de primitives qu'une entité fournit à une autre
	- Couche basses fournissent des services aux couches hautes
- Le même service peut avoir plusieurs implémentations
	- Des implémentations différentes de vendeurs différents

## Primitive de Service: Un Exemple
![](https://cdn.breizhhardware.fr/FAKA3/lECuvUQa00.png/raw)

# Architecture de Protocole
**Réseaux sont complexes!**
- Plusieurs "pièces"
- La tâche de communication divisée en plusieurs modules
- Exemple
	- Le transfert de fichiers peut utiliser 3 modules
		- Application de transfert de fichier
		- Module du service  de transport/communications
		- Module d'accès au réseau
![](https://cdn.breizhhardware.fr/FAKA3/kegIyOzA65.png/raw) (simplified File Transfer Architecture **SFTP**)

# Couche d'accès réseau
- Echange de données entre la machine et le réseau
- La machine source fournit l'adresse de destination
- Peut exiger des niveaux de service
- Dépend du type de réseau utilisé

# Couche de Transport
- Echange de données fiable
- Indépendante du réseau utilisé
- Indépendante de l'application

# Couche Application
- Supporte des applications différentes
	- E-mail, transfert de fichier, etc.

# Exigences d'adressage
- Deux niveau d'adressage requis
- Chaque machine a besoin d'une adresse réseau unique
- Chaque instance d'application s'exécutant sur un machine a besoin d'une adresse unique dans la machine
	- Point d'accès au service (service access point): SAP

# Architecture de Protocoles et réseaux
![](https://cdn.breizhhardware.fr/FAKA3/sujUHApi26.png/raw)

## Protocoles dans une Architecture Simplifiée
![](https://cdn.breizhhardware.fr/FAKA3/cIFAVuBi35.png/raw)

# Protocol Data Units (PDU)
- Au niveau de chaque couche, des protocoles sont utilisés pour communiquer
- Information de contrôle est ajoutée aux données utilisateur a chaque couche
- La couche de transport peut fragmenter les données utilisateurs
## PDU transport
- La couche de transport peut fragmenter les données utilisateurs
- Chaque fragment a une entête transport ajoutée
	- SAP de destination
	- Numéro de séquence
	- Code de détection d'erreur

## PDU réseau
- Ajoute une entête réseau
	- Adresse réseau de destination
	- Type de service
	- Identificateur
	- Etc.

# Couches: Pourquoi?
## Complexité
- Structure explicite permet l’identification et les relations entre les différents éléments du système complexe
	- Modèle à couche
- Séparation entre l’implémentation et la spécification
	- Cacher l'information
	- Changer l'implémentation d'un service fourni par une couche est transparent pour les reste du système
		- E.g., changer la procédure de communication n'affectera pas le reste du système
- Désavantages

# Modèle OSI
- Open Systems Interconnection
- Dév par the International Organization for Standardization (ISO)
- 7 couches
- Un système théorique livré un peu en retard
- TCP/IP est le standard de fait!
## Couches OSI
- Application
- Présentation
- Session
- Transport
- Réseau
- Liaison
- Physique
# TCP/IP Protocol Architecture
- Développé par DARPA pour son réseau ARPANET
- Utilisé par internet
- 5 couches
	- Application
	- Transport
	- Couche Internet
	- Liaison
	- Physique

![](https://cdn.breizhhardware.fr/FAKA3/xAFOSomA41.png/raw)

## Couche Physique
- Interface physique entre les équipements de transmissions et le medium de transmission
- Caractéristiques du medium de transmission
- Niveaux de signal
- etc.
## Couche Liaison
- Adresse de destination
- Contrôle d'erreur et de flux
- Etc.
## Couche Internet (IP)
- Machines peuvent être attachés à des réseau différents
- Routage
- Implémentés dans les machines et les routeurs
## Couche Transport (TCP)
- Transfert fiable de données 
- Livraison ordonnée
## Couche application
- Support pour les application
- ex: http, SMTP
# Pourquoi les Standards ?
- Requise pour permettre l'interopérabilité entre les appareils
- Avantages
	- Assurer un large marché pour les équipement et les logiciels
	- Permettre à des produits de différents vendeurs de communiquer
- Désavantage
	- Gèle la techno
	- Peut avoir plusieurs standards pour la même chose
## Standard ou pas de Standard
- Les protocoles qui sont pas des standards sont conçus et implémentés pour des machines et tâches spécifiques
- K sources et L destinations exige X protocoles et Y implémentations
- Si des protocoles standard sont utilisés, on a besoin de 1 protocole et L + K implémentations
- Si pas de standards, K x L protocole et 2(K x L) implémentations
![](https://cdn.breizhhardware.fr/FAKA3/GePEricI25.png/raw)

# Conclusion
- Communication de connées Vs. réseautage
	- 2 nœuds qui communiquent directement Vs. 2 ou plusieurs nœuds qui communiquent via des relais
- Types de communication
	- Broadcast – diffusion; Point à point; Multicast
- Commutation de circuit Vs. Commutation de paquets
	- E.g., Réseaux téléphoniques Vs. Internet
- Types de réseaux
	- Lan, Man, Wan
- Protocole Vs. Service
	- Règles de communications Vs. Un ensemble de primitives
- Architecture de protocoles
	- Modèle en couche
- OSI modèle Vs. TCP/IP modèle*
	- 7 couches Vs. 5 couches
	- Standard non implémenté Vs. Standard de fait qui est utilisé globalement
- Standard Vs. Pas de standard

 Cours suivant dispo ici: [[Cisco Cours 2]]