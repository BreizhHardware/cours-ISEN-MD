CREATE TABLE public.solde(
                            user_id    SERIAL NOT NULL ,
                            username   VARCHAR (50) NOT NULL ,
                            password   VARCHAR (50) NOT NULL ,
                            solde      INT  NOT NULL  ,
                            name       VARCHAR (50) NOT NULL ,
                            surname    VARCHAR (50) NOT NULL ,
                            CONSTRAINT user_PK PRIMARY KEY (user_id)
)WITHOUT OIDS;

