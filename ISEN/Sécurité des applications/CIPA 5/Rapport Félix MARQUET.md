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

# Faire flasher en on/off avec une interruption

```assembly
init_led:
/* Configure PORT A*/

	/* Enable port A */
	ldr r0, =0x4002381C /* address of the RCC_AHBENR GPIO Clock Enable Register */
	ldr r1, =0x00000001 /* mask to apply to RCC_IOPENR */
	ldr r2, [r0] /* load value of RCC_IOPENR to r2 */
	orrs r1,r2 /* for IOPAEN to 1 to enable port A */
	str r1, [r0] /* write new value to RCC_IOPENR */
	  
	/* configure pin in output mode */
	ldr r0, =0x40020000 /* address of the MODE Register port A */
	ldr r1, =0x00000400 /* mask to apply to MODE Register port A */
	ldr r2, [r0] /* load value of MODE Register port A */
	orrs r1,r2 /* force bit 10 to 1 */
	str r1, [r0] /* write new value to port A OTYPER */
	
	ldr r1, =0xFFFFF7FF /* mask to apply to MODE Register port A */
	ldr r2, [r0] /* load value of MODE Register port A */
	ands r1,r2 /* force bit 11 to 0 */
	str r1, [r0] /* write new value to port A OTYPER */
	
	bx lr
```

Le code fourni, dont voici un extrait ci-dessus, était écrit pour un STM32L152, alors que notre carte est un STM32L476. Au premier `ldr r2, [r0]` de `init_led`, le programme plantait.
Sur le L476, l'adresse `0x4002381C` (RCC_AHBENR du L152) se trouve dans une zone mémoire réservée. La lire provoque une BusFault, qui est escaladée en HardFault. Comme ce handler n'est pas défini, il pointe vers `Default_Handler`, et le programme reste bloqué dans `Infinite_Loop`.
Après analyse et recherche dans le reference manual du L476, voici les adresses à changer :

| Registre                               | L152                       | L476                           |
| -------------------------------------- | -------------------------- | ------------------------------ |
| RCC, activation de l'horloge des GPIO  | `0x4002381C` (RCC_AHBENR)  | **`0x4002104C`** (RCC_AHB2ENR) |
| RCC, activation de l'horloge de SYSCFG | `0x40023820` (RCC_APB2ENR) | **`0x40021060`** (RCC_APB2ENR) |
| GPIOA_MODER                            | `0x40020000`               | **`0x48000000`**               |
| GPIOA_ODR                              | `0x40020014`               | **`0x48000014`**               |
| GPIOC_MODER                            | `0x40020800`               | **`0x48000800`**               |

Cependant les bits à modifier restent les même donc seul les registres RCC et GPIO ont changé.

# Localisation des variables en mémoire

Le STM32L476RG possède 1 Mo de Flash (à partir de `0x08000000`), 96 Ko de SRAM1 (à partir de `0x20000000`) et 32 Ko de SRAM2 (à partir de `0x10000000`). Le linker script de CubeIDE place le code et les constantes en Flash, et `.data`, `.bss` et la pile en SRAM1. La SRAM2 n'est pas utilisée ici.
Pour ce programme on déclare des variables dans les quatre zones demandées :
- **Flash** : `cst_int` et `cst_text` sont déclarées `const`, elles sont donc placées dans la section `.rodata`, en Flash. On s'attend à une adresse en `0x0800xxxx`. 
- **SRAM, section `.data`** : `data_var1` et `data_var2` sont des variables globales initialisées avec une valeur non nulle. Elles sont en SRAM1, au début de la RAM (`0x2000xxxx`). Leur valeur initiale est stockée en Flash, puis copiée en RAM par `Reset_Handler` au démarrage. 
- **SRAM, section `.bss`** : `bss_var1`, `bss_var2` sont des globales non initialisées. Elles sont en SRAM1, juste après `.data`, et mises à 0 par `Reset_Handler`. 
- **Pile (stack)** : les variables locales `stack_var` (dans `function1`), `k`, `sw1` et `res` (dans `main`) sont des variables automatiques. `stack_var` et `k` sont `volatile`, donc forcées en mémoire. En `-O0`, `sw1`, `res` et `i` sont aussi en pile. La pile est en haut de la SRAM1 et descend depuis `_estack = 0x20018000`. Les adresses doivent donc être proches de `SP`, juste en dessous de `0x20018000`. 
- **Registres** : `reg_var` est déclarée `register`, on s'attend à la voir dans un registre. Une variable en registre n'a pas d'adresse. En `-O1`, `sw1`, `i` et `res` passent aussi en registres. 

