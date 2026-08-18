# Pourquoi ce niveau existe

## La scène

Le syndic d'immeuble facture les charges d'énergie une fois par trimestre. Le schéma de données a
été pensé un vendredi après-midi pour "juste stocker les relevés de compteur". Deux ans plus tard :
un tarif d'électricité a changé en cours de trimestre, un logement a changé de propriétaire au
milieu d'une période de facturation, et un relevé de compteur a été saisi deux fois par erreur par
deux gestionnaires différents le même jour. Le calcul de refacturation, qui tourne très bien sur les
données de test, produit des factures fausses pour douze logements, découvertes seulement quand un
copropriétaire conteste sa facture avec le relevé papier en main.

Le bug n'est pas dans le calcul. Il est dans le schéma : rien n'a été pensé pour qu'un tarif change
dans le temps, pour qu'un logement change de propriétaire, ou pour détecter un doublon de saisie.
Le calcul est correct sur un modèle de données qui ne représente pas la réalité.

## Ce qui se passe vraiment

Le code applicatif se réécrit facilement. Le schéma de données, non : il porte les données de
production, et chaque changement de structure est un projet en soi (migration, risque de perte,
coordination avec le code qui le lit). Un mauvais choix de modélisation au démarrage d'un projet est
souvent le choix technique le plus cher à corriger de tout le projet, précisément parce qu'il est
invisible au début : tout marche très bien avec dix lignes de données de test.

```text
Coût de corriger un mauvais choix       Moment où le coût est payé
------------------------------         --------------------------
Nom de variable mal choisi              Immédiat, trivial (renommage)
Fonction mal découpée                    Quelques heures (refactoring)
Endpoint API mal conçu                   Quelques jours (versionnage, migration clients)
Schéma de données mal modélisé           Des mois, souvent en pleine nuit,
                                          souvent après une perte de données réelle
```

## Pourquoi ce niveau ne parle pas que de SQL

Une bonne modélisation commence avant toute syntaxe : identifier les vraies entités du domaine, ce
qui doit rester vrai en toutes circonstances (les invariants), et ce qui change dans le temps. Le
SQL et l'ORM ne sont que la traduction de ces décisions. Un schéma SQL parfaitement normalisé qui
modélise le mauvais domaine reste un mauvais schéma.

## Le rôle du temps, sous-estimé partout

La plupart des schémas mal conçus partagent un même angle mort : ils modélisent l'état présent des
choses ("le tarif est de 0,21€/kWh") sans modéliser leur histoire ("le tarif était de 0,19€/kWh
jusqu'au 1er mars, puis 0,21€/kWh"). Toute donnée qui peut changer un jour a besoin d'une réponse
claire à la question : quand ce changement a-t-il eu lieu, et que doit-il se passer pour les
enregistrements qui existaient avant ?

```text
Sans historisation                       Avec historisation
-------------------                      -------------------
logements.proprietaire_id     -->        occupations(logement_id, proprietaire_id,
  (une seule valeur, écrasée                        date_debut, date_fin)
   à chaque changement)        -->        chaque facture rejoue "qui habitait
                                            là, à cette date précise"

tarifs.prix_kwh (un seul       -->        tarifs_historique(prix_kwh, date_debut,
 prix, écrasé au changement)                              date_fin)
                                --> une facture de mars applique le prix de
                                    mars, même calculée en juin
```

## Qui souffre en premier

Le copropriétaire souffre en premier, en silence, en recevant une facture fausse sans comprendre
pourquoi. Le gestionnaire souffre en second, en devant justifier un chiffre qu'il ne peut plus
reconstituer lui-même six mois après, parce que la donnée qui aurait permis de le recalculer a été
écrasée par la valeur suivante.

## À quel moment du projet ça se manifeste

Jamais en phase de développement, où les jeux de données sont petits, cohérents et rejoués depuis
zéro à chaque test. Le problème apparaît à l'usage réel : après le premier changement de tarif en
cours de période, après le premier déménagement au milieu d'un trimestre, après la première saisie
en double faite par une main humaine pressée. C'est-à-dire : jamais avant la production, et souvent
plusieurs mois après le lancement, quand personne ne relit plus le schéma avec un oeil critique.

## Ce que ce niveau ne couvre pas

Ce niveau ne couvre pas la conception des écrans qui affichent ces données (traitée au
[niveau 04](../01-USER-WIZARD/README.md)) ni la façon d'exposer ces données via une API (traitée au
[niveau 07](../20-API-DOJO/README.md)). Il se concentre sur la structure qui rend les deux fiables
ou fragiles en amont.

## Analogie

