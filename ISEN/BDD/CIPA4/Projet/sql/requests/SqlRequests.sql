--1)	Afficher la puissance crête d’une installation selon la marque et le modèle des panneaux.
SELECT
    ROUND(AVG(i.puissance_crete), 2) AS puissance_crete_moyenne,
    m.marque,
    p.modele
FROM Installation i
         JOIN Panneau p ON p.Id_panneau= i.Id_panneau
         JOIN Marque m ON m.id_marque = p.id_marque
WHERE i.puissance_crete IS NOT NULL
GROUP BY m.marque, p.modele
ORDER BY m.marque, p.modele
LIMIT 100;


--2)	Afficher, afin de pouvoir les comparer, toutes les installations d’un même modèle de panneau
-- (en affichant leurs caractéristiques détaillées : puissance, surface, orientation/pente, marque d’onduleur, et modèle d’onduleur).

SELECT
    p.modele AS modele_panneau,
    i.puissance_crete,
    i.surface,
    i.orientation,
    i.pente,
    mo.marque AS marque_onduleur,
    o.modele AS modele_onduleur
FROM Installation i
         JOIN Onduleur o ON o.Id_onduleur= i.Id_onduleur
         JOIN Panneau p ON p.Id_panneau= i.Id_panneau
         JOIN Marque mo ON mo.id_marque = o.id_marque
WHERE p.modele = 'HIP-210 NKHE1'; --On a pris le modèle avec le plus grand nombre d'installations

--3)	Comparer 3 communes au choix : nombre d’installations, puissance totale et production moyenne par commune.
SELECT
    l.ville AS commune,
    COUNT(i.Id_installation) AS Nb_installation,
    SUM(i.puissance_crete) AS puissance_totale,
    ROUND(AVG (i.production), 2) AS production_moyenne

FROM Installation i
         JOIN Localisation l ON l.Id_ville= i.Id_ville
WHERE l.ville IN ('Carquefou', 'Rennes', 'Fougères')
GROUP BY l.ville
LIMIT 100;

-- 4)	Déterminer, par marque d’onduleur, le nombre d’installations, la puissance moyenne,
-- la puissance mini et maxi et la surface moyenne (arrondir à deux décimales).
SELECT
    m.marque,
    COUNT(Id_installation) AS Nb_installation,
    AVG(puissance_crete) AS puissance_moy,
    MIN(puissance_crete) AS puissance_min,
    MAX(puissance_crete) AS puissance_max,
    ROUND(AVG(i.surface), 2) AS surface_moyenne
FROM installation i
         JOIN onduleur o ON o.Id_onduleur= i.Id_onduleur
         JOIN marque m ON m.id_marque = o.id_marque
GROUP BY m.marque
ORDER BY Nb_installation DESC;

--5)	Déterminer, par orientation, le nombre d’installations et la puissance totale,
-- ainsi que la répartition par pente (catégoriser les pentes par tranches à définir).
SELECT
    i.orientation,
    COUNT(Id_installation) AS Nb_installation,
    SUM(puissance_crete) AS puissance_totale,
    CASE
        WHEN i.pente < 10 THEN '0-10°'
        WHEN i.pente BETWEEN 10 AND 20 THEN '10-20°'
        WHEN i.pente BETWEEN 20 AND 30 THEN '20-30°'
        ELSE '>30°'
        END AS tranche_pente
FROM Installation i
GROUP BY i.orientation, tranche_pente
ORDER BY i.orientation, tranche_pente;


--6)	Déterminer les 20 installations à la puissance crête la plus élevée en
-- affichant toutes leurs caractéristiques pertinentes (commune, département,
-- marque panneaux/onduleur, surface, orientation, pente).
SELECT
    i.puissance_crete,
    l.ville,
    d.nom AS département,
    mp.marque AS marque_panneau,
    mo.marque AS marque_onduleur,
    i.surface,
    i.orientation,
    i.pente
FROM installation i
         JOIN onduleur o ON o.Id_onduleur= i.Id_onduleur
         JOIN panneau p ON p.Id_panneau= i.Id_panneau
         JOIN marque mo ON mo.id_marque = o.id_marque
         JOIN marque mp ON mp.id_marque = p.id_marque
         JOIN localisation l ON l.Id_ville= i.Id_ville
         JOIN departement d ON d.departement_code= l.departement_code
