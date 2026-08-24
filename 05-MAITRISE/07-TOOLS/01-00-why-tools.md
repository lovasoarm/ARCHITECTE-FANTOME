## perishability_id: PER-0074

perennite: evolutif
stability: perissable
duree_de_vie_estimee: 1-2 ans
raison: "Outils : bougent chaque année. Lis pour saisir la logique, pas pour mémoriser."
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: diagnostic_mastery
review_due: 2028-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **TL;DR (4 lignes)**
>
> - Ta chaîne d'outils (linter, formatter, bundler, LSP, debugger) est ton exosquelette. Un dev sans outils bien réglés perd 30% de son temps à des tâches automatisables.
> - Ce module te fait construire ta propre chaîne, pas suivre une config copiée-collée d'un tuto de 2021.
> - Densité forte car périssable : privilégie la compréhension du **rôle** de chaque outil, pas la config du jour.
> - En 2028, l'IA écrit le code. Ce sont **tes outils** qui te rendent plus rapide qu'elle.

> **CE MODULE RÉUTILISE** : runtime (02-CONSTRUCTION/13-RUNTIME-ENV), modules (00-SOCLE/04-FUNDAMENTALS), et transversalement tout module ayant produit du code à builder/lint/packager. Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> (attention) **OUTIL PÉRISSABLE** : le tooling JS bouge chaque année. Traite ce module comme une REVUE, pas une bible. `Principes durables` en bas.

> **Périssable : valable 2026.** L'outil change vite ; le principe (build, format, lint, package) est **intemporel**.

# Pourquoi ce module mérite ton temps

Temps de lecture ~5 min

> **Durée de vie : 2-3 ans, revenir en 2028.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.

Temps de lecture ~9 min

Ce module est différent des 30 autres. Et faut le dire cash avant d'aller plus loin.

Tous les modules précédents t'apprennent UN concept : closures, event loop, SOLID, TypeScript. Celui-là t'apprend rien de nouveau côté théorie. Il te donne des outils. Des vrais, ceux que tu vas copier-coller dans chaque mini-projet, chaque exercice, chaque module qui suit.

C'est l'établi du camp. Pas une leçon sur le marteau. Le marteau lui-même, prêt à frapper.

Dans Walking Dead, Rick Grimes aurait pu partir explorer sans lampe, sans radio, sans couteau. Il aurait survécu... peut-être. Mais chaque sortie aurait coûté dix fois plus cher. Ces 4 outils, c'est ton kit de survie de dev : optionnel sur un exercice de 5 minutes, indispensable sur un mini-projet entier.

---

## CE QUE C'EST VRAIMENT

Trois gadgets maison, mentionnés directement dans le cahier des charges du mini-projet `03_walking_dead_protocol` :

```text
logger structuré  --> savoir ce qui s'est passé, dans quel ordre, avec quel contexte
benchmark kit    --> savoir si ton code est rapide ou juste "pas lent en apparence"
debug toolkit    --> savoir où ça casse sans semer des console.log partout
```

Plus un quatrième, ajouté parce que les 19 mini-projets partagent tous la même structure de dossier (`00-CAHIER-DES-CHARGES.md`, `README.md`, `02-TDD-JOURNAL.md`, `08-POSTMORTEM.md`, `ADR/`, `src/`, `tests/`) :

```text
cli scaffolder   --> génère cette structure en une commande, au lieu de la recréer à la main 9 fois
```

```json
          [31_TOOLS : L'ATELIER]
              |
    +-------------+-----------+-----------+
    |       |      |      |
   logger    benchmark   debug   scaffolder
    |       |      |      |
    v       v      v      v
  utilisé dans  utilisé dans utilisé  utilisé pour
  CHAQUE projet  les algos  partout  CHAQUE mini-projet
```

---

## CE QUI PREND CHER QUAND ÇA MANQUE

Sans logger structuré :

```text
un bug arrive en prod --> tu as 200 console.log éparpillés sans contexte
--> impossible de savoir QUI a fait QUOI, QUAND, dans QUEL ordre
--> tu débugges à l'aveugle, en pleine nuit, sous pression
```

Sans benchmark kit :

```text
tu choisis entre deux implémentations à l'instinct
--> "celle-là a l'air plus rapide" n'est pas une mesure, c'est une opinion
--> tu optimises ce qui compte pas, tu ignores ce qui plombe vraiment les perfs
```

Sans debug toolkit :

```text
chaque bug = ajouter des console.log, relancer, supprimer les console.log, recommencer
--> 20 minutes perdues sur un bug qu'un bon outil aurait montré en 30 secondes
```

Sans scaffolder :

```text
19 mini-projets --> tu recrées la même arborescence à la main 19 fois
--> un dossier oublié, un fichier mal nommé, une incohérence entre projet 3 et projet 7
```

---

## OÙ ÇA VIT DANS UN VRAI SYSTÈME

Ce module vit PAS dans le flux normal de progression. Il vit À CÔTÉ, comme une caisse à outils qu'on ouvre chaque fois qu'on en a besoin.

```text
00-SOCLE/04-FUNDAMENTALS --> 01-CADRAGE/02-ASYNC --> ... --> 02-CONSTRUCTION/02-MINI-PROJECTS
                       |
                       v
                  [PIOCHE DANS 05-MAITRISE/07-TOOLS]
                  à chaque fois que t'as besoin
                  de logger, mesurer, débugger,
                  ou scaffolder un nouveau projet
```

C'est pour ça que ce module a pas vraiment de "moment" dans la progression. Tu peux le consulter dès le module `02-CONSTRUCTION/03-TESTING` (testing), ou attendre le mini-projet 1. Les deux sont valides.

---

## QUAND ÇA DEVIENT IMPORTANT, QUAND ÇA DEVIENT INDISPENSABLE

