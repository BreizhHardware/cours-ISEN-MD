# 1. **Espaces de Hilbert**

Un **espace de Hilbert** est un espace vectoriel normé complet muni d'un produit scalaire.

## Définitions

- **Produit scalaire** :
  $$
 \langle u, v \rangle = \sum_{i=1}^n u_i \overline{v_i} \quad \text{(ou une intégrale si l'espace est infini-dimensionnel)}.
$$
- **Norme induite** :
  $$
  `\|u\| = \sqrt{\langle u, u \rangle}.`
  $$
## Propriétés
1. **Orthogonalité** : Deux vecteurs uuu et vvv sont orthogonaux si :
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
# 2. **Décomposition en Séries de Fourier**
## Définition
Une fonction périodique $f(x)$ de période $2π$ peut être décomposée en une série de Fourier :
$$
f(x) = a_0 + \sum_{n=1}^\infty \left[a_n \cos(nx) + b_n \sin(nx)\right].
$$
## Coefficients de Fourier
- $a_0$ :
  $$a_0 = \frac{1}{2\pi} \int_{-\pi}^\pi f(x) \, dx$$
- $a_n$ :
  $$a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos(nx) \, dx$$
- $b_n$ :
  $$b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin(nx) \, dx$$
## Propriétés
- **Convergence** : La série converge en moyenne quadratique dans $