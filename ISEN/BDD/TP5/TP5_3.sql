--Créer un champ salaireetcom de type double--
ALTER TABLE employe ADD COLUMN salaireetcom double precision;

-- Créer un déclencheur levant une alerte si la somme de salaire et commission indiquée dans salaireetcom est inférieure au montant du salaire--
UPDATE employe
SET salaireetcom = (SELECT salaire + COALESCE(comm, '0'));

CREATE FUNCTION negative_salaire() RETURNS trigger AS $negative_salaire$
BEGIN
IF NEW.salaire < 0 THEN
RAISE EXCEPTION 'Le salaire ne peut pas être négatif';
END IF;
END;
$negative_salaire$ LANGUAGE plpgsql;

CREATE TRIGGER negative_salaire BEFORE INSERT OR UPDATE ON employe FOR EACH ROW EXECUTE PROCEDURE negative_salaire();