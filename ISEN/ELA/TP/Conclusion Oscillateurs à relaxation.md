<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conclusion TP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f4f4f9;
        }
        .cover-container {
            text-align: center;
            background-color: white;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        .cover-container h1 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin-bottom: 0.3rem;
        }
        .cover-container h2 {
            font-size: 1.2rem;
            color: #3498db;
            margin-top: 0;
        }
        .cover-container p {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 0.2rem 0;
        }
    </style>
</head>
<body>
    <div class="cover-container">
        <img src="https://isen-nantes.fr/wp-content/uploads/2023/11/ISEN-Nantes.png" alt="Logo" style="width: 33%; display: block; margin-left: auto; margin-right: auto;">
        <h1>CONCLUSION DE TP</h1>
        <h2>Oscillateur à relaxation</h2>
        <p>Présenté par : Matéo LE TOUZIC et Félix MARQUET</p>
        <p>Date : 23/06/2025</p>
        <br>
    </div>
</body>
</html>

L'objectif de ce TP était d'étudier et d'expérimenter les oscillateurs à relaxation en utilisant des composants spécifiques tels que le NE555 et le LM311. À travers ce TP, nous avons pu observer et mesurer les caractéristiques essentielles des circuits astables et comprendre leur fonctionnement basé sur les charges et décharges successives d'un condensateur.

Nous avons réalisé un oscillateur à $12 kHz$ avec un rapport cyclique de **75%** en utilisant le NE555. L'ajout d'un condensateur de découplage de $10 µF$ entre VCC et GND a permis de lisser le signal et de limiter les appels de courant, réduisant ainsi les chutes de tension. L'évolution du signal THRESHOLD a confirmé le rapport cyclique de **75%**, et les mesures de fréquence et de rapport cyclique du signal de sortie étaient conformes aux valeurs théoriques de $12 kHz$ et **75%**.

En utilisant le LM311, nous avons réalisé un comparateur à hystérésis et relevé sa fonction de transfert. La résistance $R_{4}$ a été utilisée comme résistance de pull-up, et les seuils de basculement mesurés étaient $VTH = 4V$ et $VTL = 5V$. La courbe expérimentale obtenue correspondait à la courbe théorique, confirmant ainsi les principes de fonctionnement étudiés.

Ce TP nous a permis de comprendre et d'expérimenter les différents modes de fonctionnement des oscillateurs à relaxation et des comparateurs à hystérésis. Nous avons étudié les montages astables et vérifié expérimentalement leurs caractéristiques. Les résultats obtenus sont conformes aux attentes théoriques.