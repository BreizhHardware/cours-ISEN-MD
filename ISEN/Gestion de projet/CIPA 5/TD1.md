## A. Contexte et objectifs

**Problème.** Mécatech (PME, 85 salariés, 6 machines d'usinage en 2 équipes) consigne ses arrêts de production sur papier, puis les ressaisit chaque semaine dans un tableur. Résultat : écarts entre déclarations, causes d'arrêt mal identifiées, bilan peu fiable. La direction veut un tableau de bord connecté, d'abord sur 2 machines pilotes, avec une enveloppe estimée à 35 k€.

**Objectifs évaluables**

|#|Objectif|Ce qu'il faut mesurer|
|---|---|---|
|O1|Fiabiliser l'enregistrement des arrêts sur les 2 machines pilotes : au moins 95 % des arrêts détectés avec une cause codée à la fin du pilote|Taux d'arrêts avec cause renseignée ; écart entre arrêts détectés automatiquement et arrêts déclarés par les opérateurs|
|O2|Fournir un bilan hebdomadaire des arrêts par cause (Pareto) sans ressaisie manuelle, en moins de 15 min de préparation|Temps de production du bilan avant/après ; nombre de ressaisies (cible : 0)|

## B. QQOQCCP

|Question|Connu|À éclaircir|
|---|---|---|
|**Qui**|Commanditaire : directeur de production. Concernés : maintenance, opérateurs, production, informatique|Sponsor et décideur final ; qui consulte quelles données (droits d'accès) ; qui saisit les causes|
|**Quoi**|Un tableau de bord connecté pour comprendre pourquoi les machines s'arrêtent|Quels arrêts comptabiliser (pannes, réglages, changements de série, pauses ?) ; nomenclature des causes|
|**Où**|Atelier de Mécatech, 6 machines d'usinage dont 2 pilotes|Quelles machines pilotes ; présence de capteurs exploitables ; réseau de l'atelier adapté ?|
|**Quand**|« Avant la fin du trimestre » ; pilote avant tout déploiement|Date exacte ; ce qui doit être livré à cette date (pilote en service ou simple prototype ?) ; calendrier du déploiement sur les 4 autres machines|
|**Comment**|Remplacer papier + tableur par une collecte connectée|Mode de collecte (capteurs, automate, saisie tablette) ; intégration avec le SI existant|
|**Combien**|Enveloppe prévisionnelle de 35 000 € (estimation non validée)|Budget validé ou non ; ce qu'il couvre (matériel, licences, prestation, temps interne) ; coût du déploiement futur|
|**Pourquoi**|Identifier les causes d'arrêt et établir un bilan fiable|Indicateur cible (TRS, nombre d'heures d'arrêt, etc.) ; gain attendu chiffré|

## C. Périmètre

**Inclus dans la V1**

1. Collecte des états de marche/arrêt sur **2 machines pilotes**.
2. Saisie ou sélection de la cause d'arrêt par l'opérateur (liste de causes normalisée).
3. Tableau de bord avec arrêts par machine, durée et cause, et bilan hebdomadaire.
4. Accès en consultation pour production et maintenance, avec droits définis.

**Exclusions**

1. Déploiement sur les 4 autres machines : exclu de la V1, décision après le pilote.
2. Interfaçage avec l'ERP/GMAO et analyse prédictive de maintenance : exclus.

## D. Exigences vérifiables

|#|Exigence|Type|Critère / test de vérification|
|---|---|---|---|
|E1|Le système détecte et horodate chaque arrêt de machine pilote de plus de 1 min|Fonctionnelle|Test sur 1 semaine de production : comparaison des arrêts détectés avec un relevé manuel de contrôle, écart ≤ 5 %|
|E2|L'opérateur associe une cause à un arrêt en moins de 30 s depuis le poste|Fonctionnelle|Test d'usage avec 3 opérateurs des deux équipes : temps chronométré ≤ 30 s|
|E3|Le tableau de bord est disponible et à jour avec un délai ≤ 5 min, avec une disponibilité ≥ 98 % pendant les heures de production|Non fonctionnelle|Suivi des logs sur la période pilote ; mesure du délai entre l'arrêt et son affichage|

## E. Contraintes, livrables et hypothèses

**Contraintes**

1. **Délai** : fin du trimestre (échéance à préciser).
2. **Budget** : 35 k€ maximum, estimation non validée.
3. **Production** : ne pas perturber l'activité de l'atelier (deux équipes, installation à planifier sur des créneaux d'arrêt).

**Livrables**

1. Solution pilote opérationnelle sur 2 machines (collecte + tableau de bord).
2. Dossier de recette et guide utilisateur (nomenclature des causes, procédure de saisie), avec un bilan du pilote et des recommandations pour le déploiement.

**Hypothèses à valider**

1. Les 2 machines pilotes disposent de signaux exploitables (capteurs ou sorties automate).
2. Le réseau de l'atelier permet la remontée des données sans gros travaux, avec l'accord du service informatique.

## F. Questions prioritaires au commanditaire

1. **Que doit-on avoir livré à la fin du trimestre** (pilote en production, prototype, étude) et à quelle date exacte ? _Impact : planning, périmètre, faisabilité._
2. **Les 35 000 € sont-ils validés, et que couvrent-ils** (matériel, licences, prestation, temps interne) ? _Impact : choix techniques et solution possible._
3. **Quels arrêts doivent être comptabilisés, et quelles machines servent de pilotes (capteurs et réseau disponibles) ?** _Impact : définition des indicateurs, architecture, coût._