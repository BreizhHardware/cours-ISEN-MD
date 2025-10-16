-- Query 6
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
-- Result
 puissance_crete |         ville         |      département      |    marque_panneau    |  marque_onduleur   | surface | orientation | pente 
-----------------+-----------------------+------------------------+----------------------+--------------------+---------+-------------+-------
          874650 | Saint-Aunès          | Hérault               | BOSCH                | SCHNEIDER ELECTRIC | 8388607 |        -180 |    35
          686000 | Roquebrune-sur-Argens | Var                    | S-ENERGY             | SMA                |    4200 |         -30 |    30
          411600 | Paris                 | Paris                  | UNI-SOLAR            | SATCON             |    4400 |          40 |    25
          336000 | Tourouvre             | Orne                   | COLAS                | COLAS              |    2800 |           0 |     0
          300000 | Lacq                  | Pyrénées-Atlantiques | TENESOL              | TENESOL            |    4000 |        -180 |    10
          258300 | Dingé                | Ille-et-Vilaine (35)   | SUNPOWER             | FRONIUS            |    1400 |          -5 |    30
          247680 | Fère-Champenoise     | Marne                  | JIANGXI BEST SOLAR   | SMA                |    1757 |         -15 |    15
          243000 | Bourganeuf            | Creuse                 | EXIOM                | SPUTNIK            |    1700 |         -70 |    20
          234000 | Abidos                | Pyrénées-Atlantiques | SCHOTT               | SMA                |    1800 |         -20 |    25
          230850 | Gouzon                | Creuse                 | CENTRO SOLAR         | SMA                |     400 |        -180 |    35
          224880 | Pluméliau-Bieuzy     | Morbihan               | SOLARWATT            | SMA                |    1622 |           0 |    15
          215600 | Le Rheu               | Ille-et-Vilaine (35)   | SOLON AG             | SPUTNIK            |    1680 |           0 |    20
          203400 | Chantemerle-les-Blés | Drôme                 | SUNTECH              | KACO               |    1520 |          45 |    15
          202335 | Rennes                | Ille-et-Vilaine (35)   | SILIKEN              | SMA                |    1000 |           0 |     0
          198030 | Weitbruch             | Bas-Rhin               | SOLARWATT            | SMA                |    1850 |         -45 |    10
          198030 | Lucq-de-Béarn        | Pyrénées-Atlantiques | FONROCHE / PEVAFERSA | LTI                |    5000 |           0 |    20
          193725 | Fougères             | Ille-et-Vilaine (35)   | REC SOLAR            | SPUTNIK            |    9339 |          90 |    45
          189420 | Talant                | Côte-d'Or             | JETION               | SIEMENS            |    1546 |          40 |    10
          182250 | Valleiry              | Haute-Savoie           | SOLARWORLD           | SPUTNIK            |    1300 |           0 |    15
          179170 | Plozévet             | Finistère             | SOLARWATT            | SMA                |    1320 |          -5 |    15
(20 rows)

