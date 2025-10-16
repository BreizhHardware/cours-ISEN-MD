-- Jeu de test pour la base de données photovoltaïque
-- Ce script couvre toutes les tables avec des opérations INSERT, SELECT, UPDATE et DELETE

-- ===========================================
-- INSERTIONS : Création de données de test
-- ===========================================

-- Insertion dans Marque
INSERT INTO Marque (marque) VALUES ('SunPower');
INSERT INTO Marque (marque) VALUES ('LG');
INSERT INTO Marque (marque) VALUES ('SMA');
INSERT INTO Marque (marque) VALUES ('Huawei');

-- Insertion dans Region
INSERT INTO Region (nom, pays) VALUES ('Bretagne', 'France');
INSERT INTO Region (nom, pays) VALUES ('Pays de la Loire', 'France');

-- Insertion dans Installateur
INSERT INTO Installateur (installateur, est_valide) VALUES ('Installateur A', true);
INSERT INTO Installateur (installateur, est_valide) VALUES ('Installateur B', false);

-- Insertion dans Panneau (dépend de Marque)
INSERT INTO Panneau (modele, Id_marque) VALUES ('X21-345', (SELECT Id_marque FROM Marque WHERE marque = 'SunPower' LIMIT 1));
INSERT INTO Panneau (modele, Id_marque) VALUES ('NeON 2', (SELECT Id_marque FROM Marque WHERE marque = 'LG' LIMIT 1));

-- Insertion dans Onduleur (dépend de Marque)
INSERT INTO Onduleur (modele, Id_marque) VALUES ('Sunny Boy 3.0', (SELECT Id_marque FROM Marque WHERE marque = 'SMA' LIMIT 1));
INSERT INTO Onduleur (modele, Id_marque) VALUES ('SUN2000-3KTL', (SELECT Id_marque FROM Marque WHERE marque = 'Huawei' LIMIT 1));

-- Insertion dans Departement (dépend de Region)
INSERT INTO Departement (nom, region_code) VALUES ('Ille-et-Vilaine', (SELECT region_code FROM Region WHERE nom = 'Bretagne' LIMIT 1));
INSERT INTO Departement (nom, region_code) VALUES ('Loire-Atlantique', (SELECT region_code FROM Region WHERE nom = 'Pays de la Loire' LIMIT 1));

-- Insertion dans Localisation (dépend de Departement)
INSERT INTO Localisation (code_Insee, ville, code_postal, population, departement_code)
VALUES ('35001', 'Rennes', '35000', 220000, (SELECT departement_code FROM Departement WHERE nom = 'Ille-et-Vilaine' LIMIT 1));
INSERT INTO Localisation (code_Insee, ville, code_postal, population, departement_code)
VALUES ('44001', 'Nantes', '44000', 320000, (SELECT departement_code FROM Departement WHERE nom = 'Loire-Atlantique' LIMIT 1));

-- Insertion dans Installation (dépend de Localisation, Installateur, Panneau, Onduleur)
INSERT INTO Installation (nb_panneaux, nb_onduleurs, date_installation, production, puissance_crete, orientation, orientation_optimum, pente, pente_optimum, surface, latitude, longitude, Id_ville, Id_installateur, Id_panneau, Id_onduleur)
VALUES (10, 1, '2023-05-15', 5000, 3000, 180, 180, 30, 30, 25, '48.11', '-1.67',
        (SELECT Id_ville FROM Localisation WHERE ville = 'Rennes' LIMIT 1),
        (SELECT Id_installateur FROM Installateur WHERE installateur = 'Installateur A' LIMIT 1),
        (SELECT Id_panneau FROM Panneau WHERE modele = 'X21-345' LIMIT 1),
        (SELECT Id_onduleur FROM Onduleur WHERE modele = 'Sunny Boy 3.0' LIMIT 1));

INSERT INTO Installation (nb_panneaux, nb_onduleurs, date_installation, production, puissance_crete, orientation, orientation_optimum, pente, pente_optimum, surface, latitude, longitude, Id_ville, Id_installateur, Id_panneau, Id_onduleur)
VALUES (8, 1, '2023-07-20', 4000, 2400, 150, 180, 25, 30, 20, '47.21', '-1.55',
        (SELECT Id_ville FROM Localisation WHERE ville = 'Nantes' LIMIT 1),
        (SELECT Id_installateur FROM Installateur WHERE installateur = 'Installateur B' LIMIT 1),
        (SELECT Id_panneau FROM Panneau WHERE modele = 'NeON 2' LIMIT 1),
        (SELECT Id_onduleur FROM Onduleur WHERE modele = 'SUN2000-3KTL' LIMIT 1));

-- ===========================================
-- SELECT : Vérification des données insérées
-- ===========================================

