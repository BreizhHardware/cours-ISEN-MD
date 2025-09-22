#Cisco
Cours précédent dispo ici: [[Cisco Cours 3]]

# Plan
- Signal analogique Vs. Signal digital
- Signaux périodiques
- Composantes harmoniques (ou de fréquence) d'un signal
- Théorème de Fourier
- Limitation à la transmission d'un signal
- Capacité d'un canal
- Transmission analogique Vs. Transmission digitale
- Les supports de communication
- Multiplexage
- Conclusion

# Signal Analogique Vs. Signal digital
https://cdn.breizhhardware.fr/FAKA3/mOvudObI29.png
- Analogique
	- valeurs continues, par exemple, voix ou vidéo
- Digital
	- valeurs discrètes, par exemple, texte représenté par des caractères ASCII ou chaque caractère corresponds à une séquence de 7 ou 8 bits.

# Période Vs. Fréquence
https://cdn.breizhhardware.fr/FAKA3/zEmEsOsa64.png
https://cdn.breizhhardware.fr/FAKA3/zoVEKikO31.png
https://cdn.breizhhardware.fr/FAKA3/sApANAGA09.png

# Composantes Harmoniques
- Généralement, un signal est composé de plusieurs fréquences
- Les composantes sont des fonctions périodiques sinusoïdales: les *composantes harmoniques*

# Théorème de Fourier
- Théorème de Fourier
	- Un signal périodique s(t), de fréquence *f*, peut s'écrire sous la forme d'une somme infinie de sinus et cosinus dont la fréquence de chaque signal périodique est un multiple entier de la fréquence (pas sur).
https://cdn.breizhhardware.fr/FAKA3/lOHunuMu81.png
https://cdn.breizhhardware.fr/FAKA3/cOcESiVu72.png
https://cdn.breizhhardware.fr/FAKA3/lapukAwI98.png

## Un signal est représenté par ces premiers harmoniques

# Spectre et Largeur de Bande
- Spectre
	- L'ensemble de fréquences contenues dans le signal
	- Eg, f et 3f
- Largeur de bande absolue
	- Largeur du spectre
	- E.g., 2f=3f-f
- Largeur de bande effective
	- Généralement, largeur de bande ou bande passante est utilisée
	- Calculée en utilisant seulment un sous ensemble de fréquences qui contiennent la majeure partie du signal

# Limitations à la Transmission d'un Signal
- Un canal de transmission ne transmet que certaines plages de fréquence
	- Bande passante d'un canal de transmission
		- Exemples:
			- 300 Hz à 3400 Hz pour une ligne téléphonique normale
			- 20 à ~20 kHz pour l'oreille humaine
			- 0 à 500 Mhz pour télédistribution
- Généralement, un signal périodique est composé d'une infinité d'harmoniques
	- Les harmoniques de fréquence supérieure à la bande passante du canal ne seront pas transmises par le canal
https://cdn.breizhhardware.fr/FAKA3/gECegETE88.png

# Atténuation
https://cdn.breizhhardware.fr/FAKA3/HAmELuTe70.png
- L'atténuation et l'amplification sont quantifiées en décibels (dB)
	- **Atténuation:** 10log(P1/P2) dB
	- **Amplification:** 10log(P2/P1) dB
	- P1 = puissance du signal à l'émission
	- P2 = puissance du signal à la réception
	- P1 et P2 sont exprimés en **watt** 

# Distorsion
- Certaines harmoniques sont transmises plus "rapidement" que d'autres sur le canal
https://cdn.breizhhardware.fr/FAKA3/wiCUQAxo40.png

# Bruit
- Signal parasite se superposant au signal utile
	- interférences avec d'autres signaux
- Il y a en réalité du bruit parasite sur les lignes de transmission. Ce bruit s'exprime par rapport à la puissance utile du signal transmis: 
	- Rapport signal sur bruit: **PS/PN**
	- PS énergie du signal, PN énergie du bruit.
- La quantité de bruit est exprimée en dB: 10 log*10* (PS/PN)

# Capacité d'un Canal
- Mesure de la capacité d'un canal
	- Rapidité de modulation (Baud)
		- Nmb de chamgements du signal par seconde
	- Bits par seconde

