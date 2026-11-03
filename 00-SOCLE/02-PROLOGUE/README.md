---
stability: intemporel
acte: comprendre
route: complete
---

# Module 00-SOCLE/02-PROLOGUE : Prologue

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Module précédent : Getting Started](../01-GETTING-STARTED/README.md) | [Module suivant : Référentiel](../03-REFERENTIEL/README.md)

**Dépendance de parcours :** terminer `01-GETTING-STARTED` pour disposer de l'environnement et connaître la navigation. **Prérequis conceptuel :** aucun ; aucune connaissance de programmation n'est exigée.

**Auto-test d'entrée : sans note :**

1. Es-tu prêt à avancer étape par étape et à noter honnêtement ce que tu ne sais pas encore ?
2. As-tu un sujet qui t'intéresse, ou préfères-tu partir d'un des exemples fournis dans ce module ?

**Verdict :** aucune réponse n'est éliminatoire. Tu peux entrer sans idée de projet, sans vocabulaire métier et sans connaître les critères d'architecture. Le Prologue sert justement à noter quelques pistes et inconnues ; il ne teste pas ta capacité à concevoir un système.

**Durée :** aucune durée globale n’est promise. Les temps par fichier sont des estimations ; le CORE 16 semaines / 192 heures est un scénario facultatif et limité, décrit dans [Formation complète](../../FORMATION-COMPLETE-INGENIERIE.md).

## Repérage du domaine candidat : pas encore un choix définitif

À ce stade, tu ne choisis qu’un **domaine candidat**. La qualification du fil rouge définitif se fera pendant le Cadrage, après l’apprentissage des notions nécessaires pour identifier acteurs, entités, concurrence, historique et contraintes temporelles. Tu n’as pas besoin de prétendre connaître ces critères maintenant.

### Comment faire sans connaître le métier ni le vocabulaire technique

Tu peux choisir un exemple de ce module et le décrire avec des mots ordinaires. Par exemple :

- **Domaine candidat :** prêt de matériel dans un lycée.
- **Personne concernée :** la personne qui remet le matériel aux élèves.
- **Problème supposé :** elle perd du temps à retrouver qui a emprunté un équipement.
- **Limite provisoire :** le système ne gère pas les paiements.
- **Ce que je ne sais pas encore :** les règles de retard, les droits exacts et la manière de conserver l'historique.

Tu peux copier ce niveau de simplicité. Les cinq critères ci-dessous sont des **questions à explorer plus tard**, pas un contrôle de connaissances à réussir maintenant. Tu peux marquer `inconnu` pour les cinq critères, sans être bloqué et sans devoir inventer une réponse. Aucun score minimal n'est attendu au Prologue.

Pour garder une trace, tu peux noter une piste à côté de chaque question. **Tu n'as pas à connaître les mots techniques ni à répondre correctement maintenant.** Si une question est difficile, écris simplement `inconnu` ; tu pourras la reprendre après avoir appris les notions correspondantes.

|   # | Question simple à se poser aujourd'hui                                                                                                           | Notion qui sera étudiée plus tard              |
| --: | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
|   1 | Quelles sont les principales choses dont ce service devrait garder la trace ? Par exemple : un élève, un équipement, un emprunt, un responsable. | Entités métier (éléments distincts du domaine) |
|   2 | Qui pourrait utiliser le service ? Est-ce que tout le monde pourrait faire les mêmes actions ?                                                   | Rôles et droits d'accès                        |
|   3 | Que se passerait-il si deux personnes voulaient le même équipement au même moment ?                                                              | Concurrence et règle de priorité               |
|   4 | Quelle information passée faudrait-il pouvoir retrouver même après un changement ?                                                               | Historique et invariants                       |
|   5 | Une date, une heure ou un délai pourrait-il changer la façon de traiter une demande ?                                                            | Contraintes temporelles                        |

Ces cinq questions **ne sont pas un examen et ne conditionnent pas la sortie du Prologue**. Elles servent à préparer le Cadrage. Tu peux écrire `inconnu` sur les cinq lignes, ou reprendre l'exemple fourni sans ajouter de détail.

