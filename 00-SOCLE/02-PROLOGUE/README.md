---
stability: intemporel
acte: comprendre
route: complete
---

# Module 00-SOCLE/02-PROLOGUE : Prologue

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | Niveau précédent : aucun | [Niveau suivant](../06-MINDSET/README.md)

**Ce niveau réutilise :** Rien : c'est le point d'entrée du parcours, il n'y a pas de niveau amont.

**Auto-test d'entrée :**

1. Es-tu prêt à lire ce curriculum dans l'ordre sans sauter d'étape même si un chapitre te semble déjà connu ?
2. Sais-tu déjà pourquoi "j'ai codé cette feature" n'est pas en soi une preuve de compétence ?
3. As-tu un projet fil rouge réel (ou es-tu prêt à en choisir un) pour appliquer chaque niveau, plutôt que de rester en lecture passive ?

**Verdict de l'auto-test :** ces trois questions n'ont pas de note. Une seule réponse
hésitante n'empeche pas d'entrer ici : c'est le point de depart du parcours.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Test de calibrage du projet fil rouge

Ton projet fil rouge conditionne les 130 heures suivantes. Trop petit, le 08-DATA-SPELLS n'a rien à
modéliser et le capstone est vide. Trop gros, le capstone est ingérable et tu abandonnes à la
semaine dix. Tu n'as pas encore le jugement pour trancher à l'instinct : utilise la grille.

Coche, honnêtement, en écrivant l'exemple concret à côté de chaque ligne :

| #   | Critère binaire                                                                | Ce qu'il faut pouvoir écrire                        |
| --- | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| 1   | Au moins **4 entités métier distinctes**                                       | leurs noms, et ce qui les distingue                 |
| 2   | Au moins **2 rôles d'utilisateur aux droits différents**                       | qui peut faire quoi, et surtout quoi il ne peut pas |
| 3   | Au moins **1 règle de concurrence** : deux personnes veulent la même ressource | la ressource, et qui gagne                          |
| 4   | Un **historique qui doit rester vrai** même si le présent change               | le fait figé, et pourquoi il ne doit pas bouger     |
| 5   | Une **contrainte de temps réelle** : créneau, échéance, délai, expiration      | la contrainte, et ce qui casse si elle est violée   |

**Verdict :** moins de 4 critères sur 5, tu changes de projet maintenant. Pas dans deux semaines.

Exemples calibrés : réservation de salles d'un club de sport, planning de bénévoles d'une
association, suivi de prêts de matériel dans un lycée, facturation d'un artisan avec acomptes.
Exemples disqualifiés : list (0/5), blog personnel (1/5), portfolio (0/5), clone d'une
application connue sans utilisateur réel (aucun besoin observé, donc rien à cadrer au 01-PROBLEM-HUNT).

Écris ce tableau rempli et daté dans ton journal : c'est le livrable du 00-SOCLE.

## Ce que c'est

Ce niveau n'apprend aucune technologie. Il installe les règles du jeu avant que tu touches
un clavier avec l'intention de "monter en compétence". C'est le niveau qu'on saute toujours,
et c'est pour ça que la plupart des parcours d'apprentissage produisent des gens qui savent
écrire du code mais pas décider quoi écrire, ni pourquoi, ni jusqu'où.

Prérequis : aucun. C'est l'entrée du jeu.

## Ce que tu sais faire à la sortie

- Tu sais pourquoi "j'ai codé cette feature" n'est pas une compétence.
- Tu sais comment utiliser ce curriculum sans le trahir (pas de shortcuts, pas de saut de niveau).
- Tu connais la carte complète des 6 paliers et ce que chacun débloque concrètement.
- Tu connais les 7 règles du joueur, celles qui reviennent dans chaque niveau suivant.
- Tu as un grimoire de référence à relire quand tu doutes.

## Structure du niveau

- [01-01-why-this-quest.md](01-01-why-this-quest.md) : pourquoi la plupart des devs stagnent
- [02-how-to-use-this-curriculum.md](02-how-to-use-this-curriculum.md) : règle du livrable, rythme, auto-évaluation
- [03-the-map.md](03-the-map.md) : les 6 paliers, ce qu'ils débloquent
- [04-rules-of-the-game.md](04-rules-of-the-game.md) : les 7 règles du joueur
- [95-challenge.md](95-challenge.md) : ton contrat de départ, le livrable daté du niveau
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. Chaque fichier suppose le précédent lu. Ne saute pas `04-rules-of-the-game.md`
même s'il te semble être du bon sens : c'est le fichier que tu relis dans six mois quand un
projet dérape.

## Ce qui ne se passe pas ici

Pas de code. Pas d'exercice noté. Ce niveau est un sas de décompression : il te sort du mode
"exécutant" avant de t'amener au Module `00-SOCLE/06-MINDSET`, où tu commences à construire des modèles mentaux.

## Écart au gabarit

Ce niveau n'a pas de `96-boss-fight.md`, et son fichier d'ouverture s'appelle
`01-01-why-this-quest.md` et non `01-01-why-this-level.md`.
Raison : le prologue n'enseigne aucune compétence technique, il pose les règles du jeu. Un
boss-fight suppose une compétence à mettre sous pression : il n'y en a pas encore. Le nom
« why-this-quest » marque l'entrée dans le parcours entier, pas dans un niveau.
Ce qui reste obligatoire ici : [95-challenge.md](95-challenge.md), parce que le choix du projet
fil rouge est un vrai livrable daté, réutilisé par tous les niveaux suivants.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `02-PROLOGUE`](00-PREREQUIS.md)
- [Pourquoi la plupart des devs stagnent](01-01-why-this-quest.md)
- [Comment utiliser ce curriculum](02-how-to-use-this-curriculum.md)
- [La carte : six paliers, 54 modules pédagogiques directs, un seul fil](03-the-map.md)
- [Les 7 règles du joueur](04-rules-of-the-game.md)
- [Challenge 00 : ton contrat de départ](95-challenge.md)
- [Grimoire : Module 00-SOCLE/02-PROLOGUE, Prologue](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