# Capacité d'un Canal Parfait
- Capacité maximale d'un canal parfait
- Théorème de Nyquist
	- Un signal limité à la fréquence H peut être reconstruit complètement à condition de le mesurer à une fréquence 2H
		- Signal discret à V niveaux
		- Canal de bande passante H
		- Débit maximum : `2*H*log2 (V) bits par seconde`
		- Exemple
			- signal digital à deux niveaux sur ligne téléphonique
				- H=3400, V=2 -> 6800 bits/seconde
			- signal à digital 4 niveaux sur ligne téléphonique
				- H = 3400, V=4 -> 13600 bits/seconde
- **En théorie, on peut transmettre à une vitesse aussi grande qu’on veut en augmentant le nombre de niveaux discrets.**
- Cependant le canal de transmission n’est pas parfait
	- Il faut que le bruit de fonds (les parasites) ne fassent pas confondre des niveaux voisins.

# Capacité d'un Canal Imparfait
- Canal avec bruit aléatoire
	- Mesure du bruit
		- SNR = puissance du signal utile/puissance du bruit
	- SNR est souvent exprmié en dB
		- `SNRdB = 10*log10(SNR)`
	- Débit max = `H*log2(1+signal/bruit bits/sec`
		- Théorème de Shannon

# Multiplexage
- Objectif
	- Transmettre plusieurs signaux sur un seul canal de transmission
- Multiplexage analogique
	- Multiplexage fréquentiel (FDM)
		- Réseau téléphonique
		- Télédistribution
	- Fibres optiques
		- Wavelength Division Multiplexing (WDM)
- Multiplexage temporel
## Multiplexage en Fréquence
- Le multiplexage en fréquence (FDM: Frequency Division Multiplexing) consiste à partager la bande de fréquence disponible en différents canaux à bande plus étroite et à chacun de ces canaux.
https://cdn.breizhhardware.fr/FAKA3/SIwalOto66.png
## Muletiplexage Temporel
- Multiplexage Temporel (Synchrone)
	- Le multiplexage temporel (TDM: Time Division Multiplexing) synchrone assigne à chaque utilisateur la totalité de la capacité de transmission pour un court instant
https://cdn.breizhhardware.fr/FAKA3/SoSEkUMa05.png
- Multiplexage temporel asyncrone
	- On assigne la capacité de transmission de façon dynamique (multiplexage temporel statistique)
- Le multiplexage statistique (asyncrone) utilise le fait que la capacité de la ligne de sortie ne doit pas nécessairement être égal à la somme des capacités
- Le prix a payer est de:
	- associer un identificateur à chaque unité d’information transférée;
	- prévoir des buffers capables d'absorber les pics éventuels (au moment où la ligne de sortie ne suit pas).
- Le multiplexage temporel ne peut être appliqué que dans le cas de la transmission numérique
	- Les signaux analogiques sont transformés en informations numériques (7 ou 8 bits) par un **codec** 

# Conclusion
- Un signal s(t) peut s'écrire sous la forme d'une somme (qui peut être infinie) de signaux périodiques (les harmoniques) sinusoïdaux et cosinusoidaux
	- La fréquence de chaque signal périodique est un multiple entier de la fréquence *f* du signal s(t)
	- Théorème de Fourier
- La bande passante d’un signal est généralement calculée en utilisant seulement un sous-ensemble de fréquences qui contiennent la majeure partie (énergie) du signal
	- C’est pas pratique (et pas nécessaire) de transmettre toutes les fréquences
- Un canal de transmission ne transmet que certaines plages de fréquence
	- Bande passante d'un canal de transmission est limitée
	- Étant donnée un signal, ses fréquences (harmoniques) supérieure à la bande passante du canal ne seront pas transmises par le canal
- Débit maximum d’un canal parfait est `2*H*log2 (V)` bits par sec
	- H: largeur de bande en Hz; V: nombre de niveaux du signal
	- Théorème de Nyquist
- Débit maximum d’un canal imparfait est `H*log2 (1+signal/bruit)`
	- H: largeur de bande en Hz;
	- Théorème de Shannon
- Rapidité de modulation (Baud)
	- nombre de changements du signal par seconde
- Bits par seconde
	- nombre de bits transmis par seconde
- Multiplexage permet de transmettre plusieurs signaux sur un seul canal de transmission
	- Multiplexage en fréquence Vs. Multiplexage temporel
	- Multiplexage temporel peut être utilisé seulement pour la transmission numérique

Démo 2: [[Démo2.pdf]]
Cours suivant dispo ici: [[Cisco Cours 5]]