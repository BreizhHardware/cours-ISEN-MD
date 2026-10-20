# TP 2.3 – Détection (CIPA5 – Traitement d'image)

Code : [detection.py](detection.py) (`python detection.py [people|lines] [--show] [--select] [--video road2.mp4]`).
Résultats (vidéos annotées, images exemples, masques) : dossier `Results/`.

## 1. Détection de personnes (atrium.avi)

Pipeline appliqué à chaque image :

| Étape | Choix | Justification |
|---|---|---|
| 1. HSV, canal V | `cv2.cvtColor(..., COLOR_BGR2HSV)[:, :, 2]` | La luminosité suffit pour voir une personne sur le sol orange uniforme ; une seule composante à traiter. |
| 2. Réduction | `resize` ×0,5 (`INTER_AREA`) | Lisse le bruit et divise le temps de calcul par 4. |
| 3. Soustraction de fond | `absdiff(première image, image courante)` | La valeur absolue capte aussi bien les objets plus sombres que plus clairs que le fond. |
| 4. Binarisation | seuil fixe 30 | Au-dessus du bruit de compression / des variations d'éclairage du sol. |
| 5. Morphologie | ouverture ellipse 3×3, puis fermeture ellipse 5×9 | L'ouverture supprime les pixels isolés ; la fermeture, plus haute que large, recolle tête, torse et jambes (couleurs de vêtements différentes) en une seule région. |
| 6. Contours | `findContours(RETR_EXTERNAL)` | Un contour = un objet détecté. |
| 7. Filtrage | aire 60–4000 px (image réduite) et rapport hauteur/largeur de la boîte entre 0,8 et 4 | Élimine les petites régions résiduelles et les formes très larges (ombres, reflets). Une personne vue d'en haut est plutôt verticale. |
| 8. Dessin | boîtes vertes, coordonnées divisées par le facteur 0,5 | Le redimensionnement impose de remettre les boîtes à l'échelle de l'image originale. |

**Résultat** : les 4540 images sont traitées ; les personnes sont encadrées correctement (exemples `people_frame*.png`, masques associés `people_mask*.png`, vidéo `people_atrium.mp4`).

**Limites** : le fond est la première image, donc tout changement de luminosité durable (ou un objet déplacé) crée de fausses détections ; deux personnes qui se croisent fusionnent en une seule boîte.

## 2. Détection de lignes (road1…road4.mp4)

Pipeline : niveaux de gris → réduction ×0,5 → flou gaussien 5×5 → Canny (40, 120) → test de présence autour de chaque marqueur → tracé.

- **Points clés** : 4 points par vidéo (bas et haut de chaque ligne). Par défaut ils sont fixés en fractions de la taille de l'image, choisis sur la première image de chaque vidéo. L'option `--select` utilise `selectROI` (centre du rectangle = point) comme demandé.
- **Vérification** : on regarde s'il existe un pixel blanc de Canny dans une marge de 8 px (image réduite) autour de chaque marqueur. Une ligne est « détectée » si ses deux extrémités le sont.
- **Dessin** : ligne verte si détectée, rouge sinon, tracée sur l'image originale (coordonnées des marqueurs en pleine résolution, le test se fait à l'échelle 0,5).

| Vidéo | Images avec les 2 lignes détectées |
|---|---|
| road1 | 54 % |
| road2 | 26 % |
| road3 | 50 % |
| road4 | 2 % |

**Analyse** :
- Les marqueurs sont **fixes** alors que le véhicule avance et que la route tourne : dès que les lignes s'écartent des marqueurs, la détection tombe (route 2, virages de la route 1). C'est une limite de la méthode demandée, pas du détecteur : sur la première image, les lignes sont détectées pour road1 et road2.
- road3 : la ligne jaune est peu contrastée, d'où des passages en rouge.
- road4 (nuit, lignes en pointillés) : un marqueur tombe souvent entre deux tirets, donc pas de contour dans la marge ; Canny est aussi perturbé par les phares et les voitures. Augmenter la marge ou suivre les lignes (Hough, ROI glissante) améliorerait nettement les résultats.
- Les seuils de Canny et la marge sont des compromis : plus bas, on détecte plus de lignes mais aussi plus de faux contours (herbe, glissières).
