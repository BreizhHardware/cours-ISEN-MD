#CIPA3 #STM32

[Cours précédent](STM32%20Cours%204.md)

SP = Stack Pointer
LR = Link Register
PC = Program Counter
PSR = Program Status Register
# Pointer
## Language C
Variable à l'adresse 0x2000 0000
### On va lire des variables 32 bits
```C
unit32_t var;
var = *((unit32_t*)0x20000000);
```
### Forcer un bit à 1
(Exemple bit 23 et 11)
```C
var |= (1 << 23 | 1 << 11);
```
### Forcer un bit à 0
(Exemple bit 4 et 0)
```C
var &= ~(1 << 4 | 1 << 0);
```
### Changer l'état d'un bit
(Exemple bit 3, 8, 11 et 22)
```C
var ^= (1 << 3 | 1 << 8 | 1 << 11 | 1 << 2);
```
### Déterminer l'état d'un bit
(Exemple bit 5)
```C
if (((var & (1 << 5)1 << 7 )) == (1 << 5 | 1 << 7){}
```

# Le microcontrolleur
![](https://upload.wikimedia.org/wikipedia/commons/9/9e/Syst%C3%A8meMicroproc.png)
GPIO = General Purpose Input Output
2 mode de fonctionnement sur les broches:
- GPIO (15 Broches GPIO)
- Alternate Function

IDR = Input Data Register
ODR = Output Data Register

---
&copy; Félix MARQUET