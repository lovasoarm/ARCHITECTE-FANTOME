---
stability: intemporel
acte: comprendre
route: complete
---

# Module 02-CONSTRUCTION/15-ARCHI-LAB : Archi-Lab

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau précédent](../08-DATA-SPELLS/README.md) | [Niveau suivant](../20-API-DOJO/README.md)

**Ce niveau réutilise :** [08-DATA-SPELLS](../08-DATA-SPELLS/03-relations-and-normalization.md) : normalisation et source de vérité d'une donnée, réutilisees pour poser les frontieres entre couches.

**Auto-test d'entrée :**

1. Quelle est la différence entre normaliser un schéma et le dénormaliser sciemment ?
2. Pourquoi une migration doit-elle etre reversible, meme sous pression de delai ?
3. Qu'est-ce qui rend une requete lente a l'echelle alors qu'elle est rapide avec trois lignes de test ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../08-DATA-SPELLS/90-grimoire.md) (20 minutes), puis refais son
[challenge](../08-DATA-SPELLS/95-challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au 15-ARCHI-LAB une difficulté qui vient du 08-DATA-SPELLS.

**Durée :** source unique dans [04A-CARTE-DU-PARCOURS.md](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) (règle de calcul détaillée plus haut).

## Ce que c'est

Tu sais découper un projet en tickets, écrire du code qui marche, livrer un MVP. Ce niveau
s'attaque à autre chose : la forme que prend ton code quand il grossit. Pas la syntaxe, pas le
framework : la façon dont les morceaux se parlent entre eux, et ce qui se passe quand cette
façon est mauvaise. Une architecture n'est pas un schéma qu'on dessine avant de coder. C'est
la conséquence de mille petites décisions de couplage prises sans y penser. Ce niveau te
donne le vocabulaire et les réflexes pour prendre ces décisions consciemment.

Prérequis : avoir livré au moins un projet qui dépasse le stade du prototype (Module `01-CADRAGE/05-MVP-SPLIT`,
MVP-Split, complété). Tu dois avoir déjà senti la douleur d'un fichier de 800 lignes qui fait
tout, sinon ces leçons resteront abstraites.

## Ce que tu sais faire à la sortie

- Tu sais repérer un couplage fort à l'œil, dans du code que tu n'as jamais vu.
- Tu sais expliquer pourquoi "tout dans un seul fichier" et "un microservice par fonction"
  sont les deux faces de la même erreur de jugement.
- Tu sais dessiner les couches d'une application (UI, cas d'usage, domaine, infra) et dire
  quelle couche a le droit de connaître quelle autre.
- Tu sais nommer la source de vérité d'une donnée dans un système avec cache, et expliquer
  ce qui se passe si elle divergeait pendant 30 secondes.
- Tu sais argumenter un choix entre monolithe modulaire et services, avec des coûts réels,
  pas des slogans.

## Structure du niveau

- [01-01-why-this-level.md](01-01-why-this-level.md) : ce qui casse sans architecture pensée
- [02-boundaries-and-coupling.md](02-boundaries-and-coupling.md) : couplage, cohésion, modules, dépendances dirigées
- [03-layers-and-flow.md](03-layers-and-flow.md) : UI / cas d'usage / domaine / infra, inversion de dépendance
- [04-state-and-truth.md](04-state-and-truth.md) : source de vérité, cache, duplication, cohérence éventuelle
- [05-choosing-architecture.md](05-choosing-architecture.md) : monolithe modulaire vs services : critères, coûts réels
- [06-arbitrage-a-l-epreuve-du-temps.md](06-arbitrage-a-l-epreuve-du-temps.md) : mesurer après coup si le critère retenu a tenu
- [95-challenge.md](95-challenge.md) : exercice appliqué et livrable noté
- [96-boss-fight.md](96-boss-fight.md) : situation adverse réaliste + grille d'évaluation
- [90-grimoire.md](90-grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre, sans sauter. `02` et `03` sont le cœur théorique : tout le reste s'appuie dessus.
`04` est le piège le plus sournois de ce niveau : la plupart des bugs de production que tu
verras dans ta carrière viennent de là. `05` referme la boucle en te donnant un cadre de
décision, pas une religion ("microservices for ever" ou "monolithe for ever" sont deux sectes
à fuir). `06` referme une deuxième boucle, plus tardive : elle ne se fait pas le jour du
challenge, mais deux semaines après, une fois que le critère de `05` a eu le temps d'être
vrai ou faux.

## Ce qui ne se passe pas ici

Ce niveau ne t'apprend pas un framework d'architecture précis (Clean Architecture, Hexagonal,
DDD tactique...) au sens catalogue. Il t'apprend les forces sous-jacentes que tous ces
frameworks essaient de dompter. Une fois ces forces comprises, n'importe quel nom de pattern
que tu croiseras plus tard se lira en cinq minutes au lieu de te sembler être une nouvelle
religion à apprendre par cœur.

<!-- PIECES-MODULE:debut -->

## Les pièces de ce module

- [`00-PREREQUIS.md`](00-PREREQUIS.md) : Auto-test d'entrée : à passer avant d'ouvrir le module
- [`95-challenge.md`](95-challenge.md) : Challenge : l'épreuve du module
- [`90-grimoire.md`](90-grimoire.md) : Grimoire : ce que tu dois pouvoir restituer
- [`96-boss-fight.md`](96-boss-fight.md) : Boss : l'épreuve du palier, une seule fois

<!-- PIECES-MODULE:fin -->

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Auto-test d'entrée : `15-ARCHI-LAB`](00-PREREQUIS.md)
- [Pourquoi ce niveau existe](01-01-why-this-level.md)
- [Couplage, cohésion, modules, dépendances dirigées](02-boundaries-and-coupling.md)
- [UI, cas d'usage, domaine, infra : l'inversion de dépendance concrète](03-layers-and-flow.md)
- [Source de vérité, cache, duplication, cohérence éventuelle](04-state-and-truth.md)
- [Monolithe modulaire vs services : critères de décision, coûts réels](05-choosing-architecture.md)
- [Arbitrage à l'épreuve du temps : mesurer, pas relire](06-arbitrage-a-l-epreuve-du-temps.md)
- [99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust](99-PORTAGE-MENTAL.md)
- [Boss Fight : Le refactoring sous deadline](96-boss-fight.md)
- [Challenge : Refactorer un système couplé en modules sains](95-challenge.md)
- [Grimoire : Module 02-CONSTRUCTION/15-ARCHI-LAB, Archi-Lab](90-grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
