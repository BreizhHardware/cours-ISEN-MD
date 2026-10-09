# Introduction

```assembly
maVariable:
	.word 2

main:
ldr r0, =maVariable // recupère l'adresse de la variable r0
ldr r1, [r0] // mets la valeur pointée par r0 dans r1

LoopForever:

	subs r1, #1 // soustrait 1 à r1 en mettant à jour le registre xPSR
	
	b LoopForever
```

Puis quand on ouvre la vue disasembly on peut voir que `ldr r0, =maVariable` devient ` ldr     r0, [pc, #32]   @ (0x800021c <LoopForever+30>)` à l'adresse `0x80001fa`. Puis quand on va voir dans le registre on peut voir que le PC (Program Counter) est en effet à la valeur `0x80001fa` ce qui veut dire que la prochaine instruction qui va être exécuté sera bien notre récupération d'adresse.
Une fois que l'on éxecute un step si on va à l'adresse correspondant à `r0` (`0x20000000`) on peut voir que la valeur est a 2 ce qui correspond a notre valeur initial, de plus le PC à changé pour `0x80001fc`. 
Une fois que rl est à 0, xpsr est a `0x61000000`, et une fois que rl est à `0xffffffff`, xpsr est a `0x81000000` ce qui correspond à l'activation du flag *N* (Negative, bit 31), car le résultat de `0 - 1` est négatif, et du bit T* (Thumb, bit 24), qui est toujours à 1.

# Construction d'un compteur modulo 10

```assembly
count:
	.word 0
	
main:
ldr r0, =count

LoopForever:
	ldr r1, [r0] // r1 = count
	adds r1, #1 // On ajoute 1
	cmp r1, #10 // On regarde si r1 = 10
	blt Save // Si r1 < 10 on sauvegarde la valeur
	movs r1, #0 // Sinon on retourne a 0

Save:
	str r1, [r0] // count = r1
	b LoopForever
```


Les flags `xPSR` N Z C V correspondent respectivement à:
- **N (Negative, bit 31)** : vaut 1 si le résultat de l'opération est négatif
- **Z (Zero, bit 30)** : vaut 1 si le résultat de l'opération est nul
- **C (Carry, bit 29)** : vaut 1 s'il y a une retenue en sortie pour une addition, ou s'il n'y a **pas** d'emprunt pour une soustraction ou un `cmp`
- **V (oVerflow, bit 28)** : vaut 1 s'il y a un dépassement de capacité en arithmétique signée, c'est-à-dire quand le résultat ne tient pas dans 32 bits signés (par exemple, deux positifs dont la somme donne un négatif).

