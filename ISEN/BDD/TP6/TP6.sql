//db.machin = commande a mettre dans la console mongosh

// le nombre d’acteurs importés
SELECT COUNT(*) FROM acteur;
db.acteur.count();
// le nombre de films importés
SELECT COUNT(*) FROM film;
db.film.count();

SELECT name, age, occupation FROM acteur WHERE name="Doreen Riley";
db.acteur.find({name:"Doreen Riley"});

SELECT COUNT(*) FROM acteur WHERE age >= 18 AND age <= 25;
db.acteur.find({age:{$gte:18, $lte:25}});

SELECT COUNT(*) FROM acteur WHERE age > 18 AND age < 25;
db.acteur.find({age:{$gt:18, $lt:25}});

SELECT COUNT(*) FROM acteur WHERE occupation="artist";
db.acteur.find({occupation:"artist"});

// Nombre d’acteurs dont le nom contient "john" en ne tenant pas compte des majuscules
SELECT COUNT(*) FROM acteur WHERE name LIKE "%john%";
db.acteur.find({name:/john/i});

//Afficher les différents métiers et le nombre d’acteurs par métier
SELECT occupation, COUNT(*) FROM acteur GROUP BY occupation;
db.acteur.aggregate([{$group:{_id:"$occupation", count:{$sum:1}}}]);

//Afficher les 10 acteurs les plus vieux en affichant que le nom et l’age
SELECT name, age FROM acteur ORDER BY age DESC LIMIT 10;
db.acteur.find({},{name:1, age:1}).sort({age:-1}).limit(10);

//Afficher le nombre d’acteurs ayant joué dans le film dont l’id est 573
SELECT COUNT(*) FROM acteur WHERE movies.movieid=573;
db.acteur.find({"movies.movieid":573}).count();

SELECT COUNT(*) FROM acteur WHERE movies.movieid=260 OR movies.movieid=1196 OR movies.movieid=1210;
db.acteur.find({"movies.movieid":{$in:[260,1196,1210]}}).count();

//INSERTION
SELECT * FROM film WHERE title="Interstellar";
// Insérer dans la collection film le film de votre choix, puis faire la requête permettant de le retrouver
db.film.insertOne({title:"Interstellar", genre:["Adventure | Drama | Sci-Fi"]});

SELECT * FROM film WHERE title="Interstellar";
db.film.find({title:"Interstellar"});

//Modifier votre enregistrement de film pour lui ajouter une date (dans le titre), puis ré-afficher votre enregistrement
db.film.updateOne({title:"Interstellar"},{$set:{title:"Interstellar (2014)"}});

SELECT * FROM film WHERE title="Interstellar (2014)";
db.film.find({title:"Interstellar (2014)"});

//Modifier votre enregistrement de film pour lui ajouter une information , puis ré-afficher votre enregistrement
db.film.updateOne({title:"Interstellar (2014)"},{$set:{title:"Interstellar (2014)", info:{director:"Christopher Nolan", year:2014}}});

SELECT * FROM film WHERE title="Interstellar (2014)";
db.film.find({title:"Interstellar (2014)"});

//Insérer dans la collection film un autre film de votre choix, puis faire la requête permettant de le retrouver, puis de le supprimer
db.film.insertOne({title:"Avatar : La Voie de l'eau (2022)", genre:["Action | Adventure | Fantasy"]});

SELECT * FROM film WHERE title="Avatar : La Voie de l'eau (2022)";
db.film.find({title:"Avatar : La Voie de l'eau (2022)"});

db.film.deleteOne({title:"Avatar : La Voie de l'eau (2022)"});

//OPTIMISATION DE LA COLLECTION ACTEUR
// Faire une requête de recherche des acteurs dont l’age est 32 et déterminer le temps mis par la requête
SELECT * FROM acteur WHERE age=32;
db.acteur.find({age:32}).explain("executionStats");
//    executionTimeMillis: 2,
//Faire un index sur l’age
db.acteur.createIndex({age:1});
//Faire une requête de recherche des acteurs dont l’age est 32 et déterminer le temps mis par la requête
SELECT * FROM acteur WHERE age=32;
db.acteur.find({age:32}).explain("executionStats");
//    executionTimeMillis: 2,