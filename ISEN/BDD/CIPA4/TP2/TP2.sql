/*
1/ Requêtes avec équi-jointure
Afficher le nom, la fonction et le lieu de travail des employés, triés par lieu de travail et fonction
 */
SELECT nom, fonction, ville
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    ORDER BY ville, fonction;

/* Version avec LEFT JOIN*/
SELECT nom, fonction, ville
    FROM employe
        LEFT JOIN public.service s on employe.num_service = s.num_service
    ORDER BY ville, fonction;

/* Version avec WHERE*/
SELECT nom, fonction, ville
    FROM employe, public.service s
    WHERE employe.num_service = s.num_service
    ORDER BY ville, fonction;

/*
Afficher le nom et la fonction des employés travaillant à Brest
 */
SELECT nom, fonction
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    WHERE ville = 'Brest';
/* Version avec LEFT JOIN*/
SELECT nom, fonction
    FROM employe
        LEFT JOIN public.service s on employe.num_service = s.num_service
    WHERE ville = 'Brest';

/* Version avec WHERE*/
SELECT nom, fonction
    FROM employe, public.service s
    WHERE employe.num_service = s.num_service
        AND ville = 'Brest';

/*
Afficher le nom et la fonction des employés dont le supérieur hiérarchique n’est pas le PDG
 */
SELECT nom, fonction
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    WHERE numemp_sup <> 1;

/* Version avec LEFT JOIN*/
SELECT nom, fonction
    FROM employe
        LEFT JOIN public.service s on employe.num_service = s.num_service
    WHERE numemp_sup <> 1;

/* Version avec WHERE*/
SELECT nom, fonction
    FROM employe, public.service s
    WHERE employe.num_service = s.num_service
        AND numemp_sup <> 1;

/*
Afficher le nom, la fonction, le nom et la fonction du supérieur hiérarchique (renommer ces 2 colonnes) et le lieu de travail des employés, triés par fonction et nom
 */
SELECT nom, fonction, nom AS nom_sup, fonction AS fonction_sup, ville
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    ORDER BY fonction, nom;

/* Version avec LEFT JOIN*/
SELECT nom, fonction, nom AS nom_sup, fonction AS fonction_sup, ville
    FROM employe
        LEFT JOIN public.service s on employe.num_service = s.num_service
    ORDER BY fonction, nom;

/* Version avec WHERE*/
SELECT e1.nom, e1.fonction, e2.nom AS nom_sup, e2.fonction AS fonction_sup, s.ville
    FROM employe e1, employe e2, public.service s
    WHERE e1.numemp_sup = e2.numemp
        AND e1.num_service = s.num_service
    ORDER BY e1.fonction, e1.nom;

/*
2/ Requêtes avec "GROUP BY"
Afficher le nombre d'employés par service
 */
SELECT s.type_service, COUNT(*)
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    GROUP BY s.type_service;

/*
Afficher le lieu de travail, le nombre d’employés et leur salaire moyen, par lieu de travail
 */
SELECT ville, COUNT(*), AVG(salaire)
    FROM employe
        JOIN public.service s on employe.num_service = s.num_service
    GROUP BY ville;

/*
3/ Requêtes avec imbrication de "SELECT"
Afficher le numéro et nom des services qui n’ont aucun employé
 */
SELECT num_service, type_service
    FROM service
        WHERE num_service NOT IN
              (SELECT num_service FROM employe);

/*
4/ Bonus
Reprendre la quatrième requêtes de la partie 1), en affichant aussi le PDG (indice : jointure externe)
 */
SELECT nom, fonction, nom AS nom_sup, fonction AS fonction_sup, ville
    FROM employe
        LEFT JOIN public.service s ON employe.num_service = s.num_service
    ORDER BY fonction, nom;

/*
Rechercher plusieurs variantes de la requête de la partie 3) : avec sous-select synchronisé, avec jointure externe
 */
SELECT type_service, COUNT(*)
    FROM service
        LEFT JOIN employe ON service.num_service = employe.num_service
    GROUP BY type_service;