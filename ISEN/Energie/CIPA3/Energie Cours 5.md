#CIPA3 #Energie

[Cours précédent](Energie%20Cours%204.md)
## Supposons que 100% du parc de voiture français soit électrique, combien de central nucléaire il va falloir pour charger tous le parc en même temps ?

39,3 millions de voitures en circulation en France au 1er janvier 2024
7,4 kW de puissance de charge moyenne

$39,3M*7,4kW = 290820000000 = 290GW$ 

900 MW de puissance par réacteur

$\frac{290000}{900} = 323 \text{ réacteur (arrondi au supérieur)}$

Sachant qu'il y a environ 3 réacteurs par central il faut environ 108 centrales nucléaires

150 kW de puissance de charge rapide moyenne

$39,3M*150kW = 5895GW$

$\frac{5895000}{900} = 6550 \text{ réacteur (arrondi au supérieur)}$

### Correction 
Consommation annuelle des carburant fossile en France: $48000000m^3$
Densité d'énergie des carburants: $10 kWh/l$
Energie brulée: $E_b = 48.10^6*10*1000 = 4,8.10^{11}kWh$
Energie à la roue (rendement = 0,33): $E_{m}=n.E_{b} = 1,6.10^{11}kWh = 160 TWh$
Energie stockée dans les batterie du véhicule (rendement = 0,9): $E_{batterie} = \frac{E_{m}}{n} = 1,77.10^{11} kWh = 177 TWh$
Puissance necessaire: $P = \frac{E_{batterie}}{\Delta t} = \frac{1,77.10^{11}}{365*24} = 20,27 GW$
