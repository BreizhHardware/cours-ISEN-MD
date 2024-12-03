
```table-of-contents
title: Fiche de révision DS1 de maths
```
<div style="page-break-after: always;"></div>

# 1. Rappel primitive et dérivé

|  Fonction $f(x)$  |            Dérivée $f'(x)$            |    Primitive $F(x)$    |
| :---------------: | :-----------------------------------: | :--------------------: |
| $x^n (n \neq -1)$ |              $nx^{n-1}$               | $\frac{x^{n+1}}{n+1}$  |
|     $x^{-1}$      |               $-x^{-2}$               |       $\ln\|x\|$       |
|     $\ln(x)$      |             $\frac{1}{x}$             |     $x \ln(x) - x$     |
|       $e^x$       |                 $e^x$                 |         $e^x$          |
|       $a^x$       |             $a^x \ln(a)$              |  $\frac{a^x}{\ln(a)}$  |
|     $\sin(x)$     |               $\cos(x)$               |       $-\cos(x)$       |
|    $\sin(ax)$     |              $a\cos(x)$               | $-\frac{1}{a}\cos(ax)$ |
|     $\cos(x)$     |              $-\sin(x)$               |       $\sin(x)$        |
|    $\cos(ax)$     |              $-a\sin(x)$              | $\frac{1}{a}\sin(ax)$  |
|     $\tan(x)$     | $1 + \tan^2(x) = \frac{1}{\cos^2(x)}$ |                        |

# 2. Identités trigonométrique: 

|      $\cos(a+b) = \cos(a)\cos(b) - \sin(a)\sin(b)$       |
| :------------------------------------------------------: |
|      $\sin(a+b) = \sin(a)\cos(b) + \sin(b)\cos(a)$       |
|      $\cos(a-b) = \cos(a)\cos(b) + \sin(a)\sin(b)$       |
|      $\sin(a-b) = \sin(a)\cos(b) - \sin(b)\cos(a)$       |
| $\cos(a)\sin(b) = \frac{1}{2} [\sin(a+b) + \sin(a - b)]$ |
|  $\cos(a)\cos(b) = \frac{1}{2}[\cos(a+b) + \cos(a-b)]$   |
|   $\sin(a)\sin(b) = \frac{1}{2}[\cos(a-b)-\cos(a+b)]$    |

# 3. Rappel mathématique

## IPP

$\int u \, v' \, dx = u v - \int u' \, v \, dx$
## Fréquence
$\omega = {2\pi}*F$ ou $\omega = \frac{2\pi}{T}$
$F = \frac{{1}}{T}$

## Partité d'une fonction
Une fonction est paire si $f(-x) = f(x)$
Une fonction est impaire si $f(-x) = -f(x)$
Une fonction peut ne pas avoir de parité.


# 4. **Espaces de Hilbert**

Un **espace de Hilbert** est un espace vectoriel normé complet muni d'un produit scalaire.

## Définitions

