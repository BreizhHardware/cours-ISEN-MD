import pandas as pd
import matplotlib.pyplot as plt

# Lire le fichier CSV
df = pd.read_csv('donnees_cours1.csv', sep=';')

# Calculer la moyenne de chaque colonne
moyennes = df.mean()

# Afficher les moyennes
print("================== Moyennes ==================")
print(moyennes)

# Calculer la mediane de chaque colonne
median = df.median()

print("================== Medianes ==================")
print(median)

# Calculer l'écart-type de chaque colonne
ecart_type = df.std()

print("================== Ecart-types ==================")
print(ecart_type)

# Construire un histogramme de chaque colonne (arrondie à l'entier le plus proche)
for col in df.columns:
    plt.hist(df[col].round(), bins=10)
    plt.title(col)
    plt.show()