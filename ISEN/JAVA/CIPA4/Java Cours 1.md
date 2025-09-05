#CIPA4 #Java

# Introduction
Java language orienté objet

V1 en 1996
Une version tout les 6 mois depuis Java 9

## Caractéristiques de java
- Typage fort
- Tout est objet
- Toute erreur aboutit à une levée d'exception
- Gestion automatique de la mémoire

## Les fichiers
- Programme composé uniquement de classes
- Fichier .java
- La classe MaClasse doit être dans le fichier MaClasse.java

## Point d'entrée du programme
- La classe main class avec la méthode `main()` dont le proto est 
```JAVA
public static void main (String[] args)
```
## Convention de nommage
- CamelCase, les variables commences par des miniscule nomDeVariable et les classes par des majuscule NomDeClasse
- **Attention les constant sont déclaré comme ceci:** NOM_DE_CONSTANTE
## Hello World
Dans le fichier HelloWorld.java
```JAVA
public class HelloWorld {
	public static void main(String[] args)
	{
		System.out.println("Hello World!\n");
	}
}
```

Pour le compiler on utilise la cli:
```Bash
javac HelloWorld.java
```

On obtient HelloWorld.class, pour l'exécuter:
```Bash
java HelloWolrd
```
Même pas besoin du .class

# Bases
## Les types de données
- Il existe de type de données en Java
	- Les type primitifs
	- Les objets
 - En Java, on ne manipule que des références sur les objets

## Initialisation des variables
- Les variables sont automatiquement initialisées à :
	- `0 / false` pour les types primitifs
	- `null` pour les objets
- **MAIS : Il n’est pas possible d’utiliser une variable sans l’avoir explicitement initialisée (vérifié à la compilation)**

## Vérification des types
- La vérification des types est très stricte en Java
- A part quelques rares exceptions (autoboxing, toString (), …) il n’y a pas de conversion implicite en Java
![](Pasted%20image%2020250905143950.png)
- Les nombres à virgule écrits « en dur » sont implicitement des double. Il faudra les caster explicitement lors de l’initialisation d’un float
![](Pasted%20image%2020250905144006.png)

## Types primitifs
- Ce sont les seuls types qui ne sont pas des objets en Java 
- On retrouve les types de C/C++ : 
	- boolean 
	- char 
	- byte 
	- short, int , long 
	- float , double

## Classes enveloppantes
- A chaque type primitif est associé une classe
![](Pasted%20image%2020250905144313.png)
- A chaque type primitif est associé une classe
- Ces classes, appelées classes enveloppantes (wrapper classes), encapsulent des types primitifs associés
- Comme toute fonction doit être une méthode de classe, les fonctions utilitaires permettant de manipuler chaque type se trouvent dans les classes correspondantes

## Chaînes de caractères
- En Java, les chaînes de caractères sont modélisées par la classe String
- La méthode length renvoie la longueur de la chaîne 
- L’opérateur + permet de concaténer des chaînes, et d’y inclure les valeurs de types primitifs (conversion implicite)
- Les méthodes de la classe String permettent d’effectuer quelques opérations courantes sur les chaînes
![](Pasted%20image%2020250905144746.png)
- Toute tentative de modification sur une chaîne crée une nouvelle chaîne car les chaîne sont immuables
- **Comme en C, l’opérateur == compare l’adresse des chaînes en mémoire, et non leur contenu**
- Pour tester si deux chaînes sont égales, il faut utiliser la méthode `equals()`

## Conversion
- Pour convertir un nombre en chaîne, utiliser la méthode `toString()`. des classes enveloppantes
- Pour convertir une chaîne en nombre, utiliser la méthode `parseXXX()` des classes enveloppantes

## Tableaux
- En Java, les tableaux sont des objets : ils sont donc manipulés par référence 
- Un tableau possède un attribut `length` qui contient sa taille 
- Initialisation d’un tableau vide
```java
type[] array = new type[taille];
```
- Java possède une boucle de type « for each » qui évite d’explicitement manipuler des indices
```java
int[] array = {1,2,3,4}; 
for(int value : array){
	System.out.println(value);
}
```
### Tableaux multidimensions
- Initialisation d’un tableau vide à N dimensions
```java
type[]…[][] array = new type[dim1][dim2]…[dimN]
```

