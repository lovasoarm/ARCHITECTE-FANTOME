---
stability: intemporel
acte: comprendre
route_family: depth
---

> ### SCÈNE CRAZYDEVS : Breaking Bad
>
> Le système est maintenant ton labo : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# Cahier des charges : breaking cache

<!-- AF-DIAGRAM:cache -->

```text
text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```

Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.

Temps de lecture ~13 min

## PRÉREQUIS

```text
Node.js    : v22.23.2
npm      : v10+
Variables env : aucune
Outils externes: aucun

# Installation
$ npm install

# Lancer la démo (charge le graphe, lance tous les algos, écrit les benchmarks)
$ node src/index.js

# Lancer les tests
$ npm test
```

Aucune bibliothèque d'algorithmes externe. Tout est écrit from scratch : c'est l'objectif pédagogique du projet.

---

## C'EST QUOI CE PROJET, CONCRÈTEMENT

Walter White gère un réseau de distribution. Des villes, des routes entre elles avec des coûts de transport et des niveaux de risque, des distributeurs à réapprovisionner, des urgences à prioriser. Chaque décision se prend avec des chiffres, pas avec des intuitions. Le réseau est modélisé comme un graphe orienté pondéré (un ensemble de noeuds reliés par des arêtes avec un coût attaché). Walter veut savoir : quelle est la route la plus sûre pour livrer Albuquerque depuis le laboratoire ? Quel distributeur est le plus urgent à réapprovisionner ? Quel lot trier en priorité avant livraison ?

Et tout ça doit tourner sous profilage. Walter ne tolère pas les inefficacités.

Ce que tu dois voir tourner à la fin :

```bash
$ node src/index.js

[RÉSEAU] 8 villes | 14 routes chargées
[DIJKSTRA] Labo -> Albuquerque : route optimale = Labo -> Socorro -> Rio Rancho -> Albuquerque (coût: 47, risque: faible)
[HEAP] Urgence n°1 : Santa Fe (stock: 2 unités restantes)
[HEAP] Urgence n°2 : Las Cruces (stock: 8 unités restantes)
[SORT] Tri de 1000 lots par pureté : Merge Sort => 4.2ms | Quick Sort => 3.8ms
[DP] Optimisation de stock sous contrainte budget 50k$ : valeur max = 142k$ (knapsack)
[PERF] Tous les benchmarks dans logs/benchmarks.json

$ npm test
PASS tests/graph.test.js (22 tests)
PASS tests/dijkstra.test.js (16 tests)
PASS tests/heap.test.js (14 tests)
PASS tests/sorting.test.js (12 tests)
PASS tests/dp.test.js (10 tests)
```

Ce projet est pur algorithme et structure de données. Pas de CLI complexe, pas de streaming, pas de refactoring de legacy. Juste des structures bien choisies et des algorithmes mesurés.

## POURQUOI CE PROJET EXISTE

Ce projet force à travailler avec des structures de données non triviales dans un contexte où le choix de la structure change directement la performance :

- **comprendre qu'un graphe est la bonne structure pour un réseau de distribution** : une liste de routes dans un tableau serait inutilisable pour trouver le chemin optimal. Un graphe rend les connexions explicites et les algorithmes possibles.
- **comprendre qu'un heap (tas) est la bonne structure pour gérer des priorités** : trier toute la liste des distributeurs à chaque fois qu'une urgence arrive coûte O(n log n). Un min-heap donne l'urgence la plus haute en O(1) et met à jour en O(log n).
- **mesurer, pas supposer** : l'intuition sur les perfs est souvent fausse. Merge Sort vs Quick Sort sur 1000 lots : lequel est plus rapide ? Le benchmark tranche, pas l'opinion.

## LES 3 MODULES QUE CE PROJET COUVRE, ET OÙ ILS SE VOIENT DANS LE CODE

### `02-CONSTRUCTION/06-DATA-STRUCTURES` : graphe et min-heap

**Où ça se voit** : `src/graph/`, `src/heap/`.
**Pourquoi c'est nécessaire ici** : le réseau de distribution est un graphe. Les urgences sont une priority queue (file de priorité) basée sur un min-heap. Ces deux structures ne peuvent pas être remplacées par des tableaux sans exploser la complexité.

### `02-CONSTRUCTION/07-ALGORITHMS` : Dijkstra, BFS/DFS, tri comparatif, DP

