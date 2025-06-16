# Fiche de Révision : Électronique

## Oscillateurs à Relaxation

### NE555 en mode Astable

- **Fréquence d'oscillation** :
  \( f = \frac{1.44}{(R_A + 2R_B)C} \)

- **Rapport cyclique** :
  \( D = \frac{R_A + R_B}{R_A + 2R_B} \)

- **Durée des états haut et bas** :
  \( t_H = 0.693(R_A + R_B)C \)
  \( t_L = 0.693(R_B)C \)

Pour choisir \( R_A \) et \( R_B \), fixez la fréquence d'oscillation souhaitée et le rapport cyclique, puis résolvez les équations ci-dessus.

### Transistor Bipolaire en Commutation

- **État bloqué** : \( I_C = 0 \)
- **État saturé** : \( I_C \geq 0 \)

## Amplificateurs Opérationnels

### Montages de base

- **Amplificateur inverseur** :
  \( A_v = -\frac{R_2}{R_1} \)

  Choisissez \( R_1 \) et calculez \( R_2 \) pour obtenir le gain \( A_v \) souhaité.

- **Amplificateur non-inverseur** :
  \( A_v = 1 + \frac{R_2}{R_1} \)

  Choisissez \( R_1 \) et calculez \( R_2 \) pour obtenir le gain \( A_v \) souhaité.

- **Suiveur** :
  \( A_v = 1 \)

### Défauts dynamiques

- **Slew Rate** :
  \( SR = \left|\frac{\Delta V_s}{\Delta t}\right|_{\text{max}} \)

- **Produit gain-bande passante** :
  \( GBP = A_v \times B \)

### Comparateur à Hystérésis

- **Seuils de basculement** :
  \( V_{TH} = V_{CC} \frac{R_1}{R_1 + R_2} \)
  \( V_{TL} = -V_{CC} \frac{R_1}{R_1 + R_2} \)

Choisissez \( R_1 \) et \( R_2 \) en fonction des tensions de seuil souhaitées et de la tension d'alimentation \( V_{CC} \).

## Oscillateur à Pont de Wien

### Fonction de transfert du circuit de Wien

- **Fonction de transfert** :
  \( TF(\omega) = \frac{V_F}{V_S} = \frac{K}{1 + jQ\left(\frac{f}{f_0} - \frac{f_0}{f}\right)} \)

- **Fréquence centrale** :
  \( f_0 = \frac{1}{2\pi RC} \)

- **Facteur de qualité** :
  \( Q = \frac{1}{3 - K} \)

### Condition d'oscillation

- **Condition d'oscillation** :
  \( A \cdot F = 1 \)

- **Fréquence d'oscillation** :
  \( f_{osc} = \frac{1}{2\pi RC} \)

Pour une fréquence d'oscillation souhaitée, choisissez \( C \) et calculez \( R \).

### Contrôle de l'amplitude

- **Amplification non linéaire** :
  \( A = \frac{R_A + R_B}{R_B} \left(1 - \frac{2R}{R + R_C}\right) \)

# Calcul de la Résistance \( R_5 \) pour un Oscillateur à Relaxation

Pour déterminer la valeur de la résistance $R_5$ dans un circuit oscillateur à relaxation utilisant un comparateur à hystérésis, suivez ces étapes :

## Contexte du Circuit

La période d'oscillation $T$ d'un oscillateur à relaxation utilisant un comparateur à hystérésis peut être approximée par la formule :

$T \approx 2RC \ln\left(\frac{V_{CC} - V_{TL}}{V_{CC} - V_{TH}}\right)$

où :
- $R$ est la résistance (dans ce cas, $R_5$),
- $C$ est la capacité,
- $V_{CC}$ est la tension d'alimentation,
- $V_{TL}$ et $V_{TH}$ sont les tensions de seuil bas et haut du comparateur à hystérésis.

## Étapes pour Calculer \( R_5 \)

1. **Déterminer la période d'oscillation $T$** :
   Pour un oscillateur à 25 kHz, la période $T$ est donnée par :

   $T = \frac{1}{f} = \frac{1}{25 \text{ kHz}} = 40 \text{ µs}$

2. **Connaître les tensions de seuil $V_{TL}$ et $V_{TH}$** :
   Ces tensions dépendent de la configuration du comparateur à hystérésis. Assurez-vous de les déterminer à partir du circuit ou des spécifications.

3. **Connaître la valeur de la capacité $C$** :
   Dans cet exemple, $C = 1 \text{ nF}$.

4. **Insérer les valeurs dans la formule et résoudre pour $R$** :

   Supposons que $V_{CC} = 9 \text{ V}$, $V_{TL} = 3 \text{ V}$, et $V_{TH} = 6 \text{ V}$. Vous pouvez calculer $R$ comme suit :

   $40 \text{ µs} \approx 2 \cdot R \cdot 1 \text{ nF} \cdot \ln\left(\frac{9 - 3}{9 - 6}\right)$

   Calculons cela :

   $40 \text{ µs} \approx 2 \cdot R \cdot 1 \text{ nF} \cdot \ln(2)$

   En utilisant $\ln(2) \approx 0.693$ :

   \[ R \approx \frac{40 \text{ µs}}{2 \cdot 0.693 \cdot 1 \text{ nF}} \]

   \[ R \approx \frac{40 \text{ µs}}{1.386 \text{ nF}} \]

   \[ R \approx 28.85 \text{ kΩ} \]

## Conseils pour Choisir les Résistances

1. **Valeurs standard** : Utilisez des valeurs standard de résistances pour faciliter l'approvisionnement et le prototypage.
2. **Puissance** : Assurez-vous que les résistances peuvent supporter la puissance dissipée dans le circuit.
3. **Tolérance** : Choisissez des résistances avec une tolérance appropriée pour votre application.
4. **Stabilité thermique** : Pour les applications sensibles à la température, choisissez des résistances avec un faible coefficient de température.
