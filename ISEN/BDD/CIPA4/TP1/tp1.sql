/*
 a) Afficher le nom et le salaire des employés dont le salaire est entre 1000 et 1500 Euros, triés par ordre de salaire
 (et, si égalité de salaire, par ordre de nom)
 */
SELECT nom, salaire
    FROM employe
    WHERE salaire >= 1000
      AND salaire <=1500
    ORDER BY salaire, nom;

/*
 b) fficher le nom, le salaire et la commission des employés ayant une commission
 */
SELECT nom, salaire, comm
    FROM employe
    WHERE comm IS NOT NULL
      AND comm > 0;

/*
 c) Afficher le nom et la date d’embauche des employés dont la date d’embauche est comprise entre le 1er janvier et
 le 31 décembre 2001, triés par date
 */
SELECT nom, date_embauche
    FROM employe
    WHERE date_embauche >= '2001-01-01'
      AND date_embauche <= '2001-12-31'
    ORDER BY date_embauche;

/*
 d) Afficher toutes les informations des employés qui n’ont pas la fonction de secrétaire
 */
SELECT *
    FROM employe
    WHERE fonction != 'secretaire';

/*
 e) Afficher le nom des directeurs des services 20 et 30
 */
SELECT nom, fonction, num_service
    FROM employe
    WHERE fonction = 'directeur'
      AND (num_service = 20 OR num_service = 30);

/*
 f) Rechercher les employés dont le nom commence par "LE" (ou "le", "Le", . . . ) et les trier par ordre de longueur
 de nom (nombre de caractères), puis (critère secondaire) par ordre alphabétique
 */
SELECT nom
    FROM employe
    WHERE LOWER(nom) LIKE 'le%'
    ORDER BY LENGTH(nom), nom;

/*
 g) Afficher le nom et la durée d’embauche (à ce jour) des employés, triés par durée. Nommer cette dernière colonne
 "Durée d’embauche", dans le résultat de la requête
 */
SELECT nom,
       AGE(CURRENT_DATE, date_embauche) AS "Durée d'embauche"
    FROM employe
    ORDER BY AGE(CURRENT_DATE, date_embauche);

/*
 h) Afficher le nom, la fonction et le salaire + la commission éventuelle des employés, triés par montant
 (salaire + commission). Nommer cette dernière colonne "Revenu mensuel"
 */
SELECT nom, fonction, salaire, comm,
       salaire + COALESCE(comm, 0) AS "Revenu mensuel"
    FROM employe
    ORDER BY "Revenu mensuel";

/*
 i) Afficher le nombre d’employés dont la commission est supérieure au quart du salaire
 */
SELECT COUNT(*)
    FROM employe
    WHERE comm > salaire / 4;

/*
 j) Afficher les salaires minimum, moyen (arrondi à 2 décimales) et maximum des employés, ainsi que le rapport
 (arrondi à l’entier le plus proche) du salaire maximum sur le salaire minimum. Renommer les colonnes affichées
 respectivement "salaire min", "salaire max", "salaire moy", "rapport max/min"
 */
SELECT MIN(salaire) AS "salaire min",
       ROUND(AVG(salaire),2) AS "salaire moy",
       MAX(salaire) AS "salaire max",
       ROUND(MAX(salaire)/MIN(salaire)) AS "rapport max/min"
    FROM employe;