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

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td colspan="2" style="border: none; text-align: left;">
      <p><strong>Schéma :</strong> Le schéma de l'amplificateur inverseur a été établi avec un AOP de type 741. Les résistances utilisées étaient de <span class="math display">1 \text{ k}\Omega</span> et <span class="math display">10 \text{ k}\Omega</span> pour obtenir une amplification de -10.</p>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Schéma du montage:</strong></p>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Photo du montage:</strong></p>
    </td>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/kAJumUya82.png/raw" alt="Interrupteur en position 1" style="max-width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/TOlutuJa85.jpg/raw" alt="Schéma Amplificateur Inverseur" style="max-width: 100%; height: auto;"/>
    </td>
  </tr>
</table>

**Protocole expérimental :**
1. Un signal d'entrée sinusoïdal de fréquence $1 \text{kHz}$ a été appliqué.
2. Le montage a été construit sur une plaquette d'essai.
3. Les caractéristiques du montage ont été vérifiées expérimentalement.

**Résultats :**
<div style="display: flex; align-items: center; justify-content: space-between;">
  <div style="flex: 1; padding-right: 10px;">
    <ul>
      <li>Amplification mesurée : -10</li>
      <li>Source d'énergie : L'alimentation de l'AOP permet d'amplifier le signal d'entrée.</li>
    </ul>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/pidAtUzo21.jpg/raw" alt="Description de l'image" style="max-width: 100%; height: auto;"/>
  </div>
</div>

### Montage Suiveur

<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Schéma :</strong> Le schéma du montage suiveur a été complété avec un AOP, en utilisant des résistances de <span class="math display">47 \text{ k}\Omega</span> et <span class="math display">10 \text{ k}\Omega</span>.</p>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/teGOtUma85.png/raw" alt="Schema du montage suiveur" style="max-width: 100%; height: auto;"/>
  </div>
</div>

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 1 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/puqigATi14.jpg/raw" alt="Interrupteur en position 1" style="width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 2 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/bujARIjU59.jpg/raw" alt="Interrupteur en position 2" style="width: 100%; height: auto;"/>
    </td>
  </tr>
</table>


**Protocole expérimental :**
1. Le signal d'entrée était sinusoïdal de fréquence $1 \text{kHz}$.
2. Le montage a été construit pour mettre en évidence la propriété de séparateur du montage suiveur.
3. Les rapports de transfert T1 et T2 ont été mesurés avec et sans l'interrupteur.

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td colspan="2" style="border: none; text-align: left;">
      <p><strong>Résultats :</strong></p>
      <ul>
        <li><span class="math display">T1 = 0.065</span> avec <span class="math display">s = 130 \text{ mV}</span> et <span class="math display">e = 2 \text{ V}</span></li>
        <li><span class="math display">T2 = 0.18</span> avec <span class="math display">s = 360 \text{ mV}</span> et <span class="math display">e = 2 \text{ V}</span></li>
        <li>Impédances théoriques : <span class="math display">Z_{\text{in}} = +\infty</span> et <span class="math display">Z_{\text{out}} = 0</span></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 1 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/pAWICaPe51.jpg/raw" alt="Interrupteur en position 1" style="max-width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 2 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/zOBazEte74.jpg/raw" alt="Interrupteur en position 2" style="max-width: 100%; height: auto;"/>
    </td>
  </tr>
</table>

### Montage Amplificateur Non Inverseur

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Schéma :</strong> Le schéma de l'amplificateur non inverseur a été établi avec une amplification de <span class="math display">11</span>.</p>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/rIJeyiza82.jpg/raw" alt="Schéma Amplificateur Non Inverseur" style="max-width: 100%; height: auto;"/>
  </div>
</div>

**Protocole expérimental :**
1. Un signal d'entrée sinusoïdal de fréquence $1 \text{kHz}$ a été appliqué.
2. Le montage a été construit et l'amplification a été mesurée.    

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Résultats :</strong></p>
    <ul>
      <li>Amplification mesurée : <span class="math display">11</span></li>
      <li><span class="math display">e = 1.98 \text{ V}</span>, <span class="math display">s = 21.8 \text{ V}</span>, <span class="math display">s/e = 11</span></li>
    </ul>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/SowAgOZe91.jpg/raw" alt="Résultats Amplificateur" style="max-width: 100%; height: auto;"/>
  </div>
</div>

### Montage à Boucle de Réaction Unique en Fonctionnement Non Linéaire

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Schéma :</strong> Le schéma du montage comparateur à hystérésis a été établi avec des résistances de <span class="math display">4.7 \text{ k}\Omega</span> et <span class="math display">47 \text{ k}\Omega</span>.</p>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/xifexUta46.jpg/raw" alt="Schéma Comparateur à Hystérésis" style="max-width: 100%; height: auto;"/>
  </div>
</div>


**Protocole expérimental :**
1. Un signal d'entrée triangulaire de fréquence 100 Hz a été appliqué avec une amplitude crête à crête de 4 V.
2. Le montage a été construit et les seuils de basculement ont été mesurés.

<div style="display: flex; justify-content: space-between;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Résultats :</strong></p>
    <ul>
      <li>Seuils de basculement : <span class="math display">1 \text{ V}</span> et <span class="math display">-1 \text{ V}</span></li>
	<li>Largeur de l'hystérésis : <span class="math display">40 \text{ μs}</span></li>
    </ul>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/gASaqozo03.jpg/raw" alt="Image 1" style="max-width: 100%; height: auto; margin-bottom: 10px;"/>
    <img src="https://cdn.breizhhardware.fr/FAKA3/GEjUPAce04.jpg/raw" alt="Image 2" style="max-width: 100%; height: auto;"/>
  </div>
</div>


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