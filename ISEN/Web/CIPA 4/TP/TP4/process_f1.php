<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Traitement du formulaire 1</title>
</head>
<body>
    <h1>Résultat du formulaire 1</h1>

    <?php
    // Vérification et affichage des langues parlées
    if (isset($_POST['languages']) && !empty($_POST['languages'])) {
        echo "<h3>Vous parlez :</h3>";
        echo "<ul>";
        foreach ($_POST['languages'] as $langue) {
            echo "<li>" . htmlspecialchars($langue) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>Aucune langue sélectionnée.</p>";
    }

    // Vérification et affichage des compétences informatiques
    if (isset($_POST['competences']) && !empty($_POST['competences'])) {
        echo "<h3>Vos compétences :</h3>";
        echo "<ul>";
        foreach ($_POST['competences'] as $competence) {
            echo "<li>" . htmlspecialchars($competence) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>Aucune compétence sélectionnée.</p>";
    }
    ?>

    <br>
    <a href="tp4.php">Retour au formulaire</a>
</body>
</html>
