import os
import pandas as pd
import matplotlib.pyplot as plt
import glob

def lire_fichiers_csv():
    """Récupère et lit tous les fichiers CSV du répertoire courant"""
    fichiers_csv = glob.glob("*.CSV")
    dataframes = {}

    for fichier in fichiers_csv:
        try:
            # Lire le fichier avec header=None pour définir nos propres noms de colonnes
            df = pd.read_csv(fichier, header=None, names=["Temps", "Tension1", "Tension2"])

            # Vérifier si les deux premières lignes sont des métadonnées et les supprimer si c'est le cas
            if isinstance(df.iloc[0, 0], str) and "Source" in df.iloc[0, 0]:
                df = df.iloc[2:].reset_index(drop=True)

            # Convertir les colonnes en numériques
            for col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce')

            nom = os.path.basename(fichier)
            dataframes[nom] = df

            print(f"Fichier {nom} chargé: {len(df)} lignes")

        except Exception as e:
            print(f"Erreur lors de la lecture de {fichier}: {e}")

    return dataframes

def tracer_courbes_hysteresis(dataframes):
    """Trace toutes les courbes d'hystérésis sur le même graphique"""
    plt.figure(figsize=(10, 8))

    for nom, df in dataframes.items():
        # Tracer la courbe d'hystérésis (Tension1 vs Tension2)
        plt.plot(df["Tension1"], df["Tension2"], label=nom)

    plt.title("Courbes d'hystérésis")
    plt.xlabel("Tension 1 (V)")
    plt.ylabel("Tension 2 (V)")
    plt.grid(True)
    plt.legend()
    plt.show()

if __name__ == "__main__":
    donnees = lire_fichiers_csv()

    if not donnees:
        print("Aucun fichier CSV trouvé dans le répertoire courant")
    else:
        print(f"{len(donnees)} fichiers CSV trouvés et chargés")
        tracer_courbes_hysteresis(donnees)