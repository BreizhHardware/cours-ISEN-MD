#CIPA3 #STM32
# Quelle est l'adresse de la variable somme ? Pourquoi ? Que représente la colonne Load address ?
![](https://cdn.breizhhardware.fr/FAKA3/QaloSeVo95.png/raw)
Il s'agit de la première adresse disponible dans la RAM.
La load address correspond

![](https://cdn.breizhhardware.fr/FAKA3/ROBANAgo22.png/raw)
![](https://cdn.breizhhardware.fr/FAKA3/DesUzIlO14.png/raw)
```ASM
                      main:
080004b0: 80 b5         push    {r7, lr}
080004b2: 00 af         add     r7, sp, #0
080004b4: 00 f0 f1 f8   bl      0x800069a <HAL_Init>
080004b8: 00 f0 1c f8   bl      0x80004f4 <SystemClock_Config>
080004bc: 0b 4b         ldr     r3, [pc, #44]   @ (0x80004ec <main+60>)
080004be: 02 22         movs    r2, #2
080004c0: 1a 70         strb    r2, [r3, #0]
080004c2: 0d e0         b.n     0x80004e0 <main+48>
080004c4: 0a 4b         ldr     r3, [pc, #40]   @ (0x80004f0 <main+64>)
080004c6: 1a 78         ldrb    r2, [r3, #0]
080004c8: 08 4b         ldr     r3, [pc, #32]   @ (0x80004ec <main+60>)
080004ca: 1b 78         ldrb    r3, [r3, #0]
080004cc: 13 44         add     r3, r2
080004ce: da b2         uxtb    r2, r3
080004d0: 07 4b         ldr     r3, [pc, #28]   @ (0x80004f0 <main+64>)
080004d2: 1a 70         strb    r2, [r3, #0]
080004d4: 05 4b         ldr     r3, [pc, #20]   @ (0x80004ec <main+60>)
080004d6: 1b 78         ldrb    r3, [r3, #0]
080004d8: 01 33         adds    r3, #1
080004da: da b2         uxtb    r2, r3
080004dc: 03 4b         ldr     r3, [pc, #12]   @ (0x80004ec <main+60>)
080004de: 1a 70         strb    r2, [r3, #0]
080004e0: 02 4b         ldr     r3, [pc, #8]    @ (0x80004ec <main+60>)
080004e2: 1b 78         ldrb    r3, [r3, #0]
080004e4: 14 2b         cmp     r3, #20
080004e6: ed d9         bls.n   0x80004c4 <main+20>
 97                     while(1) {
080004e8: 00 bf         nop     
080004ea: fd e7         b.n     0x80004e8 <main+56>
080004ec: 2c 00         movs    r4, r5
080004ee: 00 20         movs    r0, #0
080004f0: 00 00         movs    r0, r0
080004f2: 00 20         movs    r0, #0
110                   {
```
# Combien d'octets occupe la fonction main() en mémoire?


# Donner le numéro de ligne où la structure GPIO_TypeDef
Ligne 352