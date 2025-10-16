-- Query 11
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
-- Result
 correlation_surface_puissance 
-------------------------------
            0.4437898653258171
(1 row)

 tranche_surface | nb_installations | puissance_moyenne | surface_moyenne 
-----------------+------------------+-------------------+-----------------
 10-50 m²       |            19595 |           3078.57 |           21.54
 100-200 m²     |              255 |          19747.79 |          151.55
 50-100 m²      |              684 |           8826.03 |           66.14
 <10 m²         |              631 |           1217.77 |            5.52
 >200 m²        |              404 |          66388.48 |        21963.01
(5 rows)

 puissance_crete | surface 
-----------------+---------
             165 |       1
             165 |       1
            4000 |       1
             330 |       1
             141 |       1
             250 |       1
            6200 |       1
             165 |       1
             660 |       1
             300 |       1
             300 |       1
             378 |       1
             250 |       1
            1980 |       1
             205 |       1
            4500 |       1
             195 |       1
            2940 |       1
             220 |       1
             200 |       1
            6320 |       1
             500 |       1
            2940 |       1
             165 |       1
             165 |       1
             185 |       1
             165 |       1
            3040 |       2
             600 |       2
             320 |       2
             600 |       2
             310 |       2
             180 |       2
             300 |       2
             365 |       2
             141 |       2
             240 |       2
            3000 |       2
            4000 |       2
             300 |       2
             265 |       2
            2925 |       2
             400 |       2
             300 |       2
             400 |       2
             400 |       2
             260 |       2
             400 |       2
             375 |       2
             300 |       2
             555 |       2
             660 |       2
             405 |       2
             330 |       2
            2000 |       2
              40 |       2
             400 |       2
             165 |       2
             400 |       2
             320 |       2
             300 |       2
             400 |       2
             300 |       2
             165 |       2
            1320 |       2
             720 |       2
             640 |       2
             300 |       2
            1875 |       2
             105 |       2
             900 |       2
             400 |       2
             800 |       2
             400 |       2
             640 |       3
            2040 |       3
             500 |       3
             500 |       3
            1500 |       3
            2940 |       3
             580 |       3
             600 |       3
             640 |       3
             520 |       3
             480 |       3
             600 |       3
            2960 |       3
            1440 |       3
             160 |       3
             560 |       3
             620 |       3
             600 |       3
             580 |       3
            1980 |       3
             600 |       3
             480 |       3
             600 |       3
             141 |       3
             500 |       3
             600 |       3
(100 rows)

