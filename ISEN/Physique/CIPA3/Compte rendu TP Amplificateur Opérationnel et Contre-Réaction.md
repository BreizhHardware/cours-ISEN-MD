<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compte Rendu de TP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }
        .cover-container {
            text-align: center;
            background-color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        .cover-container h1 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin-bottom: 0.3rem;
        }
        .cover-container h2 {
            font-size: 1.2rem;
            color: #3498db;
            margin-top: 0;
        }
        .cover-container p {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 0.2rem 0;
        }
        .logo {
            width: 60px; /* Réduction de la largeur de l'image */
            height: auto; /* Ajustement automatique de la hauteur */
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="cover-container">
        <img src="https://isen-nantes.fr/wp-content/uploads/2023/11/ISEN-Nantes.png" alt="Logo" class="logo">
        <h1>COMPTE RENDU DE TP</h1>
        <h2>Amplificateurs Opérationnels</h2>
        <p>Étude des propriétés et des applications des amplificateurs opérationnels</p>
        <p>Présenté par : Matéo LE TOUZIC et Félix MARQUET</p>
        <p>Date : 20/06/2025</p>
    </div>
</body>
</html>
<div style="page-break-after: always;"></div>

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
<div style="page-break-after: always;"></div>

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
**Conclusion :**
Le montage amplificateur inverseur a été réalisé avec succès, confirmant les principes théoriques d'inversion et d'amplification du signal. L'amplification mesurée de $-10$ est conforme aux attentes théoriques, validant ainsi le bon fonctionnement du circuit et l'efficacité de l'AOP de type 741 utilisé. Ce montage a permis de se familiariser avec les montages de base à amplificateur opérationnel et de comprendre l'importance de la précision des composants dans la réalisation des circuits électroniques. Les résultats obtenus mettent en évidence la capacité à amplifier un signal d'entrée de manière précise.

### Montage Suiveur

<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
  <div style="flex: 1; padding-right: 10px;">
    <p><strong>Schéma :</strong> Le schéma du montage suiveur a été complété avec un AOP, en utilisant des résistances de <span class="math display">47 \text{ k}\Omega</span> et <span class="math display">10 \text{ k}\Omega</span>.</p>
  </div>
  <div style="flex: 1; text-align: right;">
    <img src="https://cdn.breizhhardware.fr/FAKA3/teGOtUma85.png/raw" alt="Schema du montage suiveur" style="max-width: 100%; height: auto;"/>
  </div>
</div>
<div style="page-break-after: always;"></div>

<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 1 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/wiCOZive28.png/raw" alt="Interrupteur en position 1" style="width: 100%; height: auto;"/>
      <img src="https://cdn.breizhhardware.fr/FAKA3/VuWAYELa11.png/raw" alt="Schema interrupteur en position 1" style="width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Interrupteur en position 2 :</strong></p>
      <img src="https://cdn.breizhhardware.fr/FAKA3/luVuPoHu92.png/raw" alt="Interrupteur en position 2" style="width: 100%; height: auto;"/>
      <img src="https://cdn.breizhhardware.fr/FAKA3/fOSIlaPO78.png/raw" alt="Schema interrupteur en position 2" style="width: 100%; height: auto;"/>
    </td>
  </tr>
</table>


**Protocole expérimental :**
1. Le signal d'entrée était sinusoïdal de fréquence $1 \text{kHz}$.
2. Le montage a été construit pour mettre en évidence la propriété de séparateur du montage suiveur.
3. Les rapports de transfert T1 et T2 ont été mesurés avec et sans l'interrupteur.



**Résultats :**

- $T1 = 0.065$ avec $s = 130 \text{ mV} et $e = 2 \text{ V}$
- $T2 = 0.18$ avec $s = 360 \text{ mV}$ et $e = 2 \text{ V}$
- Impédances théoriques : $Z_{\text{in}} = +\infty$ et $Z_{\text{out}} = 0$
<div style="page-break-after: always;"></div>

<table style="width: 100%; border-collapse: collapse;">
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
**Conclusion :**
Le montage suiveur a été réalisé avec succès, démontrant la propriété fondamentale de séparation du montage suiveur. Les rapports de transfert mesurés, $T1=0.065$ et $T2=0.18$, confirment le bon fonctionnement du circuit et l'efficacité de l'AOP utilisé. Ce montage a permis de comprendre l'importance de l'impédance d'entrée et de sortie dans les circuits électroniques, ainsi que l'utilité des montages suiveurs pour isoler les étages de circuits. Les résultats obtenus sont conformes aux attentes théoriques.

### Montage Amplificateur Non Inverseur
<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td colspan="2" style="border: none; text-align: left;">
      <p><strong>Schéma :</strong> Le schéma de l'amplificateur non inverseur a été établi avec une amplification de <span class="math display">11</span>.</p>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Photo du montage:</strong></p>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Schema du montage:</strong></p>
    </td>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/rIJeyiza82.jpg/raw" alt="Photo Amplificateur Non Inverseur" style="max-width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/LAtUQUKA77.png/raw" alt="Schéma Amplificateur Non Inverseur" style="max-width: 100%; height: auto;"/>
    </td>
  </tr>
</table>

**Calcul pour déterminer les valeur de resistances :**
- Rapport d'amplifica


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
**Conclusion :**
Le montage amplificateur non inverseur a été réalisé avec succès, confirmant les principes théoriques d'amplification du signal sans inversion. L'amplification mesurée de 11 est conforme aux attentes théoriques, validant ainsi le bon fonctionnement du circuit et l'efficacité de l'AOP utilisé. Ce montage a permis de comprendre l'importance de la configuration des résistances pour obtenir l'amplification souhaitée. Les résultats obtenus mettent en évidence la capacité à amplifier un signal d'entrée de manière précise.

### Montage à Boucle de Réaction Unique en Fonctionnement Non Linéaire
<table style="width: 100%; border-collapse: collapse;">
  <tr>
    <td colspan="2" style="border: none; text-align: left;">
      <p><strong>Schéma :</strong> Le schéma du montage comparateur à hystérésis a été établi avec des résistances de <span class="math display">4.7 \text{ k}\Omega</span> et <span class="math display">47 \text{ k}\Omega</span>.</p>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Photo du montage:</strong></p>
    </td>
    <td style="border: none; vertical-align: top; width: 50%;">
      <p><strong>Schéma du montage:</strong></p>
    </td>
  </tr>
  <tr>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/xifexUta46.jpg/raw" alt="Photo Comparateur à Hystérésis" style="max-width: 100%; height: auto;"/>
    </td>
    <td style="border: none; vertical-align: top;">
      <img src="https://cdn.breizhhardware.fr/FAKA3/tAluBOra36.png/raw" alt="Schema Comparateur à Hystérésis" style="max-width: 100%; height: auto;"/>
    </td>
  </tr>
</table>


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
**Conclusion :**
Le montage comparateur à hystérésis a été réalisé avec succès, démontrant les principes théoriques des circuits à boucle de réaction unique en fonctionnement non linéaire. Les seuils de basculement mesurés à $1 V$ et $−1 V$ confirment le bon fonctionnement du circuit et l'efficacité des résistances choisies pour créer l'hystérésis souhaitée. Ce montage a permis de comprendre l'importance des composants dans la détermination des caractéristiques de transfert des circuits non linéaires. Les résultats obtenus sont conformes aux attentes théoriques.

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
<div style="page-break-after: always;"></div>

## Conclusion

Ce TP a permis de comprendre et d'expérimenter les différents modes de fonctionnement des amplificateurs opérationnels. Les montages amplificateurs inverseurs, non inverseurs et suiveurs ont été étudiés et leurs caractéristiques ont été vérifiées expérimentalement. Les défauts dynamiques des AOP, tels que le Slew Rate et la bande passante, ont été mis en évidence et analysés. Les résultats obtenus sont conformes aux attentes théoriques, confirmant ainsi les principes étudiés en cours. Ce travail a également permis de développer des compétences en matière de rédaction de documents scientifiques et techniques.