|            Variable            |   Zone attendue   |       Adresse attendue       |                                     Adresse relevée                                     |
| :----------------------------: | :---------------: | :--------------------------: | :-------------------------------------------------------------------------------------: |
|     `cst_int`, `cst_text`      | Flash (`.rodata`) |         `0x0800xxxx`         |                     `cst_int`: `0x8003090`, `cst_text`: `0x8003094`                     |
|    `data_var1`, `data_var2`    |  SRAM1 (`.data`)  |     `0x2000xxxx` (début)     |                  `data_var1`: `0x20000000`, `data_var2`: `0x20000004`                   |
|     `bss_var1`, `bss_var2`     |  SRAM1 (`.bss`)   | `0x2000xxxx` (après `.data`) |                   `bss_var1`: `0x200000b8`, `bss_var2`: `0x200000bc`                    |
| `stack_var`, `k`, `sw1`, `res` |       Pile        |   juste sous `0x20018000`    | `stack_var`: `0x20017fd8`,  `k`: `0x20017fec`, `res`: `0x20017ff0`, `sw1`: `0x20017ff7` |
|           `reg_var`            |     Registre      |         `R4` à `R11`         |                                          `R4`                                           |

# Writing in memory

## Les adresses
Le STM32L476RG possède 1 Mo de Flash, 96 Ko de SRAM1 et 32 Ko de SRAM2.

| Adresse | Zone |
| :--- | :--- |
| `0x0800 0000` | Début de la Flash (bank 1), qui contient la table des vecteurs. |
| `0x0808 0000` | Début de la bank 2 de la Flash (2 banks de 512 Ko en mode dual-bank). |
| `0x2000 0000` | Début de la SRAM1. |

L'énoncé donne `0x8000 0000`, qui correspond en réalité à la zone FMC. Nous avons considéré qu'il s'agissait de `0x0800 0000`. De même, `0x08080 0000` et `0x8080 0004` sont lus comme `0x0808 0000` et `0x0808 0004`.

## Lecture de la Flash et de la RAM

```c
volatile uint32_t val_flash, val_ram, readback, old, sr;

val_flash = *(volatile uint32_t *)0x08000000;
val_ram   = *(volatile uint32_t *)0x20000000;
```

- `val_flash` = `0x20018000` : c'est le premier mot de la table des vecteurs, la valeur initiale de `SP` (`_estack`).
- `val_ram` = `0x04C4B400` : c'est `SystemCoreClock`, la première variable de la section `.data`, mise à jour par `SystemClock_Config`.

![](Capture%20d’écran%202026-10-12%20à%2009.54.09.png)

## Écriture en RAM

```c
old = *(volatile uint32_t *)0x20000000;
*(volatile uint32_t *)0x20000000 = 0xDEADBEEF;
readback = *(volatile uint32_t *)0x20000000;
*(volatile uint32_t *)0x20000000 = old;
```

`readback` vaut `0xDEADBEEF` : la RAM s'écrit mot par mot, sans condition. On restaure ensuite l'ancienne valeur, car cette adresse contient `SystemCoreClock`.

![](Capture%20d’écran%202026-10-12%20à%2009.54.32.png)

## Écriture directe en Flash

```c
*(volatile uint32_t *)0x08020000 = 0xDEADBEEF;
readback = *(volatile uint32_t *)0x08020000;
sr = FLASH->SR;
```

