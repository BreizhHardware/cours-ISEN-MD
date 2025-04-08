import os
import pandas as pd
import matplotlib.pyplot as plt
import glob
import numpy as np

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
    """Récupère et lit le fichier SDS00024.CSV et calcule le champ rémanent avec décalage"""
    fichiers_csv = glob.glob("SDS00024.CSV")
    dataframes = {}

    for fichier in fichiers_csv:
        try:
            # Lire et préparer le fichier comme avant
            df = pd.read_csv(fichier, header=None, names=["Temps", "Tension1", "Tension2"])

            if isinstance(df.iloc[0, 0], str) and "Source" in df.iloc[0, 0]:
                df = df.iloc[2:].reset_index(drop=True)

            for col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce')

            nom = os.path.basename(fichier)
            dataframes[nom] = df

            # Calculer le champ rémanent avec le décalage de -0,025V
            champ_remanant = calculer_champ_remanant(df, zero_offset=-0.025)
            print(f"Fichier {nom} chargé: {len(df)} lignes")
            print(f"Champ rémanant (avec zéro à -0,025V): {champ_remanant} V")

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

def calculer_champ_remanant(df, zero_offset=-0.025):
    """
    Calcule le champ rémanant (valeur de Tension2 quand Tension1 = zero_offset)
    Sélectionne le point avec une pente POSITIVE.
    """
    # Trier les données par ordre croissant de Tension1
    df_sorted = df.sort_values("Tension1")

    # Trouver les points qui encadrent le zéro décalé
    points_proches = []
    for i in range(len(df_sorted)-1):
        if (df_sorted.iloc[i]["Tension1"] - zero_offset) * (df_sorted.iloc[i+1]["Tension1"] - zero_offset) <= 0:
            points_proches.append((i, i+1))

    if points_proches:
        # Interpoler pour trouver les valeurs exactes au zéro décalé
        remanants = []
        pentes = []

        for i, j in points_proches:
            x1, y1 = df_sorted.iloc[i]["Tension1"], df_sorted.iloc[i]["Tension2"]
            x2, y2 = df_sorted.iloc[j]["Tension1"], df_sorted.iloc[j]["Tension2"]

            # Calculer la pente
            pente = (y2 - y1) / (x2 - x1) if x2 - x1 != 0 else float('inf')

            # Interpolation linéaire
            if x2 - x1 != 0:
                y_zero = y1 + (zero_offset - x1) * (y2 - y1) / (x2 - x1)
                remanants.append(y_zero)
                pentes.append(pente)

        # Si on a trouvé plusieurs points, prendre celui avec pente positive
        if len(remanants) > 1:
            for i, pente in enumerate(pentes):
                if pente > 0:  # Courbe ascendante (pente positive)
                    return remanants[i]

            # Si pas de pente positive, prendre la valeur la plus élevée
            return max(remanants)

        return remanants[0]

    # Si on ne trouve pas de points qui encadrent le zéro
    return None

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