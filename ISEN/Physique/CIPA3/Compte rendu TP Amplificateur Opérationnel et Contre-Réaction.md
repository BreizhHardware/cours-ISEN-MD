```table-of-contents
title: 
style: nestedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 0 # Include headings from the specified level
maxLevel: 0 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: false # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```

<div style="page-break-after: always;"></div>

## Introduction

L'objectif de ce TP est d'étudier les propriétés et les applications des amplificateurs opérationnels (AOP) dans différents modes de fonctionnement. Nous nous concentrons sur les montages amplificateurs de base, les comparateurs à hystérésis, et les défauts dynamiques des AOP. Ce travail permet de comprendre les principes théoriques et de les appliquer expérimentalement en laboratoire. Les résultats obtenus lors de la préparation théorique seront détaillés, ainsi que les montages expérimentaux étudiés.

## Mesures

### Montage Amplificateur Inverseur

**Schéma :** Le schéma de l'amplificateur inverseur a été établi avec un AOP de type 741. Les résistances utilisées étaient de $1 \text{ k}\Omega$ et $10 \text{ k}\Omega$ pour obtenir une amplification de -10.
![](https://cdn.breizhhardware.fr/FAKA3/TOlutuJa85.jpg/raw)


**Protocole expérimental :**
1. Un signal d'entrée sinusoïdal de fréquence $1 \text{kHz}$ a été appliqué.
2. Le montage a été construit sur une plaquette d'essai.
3. Les caractéristiques du montage ont été vérifiées expérimentalement.

**Résultats :**
- Amplification mesurée : -10
- Source d'énergie : L'alimentation de l'AOP permet d'amplifier le signal d'entrée.
![](https://cdn.breizhhardware.fr/FAKA3/pidAtUzo21.jpg/raw)

### Montage Suiveur

**Schéma :** Le schéma du montage suiveur a été complété avec un AOP, en utilisant des résistances de $47 \text{ k}\Omega$ et $10 \text{ k}\Omega$.

**Intérupteur en position 1**
![](https://cdn.breizhhardware.fr/FAKA3/QuCumAFa01.jpg/raw)

![](https://cdn.breizhhardware.fr/FAKA3/WUGedOMu55.jpg/raw)
**Intérupteur en position 2**
![](https://cdn.breizhhardware.fr/FAKA3/bApIDOFi20.jpg/raw)

**Protocole expérimental :**
1. Le signal d'entrée était sinusoïdal de fréquence $1 \text{kHz}$.
2. Le montage a été construit pour mettre en évidence la propriété de séparateur du montage suiveur.
3. Les rapports de transfert T1 et T2 ont été mesurés avec et sans l'interrupteur.

**Résultats :**
- T1 = 0.065 avec $s = 130 \text{ mV}$ et $e = 2 \text{ V}$
- T2 = 0.18 avec $s = 360 \text{ mV}$ et $e = 2 \text{ V}$
- Impédances théoriques : $Z_{\text{in}} = +\infty$ et $Z_{\text{out}} = 0$


**Intéupteur en position 1**
![](https://cdn.breizhhardware.fr/FAKA3/pAWICaPe51.jpg/raw)
**Intérupteur en position 2**
![](https://cdn.breizhhardware.fr/FAKA3/zOBazEte74.jpg/raw)


### Montage Amplificateur Non Inverseur

**Schéma :** Le schéma de l'amplificateur non inverseur a été établi avec une amplification de 11.
![](https://cdn.breizhhardware.fr/FAKA3/QuCumAFa01.jpg/raw)

**Protocole expérimental :**
1. Un signal d'entrée sinusoïdal de fréquence $1 \text{kHz}$ a été appliqué.
2. Le montage a été construit et l'amplification a été mesurée.    

**Résultats :**
- Amplification mesurée : 11
- $e = 1.98 \text{ V}, s = 21.8 \text{ V}, s/e = 11$
![](https://cdn.breizhhardware.fr/FAKA3/SowAgOZe91.jpg/raw)

### Montage à Boucle de Réaction Unique en Fonctionnement Non Linéaire

**Schéma :** Le schéma du montage comparateur à hystérésis a été établi avec des résistances de $4.7 \text{ k}\Omega$ et $47 \text{ k}\Omega.$
![](https://cdn.breizhhardware.fr/FAKA3/CAVuGUXi69.jpg/raw)

**Protocole expérimental :**
1. Un signal d'entrée triangulaire de fréquence 100 Hz a été appliqué avec une amplitude crête à crête de 4 V.
2. Le montage a été construit et les seuils de basculement ont été mesurés.

**Résultats :**

- Seuils de basculement : 1 V et -1 V
- Largeur de l'hystérésis : 40 μs
 ![](https://cdn.breizhhardware.fr/FAKA3/gASaqozo03.jpg/raw)
![](https://cdn.breizhhardware.fr/FAKA3/GEjUPAce04.jpg/raw)

## Discussion

### Défauts Dynamique de l'Amplificateur Opérationnel

**Slew Rate :**

- Lors de l'augmentation de la fréquence du signal d'entrée, le signal de sortie est devenu triangulaire.
- Slew Rate mesuré : 0.54 V/μs
- Comparaison avec la datasheet : Le Slew Rate mesuré est conforme aux spécifications du UA741.

**Bande Passante :**

- Amplifications et bandes passantes mesurées :
    - $A_2 = 11, B_2 = 75 \text{ kHz}$
    - $A_3 = 14, B_3 = 17 \text{ kHz}$
    - $A_4 = 5.05, B_4 = 9.1 \text{ kHz}$
- Produit gain-bande : $M = A \times B$
    - $MA_2 = 825, MA_3 = 799, MA_4 = 919.1$
- La relation entre l'amplification et la bande passante a été vérifiée, confirmant que le produit gain-bande est constant.

## Conclusion

Ce TP a permis de comprendre et d'expérimenter les différents modes de fonctionnement des amplificateurs opérationnels. Les montages amplificateurs inverseurs, non inverseurs et suiveurs ont été étudiés et leurs caractéristiques ont été vérifiées expérimentalement. Les défauts dynamiques des AOP, tels que le Slew Rate et la bande passante, ont été mis en évidence et analysés. Les résultats obtenus sont conformes aux attentes théoriques, confirmant ainsi les principes étudiés en cours. Ce travail a également permis de développer des compétences en matière de rédaction de documents scientifiques et techniques.