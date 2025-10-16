import pandas as pd
import numpy as np
import difflib
import logging
from collections import defaultdict
from config import region_mapping
from utils import normalize_text, fix_encoding, is_valid_company_name, standardize_orientation

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def clean_data(input_file, output_file):
    """
    Clean and standardize the solar panel installation data.
    1. Load the data.
    2. Fix encoding issues.
    3. Clean each column based on analysis.
    4. Handle duplicates.
    5. Remap locality and administrative areas using communes data.
    6. Save the cleaned data.
    7. Log all changes and issues.
    8. Ensure iddoc uniqueness or log discrepancies.
    9. Add code_insee and population columns based on locality and department.
    10. Use postal_code to help resolve locality when possible.
    11. If locality or department is missing or cannot be resolved, set related fields to null and log.
    12. Handle special cases like Paris arrondissements.
    13. Use fuzzy matching to improve locality matching when exact match is not found.
    14. Ensure all text fields are stripped of leading/trailing whitespace.
    15. Ensure all numeric fields are properly typed and handle non-numeric gracefully.
    16. Validate installateur names using heuristic and AI-based checks.
    17. Standardize region names to current official names.
    18. Log any rows where locality could not be resolved.
    19. Ensure the final dataset has no missing values in critical fields like iddoc, lat, lon.
    """
    # Load communes data for postal code lookup
    logger.info("Loading communes data...")
    communes_file = "../communes-france-2024-limite.csv"
    df_communes = pd.read_csv(communes_file, encoding='utf-8', low_memory=False, sep=';')
    # Assume columns: 'nom_standard', 'code_postal', 'dep_nom', 'reg_nom', 'code_insee'
    reg_mapping = {}
    dep_mapping = {}
    postal_mapping = {}
    insee_mapping = {}
    population_mapping = {}
    dep_to_cities = defaultdict(list)
    dep_postal_to_info = defaultdict(list)
    postal_to_info = defaultdict(list)
    for idx, row in df_communes.iterrows():
        key = (normalize_text(str(row['nom_standard']).replace('-', '').lower().strip()), normalize_text(str(row['dep_nom']).replace('-', '').lower().strip()))
        reg_mapping[key] = row['reg_nom']
        dep_mapping[key] = row['dep_nom']
        postal_mapping[key] = int(row['code_postal']) if pd.notna(row['code_postal']) else pd.NA
        insee_mapping[key] = row['code_insee']
        population_mapping[key] = int(row['population']) if pd.notna(row['population']) else pd.NA

        dep_norm = normalize_text(str(row['dep_nom']).replace('-', '').lower().strip())
        city_norm = normalize_text(str(row['nom_standard']).replace('-', '').lower().strip())
        dep_to_cities[dep_norm].append(city_norm)

        postal = row['code_postal']
        info = (city_norm, row['reg_nom'], row['dep_nom'], row['code_insee'], row['population'])
        dep_postal_to_info[(dep_norm, postal)].append(info)
        postal_to_info[postal].append(info)

    logger.info("Loading data...")
    df = pd.read_csv(input_file, encoding='utf-8-sig')
    logger.info(f"Data loaded, shape: {df.shape}")

    # Fix encoding issues in the data
    logger.info("Fixing encoding...")
    string_cols = ['panneaux_marque', 'panneaux_modele', 'onduleur_marque', 'onduleur_modele', 'installateur', 'country', 'locality', 'administrative_area_level_1', 'administrative_area_level_2']
    for col in string_cols:
        if col in df.columns:
            df[col] = df[col].apply(fix_encoding)

    # Clean each column based on analysis

    # Id, Iddoc, mois_installation, an_installation, nb_panneaux: OK, Int
    # Already int, but ensure
    int_cols = ['id', 'iddoc', 'mois_installation', 'an_installation', 'nb_panneaux']
    for col in int_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce').astype('Int64')

    # panneaux_marque: Standardize brands (basic uppercase)
    df['panneaux_marque'] = df['panneaux_marque'].str.upper().str.strip()

    # panneaux_modele: Leave as is but upper, but strip
    df['panneaux_modele'] = df['panneaux_modele'].str.strip()
    df['panneaux_modele'] = df['panneaux_modele'].str.upper()

    # nb_onduleur
    df['nb_onduleur'] = pd.to_numeric(df['nb_onduleur'], errors='coerce')
    df['nb_onduleur'] = df['nb_onduleur'].astype('Int64')

    # onduleur_marque: Uppercase and strip
    df['onduleur_marque'] = df['onduleur_marque'].str.upper().str.strip()

    # onduleur_modele: upper and strip
    df['onduleur_modele'] = df['onduleur_modele'].str.upper().str.strip()

    # puissance_crete: If 0, set to NaN
    df['puissance_crete'] = pd.to_numeric(df['puissance_crete'], errors='coerce')
    # Set at null where panneaux_modele or panneaux_marque is 'pas_dans_la_liste_panneaux' and puissance_crete == 0
    df.loc[(df['puissance_crete'] == 0) & ((df['panneaux_modele'].str.lower() == 'pas_dans_la_liste_panneaux') | (df['panneaux_marque'].str.lower() == 'pas_dans_la_liste_panneaux')), 'puissance_crete'] = pd.NA
    # For other 0 values, keep as is for now
    df['puissance_crete'] = df['puissance_crete'].astype('Int64')

    # Set name at null if panneaux_marque or panneaux_modele is 'pas_dans_la_liste_panneaux'
    df.loc[(df['panneaux_modele'].str.lower() == 'pas_dans_la_liste_panneaux') | (df['panneaux_marque'].str.lower() == 'pas_dans_la_liste_panneaux'), ['panneaux_modele', 'panneaux_marque']] = pd.NA
    df.loc[(df['onduleur_modele'].str.lower() == 'pas_dans_la_liste_onduleurs') | (df['onduleur_marque'].str.lower() == 'pas_dans_la_liste_onduleurs'), ['onduleur_modele', 'onduleur_marque']] = pd.NA

    # surface
    df['surface'] = pd.to_numeric(df['surface'], errors='coerce')
    df['surface'] = df['surface'].astype('Int64')

    # pente: OK
    df['pente'] = pd.to_numeric(df['pente'], errors='coerce').astype('Int64')

    # pente_optimum: Handle nulls, replace with null
    df['pente_optimum'] = pd.to_numeric(df['pente_optimum'], errors='coerce')
    df['pente_optimum'] = df['pente_optimum'].astype('Int64')

    # orientation: Standardize to numbers, Sud/South = 180
    df['orientation'] = df['orientation'].apply(standardize_orientation).astype('Int64')

    # orientation_optimum: Handle nulls, replace with null
    df['orientation_optimum'] = pd.to_numeric(df['orientation_optimum'], errors='coerce')
    df['orientation_optimum'] = df['orientation_optimum'].astype('Int64')

    # installateur: Strip
    df['installateur'] = df['installateur'].str.strip().str.upper()

    # Validate installateur as company name
    unique_installateurs = df['installateur'].unique()
    validity_cache = {inst: is_valid_company_name(inst) for inst in unique_installateurs}
    df['installateur_valide'] = df['installateur'].map(validity_cache)

    # Replace invalid installateur names with a representative value only for completely invalid ones (no letters)
    pattern = r'^[^a-zA-Z]*$|.*&\w+;.*'
    df.loc[~df['installateur_valide'] & df['installateur'].str.fullmatch(pattern, na=False), 'installateur'] = 'ENTREPRISE INVALIDE'

    # Handle duplicate iddoc again after cleaning
    duplicates = df[df.duplicated('iddoc', keep=False)]
    for iddoc in duplicates['iddoc'].unique():
        group = df[df['iddoc'] == iddoc]
        if len(group) > 1:

            # Check if all rows are identical (excluding 'id' column)
            group_no_id = group.drop(columns=['id'])
            all_identical = group_no_id.drop_duplicates().shape[0] == 1
            if all_identical:
                # Keep first, drop others
                df = df.drop(group.index[1:])
                logger.info(f"Dropped {len(group)-1} duplicate rows for iddoc {iddoc} after cleaning")
            else:
                # Find differing columns
                differing_cols = []
                first_row_no_id = group_no_id.iloc[0]
                for col in group_no_id.columns:
                    if not group_no_id[col].equals(first_row_no_id[col]):
                        differing_cols.append(col)
                logger.warning(f"Duplicate iddoc {iddoc} with different data after cleaning, differing columns: {differing_cols}")
                for col in differing_cols:
                    logger.warning(f"Column {col}: First={first_row_no_id[col]}, Others={group_no_id[col].tolist()}")
                # keeping all for now

    # production_pvgis
    df['production_pvgis'] = pd.to_numeric(df['production_pvgis'], errors='coerce')
    df['production_pvgis'] = df['production_pvgis'].astype('Int64')

    # lat, lon: To float
    df['lat'] = pd.to_numeric(df['lat'], errors='coerce')
    df['lon'] = pd.to_numeric(df['lon'], errors='coerce')

    # country: OK
    df['country'] = df['country'].str.strip()

    # postal_code: Handle nulls
    df['postal_code'] = pd.to_numeric(df['postal_code'], errors='coerce').astype('Int64')

    # postal_code_suffix, postal_town, administrative_area_level_3, administrative_area_level_4: Drop as VIDE
    df.drop(columns=['postal_code_suffix', 'postal_town', 'administrative_area_level_3', 'administrative_area_level_4'], inplace=True)

    # locality: Strip and remove backslashes
    df['locality'] = df['locality'].str.strip().str.replace('\\', '', regex=False)

    # administrative_area_level_1: Standardize regions (basic, assume current)
    # This is complex, for now lowercase and strip
    df['administrative_area_level_1'] = df['administrative_area_level_1'].str.lower().str.strip()

    # administrative_area_level_2: Strip
    df['administrative_area_level_2'] = df['administrative_area_level_2'].str.strip()

    # administrative_area_level_1: Standardize regions
    df['administrative_area_level_1'] = df['administrative_area_level_1'].map(lambda x: region_mapping.get(x, x) if pd.notna(x) else x)

    # Then title case
    df['administrative_area_level_1'] = df['administrative_area_level_1'].str.title()

    # After cleaning locality and administrative_area_level_2, remap columns
    logger.info("Remapping columns using communes data...")
    df['code_insee'] = None  # Add new column
    df['population'] = None  # Add new column
    for idx, row in df.iterrows():
        locality_normalized = normalize_text(str(row['locality']).replace('-', '').lower().strip())
        dep_normalized = normalize_text(str(row['administrative_area_level_2']).replace('-', '').replace('\\', '').lower().strip())
        # Special case for Paris
        if 'paris19earrondissement' in locality_normalized:
            df.at[idx, 'administrative_area_level_1'] = 'Île-de-France'
            df.at[idx, 'administrative_area_level_2'] = 'Paris'
            df.at[idx, 'code_insee'] = 75119
            df.at[idx, 'population'] = 183211
            continue
        if 'paris' in locality_normalized and ('paris' in dep_normalized or 'arrondissement' in dep_normalized or 'departement' in dep_normalized):
            df.at[idx, 'administrative_area_level_1'] = 'Île-de-France'
            df.at[idx, 'administrative_area_level_2'] = 'Paris'
            df.at[idx, 'code_insee'] = 75056
            df.at[idx, 'population'] = 2145906
            continue
        key = (locality_normalized, dep_normalized)
        if key in reg_mapping:
            df.at[idx, 'administrative_area_level_1'] = reg_mapping[key]
        if key in dep_mapping:
            df.at[idx, 'administrative_area_level_2'] = dep_mapping[key]
        if key in postal_mapping:
            df.at[idx, 'postal_code'] = postal_mapping[key]
        if key in insee_mapping:
            df.at[idx, 'code_insee'] = insee_mapping[key]
        if key in population_mapping:
            df.at[idx, 'population'] = population_mapping[key]
        else:
            dep_norm = normalize_text(str(row['administrative_area_level_2']).replace('-', '').replace('\\', '').lower().strip())
            locality_norm = normalize_text(str(row['locality']).replace('-', '').lower().strip())
            matched = False
            if pd.notna(row['postal_code']):
                postal = int(row['postal_code'])
                if postal in postal_to_info:
                    best_score = 0
                    best_info = None
                    for info in postal_to_info[postal]:
                        city_norm_ref = info[0]
                        if locality_norm in city_norm_ref or city_norm_ref in locality_norm:
                            score = 1.0
                        else:
                            score = difflib.SequenceMatcher(None, locality_norm, city_norm_ref).ratio()
                        if score > best_score:
                            best_score = score
                            best_info = info
                    if best_score > 0.7:
                        df.at[idx, 'administrative_area_level_1'] = best_info[1]
                        df.at[idx, 'administrative_area_level_2'] = best_info[2]
                        df.at[idx, 'code_insee'] = best_info[3]
                        df.at[idx, 'population'] = best_info[4]
                        matched = True
            if not matched and dep_norm in dep_to_cities:
                best_score = 0
                best_match = None
                for city_norm in dep_to_cities[dep_norm]:
                    if locality_norm in city_norm or city_norm in locality_norm:
                        score = 1.0
                    else:
                        score = difflib.SequenceMatcher(None, locality_norm, city_norm).ratio()
                    if score > best_score:
                        best_score = score
                        best_match = city_norm
                if best_score > 0.7:
                    matched_key = (best_match, dep_norm)
                    if matched_key in reg_mapping:
                        df.at[idx, 'administrative_area_level_1'] = reg_mapping[matched_key]
                    if matched_key in dep_mapping:
                        df.at[idx, 'administrative_area_level_2'] = dep_mapping[matched_key]
                    if matched_key in postal_mapping:
                        df.at[idx, 'postal_code'] = postal_mapping[matched_key]
                    if matched_key in insee_mapping:
                        df.at[idx, 'code_insee'] = insee_mapping[matched_key]
                    if matched_key in population_mapping:
                        df.at[idx, 'population'] = population_mapping[matched_key]
                    matched = True
            if not matched:
                # Put at null and log
                df.at[idx, 'administrative_area_level_1'] = pd.NA
                df.at[idx, 'administrative_area_level_2'] = pd.NA
                df.at[idx, 'postal_code'] = pd.NA
                df.at[idx, 'code_insee'] = pd.NA
                df.at[idx, 'population'] = pd.NA
                logger.warning(f"City not found: {row['locality']} in {row['administrative_area_level_2']} so set to nulls for row id {row['id']}")

    # Save cleaned data
    df.to_csv(output_file, index=False, encoding='utf-8')