WHERE puissance_crete IS NOT NULL
ORDER BY i.puissance_crete DESC
LIMIT 20; -- on récupère les 20 premiers

--7)	Déterminer les 20 installations avec la densité (production/surface) la plus élevée.
SELECT
    i.production / i.surface AS densite,
    l.ville,
    d.nom AS département,
    mp.marque AS marque_panneau,
    mo.marque AS marque_onduleur,
    i.surface,
    i.orientation,
    i.pente
FROM installation i
         JOIN onduleur o ON o.Id_onduleur= i.Id_onduleur
         JOIN panneau p ON p.Id_panneau= i.Id_panneau
         JOIN marque mo ON mo.id_marque = o.id_marque
         JOIN marque mp ON mp.id_marque = p.id_marque
         JOIN localisation l ON l.Id_ville= i.Id_ville
         JOIN departement d ON d.departement_code= l.departement_code
WHERE production IS NOT NULL AND surface IS NOT NULL AND surface > 0
ORDER BY densite DESC
LIMIT 20; -- on récupère les 20 premiers


--8)	Calculer le nombre d’installations dont la densité (puissance/surface) est inférieure à la moyenne globale.
SELECT
    COUNT(i.id_installation) AS nb_inferieures_a_moyenne,
    ROUND((SELECT AVG(puissance_crete / surface)
           FROM installation
           WHERE puissance_crete IS NOT NULL AND surface IS NOT NULL AND surface > 0
       ), 2) AS moyenne_globale
FROM installation i
WHERE puissance_crete IS NOT NULL AND surface IS NOT NULL AND surface > 0
  AND (i.puissance_crete / i.surface) < (
    SELECT AVG(puissance_crete / surface)
    FROM installation
    WHERE puissance_crete IS NOT NULL AND surface IS NOT NULL AND surface > 0
);

--9)	Déterminer les 10 installations avec la densité (production/puissance) la plus faible.
SELECT
    l.ville,
    d.nom AS département,
    mp.marque AS marque_panneau,
    mo.marque AS marque_onduleur,
    i.surface,
    i.orientation,
    i.pente,
    i.production,
    i.puissance_crete,
    ROUND((i.production::numeric / i.puissance_crete::numeric), 4) AS densite
FROM installation i
         JOIN onduleur o ON o.Id_onduleur= i.Id_onduleur
         JOIN panneau p ON p.Id_panneau= i.Id_panneau
         JOIN marque mo ON mo.id_marque = o.id_marque
         JOIN marque mp ON mp.id_marque = p.id_marque
         JOIN localisation l ON l.Id_ville= i.Id_ville
         JOIN departement d ON d.departement_code= l.departement_code
WHERE i.puissance_crete IS NOT NULL AND i.puissance_crete > 0 AND i.production IS NOT NULL AND i.production > 0
ORDER BY densite -- ASC
LIMIT 10;

--10)	Ajoutez une colonne dans la base de données permettant d'enregistrer la date et l'heure de la dernière modification de l'enregistrement.
ALTER TABLE Marque ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Region ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Installateur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Panneau ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Onduleur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Departement ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Localisation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Installation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

--11)	On souhaiterait explorer le lien entre la surface des installations et leur puissance crête.
-- Proposez une ou plusieurs requêtes qui permettent d’explorer cette question et expliquez votre
-- démarche (corrélations simples, regroupements par tranches de surface, etc.).
-- 1. Coefficient de corrélation entre surface et puissance_crete
SELECT CORR(surface, puissance_crete) AS correlation_surface_puissance
FROM Installation
WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0;

-- 2. Moyenne de puissance_crete par tranches de surface
SELECT
    CASE
        WHEN surface < 10 THEN '<10 m²'
        WHEN surface BETWEEN 10 AND 50 THEN '10-50 m²'
        WHEN surface BETWEEN 50 AND 100 THEN '50-100 m²'
        WHEN surface BETWEEN 100 AND 200 THEN '100-200 m²'
        ELSE '>200 m²'
    END AS tranche_surface,
    COUNT(*) AS nb_installations,
    ROUND(AVG(puissance_crete), 2) AS puissance_moyenne,
    ROUND(AVG(surface), 2) AS surface_moyenne
FROM Installation
WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0
GROUP BY tranche_surface
ORDER BY tranche_surface;

