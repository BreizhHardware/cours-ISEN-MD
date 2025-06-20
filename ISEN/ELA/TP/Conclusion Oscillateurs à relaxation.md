**Conclusion**

L'objectif de ce TP était d'étudier et d'expérimenter les oscillateurs à relaxation en utilisant des composants spécifiques tels que le NE555 et le LM311. À travers ce TP, nous avons pu observer et mesurer les caractéristiques essentielles des circuits astables et comprendre leur fonctionnement basé sur les charges et décharges successives d'un condensateur.

Nous avons réalisé un oscillateur à $12 kHz$ avec un rapport cyclique de **75%** en utilisant le NE555. L'ajout d'un condensateur de découplage de $10 µF$ entre VCC et GND a permis de lisser le signal et de limiter les appels de courant, réduisant ainsi les chutes de tension. L'évolution du signal THRESHOLD a confirmé le rapport cyclique de **75%**, et les mesures de fréquence et de rapport cyclique du signal de sortie étaient conformes aux valeurs théoriques de $12 kHz$ et **75%**.

En utilisant le LM311, nous avons réalisé un comparateur à hystérésis et relevé sa fonction de transfert. La résistance $R_{4}$ a été utilisée comme résistance de pull-up, et les seuils de basculement mesurés étaient $VTH = 4V$ et $VTL = 5V$. La courbe expérimentale obtenue correspondait à la courbe théorique, confirmant ainsi les principes de fonctionnement étudiés.

Ce TP nous a permis de comprendre et d'expérimenter les différents modes de fonctionnement des oscillateurs à relaxation et des comparateurs à hystérésis. Nous avons étudié les montages astables et vérifié expérimentalement leurs caractéristiques. Les résultats obtenus sont conformes aux attentes théoriques.