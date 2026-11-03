---
perennite: intemporel
stability: intemporel
duree_de_vie_estimee: 10+ ans
raison: "Arrays, maps, sets, trees : socle CS."
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, fausse_piste]
anti_recipe_key: temps_limite+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

> **Statut de pérennité :** **intemporel** | évolutif | périssable
> Statut effectif de ce module : **intemporel**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : objets & tableaux (00-SOCLE/04-FUNDAMENTALS), big-O (02-CONSTRUCTION/07-ALGORITHMS, approfondi plus loin dans le fil), mémoire (02-CONSTRUCTION/05-MEMORY-PERFORMANCE). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

> **9 sous-dossiers dans ce module, c'est plus dense que la moyenne.**
> Avant de foncer, lis `02A-navigation.md` : il découpe la progression en 3
> paliers digestes plutôt qu'un seul bloc de 9 structures d'affilée.

# Pourquoi ce module mérite ton temps : data structures

> **Durée de vie : intemporel.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.
> Temps de lecture ~8 min

Tu peux tout stocker dans un tableau et tout chercher avec une boucle. Ça marche. Jusqu'à ce que ta liste passe de 100 à 1 million d'éléments, et que ta recherche qui prenait 1ms en prenne maintenant 4 secondes. Le bug n'est pas dans ton code : il est dans ta structure de données.

Choisir la bonne structure, c'est la différence entre un dev qui résout un problème en O(1) (temps constant, peu importe le volume) et un dev qui le résout en O(n²) sans même s'en rendre compte.

---

## PRÉREQUIS

Ce module suppose que tu maîtrises :

- complexité O(n) et notation Big-O : voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/03_complexity/02-big_o_basics.md`
- copie par référence vs par valeur : voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref/02-shallow_vs_deep.md`

Si ces bases ne sont pas là : reviens ici après.

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Un tableau (array) est pratique, mais il a des coûts cachés selon l'opération : chercher un élément précis dans un tableau non trié coûte O(n) (il faut potentiellement tout parcourir). Une table de hachage effectue généralement une recherche en temps moyen proche de `O(1)` sous des hypothèses raisonnables de distribution et de facteur de charge ; son pire cas peut être `O(n)`. Une queue (file) garantit un ordre FIFO (first in, first out) sans réinventer la roue à chaque fois. Un heap (tas) garde toujours l'élément le plus prioritaire accessible instantanément, sans trier toute la liste à chaque ajout.

Sans connaître ces structures, tu résous chaque problème avec le même outil par défaut : le tableau, avec des boucles `for` et `find`. Ça fonctionne pour les petits volumes. Mais dès que l'échelle change, ton choix de structure devient le facteur qui détermine si ton système tient la charge ou s'effondre.

Ce module te donne le vocabulaire et les outils pour répondre à la question : "quelle structure de données représente le mieux ce problème, et qu'est-ce que chaque opération va me coûter ?"

---

## 2) QUI SOUFFRE QUAND ÇA MANQUE

Le dev qui ne connaît que le tableau réinvente systématiquement des solutions lentes. Il code un système de file d'attente avec un tableau et `.shift()` ; sur un tableau dense classique, cette opération peut demander de déplacer les éléments et coûter O(n). Une file implémentée avec une liste chaînée ou un buffer circulaire peut proposer une sortie en O(1), selon son implémentation. Il fait une recherche répétée dans un tableau alors qu'une hash table donnerait un accès direct.

Dans le mini-projet [`04_breaking_cache`](../02-MINI-PROJECTS/04_breaking_cache/README.md), le résumé de stock est conservé temporairement dans une `Map` indexée par une clé tenant/boutique. La table de hachage permet de retrouver une entrée par clé en temps moyen proche de `O(1)` sous des hypothèses raisonnables ; le projet doit aussi traiter expiration et invalidation. Il ne construit ni heap ni graphe : ces structures sont étudiées dans les exercices dédiés de ce module.

Sur un graphe (réseau de noeuds connectés : relations sociales, routes, dépendances), le dev qui ne connaît pas BFS/DFS (parcours en largeur/en profondeur) ne sait même pas par où commencer pour répondre à des questions pourtant basiques : "quel est le chemin le plus court entre ces deux points ?", "ces deux noeuds sont-ils connectés ?".

---

## 3) OÙ ÇA APPARAÎT DANS UN VRAI SYSTÈME

```text
historique de navigation, undo/redo     --> stack (pile)  --> dernier entré, premier sorti
file d'attente de tâches ou de tickets    --> queue      --> premier entré, premier sorti
système de priorités (urgence, scoring)    --> heap      --> accès immédiat au plus prioritaire
recherche rapide par clé (cache, index)    --> table de hachage --> accès moyen attendu proche de O(1), pire cas O(n)
relations, réseau social, routes        --> graphe     --> BFS/DFS pour explorer ou connecter
arbre de décision, autocomplétion       --> BST (binary search tree) --> recherche en O(log n)
```