|    PC     | Registre R0 | Registre R1 |            xPSR (Flags N Z C V)            | Count |       Instruction       |                                              Remarque                                               |
| :-------: | :---------: | :---------: | :----------------------------------------: | :---: | :---------------------: | :-------------------------------------------------------------------------------------------------: |
| 0x80001fa | 0x20000000  | 0x20000004  |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   0   | `ldr     r0, [pc, #40]` |                                          État au démarrage                                          |
| 0x80001fc | 0x20000000  | 0x20000004  |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   0   | `ldr     r1, [r0, #0]`  |                    R0 contient maintenant l'adresse de `count` : **0x20000000**                     |
| 0x80001fe | 0x20000000  |     0x0     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   0   |      `adds r1, #1`      |                                   R1 = 0, valeur lue dans `count`                                   |
| 0x8000200 | 0x20000000  |     0x1     |   0x1000000 (N = 0, Z = 0, C = 0, V = 0)   |   0   |      `cmp r1, #10`      |                 `adds` : résultat 1, positif, sans retenue, donc tous les flags à 0                 |
| 0x8000202 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   0   |    `blt.n 0x8000206`    |                  `cmp 1, #10` donne 1 - 10 = -9 : N = 1, `blt` est pris car N ≠ V                   |
| 0x8000206 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   0   |   `str r1, [r0, #0]`    |                        Saut vers `str` : `count` n'est pas encore mis à jour                        |
| 0x8000208 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   1   |     `b.n 0x80001fc`     |            `count` vaut 1 : écriture en mémoire effectuée, retour au début de la boucle             |
| 0x80001fc | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   1   | `ldr     r1, [r0, #0]`  |                                                                                                     |
| 0x80001fe | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   1   |      `adds r1, #1`      |                                                                                                     |
| 0x8000200 | 0x20000000  |     0x2     |   0x1000000 (N = 0, Z = 0, C = 0, V = 0)   |   1   |      `cmp r1, #10`      |                                                                                                     |
| 0x8000202 | 0x20000000  |     0x2     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   1   |    `blt.n 0x8000206`    |                                                                                                     |
| 0x8000206 | 0x20000000  |     0x2     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   1   |   `str r1, [r0, #0]`    |                                                                                                     |
| 0x8000208 | 0x20000000  |     0x2     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   2   |     `b.n 0x80001fc`     |                                                                                                     |
|           |             |             |                                            |       |                         |                                                                                                     |
| 0x80001fc | 0x20000000  |     0x9     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   9   | `ldr     r1, [r0, #0]`  |                                                                                                     |
| 0x80001fe | 0x20000000  |     0x9     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |   9   |      `adds r1, #1`      |                                                                                                     |
| 0x8000200 | 0x20000000  |     0xa     |   0x1000000 (N = 0, Z = 0, C = 0, V = 0)   |   9   |      `cmp r1, #10`      |                                                                                                     |
| 0x8000202 | 0x20000000  |     0xa     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   9   |    `blt.n 0x8000206`    | `cmp 10, #10` donne 0 : Z = 1, C = 1. `blt` **n'est pas pris** (N = V), donc PC passe à `0x8000204` |
| 0x8000204 | 0x20000000  |     0xa     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   9   |    `movs    r1, #0`     |                                   `movs r1, #0` : R1 repasse à 0                                    |
| 0x8000206 | 0x20000000  |     0x0     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   9   |   `str r1, [r0, #0]`    |                    `str` sur le point d'écrire 0 dans `count`, qui vaut encore 9                    |
| 0x8000208 | 0x20000000  |     0x0     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |   0   |     `b.n 0x80001fc`     |                     `count` = 0 : le compteur a bouclé, 0 -> 1 -> ... -> 9 -> 0                     |

# Design d'une boucle for

```assembly
sum:
	.byte 0

main:
ldr   r0, =sum         // r0 = adresse de sum

LoopForever:
    cmp   r1, #1           // compare X à 1
    blt   Start            // X < 1 (donc X = 0) : retour à sum = 0
    ldrb  r2, [r0]         // r2 = sum
    adds  r2, r2, r1       // sum = sum + X
    strb  r2, [r0]         // écrit sum (1 octet)
    subs  r1, r1, #1       // X = X - 1
    b     LoopForever

Start:
    movs  r2, #0
    strb  r2, [r0]         // sum = 0
    movs  r1, #20          // X = 20
```

