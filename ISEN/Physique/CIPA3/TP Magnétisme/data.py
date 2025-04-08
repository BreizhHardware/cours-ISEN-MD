import os
import pandas as pd
import matplotlib.pyplot as plt
import glob
import numpy as np

def lire_fichiers_csv():
    """Récupère et lit tous les fichiers CSV du répertoire courant avec correction 1/10"""
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

            # Appliquer le facteur correctif 1/10
            df["Tension1"] = df["Tension1"] * 10
            df["Tension2"] = df["Tension2"] * 10

            nom = os.path.basename(fichier)
            dataframes[nom] = df

            print(f"Fichier {nom} chargé: {len(df)} lignes (facteur correctif 1/10 appliqué)")

        except Exception as e:
            print(f"Erreur lors de la lecture de {fichier}: {e}")

    return dataframes

def lire_fichier_24csv():
    """Récupère et lit le fichier SDS00024.CSV avec correction 1/10 et calcule des paramètres d'hystérésis"""
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

            # Appliquer le facteur correctif 1/10
            df["Tension1"] = df["Tension1"] *10
            df["Tension2"] = df["Tension2"] * 10

            nom = os.path.basename(fichier)
            dataframes[nom] = df

            # Calculer les paramètres avec les données corrigées
            champ_remanant = calculer_champ_remanant(df, zero_offset=-0.0025)  # Aussi divisé par 10
            print(f"Fichier {nom} chargé: {len(df)} lignes (facteur correctif 1/10 appliqué)")
            print(f"Champ rémanant (avec zéro à -0,0025V): {champ_remanant} V")

            champ_coercitif = calculer_champ_coercitif(df)
            print(f"Excitation magnétique coercitive: {champ_coercitif} V")

            aire_cycle = calculer_aire_cycle(df)
            print(f"Aire du cycle d'hystérésis: {aire_cycle:.6f} V²")

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
                if pente < 0: # Pente descentente
                    return remanants[i]

            # Si pas de pente positive, prendre la valeur la plus élevée
            return max(remanants)

        return remanants[0]

    # Si on ne trouve pas de points qui encadrent le zéro
    return None

def calculer_champ_coercitif(df):
    """
    Calcule l'excitation magnétique coercitive (valeur de Tension1 quand Tension2 = 0)
    Sélectionne les points avec une pente négative.
    """
    # Trouver les points où Tension2 change de signe
    points_zero = []
    pentes = []

    for i in range(len(df)-1):
        if df.iloc[i]["Tension2"] * df.iloc[i+1]["Tension2"] <= 0:
            # Points de part et d'autre de zéro
            y1, x1 = df.iloc[i]["Tension2"], df.iloc[i]["Tension1"]
            y2, x2 = df.iloc[i+1]["Tension2"], df.iloc[i+1]["Tension1"]

            # Calculer la pente dTension2/dTension1
            pente = (y2 - y1) / (x2 - x1) if x2 - x1 != 0 else float('inf')

            # Interpolation linéaire pour trouver Tension1 quand Tension2 = 0
            if y2 - y1 != 0:  # Éviter division par zéro
                x_zero = x1 + (0 - y1) * (x2 - x1) / (y2 - y1)
                points_zero.append(x_zero)
                pentes.append(pente)

    if points_zero:
        # On cherche le point où Tension2 = 0 avec une pente négative
        if len(points_zero) > 1:
            for i, pente in enumerate(pentes):
                if pente < 0:  # Pente négative pour le champ coercitif
                    return points_zero[i]

            # Si pas de pente négative, prendre la valeur la plus proche de zéro
            return min(points_zero, key=abs)

        return points_zero[0]

    return None

def calculer_aire_cycle(df):
    """
    Calcule l'aire du cycle d'hystérésis qui représente l'énergie dissipée par cycle.

    Args:
        df: DataFrame contenant les données Tension1 et Tension2

    Returns:
        float: Aire du cycle en V²
    """
    # S'assurer que les données sont numériques
    df_clean = df.copy()
    df_clean["Tension1"] = pd.to_numeric(df_clean["Tension1"], errors='coerce')
    df_clean["Tension2"] = pd.to_numeric(df_clean["Tension2"], errors='coerce')

    # Éliminer les valeurs NaN potentielles
    df_clean = df_clean.dropna(subset=["Tension1", "Tension2"])

    # Utiliser numpy trapz pour calculer l'intégrale fermée
    x = df_clean["Tension1"].values
    y = df_clean["Tension2"].values

    # L'aire est l'intégrale sur le cycle complet
    aire = np.abs(np.trapezoid(y, x))

    return aire

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
        print(f"{len(donnees24)} fichier SDS00024.CSV trouvé, chargé et analysé")
        tracer_courbes_hysteresis(donnees24)