Chez nous, `readback` vaut `0xFFFFFFFF` : la valeur n'a pas été écrite. Il n'y a pas de HardFault, mais `FLASH->SR` = `0x80`, soit le flag **PGSERR**. La Flash est verrouillée (`FLASH->CR` = `0xC0000000`, bits LOCK et OPTLOCK) et il faut suivre une procédure précise pour la programmer, contrairement à la RAM.

![](Capture%20d’écran%202026-10-12%20à%2009.54.56.png)

## Lecture à partir de `0x0802 0000`

La lecture donne `0xFFFFFFFF`. Oui, la mémoire est effacée à cet endroit : une cellule Flash effacée a tous ses bits à 1. Le programme fait environ 12 Ko et n'occupe donc pas cette zone.

![](Capture%20d’écran%202026-10-12%20à%2009.55.13.png)
![](Capture%20d’écran%202026-10-12%20à%2009.55.31.png)

## Programmation de la bank 2

Procédure « Read from bank 1 while programming bank 2 » :

1. Déverrouiller la Flash en écrivant `0x45670123` puis `0xCDEF89AB` dans `FLASH_KEYR`. `FLASH->CR` passe de `0xC0000000` à `0x40000000`.
2. Attendre `BSY = 0` et effacer les flags d'erreur.
3. Mettre `PG = 1` dans `FLASH_CR`.
4. Écrire les deux mots : `0xDEADBEEF` à `0x08080000` et `0xAABBCCDD` à `0x08080004`.
5. Attendre `BSY = 0`, relever `FLASH_SR`, puis remettre `PG = 0`.

La Flash du L476 se programme par double mot de 64 bits. Les deux écritures forment donc une seule opération, déclenchée par l'écriture du second mot. Le programme tournant en bank 1, il continue de s'exécuter pendant que la bank 2 est programmée.

Résultat : `sr` = `0x0`, `0x08080000` = `0xDEADBEEF`, `0x08080004` = `0xAABBCCDD`. Dans le Memory Browser, on lit en little-endian `EF BE AD DE DD CC BB AA`.

![](Capture%20d’écran%202026-10-12%20à%2009.57.30.png)
![](Capture%20d’écran%202026-10-12%20à%2009.57.45.png)

## Réécriture sans effacement

On tente d'écrire `0x01234567` à la place de `0xAABBCCDD`. La valeur ne change pas et `FLASH->SR` indique une erreur (**PROGERR**, bit 3).

La programmation ne peut faire passer un bit que de 1 à 0. Seul un effacement (par page ou par bank) remet les bits à 1. Avant de programmer, le contrôleur vérifie que le double mot cible est à `0xFFFFFFFFFFFFFFFF`. Ici il contient déjà `0xDEADBEEF_AABBCCDD`, donc l'écriture est refusée.

![](Capture%20d’écran%202026-10-12%20à%2009.58.26.png)

### Remarque observée en pratique

Lors d'un premier essai, sans effacement préalable, la première écriture a été refusée (`sr` = `0xA8`, qui contient PROGERR). Les données écrites lors d'une session de debug précédente étaient encore en bank 2 (`0xDEADBEEF` et `0x01234567`). Cela confirme que la Flash est non volatile : ses données survivent au reset et à la reprogrammation du bank 1. Le programme final efface donc la bank 2 avant la première écriture.

## Effacement de la bank 2

Procédure « Read from bank 1 while page erasing in bank 2 » : `MER2 = 1` dans `FLASH_CR` (effacement total de la bank 2), puis `STRT = 1`, attente de `BSY = 0`, et remise à 0 de `MER2`. Résultat : `sr` = `0x0`, et `0x08080000` et `0x08080004` valent `0xFFFFFFFF`.

![](Capture%20d’écran%202026-10-12%20à%2009.58.45.png)
![](Capture%20d’écran%202026-10-12%20à%2009.58.56.png)

