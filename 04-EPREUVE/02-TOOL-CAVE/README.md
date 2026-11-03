---
stability: intemporel
acte: comprendre
route: complete
---

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Prérequis de contexte](../../03-PILOTAGE/01-ROADMAP-RUN/README.md) | [Autre module du bloc Épreuve](../03-REALTIME/README.md) | [Coffre de référence facultatif](../01-BONUS-VAULT/README.md)

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

Prérequis : avoir terminé `03-PILOTAGE/01-ROADMAP-RUN` et avoir vécu au moins un bug non trivial dans un projet. Tu dois pouvoir décrire le résultat attendu, le résultat observé et une tentative de reproduction. Sans ce cas concret, la méthode de debug de ce niveau reste abstraite. Le contrôle d'entrée est centralisé dans [`00-PREREQUIS.md`](00-PREREQUIS.md).

Ce niveau réutilise la méthode de reproduction et d'isolation posée dans
[Roadmap Run](../../03-PILOTAGE/01-ROADMAP-RUN/README.md). Si le bug n'est pas
reproductible, aucune méthode d'outillage ne compense cette absence. Les autres méthodes
sont enseignées dans Tool Cave et validées par son challenge et son boss-fight. Realtime est un autre module du bloc ; son contrôle d'entrée indique ses propres prérequis.

Auto-test d'entrée :

1. Tu as un bug qui ne se reproduit qu'une fois sur dix. Quelle est ta première étape avant
   toute investigation ?
2. Une IA générative te renvoie une fonction de calcul sans jamais te demander de préciser
   une règle métier ambiguë que tu n'avais pas donnée. Que fait-elle à la place de demander ?
3. Un profiler te dit qu'une fonction prend 2% du temps total. Dans quelles conditions ce
   chiffre peut-il te mentir par omission ?

**Verdict de l'auto-test :** si la reproduction du bug ou deux réponses sur trois manquent,
reprends [Roadmap Run](../../03-PILOTAGE/01-ROADMAP-RUN/90-grimoire.md) et son
[challenge](../../03-PILOTAGE/01-ROADMAP-RUN/95-challenge.md). Bonus Vault est un coffre
facultatif consultable à tout moment et ne conditionne pas l'entrée dans Tool Cave.

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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.

## Audits et vérification

- [Audit d’une décision technique](04-audit-dune-decision-technique.md) : vérifier contraintes, options et conséquence.
- [Audit d’une réponse vérifiée](97-audit-dune-reponse-verification.md) : distinguer réponse plausible et preuve indépendante.
