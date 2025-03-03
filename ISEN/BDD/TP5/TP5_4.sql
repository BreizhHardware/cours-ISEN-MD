--Construire la requête qui affiche la durée moyenne des locations par catégorie de films. Le résultat sera présenté dans l’ordre décroissant des durées de location moyenne par catégorie.--
--rental_duration n'existe pas, il y a rental_date et return_date--
SELECT category.name, AVG(rental.return_date - rental.rental_date) AS "Durée moyenne de location" FROM category, film_category, rental WHERE category.category_id = film_category.category_id AND film_category.film_id = rental.inventory_id GROUP BY category.name ORDER BY AVG(rental.return_date - rental.rental_date) DESC;

--Utiliser EXPLAIN ANALYZE avant le SELECT pour visualiser la réalisation de la requête et mesurer le temps d’exécution.--
EXPLAIN ANALYZE SELECT category.name, AVG(rental.return_date - rental.rental_date) AS "Durée moyenne de location" FROM category, film_category, rental WHERE category.category_id = film_category.category_id AND film_category.film_id = rental.inventory_id GROUP BY category.name ORDER BY AVG(rental.return_date - rental.rental_date) DESC;

--Créer un index sur le champs rental_duration de la table film, refaire la requête précédente et comparer le temps (en utilisant EXPLAIN ANALYZE)--
CREATE INDEX idx_rental_duration ON film (rental_duration);
EXPLAIN ANALYZE SELECT category.name, AVG(rental.return_date - rental.rental_date) AS "Durée moyenne de location" FROM category, film_category, rental WHERE category.category_id = film_category.category_id AND film_category.film_id = rental.inventory_id GROUP BY category.name ORDER BY AVG(rental.return_date - rental.rental_date) DESC;

--Déterminer la taille des tables et indexes.--
SELECT pg_size_pretty(pg_total_relation_size('film'));
SELECT pg_size_pretty(pg_total_relation_size('film_category'));
SELECT pg_size_pretty(pg_total_relation_size('category'));
SELECT pg_size_pretty(pg_total_relation_size('rental'));