## Nouvelle écriture

Après l'effacement, on réécrit `0xDEADBEEF` et `0x01234567` : `sr` = `0x0`, et les valeurs sont bien lues en mémoire. Le Flash est donc à nouveau programmable après un effacement.

![](Capture%20d’écran%202026-10-12%20à%2009.59.29.png)

## Synthèse

| Opération | Résultat |
| :--- | :--- |
| Lecture Flash / RAM | possible, sans condition |
| Écriture RAM | libre, mot par mot |
| Écriture Flash verrouillée | refusée (PGSERR) |
| Écriture Flash après déverrouillage et effacement | possible, par double mot de 64 bits |
| Réécriture sans effacement | refusée (PROGERR) |
| Effacement | remet tous les bits à 1 (`0xFF`) |

# LED Flashing

```C
/* USER CODE BEGIN WHILE */
while (1)
{
	HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0);
	HAL_Delay(500);
	/* USER CODE END WHILE */
	
	/* USER CODE BEGIN 3 */
}
/* USER CODE END 3 */
```

## Le désassemblage

```assembly
080004c4:   movs    r1, #1
080004c6:   ldr     r0, [pc, #16]   @ (0x80004d8 <main+40>)
080004c8:   bl      0x8000ea0 <HAL_GPIO_TogglePin>
```

Dans la vue Disassembly on retrouve l'appel à `HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0)` :
- `movs r1, #1` charge le masque de la broche (`GPIO_PIN_0 = 0x0001`) dans `r1`, le deuxième argument de la fonction.
- `ldr r0, [pc, #16]` charge l'adresse de `GPIOB` dans `r0`, le premier argument.
- `bl HAL_GPIO_TogglePin` appelle la fonction, qui inverse les bits de `ODR` sélectionnés par le masque.

Le masque n'est donc pas dans la fonction `HAL_GPIO_TogglePin` : il est chargé juste avant l'appel, par `movs r1, #1`. Si on le change, la fonction inversera d'autres broches.

## Le patch

Pour faire clignoter `PB0` et `PB1` ensemble, il faut un masque `0x03` (bits 0 et 1) à la place de `0x01`. Il suffit donc de transformer `movs r1, #1` en `movs r1, #3`.

| | Instruction | Opcode (16 bits) | Octets en mémoire |
| :--- | :---: | :---: | :---: |
| Avant | `movs r1, #1` | `0x2101` | `01 21` |
| Après | `movs r1, #3` | `0x2103` | `03 21` |

## La manipulation dans STM32CubeProgrammer

La Flash commence à `0x08000000` et l'instruction est à `0x080004C4`. On l'affiche dans l'onglet *Device memory* en lisant 16 octets à partir de `0x080004C0` :

| Adresse | Avant | Après |
| :---: | :---: | :---: |
| `0x080004C0` | `48042101` | `48042103` |

Le mot est affiché sur 32 bits en little-endian : les octets en mémoire sont `01 21 04 48`, c'est-à-dire `movs r1, #1` suivi du début du `ldr r0, [pc, #16]` (`04 48`). On modifie uniquement le dernier chiffre. Les autres mots de la zone ne changent pas.

Étapes :
1. Connecter la carte dans CubeProgrammer et lire `0x080004C0` (taille `0x10`).
2. Double-cliquer sur le mot `48042101`, saisir `48042103` et valider avec Entrée.
3. Relire la zone pour vérifier que la valeur est bien `48042103`.
4. Cliquer sur *Disconnect*, sinon CubeIDE ne peut pas utiliser le ST-LINK.
5. Faire un reset avec le bouton noir de la Nucleo.

## Résultat

Après le reset, les deux LED clignotent ensemble à 1 Hz, alors que le code source n'a pas changé.

Pour le vérifier, on lance le debug dans CubeIDE avec l'option *Download* à `false` dans l'onglet *Startup*. Sans cela, CubeIDE reprogramme la Flash avec le binaire d'origine et efface le patch. Dans la vue Disassembly on lit alors :

