```table-of-contents
title: Fiche de révision DS1 de maths
```
<div style="page-break-after: always;"></div>

# 1. Rappel primitive et dérivé

|  Fonction $f(x)$  | Dérivée $f'(x)$ |   Primitive $F(x)$    |
| :---------------: | :-------------: | :-------------------: |
| $x^n (n \neq -1)$ |   $nx^{n-1}$    | $\frac{x^{n+1}}{n+1}$ |
|     $x^{-1}$      |    $-x^{-2}$    |      $\ln\|x\|$       |
|     $\ln(x)$      |  $\frac{1}{x}$  |    $x \ln(x) - x$     |
|                   |                 |                       |
|                   |                 |                       |
|                   |                 |                       |
|                   |                 |                       |

# 2. **Espaces de Hilbert**

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
# 3. **Décomposition en Séries de Fourier**
## Définition
Une fonction périodique $f(x)$ de période $2π$ peut être décomposée en une série de Fourier :
$$
f(x) = a_0 + \sum_{n=1}^\infty \left[a_n \cos(nx) + b_n \sin(nx)\right].
$$
<div style="page-break-after: always;"></div>

## Coefficients de Fourier
- $a_0$ :
  $$a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) \, dx$$
- $a_n$ :
  $$a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) \, dx$$
- $b_n$ :
  $$b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) \, dx$$
## Propriétés
- **Convergence** : La série converge en moyenne quadratique dans $L^2([-\pi, \pi])$. (Pas vu en cours mais je le note la quand même au cas ou)
- **Parseval** :
  $$\frac{1}{2\pi} \int_{-\pi}^\pi |f(x)|^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty \frac{a_n^2 + b_n^2}{2}$$
# 4. **Convolution**
## Définition
La convolution de deux fonctions $f$ et $g$ est définie par :
$$(f * g)(t) = \int_{-\infty}^\infty f(\tau) g(t - \tau) \, d\tau$$
## Propriétés
1. **Commutativité** : $$f * g = g * f$$
2. **Associativité** :
$$f * (g * h) = (f * g) * h$$
<div style="page-break-after: always;"></div>

3. **Distributivité** :
$$f * (g + h) = (f * g) + (f * h)$$
4. **Lien avec la transformée de Fourier** :
$$\mathcal{F}(f * g) = \mathcal{F}(f) \cdot \mathcal{F}(g)$$
# 4. **Distribution de Dirac**
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


---
&copy; Félix MARQUET