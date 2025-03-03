--Attention : Ne faites pas de commit avant que ce ne soit demandé.--
--Insérer un nouvel employé, de fonction directeur, embauché à la date d’aujourd’hui, dans le service 40. Son supérieur hiérarchique est le PDG (numemp_sup=839 ). Vous pouvez choisir son numéro (numemp), son nom et son salaire--
INSERT INTO employe (numemp, nom, fonction, date_embauche, salaire, numemp_sup, num_service) VALUES (1000, 'Marquet', 'Directeur', '2023-11-23', 10000, 839, 40);

--Insérer un second employé, de fonction ingenieur, encore embauché à la date d’aujourd’hui dans le service 40. Son supérieur hiérarchique est le directeur embauché précédemment.--
INSERT INTO employe(numemp, nom, fonction, date_embauche, salaire, numemp_sup, num_service) VALUES (1001, 'Duval', 'Ingénieur', '2023-11-23', 5000, 1000, 40);

-- Vérifiez, avec un select, que vous voyez bien ces deux employés.--
SELECT * FROM employe WHERE nom='Marquet' OR nom='Duval';

--Faites, dans la session principale, un commit pour valider la transaction (=insertion des deux nouveaux employés).--
COMMIT;

-- Vérifiez, avec un select, que maintenant vous voyez bien ces deux nouveaux employés dans la seconde session ouverte--
SELECT * FROM employe WHERE nom='MARQUET' OR nom='DUPONT';

--Dans la session principale, insérer un nouvel employé, de fonction directeur, embauché à la date d’aujourd’hui, dans le service 50. Est-ce que PostgreSQL l’accepte ? Si non, expliquer, puis passer au paragraphe 2 suivant--
--INSERT INTO employe (numemp, nom, fonction, date_embauche, salaire, numemp_sup, num_service) VALUES (1002, 'DUPUIS', 'Directeur', '2023-11-23', 10000, 839, 50);--
-- PostgreSQL n'accepte pas l'insertion car le service 50 n'existe pas. Il faut donc créer le service 50 avant d'insérer l'employé.

-- Augmentez le salaire de tous les employés de 10%. Vérifiez par un select tous les salaires toujours sans commit--
UPDATE employe SET salaire = salaire * 1.1;
SELECT * FROM employe;

--Faites un rollback.--
ROLLBACK;
SELECT * FROM employe;

--Mettez à jour la colonne numemp_sup de l’employé Dupont : donnez-lui la valeur 999. Est-ce que Postgresql l’accepte ? Expliquer--
UPDATE employe SET numemp_sup = 999 WHERE nom = 'Dupont';
-- PostgreSQL n'accepte pas l'update car le numéro 999 n'existe pas. Il faut donc créer l'employé 999 avant de mettre à jour l'employé Dupont.

--Faites un commit. Regardez, avec un select, si Dupont a été modifié. Si non, pourquoi ?--
COMMIT;
SELECT * FROM employe WHERE nom = 'Dupont';
-- Dupont n'a pas été modifié car le commit n'a pas été fait.--

--Supprimez les employés du service 40. Est-ce que Postgresql l’accepte ?--
DELETE FROM employe WHERE num_service = 40;
-- Oui PostgreSQL accepte la suppression car le service 40 existe.--

-- Supprimez le PDG. Est-ce que Postgresql l’accepte ? Si non, trouver une méthode pour pouvoir réaliser cette suppression en maintenant l’intégrité référentielle de la base--
DELETE FROM employe WHERE numemp = 839;
-- PostgreSQL n'accepte pas la suppression car le PDG est le supérieur hiérarchique de l'employé 1000. Il faut donc modifier le supérieur hiérarchique de l'employé 1000 avant de supprimer le PDG.--

-- Faites un rollback.--
ROLLBACK;

--Recréez la clé étrangère sur numemp_sup (alter table drop foreign key ... suivi de alter table add foreign key ..., cherchez la syntaxe précise en ligne), pour y rajouter une action référentielle de type on delete cascade--
ALTER TABLE employe DROP CONSTRAINT employe_numemp_sup_fkey;
ALTER TABLE employe ADD CONSTRAINT employe_numemp_sup_fkey FOREIGN KEY (numemp_sup) REFERENCES employe (numemp) ON DELETE CASCADE;

--Réessayez de supprimer le PDG--
DELETE FROM employe WHERE numemp = 839;

ROLLBACK;

SELECT * FROM employe WHERE numemp = 839;