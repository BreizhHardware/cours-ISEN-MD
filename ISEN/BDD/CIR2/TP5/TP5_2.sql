--Créer une vue permettant de visualiser le nom, la fonction, le salaire + la commission, le nom du supérieur hiérarchique, le nom du service et la ville des employés--
CREATE VIEW  vue_employe AS SELECT e.nom, e.fonction, e.salaire, e.comm, e.numemp_sup, s.nom_service, s.ville FROM employe e, service s, employe e2 WHERE e.numemp_sup = e2.numemp AND e.num_service = e2.num_service;


-- Construire une requête sur cette vue permettant d’afficher uniquement les employés du service "siege"--
SELECT * FROM vue_employe WHERE nom_service = 'siege';

--Créer un nouvel utilisateur n’ayant accès qu’à cette vue (et vérifier ! !).--
CREATE ROLE tp5_2;
GRANT SELECT ON vue_employe TO tp5_2;