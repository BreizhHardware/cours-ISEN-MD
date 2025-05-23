SELECT nom, salaire FROM employe WHERE salaire >= 1000 AND salaire <=1500 ORDER BY salaire, nom;
SELECT nom, salaire, comm FROM employe WHERE comm IS NOT NULL;
SELECT nom, date_embauche FROM employe WHERE date_embauche >= '2001-01-01' AND date_embauche <= '2001-12-31' ORDER BY date_embauche;
SELECT * FROM employe WHERE fonction != 'secretaire';
SELECT nom, fonction, num_service FROM employe WHERE fonction = 'directeur' AND (num_service = 20 OR num_service = 30);
SELECT nom FROM employe WHERE nom LIKE 'LE%' OR nom LIKE 'le%' OR nom LIKE 'Le%' OR nom LIKE 'lE%' ORDER BY LENGTH(nom), nom;
SELECT nom, AGE(CURRENT_DATE, date_embauche) AS "Durée d'embauche" FROM employe ORDER BY AGE(CURRENT_DATE, date_embauche);
SELECT nom, fonction, salaire, comm, salaire + COALESCE(comm, 0) AS "Revenu mensuel" FROM employe ORDER BY "Revenu mensuel";
SELECT COUNT(*) FROM employe WHERE comm > salaire / 4;
SELECT MIN(salaire) AS "salaire min", ROUND(AVG(salaire),2) AS "salaire moy", MAX(salaire) AS "salaire max", ROUND(MAX(salaire)/MIN(salaire)) AS "rapport max/min" FROM employe;