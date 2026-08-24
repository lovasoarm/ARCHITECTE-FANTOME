---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, fausse_piste]
anti_recipe_key: decision_organisationnelle+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Charte ascii : la norme unique

Temps de lecture ~8 min

> Un seul style de schéma. Un seul vocabulaire. Pas de version maison par module.

Tu vas croiser l'event loop dans `01-CADRAGE/02-ASYNC`, dans `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`, et encore dans `02-CONSTRUCTION/13-RUNTIME-ENV`.
Si chaque module dessine son propre schéma avec ses propres mots, ton cerveau doit réapprendre la lecture à chaque fois. C'est du gaspillage.

Cette charte fixe 8 schémas canoniques. Quand un module a besoin d'un de ces 8 schémas : il pointe ici, ou il recopie le schéma identique. Pas de variante.

**Règle de syntaxe commune :**

```text
A --> B      une étape suit une autre
A --> B --> C    une séquence
A -.-> B      relation indirecte ou asynchrone (ligne pointillée)
[ ]         une boîte = un état ou un composant
( )         une parenthèse = une précision courte
```

---

## 1) CALL STACK : LES FRAMES EMPILÉES

Chaque appel de fonction empile une frame. Quand la fonction finit, sa frame disparaît. LIFO (Last In First Out, le dernier arrivé sort en premier) pur.

```text
function c() { return 1 }
function b() { return c() }
function a() { return b() }
a()

ÉTAT DE LA STACK PENDANT L'EXÉCUTION :

 |    |    | c()  |    |
 | b()  | b()  | b()  | b()  |
 | a()  | a()  | a()  | a()  |
 +--------+--------+--------+--------+
  a appelle b appelle c    c finit,
  b      c    s'exécute retour à b
```

Si tu stack des appels sans jamais redescendre (récursion sans fin) : `RangeError: Maximum call stack size exceeded`. C'est littéralement la stack qui déborde.

**Référencé dans :** `00-SOCLE/04-FUNDAMENTALS/03_functions`, `01-CADRAGE/02-ASYNC/04_event_loop`, `05-MAITRISE/03-EDGE-CASES`.

---

## 2) EVENT LOOP : STACK, QUEUE, MICROTASKS

<!-- AF-DIAGRAM:microtasks -->

```text
        ┌──────────────┐
        │ Call Stack   │
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Microtasks   │◄──── Promise.then / queueMicrotask
        └──────┬───────┘
               ▼
        ┌──────────────┐
        │ Task Queue   │◄──── timers / IO
        └──────────────┘
```

Les microtasks sont traitées avant de passer à la prochaine task.

Le mécanisme qui décide quoi exécuter ensuite quand le call stack est vide.

```json
[ CALL STACK ] <-- vidée en premier, toujours
    |
    v (stack vide ?)
[ MICROTASK QUEUE ]  <-- Promises, queueMicrotask : vidée ENTIÈREMENT avant la suite
    |
    v (microtasks vidées ?)
[ MACROTASK QUEUE ]  <-- setTimeout, setInterval, I/O : UNE tâche à la fois
    |
    v
  retour au call stack, le cycle recommence
```

Ordre d'exécution typique :

```text
synchrone --> toutes les microtasks --> une macrotask --> toutes les microtasks --> une macrotask --> ...
```

**Référencé dans :** `01-CADRAGE/02-ASYNC/04_event_loop`, `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/04_profiling`, `04-EPREUVE/03-REALTIME`.

---

## 3) HEAP VS STACK : ALLOCATION ET RÉFÉRENCES

Le modèle JavaScript ne garantit pas une représentation universelle « primitives sur le stack, objets sur le heap ». Pour raisonner correctement, partez des valeurs, des références partagées et des effets observables ; la représentation interne dépend du moteur.

```text
STACK             HEAP
+----------------+       +------------------------+
| a -> 42    |       |            |
| obj -> 0x4F2A ----------->   | 0x4F2A : { x: 1, y: 2 } |
| obj2 -> 0x4F2A --------/    |            |
+----------------+       +------------------------+

obj et obj2 pointent vers LA MÊME adresse mémoire.
Muter obj.x modifie ce que obj2 voit aussi.
```

C'est la racine de 90% des bugs "je touche un truc et un autre truc casse ailleurs".

**Référencé dans :** `00-SOCLE/04-FUNDAMENTALS/01_variables`, `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/02_copy_vs_ref`.

---

## 4) FLUX ASYNC : AWAIT, RESOLVE, REJECT

Une Promise a 3 états. Une fois résolue ou rejetée, elle reste figée dans cet état pour toujours.

```text
new Promise()
   |
   v
 [ PENDING ]
  /    \
 v     v
[ FULFILLED ] [ REJECTED ]
 (resolve)   (reject)
   |       |
   v       v
  .then()    .catch()
```

