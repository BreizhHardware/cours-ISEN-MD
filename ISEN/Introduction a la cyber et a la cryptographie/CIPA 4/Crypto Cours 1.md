#DP #CIPA4 #Cryptographie
## Arithmétique dans $\mathbb{Z}/2\mathbb{Z}$ Définition de l'ensemble : 
$$\mathbb{Z}/2\mathbb{Z} = \{0, 1\}$$
### Tables d'opérations Voici les tables d'addition ($\oplus$) et de multiplication ($\times$) dans cet ensemble :

| $\oplus$ |  0  |  1  |
| :------: | :-: | :-: |
|  **0**   |  0  |  1  |
|  **1**   |  1  |  0  |

| $\times$ |  0  |  1  |
| :------: | :-: | :-: |
|  **0**   |  0  |  0  |
|  **1**   |  0  |  1  |

### Propriétés des puissances Dans $\mathbb{Z}/2\mathbb{Z}$, les puissances se comportent ainsi : 
$$ \begin{aligned} x^2 &= x \\ x^3 &= x \\ x^k &= x \end{aligned} $$
---

## Chiffrement Classique 
### 1. César 
Le chiffrement de César est un décalage fixe. 
* **Formule :** $$\text{chiffré} = \text{clair} + 3 \pmod{26}$$
### 2. Vigenère 
* ***Note :** La table de Vigenère équivaut ($\leftrightarrow$) à une table d'addition modulo 26. 
* **Formule :** $$\text{chiffré} = \text{clair} + \text{séq chif} \pmod{26}$$ *(Note : "séq chif" correspond à la **séquence chiffrante**)*