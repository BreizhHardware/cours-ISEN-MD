-- Query 8
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
-- Result
 nb_inferieures_a_moyenne | moyenne_globale 
--------------------------+-----------------
                    13391 |          147.35
(1 row)

