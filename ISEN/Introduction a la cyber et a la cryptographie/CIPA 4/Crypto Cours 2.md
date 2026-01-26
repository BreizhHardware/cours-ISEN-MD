#DP #CIPA4 #Cryptographie

Vidéo AES: https://youtube.com/watch?v=evjFwDRTmV0

# Exercice 7 (LFSR)
## 1. Initialisation On considère un registre à 4 cellules ($0, 1, 2, 3$). 
Les coefficients de rétroaction sont donnés par le vecteur : $$(z_0, z_1, z_2, z_3) = (1, 1, 0, 0)$$

## Système d'équations
La mise à jour de l'état se fait selon le système suivant :
$$ \begin{cases} x_{0, t+1} &= x_{1, t} \\ x_{1, t+1} &= x_{2, t} \\ x_{2, t+1} &= x_{3, t} \\ x_{3, t+1} &= x_{0, t} \oplus x_{1, t} \oplus 0 \cdot x_{2, t} \oplus 0 \cdot x_{3, t} \end{cases} $$

## Représentation Matricielle
$$ \begin{bmatrix} x_{0, t+1} \\ \vdots \\ \vdots \\ x_{3, t+1} \end{bmatrix} = \begin{bmatrix} 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ 1 & 1 & 0 & 0 \end{bmatrix} \cdot \begin{bmatrix} x_{0, t} \\ \vdots \\ \vdots \\ x_{3, t} \end{bmatrix} $$
*(La dernière ligne de la matrice correspond aux coef. de rétroaction)*

## Exécution (Trace)
Calcul des états successifs ($t=0$ à $t=5$) avec l'état initial $1010$ :

| $t$ | $x_0$ | $x_1$ | $x_2$ | $x_3$ | Calcul de rétroaction ($1 \cdot x_0 \oplus 1 \cdot x_1 \dots$) | Résultat |
| :---: | :-: | :-: | :-: | :-: | :--- | :---: |
| **0** | 1 | 0 | 1 | 0 | $1 \cdot 1 \oplus 1 \cdot 0 \oplus 0 \cdot 1 \oplus 0 \cdot 0$ | **1** |
| **1** | 0 | 1 | 0 | 1 | $1 \cdot 0 \oplus 1 \cdot 1 \dots$ | **1** |
| **2** | 1 | 0 | 1 | 1 | $1 \cdot 1 \oplus 1 \cdot 0 \dots$ | **1** |
| **3** | 0 | 1 | 1 | 1 | $1 \cdot 0 \oplus 1 \cdot 1$ | **1** |
| **4** | 1 | 1 | 1 | 1 | $1 \cdot 1 \oplus 1 \cdot 1$ | **0** |
| **5** | 1 | 1 | 1 | 0 | ... | ... |

> [!INFO] Période
> La période d'un LFSR est bornée par :
> $$T \le 2^L - 1$$
> Ici avec $L=4$, $T \le 15$.

---

# AES : MixColumns et Arithmétique
## Combinaison non linéaire

On note $z_0$ le bit le plus à droite.
Combinaison non linéaire des $k_0 \dots k_{127}$ et $v_0 \dots v_{63}$ de degré $\ge 6$.

## 3. MixColumns
L'opération est une multiplication matricielle dans le corps de Galois :

$$ \begin{bmatrix} 02 & 03 & 01 & 01 \\ 01 & 02 & 03 & 01 \\ 01 & 01 & 02 & 03 \\ 03 & 01 & 01 & 02 \end{bmatrix} \times \begin{bmatrix} d4 \\ bf \\ 5d \\ 30 \end{bmatrix} $$

**Calcul pour la première ligne :**
$$02 \cdot d4 \oplus 03 \cdot bf \oplus 01 \cdot 5d \oplus 01 \cdot 30$$

### Arithmétique Polynomiale
Exemple de conversion Hexadécimal $\leftrightarrow$ Binaire $\leftrightarrow$ Polynôme.

**Exemple 1 : 57**
* Binaire : $0101\ 0111$
* Polynôme : $x^6 \oplus x^4 \oplus x^2 \oplus x \oplus 1$

**Exemple 2 : d4** 
* Binaire : $1101\ 0100$ 
* Polynôme : $x^7 \oplus x^6 \oplus x^4 \oplus x^2$

**Addition (XOR) :**
$$57 \oplus d4 = 1000\ 0011 = 83_{hex}$$
*(Correspond à $x^7 \oplus x \oplus 1$)*

**Multiplication :**
$$(x^6 \oplus x^4 \oplus x^2 \oplus x \oplus 1)(x^7 \oplus x^6 \oplus x^4 \oplus x^2)$$
Le résultat est un polynôme de degré $\le 14$. On effectue ensuite une réduction modulaire (division euclidienne) par le polynôme irréductible de l'AES ($x^8 + x^4 + x^3 + x + 1$).

---

# Exercice 20 : Ronde AES

## Données initiales
**State :**
$$ \begin{pmatrix} 42 & 09 & 3a & 8e \\ 28 & 6b & 0a & 6c \\ 03 & aa & 88 & bc \\ 4b & 27 & 11 & 60 \end{pmatrix} $$

**Round Key :**
$$ \begin{pmatrix} ac & 19 & 28 & 57 \\ 77 & fa & d1 & 5c \\ 66 & dc & 29 & 00 \\ f3 & 21 & 41 & 6e \end{pmatrix} $$

