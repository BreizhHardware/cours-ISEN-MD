-- Query 12
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
-- Result
           region            | annee | puissance_totale |   puissance_moyenne    | nombre_installations 
-----------------------------+-------+------------------+------------------------+----------------------
 Auvergne-Rhône-Alpes       |  2023 |           133354 |     14817.111111111111 |                    9
 Nouvelle-Aquitaine          |  2023 |            20700 |  3450.0000000000000000 |                    6
 Occitanie                   |  2023 |            17720 |  3544.0000000000000000 |                    5
 Bretagne                    |  2023 |            17225 |  3445.0000000000000000 |                    5
 Île-de-France              |  2023 |            15000 |  5000.0000000000000000 |                    3
 Provence-Alpes-Côte d'Azur |  2023 |            14745 |  3686.2500000000000000 |                    4
 Hauts-de-France             |  2023 |            12815 |  4271.6666666666666667 |                    3
 Bourgogne-Franche-Comté    |  2023 |             5445 |  2722.5000000000000000 |                    2
 Grand Est                   |  2023 |             1712 |  1712.0000000000000000 |                    1
 Normandie                   |  2023 |              165 |   165.0000000000000000 |                    1
 Occitanie                   |  2022 |           663236 |  4197.6962025316455696 |                  160
 Auvergne-Rhône-Alpes       |  2022 |           636987 |  4393.0137931034482759 |                  148
 Nouvelle-Aquitaine          |  2022 |           541000 |  4398.3739837398373984 |                  123
 Provence-Alpes-Côte d'Azur |  2022 |           343355 |  3815.0555555555555556 |                   90
 Grand Est                   |  2022 |           217718 |  3298.7575757575757576 |                   66
 Bretagne                    |  2022 |           215710 |  4314.2000000000000000 |                   51
 Bourgogne-Franche-Comté    |  2022 |           148845 |  4510.4545454545454545 |                   33
 Centre-Val de Loire         |  2022 |           147680 |  3434.4186046511627907 |                   43
 Hauts-de-France             |  2022 |           129810 |  3018.8372093023255814 |                   44
 Île-de-France              |  2022 |           100550 |  3243.5483870967741935 |                   31
 Normandie                   |  2022 |            89817 |  2897.3225806451612903 |                   31
 Corse                       |  2022 |            11920 |  3973.3333333333333333 |                    3
 Auvergne-Rhône-Alpes       |  2021 |           520965 |  4007.4230769230769231 |                  130
 Occitanie                   |  2021 |           501745 |  3950.7480314960629921 |                  131
 Nouvelle-Aquitaine          |  2021 |           393038 |  4852.3209876543209877 |                   84
 Provence-Alpes-Côte d'Azur |  2021 |           329005 |  4329.0131578947368421 |                   76
 Grand Est                   |  2021 |           215055 |  4135.6730769230769231 |                   55
 Bourgogne-Franche-Comté    |  2021 |           127380 |  5307.5000000000000000 |                   24
 Centre-Val de Loire         |  2021 |           103455 |  4498.0434782608695652 |                   23
 Hauts-de-France             |  2021 |            87570 |  3368.0769230769230769 |                   26
 Normandie                   |  2021 |            75475 |  4193.0555555555555556 |                   18
 Bretagne                    |  2021 |            64115 |  5828.6363636363636364 |                   11
 Île-de-France              |  2021 |            63000 |  3150.0000000000000000 |                   20
 Occitanie                   |  2020 |           715951 |  6067.3813559322033898 |                  120
 Auvergne-Rhône-Alpes       |  2020 |           445722 |  3944.4424778761061947 |                  114
 Nouvelle-Aquitaine          |  2020 |           341101 |  4263.7625000000000000 |                   81
 Grand Est                   |  2020 |           271027 |  7743.6285714285714286 |                   35
 Provence-Alpes-Côte d'Azur |  2020 |           215750 |  3785.0877192982456140 |                   57
 Bourgogne-Franche-Comté    |  2020 |           170745 |  6567.1153846153846154 |                   27
 Normandie                   |  2020 |           146360 |  9757.3333333333333333 |                   15
 Bretagne                    |  2020 |            69975 |  2691.3461538461538462 |                   29
 Île-de-France              |  2020 |            63825 |  2775.0000000000000000 |                   23
 Centre-Val de Loire         |  2020 |            58970 |  3276.1111111111111111 |                   19
 Hauts-de-France             |  2020 |            44738 |  2796.1250000000000000 |                   17
 Corse                       |  2020 |             2480 |  2480.0000000000000000 |                    1
 Nouvelle-Aquitaine          |  2019 |           496786 |  7305.6764705882352941 |                   70
 Occitanie                   |  2019 |           415406 |  4327.1458333333333333 |                   96
 Provence-Alpes-Côte d'Azur |  2019 |           258651 |  4310.8500000000000000 |                   62
 Auvergne-Rhône-Alpes       |  2019 |           233375 |  3153.7162162162162162 |                   76
 Bretagne                    |  2019 |           149610 |  7124.2857142857142857 |                   22
 Bourgogne-Franche-Comté    |  2019 |            97215 |  3888.6000000000000000 |                   25
 Centre-Val de Loire         |  2019 |            80600 |  4477.7777777777777778 |                   18
 Grand Est                   |  2019 |            77475 |  3521.5909090909090909 |                   23
 Hauts-de-France             |  2019 |            74040 |  3525.7142857142857143 |                   21
 Normandie                   |  2019 |            73245 |  4308.5294117647058824 |                   17
 Île-de-France              |  2019 |            49320 |  2595.7894736842105263 |                   20
 Corse                       |  2019 |             8740 |  4370.0000000000000000 |                    2
 Occitanie                   |  2018 |           409363 |  3898.6952380952380952 |                  106
 Nouvelle-Aquitaine          |  2018 |           360042 |  5539.1076923076923077 |                   66
 Auvergne-Rhône-Alpes       |  2018 |           337087 |  4617.6301369863013699 |                   73
 Provence-Alpes-Côte d'Azur |  2018 |           204198 |  4980.4390243902439024 |                   41
 Bourgogne-Franche-Comté    |  2018 |           200860 |  9130.0000000000000000 |                   23
 Île-de-France              |  2018 |           145630 |  8090.5555555555555556 |                   18
 Grand Est                   |  2018 |            82630 |  4131.5000000000000000 |                   21
 Hauts-de-France             |  2018 |            75350 |  3139.5833333333333333 |                   25
 Bretagne                    |  2018 |            53223 |  4094.0769230769230769 |                   13
 Normandie                   |  2018 |            48690 |  3246.0000000000000000 |                   15
 Centre-Val de Loire         |  2018 |            47160 |  4287.2727272727272727 |                   11
 Bretagne                    |  2017 |           554740 |     27737.000000000000 |                   20
 Occitanie                   |  2017 |           459188 |  6041.9473684210526316 |                   78
 Auvergne-Rhône-Alpes       |  2017 |           379694 |  5131.0000000000000000 |                   74
 Nouvelle-Aquitaine          |  2017 |           262411 |  4859.4629629629629630 |                   55
 Grand Est                   |  2017 |           129667 |  4182.8064516129032258 |                   32
 Provence-Alpes-Côte d'Azur |  2017 |           124297 |  3359.3783783783783784 |                   37
 Bourgogne-Franche-Comté    |  2017 |            78590 |  3929.5000000000000000 |                   21
 Île-de-France              |  2017 |            71471 |  3248.6818181818181818 |                   22
 Hauts-de-France             |  2017 |            65900 |  3468.4210526315789474 |                   19
 Centre-Val de Loire         |  2017 |            51630 |  5163.0000000000000000 |                   10
 Normandie                   |  2017 |            46704 |  3336.0000000000000000 |                   14
 Normandie                   |  2016 |           399670 |     23510.000000000000 |                   17
 Provence-Alpes-Côte d'Azur |  2016 |           347404 |  8907.7948717948717949 |                   40
 Auvergne-Rhône-Alpes       |  2016 |           267403 |  5348.0600000000000000 |                   50
 Occitanie                   |  2016 |           243802 |  4203.4827586206896552 |                   59
 Nouvelle-Aquitaine          |  2016 |           213348 |  4741.0666666666666667 |                   46
 Centre-Val de Loire         |  2016 |           165695 | 10355.9375000000000000 |                   17
 Grand Est                   |  2016 |           122428 |  3949.2903225806451613 |                   31
 Bourgogne-Franche-Comté    |  2016 |            99490 |  6218.1250000000000000 |                   16
 Bretagne                    |  2016 |            95870 |  4793.5000000000000000 |                   20
 Hauts-de-France             |  2016 |            36650 |  3665.0000000000000000 |                   10
 Île-de-France              |  2016 |            15650 |  3130.0000000000000000 |                    5
 Auvergne-Rhône-Alpes       |  2015 |           279683 |  5277.0377358490566038 |                   54
 Nouvelle-Aquitaine          |  2015 |           230114 |  6574.6857142857142857 |                   37
 Occitanie                   |  2015 |           207480 |  4610.6666666666666667 |                   46
 Provence-Alpes-Côte d'Azur |  2015 |           166061 |  5189.4062500000000000 |                   32
 Bretagne                    |  2015 |           134995 |  5869.3478260869565217 |                   24
 Grand Est                   |  2015 |           118660 |  5933.0000000000000000 |                   22
 Bourgogne-Franche-Comté    |  2015 |            84026 |  4942.7058823529411765 |                   17
 Hauts-de-France             |  2015 |            62757 |  5229.7500000000000000 |                   12
 Normandie                   |  2015 |            45326 |  4532.6000000000000000 |                   10
 Île-de-France              |  2015 |            29940 |  4277.1428571428571429 |                    7
