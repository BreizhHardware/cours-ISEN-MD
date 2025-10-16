import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import seaborn as sns
from datetime import datetime
from config import DB_CONFIG

# Configuration de la connexion à la base de données
# La fonction suppose que 'config.py' existe et contient 'DB_CONFIG'

def executer_requete():
    """Crée la vue si nécessaire et retourne un DataFrame pandas"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()
        conn.set_client_encoding('UTF8')

        # Créer la vue si elle n'existe pas
        create_view_query = """
        DROP VIEW IF EXISTS vue_puissance_region_annee;

        CREATE VIEW vue_puissance_region_annee AS
        SELECT *
        FROM (
            SELECT 
                r.nom AS region,
                EXTRACT(YEAR FROM i.date_installation) AS annee,
                SUM(i.puissance_crete) AS puissance_totale,
                AVG(i.puissance_crete) AS puissance_moyenne,
                COUNT(i.id_installation) AS nombre_installations
            FROM Installation i
            JOIN Localisation l ON i.id_ville = l.id_ville
            JOIN Departement d ON l.departement_code = d.departement_code
            JOIN Region r ON d.region_code = r.region_code
            WHERE i.date_installation IS NOT NULL
            GROUP BY r.nom, EXTRACT(YEAR FROM i.date_installation)
            ORDER BY annee DESC, puissance_totale DESC
        ) as view;
        """
        
        cursor.execute(create_view_query)
        conn.commit()
        print("✓ Vue 'vue_puissance_region_annee' créée ou déjà existante")
        
        # Sélectionner toutes les données de la vue
        select_query = "SELECT * FROM vue_puissance_region_annee;"
        
        df = pd.read_sql_query(select_query, conn)
        cursor.close()
        conn.close()
        
        return df
    
    except Exception as e:
        print(f"Erreur lors de l'exécution de la requête: {e}")
        return None

def creer_visualisations(df):
    """
    Crée plusieurs graphiques à partir des données.
    Détecte l'unité (W/kW) et convertit en kW pour l'affichage si nécessaire, 
    puis formate les axes.
    """
    # Configuration du style
    sns.set_style("whitegrid")
    plt.rcParams['figure.figsize'] = (16, 12)

    # --- Détection / conversion d'unités (heuristique) ---
    # On calcule la moyenne des puissances pour déterminer si les valeurs sont en W (moyenne > 100 Wc)
    if 'puissance_moyenne' in df.columns:
        avg_raw = df['puissance_moyenne'].mean()
    else:
        # Calculer une approximation si 'puissance_moyenne' n'est pas présente dans le DF
        avg_raw = df['puissance_totale'].sum() / df['nombre_installations'].sum()

    values_in_watts = avg_raw > 100  # Heuristique : si moyenne brute > 100 -> donnée en W

    # Définir le facteur de conversion et le label de l'unité
    conv = 1.0
    unit_label = 'unités'
    if values_in_watts:
        conv = 1 / 1000.0
        unit_label = 'kWc'  # Unité affichée après conversion W -> kW (kWc pour crête)
        
        # Copier le DataFrame pour appliquer la conversion sans modifier l'original si besoin ailleurs
        df = df.copy()
        df['puissance_totale'] = df['puissance_totale'] * conv
        
        # Convertir 'puissance_moyenne' si elle existe
        if 'puissance_moyenne' in df.columns:
            df['puissance_moyenne'] = df['puissance_moyenne'] * conv
    elif 'puissance_moyenne' in df.columns:
         # Si l'heuristique n'est pas remplie, on suppose que c'est déjà en kW
         unit_label = 'kWc' 


    # Calculer la puissance moyenne par installation (en kW si conversion faite)
    # Remplacer les 0 dans 'nombre_installations' pour éviter division par zéro
    df['nombre_installations'] = df['nombre_installations'].replace({0: pd.NA})
    df['puissance_par_installation'] = df['puissance_totale'] / df['nombre_installations']
    df['puissance_par_installation'] = df['puissance_par_installation'].fillna(0)

    # Création de la figure
    fig = plt.figure(figsize=(22, 14))
    gs = fig.add_gridspec(3, 2, hspace=0.35, wspace=0.3,
                          left=0.05, right=0.98, top=0.95, bottom=0.05)

    ax1 = fig.add_subplot(gs[0, :])  # Evolution (toutes régions)
    ax2 = fig.add_subplot(gs[1, 0])  # Heatmap
    ax3 = fig.add_subplot(gs[1, 1])  # Année 1
    ax4 = fig.add_subplot(gs[2, 0])  # Année 2
    ax5 = fig.add_subplot(gs[2, 1])  # Année 3

    fig.suptitle(f'Analyse de la Puissance Solaire par Région et Année ({unit_label})',
                 fontsize=16, fontweight='bold')

    # 1. Évolution de la puissance totale par région
    toutes_regions = df['region'].unique()
    colors = plt.cm.tab20(range(len(toutes_regions)))

    for idx, region in enumerate(toutes_regions):
        data = df[df['region'] == region].sort_values('annee')
        ax1.plot(data['annee'], data['puissance_totale'],
                 marker='o', markersize=3, linewidth=1, label=region,
                 color=colors[idx], alpha=0.8)

    # Formatter qui affiche avec séparateur de milliers et 1 décimale si utile
    def format_kw(x, pos):
        # Montre 1 décimale si la valeur contient une partie fractionnaire importante
        if abs(x - int(x)) > 0.05:
            return f"{x:,.1f}"
        else:
            return f"{int(x):,}"
            
    # Formatage de l'axe Y pour les grands nombres (Puissance Totale)
    ax1.ticklabel_format(axis='y', style='plain', scilimits=(0, 0))
    ax1.yaxis.set_major_formatter(ticker.FuncFormatter(format_kw))

    ax1.set_title(f'Évolution de la Puissance Totale ({unit_label}) par Région et par Année',
                  fontsize=12, fontweight='bold')
    ax1.set_xlabel('Année')
    ax1.set_ylabel(f'Puissance Totale Installée ({unit_label})')
    ax1.legend(bbox_to_anchor=(1.02, 1), loc='upper left', fontsize=8)
    ax1.grid(True, alpha=0.3)

    # 2. Heatmap : nombre d'installations
    pivot_installations = df.pivot_table(
        values='nombre_installations',
        index='region',
        columns='annee',
        aggfunc='sum',
        fill_value=0
    )
    # S'assurer que les colonnes années sont triées
    pivot_installations.columns = pivot_installations.columns.astype(int)
    pivot_installations = pivot_installations.reindex(sorted(pivot_installations.columns), axis=1)

    sns.heatmap(pivot_installations, annot=False,
                cmap='YlOrRd', ax=ax2, cbar_kws={'label': "Nombre d'installations"})
    ax2.set_title("Nombre d'installations par Région et Année", fontsize=12, fontweight='bold')
    ax2.set_xlabel('Année')
    ax2.set_ylabel('Région')

    # 3-5. Puissance moyenne par installation pour années cibles
    annees_cibles = [1998, 2008, 2023]
    axes_barres = [ax3, ax4, ax5]
    colors_barres = ['steelblue', 'coral', 'seagreen']

    for annee, ax, color in zip(annees_cibles, axes_barres, colors_barres):
        df_annee = df[df['annee'] == annee].sort_values('puissance_par_installation', ascending=True)

        if not df_annee.empty:
            ax.barh(df_annee['region'], df_annee['puissance_par_installation'],
                     color=color, alpha=0.85)
            ax.set_title(f'Puissance Moyenne par Installation - Année {int(annee)} ({unit_label})',
                          fontsize=11, fontweight='bold')
            ax.set_xlabel(f'Puissance Moyenne ({unit_label})')
            ax.set_ylabel('Région')
            # Formater l'axe x
            ax.xaxis.set_major_formatter(ticker.FuncFormatter(format_kw))
            ax.grid(True, alpha=0.25, axis='x')
        else:
            ax.text(0.5, 0.5, f'Pas de données pour {int(annee)}',
                     ha='center', va='center', transform=ax.transAxes, fontsize=12)
            ax.set_title(f'Puissance Moyenne par Installation - Année {int(annee)} ({unit_label})',
                          fontsize=11, fontweight='bold')
            ax.axis('off')

    plt.tight_layout(rect=[0, 0.03, 1, 0.97])

    # Sauvegarder le graphique
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"analyse_puissance_solaire_{timestamp}.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    print(f"\nGraphique sauvegardé: {filename}")

    plt.show()


def afficher_statistiques(df):
    """
    Affiche des statistiques descriptives.
    Convertit en kW pour l'affichage si l'heuristique détecte des valeurs en W.
    """
    # Même heuristique que dans creer_visualisations pour l'unité
    if 'puissance_moyenne' in df.columns:
        avg_raw = df['puissance_moyenne'].mean()
    else:
        avg_raw = df['puissance_totale'].sum() / df['nombre_installations'].sum()
        
    values_in_watts = avg_raw > 100
    conv = 1/1000.0 if values_in_watts else 1.0
    unit_label = 'kWc' if values_in_watts or (avg_raw > 0 and avg_raw < 100) else 'unités' # On suppose kWc si la moyenne est faible mais > 0

    print("\n" + "="*70)
    print("STATISTIQUES GÉNÉRALES")
    print("="*70)

    print(f"\nPériode analysée: {int(df['annee'].min())} - {int(df['annee'].max())}")
    print(f"Nombre de régions: {df['region'].nunique()}")
    print(f"Nombre total d'enregistrements: {len(df)}")

    print("\n" + "-"*70)
    print(f"TOP 5 RÉGIONS - Puissance Totale Cumulée ({unit_label})")
    print("-"*70)
    # Calculer la somme et appliquer la conversion
    top5_total = (df.groupby('region')['puissance_totale'].sum() * conv).nlargest(5)
    for i, (region, puissance) in enumerate(top5_total.items(), 1):
        # affichage avec séparateur de milliers et 1 décimale si <10
        if puissance >= 10:
            print(f"{i}. {region}: {puissance:,.0f} {unit_label}")
        else:
            print(f"{i}. {region}: {puissance:,.2f} {unit_label}")

    print("\n" + "-"*70)
    print("TOP 5 RÉGIONS - Nombre Total d'Installations")
    print("-"*70)
    top5_installations = df.groupby('region')['nombre_installations'].sum().nlargest(5)
    for i, (region, nb) in enumerate(top5_installations.items(), 1):
        print(f"{i}. {region}: {int(nb)} installations")

    print("\n" + "-"*70)
    print("ÉVOLUTION ANNUELLE")
    print("-"*70)
    # Calcul des agrégats annuels. La puissance_moyenne est calculée par la BDD si elle existe.
    evolution = df.groupby('annee').agg({
        'puissance_totale': 'sum',
        'nombre_installations': 'sum',
        # On recalcule la moyenne si la colonne n'est pas présente, sinon on prend la moyenne de la moyenne (moins précis mais ok)
        'puissance_moyenne': 'mean' if 'puissance_moyenne' in df.columns else (lambda s: (s.sum() / df[df['annee']==s.name]['nombre_installations'].sum()))
    }).sort_index()

    # Appliquer la conversion à toutes les colonnes de puissance
    evolution['puissance_totale'] = evolution['puissance_totale'] * conv
    if 'puissance_moyenne' in evolution.columns:
        evolution['puissance_moyenne'] = evolution['puissance_moyenne'] * conv
    
    # Renommer les colonnes avec l'unité correcte
    evolution.rename(columns={
        'puissance_totale': f'puissance_totale ({unit_label})',
        'puissance_moyenne': f'puissance_moyenne ({unit_label})'
    }, inplace=True)

    # Formatage de l'affichage des floats
    pd.set_option('display.float_format', lambda x: f'{x:,.1f}')
    print(evolution.to_string())
    print("\n")


def main():
    """Fonction principale pour l'exécution du script."""
    print("Récupération des données...")
    df = executer_requete()
    
    if df is not None and not df.empty:
        print(f"✓ {len(df)} enregistrements récupérés")
        
        # Afficher un aperçu des données
        print("\nAperçu des données:")
        print(df.head(10).to_string())
        
        # Afficher les statistiques
        afficher_statistiques(df)
        
        # Créer les visualisations
        print("\nGénération des graphiques...")
        creer_visualisations(df)
        
        print("\n✓ Analyse terminée avec succès!")
    else:
        print("✗ Aucune donnée récupérée")

if __name__ == "__main__":
    main()