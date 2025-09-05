drop table if exists personne cascade;

CREATE TABLE personne
(
		            login VARCHAR (20),
		            nom VARCHAR (20) NOT NULL,
		            prenom VARCHAR (20) NOT NULL,
					sexe VARCHAR(1) NOT NULL,
    PRIMARY KEY(login) );

drop table if exists service cascade;

CREATE TABLE service (
    num_service INTEGER PRIMARY KEY,
    nom_service VARCHAR(50) NOT NULL,
    ville VARCHAR(50) NOT NULL
);


drop table if exists employe cascade;

CREATE TABLE employe (
    numemp SERIAL PRIMARY KEY,
    nom VARCHAR(20) NOT NULL,
    fonction VARCHAR(10) NOT NULL,
    numemp_sup INTEGER,
    date_embauche DATE NOT NULL,
    salaire NUMERIC(7,2) NOT NULL,
    comm NUMERIC(7,2),
    num_service INTEGER NOT NULL,
    FOREIGN KEY (num_service) REFERENCES service (num_service),
    FOREIGN KEY (numemp_sup) REFERENCES employe(numemp)
);