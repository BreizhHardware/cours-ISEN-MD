import psycopg2
import pandas as pd
import folium
import requests
import json
from branca.colormap import LinearColormap
from config import DB_CONFIG

def get_data_from_db():
    """Retrieves data from PostgreSQL"""
    conn = psycopg2.connect(**DB_CONFIG)
    conn.set_client_encoding('UTF8')

    query = """
            SELECT
                r.nom AS region,
                d.nom AS departement,
                l.code_insee,
                CASE WHEN d.nom IS NULL THEN 'REGION' ELSE 'DEPARTEMENT' END AS niveau,
                COUNT(i.id_installation) AS nombre_installations,
                ROUND(AVG(i.orientation)::numeric, 2) AS orientation_moyenne,
                MIN(i.orientation) AS orientation_min,
                MAX(i.orientation) AS orientation_max,
                ROUND(STDDEV(i.orientation)::numeric, 2) AS orientation_ecart_type,
                ROUND(AVG(i.pente)::numeric, 2) AS pente_moyenne,
                MIN(i.pente) AS pente_min,
                MAX(i.pente) AS pente_max,
                ROUND(STDDEV(i.pente)::numeric, 2) AS pente_ecart_type
            FROM Installation i
                     JOIN Localisation l ON i.id_ville = l.id_ville
                     JOIN Departement d ON l.departement_code = d.departement_code
                     JOIN Region r ON d.region_code = r.region_code
            WHERE i.orientation IS NOT NULL AND i.pente IS NOT NULL
            GROUP BY GROUPING SETS (
                (r.nom, d.nom, l.code_insee),
                (r.nom)
                )
            ORDER BY r.nom, d.nom NULLS FIRST; \
            """

    cursor = conn.cursor()
    cursor.execute(query)
    columns = [desc[0] for desc in cursor.description]
    data = cursor.fetchall()

    df = pd.DataFrame(data, columns=columns)

    cursor.close()
    conn.close()

    return df

def get_geojson_france():
    """Downloads geographical boundaries of France"""
    # GeoJSON of French regions
    url_regions = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson"
    # GeoJSON of French departments
    url_departements = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson"

    regions_geojson = requests.get(url_regions).json()
    departements_geojson = requests.get(url_departements).json()

    return regions_geojson, departements_geojson

