#Java #CIPA4 

# 6 - Concept de cercle`
## Test de la méthode print()
On va obtenir un affichage via la méthode print de Shape par héritage.

## Surcharge de la méthode d’affichage
On peut rentre l'attribut center accessible à la classe Circle en le définissant protected au lieu de private.

## Transtypage ascendant (upcast)
De par le principe d'upcast on va obtenir la méthode print de Circle et non pas de Shape.

# 11 - Un peu de style
## Prise en compte du style dans le dessin
On peut utiliser une fonction `applyStyle(Paint paint)` dans Shape qui est appelée dans les fonctions `draw()`.

# 12 – Déplacement d’un objet
On obtient une erreur car aucune fonction `moveTo(int x, int y)` n'est implémenté dans `Point`.