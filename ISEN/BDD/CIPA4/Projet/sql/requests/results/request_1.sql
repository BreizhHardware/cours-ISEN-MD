-- Query 1
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
-- Result
 puissance_crete_moyenne |    marque     |            modele             
-------------------------+---------------+-------------------------------
                 1801.57 | 3A ENERGIES   | SST-165-72-M
                 1179.27 | 3S            | FACADE MODUL
                17141.00 | 3S            | FACADE MODUL 183W
                 3094.00 | 3S            | SOLAR GEN. MEGASLATE (136WC)
                 2820.00 | 833 SOLAR     | 8.240M
                 2000.00 | 833 SOLAR     | 8.250M
                 9013.33 | 833 SOLAR     | 8.260M
                 7893.60 | A SOLAR       | JAM6-60-330 : 330W
                 3650.53 | ACTIVASUN     | SRS170 24M
                 1696.00 | ADVENT        | SOLAR 160
                 3276.00 | AEG           | ASM-M606B / 280W
                51585.00 | AEG           | ASM-M606B / 285W
                 3200.00 | AEG           | ASM-M606B / 300W
                 7125.00 | AEG           | ASM-M606B / 375W
                 2901.33 | AIDE SOLAR    | XZST-170/24V
                11556.00 | AIDE SOLAR    | XZST-180/24V
                 1173.33 | AIMEX         | GANYMED M-SERIE M220
                 3680.00 | AIMEX         | GANYMED M-SERIE M230
                 1687.50 | AKHTER        | AKHTER 135
                 3200.00 | AKHTER        | AKHTER 200
                 1575.00 | ALDEN         | ALD-175
                 3840.00 | ALDEN         | ALD-180
                 2160.00 | ALDEN         | ALD-240
                 3337.14 | ALEO          | ALEO 150 L
                  310.00 | ALEO          | ALEO 150 M
                 2475.00 | ALEO          | ALEO 150 XL
                 3177.50 | ALEO          | ALEO 200-6-L
                 1740.00 | ALEO          | ALEO S_02 / 145
                 2880.00 | ALEO          | ALEO S_02 / 160
                 2970.00 | ALEO          | ALEO S_02 / 165
                 2922.86 | ALEO          | ALEO S_03 / 165
                 2975.00 | ALEO          | ALEO S_03 / 175
                 2904.00 | ALEO          | ALEO S_16 / 165
                 7787.50 | ALEO          | ALEO S_16 / 175
                 2880.00 | ALEO          | ALEO S_16 / 180
                 5361.57 | ALEO          | ALEO S_16 / 185
                 4417.50 | ALEO          | ALEO S_16 / 190
                 4813.33 | ALEO          | ALEO S_17 (190) / 190W
                 3110.25 | ALEO          | ALEO S_17 (195) / 195W
                 2922.86 | ALEO          | ALEO S_17 / 165
                 2887.50 | ALEO          | ALEO S_17 / 175
                 3210.00 | ALEO          | ALEO S_17 / 180
                 5699.85 | ALEO          | ALEO S_17 / 185
                 5183.33 | ALEO          | ALEO S_17 / 200
                 3428.57 | ALEO          | ALEO S_18 (200)
                 2820.00 | ALEO          | ALEO S_18 (210)
                13616.67 | ALEO          | ALEO S_18 (215)
                36784.00 | ALEO          | ALEO S_18 (220)
                34987.50 | ALEO          | ALEO S_18 (225)
                14280.91 | ALEO          | ALEO S_18 (230)
                 5880.00 | ALEO          | ALEO S_18 (245)
                 7363.64 | ALEO          | ALEO S_18 (250)
                 2880.00 | ALEO          | ALEO S_18 / 240W
                 2420.00 | ALEO          | ALEO S_19 (220) / 220W
                 8400.00 | ALEO          | ALEO S_19 (240) / 240W
                 5320.00 | ALEO          | ALEO S_19 (245) / 245W
                 6175.00 | ALEO          | ALEO S_19 (285) / 285W
                 7250.00 | ALEO          | ALEO S_19 (290) / 290W
                 5318.18 | ALEO          | ALEO S_19 HE (300) / 300W
                 5683.33 | ALEO          | ALEO S_19 HE (310) / 310W
                 2887.50 | ALEO          | ALEO S_77 / 175
                 4095.00 | ALEO          | ALEO S_77 / 180
                 2899.77 | ALEO          | ALEO S_77 / 185
                 3261.67 | ALEO          | ALEO S_77 / 190
                 4921.43 | ALEO          | ALEO S_77 / 195
                 2860.00 | ALEO          | S_73 /165
                 2720.00 | ALEO          | S_73 /170
                 2880.00 | ALEO          | S_79 (240)  / 240W
                 5495.00 | ALEO          | S_79 (245)  / 245W
                 7329.55 | ALEO          | S_79 (250)  / 250W
                 7360.00 | ALEO          | S_79 (280)  / 280W
                 4554.55 | ALEO          | S_79 (300) / 300W
                 2986.67 | ALEO          | X59L320 / 320W
                 2497.50 | ALEX SOLAR    | ALM 185D 24
                19440.00 | ALEX SOLAR    | ALM-180D-24
                  945.00 | ALFASOLAR     | ALFASOLAR 100 EFG
                35000.00 | ALFASOLAR     | ALFASOLAR 170 P/175
                 2700.00 | ALFASOLAR     | ALFASOLAR 180 PQ 6L
                 2925.00 | ALFASOLAR     | ALFASOLAR 180 PQ 6LA (195)
                 3000.00 | ALFASOLAR     | ALFASOLAR 180 PQ 6LA (200)
                 2835.00 | ALFASOLAR     | ALFASOLAR 180 PQ 6LA (210)
                 2625.00 | ALFASOLAR     | ALFASOLAR 210 MQ 6L
                 3080.00 | ALFASOLAR     | ALFASOLAR 220 M6
                 4750.00 | ALFASOLAR     | ALFASOLAR 250 P
                13980.00 | ALFASOLAR     | ALFASOLAR PYRAMID 60 (233 WC)
                 2892.00 | ALFASOLAR     | ALFASOLAR PYRAMID 60 (241 WC)
                 2928.00 | ALFASOLAR     | ALFASOLAR PYRAMID 60 (244 WC)
                 2960.00 | ALFASOLAR     | ALFASOLAR PYRAMID 80 (296 WC)
                 2934.00 | ALFASOLAR     | ALFASOLAR PYRAMID 80 (326 WC)
                 2340.00 | ALFASOLAR     | PYRAMID 54 (195WC)
                 3000.00 | ALFASOLAR     | PYRAMID 54 (200WC)
                 2940.00 | ALFASOLAR     | PYRAMID 54 (210 WC)
                17415.00 | ALFASOLAR     | PYRAMID 54 (215WC)
                 2775.00 | ALGATEC SOLAR | ASM 185 / 185W
                 3000.00 | ALGATEC SOLAR | ASM 250
                 2370.45 | ALKASOL       | ALKA MFE 175
                 2814.55 | ALKASOL       | ALKA MFE 180
                 2877.78 | ALKASOL       | ALKA MFE 185
                 2960.00 | ALKASOL       | ALKA MFE 185-E
                 2590.00 | ALLIANTZ      | AL 185 / 185W
(100 rows)

