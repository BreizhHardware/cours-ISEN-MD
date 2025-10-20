#!/bin/bash

mkdir -p sql/requests/results

# Request 1

cat <<'EOF' > temp.sql
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
EOF

cat <<'EOF' > sql/requests/results/request_1.sql
-- Query 1
EOF

cat temp.sql >> sql/requests/results/request_1.sql

echo "-- Result" >> sql/requests/results/request_1.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_1.sql

# Request 2

cat <<'EOF' > temp.sql
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
WHERE p.modele = 'HIP-210 NKHE1'
LIMIT 100;
EOF

cat <<'EOF' > sql/requests/results/request_2.sql
-- Query 2
EOF

cat temp.sql >> sql/requests/results/request_2.sql

echo "-- Result" >> sql/requests/results/request_2.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_2.sql

# Request 3

cat <<'EOF' > temp.sql
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
EOF

cat <<'EOF' > sql/requests/results/request_3.sql
-- Query 3
EOF

cat temp.sql >> sql/requests/results/request_3.sql

echo "-- Result" >> sql/requests/results/request_3.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_3.sql

# Request 4

cat <<'EOF' > temp.sql
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
ORDER BY Nb_installation DESC
LIMIT 100;
EOF

cat <<'EOF' > sql/requests/results/request_4.sql
-- Query 4
EOF

cat temp.sql >> sql/requests/results/request_4.sql

echo "-- Result" >> sql/requests/results/request_4.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_4.sql

# Request 5

cat <<'EOF' > temp.sql
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
ORDER BY i.orientation, tranche_pente
LIMIT 100;
EOF

cat <<'EOF' > sql/requests/results/request_5.sql
-- Query 5
EOF

cat temp.sql >> sql/requests/results/request_5.sql

echo "-- Result" >> sql/requests/results/request_5.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_5.sql

# Request 6

cat <<'EOF' > temp.sql
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
LIMIT 20;
EOF

cat <<'EOF' > sql/requests/results/request_6.sql
-- Query 6
EOF

cat temp.sql >> sql/requests/results/request_6.sql

echo "-- Result" >> sql/requests/results/request_6.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_6.sql

# Request 7

cat <<'EOF' > temp.sql
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
LIMIT 20;
EOF

cat <<'EOF' > sql/requests/results/request_7.sql
-- Query 7
EOF

cat temp.sql >> sql/requests/results/request_7.sql

echo "-- Result" >> sql/requests/results/request_7.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_7.sql

# Request 8

cat <<'EOF' > temp.sql
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
)
LIMIT 100;
EOF

cat <<'EOF' > sql/requests/results/request_8.sql
-- Query 8
EOF

cat temp.sql >> sql/requests/results/request_8.sql

echo "-- Result" >> sql/requests/results/request_8.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_8.sql

# Request 9

cat <<'EOF' > temp.sql
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
ORDER BY densite
LIMIT 10;
EOF

cat <<'EOF' > sql/requests/results/request_9.sql
-- Query 9
EOF

cat temp.sql >> sql/requests/results/request_9.sql

echo "-- Result" >> sql/requests/results/request_9.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_9.sql

# Request 10

cat <<'EOF' > temp.sql
ALTER TABLE Marque ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Region ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Installateur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Panneau ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Onduleur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Departement ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Localisation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Installation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_update_last_modified_Marque
    BEFORE UPDATE ON Marque
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Region
    BEFORE UPDATE ON Region
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Installateur
    BEFORE UPDATE ON Installateur
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Panneau
    BEFORE UPDATE ON Panneau
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Onduleur
    BEFORE UPDATE ON Onduleur
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Departement
    BEFORE UPDATE ON Departement
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Localisation
    BEFORE UPDATE ON Localisation
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Installation
    BEFORE UPDATE ON Installation
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
EOF

cat <<'EOF' > sql/requests/results/request_10.sql
-- Query 10
EOF

cat temp.sql >> sql/requests/results/request_10.sql

echo "-- Result" >> sql/requests/results/request_10.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_10.sql

# Request 11

cat <<'EOF' > temp.sql
SELECT CORR(surface, puissance_crete) AS correlation_surface_puissance
FROM Installation
WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0;
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
SELECT puissance_crete, surface
FROM Installation
WHERE surface IS NOT NULL AND puissance_crete IS NOT NULL AND surface > 0 AND surface < 1000
ORDER BY surface
LIMIT 100;
EOF

cat <<'EOF' > sql/requests/results/request_11.sql
-- Query 11
EOF

cat temp.sql >> sql/requests/results/request_11.sql

echo "-- Result" >> sql/requests/results/request_11.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_11.sql

# Request 12

cat <<'EOF' > temp.sql
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
ORDER BY annee DESC, puissance_totale DESC
LIMIT 100;
SELECT * FROM vue_puissance_region_annee LIMIT 100;
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
ORDER BY densite_puissance_par_habitant DESC
LIMIT 100;
SELECT * FROM vue_densite_puissance_commune LIMIT 100;
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
ORDER BY nombre_installations DESC
LIMIT 100;
SELECT * FROM vue_top_marques_onduleurs LIMIT 100;
DROP VIEW vue_top_marques_onduleurs;
CREATE VIEW vue_orientation_pente_region AS
SELECT
    r.nom AS region,
    d.nom AS departement,
    COUNT(i.id_installation) AS nombre_installations,
    AVG(i.orientation) AS orientation_moyenne,
    MIN(i.orientation) AS orientation_min,
    MAX(i.orientation) AS orientation_max,
    STDDEV(i.orientation) AS orientation_ecart_type,
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
    (r.nom, d.nom),
    (r.nom)
)
ORDER BY r.nom, d.nom NULLS FIRST
LIMIT 100;
SELECT * FROM vue_orientation_pente_region LIMIT 100;
DROP VIEW vue_orientation_pente_region;
EOF

cat <<'EOF' > sql/requests/results/request_12.sql
-- Query 12
EOF

cat temp.sql >> sql/requests/results/request_12.sql

echo "-- Result" >> sql/requests/results/request_12.sql

psql -h 10.30.51.183 -U isen-projet -d isen-projet -q -f temp.sql >> sql/requests/results/request_12.sql

rm temp.sql
