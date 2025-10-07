#IA #CIPA4 
## 1. Généralités sur l'IA et l'Apprentissage Automatique

### 1.1 Définitions
- **IA** : Systèmes capables d'imiter des fonctions cognitives humaines (raisonnement, apprentissage, prise de décision).
- **Machine Learning (ML)** : Sous-domaine de l'IA où les modèles apprennent à partir de données sans programmation explicite.
- **Deep Learning (DL)** : ML utilisant des réseaux de neurones profonds pour traiter des données complexes (images, texte, audio).

### 1.2 Types d'Apprentissage

| Type                     | Description                                                                 | Exemple                                  |
|--------------------------|-----------------------------------------------------------------------------|------------------------------------------|
| **Supervisé**            | Données étiquetées (input + output connu).                                  | Classification de spam, régression.      |
| **Non Supervisé**        | Données non étiquetées, découverte de structures cachées.                  | Clustering, réduction de dimension.      |
| **Semi-Supervisé**       | Mélange de données étiquetées/non étiquetées.                               | Reconnaissance d'images avec peu de labels. |
| **Par Renforcement**     | Agent apprend par essais/erreurs via des récompenses.                      | Jeux vidéo, robotique.                   |

## 2. Apprentissage Supervisé

### 2.1 Concepts Clés
- **Régression** : Prédire une valeur continue (ex: prix d'une maison).
- **Classification** : Prédire une catégorie (ex: chat/chien).
- **Métriques d'évaluation** :
  - **Accuracy** : `(TP + TN) / (TP + TN + FP + FN)`
  - **Précision** : `TP / (TP + FP)`
  - **Rappel (Recall)** : `TP / (TP + FN)`
  - **F1-Score** : `2 * (Précision * Rappel) / (Précision + Rappel)`
  - **Courbe ROC/AUC** : Évalue la performance du classifieur à différents seuils.

### 2.2 Algorithmes Courants

| Algorithme               | Utilisation                                  | Code Scikit-Learn (Exemple)                     |
|--------------------------|----------------------------------------------|-----------------------------------------------|
| **Régression Linéaire**  | Prédire une valeur continue.                 | `from sklearn.linear_model import LinearRegression` |
| **SGDClassifier**        | Classification binaire/multi-classe.         | `from sklearn.linear_model import SGDClassifier` |
| **KNN**                  | Classification par similarité.               | `from sklearn.neighbors import KNeighborsClassifier` |
| **Arbres de Décision**   | Classification/Régression non linéaire.       | `from sklearn.tree import DecisionTreeClassifier` |
| **Random Forest**        | Ensemble d'arbres de décision.               | `from sklearn.ensemble import RandomForestClassifier` |
| **SVM**                  | Classification avec marge maximale.          | `from sklearn.svm import SVC`                  |

### 2.3 Exemples de Code (TP1 & TP2)

#### Régression Linéaire (TP1)
```python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)  # Apprentissage
y_pred = model.predict(X_test)  # Prédiction
```

#### Classification Binaire (TP2 - Détection du chiffre 5)
```python
from sklearn.linear_model import SGDClassifier
sgd_clf = SGDClassifier(random_state=42)
sgd_clf.fit(X_train, y_train_5)  # y_train_5 = (y_train == 5)
y_pred = sgd_clf.predict([some_digit])  # Prédit True/False
````

#### Matrice de Confusion
```python
from sklearn.metrics import confusion_matrix
cm = confusion_matrix(y_true, y_pred)
print(cm)
```

#### Validation Croisée (Cross-Validation)
```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(sgd_clf, X_train, y_train_5, cv=3, scoring="accuracy")
print(f"Accuracy moyenne: {scores.mean():.2f}")
```

#### Précision/Rappel
```python
from sklearn.metrics import precision_score, recall_score
precision = precision_score(y_train_5, y_pred)
recall = recall_score(y_train_5, y_pred)
print(f"Précision: {precision:.2f}, Rappel: {recall:.2f}")
```

#### Standardisation des Données
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
```



---

&copy Félix MARQUET