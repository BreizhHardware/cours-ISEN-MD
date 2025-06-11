# Compte-rendu de TP : Amplificateur Opérationnel et Contre-Réaction

## Introduction

L'objectif de ce TP est d'étudier les propriétés et les applications des amplificateurs opérationnels (AOP) dans différents modes de fonctionnement, notamment les montages amplificateurs de base, les comparateurs à hystérésis, et les défauts dynamiques des AOP. Nous détaillerons les résultats obtenus lors de la préparation théorique et les mesures expérimentales effectuées en laboratoire.

## Mesures

### Montage amplificateur inverseur

**Schéma :** Le schéma de l'amplificateur inverseur a été établi avec un AOP de type 741. Les résistances utilisées étaient de 1 kΩ et 10 kΩ pour obtenir une amplification de -10.

**Protocole expérimental :**

1. Un signal d'entrée sinusoïdal de fréquence 1 kHz a été appliqué.
2. Le montage a été construit sur une plaquette d'essai.
3. Les caractéristiques du montage ont été vérifiées expérimentalement.

**Résultats :**

- Amplification mesurée : -10
- Source d'énergie : L'alimentation de l'AOP permet d'amplifier le signal d'entrée.

### Montage suiveur

**Schéma :** Le schéma du montage suiveur a été complété avec un AOP, en utilisant des résistances de 47 kΩ et 10 kΩ.

**Protocole expérimental :**

1. Le signal d'entrée était sinusoïdal de fréquence 1 kHz.
2. Le montage a été construit pour mettre en évidence la propriété de séparateur du montage suiveur.
3. Les rapports de transfert T1 et T2 ont été mesurés avec et sans l'interrupteur.

**Résultats :**

- T1 = 0.065 avec s = 130 mV et e = 2V
- T2 = 0.18 avec s = 360 mV et e = 2V
- Impédances théoriques : Zin = +∞ et Zout = 0

### Montage amplificateur non inverseur

**Schéma :** Le schéma de l'amplificateur non inverseur a été établi avec une amplification de 11.

**Protocole expérimental :**

1. Un signal d'entrée sinusoïdal de fréquence 1 kHz a été appliqué.
2. Le montage a été construit et l'amplification a été mesurée.

**Résultats :**

- Amplification mesurée : 11
- e = 1.98V, s = 21.8V, s/e = 11

### Montage à boucle de réaction unique en fonctionnement non linéaire

**Schéma :** Le montage ici permet de crée une boucle de réaction unique durant un fonctionnement non linéaire

**Protocole expérimental :**

1. Un signal d'entrée triangulaire de fréquence 100 Hz a été appliqué avec une amplitude crête à crête de 4V.
2. Le montage a été construit.

**Résultats :**

- Seuils de basculement: 1V et -1V
- Largeur de l'hystériésis: 40 μs

## Discussion

### Défauts dynamiques de l'amplificateur opérationnel

**Slew Rate :**

- Lors de l'augmentation de la fréquence du signal d'entrée, le signal de sortie est devenu triangulaire.
- Slew Rate mesuré : 0.54 V/μs
- Comparaison avec la datasheet : Le Slew Rate mesuré est conforme aux spécifications du UA741.

**Bande passante :**

- Amplifications et bandes passantes mesurées :
    - A2 = 11, B2 = 75 kHz
    - A3 = 14, B3 = 17 kHz
    - A4 = 5.05, B4 = 9.1 kHz
- Produit gain-bande : M = A × B
    - MA2 = 825, MA3 = 799, MA4 = 919.1
- La relation entre l'amplification et la bande passante a été vérifiée, confirmant que le produit gain-bande est constant.

## Conclusion

Ce TP a permis de comprendre et d'expérimenter les différents modes de fonctionnement des amplificateurs opérationnels. Les montages amplificateurs inverseurs, non inverseurs et suiveurs ont été étudiés et leurs caractéristiques ont été vérifiées expérimentalement. Les défauts dynamiques des AOP, tels que le Slew Rate et la bande passante, ont été mis en évidence et analysés. Les résultats obtenus sont conformes aux attentes théoriques, confirmant ainsi les principes étudiés en cours.