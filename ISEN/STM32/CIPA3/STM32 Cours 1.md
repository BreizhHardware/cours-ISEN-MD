#CIPA3 #STM32

Cortex M et système embarqué
STM32CubeIDE

TSMC les best 

100e de milliard de transistor par puce

Logiciel: Synopsis et autre (tous américain)
Fabrication par lithographie: ASML

STM32: 28 ou 40 nm

SMIC: Semiconductor Manufacturing International Corporation, fondrie chinoise alternative a TSMC

# Histoire de ST
ST:
- Thomson Semiconducteur
- SGS Microellectronics
Les 2 en faillites, décision de fusion -> Création de ST Microelectronics

# Déclaration variable
fini int var
il faut choisir si la variable est signé ou non et donc sa taille

# Différent micro controller
Micro controller 4bits: exemple: calculateur R5 (la vielle)
Micro controller 8bits: 
- Leaders:
	- Microchips
	- TI
	- Philips
	- Motorola -> Freescale
Micro controller 16bits:
- Leaders:
	- TI
	- Microchips
Micro controller 32bits:
- Leaders:
	- CortexM -> ST

# Type de mémoire
## Mémoire volatile
SRAM: Static Random Access Memory (micro controller)
DRAM: Dynamic Random Access Memory (PC)
## Mémoire non volatile
ROM: Read Only Memory
EEPROM: Electrically-Erasable Programmable Read-Only Memory
Flash (Nor):

## DRAM Characteristics
- Volatile
- 8-bits granularity in read and write cycle
- Unlimited Endurance
- Fast access time to read and write
- Small Size / Low Cost
- High Current Consumption (must be refreshed) -> Not used in micro controllers

## SRAM Characteristics
- Volatile
- 8-bits granularity in read and write cycle
- Unlimited Endurance
- Fast access time to read and write -> But slower than DRAM
- Large Size / High Cost
- Low Current Consumption -> Always used in micro controllers
## EEPROM Characteristics
- Non volatile
- 8-bits granularity in read and write cycle
- Limited endurance in write cycle
- Slow access time to read / write cycle
- Medium Size / Low Cost
- Often used in micro controllers
# Gestion mémoire
Stack to the top of the SRAM
Var to the bottom of the SRAM
Heap in the middle of the 2

[Cours suivant](STM32%20Cours%202.md)

---
&copy; Félix MARQUET