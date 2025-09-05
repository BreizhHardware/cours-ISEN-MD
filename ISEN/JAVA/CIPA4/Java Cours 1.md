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
![](https://cdn.breizhhardware.fr/FAKA3/XAwIJoNA16.png/raw)
- Les nombres à virgule écrits « en dur » sont implicitement des double. Il faudra les caster explicitement lors de l’initialisation d’un float
![](https://cdn.breizhhardware.fr/FAKA3/cUToloJA43.png/raw)

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
![](https://cdn.breizhhardware.fr/FAKA3/CoZIvIJE65.png/raw)
- A chaque type primitif est associé une classe
- Ces classes, appelées classes enveloppantes (wrapper classes), encapsulent des types primitifs associés
- Comme toute fonction doit être une méthode de classe, les fonctions utilitaires permettant de manipuler chaque type se trouvent dans les classes correspondantes

## Chaînes de caractères
- En Java, les chaînes de caractères sont modélisées par la classe String
- La méthode length renvoie la longueur de la chaîne 
- L’opérateur + permet de concaténer des chaînes, et d’y inclure les valeurs de types primitifs (conversion implicite)
- Les méthodes de la classe String permettent d’effectuer quelques opérations courantes sur les chaînes
![](https://cdn.breizhhardware.fr/FAKA3/riZOmISu56.png/raw)
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

## Entrée/Sortie
### Classe System
- La classe System permet d’interagir avec le système d’exploitation
### Les flux d'entrée / sortie
- System.out modélise la sortie standard 
	- La méthode `print()` permet d’afficher des données avec un formatage automatique.
	- La méthode `println()` ajoute un retour à la ligne (portable) 
- System.in modélise l’entrée standard 
	- La méthode `read()` permet de lire des octets. Elle est fastidieuse à utiliser car il faut manipuler les octets et faire les conversions à la main
### Classe Scanner
- La classe Scanner fait partie du package `java.util`
- Elle découpe la chaîne en morceaux selon un délimiteur (espace par défaut, modifiable)
- On peut convertir chaque morceau dans un type cible. Une exception est levée si la conversion échoue. 
![](https://cdn.breizhhardware.fr/FAKA3/YebIHuSE31.png/raw)
- Ne pas oublier de fermer le Scanner après utilisation, avec la méthode `close()`
Example:
```java
public class HelloYou { 
	public static void main(String[] args) 
	{ 
		Scanner s = new Scanner(System.in); // création du Scanner 
		String name = s.next (); // lecture d'une chaîne bloquant 
		System.out.println ("Hello, " + name + "!"); 
		s.close(); // fermeture du Scanner 
	} 
}
```

# Classes
## Définition d'une classe
- Une classe possède des membres : des attributs et des méthodes 
- Chaque membre possède une visibilité : 
	- Privée : Uniquement accessible depuis le code des méthodes de la classe
	- Publique : Accessible depuis n’importe où 
	- Protected: visible des classes enfants de la classe
	- Package private (défaut) : visible des classes du package 
Example de classe
```java
public class Fraction
{
	private int numerator 
	private int denominator
	public int getNumerator() 
	{ 
		return this.numerator; 
	} 
	public void setNumerator(int numerator) 
	{ 
		this.numerator = numerator; 
	}
	public Fraction(int numerator, int denominator) 
	{ 
		this.setNumerator(numerator); 
		this.setDenominator(denominator); 
	}
	public Fraction(int numerator)
	{
		this(numerator, 1);
	}
}
```