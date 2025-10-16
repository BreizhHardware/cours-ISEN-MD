-- Query 7
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
-- Result
 densite |           ville            |   département    | marque_panneau |      marque_onduleur       | surface | orientation | pente 
---------+----------------------------+-------------------+----------------+----------------------------+---------+-------------+-------
    8072 | Malataverne                | Drôme            | LG ELECTRONICS | SOLAREDGE                  |       1 |         -45 |    15
    5001 | Tours-sur-Meymont          | Puy-de-Dôme      | DUALSUN        | ENPHASE ENERGY             |       1 |        -180 |    15
    4512 | Yerres                     | Essonne           | SOLUXTEC       | SCHNEIDER ELECTRIC         |       1 |          15 |    60
    4435 | Millay                     | Nièvre           | EDF            | SMA                        |       1 |           0 |    25
    3895 | Claviers                   | Var               | CONERGY        | SMA                        |       1 |          30 |    15
    3351 | Saint-Martin-de-Seignanx   | Landes            | SUNPOWER       | POWER-ONE                  |       1 |           5 |    20
    2750 | Sainte-Hélène-Bondeville | Seine-Maritime    | SOLUXTEC       | ENPHASE ENERGY             |       2 |          45 |    45
    1823 | Samatan                    | Gers              | TRINA SOLAR    | APS - APSYSTEMS            |       2 |          40 |    30
    1820 | Saint-Jeoire               | Haute-Savoie      | DUALSUN        | ENPHASE ENERGY             |       2 |         -45 |    70
    1504 | Caurel                     | Côtes-d'Armor    | SCHUCO         | SCHUCO                     |      20 |          10 |    35
    1349 | Vitrolles                  | Bouches-du-Rhône | FIRE ENERGY    | SMA                        |       3 |          55 |    15
    1274 | Port-Saint-Louis-du-Rhône | Bouches-du-Rhône | TRINA SOLAR    | PAS_DANS_LA_LISTE_ONDULEUR |       4 |          45 |    20
    1115 | Graulhet                   | Tarn              | A SOLAR        | OMNIK                      |       3 |         -90 |    25
    1101 | Trévignin                 | Savoie            | AIMEX          | ASP                        |       1 |        -180 |    40
    1049 | Marly-la-ville             | Val-d'Oise        | EURENER        | ENPHASE ENERGY             |       3 |           0 |    30
    1023 | Champcevinel               | Dordogne          | SANYO          | POWER-ONE                  |       3 |         -45 |    30
    1008 | Baule                      | Loiret            | ALEO           | GROWATT                    |       3 |          45 |    35
    1002 | Lieusaint                  | Seine-et-Marne    | SANYO          | SMA                        |       2 |          45 |    40
     939 | Projan                     | Gers              | Q-CELLS        | ENPHASE ENERGY             |       2 |         -90 |    20
     916 | L'Union                    | Haute-Garonne     | SOLARWATT      | SMA                        |       6 |           0 |    30
(20 rows)