(100 rows)

           commune            | code_postal |      departement      |           region            | nombre_installations | puissance_totale | puissance_moyenne | densite_puissance_par_habitant 
------------------------------+-------------+-----------------------+-----------------------------+----------------------+------------------+-------------------+--------------------------------
 La Grève-sur-Mignon         | 17170       | Charente-Maritime     | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Saint-Vincent-Rive-d'Olt     | 46140       | Lot                   | Occitanie                   |                    1 |                  |                   |                               
 Jaillans                     | 26300       | Drôme                | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Charleville-Mézières       | 8000        | Ardennes              | Grand Est                   |                    1 |                  |                   |                               
 Le Fresne                    | 51240       | Marne                 | Grand Est                   |                    1 |                  |                   |                               
 Saint-Sulpice-d'Arnoult      | 17250       | Charente-Maritime     | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Belesta                      | 66720       | Pyrénées-Orientales | Occitanie                   |                    1 |                  |                   |                               
 Sotteville-Sous-le-Val       | 76410       | Seine-Maritime        | Normandie                   |                    1 |                  |                   |                               
 Haussonville                 | 54290       | Meurthe-et-Moselle    | Grand Est                   |                    1 |                  |                   |                               
 Taden                        | 22100       | Côtes-d'Armor        | Bretagne                    |                    1 |                  |                   |                               
 La Penne                     | 6260        | Alpes-Maritimes       | Provence-Alpes-Côte d'Azur |                    1 |                  |                   |                               
 Nouzonville                  | 8700        | Ardennes              | Grand Est                   |                    1 |                  |                   |                               
 Oris-en-Rattier              | 38350       | Isère                | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Vivières                    | 2600        | Aisne                 | Hauts-de-France             |                    1 |                  |                   |                               
 Cherves-Richemont            | 16370       | Charente              | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Vercia                       | 39160       | Jura                  | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Évry                        | 91080       | Essonne               | Île-de-France              |                    1 |                  |                   |                               
 Busigny                      | 59137       | Nord                  | Hauts-de-France             |                    1 |                  |                   |                               
 Cesset                       | 3500        | Allier                | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Notre-Dame-d'Elle            | 50810       | Manche                | Normandie                   |                    1 |                  |                   |                               
 Saint-Agnan                  | 71160       | Saône-et-Loire       | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Saint-Martin-Lacaussade      | 33390       | Gironde               | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Renwez                       | 8150        | Ardennes              | Grand Est                   |                    1 |                  |                   |                               
 Chardonnay                   | 71700       | Saône-et-Loire       | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Saint-Maurice-la-Souterraine | 23300       | Creuse                | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Quemper-Guézennec           | 22260       | Côtes-d'Armor        | Bretagne                    |                    1 |                  |                   |                               
 Feillens                     | 1570        | Ain                   | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Rosny-sur-Seine              | 78710       | Yvelines              | Île-de-France              |                    1 |                  |                   |                               
 Sales                        | 74150       | Haute-Savoie          | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Troisvilles                  | 59980       | Nord                  | Hauts-de-France             |                    1 |                  |                   |                               
 Manin                        | 62810       | Pas-de-Calais         | Hauts-de-France             |                    1 |                  |                   |                               
 La ville-Dieu-du-Temple      | 82290       | Tarn-et-Garonne       | Occitanie                   |                    1 |                  |                   |                               
 Happonvilliers               | 28480       | Eure-et-Loir          | Centre-Val de Loire         |                    1 |                  |                   |                               
 Le Vézier                   | 51210       | Marne                 | Grand Est                   |                    1 |                  |                   |                               
 Franclens                    | 74910       | Haute-Savoie          | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Alligny-Cosne                | 58200       | Nièvre               | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Ohnenheim                    | 67390       | Bas-Rhin              | Grand Est                   |                    1 |                  |                   |                               
 Sumène                      | 30440       | Gard                  | Occitanie                   |                    1 |                  |                   |                               
 Varennes-sur-Seine           | 77130       | Seine-et-Marne        | Île-de-France              |                    1 |                  |                   |                               
 Beaugency                    | 45190       | Loiret                | Centre-Val de Loire         |                    1 |                  |                   |                               
 Quédillac                   | 35290       | Ille-et-Vilaine (35)  | Bretagne                    |                    1 |                  |                   |                               
 Vescovato                    | 20215       | Haute-Corse           | Corse                       |                    1 |                  |                   |                               
 Loscouët-sur-Meu            | 22230       | Côtes-d'Armor        | Bretagne                    |                    1 |                  |                   |                               
 Gigny-sur-Saône             | 71240       | Saône-et-Loire       | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Saint-Maurice-lès-Couches   | 71490       | Saône-et-Loire       | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Jully-sur-Sarce              | 10260       | Aube                  | Grand Est                   |                    1 |                  |                   |                               
 Étueffont                   | 90170       | Territoire de Belfort | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Sauveterre-de-Comminges      | 31510       | Haute-Garonne         | Occitanie                   |                    1 |                  |                   |                               
 Marolles-en-Brie             | 77120       | Seine-et-Marne        | Île-de-France              |                    1 |                  |                   |                               
 Azay-le-Ferron               | 36290       | Indre                 | Centre-Val de Loire         |                    1 |                  |                   |                               
 Anceins                      | 61370       | Orne                  | Normandie                   |                    1 |                  |                   |                               
 La Bouteille                 | 2140        | Aisne                 | Hauts-de-France             |                    1 |                  |                   |                               
 Nemours                      | 77140       | Seine-et-Marne        | Île-de-France              |                    1 |                  |                   |                               
 La Trinité-sur-Mer          | 56470       | Morbihan              | Bretagne                    |                    1 |                  |                   |                               
 Rouillé                     | 86480       | Vienne                | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Villethierry                 | 89140       | Yonne                 | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Saint-Félix-de-Pallières   | 30140       | Gard                  | Occitanie                   |                    1 |                  |                   |                               
 Saint-Denis-de-l'Hôtel      | 45550       | Loiret                | Centre-Val de Loire         |                    1 |                  |                   |                               
 Copponex                     | 74350       | Haute-Savoie          | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Saint-Pierre-lès-Nemours    | 77140       | Seine-et-Marne        | Île-de-France              |                    1 |                  |                   |                               
 Pressac                      | 86460       | Vienne                | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Voyenne                      | 2250        | Aisne                 | Hauts-de-France             |                    1 |                  |                   |                               
 Rodelinghem                  | 62610       | Pas-de-Calais         | Hauts-de-France             |                    1 |                  |                   |                               
 Willer                       | 68960       | Haut-Rhin             | Grand Est                   |                    1 |                  |                   |                               
 Mignovillard                 | 39250       | Jura                  | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Conchy-les-Pots              | 60490       | Oise                  | Hauts-de-France             |                    1 |                  |                   |                               
 Villemurlin                  | 45600       | Loiret                | Centre-Val de Loire         |                    1 |                  |                   |                               
 Chilly-sur-Salins            | 39110       | Jura                  | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Bourgneuf                    | 73390       | Savoie                | Auvergne-Rhône-Alpes       |                    1 |                  |                   |                               
 Le Coudray-Saint-Germer      | 60850       | Oise                  | Hauts-de-France             |                    1 |                  |                   |                               
 Quevillon                    | 76840       | Seine-Maritime        | Normandie                   |                    1 |                  |                   |                               
 Clémencey                   | 21220       | Côte-d'Or            | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Crapeaumesnil                | 60310       | Oise                  | Hauts-de-France             |                    1 |                  |                   |                               
 Volgelsheim                  | 68600       | Haut-Rhin             | Grand Est                   |                    1 |                  |                   |                               
 Chaussin                     | 39120       | Jura                  | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 La Résie-Saint-Martin       | 70140       | Haute-Saône          | Bourgogne-Franche-Comté    |                    2 |                  |                   |                               
 Plounérin                   | 22780       | Côtes-d'Armor        | Bretagne                    |                    1 |                  |                   |                               
 Huismes                      | 37420       | Indre-et-Loire        | Centre-Val de Loire         |                    1 |                  |                   |                               
 Benassay                     | 86200       | Vienne                | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Montpeyroux                  | 12210       | Aveyron               | Occitanie                   |                    1 |                  |                   |                               
 Sorel                        | 80240       | Somme                 | Hauts-de-France             |                    1 |                  |                   |                               
 Plouguernével               | 22110       | Côtes-d'Armor        | Bretagne                    |                    1 |                  |                   |                               
 Saint-Quentin-les-Marais     | 51300       | Marne                 | Grand Est                   |                    1 |                  |                   |                               
 Les Mureaux                  | 78130       | Yvelines              | Île-de-France              |                    1 |                  |                   |                               
 Tuzaguet                     | 65150       | Hautes-Pyrénées     | Occitanie                   |                    1 |                  |                   |                               
 La Brousse                   | 17160       | Charente-Maritime     | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Auxon                        | 70000       | Haute-Saône          | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Béthisy-Saint-Pierre        | 60320       | Oise                  | Hauts-de-France             |                    1 |                  |                   |                               
 Saint-André-sur-Orne        | 14320       | Calvados              | Normandie                   |                    1 |                  |                   |                               
 Belleneuve                   | 21310       | Côte-d'Or            | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Clohars-Carnoët             | 29360       | Finistère            | Bretagne                    |                    1 |                  |                   |                               
 Foncine-le-Haut              | 39460       | Jura                  | Bourgogne-Franche-Comté    |                    1 |                  |                   |                               
 Vivaise                      | 2870        | Aisne                 | Hauts-de-France             |                    1 |                  |                   |                               
 Saint-Astier                 | 24110       | Dordogne              | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Neuvic                       | 24190       | Dordogne              | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Biache-Saint-Vaast           | 62118       | Pas-de-Calais         | Hauts-de-France             |                    1 |                  |                   |                               
 Saint-Pastour                | 47290       | Lot-et-Garonne        | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Fermanville                  | 50840       | Manche                | Normandie                   |                    1 |                  |                   |                               
 Arsague                      | 40330       | Landes                | Nouvelle-Aquitaine          |                    1 |                  |                   |                               
 Cuperly                      | 51400       | Marne                 | Grand Est                   |                    1 |                  |                   |                               
