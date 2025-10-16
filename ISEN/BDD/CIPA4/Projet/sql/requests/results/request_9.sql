-- Query 9
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
-- Result
       ville        |  département   | marque_panneau |  marque_onduleur   | surface | orientation | pente | production | puissance_crete | densite 
--------------------+-----------------+----------------+--------------------+---------+-------------+-------+------------+-----------------+---------
 Écuisses          | Saône-et-Loire | BISOL          | ENPHASE ENERGY     |      16 |        -180 |    90 |        508 |            2500 |  0.2032
 Montpellier        | Hérault        | TRINA SOLAR    | APS - APSYSTEMS    |       4 |         160 |    90 |        176 |             760 |  0.2316
 Embrun             | Hautes-Alpes    | SOLARWORLD     | VICTRON            |       2 |        -180 |    70 |         79 |             260 |  0.3038
 Querrien           | Finistère      | MX GROUP       | DELTA ENERGY       |      15 |         165 |    75 |        648 |            2100 |  0.3086
 Avesnes-sur-Helpe  | Nord            | ALTERNASOL     | MITSUBISHI         |      50 |        -180 |    60 |        293 |             840 |  0.3488
 Cussey-sur-l'Ognon | Doubs           | 3A ENERGIES    | SCHNEIDER ELECTRIC |      30 |        -180 |    60 |       1062 |            2970 |  0.3576
 Chambly            | Oise            | LDK SOLAR      | EVERSOL            |      36 |        -180 |    60 |       1604 |            4440 |  0.3613
 Kirrwiller         | Bas-Rhin        | 3A ENERGIES    | ABB                |      20 |         180 |    55 |        641 |            1650 |  0.3885
 Châtenoy-le-Royal | Saône-et-Loire | EURENER        | ENPHASE ENERGY     |      17 |        -155 |    65 |        745 |            1900 |  0.3921
 Bergerac           | Dordogne        | TRINA SOLAR    | ENPHASE ENERGY     |      15 |        -180 |    60 |       1260 |            3200 |  0.3938
(10 rows)

