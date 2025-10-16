import psycopg2
import pandas as pd
import folium
import requests
from branca.colormap import LinearColormap
from config import DB_CONFIG
from typing import Tuple, Dict, Any

# --- 1. Requête SQL Modifiée pour Inclure les Valeurs Optimales ---
def get_data_from_db():
    """Retrieves data from PostgreSQL, including optimal values for deviation calculation."""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        conn.set_client_encoding('UTF8')
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return pd.DataFrame()

    query = """
        SELECT
            r.nom AS region,
            d.nom AS departement,
            l.code_insee,
            -- Nous conservons 'DEPARTEMENT' car il représente le niveau le plus fin (ville)
            'DEPARTEMENT' AS niveau, 
            COUNT(i.id_installation) AS nombre_installations,
            
            -- Orientation
            ROUND(AVG(i.orientation)::numeric, 2) AS orientation_moyenne,
            ROUND(AVG(i.orientation_optimum)::numeric, 2) AS orientation_optimum_moyenne,
            MIN(i.orientation) AS orientation_min,
            MAX(i.orientation) AS orientation_max,
            
            -- Pente
            ROUND(AVG(i.pente)::numeric, 2) AS pente_moyenne,
            ROUND(AVG(i.pente_optimum)::numeric, 2) AS pente_optimum_moyenne,
            MIN(i.pente) AS pente_min,
            MAX(i.pente) AS pente_max
        FROM Installation i
        JOIN Localisation l ON i.id_ville = l.id_ville
        JOIN Departement d ON l.departement_code = d.departement_code
        JOIN Region r ON d.region_code = r.region_code
        WHERE 
            i.orientation IS NOT NULL AND i.pente IS NOT NULL 
            AND i.orientation_optimum IS NOT NULL AND i.pente_optimum IS NOT NULL
        GROUP BY 
            r.nom, d.nom, l.code_insee 
        ORDER BY r.nom, d.nom;
    """
    
    # Utilisation de pd.read_sql pour simplifier la lecture des données
    try:
        df = pd.read_sql(query, conn)
    except Exception as e:
        print(f"Error executing SQL query: {e}")
        df = pd.DataFrame()
    finally:
        conn.close()

    return df

# --- 2. Récupération des GeoJSON (inchangé) ---
def get_geojson_france() -> Tuple[Dict[str, Any], Dict[str, Any]]:
    """Downloads geographical boundaries of France"""
    url_regions = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson"
    url_departements = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"

    regions_geojson = requests.get(url_regions).json()
    departements_geojson = requests.get(url_departements).json()

    return regions_geojson, departements_geojson

