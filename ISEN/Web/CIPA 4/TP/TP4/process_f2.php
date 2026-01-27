<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Traitement du formulaire 2 - Triangle</title>
</head>
<body>
    <h1>Résultat du formulaire 2 - Triangle</h1>

    <?php
    // Récupération des données
    $size = isset($_GET['size']) ? intval($_GET['size']) : 0;

    $isFilled = isset($_GET['isFilled']) && $_GET['isFilled'] == 1;

    // Récupération du caractère
    $character = isset($_GET['character']) ? $_GET['character'] : '*';

    $character = htmlspecialchars(substr($character, 0, 1));
    if ($character === '') { $character = '*'; }

    echo "<h3>Paramètres reçus :</h3>";
    echo "<ul>";
    echo "<li>Taille : $size</li>";
    echo "<li>Remplissage : " . ($isFilled ? "Plein" : "Vide") . "</li>";
    echo "<li>Caractère utilisé : $character</li>";
    echo "</ul>";

    echo "<h3>Dessin :</h3>";
    echo "<pre>";

    if ($size > 0) {
        for ($row = 1; $row <= $size; $row++) {
            for ($col = 1; $col <= $row; $col++) {
                if ($row == $size || $col == 1 || $col == $row || $isFilled) {
                    echo $character;
                } else {
                    echo " ";
                }
            }
            echo "\n";
        }
    } elseif ($size == 0) {
        echo "Taille nulle.";
    } else {
        echo "Taille invalide.";
    }

    echo "</pre>";
    ?>

    <br>
    <a href="tp4.php">Retour au formulaire</a>
</body>
</html>
