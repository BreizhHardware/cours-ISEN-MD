#Cisco
Cours précédent dispo ici: [[Cisco Cours 1]]

# Plan:
- Principes du modèle à couche
- Fonctionnalités
- Types de primitives utilisées
- Service sans connexion Vs. Service orienté connexion
- Service fiable Vs. Service non fiable
- Modèle de référence OSI
- Modèle de référence TCP/IP
- Conclusion

# Principes du Modèle ?
- Un niveau du modèle par niveau d'abstraction
- A caque niveau correspond une **fonction bien définie**
- La fonction de chaque niveau est choisie en ayant en tête la définition de **standards internationaux**
- Les frontières entre niveaux sont choisies pour **minimiser les flux** d'informations entre niveaux
- Le nombre de niveaux est choisi pour correspondre aux différentes fonctions mais ne doit pas être trop grand parce que le système serait trop lourds
# Interaction entre Couches Voisines
https://cdn.breizhhardware.fr/FAKA3/YIHazaMu87.png
# PDUs de Différentes Couches
https://cdn.breizhhardware.fr/FAKA3/MaqiJUwI08.png
# Fonctions ?
- Encapsulation
- Segmentation et assemblage
- Contrôle de connexion
- livraison Ordonnée
- Contrôle de flux
- Contrôle d'erreur
- Adressage
- Multiplexage
- Services de Transmission
## Encapsulation
- Ajout d'information de contrôle
	- Adresses
	- Code de détection d'erreurs
	- Etc.
## Segmentation
- Les blocs de données sont d'une taille déterminée
- Les messages de la couche application peuvent grands
- Les paquets réseaux peuvent être petits
- Segmentation consiste à couper des blocs de données qui sont grands en plus petits blocs
	- Fragmentation dans le modèle TCP/IP
	- Les trames Ethernet ne peuvent pas dépasser 1526 octets

tableau MTU: https://cdn.breizhhardware.fr/FAKA3/cEhUwUCo16.png
schéma fragmentation: https://cdn.breizhhardware.fr/FAKA3/nAQuLowe47.png
schéma encapsulation, fragm, assemblage : https://cdn.breizhhardware.fr/FAKA3/laxuCoBO73.png
## Contrôle de connexion
- Etablissement de connexion
- Transfère de données
- Terminaison de connexion
## Livraison Ordonnée
- PDUs peuvent traverser des chemins différents de la source à la destination
- PDUs peuvent ne pas arriver en ordre
- Comment ?
	- Numéroter les PDUs pour permettre la livraison ordonnée
## Contrôle de flux
- Fait par le receveur
- Limiter la quantité ou le taux de données
- Exemples de techniques ?
	- Stop and wait
	- Système à crédit
		- Ex: fenêtres coulissantes
# Contrôle d’erreur
- Protéger contre les pertes et les dommages
- Détection d'erreur
	- La source insert des bits de détection d'erreur
	- La destination vérifie ces bits
	- Si OK, confirme
	- Sinon, détruire le paquet
- Retransmission
- Fait à différents niveaux
# Adressage
- Une adresse unique pour chaque machine et chaque routeur (par interface)
- Adresse niveau réseau
	- Adresse IP (TCP/IP)
	- NSAP: Network Service Access Point (OSI)
- Processus dans la machine
	- Numéro de port (TCP/IP)
	- Service Access Point (OSI)
# Mode d’adressage
- En général une adresse identifie une seule machine
	- Adresse unicast
- Peut adresser toutes les machines dans un domaine
	- Adresse broadcast
- Peut adresser un sous ensemble de machines dans un domaine
	- Adresse multicast
 Cours suivant dispo ici: [[Cisco Cours 3]]