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
var = *((unit32_t*)0x20000000)
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

---
&copy; Félix MARQUET