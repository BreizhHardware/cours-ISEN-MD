#STM32 #CIPA3 
# Exercice 1
On suppose qu'on veut manipuler un registre qui est à l'adresse 0x40020814. Ecrire les opération suivantes en C
1. Déclarer une variable var comme un entier non signé 32 bits
```C
uint32_t var = 0;
```
2. Affecter la valeur du registre dans la variable var
```C
var = *(volatile uint32_t *)0x40020814;
```
3. Forcer le bit 7 à 0
```C
var &= ~(1 << 7);
```
4. Changer l'état du bit 9
```C
var ^= (1 << 4);
```
5. Forcer le bit 21 à 1
```C
var |= (1 << 21);
```
6. Déterminer la valeur du bit 27
```C
var & (1 << 5)) != 0;
```
7. Forcer les bit 11 et 15 à 1
```C
var |= (1 << 11 | 1 << 15);
```
8. Forcer les bits 0 et 13 à 0
```C
var &= ~(1 << 0 | 1 << 13);
```
9. Changer l'état des bits 12 et 17
```C
var ^= (1 << 12 | 1 << 17);
```
10. Forcer les bits 18, 19, 20 à 9
```C
var &= ~(1 << 18 | 1 << 19 | 1 << 20);
```
11. Forcer les bits 21, 22 et 23 à 1
```C
var |= (1 << 21 | 1 << 22 | 1 << 23);
```
12. Changer l'état des bits 2, 3, et 4
```C
var ^= (1 << 2 | 1 << 3 | 1 << 4);
```
13. Ecrire la valeur 0xFFFFFFFF dans le registre
```C
var = 0xFFFFFFFF;
```
# Exercice 2
On suppose que les valeurs sont enregistrées en complément à 2 sur 8 bits. Donner les valeurs binaires des nombres suivants: -45, 89, -128, -3, 126.


---
&copy; Félix MARQUET