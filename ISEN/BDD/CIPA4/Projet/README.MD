# Projet BDD - Gestion des installations photovoltaïques

## Introduction
Dans le cadre du cours de Base de Données, on vous demande de concevoir et d’interroger une base portant sur les installations photovoltaïques résidentielles (le jeu de données est réel). Les objectifs sont les suivants :
- construire un schéma relationnel en 3FN,
- nettoyer et homogénéiser les fichiers source, puis
- charger les données dans une base de données PostgreSQL, et ensuite
- répondre à un ensemble de requêtes d’analyse.

Les fichiers de base sont fournis, à savoir :
- data.csv, qui reprend les installations, avec les informations suivantes : puissance crête, surface, marques, orientation, etc., et
- communes-france-2024-limite.csv, qui est le référentiel des communes, avec le code INSEE, la commune, le département, la région, et le code postal.

## Requirements
- Python 3.x
- PostgreSQL
- poetry (pour la gestion des dépendances)

## Installation
1. Cloner le dépôt GitHub :
    ```bash
    git clone https://github.com/breizhhardware/projet-bdd-cipa4.git
    cd projet-bdd-cipa4/data-cleanup
    ```
2. Installer les dépendances avec poetry :
    ```bash
    poetry install
    ```
3. Configurer la base de données PostgreSQL :
   Si vous possedez déjà une base de données PostgreSQL de notre projet, vous pouvez utiliser le script sql drop_and_recreate_db.sql pour supprimer et recréer la base de données. Sinon vous pouvez utiliser le script database.sql pour créer les tables nécessaires.
    ```bash
    psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/model/drop_and_recreate_db.sql
    ```
    ou
    ```bash
    psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/model/database.sql
    ```
4. Générer les scripts SQL pour insérer les données nettoyées, cela peut prendre longtemps étant donné qu'il y a un traitement par intelligence artificielle sur votre machine (13min sur un MacBook Air M2) :
    ```bash
    poetry run python src/data_cleanup/__init__.py
    ```
5. Inserer les données nettoyées dans la base de données :
    ```bash
    psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/seeder/insert_data.sql
    ```

## Exécution
1. Nettoyer et homogénéiser les données :
    ```bash
   poetry run python src/data_cleanup/__init__.py
    ```
2. Insérer les données nettoyées dans la base de données PostgreSQL :
    ```bash
    psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/seeder/insert_data.sql
    ```
3. Générer la carte des installations photovoltaïques :
    ```bash
    poetry run python src/data_cleanup/map_visualization.py
    ```
4. Ouvrir le fichier carte_installations_france.html dans votre navigateur pour visualiser la carte.

## Requêtes SQL
Les requêtes SQL pour analyser les données sont disponibles dans le dossier `sql/requests`. Vous pouvez les exécuter dans votre base de données PostgreSQL pour obtenir les résultats souhaités.
    
```bash
psql -U votre_utilisateur -d votre_base_de_donnees -f ../sql/requests/SqlRequests.sql
```

## Auteurs
- [Candice PAILLUSSON](https://www.linkedin.com/in/candice-paillusson-504aaa26b/)
- [Clément HERVOUET](https://www.linkedin.com/in/cl%C3%A9ment-hervouet-93b718259/)
- [Félix MARQUET](https://mrqt.fr)
