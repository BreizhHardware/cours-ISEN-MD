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
Une fois que l'on