-- 3. Données pour scatter plot
SELECT puissance_crete, surface
FROM Installation
WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0 AND surface < 1000 -- Limiter pour éviter outliers extrêmes
ORDER BY surface
LIMIT 100;

-- 12) Choisissez 3 indicateurs pertinents et créez une vue par indicateur.  
-- Exemples d’indicateurs :
-- -puissance totale et moyenne par région/année ; 
-- -densité de puissance moyenne par commune ; 
-- -top N marques d’onduleurs par nombre d’installations. 

CREATE VIEW vue_puissance_region_annee AS
SELECT 
    r.nom AS region,
    EXTRACT(YEAR FROM i.date_installation) AS annee,
    SUM(i.puissance_crete) AS puissance_totale,
    AVG(i.puissance_crete) AS puissance_moyenne,
    COUNT(i.id_installation) AS nombre_installations
FROM Installation i
JOIN Localisation l ON i.id_ville = l.id_ville
JOIN Departement d ON l.departement_code = d.departement_code
JOIN Region r ON d.region_code = r.region_code
WHERE i.date_installation IS NOT NULL
GROUP BY r.nom, EXTRACT(YEAR FROM i.date_installation)
ORDER BY annee DESC, puissance_totale DESC;

SELECT * FROM vue_puissance_region_annee;
DROP VIEW vue_puissance_region_annee;

CREATE VIEW vue_densite_puissance_commune AS
SELECT
    l.ville AS commune,
    l.code_postal,
    d.nom AS departement,
    r.nom AS region,
    COUNT(i.id_installation) AS nombre_installations,
    SUM(i.puissance_crete) AS puissance_totale,
    AVG(i.puissance_crete) AS puissance_moyenne,
    CASE
        WHEN l.population > 0
        THEN SUM(i.puissance_crete) / l.population
        ELSE 0
    END AS densite_puissance_par_habitant
FROM Installation i
JOIN Localisation l ON i.id_ville = l.id_ville
JOIN Departement d ON l.departement_code = d.departement_code
JOIN Region r ON d.region_code = r.region_code
GROUP BY l.ville, l.code_postal, l.id_ville, d.nom, r.nom, l.population
ORDER BY densite_puissance_par_habitant DESC;

SELECT * FROM vue_densite_puissance_commune;
DROP VIEW vue_densite_puissance_commune;

CREATE VIEW vue_top_marques_onduleurs AS
SELECT
    m.marque AS marque_onduleur,
    COUNT(DISTINCT i.id_installation) AS nombre_installations,
    SUM(i.nb_onduleurs) AS total_onduleurs,
    AVG(i.nb_onduleurs) AS moyenne_onduleurs_par_installation,
    SUM(i.puissance_crete) AS puissance_totale_installations,
    AVG(i.puissance_crete) AS puissance_moyenne_par_installation
FROM Installation i
JOIN Onduleur o ON i.id_onduleur = o.id_onduleur
JOIN Marque m ON o.id_marque = m.id_marque
GROUP BY m.marque
ORDER BY nombre_installations DESC;

SELECT * FROM vue_top_marques_onduleurs;
DROP VIEW vue_top_marques_onduleurs;

CREATE VIEW vue_orientation_pente_region AS
SELECT
    r.nom AS region,
    d.nom AS departement,
    COUNT(i.id_installation) AS nombre_installations,
    -- Statistiques orientation
    AVG(i.orientation) AS orientation_moyenne,
    MIN(i.orientation) AS orientation_min,
    MAX(i.orientation) AS orientation_max,
    STDDEV(i.orientation) AS orientation_ecart_type,
    -- Statistiques pente
    AVG(i.pente) AS pente_moyenne,
    MIN(i.pente) AS pente_min,
    MAX(i.pente) AS pente_max,
    STDDEV(i.pente) AS pente_ecart_type
FROM Installation i
JOIN Localisation l ON i.id_ville = l.id_ville
JOIN Departement d ON l.departement_code = d.departement_code
JOIN Region r ON d.region_code = r.region_code
WHERE i.orientation IS NOT NULL AND i.pente IS NOT NULL
GROUP BY GROUPING SETS (
    (r.nom, d.nom),  -- Par département
    (r.nom)          -- Par région
)
ORDER BY r.nom, d.nom NULLS FIRST;

SELECT * FROM vue_orientation_pente_region;
DROP VIEW vue_orientation_pente_region;