```assembly
080004c4:   movs    r1, #3
```

alors que la ligne C affiche toujours `HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0)`.

| | Code source C | Binaire en Flash | LED |
| :--- | :---: | :---: | :---: |
| Avant le patch | `GPIO_PIN_0` | `movs r1, #1` | LED1 seule |
| Après le patch | `GPIO_PIN_0` | `movs r1, #3` | LED1 et LED2 |

# Write Memory Protection

| Élément       |             Valeur              |
| :------------ | :-----------------------------: |
| SRAM2         | `0x10000000` (32 pages de 1 Ko) |
| 2e page       |          `0x10000400`           |
| `SYSCFG_SWPR` |          `0x40010020`           |
| `SCB->AIRCR`  |          `0xE000ED0C`           |

```C
/* USER CODE BEGIN 2 */
volatile uint32_t r1, r2, r3;
#define TEST_FAULT 0 /* 0: On peut écrire, 1 on peut pas écrire */

__HAL_RCC_SYSCFG_CLK_ENABLE();

*(volatile uint32_t *)0x10000000 = 0xDEADBEEF;
r1 = *(volatile uint32_t *)0x10000000;

SYSCFG->SWPR = 0x1;

#if TEST_FAULT
*(volatile uint32_t *)0x10000000 = 0x11223344; /* écriture refusée */
r2 = *(volatile uint32_t *)0x10000000; /* relecture */
#else
*(volatile uint32_t *)0x10000400 = 0xAABBCCDD; /* 2e page : non protégée */
r3 = *(volatile uint32_t *)0x10000400; /* 0xAABBCCDD, pas de reset */
#endif

/* USER CODE END 2 */
```

Pour ce programme on écrit d'abord `0xDEADBEEF` au début de la SRAM2 (`0x10000000`) et on le relit dans `r1`. Ensuite on active l'horloge de SYSCFG avec `__HAL_RCC_SYSCFG_CLK_ENABLE()` (sans cela, `SYSCFG->SWPR` n'est pas accessible), puis `SYSCFG->SWPR = 0x1` protège la première page. Le programme existe en deux versions selon `TEST_FAULT` : 
- `TEST_FAULT = 1` : on écrit `0x11223344` dans la page protégée, puis on relit. 
- `TEST_FAULT = 0` : on écrit `0xAABBCCDD` au début de la 2e page (`0x10000400`), qui n'est pas protégée, sans toucher à la première.

- `TEST_FAULT = 1` (écriture dans la page 0 protégée) : l'écriture est refusée et le programme finit dans une boucle infinie de crash. L'écriture lève une faute, le processeur entre dans `HardFault_Handler`, qui lance le reset applicatif (`SCB->AIRCR = 0x05FA0004`). Le programme redémarre, réécrit `0xDEADBEEF`, reprotège la page 0, retente l'écriture interdite, et ainsi de suite. `SWPR` repasse à 0 à chaque reset, mais le programme le remet à 1 à chaque tour. 
- **`TEST_FAULT = 0` (écriture dans la page 1)** : l'écriture fonctionne, `r3` vaut `0xAABBCCDD` et il n'y a aucun problème ni reset. La protection ne concerne que les pages dont le bit de `SWPR` est à 1. | Cas | Adresse écrite | Page protégée ? | Résultat | | :--- | :---: | :---: | :--- | | `TEST_FAULT = 1` | `0x10000000` | oui (bit 0 de `SWPR`) | HardFault, reset, boucle infinie de crash | | `TEST_FAULT = 0` | `0x10000400` | non | écriture réussie, `r3` = `0xAABBCCDD` | ### Désactiver la protection Les bits de `SYSCFG_SWPR` sont en écriture seule vers 1 : le logiciel peut les mettre à 1 mais pas les remettre à 0. Seul un reset système désactive la protection. Un code malveillant ne peut donc pas la lever une fois qu'elle est activée.