```text
exercices courts (5-25 min)   --> optionnel, un console.log suffit largement
un mini-projet entier      --> le logger et le debug toolkit deviennent vite indispensables
plusieurs implémentations à comparer --> le benchmark kit devient la seule façon honnête de trancher
19 mini-projets à démarrer     --> le scaffolder évite une corvée répétitive et source d'erreurs
```

Comment tu sais que t'en as besoin : le jour où tu commentes/décommentes des `console.log` en boucle pour comprendre un bug, t'as besoin du debug toolkit. Le jour où tu dis "je pense que cette version est plus rapide" sans l'avoir mesuré, t'as besoin du benchmark kit.

---

## POURQUOI CETTE APPROCHE PLUTÔT QU'UNE AUTRE

Alternative : utiliser direct des libs externes (Winston pour les logs, Benchmark.js pour les mesures). Ça marche, et en vrai projet de prod, c'est souvent ce que tu feras.

Le choix ici : construire ces outils TOI-MÊME, en JS pur, sans dépendance. Pourquoi :

```text
gain --> tu comprends EXACTEMENT ce qui se passe dans l'outil que tu utilises
     aucune boîte noire, aucune magie, tu peux le modifier à volonté
perte --> tes outils maison sont moins complets qu'une lib mature et testée par des milliers de devs
```

C'est un compromis pédagogique assumé : tu construis le marteau pour comprendre comment un marteau fonctionne, avant de potentiellement en acheter un meilleur plus tard. Les bonnes libs du marché (Winston, Pino, Tinybench) reprennent exactement les mêmes principes que ce que tu vas coder ici, juste avec plus d'options.

---

## MODERNE, LEGACY, OU INTEMPOREL

```text
le BESOIN de logger structuré   --> intemporel, ça bougera jamais
le BESOIN de mesurer la perf    --> intemporel, pareil
le BESOIN de débugger efficacement --> intemporel, pareil
le BESOIN de scaffolder un projet --> intemporel, pareil

les outils précis qu'on construit ici --> volontairement simples, conçus pour être compris,
                      pas pour rivaliser avec Winston ou Pino en prod
```

Ce module t'apprend des principes qui survivent à n'importe quel outil du marché : structurer un log, isoler une mesure de perf, créer un point d'inspection. Le jour où tu utilises Pino en vrai projet, tu sauras EXACTEMENT ce qu'il fait sous le capot, parce que t'auras construit une version simplifiée toi-même.

---

## NOYAU DUR OU PÉRIPHÉRIQUE

```text
PÉRIPHÉRIQUE au sens où : aucun concept JS nouveau ici, rien de bloquant pour la suite.
NOYAU DUR au sens où : tu vas littéralement utiliser ces 4 outils dans les 19 mini-projets.
```

C'est un module utilitaire. Tu peux vivre sans, comme un campeur peut vivre sans couteau suisse. Mais une fois que tu l'as, tu te demandes comment t'as fait avant.

---

## QUAND L'APPRENDRE DANS TA PROGRESSION

```text
prérequis avant ce module :
00-SOCLE/04-FUNDAMENTALS       --> fonctions, closures : la base pour construire des outils réutilisables
02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling --> comprendre performance.now() AVANT de l'emballer dans un outil
01-CADRAGE/04-ERROR-HANDLING      --> comprendre try/catch et les erreurs custom, utile pour le debug toolkit
02-CONSTRUCTION/13-RUNTIME-ENV/06_node_cli_scripts --> comprendre fs et process.argv, utile pour le scaffolder
```

Ce qui devient plus simple après ce module :

```text
02-CONSTRUCTION/02-MINI-PROJECTS   --> chaque projet démarre plus vite, se débugge plus vite, se mesure plus vite
03-PILOTAGE/05-OBSERVABILITY   --> tu as déjà manipulé un logger basique, le concept de correlation ID te parle déjà
```

---

## ERREURS CLASSIQUES DE DÉBUTANT

```text
- construire un logger qui fait EXACTEMENT ce que console.log fait déjà, sans valeur ajoutée
- mesurer un benchmark une seule fois et conclure, sans répéter la mesure plusieurs fois
- mélanger logs de debug temporaires et logs structurés permanents dans le même flux
- copier un scaffolder une fois, et le retaper à la main pour chaque nouveau mini-projet ensuite
```

## IDÉES REÇUES

```text
"console.log suffit, pourquoi construire un logger"
--> faux dès que t'as plus d'un fichier qui logge. Sans structure ni niveau (info/warn/error),
  un flux de logs devient illisible en quelques minutes.

"mesurer la perf, c'est pour les gros projets seulement"
--> faux. Même sur un petit exercice, comparer deux implémentations te forme l'œil
  à reconnaître ce qui coûte cher AVANT que ça devienne un vrai problème.

"le debug toolkit c'est juste console.log avec un nom différent"
--> faux si bien construit. Un bon outil de debug donne du CONTEXTE (où, quand, avec quel état),
  pas juste une valeur isolée.
```

---

## POURQUOI ÇA TIENDRA ENCORE DANS 5 ANS

Les outils que tu vas construire ici sont volontairement simples, donc ils vieillissent pas mal : un logger qui formate du texte, un benchmark qui chronomètre, un toolkit qui inspecte un état. Aucune de ces idées dépend d'une mode JS ou d'un framework du moment.

Ce qui changera : peut-être que tu utiliseras une vraie lib en prod plus tard, avec plus de features.
Ce qui changera pas : le réflexe de structurer tes logs, mesurer avant d'optimiser, inspecter avant de corriger à l'aveugle, et automatiser la mise en place répétitive d'un projet. Ces réflexes-là, aucun framework ne les remplace.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