def create_map(df, regions_geojson, departements_geojson, metric='nombre_installations'):
    """Creates an interactive map with Folium"""

    # Separate data by level
    # The 'DEPARTEMENT' rows are actually at city level (code_insee) due to GROUPING SETS
    df_villes = df[df['niveau'] == 'DEPARTEMENT'].copy()
    df_regions = df[df['niveau'] == 'REGION'].copy()

    # --- FIX: Aggregate data from city level (DEPARTEMENT) to department level ---
    # Extract the first 2 characters of the INSEE code
    df_villes['dept_code'] = df_villes['code_insee'].astype(str).str[:2]

    # Aggregate by department code to get data at the correct level for the map and tooltip
    df_departements_agg = df_villes.groupby(['dept_code', 'departement', 'region']).agg(
        nombre_installations=('nombre_installations', 'sum'),
        orientation_moyenne=('orientation_moyenne', 'mean'), # Average the averages of cities
        orientation_min=('orientation_min', 'min'),         # Global minimum of the department
        orientation_max=('orientation_max', 'max'),         # Global maximum of the department
        orientation_ecart_type=('orientation_ecart_type', 'mean'), # Approximation: average of standard deviations
        pente_moyenne=('pente_moyenne', 'mean'),
        pente_min=('pente_min', 'min'),
        pente_max=('pente_max', 'max'),
        pente_ecart_type=('pente_ecart_type', 'mean'),
    ).reset_index()
    # Note: The aggregated standard deviation is not technically the stddev of the department, but an average of the stddev of cities,
    # which can be a good approximation if city sizes are similar. For exact standard deviation,
    # we would need to go back to raw data. Here, we use the average of the cities' standard deviations.

    # Ensure numeric columns are of the correct type
    numeric_cols = [col for col in df_departements_agg.columns if 'moyenne' in col or 'ecart_type' in col or 'min' in col or 'max' in col or 'nombre' in col]
    for col in numeric_cols:
        df_departements_agg[col] = pd.to_numeric(df_departements_agg[col], errors='coerce')
    for col in df_departements_agg.columns:
        if 'moyenne' in col or 'ecart_type' in col:
            df_departements_agg[col] = df_departements_agg[col].round(2)
    # ------------------------------------------------------------------------------------------------

    # Debug: display codes
    print("\n=== Department codes in DB (After aggregation) ===")
    print(df_departements_agg[['departement', 'dept_code', 'nombre_installations']].head(10))
    print("\n=== Codes in GeoJSON ===")
    codes_geojson = [f['properties']['code'] for f in departements_geojson['features'][:10]]
    print(codes_geojson)

    # Create map centered on France
    m = folium.Map(
        location=[46.603354, 1.888334],
        zoom_start=6,
        tiles='OpenStreetMap'
    )

    # Create colormap for installations
    if len(df_departements_agg) > 0:
        vmin = df_departements_agg[metric].min()
        vmax = df_departements_agg[metric].max()
        colormap = LinearColormap(
            colors=['yellow', 'orange', 'red'],
            vmin=vmin,
            vmax=vmax,
            caption=f'{metric}'
        )

    # Add departments layer (use aggregated DataFrame)
    if len(df_departements_agg) > 0:
        folium.Choropleth(
            geo_data=departements_geojson,
            name='Departments',
            data=df_departements_agg, # Use aggregated DF
            columns=['dept_code', metric],
            key_on='feature.properties.code',
            fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.2,
            legend_name=f'{metric} per department',
            highlight=True
        ).add_to(m)

    # Add tooltips for departments
    for feature in departements_geojson['features']:
        dept_code = feature['properties']['code']
        # Search data in aggregated DataFrame
        dept_data = df_departements_agg[df_departements_agg['dept_code'] == dept_code]

        if not dept_data.empty:
            row = dept_data.iloc[0]
            # Use 'departement' column for name (if exists, otherwise use GeoJSON name)
            departement_nom = row['departement'] if 'departement' in row else feature['properties']['nom']
            region_nom = row['region'] if 'region' in row else 'Not specified'

            popup_html = f"""
            <div style="font-family: Arial; font-size: 12px;">
                <h4>{departement_nom} ({dept_code})</h4>
                <b>Region:</b> {region_nom}<br>
                <b>Installations:</b> {row['nombre_installations']}<br>
                <hr>
                <b>Orientation:</b><br>
                - Average: {row['orientation_moyenne']}°<br>
                - Min/Max: {row['orientation_min']}° / {row['orientation_max']}°<br>
                - Std dev: {row['orientation_ecart_type']}<br>
                <hr>
                <b>Slope:</b><br>
                - Average: {row['pente_moyenne']}°<br>
                - Min/Max: {row['pente_min']}° / {row['pente_max']}°<br>
                - Std dev: {row['pente_ecart_type']}
            </div>
            """

            folium.GeoJson(
                feature,
                style_function=lambda x: {
                    'fillColor': 'transparent',
                    'color': 'transparent',
                    'weight': 0
                },
                tooltip=folium.Tooltip(popup_html)
            ).add_to(m)

    # Add layer control
    folium.LayerControl().add_to(m)

    # Add colormap legend
    if len(df_departements_agg) > 0:
        colormap.add_to(m)

    return m

def main():
    print("Retrieving data from PostgreSQL...")
    df = get_data_from_db()

    print(f"Data retrieved: {len(df)} rows")
    df_villes = df[df['niveau'] == 'DEPARTEMENT'].copy()
    df_regions = df[df['niveau'] == 'REGION'].copy()
    print(f"- Regions: {len(df_regions)}")
    print(f"- Cities (for aggregation): {len(df_villes)}") # Renamed for clarity

    # --- FIX: Aggregate data from city level to department level for statistics ---
    df_villes['dept_code'] = df_villes['code_insee'].astype(str).str[:2]

    df_departements_stat = df_villes.groupby('departement').agg(
        nombre_installations=('nombre_installations', 'sum'),
        orientation_moyenne=('orientation_moyenne', 'mean'),
        pente_moyenne=('pente_moyenne', 'mean')
    ).reset_index()

    # Replace df_dept with df_departements_stat for global statistics
    df_dept = df_departements_stat
    # ------------------------------------------------------------------------------------------------

    print("\nDownloading geographical boundaries...")
    regions_geojson, departements_geojson = get_geojson_france()

    print("\nCreating map...")
    carte = create_map(df, regions_geojson, departements_geojson)

    # Save map
    output_file = 'carte_installations_france.html'
    carte.save(output_file)
    print(f"\nMap saved in: {output_file}")

    # Display some statistics
    print("\n=== Global statistics (per department) ===")

    # Use df_dept (now aggregated) for statistics
    print(f"Total installations: {df_dept['nombre_installations'].sum()}")
    print(f"Global average orientation: {df_dept['orientation_moyenne'].mean():.2f}°")
    print(f"Global average slope: {df_dept['pente_moyenne'].mean():.2f}°")

    print("\n=== Top 5 departments by number of installations ===")
    # nlargest uses the nombre_installations column which is now the SUM of installations per department
    top5 = df_dept.nlargest(5, 'nombre_installations')[['departement', 'nombre_installations', 'orientation_moyenne', 'pente_moyenne']]
    print(top5.to_string(index=False))

if __name__ == "__main__":
    main()