- **Produit scalaire** :
  $$
 \langle u, v \rangle = \sum_{i=1}^n u_i \overline{v_i} \quad \text{(ou une intégrale si l'espace est infini-dimensionnel)}.
$$
- **Norme induite** :
  $$
  \|u\| = \sqrt{\langle u, u \rangle}
  $$
## Propriétés
1. **Orthogonalité** : Deux vecteurs $u$ et $v$ sont orthogonaux si :
$$
\langle u, v \rangle = 0
$$

2. **Inégalité de Cauchy-Schwarz** :
$$
|\langle u, v \rangle| \leq \|u\| \|v\|.
$$
3. **Théorème de projection orthogonale** :  
   Si $H$ est un sous-espace fermé, tout vecteur $x$ se décompose en :
   $$
   x = x_H + x_H^\perp, \quad x_H \in H, \, x_H^\perp \in H^\perp.
$$
<div style="page-break-after: always;"></div>

# 5. **Décomposition en Séries de Fourier**
## Définition
Une fonction périodique $f(x)$ de période $2π$ peut être décomposée en une série de Fourier :
$$
f(x) = a_0 + \sum_{n=1}^\infty \left[a_n \cos(nx) + b_n \sin(nx)\right].
$$


## Coefficients de Fourier
- $a_0$ : (tous le temps)
  $$a_0 = \frac{1}{T} \int_{d}^{d+T} f(x) \, dx$$

- $a_n$ : (si paire)
  $$a_n = \frac{2}{T} \int_{d}^{d+T} f(x) \cos(nx) \, dx$$
- $b_n$ : (si impaire)
  $$b_n = \frac{2}{T} \int_{d}^{d+T} f(x) \sin(nx) \, dx$$

## Propriétés
- **Convergence** : La série converge en moyenne quadratique dans $L^2([-\pi, \pi])$. (Pas vu en cours mais je le note la quand même au cas ou)
- **Parseval** :
  $$\frac{1}{2\pi} \int_{-\pi}^\pi |f(x)|^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty \frac{a_n^2 + b_n^2}{2}$$
<div style="page-break-after: always;"></div>

# 6. **Convolution**
## Définition
La convolution de deux fonctions $f$ et $g$ est définie par :
$$(f * g)(t) = \int_{-\infty}^\infty f(\tau) g(t - \tau) \, d\tau$$
## Propriétés
1. **Commutativité** : $$f * g = g * f$$
2. **Associativité** :
$$f * (g * h) = (f * g) * h$$

3. **Distributivité** :
$$f * (g + h) = (f * g) + (f * h)$$
4. **Lien avec la transformée de Fourier** :
$$\mathcal{F}(f * g) = \mathcal{F}(f) \cdot \mathcal{F}(g)$$
## Exemple: Convolution de deux fonctions exponentielles

Soient $\alpha$ et $beta$ deux nombres réels. Nous cherchons à démontrer l'existence et à calculer le produit de convolution :  
$$
\left(e^{\alpha x} \mathbf{1}_{[0,+\infty[}(x)\right) \ast \left(e^{\beta x} \mathbf{1}_{[0,+\infty[}(x)\right).
$$

### Correction

Remarquons d'abord que l'existence du produit de convolution de ces deux fonctions ne résulte pas immédiatement des théorèmes du cours.

- Si $alpha > 0$ et $beta > 0$, alors les deux fonctions ne sont dans aucun $L^p$ pour $p \geq 1$.
- Elles appartiennent à $L^1_{\text{loc}}$, mais aucune des deux n'a de support compact.

Ainsi, pour démontrer l'existence du produit de convolution, il faut montrer que, pour tout $x \in \mathbb{R}$, la fonction
$$
y \mapsto e^{\alpha (x-y)} \mathbf{1}_{[0,+\infty[}(x-y) e^{\beta y} \mathbf{1}_{[0,+\infty[}(y)
$$
est intégrable.

Comme cette fonction est positive, il suffit de faire le calcul sans les valeurs absolues.

On a alors :
$$ f \ast g(x) = \int_{\mathbb{R}} e^{\alpha (x-y)} \mathbf{1}_{[0,+\infty[}(x-y) e^{\beta y} \mathbf{1}_{[0,+\infty[}(y) \, dy. $$

Substituons les fonctions indicatrices :
$$ f \ast g(x) = e^{\alpha x} \int_{0}^{+\infty} e^{-\alpha y} \mathbf{1}_{[0,+\infty[}(x-y) e^{\beta y} \, dy. $$

Or, $x-y \in [0, +\infty[ \iff x \geq y$. Il en résulte que :
- Si $x \leq 0$, alors $f \ast g(x) = 0$. - Si $x \geq 0$, alors : 
 $$ f \ast g(x) = e^{\alpha x} \int_{0}^{x} e^{(\beta - \alpha) y} \, dy 
$$
Pour terminer, on a :
- Si $\beta \neq \alpha$, alors : $$ f \ast g(x) = \frac{1}{\beta - \alpha} \left( e^{\beta x} - e^{\alpha x} \right). $$ - Si $\beta = \alpha$, alors : $$ f \ast g(x) = x e^{\alpha x}. $$
Ce qui donne le produit de convolution:
$$ 
f \ast g(x) = \begin{cases} 0 & \text{si } x \leq 0, \\ \frac{1}{\beta - \alpha} \left( e^{\beta x} - e^{\alpha x} \right) & \text{si } x > 0 \text{ et } \beta \neq \alpha, \\ x e^{\alpha x} & \text{si } x > 0 \text{ et } \beta = \alpha. \end{cases} 
$$

# 7. **Distribution de Dirac**
## Définition
La distribution de Dirac $\delta(x)$ est définie par :
$$\int_{-\infty}^\infty \delta(x) f(x) \, dx = f(0)$$
pour toute fonction $f$ continue au voisinage de 0.
## Propriétés
1. **Support ponctuel** :
$$\delta(x) = 0 \quad \text{pour } x \neq 0$$

2. **Translation** :
$$\delta(x - a) \quad \text{est centrée en } x = a$$
3. **Propriété de filtrage** :
$$\int_{-\infty}^\infty \delta(x - a) f(x) \, dx = f(a)$$
4. **Lien avec la transformée de Fourier** :
$$\mathcal{F}(\delta(x)) = 1$$
# 8. Distribution de 2 variables
## Définition
Une **distribution de deux variables** est une généralisation des fonctions classiques permettant de modéliser des phénomènes singuliers ou localisés, comme les impulsions ou les discontinuités. Elle agit sur des fonctions tests $\phi(x, y)$ lisses et à support compact par une intégrale généralisée.

## Gradient d'une fonction à 2 variables
$$\nabla f(x, y) = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix}$$

## Dérivée partielle selon x
$$
\frac{\partial f}{\partial x} = \lim_{\Delta x \to 0} \frac{f(x+\Delta x, y) - f(x, y)}{\Delta x}
$$
## Dérivée partielle selon y
$$\frac{\partial f}{\partial y} = \lim_{\Delta y \to 0} \frac{f(x, y+\Delta y) - f(x, y)}{\Delta y}$$
## Rotationnel en 2D
$$\nabla \times f = \frac{\partial f_y}{\partial x} - \frac{\partial f_x}{\partial y}$$
## Théorème de Schwarz
$$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}, \quad \text{si } f_{xy} \text{ et } f_{yx} \text{ sont continues.}$$

## Recherche de point critique
On pose $\nabla f(x, y) = 0$
Puis une fois que x est exprimé par rapport a y on cherche les points évidents.
Ensuite une exprime la matrice hessienne pour les points critiques.
Si le déterminant $\Delta$ > 0 est défini positive.
	Si $\frac{\partial^2 f}{\partial x^2} > 0$, alors le point critique est un **minimum local**.
	Si $\frac{\partial^2 f}{\partial x^2} < 0$, alors le point critique est un **maximum local**.
Si $\Delta$ < 0 le point critique est un **point de selle**.
Si $\Delta$ = 0 le test est **indéterminé**, et il faut utiliser d'autres méthodes pour conclure.
# 9. Matrice hessienne
## Définition
La matrice hessienne d'une fonction $f: R^n \to R$ est une matrice carrée composée des dérivées partielles secondes de $f$. Si $f(x_{1}, x_{2}, x_{3},\dots, x_{n})$ est deux fois continûment différentiable, alors :
$$
H_f(x) = \begin{bmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{bmatrix}
$$

## Propriétés
1. La matrice hessienne est **symétrique** si $f$ est de classe $C^2$
$\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}.$
2. La hessienne permet de déterminer la **convexité** ou la **concavité** de $f$ :
	- Si $H_{f}(x)$ (x) est définie positive ($∀v, v^TH_{f}(x)v>0$) alors $f$ est **strictement convexe**.
	- Si $H_{f}(x)$ (x) est définie négative ($∀v, v^TH_{f}(x)v<0$) alors $f$ est **strictement concave**.
## Exemple: f(x, y) = x^2 + xy + y^2 
## Calcul des dérivées partielles
1. Les dérivées partielles premières :
$\frac{\partial f}{\partial x} = 2x + y, \quad \frac{\partial f}{\partial y} = x + 2y.$
2. Les dérivées partielles secondes :
$\frac{\partial^2 f}{\partial x^2} = 2, \quad \frac{\partial^2 f}{\partial y^2} = 2, \quad \frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x} = 1$
## Matrice hessienne
$$
H_f(x, y) = 
\begin{bmatrix}
2 & 1 \\
1 & 2
\end{bmatrix}
$$


## Analyse
La matrice hessienne $H_{f}(x, y)$ est définie positive (ses valeurs propres sont toutes positives). Cela signifie que la fonction $f(x,y) = x^2 +xy + y^2$ est strictement convexe.

---
&copy; Félix MARQUET