# --- 3. Fonction de Cartographie et Calcul de l'Écart (Corrigé) ---
def generate_maps_by_écart(df_raw, departements_geojson):
    """Calcule les écarts à l'optimum et génère les deux cartes choroplèthes (Pente et Orientation)."""

    # --- Étape A: Agrégation des Données par Département ---
    # Nous agrégeons au niveau du département (en utilisant les 2 premiers chiffres du code INSEE).
    df_raw['dept_code'] = df_raw['code_insee'].astype(str).str[:2]
    
    # Agrégation finale des statistiques par département pour la carte
    df_departements_agg = df_raw.groupby('dept_code').agg(
        departement=('departement', 'first'),
        region=('region', 'first'),
        nombre_installations=('nombre_installations', 'sum'),
        
        # Moyennes des moyennes de villes
        orientation_moyenne=('orientation_moyenne', 'mean'), 
        orientation_optimum_moyenne=('orientation_optimum_moyenne', 'mean'),
        pente_moyenne=('pente_moyenne', 'mean'),
        pente_optimum_moyenne=('pente_optimum_moyenne', 'mean'),
        
        # Min/Max (utile pour le tooltip)
        orientation_min=('orientation_min', 'min'),
        orientation_max=('orientation_max', 'max'),
        pente_min=('pente_min', 'min'),
        pente_max=('pente_max', 'max'),
    ).reset_index()

    # 🔥 CORRECTION DE L'ERREUR DE TYPE 🔥
    # Convertir explicitement les colonnes clés en float avant tout calcul
    cols_to_convert = [
        'orientation_moyenne', 'orientation_optimum_moyenne', 
        'pente_moyenne', 'pente_optimum_moyenne'
    ]
    for col in cols_to_convert:
        # Utiliser errors='coerce' pour transformer les valeurs non numériques en NaN
        df_departements_agg[col] = pd.to_numeric(df_departements_agg[col], errors='coerce')
    
    # Retirer les lignes où les données clés sont NaN après conversion
    df_departements_agg.dropna(subset=cols_to_convert, inplace=True)

    # --- Étape B: Calcul des Écarts ---
    # Écart absolu entre la moyenne réelle et la moyenne optimale
    df_departements_agg['ecart_orientation'] = (
        df_departements_agg['orientation_moyenne'] - df_departements_agg['orientation_optimum_moyenne']
    ).abs().round(2)
    
    df_departements_agg['ecart_pente'] = (
        df_departements_agg['pente_moyenne'] - df_departements_agg['pente_optimum_moyenne']
    ).abs().round(2)

    # --- Étape C: Génération des Cartes ---
    
    metrics = {
        'ecart_pente': 'Écart Pente (°)', 
        'ecart_orientation': 'Écart Orientation (°)'
    }
    
    output_files = {}

    for metric_col, title in metrics.items():
        print(f"Generating map for: {title}...")
        
        # Centre de la carte
        m = folium.Map(location=[46.603354, 1.888334], zoom_start=6, tiles='CartoDB Positron')
        
        # Définir la plage de couleur (du vert/jaune pour un faible écart au rouge pour un fort écart)
        vmin = 0
        vmax = df_departements_agg[metric_col].max() if not df_departements_agg.empty else 10
        
        colormap = LinearColormap(
            colors=['#a1d99b', '#ffffcc', '#fc9272', '#de2d26'], # Vert -> Jaune -> Orange -> Rouge
            vmin=vmin,
            vmax=vmax,
            caption=f'Écart Absolu à la Valeur Optimum ({title})'
        )

        # Créer le Choroplèthe
        folium.Choropleth(
            geo_data=departements_geojson,
            name=title,
            data=df_departements_agg,
            columns=['dept_code', metric_col],
            key_on='feature.properties.code', # Jointure sur le code INSEE du GeoJSON
            fill_color='YlOrRd', 
            fill_opacity=0.7,
            line_opacity=0.3,
            legend_name=title,
            highlight=True
        ).add_to(m)

        # Ajouter le Tooltip (survol)
        for feature in departements_geojson['features']:
            dept_code = feature['properties']['code']
            dept_data = df_departements_agg[df_departements_agg['dept_code'] == dept_code]

            if not dept_data.empty:
                row = dept_data.iloc[0]
                
                # Récupérer les données spécifiques à la métrique
                is_pente = 'pente' in metric_col
                moyenne = row['pente_moyenne'] if is_pente else row['orientation_moyenne']
                optimum = row['pente_optimum_moyenne'] if is_pente else row['orientation_optimum_moyenne']
                min_val = row['pente_min'] if is_pente else row['orientation_min']
                max_val = row['pente_max'] if is_pente else row['orientation_max']

                popup_html = f"""
                <div style="font-family: Arial; font-size: 12px; min-width: 200px;">
                    <h4>{row['departement']} ({dept_code})</h4>
                    <b>Installations:</b> {row['nombre_installations']}<br>
                    <hr>
                    <b>{title.replace('Écart', 'Valeurs')} :</b><br>
                    - Moyenne Réelle: {moyenne:.2f}°<br>
                    - Moyenne Optimum: {optimum:.2f}°<br>
                    - **Écart Absolu:** <span style="font-weight: bold; color: {'red' if row[metric_col] > 5 else 'green'};">{row[metric_col]:.2f}°</span><br>
                    - Min/Max: {min_val}° / {max_val}°
                </div>
                """
                
                folium.GeoJson(
                    feature,
                    name=row['departement'],
                    style_function=lambda x: {'fillColor': 'transparent', 'color': 'gray', 'weight': 0.1, 'fillOpacity': 0},
                    tooltip=folium.Tooltip(popup_html, sticky=True)
                ).add_to(m)

        # Ajouter la légende et la couche de contrôle
        colormap.add_to(m)
        folium.LayerControl().add_to(m)
        
        file_name = f'carte_{metric_col}.html'
        m.save(file_name)
        output_files[metric_col] = file_name
    
    return output_files


# --- 4. Fonction Principale (Main) ---
def main():
    print("1. Retrieving data from PostgreSQL...")
    df = get_data_from_db()

    if df.empty:
        print("Stopping process because no data could be retrieved from the database.")
        return

    print(f"Data retrieved: {len(df)} rows (at city/insee level).")

    print("2. Downloading geographical boundaries...")
    try:
        _, departements_geojson = get_geojson_france()
    except Exception as e:
        print(f"Error downloading GeoJSON files: {e}. Please check your internet connection or the URLs.")
        return

    print("3. Generating interactive maps (Pente Deviation & Orientation Deviation)...")
    output_files = generate_maps_by_écart(df, departements_geojson)

    print("\n==============================================")
    print("Map generation complete!")
    print(f"Carte Écart Pente saved in: {output_files.get('ecart_pente', 'N/A')}")
    print(f"Carte Écart Orientation saved in: {output_files.get('ecart_orientation', 'N/A')}")
    print("==============================================")


if __name__ == "__main__":
    main()