Analogie : une migration de schéma, c'est le passage de commande en cuisine pendant le service, et
le changement de voile en pleine mer.
Où l'analogie casse : en cuisine et en mer, on peut interrompre une seconde. Une migration tourne
sur des données vivantes que personne n'a mises en pause, et un rollback n'annule pas ce que les
clients ont déjà lu ou payé entre-temps.

## Contre-exemple : quand la sur-modélisation coûte plus qu'elle ne rapporte

Un prototype jetable, testé avec cinq utilisateurs internes pendant deux semaines pour valider une
idée, n'a pas besoin d'historisation complète ni de contraintes d'intégrité exhaustives : le coût de
modéliser proprement le temps dépasse le bénéfice si le schéma entier sera jeté après le test. La
règle s'applique aux données qui vont vivre en production, pas aux données jetables par construction.

## Ce que tu sais faire à la sortie

- Identifier les entités réelles d'un domaine avant d'écrire une seule table.
- Repérer une donnée qui va changer dans le temps et décider consciemment comment l'historiser.
- Choisir un niveau de normalisation adapté au risque réel de duplication, pas par principe.
- Écrire une migration qui ne perd et ne fausse aucune donnée existante.
- Écrire une requête qui reste rapide quand le volume de données est multiplié par cent.

## Le mécanisme sous-jacent

Un schéma de données encode des décisions qui restent vraies bien après que le code qui les a
écrites a été réécrit dix fois. La question à se poser avant de créer une table n'est pas "comment
je stocke ça facilement" mais "qu'est-ce qui doit rester vrai ici, même dans le pire cas". Un
invariant non modélisé en base finit toujours par être violé en production, tôt ou tard, parce
qu'aucune ligne de code applicatif ne peut garantir à 100% ce que la base elle-même n'impose pas.

```text
Invariant du domaine                     Où il doit vivre
---------------------                    -----------------
"un logement a un seul                   contrainte d'unicité sur
 propriétaire actif à la fois"           (logement_id, date_fin IS NULL)

"un relevé de compteur ne peut           contrainte d'unicité sur
 pas être saisi deux fois le             (compteur_id, date_releve)
 même jour"

"le prix appliqué à une facture          jointure sur la période de
 est celui en vigueur à la date          validité du tarif, jamais
 de consommation, pas celui du           le prix "actuel" de la table
 jour de calcul"                         tarifs
```

Coder ces trois règles uniquement dans le service de facturation fonctionne, jusqu'au jour où un
script de correction manuelle, un import en masse, ou un deuxième service écrit par une autre
équipe insère une ligne directement en base sans repasser par ce service. La contrainte posée au
niveau du schéma protège contre ce cas-là aussi, sans qu'on ait à s'en souvenir.

## Le coût de l'apprentissage

Compter 4 à 5 heures de lecture pour les cinq leçons de ce niveau, et un temps de pratique plus
long que prévu : penser en termes d'invariants et d'historisation ne devient un réflexe qu'après
avoir modélisé quelques schémas réels, pas après avoir lu la théorie une fois.

## Comment savoir que tu maîtrises

Le signal observable : face à une nouvelle table, tu listes spontanément ce qui doit rester vrai
(les invariants) et ce qui va changer dans le temps (ce qui a besoin d'historisation), avant même
de choisir les types de colonnes. Un deuxième signal : tu sais expliquer, sans relire la doc, ce
qui casserait si tu supprimais une contrainte d'unicité donnée.

## Ce que l'IA fait à ta place, et ce qu'elle ne fait pas

Une IA génère très vite un schéma plausible à partir d'une description de fonctionnalités. Elle ne
connaît pas les invariants tacites du métier (par exemple qu'un compteur d'énergie ne peut pas
reculer, sauf remplacement) : ces règles vivent dans la tête des experts métier, pas dans le
vocabulaire générique d'un modèle de langage. Le rôle qui reste le tien : interroger le métier pour
extraire ces règles, puis vérifier que le schéma proposé les encode réellement, pas seulement les
noms de tables qui sonnent juste.

## Comment ce niveau est réutilisé plus tard

Le schéma construit ici porte directement les contrats d'API du [niveau 07](../20-API-DOJO/README.md)
et les décisions d'architecture du [niveau 06](../15-ARCHI-LAB/README.md) : une entité mal nommée ou
mal bornée ici se retrouve dans chaque endpoint qui la sert.

## Ce que tu dois savoir défendre

- Donne un exemple concret où modéliser "l'état actuel" sans "l'historique" produit un résultat
  faux, pas juste incomplet.
- Pourquoi une erreur de modélisation de données coûte-t-elle structurellement plus cher à corriger
  qu'une erreur de code applicatif ?
- Pourquoi la modélisation doit-elle précéder le choix technique (SQL, ORM, NoSQL), et pas
  l'inverse ?
