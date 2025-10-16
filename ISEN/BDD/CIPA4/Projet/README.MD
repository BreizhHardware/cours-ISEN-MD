# Projet BDD - Gestion des installations photovoltaïques

## 🌟 Introduction

Dans le cadre du cours de **Base de Données**, ce projet vous invite à concevoir et interroger une base de données relationnelle portant sur les installations photovoltaïques résidentielles. Le jeu de données est fourni dans le cas du projet.

### 🎯 Objectifs

- Construire un schéma relationnel en **3FN** (Troisième Forme Normale).
- Nettoyer et homogénéiser les fichiers source.
- Charger les données dans une base de données **PostgreSQL**.
- Répondre à un ensemble de requêtes d'analyse.

### 📊 Fichiers de Base

- `data.csv` : Contient les installations avec puissance crête, surface, marques, orientation, etc.
- `communes-france-2024-limite.csv` : Référentiel des communes françaises avec code INSEE, commune, département, région et code postal.

## 📋 Requirements

- Python 3.x
- PostgreSQL
- [Poetry](https://python-poetry.org/docs/#installing-with-pipx) (pour la gestion des dépendances)

## 🚀 Installation

1. **Cloner le dépôt GitHub** :

   ```bash
   git clone https://github.com/breizhhardware/projet-bdd-cipa4.git
   cd projet-bdd-cipa4/data-cleanup
   ```

2. **Installer les dépendances avec Poetry** :

   ```bash
   poetry install
   ```

3. **Configurer la base de données PostgreSQL** :
   Utilisez `database.sql` pour créer les tables nécessaires (si la base existe déjà, les tables seront supprimées avant d'être recréées).

   ```bash
   psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/model/database.sql
   ```

4. **Générer les scripts SQL pour insérer les données nettoyées** :
   ⚠️ Cela peut prendre du temps en raison du traitement par IA (environ 13 min sur un MacBook Air M2).

   ```bash
   poetry run python src/data_cleanup/__init__.py
   ```

5. **Insérer les données nettoyées dans la base de données** :
   ```bash
   psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/seeder/insert_data.sql
   ```

## ▶️ Exécution

1. **Nettoyer et homogénéiser les données** :

   ```bash
   poetry run python src/data_cleanup/__init__.py
   ```

2. **Insérer les données nettoyées dans PostgreSQL** :

   ```bash
   psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/seeder/insert_data.sql
   ```

3. **Générer des cartes** :

⚠️ Il faut avoir exécuté le script de nettoyage des données avant et avoir adapter le `.env.example` a votre environnement et le nommer en `.env`.

- Pour générer la carte des installations photovoltaïques

```bash
poetry run python src/data_cleanup/map_visualization.py
```

- Pour générer les cartes de comparaison des pentes et orientation optimum

```bash
poetry run python src/data_cleanup/map_orientation_pente.py
```

4. **Visualiser les cartes** :
   - Ouvrez le fichier `carte_installations_france.html` dans votre navigateur.
   - Ouvrez le fichier `carte_ecart_orientation.html` dans votre navigateur.
   - Ouvrez le fichier `carte_ecart_pente.html` dans votre navigateur.

## 📁 Structure du Projet

Voici un aperçu de l'arborescence des fichiers du projet :

```
projet-bdd-cipa4/
├── analyse_puissance_solaire_20251016_092823.png  # Image d'analyse de puissance solaire
├── cleaned_data.csv                              # Données nettoyées
├── communes-france-2024-limite.csv               # Référentiel des communes françaises
├── data_small.csv                                # Échantillon de données
├── data.csv                                      # Données brutes des installations
├── MCD.png                                     # Image du modèle conceptuel de données (MCD)
├── Mcd_V1.mcd                                    # Modèle conceptuel de données (MCD)
├── MLD.png                                     # Image du modèle logique de données (MLD)
├── Présentation projet.md                        # Présentation du projet
├── projet-cipa4-2025-nantes-lancement.pdf         # PDF de lancement du projet
├── projet-cipa4-2025-nantes.pdf                   # PDF du projet
├── README.MD                                     # Ce fichier
├── run_results.sh                                # Script pour exécuter les requêtes SQL et afficher les résultats dans le dossier sql/results/
├── Tutoriel PostgreSQL projet cipa.pdf           # Tutoriel PostgreSQL
├── data-cleanup/                                 # Dossier pour le nettoyage des données
│   ├── carte_installations_france.html           # Carte interactive des installations
│   ├── poetry.lock                               # Fichier de verrouillage Poetry
│   ├── pyproject.toml                            # Configuration Poetry
│   ├── src/                                      # Code source Python
│   │   └── data_cleanup/
│   │       ├── __init__.py
│   │       ├── clean_data.py                     # Script de nettoyage des données
│   │       ├── config.py                         # Configuration
│   │       ├── detect_encoding.py                # Détection d'encodage
│   │       ├── generate_inserts.py               # Génération des inserts SQL
│   │       ├── map_visualization.py              # Visualisation de la carte
|   |       ├── map_orientation_pente             # Visualisation de cartes sur l'orientation et les pentes
│   │       ├── query_12.py                       # Requête spécifique
│   │       └── utils.py                          # Utilitaires
│   └── tests/                                    # Tests unitaires
│       └── __init__.py
└── sql/                                         # Scripts SQL
    ├── results/                                 # Résultats des requêtes
    ├── model/
    │   └── database.sql                          # Création des tables
    ├── requests/
    │   ├── SqlRequests.sql                       # Requêtes d'analyse
    │   └── testModel.sql                        # Tests du modèle
    └── seeder/
        └── insert_data.sql                       # Insertion des données
```

- **Racine** : Contient les données brutes, les fichiers de présentation et les images.
- **data-cleanup/** : Module Python pour le nettoyage et la visualisation des données.
- **sql/** : Scripts SQL pour la base de données, incluant le modèle, les requêtes et l'insertion des données.

## 🔍 Requêtes SQL

Les requêtes SQL pour analyser les données sont disponibles dans le dossier `sql/requests/`. Exécutez-les dans votre base de données PostgreSQL pour obtenir les résultats souhaités.

```bash
psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/requests/SqlRequests.sql
```

Pour obtenir chaque résultat dans un fichier séparé, utilisez le script `run_results.sh` :

```bash
bash run_results.sh
```

## 👥 Auteurs

- [Candice PAILLUSSON](https://www.linkedin.com/in/candice-paillusson-504aaa26b/)
- [Clément HERVOUET](https://www.linkedin.com/in/cl%C3%A9ment-hervouet-93b718259/)
- [Félix MARQUET](https://mrqt.fr)

---

_Projet réalisé dans le cadre du cours de Base de Données à l'ISEN Nantes._
