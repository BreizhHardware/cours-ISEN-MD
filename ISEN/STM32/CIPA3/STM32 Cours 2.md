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



---
&copy; Félix MARQUET