Ces structures ne sont pas théoriques : elles sont le moteur derrière des fonctionnalités que tu utilises tous les jours. L'autocomplétion d'un moteur de recherche, le bouton "annuler" d'un éditeur, le système de recommandation d'un réseau social : tout ça repose sur une structure de données bien choisie.

---

## 4) MODERNE, LEGACY, OU INTEMPOREL ?

Intemporel à 100%. Une hash table fonctionne sur les mêmes principes depuis des décennies. Un BST (binary search tree : arbre binaire de recherche) ne change pas de comportement selon le framework JS du moment. Ce sont des concepts d'informatique fondamentale, indépendants du langage et de l'époque.

---

## 5) CE QUI A CHANGÉ AU FIL DES ANNÉES

Ce qui a changé, c'est l'accessibilité : avant, JS n'avait pas de vraie structure `Map` ou `Set` native, donc les devs simulaient des hash tables avec des objets bruts, avec tous les pièges que ça implique (collision avec des propriétés héritées du prototype, par exemple). Aujourd'hui, `Map` et `Set` sont natifs et résolvent ces pièges proprement.

La demande pour ces compétences a aussi augmenté : avec la montée des entretiens techniques orientés algorithmique, et avec des systèmes qui gèrent des volumes de données massifs (analytics en temps réel, recommandation, recherche), connaître les bonnes structures n'est plus optionnel même pour un dev jutsu classique.

---

## 6) NOYAU DUR DU MÉTIER ?

Oui, explicitement dans le noyau dur : "09 + 10, Data Structures + Algos : sans ça, t'es limité". Ce module dépend de `00-SOCLE/04-FUNDAMENTALS` et de la notion de complexité vue en `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/03_complexity` (Big-O, O(1), O(n), O(log n) : si ces notations ne sont pas claires, ouvre `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/03_complexity/02-big_o_basics.md` avant de continuer ici), et il devient à son tour le prérequis complet de `02-CONSTRUCTION/07-ALGORITHMS`. Sans cette base, tu ne peux pas comprendre pourquoi Dijkstra utilise un min-heap, ou pourquoi un BFS utilise une queue et un DFS une pile.

---

## 7) POURQUOI ÇA MÉRITE ENCORE TON TEMPS DANS 5 ANS

Les structures de données sont la couche la plus stable de toute l'informatique : un graphe reste un graphe, une queue reste une queue, peu importe le langage ou la mode du moment. Ce que tu apprends ici se transfère directement vers n'importe quel autre langage que tu croiseras dans ta carrière. C'est un investissement qui ne périme jamais, contrairement à la syntaxe d'un framework JS qui aura changé trois fois dans cinq ans.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Le tableau n'est pas toujours le bon outil, et le mauvais choix de structure transforme un problème simple en mur de performance. Ce module te donne le vocabulaire pour choisir juste : stack, queue, heap, hash table, graphe, BST. Chacun répond à une famille de problèmes précise. Apprendre à les reconnaître, c'est apprendre à ne plus coder à l'aveugle.

Maintenant, ouvre `02-array_basics.md`. Et regarde enfin ce que `.push()`, `.shift()` et `.splice()` te coûtent vraiment.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-LESSON-PROFILE: structures -->

## Repères de décision

- **Pourquoi :** La structure choisie détermine le coût des opérations dominantes et la façon dont l'état évolue.
- **Quand l’utiliser / quand l’éviter :** Choisis à partir des opérations fréquentes, du volume et des contraintes d'ordre. N'utilise pas une structure sophistiquée si un tableau ou une Map répond au besoin mesuré.
- **Limites :** La complexité moyenne ne garantit pas les performances réelles. Mémoire, distribution des clés, ordre, synchronisation et sérialisation peuvent changer le coût.

## Mécanisme : la version sans magie

Liste les opérations, leur fréquence et les garanties attendues ; compare complexité, mémoire et comportement aux cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : data structures** se rattache à ce cas concret : Kintana doit retrouver une demande, dédupliquer les événements ou ordonner des notifications sans parcourir toute l'historique à chaque action.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir la structure selon le trafic métier

> **Arc One Piece / Grand Line :** choisir une structure de données, c'est choisir comment la cargaison circule. Une mauvaise structure transforme chaque recherche en traversée de l'océan.

**Mission liée à « Pourquoi ce module mérite ton temps : data structures » :** Prends une opération de Kintana (lookup par ID, file de notification, regroupement par tenant ou historique ordonné). Compare deux structures avec un coût théorique et un test reproductible sur données synthétiques.

**Livrable :** une implémentation courte, tests d'invariants, tableau coût/avantages et mesure locale si elle est pertinente.

**Critères d’acceptation :** les opérations dominantes sont identifiées ; l'ordre et les doublons sont traités explicitement ; la complexité est expliquée ; le choix n'est pas justifié par la mode.

**Transfert obligatoire :** Multiplie par dix le volume et change la distribution des clés. Réévalue le choix et indique si un index persistant devient nécessaire.
