-- Query 3
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
-- Result
  commune  | nb_installation | puissance_totale | production_moyenne 
-----------+-----------------+------------------+--------------------
 Fougères |               4 |           206094 |            3038.50
 Rennes    |              15 |           237332 |            2261.80
(2 rows)

