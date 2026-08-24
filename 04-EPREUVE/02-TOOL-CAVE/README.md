---
stability: intemporel
acte: comprendre
route: complete
---

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../../05-MAITRISE/05-DAY-TO-LEGEND/README.md) | [Niveau suivant](../01-BONUS-VAULT/README.md)

# Module 04-EPREUVE/02-TOOL-CAVE : Tool Cave

## Ce que c'est

Treize niveaux t'ont appris à penser un système. Ce niveau t'apprend à tenir tes outils :
éditeur, shell, debugger, IA, comme des extensions de ta main plutôt que comme des boîtes
noires que tu subis. La différence entre un développeur qui perd vingt minutes à chercher où
est le bug et un développeur qui le trouve en deux minutes n'est presque jamais une
différence de connaissance du langage. C'est une différence de maîtrise d'outillage.

Ce niveau ne te vend aucune stack particulière. Les raccourcis clavier, les plugins, les
IDE changent tous les deux ans. Les méthodes de debug, la logique d'un shell, et la posture
correcte face à un outil d'IA générative restent vraies bien plus longtemps. C'est ce qu'on
travaille ici.

Prérequis : avoir livré au moins un projet avec un bug non trivial (Module `03-PILOTAGE/01-ROADMAP-RUN` ou plus). Sans
un vrai bug vécu, la méthode de debug de ce niveau reste abstraite.

Ce niveau réutilise : la méthode de reproduction et d'isolation posée au
[Module `03-PILOTAGE/01-ROADMAP-RUN`](../../03-PILOTAGE/01-ROADMAP-RUN/README.md) (si le bug n'est pas reproductible, aucune méthode
d'outillage ne compense), et la notion de compromis assumé introduite au
[Module `05-MAITRISE/05-DAY-TO-LEGEND`](../../05-MAITRISE/05-DAY-TO-LEGEND/README.md).

Auto-test d'entrée :

1. Tu as un bug qui ne se reproduit qu'une fois sur dix. Quelle est ta première étape avant
   toute investigation ?
2. Une IA générative te renvoie une fonction de calcul sans jamais te demander de préciser
   une règle métier ambiguë que tu n'avais pas donnée. Que fait-elle à la place de demander ?
3. Un profiler te dit qu'une fonction prend 2% du temps total. Dans quelles conditions ce
   chiffre peut-il te mentir par omission ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../../05-MAITRISE/05-DAY-TO-LEGEND/90-grimoire.md) (20 minutes), puis refais son
[challenge](../../05-MAITRISE/05-DAY-TO-LEGEND/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au module `04-EPREUVE/02-TOOL-CAVE` une difficulté qui vient du module `05-MAITRISE/05-DAY-TO-LEGEND`.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que tu sais faire à la sortie

- Tu configures ton éditeur et ton shell pour qu'ils travaillent pour toi, pas contre toi,
  et tu sais expliquer pourquoi chaque réglage existe, pas seulement le copier.
- Tu appliques une méthode de debug reproductible (bissection, hypothèses, logs ciblés,
  profiling) au lieu de changer du code au hasard en espérant que ça passe.
- Tu sais quand un profiler ou un outil de mesure te dira la vérité, et quand il te ment par
  omission (échantillonnage, environnement non représentatif).
- Tu utilises un assistant IA comme un collaborateur junior rapide qu'il faut vérifier, pas
  comme un oracle, et tu sais formuler les consigne qui forcent une décision plutôt qu'une
  réponse vague.
- Tu sais repérer, dans du code produit par IA ou par toi-même sous pression, les signaux
  qui doivent déclencher une relecture approfondie, et démonter par écrit l'hypothèse
  silencieuse cachée dans une réponse plausible.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : pourquoi la maîtrise d'outil est un
  multiplicateur, pas un détail.
- [02-editor-and-shell.md](02-editor-and-shell.md) : éditeur et shell comme prothèses
  cognitives.
- [03-debugging-toolkit.md](03-debugging-toolkit.md) : méthode de debug, bissection,
  profilers, logs.
- 04-audit-dune-decision-technique.md : utiliser l'IA sans perdre son cerveau.
- 97-audit-dune-reponse-verification.md : démonter par écrit
  l'hypothèse silencieuse d'une réponse IA plausible et fausse.
- [95-challenge.md](95-challenge.md) : exercice appliqué avec livrable mesurable.
- [96-boss-fight.md](96-boss-fight.md) : incident réel à 3h du matin, une seule tentative, aucun
  accès à l’IA.
- [90-grimoire.md](90-grimoire.md) : mémo dense, aligné sur la grille du boss-fight.

## Comment lire ce niveau

`01` pose le diagnostic : pourquoi deux développeurs de niveau égal en algorithmique livrent
à des vitesses très différentes. `02` et `03` couvrent l'outillage classique : éditeur,
shell, debug, dans l'ordre où tu les utilises réellement un mauvais jour de bug. `04` et `05`
traitent l'outil le plus récent et le plus mal compris du métier : l'IA générative, la
discipline qu'elle exige, et l'entraînement à repérer ses hypothèses silencieuses avant
qu'elles ne deviennent un incident. Le `boss-fight` retire l'IA de l'équation et te met face
à un incident réel où seule ta méthode compte.

## Ce qui ne se passe pas ici

Ce niveau ne compare pas VSCode à Vim, ni GPT à un concurrent. Les guerres d'outils sont un
bruit qui masque la vraie question : est-ce que ta méthode de travail est reproductible et
transmissible, quel que soit l'outil que tu tiens dans la main.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `02-TOOL-CAVE`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Éditeur et shell comme prothèses cognitives](02-editor-and-shell.md)
- [Méthode de debug : bissection, hypothèses, profilers, logs](03-debugging-toolkit.md)
- Utiliser l'IA sans perdre son cerveau
- Audit d'une réponse IA
- [Boss-fight : Tool Cave](96-boss-fight.md)
- [Challenge : Module 04-EPREUVE/02-TOOL-CAVE : Tool Cave](95-challenge.md)
- [Grimoire : Module 04-EPREUVE/02-TOOL-CAVE, Tool Cave](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
