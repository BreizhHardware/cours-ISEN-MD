#CIPA3 #STM32

[Cours précédent](STM32%20Cours%201.md)

Grosse utilisation des décalages: 1 << 8 et non pas 2^8 ou 256

LSB: Least Significant Bit
MSB: Most Significant Bit

# Basic Operations
AND -> Forcer le bit à 1 ou connaitre l'état du bit
OR -> Forcer le bit à 0
XOR -> changer l'état d'un bit

## ET (AND)
|  A  |  B  | AND |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  0  |
|  1  |  0  |  0  |
|  1  |  1  |  1  |

## OU (OR)
|  A  |  B  | OR  |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  1  |
|  1  |  0  |  1  |
|  1  |  1  |  1  |

## OU Exclusif (XOR)
|  A  |  B  | XOR |
| :-: | :-: | :-: |
|  0  |  0  |  0  |
|  0  |  1  |  1  |
|  1  |  0  |  1  |
|  1  |  1  |  0  |
## Logic Gate
![Logic gate](https://i0.wp.com/www.goodmath.org/blog/wp-content/uploads/2022/12/basic-gates.png?w=417)

## GPIO Schematic STM32
![GPIO Schematic](https://wiki.st.com/stm32mpu/nsfr_img_auth.php/5/56/IO_port.png)

# Bit Masking
Bit masking has the following purpose
- Masking bits to 1
- Masking bits to 0
- Querying Status Bit
- Toggling a bit

## Masking bits to 1
### Masking on the higher nibble
|     | 1001 0101 |
| :-: | :-------: |
| OR  | 1111 0000 |
|  =  | 1111 0101 |
### Masking on the lower nibble
|     | 1010 0101 |
| :-: | :-------: |
| OR  | 0000 1111 |
|  =  | 1010 1111 |


## Masking bits to 0
### Masking on the higher nibble
|     | 1001 0101 |
| :-: | :-------: |
| OR  | 0000 1111 |
|  =  | 0000 0101 |
### Masking on the lower nibble
|     | 1010 0101 |
| :-: | :-------: |
| OR  | 1111 0000 |
|  =  | 1010 0000 |
## Querying Status Bit
### Check Status bit 3
|     | 1001 1101 |
| :-: | :-------: |
| AND | 0000 1000 |
| OR  | 0000 1000 |

|     | 1001 0101 |
| :-: | :-------: |
| AND | 0000 1000 |
| OR  | 0000 0000 |

## Toggling a Bit
### Check Status bit 3
|     | 1001 1101 |
| :-: | :-------: |
| XOR | 1111 1111 |
| OR  | 0000 1000 |


# Langage C
| Logique |  C  | Exemple Code Haut niveau                 |
| :-----: | :-: | ---------------------------------------- |
|   OR    | \|  | GPIOA \|= (1 << 2); (force le bit 2 à 1) |
|   AND   |  &  | GPIOA &= ~(1 << 2); (force le bit 2 à 0) |
|   XOR   |  ^  | GPIOA ^= (1 << 2); (inverse le bit 2)    |

# TD1
## Exercice 2 
1. Ecrire en binaire les octets 0x5A, 0x33, 0x0F, 0xF0, 0x6C 
	1. 0x5A: 1011010
	2. 0x33: 110011
	3. 0X0F: 1111
	4. 0xF0: 11110000
	5. 0x6C: 1101100
2. On considère une série d’entier relatifs négatifs -1, -21, -55, -100. Donner leur représentation en binaire sur 8 bits et leur représentation en hexadécimal, sachant qu’ils sont codés en complément à 2 
	1. -1: 11111111
	2. -21: 11101011
	3. -55: 11001001
	4. -100: 11001001
3. Donner les valeurs décimales signées et non-signées des octets suivants : 0b10010110, 0b11010001, 0b00110011, 0b10100101
	1. Non signées
		1. 0b10010110: -106
		2. 0b11010001: 

---
&copy; Félix MARQUET