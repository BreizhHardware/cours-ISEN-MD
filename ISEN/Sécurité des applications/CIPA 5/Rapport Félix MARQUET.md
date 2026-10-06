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