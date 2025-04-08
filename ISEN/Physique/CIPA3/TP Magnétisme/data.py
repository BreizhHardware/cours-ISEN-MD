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

def lire_fichier_24csv():
    """Récupère et lit le fichier SDS00024.CSV et calcule le champ rémanent"""
    import numpy as np
    fichiers_csv = glob.glob("SDS00024.CSV")
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

            # Calculer le champ rémanent
            champ_remanant = calculer_champ_remanant(df)
            print(f"Fichier {nom} chargé: {len(df)} lignes")
            print(f"Champ rémanant: {champ_remanant} V")

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

def calculer_champ_remanant(df):
    """
    Calcule le champ rémanant (valeur de Tension2 quand Tension1 = 0)
    Pour un cycle d'hystérésis complet, on trouve deux valeurs (partie ascendante et descendante)
    """
    # Trier les données par ordre croissant de Tension1
    df_sorted = df.sort_values("Tension1")

    # Trouver les points où Tension1 change de signe (passage par zéro)
    signes = np.sign(df_sorted["Tension1"])
    changements_signe = ((np.roll(signes, 1) - signes) != 0).astype(bool)
    changements_signe[0] = False  # Ignorer le premier point

    # Points où le signe change
    points_zero = df_sorted[changements_signe]

    if len(points_zero) >= 2:
        # Interpoler pour trouver les valeurs exactes à Tension1 = 0
        remanants = []
        for i in range(len(points_zero) - 1):
            if points_zero.iloc[i]["Tension1"] * points_zero.iloc[i+1]["Tension1"] <= 0:
                # Points de part et d'autre de zéro
                x1, y1 = points_zero.iloc[i]["Tension1"], points_zero.iloc[i]["Tension2"]
                x2, y2 = points_zero.iloc[i+1]["Tension1"], points_zero.iloc[i+1]["Tension2"]

                # Interpolation linéaire
                if x2 - x1 != 0:  # Éviter division par zéro
                    y_zero = y1 - x1 * (y2 - y1) / (x2 - x1)
                    remanants.append(y_zero)

        return remanants

    # Si on ne trouve pas assez de points, utiliser la méthode d'approximation
    indice_plus_proche = (df["Tension1"]**2).idxmin()  # Point où Tension1 est le plus proche de 0
    return [df.loc[indice_plus_proche, "Tension2"]]

if __name__ == "__main__":
    donnees = lire_fichiers_csv()

    if not donnees:
        print("Aucun fichier CSV trouvé dans le répertoire courant")
    else:
        print(f"{len(donnees)} fichiers CSV trouvés et chargés")
        tracer_courbes_hysteresis(donnees)

    donnees24 = lire_fichier_24csv()
    if not donnees24:
        print("Aucun fichier SDS00024.CSV trouvé dans le répertoire courant")
    else:
        print(f"{len(donnees24)} fichiers SDS00024.CSV trouvés et chargés")
        tracer_courbes_hysteresis(donnees24)