Pour cette boucle on veut calculer la somme des 20 premiers entiers (1 à 20). Le résultat attendu est `(20 * 21) / 2 = 210 = 0xD2`, ce qui tient sur un seul octet. L'indice de la boucle `X` vit directement dans le registre `r1`. Au démarrage `ldr r0, =sum` place l'adresse de `sum` dans `r0`. Ensuite dans `Start`on initialise `sum = 0`. On utilise `strb` (et non pas `str` car `sum` ne fait qu'un octet et `str` écrit sur 4 octet et donc viendrait écraser les 3 octects voisin de `sum`).
Dans la boucle `cmp r1, #1` compare `X` à 1 et met à jour le `xPSR`. Si `X < 1` alors on passe dans `Start` qui comme dit plus tôt mets `sum` à 0. Sinon on continu et on calcule `sum + X` avant de le stocker dans `r2`, une fois l'écriture en mémoire faites, on retire `1` à `X` et on recommence la boucle.

|   R1   |      Calcul      |           xPSR            |   blt    |
| :----: | :--------------: | :-----------------------: | :------: |
| 20 à 2 | résultat positif |    0x21000000 (C = 1)     | non pris |
|   1    |    1 - 1 = 0     | 0x61000000 (Z = 1, C = 1) | non pris |
|   0    |    0 - 1 = -1    | 0x81000000 (N = 1, C = 0) |   pris   |

# Création et appel d'une sous routine

```assembly
sum:
.byte 0

calculate_sum:
	movs r1, #0 // sum = 0
				// X = A : X est directement R0

LoopSum:
	cmp r0, #1 // compare X à 1 
	blt EndSum // X < 1: fin du calcul 
	adds r1, r1, r0 // sum = sum + X 
	subs r0, r0, #1 // X = X - 1 
	b LoopSum // retour au test

EndSum:
	mov r0, r1 // résultat renvoyé dans R0 
	bx lr // retour à l'appelant
	
main:
ldr r2, =sum // r2 = adresse de la variable sum

Start:
	movs r0, #22 // A = 22 
	bl calculate_sum // appel du sous-programme
	strb r0, [r2] // sum = R0
	b Start // on recommence
```

Pour ce programme on reprend le calcul de la somme, mais cette fois dans un sous-programme `calculate_sum` qui peut additionner n'importe quel nombre d'entiers. Ici on utilise `A = 22`, donc le résultat attendu est `22 * 23 / 2 = 253 = 0xFD`, ce qui tient encore sur un seul octet, `sum` reste donc en `.byte`.
Le sous-programme reçoit `A` dans `r0` et renvoie le résultat dans `r0`. `X` est directement `r0` et la somme est accumulée dans `r1`. Une fois la boucle finie, `mov r0, r1` place le résultat dans `r0`. On utilise `mov` sans le `s` car on n'a pas besoin de mettre à jour le `xPSR`. Le programme principal garde l'adresse de `sum` dans `r2`, que `calculate_sum` ne modifie pas, elle est donc encore valide après l'appel. Le résultat est ensuite écrit avec `strb`.
Durant l'exécution, au moment de rentrer dans le sous-programme, on peut voir que le `PC` passe de `0x800020e` à `0x80001fa` et que le `LR` passe de `0x80001fb` à `0x8000213`. Ce comportement vient de l'instruction `bl calculate_sum`, qui fait deux choses en même temps :
- Le `PC` reçoit l'adresse de la première instruction du sous-programme (`movs r1, #0`), c'est le saut.
- Le `LR` (Link Register) reçoit l'adresse de retour, c'est-à-dire l'adresse de l'instruction qui suit le `bl`. Le `bl` fait 4 octets en Thumb (instruction 32 bits), donc le `strb` est à `0x800020e + 4 = 0x8000212`. Le `LR` vaut `0x8000213` car le bit 0 est mis à 1 pour indiquer le mode Thumb.

Avant le `bl`, le `LR` valait `0x80001fb`, c'est l'adresse de retour du `bl main` fait dans `Reset_Handler`. Cette valeur est écrasée par le `bl calculate_sum`.
À la fin du sous-programme, `bx lr` recopie le `LR` dans le `PC`. Le processeur ignore le bit 0 et reprend à `0x8000212`, sur le `strb r0, [r2]`.

|Moment|PC|LR|
|---|---|---|
|Avant `bl calculate_sum`|`0x800020e`|`0x80001fb`|
|Après `bl`|`0x80001fa`|`0x8000213`|
|Pendant la boucle|`LoopSum` à `EndSum`|`0x8000213`|
|Après `bx lr`|`0x8000212`|`0x8000213`|

