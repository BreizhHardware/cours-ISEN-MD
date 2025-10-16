-- Query 10
ALTER TABLE Marque ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Region ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Installateur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Panneau ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Onduleur ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Departement ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Localisation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Installation ADD COLUMN last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trigger_update_last_modified_Marque
    BEFORE UPDATE ON Marque
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Region
    BEFORE UPDATE ON Region
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Installateur
    BEFORE UPDATE ON Installateur
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Panneau
    BEFORE UPDATE ON Panneau
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Onduleur
    BEFORE UPDATE ON Onduleur
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Departement
    BEFORE UPDATE ON Departement
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Localisation
    BEFORE UPDATE ON Localisation
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
CREATE TRIGGER trigger_update_last_modified_Installation
    BEFORE UPDATE ON Installation
    FOR EACH ROW EXECUTE FUNCTION update_last_modified();
-- Result
