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


|    PC     | Registre R0 | Registre R1 |               Flags N Z C V                | Variable counter |       Instruction       | Remarque |
| :-------: | :---------: | :---------: | :----------------------------------------: | :--------------: | :---------------------: | :------: |
| 0x80001fa | 0x20000000  | 0x20000004  |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |        0         | `ldr     r0, [pc, #40]` |          |
| 0x80001fc | 0x20000000  | 0x20000004  |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |        0         | `ldr     r1, [r0, #0]`  |          |
| 0x80001fe | 0x20000000  |     0x0     |  0x61000000 (N = 0, Z = 1, C = 1, V = 0)   |        0         |      `adds r1, #1`      |          |
| 0x8000200 | 0x20000000  |     0x1     |   0x1000000 (N = 0, Z = 0, C = 0, V = 0)   |        0         |      `cmp r1, #10`      |          |
| 0x8000202 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        0         |    `btl.n 0x8000206`    |          |
| 0x8000206 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        1         |   `str r1, [r0, #0]`    |          |
| 0x8000208 | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        1         |   `str r1, [r0, #0]`    |          |
| 0x80001fc | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        1         | `ldr     r1, [r0, #0]`  |          |
| 0x80001fe | 0x20000000  |     0x1     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        1         |      `adds r1, #1`      |          |
| 0x8000200 | 0x20000000  |     0x2     |   0x1000000 (N = 0, Z = 0, C = 0, V = 0)   |        1         |      `cmp r1, #10`      |          |
| 0x8000202 | 0x20000000  |     0x2     | 0x81000000<br>(N = 1, Z = 0, C = 0, V = 0) |        1         |    `btl.n 0x8000206`    |          |
|           |             |             |                                            |                  |                         |          |