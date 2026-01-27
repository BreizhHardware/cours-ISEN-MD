<!doctype html>
<html lang="fr">
  <head>
    <!-- Meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Title -->
    <title>TP n°4 - Premiers pas PHP</title>
  </head>
  <body>
    <h1>TP n°4 - Premiers pas PHP</h1>
    <hr>

    <!-- Premiers pas -->
    <h2>Premiers pas</h2>
    <?php
        echo 'Bonjour, nous sommes le '.date('d/m/Y').', il est '.date('H:i:s');
    ?>

    <br><br>

    <!-- Premier formulaire -->
    <h2>Premier formulaire</h2>
    <form action="process_f1.php" method="POST">
      <h3>Nous aimerions mieux vous connaître :</h3>
      <label for="languages">Quelles langues parlez-vous (utilisez la touche <i>CTRL</i> pour en choisir plusieurs) :</label>
      <br><br>
      <select name="languages[]" multiple="multiple" id="languages">
          <option value="français">Français</option>
          <option value="anglais">Anglais</option>
          <option value="allemand">Allemand</option>
          <option value="espagnol">Espagnol</option>
      </select>
      <br><br>
      Quels sont vos compétences en informatique (choisir au minimum 2 langages) :
      <br>
      <label for="html">HTML</label>
      <input type="checkbox" name="competences[]" value="HTML" id="html">&nbsp;
      <label for="css">CSS</label>
      <input type="checkbox" name="competences[]" value="CSS" id="css">&nbsp;
      <label for="php">PHP</label>
      <input type="checkbox" name="competences[]" value="PHP" id="php">&nbsp;
      <label for="sql">SQL</label>
      <input type="checkbox" name="competences[]" value="SQL" id="sql">&nbsp;
      <label for="js">JavaScript</label>
      <input type="checkbox" name="competences[]" value="JavaScript" id="js">&nbsp;
      <label for="python">Python</label>
      <input type="checkbox" name="competences[]" value="Python" id="python">&nbsp;
      <label for="c">C</label>
      <input type="checkbox" name="competences[]" value="C" id="c">&nbsp;
      <label for="cpp">C++</label>
      <input type="checkbox" name="competences[]" value="C++" id="cpp">
      <br><br>
      <input type="reset" value="Effacer">
      <input type="submit" value="Envoyer">
    </form>
    <br>

    <!-- Second formulaire -->
    <h2>Second formulaire</h2>
    <form action="process_f2.php" method="GET">
      <h3>Dessin d'un triangle :</h3>
      <label for="size">Longueur du coté :</label>
      <input type="number" min="0" name="size" id="size">
      <br>
      <input type="radio" name="isFilled" id="v0" value="0" checked>&nbsp;
      <label for="v0">Intérieur vide</label>
      <input type="radio" name="isFilled" id="v1" value="1">&nbsp;
      <label for="v1">Intérieur plein</label>
      <br>
      <label for="character">Caractère à utiliser :</label>
      <select name="character" id="character">
        <?php
          $characters = array('*', '#', 'o', 'x') ;
          foreach ($characters as $character)
            echo '<option value="'.$character.'">'.$character.'</option>';
        ?>
      </select>
      <br><br>
      <input type="reset" value="Effacer">
      <input type="submit" value="Envoyer">
    </form>
  </body>
</html>
