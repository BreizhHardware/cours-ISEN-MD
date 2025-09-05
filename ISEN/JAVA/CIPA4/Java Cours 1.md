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
- La vérification des types est très stricte en Java. 
- A part quelques rares exceptions (autoboxing, toString (), …) il n’y a pas de conversion implicite en Java
![](Pasted%20image%2020250905143950.png)
- Les nombres à virgule écrits « en dur » sont implicitement des double. Il faudra les caster explicitement lors de l’initialisation d’un float
![](Pasted%20image%2020250905144006.png)

