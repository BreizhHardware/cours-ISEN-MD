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



---
&copy; Félix MARQUET