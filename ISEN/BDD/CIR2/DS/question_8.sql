SELECT AVG(nb_connexions) FROM (SELECT COUNT(*) AS nb_connexions FROM login GROUP BY user_id) AS lnc;
SELECT MAX(nb_connexions) FROM (SELECT COUNT(*) AS nb_connexions FROM login GROUP BY user_id) AS lnc;
SELECT Min(nb_connexions) FROM (SELECT COUNT(*) AS nb_connexions FROM login GROUP BY user_id) AS lnc;
