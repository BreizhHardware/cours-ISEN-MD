import pandas as pd
import matplotlib.pyplot as plt

# Lire le fichier CSV
df = pd.read_csv('donnees_cours1.csv', sep=';')

# Calculer la moyenne de chaque colonne
moyennes = df.mean()
notes_classe_A = pd.concat([df['Note classe A maths'], df['Note classe A phys']])
moyenne_globale_classe_A = notes_classe_A.mean()
notes_classe_B = pd.concat([df['Note classe B maths'], df['Note classe B phys']])
moyenne_globale_classe_B = notes_classe_B.mean()

# Afficher les moyennes
print("================== Moyennes ==================")
print(moyennes)
print(f"Note classe A {moyenne_globale_classe_A}")
print(f"Note classe B {moyenne_globale_classe_B}")

# Calculer la mediane de chaque colonne
median = df.median()
notes_classe_A = pd.concat([df['Note classe A maths'], df['Note classe A phys']])
mediane_globale_classe_A = notes_classe_A.median()
notes_classe_B = pd.concat([df['Note classe B maths'], df['Note classe B phys']])
mediane_globale_classe_B = notes_classe_B.median()

print("================== Medianes ==================")
print(median)
print(f"Note classe A {mediane_globale_classe_A}")
print(f"Note classe A {mediane_globale_classe_B}")

# Calculer l'écart-type de chaque colonne
ecart_type = df.std()

print("================== Ecart-types ==================")
print(ecart_type)

# Construire un histogramme de chaque colonne (arrondie à l'entier le plus proche)
for col in df.columns:
    plt.hist(df[col].round(), bins=10)
    plt.title(col)
    plt.show()

# Comparer les notes en maths en fonction de la classe
plt.figure(figsize=(10, 6))
data = [df['Note classe A maths'], df['Note classe B maths']]
plt.boxplot(data, labels=['Classe A', 'Classe B'])
plt.title('Comparaison des notes en maths en fonction de la classe')
plt.ylabel('Notes')
plt.show()

# Comparer les notes en physique en fonction de la classe
plt.figure(figsize=(10, 6))
data = [df['Note classe A phys'], df['Note classe B phys']]
plt.boxplot(data, labels=['Classe A', 'Classe B'])
plt.title('Comparaison des notes en physique en fonction de la classe')
plt.ylabel('Notes')
plt.show()
