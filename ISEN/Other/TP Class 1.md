# Création d'une classe "Animal"

## Objectif : Comprendre les bases des classes en Python en créant une classe simple représentant des animaux.

## Instructions :

1. Créez une classe appelée "Animal" avec les attributs de base tels que le nom, l'âge, le type d'alimentation, etc.
    
2. Ajoutez un constructeur à la classe pour initialiser ces attributs lors de la création d'une instance de la classe.
    
3. Ajoutez une méthode à la classe qui affiche les informations de l'animal.
    
4. Créez quelques instances de la classe "Animal" avec des informations différentes.
    
5. Appelez la méthode d'affichage pour chaque instance pour vérifier que les informations sont correctes.

# Gestion des attributs avec setters et getters

## Objectif : Comprendre l'utilisation des méthodes getters et setters pour manipuler les attributs d'une classe en Python.

## Instructions :

1. Créez une classe appelée "Personne" avec les attributs de base tels que le nom, l'âge et l'adresse.
    
2. Utilisez des méthodes getters pour obtenir les valeurs des attributs.
    
3. Utilisez des méthodes setters pour modifier les valeurs des attributs.
    
4. Utilisez des fonctions d'entrée utilisateur pour permettre à l'utilisateur de définir les valeurs des attributs lors de la création d'une instance de la classe.
    
5. Ajoutez des vérifications dans les setters pour vous assurer que certaines valeurs respectent certaines conditions (par exemple, l'âge ne peut pas être négatif).

# Gestion avancée des attributs avec setters, getters, méthodes magiques et inputs

## Objectif : Approfondir la compréhension des classes en Python en utilisant des setters, des getters, des méthodes magiques et des entrées utilisateur pour manipuler les attributs.

## Instructions :

1. Créez une classe appelée "Voiture" avec des attributs tels que la marque, le modèle, l'année de fabrication, et le prix.
    
2. Utilisez des méthodes getters pour obtenir les valeurs des attributs.
    
3. Utilisez des méthodes setters pour modifier les valeurs des attributs.
    
4. Utilisez des méthodes magiques pour fournir une représentation sous forme de chaîne de la classe (méthode `__str__`) et pour permettre la comparaison de deux instances basée sur le prix (méthode `__lt__` pour "moins que").
    
5. Utilisez des fonctions d'entrée utilisateur pour permettre à l'utilisateur de définir les valeurs des attributs lors de la création d'une instance de la classe.

## Jeu de test

```python
print("\nInformations de la voiture :")
print(voiture1)
```

```python
print(f"Marque : {voiture1.get_marque()}")
print(f"Modèle : {voiture1.get_modele()}")
print(f"Année de fabrication : {voiture1.get_annee()}")
print(f"Prix : {voiture1.get_prix()} €")
```

```python
voiture1.set_marque("Nouvelle Marque")
print(f"Marque mise à jour : {voiture1.get_marque()}")

# Essayez de définir un âge négatif (la vérification dans le setter devrait l'empêcher)
voiture1.set_annee(-2022)
print(f"Année après mise à jour : {voiture1.get_annee()}")
```

```python
print("Représentation sous forme de chaîne de la première voiture :")
print(voiture1)

# Comparez les deux voitures et affichez le résultat (la deuxième voiture ayant un prix plus bas)
print("\nComparaison des deux voitures :")
if voiture1 < voiture2:
    print("La première voiture est moins chère que la deuxième.")
else:
    print("La deuxième voiture est moins chère que la première.")
```

# Gestion des étudiants à l'ISEN Nantes

## Objectif : Créer un système de gestion des étudiants à l'ISEN Nantes en utilisant des classes, des méthodes spéciales, et en mettant l'accent sur l'utilisation de setters et getters.

## Instructions :

1. Créez une classe appelée "Personne" avec les attributs de base tels que le nom, le prénom, la date de naissance.
    
2. Ajoutez des méthodes getters et setters pour accéder et modifier ces attributs.
    
3. Créez une classe "Etudiant" avec des attributs spécifiques tels que le numéro étudiant, le niveau (première année, deuxième année, etc.), la spécialisation et la liste des inscriptions.
    
4. Ajoutez des méthodes getters et setters pour les attributs spécifiques de la classe "Etudiant".
    
5. Ajoutez une classe "Cours" avec des attributs tels que le nom du cours, le nombre de crédits, et le professeur responsable.
    
6. Créez une classe "Inscription" pour représenter l'inscription d'un étudiant à un cours particulier. Cette classe doit contenir des informations telles que l'étudiant, le cours, et la note obtenue.
    
7. Utilisez des listes pour stocker les étudiants, les cours et les inscriptions.
    
8. Implémentez des méthodes pour ajouter des étudiants, des cours et des inscriptions au système.
    
9. Ajoutez des méthodes pour afficher les étudiants, les cours, et les inscriptions.
    
10. Implémentez une méthode pour calculer la moyenne des notes d'un étudiant.
11. Implémentez des méthode pour ajouter, soustraire ou vérifier l'égalité de 2 notes.

```python
# Exemples d'utilisation du code
etudiant1 = Etudiant("Doe", "John", "01/01/2005", "E12345", "A1", "Informatique")
cours1 = Cours("Programmation C", 4, "Leandro Montero")
inscription1 = Inscription(etudiant1, cours1, 18)
```
