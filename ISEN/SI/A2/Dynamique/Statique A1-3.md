#SI #Dynamique 

# Les actions mécaniques
Une action mécanique décrit un phénomène qui
- Provoque un mouvement ou une modification de vitesse ou de trajectoire
- Maintien un corps en équilibre
- Déforme un corps
On appelle en général « une force » la cause qui entraîne un déplacement ou la déformation d’un solide. On verra que la force ne permet pas de décrire entièrement le phénomène. Le mécanicien préfère utiliser le terme d’action mécanique.

# Force et moment
Pour définir une action mécanique, nous avons besoin du concept de force. Une force est représentée par un vecteur lié.

## Exemple
### Exemple 1: le sportif
#### Le cas facile:
Dans cet exemple, le sportif qui souhaite maintenir les haltères à l’équilibre doit compenser le poids des haltères par une force (on reste dans le cadre de la statique, pas de mouvement) :
- En appliquant une force égale en magnitude mais opposée en direction au poids des haltères.
- En s'assurant que la somme des forces horizontales est nulle pour éviter tout mouvement horizontal.
- En veillant à ce que la somme des moments autour de tout point soit nulle pour éviter tout mouvement de rotation.

#### Le cas difficile:
Dans ce deuxième exemple, un haltère est retiré. Le poids à compenser est divisé par deux. Pourtant, le sportif est en difficulté : il doit à la fois compenser le poids de l’altère et retenir le basculement de l’haltère.
Ici, on voit bien que la notion de force ne suffit pas à représenter l’effet d’une action mécanique sur un corps. Il nous faut autre chose pour expliquer la tendance à faire tourner le poignet du sportif : c’est le moment.
Le poids de l’haltère génère un moment au niveau du poignet du sportif. S’il veut maintenir l’ensemble statique, il doit compenser le poids de l’haltère comme avant, mais il doit de plus produire un moment :
 - En appliquant une force perpendiculaire au bras à une certaine distance du poignet pour contrer le moment généré par le poids de l'haltère.
 - En ajustant la direction de cette force pour s'opposer au moment de rotation.
 - En veillant à ce que la somme des moments soit nulle pour éviter le basculement.
 
On remarque que le moment dépend de la force et du point auquel on calcule le moment.

#### Retour sur le cas facile:
Mais revenons sur le premier cas : les haltères ne produisent-ils pas de moment au niveau du poignet ? Si bien-sûr ! Mais puisque les deux haltères produisent le même moment, mais opposés, ces deux moments s’annulent mutuellement. Le sportif n’a pas besoin de le faire. Facile.

## Calcul du moment d'une force

Dans les deux exemples précédents, on peut "sentir" que le moment d’une force dépend de deux choses :

- La magnitude de la force appliquée.
- La distance entre le point d'application de la force et le point autour duquel le moment est calculé.

On calcul le moment d'une force $\vec {F}$  en un point ${A}$ avec la formule suivante: 
$\vec{M_A} = \vec{r} \times \vec{F}$
Avec $\vec {r}$  le vecteur position qui va du point ${A}$ au point d'application de la force et $\vec {F}$ le vecteur force avec le symbole $\times$ qui signifie le produit vectoriel.

# Principe fondamental de la statique
Le principe fondamental de la statique (PFS) est fondamental dans la résolution de problèmes de statique. Il s’applique à un solide ou un ensemble de solides dans
un mécanisme. Ce solide est soumis à un ensemble de forces.
![[Pasted image 20240130111505.png]]
On peut alors énoncer le Principe Fondamental de la Statique (PFS) de la manière suivante : 
Un solide ${S}$ est à l'équilibre (statique ou à vitesse constante) si et seulement si les résultantes des forces et des moments qui lui sont appliquées sont nulles :
- La somme vectorielle des forces appliquées au solide est nulle ($\sum \vec{F} = \vec{0}$)
- La somme des moments autour de tout point est nulle ($\sum \vec{M} = \vec{0}$)

<u><strong>Attention : pour faire cette somme des moments, il faut qu’ils soient tous exprimés au même point.</strong></u>


Le PFS est un ensemble de deux égalités vectorielles que l’on peut écrire sous la forme d’un système de 6 équations scalaires :

| Résultante     | $\sum\limits_{i=1}^n \overrightarrow{F_{\overline{\Sigma} \to i}}. \vec{x}=0$     | $\sum\limits_{i=1}^n \overrightarrow{F_{\overline{\Sigma} \to i}}. \vec{y}=0$     | $\sum\limits_{i=1}^n \overrightarrow{F_{\overline{\Sigma} \to i}}. \vec{z}=0$     |
|:-----|:-----|:-----|:-----|
| **Moment**     | $\sum\limits_{i=1}^n \overrightarrow{M_{A, \overline{\Sigma} \to i}}. \vec {x}=0$     | $\sum\limits_{i=1}^n \overrightarrow{M_{A, \overline{\Sigma} \to i}}. \vec {y}=0$     | $\sum\limits_{i=1}^n \overrightarrow{M_{A, \overline{\Sigma} \to i}}. \vec {z}=0$     |
Notons que dans le cas de problèmes plans (2D), le PFS se traduit par un système de 3 équations scalaires seulement.
Dans la suite, on cherchera à résoudre ce système d’équations. Bien entendu, on ne peut résoudre ce système qu’à la condition que le nombre d’inconnues soit inférieur ou égal à 6 (ou 3 en 2D).

# Le PFS en pratique

Méthodologie
1. Isoler le solide (ou l'ensemble des solides)
2. Établir le bilan des actions mécanique extérieur qui s'applique au solide
3. Si le nombre d’inconnues est inférieur ou égal à 6, on peut résoudre, (dans le cas de la statique plane, 3 inconnues max)
4. Ecrire le PFS sous forme d'équation vectorielle
5. Projeter ces équations sur les axes du repère pour obtenir nos 6 (ou 3) équations scalaire
6. Résoudre le système d'équation