(100 rows)

      marque_onduleur       | nombre_installations | total_onduleurs | moyenne_onduleurs_par_installation | puissance_totale_installations | puissance_moyenne_par_installation 
----------------------------+----------------------+-----------------+------------------------------------+--------------------------------+------------------------------------
 SMA                        |                 8119 |            9853 |                 1.2135731001354847 |                       38279243 |              4734.6002473716759431
 FRONIUS                    |                 1723 |            1909 |                 1.1079512478235636 |                        7293673 |              4257.8359603035610041
 SPUTNIK                    |                 1613 |            1767 |                 1.0954742715437074 |                        7385978 |              4590.4151646985705407
 ENPHASE ENERGY             |                 1333 |           14780 |                11.0877719429857464 |                        4690261 |              3545.1708238851095994
 POWER-ONE                  |                 1278 |            1465 |                 1.1463223787167449 |                        5856689 |              4626.1366508688783570
 MASTERVOLT                 |                 1065 |            1169 |                 1.0976525821596244 |                        3926901 |              3729.2507122507122507
 SCHNEIDER ELECTRIC         |                  832 |            1057 |                 1.2704326923076923 |                        3396316 |              4250.7083854818523154
 APS - APSYSTEMS            |                  451 |            1926 |                 4.2705099778270510 |                        1324273 |              2975.8943820224719101
 SOLAREDGE                  |                  426 |             733 |                 1.7206572769953052 |                        2694929 |              6341.0094117647058824
 KACO                       |                  359 |             438 |                 1.2200557103064067 |                        2971374 |              8441.4034090909090909
 PHOTOWATT                  |                  298 |             357 |                 1.1979865771812081 |                        1112192 |              3732.1879194630872483
 CONERGY                    |                  270 |             302 |                 1.1185185185185185 |                         871880 |              3253.2835820895522388
 KOSTAL                     |                  261 |             367 |                 1.4061302681992337 |                        1663352 |              6472.1867704280155642
 TENESOL                    |                  247 |             298 |                 1.2064777327935223 |                        1279742 |              5202.2032520325203252
 PAS_DANS_LA_LISTE_ONDULEUR |                  227 |             551 |                 2.4273127753303965 |                         829463 |              6380.4846153846153846
 DELTA ENERGY               |                  205 |             251 |                 1.2243902439024390 |                         770960 |              3874.1708542713567839
 DANFOSS                    |                  201 |             260 |                 1.2935323383084577 |                        1272845 |              6396.2060301507537688
 DIEHL AKO                  |                  167 |             194 |                 1.1616766467065868 |                         740662 |              4435.1017964071856287
 ABB                        |                  157 |             318 |                 2.0254777070063694 |                         774272 |              4931.6687898089171975
 SCHUCO                     |                  153 |             168 |                 1.0980392156862745 |                         444022 |              2921.1973684210526316
 EFFEKTA                    |                  137 |             165 |                 1.2043795620437956 |                         439430 |              3460.0787401574803150
 INGETEAM                   |                  130 |             153 |                 1.1769230769230769 |                         508735 |              4069.8800000000000000
 POWERSTOC                  |                  121 |             122 |                 1.0082644628099174 |                         351319 |              2927.6583333333333333
 SOLARMAX                   |                  118 |             128 |                 1.0847457627118644 |                         455043 |              3956.8956521739130435
 SUNPOWER                   |                  108 |             254 |                 2.3518518518518519 |                         400663 |              3744.5140186915887850
 STECA                      |                  104 |             213 |                 2.0480769230769231 |                         307426 |              3043.8217821782178218
 OMNIK                      |                  100 |             197 |                 1.9700000000000000 |                         293068 |              2990.4897959183673469
 SOLARSTOCC                 |                   94 |              95 |                 1.0106382978723404 |                         263933 |              2807.7978723404255319
 EATON CORPORATION          |                   93 |             120 |                 1.2903225806451613 |                         303541 |              3488.9770114942528736
 HOYMILES                   |                   88 |             266 |                 3.0227272727272727 |                         163030 |              1852.6136363636363636
 SOLAX                      |                   82 |             156 |                 1.9024390243902439 |                         277391 |              3424.5802469135802469
 SOLAIRE DIRECT             |                   81 |              96 |                 1.1851851851851852 |                         255290 |              3191.1250000000000000
 BOURGEOISGLOBAL            |                   67 |             507 |                 7.5671641791044776 |                         243190 |              3629.7014925373134328
 GROWATT                    |                   65 |              69 |                 1.0615384615384615 |                         216380 |              3434.6031746031746032
 SOLAR                      |                   60 |              83 |                 1.3833333333333333 |                         228186 |              3803.1000000000000000
 SUNNY SWISS                |                   54 |              66 |                 1.2222222222222222 |                         191533 |              3683.3269230769230769
 HUAWEI                     |                   45 |              53 |                 1.1777777777777778 |                         872160 |                 19821.818181818182
 WURTH SOLAR                |                   43 |              45 |                 1.0465116279069767 |                         123620 |              2874.8837209302325581
 AUNILEC                    |                   37 |              49 |                 1.3243243243243243 |                         101318 |              2814.3888888888888889
 WKS                        |                   37 |              48 |                 1.2972972972972973 |                         124855 |              3468.1944444444444444
 AINELEC                    |                   34 |              48 |                 1.4117647058823529 |                         120191 |              3535.0294117647058824
 SUNWAYS                    |                   33 |              39 |                 1.1818181818181818 |                         119735 |              3741.7187500000000000
 GENERAL ELECTRIC           |                   32 |              40 |                 1.2500000000000000 |                         116170 |              3872.3333333333333333
 AEG                        |                   31 |             149 |                 4.8064516129032258 |                          84600 |              2917.2413793103448276
 AERO SHARP                 |                   30 |              46 |                 1.5333333333333333 |                          82374 |              2745.8000000000000000
 SOLAXPOWER                 |                   28 |              28 |             1.00000000000000000000 |                          74362 |              2655.7857142857142857
 SIEMENS                    |                   28 |              60 |                 2.1428571428571429 |                         345340 |                 12333.571428571429
 SOCOMEC                    |                   26 |              30 |                 1.1538461538461538 |                          76786 |              3199.4166666666666667
 IBC SOLAR                  |                   25 |              33 |                 1.3200000000000000 |                         174893 |              7287.2083333333333333
 ENECSYS                    |                   25 |             298 |                11.9200000000000000 |                         121074 |              4842.9600000000000000
 MITSUBISHI                 |                   25 |              58 |                 2.3200000000000000 |                          66651 |              2897.8695652173913043
 VICTRON                    |                   23 |              24 |                 1.0434782608695652 |                          81330 |              3696.8181818181818182
 AXUN                       |                   19 |              43 |                 2.2631578947368421 |                         177827 |              9359.3157894736842105
 ACE                        |                   17 |              29 |                 1.7058823529411765 |                         141492 |              9432.8000000000000000
 SOLARWORLD                 |                   15 |              27 |                 1.8000000000000000 |                          50817 |              3387.8000000000000000
 DURALUX                    |                   15 |              27 |                 1.8000000000000000 |                          39830 |              2845.0000000000000000
 AURORA                     |                   15 |              16 |                 1.0666666666666667 |                          45461 |              3030.7333333333333333
 INFOSEC                    |                   14 |              19 |                 1.3571428571428571 |                          40121 |              3343.4166666666666667
 THOMSON                    |                   14 |              20 |                 1.4285714285714286 |                          55960 |              4304.6153846153846154
 SOFAR SOLAR                |                   14 |              27 |                 1.9285714285714286 |                          43025 |              3073.2142857142857143
 SUNGROW                    |                   13 |              19 |                 1.4615384615384615 |                         142245 |                 11853.750000000000
 TOTAL ENERGIE              |                   13 |              24 |                 1.8461538461538462 |                          54560 |              4196.9230769230769231
 AECONVERSION               |                   13 |              35 |                 2.6923076923076923 |                          13619 |              1047.6153846153846154
 SANYO                      |                   13 |              30 |                 2.3076923076923077 |                          38712 |              3226.0000000000000000
 SOLAR-FABRIK               |                   12 |              24 |                 2.0000000000000000 |                         235972 |                 19664.333333333333
 KINGLONG                   |                   10 |              10 |             1.00000000000000000000 |                          27460 |              2746.0000000000000000
 AIXCON                     |                   10 |              31 |                 3.1000000000000000 |                          42330 |              4703.3333333333333333
 REFU                       |                    9 |              33 |                 3.6666666666666667 |                         515735 |                 57303.888888888889
 SOLUTRONIC                 |                    8 |               8 |             1.00000000000000000000 |                          16320 |              2331.4285714285714286
 ENVERTECH                  |                    8 |              22 |                 2.7500000000000000 |                           9440 |              1348.5714285714285714
 UBBINK                     |                    8 |               9 |                 1.1250000000000000 |                          22495 |              2811.8750000000000000
 MPP SOLAR                  |                    8 |               8 |             1.00000000000000000000 |                          24885 |              3110.6250000000000000
 SUNSET                     |                    7 |               7 |             1.00000000000000000000 |                          16065 |              2295.0000000000000000
 BEON ENERGY                |                    7 |              16 |                 2.2857142857142857 |                           4945 |               824.1666666666666667
 BP SOLAR / TRACE           |                    7 |              19 |                 2.7142857142857143 |                          33210 |              6642.0000000000000000
 GRID TIE INVERTER          |                    7 |               9 |                 1.2857142857142857 |                           5800 |               828.5714285714285714
 IBC SOLAR AG               |                    6 |               8 |                 1.3333333333333333 |                          58920 |              9820.0000000000000000
 SUNSYS                     |                    6 |               6 |             1.00000000000000000000 |                          14970 |              2495.0000000000000000
 GE ENERGY                  |                    6 |              44 |                 7.3333333333333333 |                          17754 |              2959.0000000000000000
 SOLADIN                    |                    6 |               7 |                 1.1666666666666667 |                          10930 |              2186.0000000000000000
 GINLONG                    |                    6 |               7 |                 1.1666666666666667 |                          19082 |              3180.3333333333333333
 CARLO GAVAZZI              |                    6 |              10 |                 1.6666666666666667 |                          20730 |              4146.0000000000000000
 SOLON AG                   |                    6 |               6 |             1.00000000000000000000 |                          19230 |              3205.0000000000000000
 EVERSOL                    |                    5 |              12 |                 2.4000000000000000 |                          35210 |              7042.0000000000000000
 STUDER                     |                    5 |              12 |                 2.4000000000000000 |                          13270 |              2654.0000000000000000
 VOLTRONIC POWER            |                    5 |               5 |             1.00000000000000000000 |                          18890 |              3778.0000000000000000
 INVOLAR                    |                    5 |              61 |                12.2000000000000000 |                          13534 |              3383.5000000000000000
 VOLTEA                     |                    5 |               5 |             1.00000000000000000000 |                           8990 |              1798.0000000000000000
 ASP                        |                    5 |              17 |                 3.4000000000000000 |                          12030 |              2406.0000000000000000
 BAHRMANN                   |                    5 |              28 |                 5.6000000000000000 |                         102825 |                 20565.000000000000
 SAMIL POWER                |                    5 |               5 |             1.00000000000000000000 |                          18992 |              3798.4000000000000000
 IMEON                      |                    5 |               6 |                 1.2000000000000000 |                          25650 |              5130.0000000000000000
 SHARP                      |                    5 |              17 |                 3.4000000000000000 |                         103245 |                 20649.000000000000
 TALESUN                    |                    5 |              18 |                 3.6000000000000000 |                          13420 |              2684.0000000000000000
 SUNTECHNICS                |                    5 |               8 |                 1.6000000000000000 |                          12240 |              3060.0000000000000000
 NEDAP ENERGY               |                    4 |               5 |                 1.2500000000000000 |                           9470 |              2367.5000000000000000
 LTI                        |                    4 |              14 |                 3.5000000000000000 |                         228840 |                 76280.000000000000
 ALPHA                      |                    4 |              19 |                 4.7500000000000000 |                          16995 |              4248.7500000000000000
 OPTI-SOLAR                 |                    4 |              13 |                 3.2500000000000000 |                          22880 |              5720.0000000000000000
 EVERLIGHT                  |                    4 |              23 |                 5.7500000000000000 |                          21120 |              5280.0000000000000000
