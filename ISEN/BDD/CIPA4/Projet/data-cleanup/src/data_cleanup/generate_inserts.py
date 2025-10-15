import pandas as pd
import uuid

def generate_inserts(cleaned_csv_path, output_sql_path):
    """
    Generate SQL insert statements from the cleaned CSV data.
    1. Read the cleaned CSV file.
    2. Extract unique entities and assign UUIDs.
    3. Generate SQL insert statements for each table.
    4. Write the SQL statements to the output file.
    5. Handle NULL values and escape single quotes in strings.
    """
    # Read the cleaned CSV
    df = pd.read_csv(cleaned_csv_path, encoding='utf-8')

    # Dictionaries to store UUIDs for unique entities
    marques = {}
    regions = {}
    installateurs = {}
    panneaux = {}
    onduleurs = {}
    departements = {}
    localisations = {}

    # Collect unique marques from panneaux and onduleurs
    unique_marques = set(df['panneaux_marque'].dropna().unique()) | set(df['onduleur_marque'].dropna().unique())
    for m in unique_marques:
        if m.strip():
            marques[m.strip()] = str(uuid.uuid4())

    # Collect unique regions
    unique_regions = df['administrative_area_level_1'].dropna().unique()
    for r in unique_regions:
        if r.strip():
            regions[r.strip()] = str(uuid.uuid4())

    # Collect unique installateurs
    unique_installateurs = df[['installateur', 'installateur_valide']].dropna().drop_duplicates()
    for _, row in unique_installateurs.iterrows():
        i = row['installateur'].strip()
        v = row['installateur_valide']
        installateurs[i] = (str(uuid.uuid4()), v)

    # Collect unique panneaux
    unique_panneaux = df[['panneaux_modele', 'panneaux_marque']].dropna().drop_duplicates()
    for _, row in unique_panneaux.iterrows():
        mod = row['panneaux_modele'].strip()
        mar = row['panneaux_marque'].strip()
        if mar in marques:
            panneaux[(mod, mar)] = str(uuid.uuid4())

    # Collect unique onduleurs
    unique_onduleurs = df[['onduleur_modele', 'onduleur_marque']].dropna().drop_duplicates()
    for _, row in unique_onduleurs.iterrows():
        mod = row['onduleur_modele'].strip()
        mar = row['onduleur_marque'].strip()
        if mar in marques:
            onduleurs[(mod, mar)] = str(uuid.uuid4())

    # Collect unique departements
    unique_departements = df[['administrative_area_level_2', 'administrative_area_level_1']].dropna().drop_duplicates()
    for _, row in unique_departements.iterrows():
        d = row['administrative_area_level_2'].strip()
        r = row['administrative_area_level_1'].strip()
        if r in regions:
            departements[d] = (str(uuid.uuid4()), regions[r])

    # Collect unique localisations
    unique_localisations = df[['code_insee', 'locality', 'postal_code', 'population', 'administrative_area_level_2']].dropna().drop_duplicates()
    for _, row in unique_localisations.iterrows():
        c = row['code_insee'].strip() if pd.notna(row['code_insee']) else None
        v = row['locality'].strip()
        p = str(int(row['postal_code'])) if pd.notna(row['postal_code']) else None
        pop = int(row['population']) if pd.notna(row['population']) else None
        d = row['administrative_area_level_2'].strip()
        if c and v and p and pop is not None and d in departements:
            localisations[(c, v, p, pop)] = (str(uuid.uuid4()), departements[d][0])

    # Generate SQL inserts
    sql_lines = []

    # Marque
    for m, id_m in marques.items():
        sql_lines.append(f"INSERT INTO Marque (Id_marque, marque) VALUES ('{id_m}', '{m.replace(chr(39), chr(39)*2)}');")

    # Region
    for r, id_r in regions.items():
        sql_lines.append(f"INSERT INTO Region (region_code, nom, pays) VALUES ('{id_r}', '{r.replace(chr(39), chr(39)*2)}', 'France');")

    # Installateur
    for i, (id_i, v) in installateurs.items():
        sql_lines.append(f"INSERT INTO Installateur (Id_installateur, installateur, est_valide) VALUES ('{id_i}', '{i.replace(chr(39), chr(39)*2)}', {str(v).lower()});")

    # Panneau
    for (mod, mar), id_p in panneaux.items():
        id_m = marques[mar]
        sql_lines.append(f"INSERT INTO Panneau (Id_panneau, modele, Id_marque) VALUES ('{id_p}', '{mod.replace(chr(39), chr(39)*2)}', '{id_m}');")

    # Onduleur
    for (mod, mar), id_o in onduleurs.items():
        id_m = marques[mar]
        sql_lines.append(f"INSERT INTO Onduleur (Id_onduleur, modele, Id_marque) VALUES ('{id_o}', '{mod.replace(chr(39), chr(39)*2)}', '{id_m}');")

    # Departement
    for d, (id_d, id_r) in departements.items():
        sql_lines.append(f"INSERT INTO Departement (departement_code, nom, region_code) VALUES ('{id_d}', '{d.replace(chr(39), chr(39)*2)}', '{id_r}');")

    # Localisation
    for (c, v, p, pop), (id_l, id_d) in localisations.items():
        sql_lines.append(f"INSERT INTO Localisation (Id_ville, code_Insee, ville, code_postal, population, departement_code) VALUES ('{id_l}', '{c}', '{v.replace(chr(39), chr(39)*2)}', '{p}', {pop}, '{id_d}');")

    # Installation
    for _, row in df.iterrows():
        id_inst = str(uuid.uuid4())
        nb_p = int(row['nb_panneaux']) if pd.notna(row['nb_panneaux']) else 'NULL'
        nb_o = int(row['nb_onduleur']) if pd.notna(row['nb_onduleur']) else 'NULL'
        date_inst = f"make_date({int(row['an_installation'])}, {int(row['mois_installation'])}, 1)" if pd.notna(row['an_installation']) and pd.notna(row['mois_installation']) else 'NULL'
        prod = int(row['production_pvgis']) if pd.notna(row['production_pvgis']) else 'NULL'
        pui = int(row['puissance_crete']) if pd.notna(row['puissance_crete']) else 'NULL'
        ori = int(row['orientation']) if pd.notna(row['orientation']) else 'NULL'
        ori_opt = int(row['orientation_optimum']) if pd.notna(row['orientation_optimum']) else 'NULL'
        pen = int(row['pente']) if pd.notna(row['pente']) else 'NULL'
        pen_opt = int(row['pente_optimum']) if pd.notna(row['pente_optimum']) else 'NULL'
        surf = int(row['surface']) if pd.notna(row['surface']) else 'NULL'
        lat = f"'{str(row['lat'])[:6]}'" if pd.notna(row['lat']) else 'NULL'
        lon = f"'{str(row['lon'])[:6]}'" if pd.notna(row['lon']) else 'NULL'

        # Foreign keys
        id_v = None
        if pd.notna(row['code_insee']) and pd.notna(row['locality']) and pd.notna(row['postal_code']) and pd.notna(row['population']):
            c = row['code_insee'].strip()
            v_loc = row['locality'].strip()
            p_loc = str(int(row['postal_code']))
            pop_loc = int(row['population'])
            key = (c, v_loc, p_loc, pop_loc)
            if key in localisations:
                id_v = localisations[key][0]

        id_i = None
        if pd.notna(row['installateur']):
            i = row['installateur'].strip()
            if i in installateurs:
                id_i = installateurs[i][0]

        id_p = None
        if pd.notna(row['panneaux_modele']) and pd.notna(row['panneaux_marque']):
            mod_p = row['panneaux_modele'].strip()
            mar_p = row['panneaux_marque'].strip()
            key = (mod_p, mar_p)
            if key in panneaux:
                id_p = panneaux[key]

        id_o = None
        if pd.notna(row['onduleur_modele']) and pd.notna(row['onduleur_marque']):
            mod_o = row['onduleur_modele'].strip()
            mar_o = row['onduleur_marque'].strip()
            key = (mod_o, mar_o)
            if key in onduleurs:
                id_o = onduleurs[key]

        # Prepare string values for foreign keys
        id_v_str = 'NULL' if id_v is None else f"'{id_v}'"
        id_i_str = 'NULL' if id_i is None else f"'{id_i}'"
        id_p_str = 'NULL' if id_p is None else f"'{id_p}'"
        id_o_str = 'NULL' if id_o is None else f"'{id_o}'"

        sql_lines.append(f"INSERT INTO Installation (Id_installation, nb_panneaux, nb_onduleurs, date_installation, production, puissance_crete, orientation, orientation_optimum, pente, pente_optimum, surface, latitude, longitude, Id_ville, Id_installateur, Id_panneau, Id_onduleur) VALUES ('{id_inst}', {nb_p}, {nb_o}, {date_inst}, {prod}, {pui}, {ori}, {ori_opt}, {pen}, {pen_opt}, {surf}, {lat}, {lon}, {id_v_str}, {id_i_str}, {id_p_str}, {id_o_str});")

    # Write to output file
    with open(output_sql_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_lines))