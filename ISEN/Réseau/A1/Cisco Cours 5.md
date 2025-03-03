#Cisco
Cours précédent dispo ici: [[Cisco Cours 4]]

# Plan

* Encodage numérique -> numérique
* Encodage numérique -> analogique
* Encodage analogique -> numérique
* Encodage analogique -> analogique
* Transmission Synchrone Vs. Transmission asynchrone

# Technique d'Encodage

## Interprétation d'un signal digital

* Connaitre avec une certaine précision, quand le bit commence et quand le bit termine.
* Doit déterminer la valeur du signal 
  * Lire la valeur au milieu du bit
  * Par exemple, il y a une valeur prédéterminée: si c'est plus petit c'est le bit 0, sinon c'est le bit 1

## Encodage numérique - numérique

* Pourquoi on a besoin de ce type d'encodage ?
* **Synchronisation** 
  * Synchroniser l’émetteur et le receveur
  * Horloge
* Détection d'erreurs 
  * Peut faire partie de l'encodage du signal
* Complexité et coüt 
  * Des techniques exigent un taux de signal supérieur au taux de données

## Exemple de techniques

* Non retour à zéro (NRZ-L)
* Non retour à zéro inversé (NRZI)
* Bipolaire -AMI
* Bipolaire
* Manchester (biphase)
* Manchester diférential
* B8ZS
* HDB3

### NRZ-L

* 2 voltages différents pour les bits 0 et 1
* Voltage constant durant l’intervalle d’un bit 
  * Pas de transition
* e.g. Absence de voltage pour zéro et un voltage constant positif pour 1
* Généralement, voltage négatif pour une valeur et voltage positif pour l'autre

### NRZI

* Une transition (bas vers le haut ou haut vers le bas) représente 1
* Pas de transition représente 0

### NZR

* Avantages 
  * Facile à réaliser
  * Bonne utilisation de largeur de bande
* Désavantages 
  * **Manque de la capacité de syncro**
* Généralement utilisé pour les bandes magnétiques
* Généralement, il n’est pas utilisé pour la transmission de signal

### Bipolaire-AMI

* 0 est représenté par l’absence de signal
* 1 est représenté par une pulse négative ou positive qui s’alternent
* Les pulses représentant 1 changent de polarité
* Facilité de détecter les erreurs
* On peut perdre la synchronisation lorsqu’il y a une longue suite de 0 (une suite de 1 est n’est pas un problème)

### Pseudoternary

* 1 représenté par l’absence de signal
* 0 représenté par une pulse positive et négative qui s’alternent
* Pas d’avantage ou désavantage sur bipolaire AMI
* Pas efficace comme NRZ 
  * Chaque élément de signal représente un seul bit
  * Dans un système à trois niveaux, un élément de signal peut représenter `log2(3) = 1.58 bits`
  * Le receveur doit pouvoir distinguer 3 niveaux (+A, -A, 0)

### Manchester

* Transition au milieu de chaque période de bit
* Transition joue le rôle d’horloge et de données
* Bas à haut représente 1
* Haut à bas représente 0
* Utilisé par IEEE 802.3

### Manchester différentiel

* La transition au milieu d’une période d’un bit représente l’horloge seulement
* La transition au début d'une période de bit représente 0
* Pas de transition au début d'une période de bit représente 1
* Utilisé par IEEE 802.5
* Désavantages: 
  * Au moins une transition par une période de bit et possiblement 2
  * Le taux maximum de modulation est le double de NRZ
  * Demande plus de largeur de bande
* Avantages: 
  * Synchronisation au milieu de la transition de bit
  * Détection d'erreur 
    * Absence de transition attendue

### Scrambling

* Utiliser scrambling pour remplacer les séquences de bits qui produisent un voltage constant
* Séquence de remplacement 
  * Doit produire assez de transitions pour la syncro
  * Doit être reconnu par le receveur et remplacé par le signal d'origine
  * Même longueur de le signal d'origine

### B8ZS

* Bipolar With 8 Zeros Substitution
* Si 8 zéros consécutifs et le dernier pulse de voltage est positif, donc coder comme 000+-0-+
* Si 8 zéros consécutifs et le dernier pulse de voltage est négatif, donc coder comme 000-+0+-

