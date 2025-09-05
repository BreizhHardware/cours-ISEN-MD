CREATE DATABASE testbdd;
CREATE ROLE tp6 WITH LOGIN PASSWORD 'a';
GRANT ALL PRIVILEGES ON DATABASE testbdd TO testuser;

CREATE TABLE IF NOT EXISTS public."table1" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
);

CREATE TABLE IF NOT EXISTS public."table2" (
    table2_id SERIAL PRIMARY KEY,
    poulpe VARCHAR(50) NOT NULL,
);

--A partir de tp6 créer un deuxième utilisateur (rôle) ayant accès à la table "table1" uniquement avec les privilèges insert, select, update et delete--
CREATE ROLE tp6_2 WITH LOGIN PASSWORD 'a';
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE "table1" TO tp6_2;

