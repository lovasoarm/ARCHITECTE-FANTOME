---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, temps_limite]
anti_recipe_key: decision_organisationnelle+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Synthèse b : optimiser la chaîne de distribution de walter

Temps de lecture ~6 min

> Couvre : `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` + `02-CONSTRUCTION/06-DATA-STRUCTURES` + `02-CONSTRUCTION/07-ALGORITHMS` + `02-CONSTRUCTION/09-FUNCTIONAL-JS`
> Durée cible : 100 à 160 minutes
> Le math_basics (05) est mobilisé en transverse, pas comme bloc séparé.

---

## LE CONTEXTE

Walter White a maintenant 12 distributeurs actifs sur 4 villes. Chaque ville a un niveau de risque qui change en temps réel (descente de police probable, concurrence locale, surveillance). Il veut un système qui calcule, à chaque mise à jour de risque, la meilleure route de livraison sans jamais recalculer tout le réseau depuis zéro.

Le problème de Walter, c'est pas de coder un Dijkstra. N'importe qui sait taper `npm install dijkstra-algorithm`. Le problème, c'est de savoir QUAND son réseau devient assez gros pour que ça compte, et de le construire de façon à pas exploser la mémoire à chaque update.

---

## CE QUE TU DOIS LIVRER

```text
src/
├── reseauDistribution.js  le graphe et sa construction
├── routeFinder.js     le calcul de meilleure route
└── stockOptimizer.js    l'optimisation du stock par route (knapsack)

tests/
└── reseauDistribution.test.js
```

---

## CONTRAINTES TECHNIQUES PRÉCISES

**Du module `02-CONSTRUCTION/06-DATA-STRUCTURES` (data structures) :**
Le réseau de distribution est un graphe orienté pondéré. Le poids de chaque arête (route) doit changer dynamiquement selon le niveau de risque de la ville de destination, sans reconstruire le graphe entier à chaque update.
(indice : qu'est-ce qui distingue une structure qu'on reconstruit d'une structure qu'on met à jour ?)

**Du module `02-CONSTRUCTION/07-ALGORITHMS` (algorithms) :**
Le temps de trajet sert à obtenir jusqu'à trois chemins simples candidats, triés par durée croissante, avec `kShortestSimplePaths()` dans `02-CONSTRUCTION/07-ALGORITHMS/06_graph_algorithms/02-dijkstra.md`. Cette fonction restitue chaque chemin et sa distance ; elle est réservée au réseau de taille pédagogique annoncé. Calcule ensuite un score de risque documenté pour chacun des chemins, puis choisis le plus faible parmi les candidats. Définis l'unité, les sources, la fenêtre temporelle et la règle d'agrégation du risque. Si tu supposes les risques d'arêtes indépendants, justifie cette hypothèse ; sinon, utilise un score métier adapté sans prétendre calculer une probabilité exacte.
Le knapsack (sac à dos) pour `stockOptimizer.js` : étant donné une capacité de transport limitée par route, quel mix de jutsus maximise la valeur transportée sans dépasser la capacité.