**Où ça se voit** : `src/algorithms/`.
**Pourquoi c'est nécessaire ici** : trouver la route optimale = Dijkstra. Détecter une route compromise = BFS. Trier les lots = Merge Sort vs Quick Sort avec mesure. Optimiser le stock sous budget = knapsack (problème du sac à dos, algorithme de programmation dynamique).

### `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` : profilage réel sur chaque algo

**Où ça se voit** : `src/profiler/benchmarks.js`, `logs/benchmarks.json`.
**Pourquoi c'est nécessaire ici** : un algorithme sans mesure est une hypothèse. Chaque algo dans ce projet est wrappé dans un benchmark. Les résultats sont loggés. Walter ne valide aucune décision sans chiffres.

### Résumé visuel

```text
02-CONSTRUCTION/06-DATA-STRUCTURES --> src/graph/ (graphe orienté pondéré), src/heap/ (min-heap)
02-CONSTRUCTION/07-ALGORITHMS    --> src/algorithms/ (dijkstra, bfs, mergeSort, quickSort, knapsack)
06_memory_perf   --> src/profiler/benchmarks.js, logs/benchmarks.json
```

## ESTIMATION DE TEMPS ET ZONES DE RÉSISTANCE

**Durée totale estimée** : 15 à 22 heures de travail réel.

