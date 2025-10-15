-- ----------------------------------------------------------
-- Script Postgresql pour supprimer et recréer les tables
-- ----------------------------------------------------------

-- Supprimer les tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS Installation;
DROP TABLE IF EXISTS Localisation;
DROP TABLE IF EXISTS Departement;
DROP TABLE IF EXISTS Panneau;
DROP TABLE IF EXISTS Onduleur;
DROP TABLE IF EXISTS Installateur;
DROP TABLE IF EXISTS Region;
DROP TABLE IF EXISTS Marque;

-- ----------------------------
-- Table: Marque
-- ----------------------------
CREATE TABLE Marque (
                        Id_marque uuid NOT NULL DEFAULT gen_random_uuid(),
                        marque VARCHAR(255),
                        CONSTRAINT Marque_PK PRIMARY KEY (Id_marque)
);


-- ----------------------------
-- Table: Region
-- ----------------------------
CREATE TABLE Region (
                        region_code uuid NOT NULL DEFAULT gen_random_uuid(),
                        nom VARCHAR(255) NOT NULL,
                        pays VARCHAR(255),
                        CONSTRAINT Region_PK PRIMARY KEY (region_code)
);


-- ----------------------------
-- Table: Installateur
-- ----------------------------
CREATE TABLE Installateur (
                              Id_installateur uuid NOT NULL DEFAULT gen_random_uuid(),
                              installateur TEXT,
                              est_valide BOOLEAN NOT NULL,
                              CONSTRAINT Installateur_PK PRIMARY KEY (Id_installateur)
);


-- ----------------------------
-- Table: Panneau
-- ----------------------------
CREATE TABLE Panneau (
                         Id_panneau uuid NOT NULL DEFAULT gen_random_uuid(),
                         modele VARCHAR(255),
                         Id_marque uuid,
                         CONSTRAINT Panneau_PK PRIMARY KEY (Id_panneau),
                         CONSTRAINT Panneau_Id_marque_FK FOREIGN KEY (Id_marque) REFERENCES Marque (Id_marque) ON DELETE CASCADE
);


-- ----------------------------
-- Table: Onduleur
-- ----------------------------
CREATE TABLE Onduleur (
                          Id_onduleur uuid NOT NULL DEFAULT gen_random_uuid(),
                          modele VARCHAR(255),
                          Id_marque uuid,
                          CONSTRAINT Onduleur_PK PRIMARY KEY (Id_onduleur),
                          CONSTRAINT Onduleur_Id_marque_FK FOREIGN KEY (Id_marque) REFERENCES Marque (Id_marque) ON DELETE CASCADE
);


-- ----------------------------
-- Table: Departement
-- ----------------------------
CREATE TABLE Departement (
                             departement_code uuid NOT NULL DEFAULT gen_random_uuid(),
                             nom VARCHAR(255) NOT NULL,
                             region_code uuid,
                             CONSTRAINT Departement_PK PRIMARY KEY (departement_code),
                             CONSTRAINT Departement_region_code_FK FOREIGN KEY (region_code) REFERENCES Region (region_code) ON DELETE CASCADE
);


-- ----------------------------
-- Table: Localisation
-- ----------------------------
CREATE TABLE Localisation (
                              Id_ville uuid NOT NULL DEFAULT gen_random_uuid(),
                              code_Insee CHAR(5),
                              ville VARCHAR(255) NOT NULL,
                              code_postal CHAR(5),
                              population INT,
                              departement_code uuid,
                              CONSTRAINT Localisation_PK PRIMARY KEY (Id_ville),
                              CONSTRAINT Localisation_departement_code_FK FOREIGN KEY (departement_code) REFERENCES Departement (departement_code) ON DELETE CASCADE
);


-- ----------------------------
-- Table: Installation
-- ----------------------------
CREATE TABLE Installation (
                              Id_installation uuid NOT NULL DEFAULT gen_random_uuid(),
                              nb_panneaux INT,
                              nb_onduleurs INT,
                              date_installation DATE,
                              production INT,
                              puissance_crete INT,
                              orientation INT,
                              orientation_optimum INT,
                              pente INT,
                              pente_optimum INT,
                              surface INT,
                              latitude VARCHAR(6),
                              longitude VARCHAR(6),
                              Id_ville uuid,
                              Id_installateur uuid,
                              Id_panneau uuid,
                              Id_onduleur uuid,
                              CONSTRAINT Installation_PK PRIMARY KEY (Id_installation),
                              CONSTRAINT Installation_Id_ville_FK FOREIGN KEY (Id_ville) REFERENCES Localisation (Id_ville) ON DELETE CASCADE,
                              CONSTRAINT Installation_Id_installateur_FK FOREIGN KEY (Id_installateur) REFERENCES Installateur (Id_installateur) ON DELETE SET NULL,
                              CONSTRAINT Installation_Id_panneau_FK FOREIGN KEY (Id_panneau) REFERENCES Panneau (Id_panneau) ON DELETE SET NULL,
                              CONSTRAINT Installation_Id_onduleur_FK FOREIGN KEY (Id_onduleur) REFERENCES Onduleur (Id_onduleur) ON DELETE SET NULL
);