**Du module `02-CONSTRUCTION/09-FUNCTIONAL-JS` (functional js) :**
Tout le pipeline de calcul (de la mise à jour du risque jusqu'à la route finale recommandée) doit être composé avec des fonctions pures chaînées, pas une suite d'instructions impératives avec des variables intermédiaires réassignées. Utilise `pipe` ou `compose`.
(indice : si tu te retrouves à écrire `let resultat = ...` puis `resultat = autreChose(resultat)` trois fois de suite, t'es en train de coder impératif avec un vernis fonctionnel)

**Du module `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` (memory performance), le vrai coeur de cette synthèse :**
Avant de livrer, tu dois profiler ton calcul de route sur un réseau simulé de 500 villes (pas 4, 500, pour forcer la mesure réelle) avec `performance.now()`. Tu dois pouvoir répondre à : ton calcul de route est en quel ordre de grandeur (Big O) ? Et est-ce que ta structure de graphe provoque des copies inutiles à chaque update de risque ?

Mobilise aussi le module `02-CONSTRUCTION/04-MATH-BASICS` (math) : le calcul de risque combiné (probabilité de descente x probabilité de concurrence) doit utiliser une vraie formule de probabilité combinée, pas juste une moyenne approximative.

---

## CE QUI SE PASSE SI TU ZAPPES UNE CONTRAINTE

Si tu reconstruis le graphe entier à chaque update de risque : sur 4 villes ça se voit pas. Sur 500, ton système devient inutilisable en production, et c'est exactement le genre de décision qui semblait anodine au début et qui coûte une réécriture complète 6 mois plus tard.

Si tu codes le pipeline en impératif avec des `let` réassignés partout : ça marche, mais tu perds la capacité de tester chaque étape isolément, et le jour où Walter veut ajouter un critère de calcul, tu dois rouvrir toute la fonction au lieu d'insérer une étape dans le pipe.

---

## CHECKLIST AVANT DE VALIDER

```json
[ ] Le poids des arêtes se met à jour sans reconstruction complète du graphe
[ ] Les trois chemins simples les plus courts (ou moins si le graphe en fournit moins) sont restitués avec leur séquence de nœuds et leur durée
[ ] Le score de risque est calculé et comparé sur chacun des chemins candidats, avec hypothèses et unités explicites
[ ] Le knapsack respecte une capacité de transport stricte
[ ] Le pipeline de calcul est composé avec pipe/compose, zéro let réassigné en chaîne
[ ] Un profiling réel existe sur 500 villes simulées, avec un ordre de grandeur Big O affirmé
[ ] Le calcul de risque combiné utilise une vraie formule de probabilité, pas une moyenne
```

Une mesure proche de O(V²) n'indique pas, à elle seule, une mauvaise structure. Dijkstra peut utiliser une sélection linéaire des sommets non traités en O(V²), choix parfois pertinent sur un graphe dense représenté par matrice. Avec une liste d'adjacence et un tas binaire, l'ordre de grandeur usuel est O((V + E) log V). Avant de conclure, documente V, E, la densité, la représentation, la file de priorité, le volume mesuré et le protocole de benchmark. Une comparaison sans ces informations ne permet pas d'attribuer le coût à la structure de données.

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Pratique autonome : production attendue

À partir de « Synthèse b : optimiser la chaîne de distribution de walter », produis une variante indépendante du cas suivant : Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: architecture -->

## Repères de décision

- **Pourquoi :** Les frontières réduisent le coût de changement et clarifient les responsabilités. Elles doivent répondre aux contraintes de l'équipe, des données et de l'exploitation.
- **Quand l’utiliser / quand l’éviter :** Découpe un système quand une frontière protège une règle ou un rythme de changement. Ne crée pas de microservice tant que l'autonomie, la charge ou la gouvernance ne justifient pas le coût distribué.
- **Limites :** Chaque frontière ajoute contrats, réseau, déploiement, observabilité et coordination. Un diagramme propre ne prouve ni la faisabilité ni la performance.

## Mécanisme : la version sans magie

Part des cas d'usage, repère invariants et propriétaires de données, définis les contrats, compare les options et mesure les conséquences du changement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Synthèse b : optimiser la chaîne de distribution de walter** se rattache à ce cas concret : Kintana commence comme monolithe modulaire. Les demandes, réservations et notifications doivent avoir des frontières explicites sans fragmenter trop tôt le déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Défendre une frontière de domaine Kintana

> **Arc Capsule Corp. / DBZ :** une architecture est le plan du vaisseau et les coûts qu'il impose. Si chaque pièce doit connaître toutes les autres, le vaisseau ne décolle jamais.

**Mission liée à « Synthèse b : optimiser la chaîne de distribution de walter » :** Dessine le flux réel d'une création de demande. Identifie les invariants, propriétaires de données et dépendances ; compare monolithe modulaire et service séparé dans un ADR. Simule une évolution et mesure le nombre de composants touchés.

**Livrable :** diagramme de composants/flux, ADR avec deux options, contrat de frontière et test de changement.

**Critères d’acceptation :** la frontière possède une responsabilité claire ; les données ont un propriétaire ; le coût d'exploitation est explicite ; le microservice n'est pas choisi par prestige ; une condition de révision est écrite.

**Transfert obligatoire :** Le nombre d'équipes ou le volume double. Indique quel signal justifierait de séparer un composant et quel coût tu acceptes.
