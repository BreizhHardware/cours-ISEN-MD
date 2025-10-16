-- Query 2
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
-- Result
 modele_panneau | puissance_crete | surface | orientation | pente |      marque_onduleur       |      modele_onduleur       
----------------+-----------------+---------+-------------+-------+----------------------------+----------------------------
 HIP-210 NKHE1  |            2520 |      16 |          10 |    20 | FRONIUS                    | IG 20
 HIP-210 NKHE1  |            2940 |      18 |           0 |    30 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      18 |          80 |    20 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      22 |           0 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2940 |      17 |          20 |    20 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            1260 |       8 |          30 |    20 | SMA                        | SUNNY BOY 1100
 HIP-210 NKHE1  |            2940 |      18 |         -30 |    35 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |          20 |    20 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |          10 |    30 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |           5 |    35 | SPUTNIK                    | SOLARMAX S
 HIP-210 NKHE1  |            2940 |      18 |         -35 |    20 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |         -35 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |         -70 |    20 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2520 |      16 |           0 |    25 | SUNWAYS                    | NT 2600
 HIP-210 NKHE1  |            2520 |      15 |          30 |    20 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2100 |      13 |           0 |    35 | SPUTNIK                    | SOLARMAX 10
 HIP-210 NKHE1  |            2940 |      18 |          60 |    20 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2520 |      15 |          40 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2940 |      18 |          45 |    20 | MASTERVOLT                 | SUNMASTER QS 3500
 HIP-210 NKHE1  |            2940 |      18 |         -40 |    45 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |          40 |    35 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      18 |           0 |    15 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      18 |           5 |    45 | MASTERVOLT                 | SUNMASTER XS4300
 HIP-210 NKHE1  |            2940 |      20 |         -45 |    35 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      18 |          40 |    35 | SOLARMAX                   | CHOISIR LA MARQUE SPUTNIK
 HIP-210 NKHE1  |            2100 |      13 |          55 |    45 | SPUTNIK                    | SOLARMAX 2000C
 HIP-210 NKHE1  |            2520 |      16 |          15 |    45 | SMA                        | SUNNY BOY 2100TL
 HIP-210 NKHE1  |            2100 |      13 |          30 |    20 | SPUTNIK                    | SOLARMAX 2000S
 HIP-210 NKHE1  |            2940 |      18 |           0 |    15 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |           0 |    25 | SMA                        | SUNNY BOY 2500
 HIP-210 NKHE1  |            2940 |      18 |           0 |    20 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      17 |           0 |    40 | SPUTNIK                    | SOLARMAX 10
 HIP-210 NKHE1  |            5460 |      42 |           0 |    40 | SMA                        | SUNNY BOY 5000 TL
 HIP-210 NKHE1  |            2940 |      18 |           0 |    30 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      18 |         -10 |    20 | SMA                        | SUNNY BOY 3300
 HIP-210 NKHE1  |            2940 |      18 |         -15 |    25 | MASTERVOLT                 | SUNMASTER XS4300
 HIP-210 NKHE1  |            2520 |      16 |           5 |    30 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |         -20 |    15 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            3150 |      20 |         -45 |    15 | SMA                        | SUNNY BOY 2100TL
 HIP-210 NKHE1  |            2940 |      18 |         -45 |    20 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      20 |         -65 |    30 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |          10 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2520 |      15 |         -60 |    20 | FRONIUS                    | IG 20
 HIP-210 NKHE1  |            2520 |      15 |         -55 |    20 | FRONIUS                    | IG 20
 HIP-210 NKHE1  |            2940 |      18 |         -20 |    15 | SMA                        | SUNNY BOY 3300
 HIP-210 NKHE1  |            2940 |      21 |         -20 |    30 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      18 |           0 |    30 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |         -40 |    40 | SOLARMAX                   | CHOISIR LA MARQUE SPUTNIK
 HIP-210 NKHE1  |            2100 |      17 |           0 |    30 | SPUTNIK                    | SOLARMAX 2000S
 HIP-210 NKHE1  |            2940 |      17 |          45 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      20 |         -40 |    15 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      18 |          35 |    45 | SOLARMAX                   | CHOISIR LA MARQUE SPUTNIK
 HIP-210 NKHE1  |            2940 |      18 |          35 |    45 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2100 |      13 |           5 |    35 | SOLARMAX                   | CHOISIR LA MARQUE SPUTNIK
 HIP-210 NKHE1  |            2940 |      18 |          20 |    20 | SMA                        | SUNNY BOY 3300
 HIP-210 NKHE1  |            2940 |      18 |          15 |    45 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2940 |      17 |          60 |    45 | SOLARMAX                   | CHOISIR LA MARQUE SPUTNIK
 HIP-210 NKHE1  |            2940 |      18 |          25 |    20 | SMA                        | SUNNY BOY 2800
 HIP-210 NKHE1  |            2940 |      18 |         -80 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2730 |      16 |          30 |    40 | MASTERVOLT                 | SUNMASTER QS 3500
 HIP-210 NKHE1  |            2940 |      18 |          25 |    15 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      18 |          40 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2940 |      19 |         -25 |    20 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      17 |          45 |    15 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |         -90 |    15 | SPUTNIK                    | SOLARMAX 2000S
 HIP-210 NKHE1  |            2940 |      18 |          45 |    45 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      17 |          40 |    20 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2940 |      18 |         -90 |    20 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2940 |      20 |         -40 |    25 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |          40 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      20 |          20 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |         -20 |    20 | MASTERVOLT                 | SUNMASTER QS 3500
 HIP-210 NKHE1  |            2940 |      18 |         -20 |    45 | SPUTNIK                    | SOLARMAX SM3000S
 HIP-210 NKHE1  |            2940 |      18 |         110 |    20 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      18 |          30 |    15 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2940 |      18 |          20 |    15 | POWER-ONE                  | AURORA PVI-3.0
 HIP-210 NKHE1  |            2940 |      18 |         -35 |    35 | KOSTAL                     | PIKO 3.0
 HIP-210 NKHE1  |            2940 |      18 |         -30 |    25 | FRONIUS                    | IG 15
 HIP-210 NKHE1  |            2940 |      18 |          15 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |           5 |    15 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2940 |      18 |           0 |    40 | FRONIUS                    | IG 30
 HIP-210 NKHE1  |            2940 |      18 |          10 |    45 | SMA                        | SUNNY BOY 3000
 HIP-210 NKHE1  |            2940 |      18 |           0 |    20 | SOLUTRONIC                 | SOLPLUS 35
 HIP-210 NKHE1  |            2940 |      18 |         160 |    30 | PAS_DANS_LA_LISTE_ONDULEUR | PAS_DANS_LA_LISTE_ONDULEUR
 HIP-210 NKHE1  |            2940 |      18 |         -40 |    30 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |         -10 |    20 | SUNWAYS                    | AT 2700
 HIP-210 NKHE1  |            2940 |      18 |           0 |    20 | SMA                        | SUNNY BOY 3300 TL
 HIP-210 NKHE1  |            2940 |      22 |          -5 |    30 | SMA                        | SUNNY BOY 3000TL
 HIP-210 NKHE1  |            2940 |      17 |         -90 |    20 | SPUTNIK                    | SOLARMAX 3000S
 HIP-210 NKHE1  |            2940 |      18 |          45 |    15 | POWER-ONE                  | AURORA PVI-3.0
 HIP-210 NKHE1  |            2940 |      18 |           0 |    15 | PAS_DANS_LA_LISTE_ONDULEUR | PAS_DANS_LA_LISTE_ONDULEUR
 HIP-210 NKHE1  |            2520 |      20 |         -45 |    30 | POWER-ONE                  | AURORA PVI-3.0
 HIP-210 NKHE1  |            2940 |      35 |           0 |    35 | SMA                        | PV-WR 1500
 HIP-210 NKHE1  |            2940 |      19 |          25 |    20 | INGETEAM                   | INGECON SUN LITE  3TL
 HIP-210 NKHE1  |            2940 |      18 |         -15 |    15 | SMA                        | PV-WR 1500
 HIP-210 NKHE1  |            2940 |      18 |          45 |    20 | INGETEAM                   | INGECON SUN LITE  3TL
 HIP-210 NKHE1  |            2100 |      12 |          45 |    45 | SPUTNIK                    | SOLARMAX 2000S
 HIP-210 NKHE1  |            2940 |      19 |         -85 |    20 | AXUN                       | (VOIR MARQUE DIEHL)
 HIP-210 NKHE1  |            2520 |      10 |          50 |    15 | SCHNEIDER ELECTRIC         | SUNEZY 2800
 HIP-210 NKHE1  |            2940 |      18 |          45 |    15 | FRONIUS                    | IG 30
(100 rows)