### HDB3

* High Density Bipolar 3 Zero
* Basée sur bipolaire-AMI
* Séquence de 4 zéros remplacée avec un ou 2 pulses 
  * Si le dernier pulse de voltage est positive et nombre de pulses bipolaires est impair donc 000+
  * Si le dernier pulse de voltage est positive et nombre de pulses bipolaires est pair donc -00-
  * Si le dernier pulse de voltage est négative et nombre de pulses bipolaires est impair donc 000-
  * Si le dernier pulse de voltage est négative et nombre de pulses bipolaires est pair donc +00+

## Encodage Numérique – Analogique

* Une onde transmise sans modification, à une fréquence fixe ne transmet aucune information: on parle d’une onde porteuse
* Pour transmettre une information, il faut modifier l’onde porteuse 
  * Les données numériques sont encodées en signaux analogiques.
* Les modification, appelées *modulations* permettent de coder l'information à transmettre. 
  * On modifie un ou plusieurs paramètres de l’onde porteuse, tels que sa phase, son amplitude ou sa fréquence.
* Modulation d’amplitude (AM) 
  * deux différents niveaux de voltage sont utilisés pour représenter 0 et 1. La fréquence reste constante.
  * Sensible aux changements brusques
  * Pas efficace
* Modulation de fréquence (FM) 
  * deux (ou plusieurs) fréquences différentes représentent 0 et 1. L’amplitude reste constante 
    * La plus utilisée est FM binaire (2 freq)
  * Moins sensible aux erreurs que AM
* Modulation de phase (PM) 
  * la phase de l’onde porteuse varie de 45, 135, 225 ou 335 degrés à des instants régulièrement espacés. Chaque changement de phase transmet 2 bits d’information.
  * En présence de bruit, le taux d’erreur de bit de PM est supérieure de ~3dB par rapport à celui de AM et FM
* Si on prévoit 4 valeurs pour un des paramètres (ici la** phase**), on peut transmettre 2 bits à la fois 
  * Le nombre de bits transmis par seconde est 2 fois plus grand que le nombre de bauds
* On peut combiner la modification de plusieurs paramètres (ici 4 valeurs de la phase et 2 valeurs de l’amplitude). 
  * Le nombre de bits transmis par seconde est 3 fois plus important que le nombre de bauds.
* Quadrature PM 
  * Plus efficace; chaque élément de signal représente plus d’un bit 
    * Chaque élément du signal représente 4 bits 
      * La phase change en multiple de 90°
    * Peut utiliser 8 phases et plus d’une amplitude
    * Utilisé pour transmettre 9.600 bits par seconde sur une ligne à 2.400 bauds

# Synchronisation

* Problèmes de temps exigent un mécanisme pour synchroniser l'émetteur et le récepteur
* 2 solutions: 
  * Asynchrone
  * Synchrone

## Transmission Asynchrone

* Transmettre un caractère à la fois 
  * 5 à 8 bits
* Chaque caractère ou octet est traité indépendamment pour la synchronisation d’horloge (bit) et de caractère
* Le récepteur re-synchronise au début de chaque caractère reçu
* Chaque caractère à transmettre est encapsulé entre des bits supplémentaires: 
  * **start bit** et **stop bit**
* Simple
* Pas coûteux
* Adéquate pour les données espacées (e.g. clavier)
* Problème: 
  * Overhead de 2 à bits par caractère

## Transmission Synchrone

* L’émetteur et le récepteur doivent se synchroniser: le récepteur doit synchroniser son horloge avec les signaux entrants 
  * un bloc entier est transmis comme une suite de bits et le récepteur doit suivre le flux des bits entrant pendant la durée entière de la transmission d'une trame.
* Pour permettre au récepteur de se synchroniser, l’information d’horloge est embarquée dans la suite des bits transmise.
* On peut aussi utiliser une ligne séparée d’horloge 
  * Pour des distances courtes
* Les méthodes ou codages principaux sont: 
  * Codage bipolaire
  * Codage biphase Manchester
  * Codage Manchester différentiel
* Plus efficace que la transmission asynchrone en terme de overhead