-- SELECT sur Marque
SELECT * FROM Marque;

-- SELECT sur Region
SELECT * FROM Region;

-- SELECT sur Installateur
SELECT * FROM Installateur;

-- SELECT sur Panneau avec jointure
SELECT p.*, m.marque FROM Panneau p JOIN Marque m ON p.Id_marque = m.Id_marque;

-- SELECT sur Onduleur avec jointure
SELECT o.*, m.marque FROM Onduleur o JOIN Marque m ON o.Id_marque = m.Id_marque;

-- SELECT sur Departement avec jointure
SELECT d.*, r.nom AS region FROM Departement d JOIN Region r ON d.region_code = r.region_code;

-- SELECT sur Localisation avec jointure
SELECT l.*, d.nom AS departement, r.nom AS region
FROM Localisation l
JOIN Departement d ON l.departement_code = d.departement_code
JOIN Region r ON d.region_code = r.region_code;

-- SELECT sur Installation avec toutes les jointures
SELECT i.*, l.ville, ins.installateur, mp.marque AS marque_panneau, mo.marque AS marque_onduleur
FROM Installation i
JOIN Localisation l ON i.Id_ville = l.Id_ville
LEFT JOIN Installateur ins ON i.Id_installateur = ins.Id_installateur
LEFT JOIN Panneau p ON i.Id_panneau = p.Id_panneau
LEFT JOIN Marque mp ON p.Id_marque = mp.Id_marque
LEFT JOIN Onduleur o ON i.Id_onduleur = o.Id_onduleur
LEFT JOIN Marque mo ON o.Id_marque = mo.Id_marque;

-- ===========================================
-- UPDATE : Modification de données
-- ===========================================

-- UPDATE Marque
UPDATE Marque SET marque = 'SunPower Updated' WHERE marque = 'SunPower';

-- UPDATE Region
UPDATE Region SET pays = 'France Métropolitaine' WHERE nom = 'Bretagne';

-- UPDATE Installateur
UPDATE Installateur SET est_valide = true WHERE installateur = 'Installateur B';

-- UPDATE Panneau
UPDATE Panneau SET modele = 'X21-345 Pro' WHERE modele = 'X21-345';

-- UPDATE Onduleur
UPDATE Onduleur SET modele = 'Sunny Boy 3.0 Plus' WHERE modele = 'Sunny Boy 3.0';

-- UPDATE Departement
UPDATE Departement SET nom = 'Ille-et-Vilaine (35)' WHERE nom = 'Ille-et-Vilaine';

-- UPDATE Localisation
UPDATE Localisation SET population = 225000 WHERE ville = 'Rennes';

-- UPDATE Installation
UPDATE Installation SET production = 5500 WHERE puissance_crete = 3000;

-- ===========================================
-- DELETE : Suppression de données
-- ===========================================

-- DELETE Installation (pas de dépendances)
DELETE FROM Installation WHERE puissance_crete = 2400;

-- DELETE Localisation (supprimera les installations liées via CASCADE)
DELETE FROM Localisation WHERE ville = 'Nantes';

-- DELETE Departement (supprimera les localisations liées via CASCADE)
DELETE FROM Departement WHERE nom = 'Loire-Atlantique';

-- DELETE Panneau (supprimera les installations liées via SET NULL)
DELETE FROM Panneau WHERE modele = 'NeON 2';

-- DELETE Onduleur (supprimera les installations liées via SET NULL)
DELETE FROM Onduleur WHERE modele = 'SUN2000-3KTL';

-- DELETE Installateur (supprimera les installations liées via SET NULL)
DELETE FROM Installateur WHERE installateur = 'Installateur B';

-- DELETE Region (supprimera les départements liés via CASCADE)
DELETE FROM Region WHERE nom = 'Pays de la Loire';

-- DELETE Marque (supprimera les panneaux et onduleurs liés via CASCADE)
DELETE FROM Marque WHERE marque = 'LG';
DELETE FROM Marque WHERE marque = 'Huawei';

-- ===========================================
-- VÉRIFICATION FINALE : État après suppressions
-- ===========================================

-- Vérifier les tables restantes
SELECT COUNT(*) AS nb_marques FROM Marque;
SELECT COUNT(*) AS nb_regions FROM Region;
SELECT COUNT(*) AS nb_departements FROM Departement;
SELECT COUNT(*) AS nb_localisations FROM Localisation;
SELECT COUNT(*) AS nb_installations FROM Installation;
SELECT COUNT(*) AS nb_panneaux FROM Panneau;
SELECT COUNT(*) AS nb_onduleurs FROM Onduleur;
SELECT COUNT(*) AS nb_installateurs FROM Installateur;
