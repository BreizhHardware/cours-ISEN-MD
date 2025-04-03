#STM32 #CIPA3 
# Exercice 1
On suppose qu'on veut manipuler un registre qui est à l'adresse 0x40020814. Ecrire les opération suivantes en C
1. Déclarer une variable var comme un entier non signé 32 bits
```C
uint32_t var = 0;
```
2. Affecter la valeur du registre dans la variable var
```C
*var = 0x40020814;
```
3. Forcer le bit 7 à 0
```C
**var &= ~(1 << 7);
```
4. Changer l'état du bit 9
```C
**var ^= (1 << 4);
```
5. Forcer le bit 21 à 1
```C
**var |= (1 << 21);
```
6. Déterminer la valeur du bit 27
```C
**var & (1 << 5)) != 0;
```
7. Forcer les 
