# Exercice : Gestion d'un parc automobile en Java

## Contexte
Vous êtes chargé·e de modéliser un parc automobile pour une entreprise de location. Le parc contient des **voitures thermiques**, des **voitures électriques** et des **camions**. Chaque type de véhicule a des caractéristiques et des comportements spécifiques. Vous utiliserez des **classes abstraites** et des **interfaces** pour structurer votre code.

---

## Partie 1 : Classe abstraite et héritage

### 1. Classe abstraite `Vehicule`
Créez une classe abstraite `Vehicule` qui représente un véhicule générique.

**Attributs :**
- `marque` (String)
- `modele` (String)
- `annee` (int)
- `kilometrage` (double)

**Méthodes :**
- Un constructeur pour initialiser les attributs.
- Les accesseurs (getters) et mutateurs (setters) pour chaque attribut.
- Une méthode abstraite `afficherCaracteristiques()` : chaque sous-classe devra implémenter cette méthode pour afficher ses caractéristiques spécifiques.
- Une méthode concrète `rouler(double km)` : ajoute les kilomètres parcourus au kilométrage total.

---

### 2. Classe `VoitureThermique` (héritage de `Vehicule`)
Créez une classe `VoitureThermique` qui hérite de `Vehicule`.

**Attributs supplémentaires :**
- `typeCarburant` (String, ex: "Essence", "Diesel")
- `reservoir` (double, en litres)

**Méthodes :**
- Un constructeur pour initialiser les attributs.
- Implémentez la méthode `afficherCaracteristiques()` pour afficher les détails de la voiture thermique.
- Ajoutez une méthode `fairePlein(double litres)` : ajoute des litres au réservoir et affiche un message.

---

### 3. Classe `VoitureElectrique` (héritage de `Vehicule`)
Créez une classe `VoitureElectrique` qui hérite de `Vehicule`.

**Attributs supplémentaires :**
- `autonomie` (double, en km)
- `niveauBatterie` (int, en %)

**Méthodes :**
- Un constructeur pour initialiser les attributs.
- Implémentez la méthode `afficherCaracteristiques()` pour afficher les détails de la voiture électrique.
- Ajoutez une méthode `recharger()` : met le niveau de batterie à 100% et affiche un message.

---

### 4. Classe `Camion` (héritage de `Vehicule`)
Créez une classe `Camion` qui hérite de `Vehicule`.

**Attributs supplémentaires :**
- `chargeMax` (double, en tonnes)
- `chargeActuelle` (double, en tonnes)

**Méthodes :**
- Un constructeur pour initialiser les attributs.
- Implémentez la méthode `afficherCaracteristiques()` pour afficher les détails du camion.
- Ajoutez une méthode `charger(double poids)` : ajoute une charge au camion si la charge maximale n'est pas dépassée.

---

## Partie 2 : Interfaces et comportements spécifiques

### 5. Interface `Revisable`
Créez une interface `Revisable` qui définit les comportements suivants :
- `faireRevision()` : affiche un message indiquant que le véhicule est en révision.
- `terminerRevision()` : affiche un message indiquant que la révision est terminée.

**Faites implémenter cette interface par toutes les sous-classes de `Vehicule`.**

---

### 6. Interface `Locable`
Créez une interface `Locable` qui définit les comportements suivants :
- `louer()` : affiche un message indiquant que le véhicule est loué.
- `retourner()` : affiche un message indiquant que le véhicule est retourné.

**Faites implémenter cette interface uniquement par les classes `VoitureThermique` et `VoitureElectrique`.**

---

## Partie 3 : Gestion du parc automobile

### 7. Classe `ParcAutomobile`
Créez une classe `ParcAutomobile` avec les attributs et méthodes suivants :

**Attributs :**
- `listeVehicules` (ArrayList de Vehicules)

**Méthodes :**
- Un constructeur pour initialiser la liste de véhicules.
- `ajouterVehicule(Vehicule v)` : ajoute un véhicule au parc.
- `afficherParc()` : affiche les caractéristiques de tous les véhicules du parc.
- `faireReviserTout()` : appelle la méthode `faireRevision()` sur tous les véhicules du parc.

---

## Partie 4 : Test et interaction

### 8. Classe `Main`
Créez une classe `Main` avec une méthode `main()` pour tester votre implémentation.

**Dans la méthode `main()` :**
- Créez au moins une voiture thermique, une voiture électrique et un camion.
- Ajoutez-les au parc automobile.
- Faites rouler chaque véhicule sur une distance donnée.
- Faites le plein ou rechargez les voitures, et chargez le camion.
- Louez une voiture thermique et une voiture électrique.
- Affichez les caractéristiques de tous les véhicules du parc.
- Lancez une révision pour tous les véhicules.

---

## Exemple d'exécution attendu

Caractéristiques de la voiture thermique : 
Marque : Renault 
Modèle : Mégane 
Année : 2019 
Kilométrage : 85000.0 km 
Carburant : Essence 
Réservoir : 47.0 litres

Voiture thermique louée.
Camion en révision.


---

## Consignes supplémentaires
- Respectez l'encapsulation (attributs privés, getters/setters publics).
- Utilisez le mot-clé `super` dans les constructeurs des classes filles.
- Gérez les cas où la charge du camion dépasse sa capacité maximale.

---

&copy Félix MARQUET