| Étape                 | Durée estimée | Zone de résistance                                                      |
| --------------------- | ------------- | ----------------------------------------------------------------------- |
| graph.js              | 2h            | Moyenne : bien choisir la structure interne (liste d'adjacence)         |
| minHeap.js            | 3-4h          | **Haute** : l'opération `heapifyDown` après extractMin est le vrai test |
| mergeSort + quickSort | 2h            | Faible si le module `02-CONSTRUCTION/07-ALGORITHMS` est bien maîtrisé   |
| knapsack.js           | 3h            | Moyenne : construire la table DP étape par étape sans se perdre         |
| dijkstra.js           | 3-4h          | **Haute** : l'intégration avec le heap comme priority queue             |
| bfs.js                | 1h            | Faible                                                                  |
| profiler + index      | 1h30          | Faible                                                                  |
| Tests                 | 2-3h          | Moyenne : tester des algos sur des graphes construits à la main         |

Le min-heap est le point de résistance le plus sous-estimé. L'insertion est simple. C'est `heapifyDown` (remettre l'arbre en ordre après avoir extrait la racine) qui résiste. Si tu bloques là, dessine l'arbre sur papier avant de coder.

## CAS LIMITES À TESTER OBLIGATOIREMENT

1. **Graphe avec noeud isolé** : un noeud sans arête. `dijkstra.findPath(graph, 'Labo', 'NoeudIsolé')` doit retourner `null` ou `{ path: [], cost: Infinity }`, pas planter.
2. **Heap avec un seul élément** : `extractMin()` puis `isEmpty()` doit retourner `true`.
3. **Tableau vide dans les tris** : `mergeSort([])` et `quickSort([])` retournent `[]`, pas une erreur.
4. **Budget insuffisant dans knapsack** : si le budget est inférieur au coût de n'importe quel item, retourner `{ selectedItems: [], totalValue: 0, totalCost: 0 }`.
5. **Cycle dans le graphe** : Dijkstra ne doit pas boucler infiniment sur un graphe cyclique.

## LES RÈGLES QUE TU NE DOIS JAMAIS CASSER

1. **Chaque algorithme est benchmarké.** Pas un seul algo sans mesure de temps dans l'index.
2. **Les tris ne mutent pas le tableau source.** `mergeSort(lots)` retourne un nouveau tableau.
3. **Dijkstra utilise le min-heap.** Pas un `sort()` à chaque itération (ce serait O(n² log n) au lieu de O((V+E) log V)).

## CE QUE TU NE FAIS PAS DANS CE PROJET

- Pas d'interface graphique pour visualiser le graphe.
- Pas de serveur, pas d'API.
- Pas d'import de bibliothèque d'algorithmes (tout est écrit from scratch).
- Pas de TypeScript.

## LES ADR

```text
ADR/001-pourquoi-liste-adjacence-plutot-que-matrice.md
ADR/002-pourquoi-min-heap-pour-dijkstra.md
ADR/003-pourquoi-mesurer-merge-et-quick-plutot-que-choisir-lun.md
```

Micro-exemple de forme (contexte distinct du projet) :

Le bloc ci-dessous sert à montrer la structure d’un ADR sans donner la réponse d’aucune décision de ce mini-projet.

```markdown
# ADR : Conserver une copie locale des paramètres de démarrage

## Contexte

Une application desktop relit régulièrement les mêmes paramètres de démarrage depuis un fichier de configuration stable pendant toute la session.

## Décision

Charger une copie en mémoire au démarrage puis l’utiliser pendant la session.

## Alternatives considérées

- Relire le fichier à chaque accès : rejeté car inutilement coûteux dans ce contexte stable.
- Introduire un cache distribué : rejeté car disproportionné pour une application locale.

## Conséquences

Les accès sont plus simples et plus rapides, mais une modification externe du fichier ne sera visible qu’à la prochaine session.
```

**Important : exemple de forme uniquement, hors contexte du projet. Aucune décision de ton ADR n’est donnée ici.**

## QUAND EST-CE QUE LE PROJET EST VRAIMENT FINI

```json
[ ] le graphe du réseau se charge depuis data/network.json sans erreur
[ ] Dijkstra trouve le bon chemin sur au moins 3 paires de noeuds testées
[ ] le min-heap retourne les urgences dans le bon ordre (tests verts)
[ ] Merge Sort et Quick Sort sont tous les deux benchmarkés et les résultats sont dans logs/
[ ] knapsack retourne la bonne combinaison sur au moins 2 jeux de données testés
[ ] les 5 cas limites listés ont chacun un test
[ ] aucun tableau n'est muté dans les fonctions de tri
[ ] les 3 ADR sont remplis avec contexte, décision, alternatives, conséquences
[ ] 08-POSTMORTEM.md documente le bug le plus difficile à localiser
[ ] 02-TDD-JOURNAL.md trace l'ordre dans lequel les tests ont été écrits
```

## SÉCURITÉ (gate obligatoire)

Un projet qui marche mais qui est vulnérable n'est pas fini. Traite ces exigences OWASP contextuelles avant de livrer.

- Cache poisoning (OWASP A08 - Data Integrity) : valider les clés de cache pour qu'un utilisateur ne puisse pas empoisonner une entrée partagée.
- Fuite d'info (OWASP A01) : ne jamais servir une entrée de cache appartenant à un autre utilisateur/scope.

Pour chaque exigence : documente dans `SECURITY.md` la menace, ta contre-mesure et le test qui la prouve. Le `97-CHECKPOINT-PACK` de ce projet contient un test de sécurité qui doit passer.

---

## Securite (gate obligatoire, Partie I)

- **Exigence 1** : aucune donnee sensible (secret, token, cle) dans le code source ni dans les logs. Utiliser variables d'environnement + `.env.example` versionne (jamais `.env`).
- **Exigence 2** : toute entree externe (STDIN, fichier, HTTP, CLI) est validee AVANT usage (type, longueur, format). En cas d'invalidite : erreur explicite, jamais un crash silencieux.

Un test dans `node learner-verifier.js` (auto-verif ecrite par toi) doit prouver ces deux points (ex : lancer le programme avec une entree malformee et verifier qu'il refuse proprement).

## RÔLE DES DOSSIERS (ne skippe pas)

- `src/` : **tu remplis toi-même**. Le dossier est vide exprès : c'est ton livrable. Aucun code fourni.
- `tests/` : **TDD strict : tu écris le test AVANT le code de `src/`**. Rouge → vert → refactor. Si `tests/` est vide en fin de projet, ce projet ne compte pas dans ton portfolio.
- `ADR/` : **au moins 1 décision architecturale documentée** (choix de structure, trade-off, alternative rejetée + pourquoi). Format : Contexte / Décision / Conséquences.
- `08-POSTMORTEM.md` : **rédigé à la fin, honnête**. Ce qui a foiré, combien de temps t'a coûté chaque blocage, ce que tu referais autrement.
- `02-TDD-JOURNAL.md` : trace vivante du cycle rouge/vert/refactor.

**Un CTO qui feuillette ton portfolio regarde `src/` ET `tests/` ET `ADR/`. Un `src/` vide sans `tests/` associé = projet non fini, quelle que soit la qualité du reste.**

---

## CONTRAT ANTI-RECETTE

Tu choisis toi-même la découpe, les modules, l’ordre de construction et les tests. Aucun squelette d’architecture n’est fourni.

Avant de coder, produis :

- trois hypothèses vérifiables sur le système ;
- une première découpe que tu défends et une alternative rejetée ;
- un test falsifiant une hypothèse importante ;
- les critères qui te feront changer d’architecture en cours de route.

Ne cherche pas une architecture « correcte » dans le curriculum : le but est de reconstruire un modèle sous contrainte, puis de défendre pourquoi il tient.