**Verdict provisoire :** note uniquement ce que tu sais déjà et laisse le reste inconnu. Ne rejette pas un domaine parce qu'un concept pas encore étudié te semble absent. La sélection définitive intervient après `01-CADRAGE/01-PROBLEM-HUNT`.

Exemples calibrés : réservation de salles d'un club de sport, planning de bénévoles d'une
association, suivi de prêts de matériel dans un lycée, facturation d'un artisan avec acomptes.
Exemples qui ne suffisent pas encore à définir un besoin métier : liste personnelle, blog personnel, portfolio ou clone d'une application connue sans utilisateur identifié. Ce ne sont pas des sujets interdits pour toujours : ils demandent simplement un besoin et un contexte plus précis au Cadrage. Si tu n'as aucune piste, reprends l'un des exemples calibrés ci-dessus.

Écris ce tableau rempli et daté dans ton journal local ou dans `PREUVES/00-SOCLE/02-PROLOGUE.md`. Un dossier sur ton ordinateur suffit : aucun dépôt Git ou projet logiciel n’est demandé. C’est le livrable du Prologue.

## Ce que c'est

Ce niveau n'apprend aucune technologie. Il installe les règles du jeu avant que tu touches
un clavier avec l'intention de "monter en compétence". C'est le niveau qu'on saute toujours,
et c'est pour ça que la plupart des parcours d'apprentissage produisent des gens qui savent
écrire du code mais pas décider quoi écrire, ni pourquoi, ni jusqu'où.

Prérequis conceptuel : aucun. Prérequis de parcours : `01-GETTING-STARTED` terminé, pour disposer de l'environnement et connaître la navigation. Aucune connaissance de programmation préalable n'est exigée.

## Ce que tu sais faire à la sortie

- Tu sais pourquoi "j'ai codé cette feature" n'est pas une compétence.
- Tu sais respecter les prérequis et les gates sans confondre maîtrise démontrée et lecture obligatoire de chaque fichier.
- Tu distingues les six blocs physiques, les huit paliers de capacité et les étapes de la route ; voir la [matrice des progressions](../../06-ANNEXES-TRANSVERSES/80-MATRICE-PROGRESSIONS.md).
- Tu connais les 7 règles du joueur, celles qui reviennent dans chaque niveau suivant.
- Tu as un grimoire de référence à relire quand tu doutes.

## Structure du niveau

- [01-01-why-this-quest.md](01-01-why-this-quest.md) : pourquoi la plupart des devs stagnent
- [02-how-to-use-this-curriculum.md](02-how-to-use-this-curriculum.md) : règle du livrable, rythme, auto-évaluation
- [03-the-map.md](03-the-map.md) : les huit verbes de progression mentale et leurs limites
- [04-rules-of-the-game.md](04-rules-of-the-game.md) : les 7 règles du joueur
- [95-challenge.md](95-challenge.md) : ton contrat de départ, le livrable daté du niveau
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Lis les fichiers dans l’ordre proposé pour comprendre le contrat du parcours. Une lecture courte par séance suffit ; tu n'as pas à maîtriser tous les termes dès cette première exposition. Tu peux revenir sur une section déjà comprise si une preuve équivalente le démontre ; ne saute jamais une compétence ou un prérequis non validé. Ne saute pas `04-rules-of-the-game.md`
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
Ce qui reste obligatoire ici : [95-challenge.md](95-challenge.md), parce que le repérage du domaine candidat et les hypothèses de départ constituent une trace datée. Cette trace pourra être corrigée ou abandonnée au Cadrage ; elle ne vaut pas qualification du fil rouge personnel.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Vérification de la dépendance de parcours : `02-PROLOGUE`](00-PREREQUIS.md)
- [Pourquoi la plupart des devs stagnent](01-01-why-this-quest.md)
- [Comment utiliser ce curriculum](02-how-to-use-this-curriculum.md)
- [La carte : huit verbes de progression, un seul fil canonique](03-the-map.md)
- [Les 7 règles du joueur](04-rules-of-the-game.md)
- [Challenge 00 : ton contrat de départ](95-challenge.md)
- [Grimoire : Module 00-SOCLE/02-PROLOGUE, Prologue](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
