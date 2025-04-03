#CIPA3 #STM32

[Cours précédent](STM32%20Cours%202.md)

[Sujet disponible ici](TD1_STM32_Eleves_2023.pdf)

## Exercice 3
1. Ecrire 160 en binaire 
	1. 0b10100000
2. Diviser 160 par 8. Ecrire le résultat en binaire 
	1. 160 / 8 = 20
	2. 0b10100
3. Que remarque t’on ? Proposer une méthode plus rapide pour obtenir le résultat.
	1. On déplace de 3 zéro le résultat (équivalent de 8 en binaire ($2^3$))

## Exercice 4
Les technologies mémoire utilisées dans les microcontrôleurs sont principalement la SRAM et Flash.
1. Expliquer pourquoi la DRAM n’est utilisée pas dans les microcontrôleurs alors qu’elle est très utilisée dans les ordinateurs.
	1. La DRAM n'est pas utilisé dans les microcontrôleurs car elle consomme beaucoup d'énergie étant donnée qu'elle doit être rafréchis.
2. Remplir le tableau ci-dessous avec les caractéristiques

|                         |        SRAM        |            FLASH             |
| :---------------------: | :----------------: | :--------------------------: |
|       Volatilité        |      Volatile      |         Non-volatile         |
|        Endurance        | Endurance illimité | Endurance limité en écriture |
| Granularité en écriture |    Bit ou octet    |         Bloc ou page         |
| Granularité en lecture  |    Bit ou octet    |         Octet ou mot         |
## Exercice 5
Dans un microcontrôleur, où sont stockées les variables? Le programme? Les constantes ?
- Variables
	- SRAM (en bas)
- Programme
	- FLASH
- Constantes
	- SRAM (en haut) ou FLASH
## Exercice 6
Soit une variable var, de taille 32 bits, initialisée comme suit : t var = b1001 0000. 
Déterminer les masques et la logique pour obtenir les résultats suivant
1. Forcer les bits 6 et 7 à 1 
	1. Porte logique utilisée **OR**
	2. Masque: `0b00000000 00000000 00000000 11000000`
	3. Opération:
		1. `var |= (1 << 6 | 1 << 7);`
2. Forcer les bit 4 et 0 à 0 
	1. Porte logique utilisée  **AND**
	2. Masque  `0b11111111 11111111 11111111 11101110`
	3. Opération :
		1. `var &= ~(1 << 4 | 1 << 0);`
3. Changer l’état du bit 4 
	1. Porte logique utilisée  **XOR**
	2. Masque  `0b00000000 00000000 00000000 00010000`
	3. Opération:
		1. `var ^= (1 << 4);`
4. Vérifier si le bit 5 est à 1
	1. Porte logique utilisée  **AND**
	2. Masque  `0b00000000 00000000 00000000 00100000`
	3. Opération:
		1. `if ((var & (1 << 5)) == (1 << 5))`

# GPIO
Broche -> Port (Lettre) + Numéro entre 0 et 15

PA5 = Port A Numéro 5

## Port
- Each pin is connected to a port
- A port can be connected up to 16 pin

GPIOA address is : 0x4002 0014
Address offset of ODR: 0x14
```C
//Way to write 0x0000 0020 at the address 0x4002 0014
*((unit32_t *)0x40020014) = 0x00000020;
```

# Interruption
Permet d'éviter le polling (consomme beaucoup car vérifie h24 le status du périf)

Les perifs vont envoyé une interruption au coeur du micro, chaque interruption à un numéro qui permet d'identifier le perif. Sur cortex-M maximum 256 interruption. Mais sur les notre 60 interruptions max. Possibilité de multiplexage quand même.

Quand le NVIC reçoit une intérruption: saut dans le programme et saut dans une fonction appelée **handler**


---
&copy; Félix MARQUET