(100 rows)

           region            |       departement       | nombre_installations |   orientation_moyenne   | orientation_min | orientation_max | orientation_ecart_type |    pente_moyenne    | pente_min | pente_max |  pente_ecart_type   
-----------------------------+-------------------------+----------------------+-------------------------+-----------------+-----------------+------------------------+---------------------+-----------+-----------+---------------------
 Auvergne-Rhône-Alpes       |                         |                 4183 |     -1.4152522113315802 |            -180 |             180 |    49.9849850886829588 | 26.0064546975854650 |         0 |        90 |  9.0128876551339683
 Auvergne-Rhône-Alpes       | Ain                     |                  331 |  0.81570996978851963746 |            -180 |             180 |    52.1544837640196104 | 26.0725075528700906 |         5 |        90 |  9.6678567426371654
 Auvergne-Rhône-Alpes       | Allier                  |                  193 |     -1.3730569948186528 |            -100 |             150 |    37.6947125420388769 | 33.6269430051813472 |        10 |        90 |  9.4127406721037597
 Auvergne-Rhône-Alpes       | Ardèche                |                  233 |     -1.0729613733905579 |            -170 |             150 |    45.0326394874840581 | 22.2746781115879828 |        10 |        60 |  7.2648244991671937
 Auvergne-Rhône-Alpes       | Cantal                  |                   42 |     -4.7619047619047619 |            -165 |              90 |    50.5572891773908131 | 27.2619047619047619 |        10 |        60 | 10.1334017205345643
 Auvergne-Rhône-Alpes       | Drôme                  |                  406 |     -3.6330049261083744 |            -180 |             180 |    50.6797331527071609 | 22.5000000000000000 |         5 |        45 |  7.2243586583648626
 Auvergne-Rhône-Alpes       | Haute-Loire             |                  122 |     -1.8442622950819672 |            -180 |             180 |    54.4438478628435197 | 24.7131147540983607 |         5 |        50 |  7.9849854020542947
 Auvergne-Rhône-Alpes       | Haute-Savoie            |                  269 |      3.9776951672862454 |            -180 |             180 |    52.0169270013898872 | 29.6096654275092937 |         0 |        90 |  8.9012020968092047
 Auvergne-Rhône-Alpes       | Isère                  |                  907 |     -1.8467475192943771 |            -180 |             180 |    47.6272745646446862 | 27.2712238147739802 |         0 |        90 |  9.0449746357117240
 Auvergne-Rhône-Alpes       | Loire                   |                  383 |  0.26109660574412532637 |            -180 |             130 |    51.0664768046961470 | 24.5561357702349869 |         5 |        90 |  9.0843261658351606
 Auvergne-Rhône-Alpes       | Puy-de-Dôme            |                  477 |     -4.3815513626834382 |            -180 |             180 |    50.7980959258224364 | 24.6750524109014675 |         0 |        70 |  7.9750968914439902
 Auvergne-Rhône-Alpes       | Rhône                  |                  547 |     -1.3162705667276051 |            -180 |             180 |    52.1155430400460665 | 23.7934186471663620 |         5 |        60 |  7.4499128872564849
 Auvergne-Rhône-Alpes       | Savoie                  |                  273 |     -1.6849816849816850 |            -180 |             180 |    54.1978574443876271 | 30.3663003663003663 |         0 |        90 |  9.5704373946102525
 Bourgogne-Franche-Comté    |                         |                 1028 |     -4.2607003891050584 |            -180 |             180 |    50.0767486164181543 | 33.6770428015564202 |         0 |        90 | 10.1785796719572058
 Bourgogne-Franche-Comté    | Côte-d'Or              |                  169 |     -7.6035502958579882 |            -175 |             120 |    46.6690754822504598 | 35.1183431952662722 |         5 |        60 |  9.1929168955333533
 Bourgogne-Franche-Comté    | Doubs                   |                  220 | -0.02272727272727272727 |            -180 |             170 |    48.5485628153102954 | 33.5681818181818182 |         5 |        60 |  8.8037915432822156
 Bourgogne-Franche-Comté    | Haute-Saône            |                  101 |  0.04950495049504950495 |            -180 |              90 |    46.4623237123637118 | 32.7722772277227723 |        10 |        50 |  8.3509055654088340
 Bourgogne-Franche-Comté    | Jura                    |                  118 |     -1.3559322033898305 |            -180 |             180 |    56.1045308625925830 | 33.9406779661016949 |        10 |        80 | 10.3538195379102934
 Bourgogne-Franche-Comté    | Nièvre                 |                   54 |     -4.8148148148148148 |            -120 |              90 |    42.7251302808104871 | 33.7037037037037037 |         5 |        60 | 11.5817514718558471
 Bourgogne-Franche-Comté    | Saône-et-Loire         |                  217 |     -9.7695852534562212 |            -180 |             145 |    55.8183428990314581 | 31.1751152073732719 |         0 |        90 | 12.0330073867289395
 Bourgogne-Franche-Comté    | Territoire de Belfort   |                   59 |     -4.2372881355932203 |            -145 |              95 |    46.1333670041509586 | 37.7118644067796610 |        10 |        60 |  9.3459392757932430
 Bourgogne-Franche-Comté    | Yonne                   |                   90 |     -3.3888888888888889 |            -180 |              90 |    47.4745808850613731 | 35.2777777777777778 |         5 |        65 | 10.2046781272316228
 Bretagne                    |                         |                 1465 |     -3.0170648464163823 |            -180 |             180 |    43.0010211895741135 | 38.2047781569965870 |         0 |        90 | 11.0984345913135260
 Bretagne                    | Côtes-d'Armor          |                  174 |     -3.2758620689655172 |            -180 |             180 |    46.0291914551575318 | 37.0114942528735632 |         0 |        65 | 12.1279253098283891
 Bretagne                    | Finistère              |                  467 |     -1.4346895074946467 |            -180 |             180 |    38.8374171941603085 | 38.7366167023554604 |         0 |        75 | 10.6851752276045121
 Bretagne                    | Ille-et-Vilaine (35)    |                  485 |     -4.0824742268041237 |            -180 |             180 |    44.3168228470180738 | 37.9690721649484536 |         0 |        90 | 11.2700268102002623
 Bretagne                    | Morbihan                |                  339 |     -3.5398230088495575 |            -180 |             135 |    45.0263634933583891 | 38.4218289085545723 |         0 |        90 | 10.8487010737872482
 Centre-Val de Loire         |                         |                  763 |     -1.2319790301441678 |            -180 |             180 |    47.1029745302285577 | 36.5137614678899083 |         0 |        90 |  9.2093332140546259
 Centre-Val de Loire         | Cher                    |                   93 |     -2.2580645161290323 |            -180 |             160 |    55.4209000024607048 | 34.7311827956989247 |         5 |        50 |  8.8883653617062263
 Centre-Val de Loire         | Eure-et-Loir            |                   86 |      4.0116279069767442 |            -180 |              90 |    39.5996120557487315 | 37.0348837209302326 |        10 |        50 |  8.8576290472824208
 Centre-Val de Loire         | Indre                   |                   84 |     -3.7500000000000000 |            -180 |              90 |    45.1027942393015278 | 35.1785714285714286 |         5 |        60 |  9.5830682943718775
 Centre-Val de Loire         | Indre-et-Loire          |                  211 |     -2.4407582938388626 |            -180 |             180 |    52.0218822767182128 | 37.3696682464454976 |         5 |        50 |  8.3566813522324049
 Centre-Val de Loire         | Loir-et-Cher            |                  103 |     -1.4077669902912621 |            -180 |              90 |    42.5729908149000772 | 36.7961165048543689 |        15 |        75 |  9.5448982608419121
 Centre-Val de Loire         | Loiret                  |                  186 | -0.53763440860215053763 |            -165 |             120 |    43.4552417488938801 | 36.6397849462365591 |         0 |        90 |  9.9932046077262056
 Corse                       |                         |                   28 | -0.89285714285714285714 |             -90 |             115 |    44.8877936767226416 | 23.5714285714285714 |         5 |        35 |  8.1487493765679407
 Corse                       | Corse-du-Sud            |                   11 |    -10.0000000000000000 |             -70 |             115 |    48.7852436706018719 | 23.6363636363636364 |        15 |        35 |  7.1031363111336569
 Corse                       | Haute-Corse             |                   17 |      5.0000000000000000 |             -90 |              90 |    42.6468052730799520 | 23.5294117647058824 |         5 |        35 |  8.9729987118216473
 Grand Est                   |                         |                 1785 |     -1.1820728291316527 |            -180 |             180 |    46.1727832345013991 | 33.2296918767507003 |         0 |        75 | 10.1627955731878199
 Grand Est                   | Ardennes                |                   41 |  0.24390243902439024390 |            -115 |             180 |    54.7716991190728344 | 33.7804878048780488 |        15 |        65 | 12.4388749393221878
 Grand Est                   | Aube                    |                   73 |     -1.6438356164383562 |             -90 |              95 |    36.3055589036436137 | 36.3013698630136986 |        15 |        50 |  8.4173843448261047
 Grand Est                   | Bas-Rhin                |                  284 | -0.73943661971830985915 |            -180 |             180 |    42.4365965766589607 | 39.0669014084507042 |         5 |        60 | 10.8682649626178076
 Grand Est                   | Haut-Rhin               |                  261 |     -4.5977011494252874 |            -170 |              90 |    40.2460107254165606 | 37.7969348659003831 |         5 |        60 | 10.4987613826021475
 Grand Est                   | Haute-Marne             |                   35 |     -7.5714285714285714 |            -180 |              90 |    54.4000895945876146 | 31.0000000000000000 |        10 |        45 |  8.8117568522701199
 Grand Est                   | Marne                   |                   98 |     -1.8367346938775510 |            -180 |              90 |    50.6472933864405630 | 32.7040816326530612 |         5 |        75 | 11.1032726518309130
 Grand Est                   | Meurthe-et-Moselle      |                  304 |     -1.1842105263157895 |            -180 |             180 |    52.6860583073808409 | 29.1611842105263158 |         0 |        60 |  8.9204592915698657
 Grand Est                   | Meuse                   |                   58 |  0.34482758620689655172 |            -120 |              90 |    40.8340895271782889 | 26.8103448275862069 |        10 |        60 | 10.1609104726591224
 Grand Est                   | Moselle                 |                  395 |  0.12658227848101265823 |            -125 |             180 |    45.8117332211528654 | 31.2151898734177215 |         0 |        70 |  8.5521257577602855
 Grand Est                   | Vosges                  |                  236 |  0.61440677966101694915 |            -180 |             180 |    47.8910959172707848 | 30.8474576271186441 |        10 |        55 |  6.8666658497275022
 Hauts-de-France             |                         |                 1601 | -0.28419737663960024984 |            -180 |             180 |    49.9355565341072184 | 37.8607120549656465 |         0 |        90 | 11.0693252613996684
 Hauts-de-France             | Aisne                   |                  135 |  0.66666666666666666667 |            -180 |             180 |    55.5797128241226189 | 36.1481481481481481 |         0 |        75 | 12.0932437771060913
 Hauts-de-France             | Nord                    |                  711 |      3.5021097046413502 |            -180 |             180 |    50.7864868746008487 | 37.4472573839662447 |         0 |        90 | 11.1577530773479944
 Hauts-de-France             | Oise                    |                  147 |  0.85034013605442176871 |            -180 |              90 |    48.1662864163699984 | 37.8571428571428571 |         0 |        90 | 12.2194545088211972
 Hauts-de-France             | Pas-de-Calais           |                  501 |     -4.0419161676646707 |            -180 |             180 |    46.8879540982644932 | 38.5828343313373253 |         0 |        65 | 10.1236171772000052
 Hauts-de-France             | Somme                   |                  107 |    -10.6074766355140187 |            -180 |              90 |    51.1689316501143259 | 39.3925233644859813 |         0 |        90 | 11.4864620966201103
 Normandie                   |                         |                  675 |     -1.6592592592592593 |            -180 |             180 |    46.3831550953772913 | 38.6592592592592593 |         0 |        60 |  9.9039624020175928
 Normandie                   | Calvados                |                  133 |  0.37593984962406015038 |            -180 |              95 |    45.5339702532807648 | 41.1654135338345865 |        15 |        60 |  8.1623493082083535
 Normandie                   | Eure                    |                  114 | -0.39473684210526315789 |            -180 |             165 |    47.3881764165854678 | 36.3157894736842105 |         0 |        60 | 11.9373851582104629
 Normandie                   | Manche                  |                  155 | -1.00000000000000000000 |            -180 |             180 |    48.7353041452484436 | 39.7741935483870968 |         5 |        60 |  8.4581079115139722
 Normandie                   | Orne                    |                   85 |      1.1176470588235294 |            -135 |              80 |    35.7269445352710023 | 38.2941176470588235 |         0 |        60 | 10.5659195275274018
 Normandie                   | Seine-Maritime          |                  188 |     -5.6648936170212766 |            -180 |             120 |    48.7897315563040962 | 37.5531914893617021 |         0 |        50 | 10.0598391682709313
 Nouvelle-Aquitaine          |                         |                 3318 |     -2.6537070524412297 |            -180 |             180 |    50.5291836962116721 | 23.8411693791440627 |         0 |        75 |  8.4896378744866542
 Nouvelle-Aquitaine          | Charente                |                  153 |     -3.3660130718954248 |            -180 |             115 |    48.9052187014501562 | 23.3986928104575163 |         5 |        45 |  7.4704152189267000
 Nouvelle-Aquitaine          | Charente-Maritime       |                  388 |     -5.2706185567010309 |            -180 |             180 |    55.8675201376859504 | 21.6494845360824742 |         0 |        45 |  6.9316205951202818
 Nouvelle-Aquitaine          | Corrèze                |                   93 |      4.7849462365591398 |            -170 |             135 |    43.8061067468029560 | 33.3333333333333333 |         5 |        50 |  9.6777797190189792
 Nouvelle-Aquitaine          | Creuse                  |                   78 |     -3.1410256410256410 |            -180 |              90 |    49.7794419463782307 | 33.0128205128205128 |        10 |        60 |  8.6916792419697614
 Nouvelle-Aquitaine          | Deux-Sèvres            |                  176 |     -3.0397727272727273 |            -180 |             100 |    46.6475368567858554 | 22.5284090909090909 |         0 |        50 |  7.5969384640112774
 Nouvelle-Aquitaine          | Dordogne                |                  159 |     -2.4528301886792453 |            -180 |             140 |    43.2971332569311102 | 26.0062893081761006 |         5 |        60 | 10.0596303473784572
 Nouvelle-Aquitaine          | Gironde                 |                  975 |     -3.9435897435897436 |            -180 |             180 |    52.9704103352436152 | 21.8717948717948718 |         0 |        75 |  7.3528671550190309
 Nouvelle-Aquitaine          | Haute-Vienne            |                  140 |     -1.5357142857142857 |            -180 |             110 |    48.5246226475100751 | 26.2857142857142857 |        10 |        60 |  8.9838269667297006
 Nouvelle-Aquitaine          | Landes                  |                  494 | -0.12145748987854251012 |            -180 |             180 |    47.2658682059569822 | 22.5910931174089069 |         5 |        50 |  6.8055282399069950
 Nouvelle-Aquitaine          | Lot-et-Garonne          |                  154 |     -3.7662337662337662 |            -180 |             160 |    54.5849212111849685 | 22.5324675324675325 |        10 |        40 |  6.4990384720380347
 Nouvelle-Aquitaine          | Pyrénées-Atlantiques  |                  309 |  0.00000000000000000000 |            -180 |             180 |    47.5537972864800395 | 28.4466019417475728 |         0 |        65 | 10.5919549432390717
 Nouvelle-Aquitaine          | Vienne                  |                  199 |     -4.1206030150753769 |            -180 |             160 |    51.4202877035253878 | 24.7487437185929648 |         0 |        55 |  8.2533853433550111
 Occitanie                   |                         |                 3853 |     -2.9548403841162730 |            -180 |             180 |    51.2804227820199363 | 22.3916428756812873 |         0 |        90 |  7.9667991441656113
 Occitanie                   | Ariège                 |                   92 |    -14.5108695652173913 |            -180 |              60 |    49.8241952268652086 | 21.5217391304347826 |        10 |        60 |  7.1383167604805460
 Occitanie                   | Aude                    |                  227 | -0.96916299559471365639 |            -180 |             180 |    54.6504088407805539 | 21.7621145374449339 |         5 |        45 |  6.9750358215916599
 Occitanie                   | Aveyron                 |                   83 |     -2.2891566265060241 |            -180 |              90 |    46.7302926038455555 | 28.8554216867469880 |         5 |        60 | 10.2506781811580784
 Occitanie                   | Gard                    |                  631 |     -3.1141045958795563 |            -180 |             180 |    54.1060948429776838 | 22.5515055467511886 |         0 |        90 |  8.8409289957282695
 Occitanie                   | Gers                    |                  133 |     -6.5789473684210526 |            -180 |             180 |    47.9558209767097954 | 23.7218045112781955 |         0 |        35 |  6.8990045213593729
 Occitanie                   | Haute-Garonne           |                 1104 |  0.91938405797101449275 |            -180 |             180 |    48.2259323255478621 | 21.5217391304347826 |         0 |        80 |  6.7391145403334005
 Occitanie                   | Hautes-Pyrénées       |                   80 |  0.31250000000000000000 |            -180 |             165 |    41.1414951913792078 | 27.6875000000000000 |        10 |        60 |  9.6437738161842804
 Occitanie                   | Hérault                |                  768 |     -5.7552083333333333 |            -180 |             180 |    51.7769257297779781 | 22.0182291666666667 |         0 |        90 |  7.7587268266695809
 Occitanie                   | Lot                     |                   74 |     -4.8648648648648649 |            -180 |             180 |    57.9440742001543691 | 24.3918918918918919 |         5 |        50 |  9.4706722036058526
 Occitanie                   | Lozère                 |                   15 |    -19.6666666666666667 |            -170 |              20 |    44.3793173620754280 | 29.3333333333333333 |        15 |        55 | 11.1590236814790174
 Occitanie                   | Pyrénées-Orientales   |                  242 |     -9.5454545454545455 |            -180 |             180 |    59.5470454548891872 | 22.4586776859504132 |         5 |        70 |  7.4460958543686553
 Occitanie                   | Tarn                    |                  262 | -0.85877862595419847328 |            -180 |             180 |    46.8523307814238329 | 22.1564885496183206 |        10 |        90 |  8.5671975258090402
 Occitanie                   | Tarn-et-Garonne         |                  142 |     -1.6197183098591549 |            -180 |             160 |    52.6952609863215480 | 22.5704225352112676 |         5 |        90 |  9.2968368656614926
 Provence-Alpes-Côte d'Azur |                         |                 2324 |     -5.3765060240963855 |            -180 |             180 |    52.5801995194189126 | 21.6286574870912220 |         0 |        90 |  8.0973024587064988
 Provence-Alpes-Côte d'Azur | Alpes-Maritimes         |                  298 |     -4.6140939597315436 |            -180 |             180 |    51.6994233341345011 | 20.1677852348993289 |         0 |        45 |  6.7274028133933909
 Provence-Alpes-Côte d'Azur | Alpes-de-Haute-Provence |                   97 |    -16.0309278350515464 |            -180 |             115 |    44.6627299901363095 | 23.9175257731958763 |         5 |        55 |  9.4159329763137646
 Provence-Alpes-Côte d'Azur | Bouches-du-Rhône       |                  875 |     -4.9200000000000000 |            -180 |             180 |    55.4350837699900329 | 20.9714285714285714 |         0 |        90 |  7.5085219101316104
 Provence-Alpes-Côte d'Azur | Hautes-Alpes            |                   81 |     -9.8765432098765432 |            -180 |             100 |    45.4970830702500594 | 30.0000000000000000 |        15 |        70 | 11.7260393995585739
 Provence-Alpes-Côte d'Azur | Var                     |                  663 |     -6.3499245852187029 |            -180 |             180 |    53.0264828308859610 | 21.8778280542986425 |         0 |        90 |  8.1884068140059393
 Provence-Alpes-Côte d'Azur | Vaucluse                |                  310 | -0.80645161290322580645 |            -180 |             180 |    47.7333609192748408 | 21.4516129032258065 |         0 |        45 |  7.7264673920879273
 Île-de-France              |                         |                  852 |     -5.5692488262910798 |            -180 |             180 |    52.9854747441707580 | 34.3251173708920188 |         0 |        90 | 11.7197465355750454
 Île-de-France              | Essonne                 |                  173 |     -5.0867052023121387 |            -180 |             180 |    50.9630337655915223 | 36.2138728323699422 |         5 |        60 |  9.8521295966093308
 Île-de-France              | Hauts-de-Seine          |                   49 |    -18.7755102040816327 |            -180 |              90 |    60.4111831900499091 | 30.7142857142857143 |         0 |        70 | 12.9099444873580563
 Île-de-France              | Paris                   |                   13 |    -41.9230769230769231 |            -180 |             155 |       101.602543880933 | 25.3846153846153846 |         0 |        90 | 26.5723492297866579
 Île-de-France              | Seine-Saint-Denis       |                   36 |     -5.8333333333333333 |            -180 |             180 |    64.7357265017879112 | 27.3611111111111111 |         0 |        45 | 14.6622017013188961
 Île-de-France              | Seine-et-Marne          |                  215 |     -5.3720930232558140 |            -180 |             180 |    48.6965730509570261 | 37.0232558139534884 |         0 |        60 |  9.7623355278139211
(100 rows)