Avec `await` :

```text
await promise()
 --> si FULFILLED : la valeur résolue, exécution continue
 --> si REJECTED : une exception levée, à catcher avec try/catch
```

**Référencé dans :** `01-CADRAGE/02-ASYNC/02_promises`, `01-CADRAGE/02-ASYNC/03_async_await`, `01-CADRAGE/04-ERROR-HANDLING/04_async_error_traps`.

---

## 5) CYCLE DE VIE HTTP : REQUÊTE, MIDDLEWARE, RÉPONSE

Une requête HTTP traverse une chaîne de middlewares avant d'atteindre le handler final, puis repart en sens inverse pour la réponse.

```text
CLIENT
 |
 v
[ Middleware: auth ]    (vérifie le token, sinon coupe ici)
 |
 v
[ Middleware: validation ] (vérifie le payload, sinon coupe ici)
 |
 v
[ Handler ]         (logique métier, génère la réponse)
 |
 v
[ Middleware: error handler ] (catch les erreurs remontées)
 |
 v
CLIENT (réponse)
```

Chaque middleware peut couper la chaîne (`return` sans `next()`) ou laisser passer.

**Référencé dans :** `02-CONSTRUCTION/19-API-CRAFT/01_express_from_scratch`, `03-PILOTAGE/04-SECURITY`, `01-CADRAGE/04-ERROR-HANDLING/03_error_propagation`.

---

## 6) ARCHITECTURE EN COUCHES : UI, DOMAINE, INFRA

Le principe de la clean architecture : le domaine (la logique métier) ne dépend jamais de l'infra (DB, framework, réseau). C'est l'inverse qui est vrai.

```json
[ UI / Présentation ]
    |
    v (dépend de)
[ Domaine / Logique métier ]
    ^
    | (dépend de, via interface)
[ Infra / DB, API externes, framework ]
```

La flèche entre Domaine et Infra pointe vers le HAUT : c'est l'infra qui implémente une interface définie par le domaine, pas le contraire. Si tu changes de DB, le domaine ne bouge pas d'une ligne.

**Référencé dans :** `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/04_clean_architecture`, `02-CONSTRUCTION/11-REFACTORING/02_solid_principles`.

---

## 7) PIPELINE RÉSEAU : CLIENT, EDGE, ORIGIN

Le trajet d'une requête entre l'utilisateur et ton serveur final, avec les points d'arrêt possibles en chemin.

```text
CLIENT
 |
 v
[ EDGE / CDN ]   <-- cache statique, peut répondre direct sans aller plus loin
 | (cache miss)
 v
[ LOAD BALANCER ] <-- répartit vers une instance
 |
 v
[ ORIGIN SERVER ] <-- ton code qui tourne vraiment
 |
 v
[ DATABASE ]
```

Plus la réponse vient de haut dans ce schéma (edge plutôt qu'origin), plus c'est rapide pour l'utilisateur.

**Référencé dans :** `02-CONSTRUCTION/18-WEB-CONCEPTS/04_caching_strategies`, `05-MAITRISE/02-SCALABILITY/04_load_balancing`.

---

## 8) FLUX DE DONNÉES : SOURCE, TRANSFORM, SINK

Le schéma générique de tout pipeline de traitement de données, du plus simple `.map().filter()` jusqu'à un pipeline d'ingestion d'events complet.

```json
[ SOURCE ]    d'où vient la donnée brute (API, fichier, stream, DB)
  |
  v
[ TRANSFORM ]   map, filter, validate, normalize : la donnée change de forme
  |
  v
[ SINK ]     où la donnée atterrit (DB, UI, fichier, autre service)
```

Une erreur dans TRANSFORM doit jamais silencieusement corrompre ce qui arrive au SINK. D'où l'intérêt de valider à chaque étape, pas juste à la fin.

**Référencé dans :** `02-CONSTRUCTION/09-FUNCTIONAL-JS/07_fp_challenge`, `04-EPREUVE/04-BIG-APP-SNOOP/03_validate_ai_output`, `03-PILOTAGE/05-OBSERVABILITY/01_structured_logging`.

---

## RÈGLE D'USAGE

Tu écris une leçon et t'as besoin d'un de ces 8 schémas : tu recopies le schéma exact ci-dessus, tu l'adaptes au contexte narratif du module si besoin (les noms de variables peuvent changer, la structure du schéma non), et tu mentionnes "voir charte ASCII" si tu veux éviter de répéter l'explication complète.

Si ton module a besoin d'un 9e schéma canonique qui sert dans plusieurs modules : tu le proposes ici, tu l'ajoutes pas en solo dans ta leçon.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
