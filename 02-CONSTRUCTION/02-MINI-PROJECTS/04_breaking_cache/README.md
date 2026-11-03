---
stability: stable
acte: comprendre
---

[PORTFOLIO]

# BREAKING CACHE : TTL, HIT/MISS ET INVALIDATION

<!-- AF-DIAGRAM:cache -->

```text
Lecture d'un résumé de stock Kintana
                 │
                 ▼
        ┌──────────────────┐
        │ Cache en mémoire │
        └──────┬─────┬─────┘
             HIT     MISS
              │       │
              ▼       ▼
          Valeur   Source de vérité
                      │ succès
                      ▼
                 Mise en cache

Mise à jour du stock :
Source de vérité ──commit réussi──► invalidation de la clé concernée
```

Le cache conserve temporairement une copie d'une donnée fréquemment lue. Un **hit** évite de recharger la source ; un **miss** oblige à la consulter. Le TTL borne la durée de conservation et l'invalidation retire une valeur qui vient de devenir obsolète.

> **Mission Kintana :** accélérer la lecture d'un résumé de stock par boutique, sans laisser une ancienne valeur survivre silencieusement à une mise à jour réussie.

## Ce que tu construis

Un petit cache **en mémoire, dans un seul processus Node.js**, sans dépendance externe. Il sert des snapshots de résumé de stock : pas des secrets, des jetons ou des données personnelles.

Le périmètre obligatoire est volontairement limité :

1. stocker une valeur sous une clé non vide ;
2. définir une durée de vie (`ttlMs`) strictement positive ;
3. distinguer explicitement un cache miss d'un cache hit, même si la valeur stockée vaut `null` ou `undefined` ;
4. expirer une entrée à la frontière exacte `now >= expiresAt` ;
5. supprimer une entrée avec `delete` et vider le cache avec `clear` ;
6. utiliser le cache en lecture-aside : charger la source uniquement en cas de miss, puis ne mettre en cache qu'après un chargement réussi ;
7. invalider la clé du résumé concerné **après** la réussite de la transaction de mise à jour du stock.

Le projet ne te demande pas de construire une base de données, un serveur HTTP, un cache distribué, un graphe de livraison, un heap, Dijkstra, BFS/DFS, des tris ou du knapsack. Ces sujets possèdent leurs propres modules et projets.

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADR réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

## Prérequis directs : dans cet ordre

- [Types et objets JavaScript](../../../00-SOCLE/04-FUNDAMENTALS/04_types/README.md) : lire et manipuler des valeurs.
- [Map et table de hachage](../../06-DATA-STRUCTURES/07_hash_table/README.md) : comprendre une association clé → valeur et ses coûts usuels.
- [async/await](../../../01-CADRAGE/02-ASYNC/03_async_await/README.md) : comprendre le chargement asynchrone de la source de vérité.
- [Tests unitaires](../../03-TESTING/02-unit_sniper.md) : isoler un comportement et contrôler les cas limites.
- [Mesurer avant d'optimiser](../../05-MEMORY-PERFORMANCE/02A-measure_first.md) : séparer une hypothèse d'une mesure.

Tu n'as pas besoin d'avoir étudié les graphes, les heaps, Dijkstra, les algorithmes de tri ou la programmation dynamique pour commencer ce projet.

## État exact du ZIP et commandes

- Runtime de référence du curriculum : Node.js `22.23.4` (voir [politique Node AF](../../../06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md)).
- Dépendances externes : aucune.
- Le ZIP pédagogique ne fournit **aucun code exécutable, aucun fichier de test et aucun `package.json`** pour ce projet. `src/` et `tests/` sont des espaces où tu écris ton propre travail.

Commandes disponibles immédiatement :

```bash
node --version
```

Commandes à utiliser **après avoir créé les fichiers correspondants** :

```bash
node src/demo.js
node --test
node src/benchmark.js
```

`node --test` découvre les fichiers de test Node.js. Comme aucun `package.json` n'est fourni, utilise CommonJS (`require` / `module.exports`) pour les fichiers `.js` de départ. Tu peux choisir ESM avec des fichiers `.mjs` ou en créant un `package.json` qui déclare `"type": "module"`, puis adapter tes commandes. `npm test` n'est pas une commande disponible ici : elle ne fonctionnera que si tu crées un script `test`. N'exécute pas `npm install` : aucune dépendance n'est requise.

## Contrat technique minimal

Tu peux organiser les fichiers autrement si tu expliques ton choix dans un ADR. La séparation suivante est une proposition lisible, pas un framework imposé :

```text
src/
├── ttl-cache.js              # Map, expiration, delete, clear
├── stock-summary-service.js  # cache-aside et invalidation après écriture
├── demo.js                   # démonstration locale reproductible
└── benchmark.js              # protocole local de comparaison

tests/
├── ttl-cache.test.js
└── stock-summary-service.test.js
```

Contrat observable attendu :

| Opération                | Contrat                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `get(key)`               | Retourne `{ hit: false }` si absent/expiré, sinon `{ hit: true, value }`. Cette enveloppe distingue un miss d'une valeur `null` ou `undefined`. |
| `set(key, value, ttlMs)` | Stocke la valeur jusqu'à `now + ttlMs`. Clé non vide ; TTL entier, fini et strictement positif.                                                 |
| `delete(key)`            | Supprime une entrée et retourne si elle existait.                                                                                               |
| `clear()`                | Vide toutes les entrées.                                                                                                                        |

L'horloge doit être injectée (par exemple `now: () => number`) pour tester l'expiration sans attendre réellement. Par défaut, utilise `performance.now()` dans Node.js : cette horloge monotone mesure une durée ; `Date.now()` mesure le temps civil et peut reculer ou avancer lors d'une correction de l'heure système. Une entrée est expirée lorsque `now >= expiresAt`, pas seulement lorsque l'horloge dépasse cette valeur. L'expiration est paresseuse : elle est constatée au `get`; aucun timer de nettoyage en arrière-plan n'est requis. Une entrée expirée qui n'est jamais relue peut rester dans la `Map` : comme l'éviction par capacité est hors périmètre, garde un nombre de clés borné dans cet exercice et signale le risque mémoire d'un cache sans limite en production.

Le cache ne copie pas automatiquement les objets. Si tu mets en cache un objet mutable, documente qui peut le modifier ; privilégie un snapshot immuable ou une copie maîtrisée au niveau du service.

## Flux de lecture et d'écriture

```text
LECTURE
cache.get(key)
  ├─ hit  ─────────────────────────────► retourner value
  └─ miss ─► charger la source de vérité
               ├─ échec ───────────────► propager l'erreur, ne rien cacher
               └─ succès ─► cache.set(...) puis retourner value

ÉCRITURE
persister la modification
  ├─ échec ────────────────────────────► conserver l'état du cache
  └─ commit réussi ─► cache.delete(key) ► répondre succès
```

La clé du résumé doit inclure le périmètre d'isolation. Construis-la côté service à partir d'identifiants validés et sans collision de séparateur ; la forme recommandée est `JSON.stringify(['stock-summary', tenantId, storeId])`. Ainsi, les couples `(tenantId='a:b', storeId='c')` et `(tenantId='a', storeId='b:c')` restent distincts. Ne fais pas confiance à une clé libre fournie par un utilisateur pour choisir le périmètre d'un autre tenant.

**Limite connue à expliquer :** une lecture concurrente déjà en cours peut, selon l'ordre d'exécution, réinsérer une ancienne valeur après une invalidation. Ce projet local ne met pas en place de verrou distribué, de versionnement de cache ni de mécanisme anti-stampede. Identifie cette fenêtre comme un risque résiduel ; propose une stratégie d'évolution sans prétendre l'avoir implémentée.

## Tests à écrire

Écris au minimum un test pour chacun des 17 comportements d'acceptation du cahier des charges. Plusieurs comportements peuvent partager une fonction de test si chaque assertion reste explicite.

| ID  | Comportement à vérifier                                               |
| --- | --------------------------------------------------------------------- |
| C01 | clé absente → miss                                                    |
| C02 | valeur présente avant échéance → hit                                  |
| C03 | `null`/`undefined` stocké → hit distinct d'un miss                    |
| C04 | entrée valide juste avant l'échéance                                  |
| C05 | entrée expirée exactement à `expiresAt`                               |
| C06 | entrée expirée après `expiresAt`                                      |
| C07 | clé invalide ou TTL invalide rejeté                                   |
| C08 | `delete` indique correctement si une entrée existait                  |
| C09 | `clear` vide le cache                                                 |
| C10 | loader non appelé lors d'un hit                                       |
| C11 | loader appelé lors d'un miss                                          |
| C12 | loader en échec → aucune valeur mise en cache                         |
| C13 | chargement réussi → valeur mise en cache                              |
| C14 | commit réussi → clé ciblée invalidée                                  |
| C15 | commit échoué → aucune invalidation prématurée                        |
| C16 | tenant ou boutique différents → clés isolées                          |
| C17 | identifiants contenant `:` → aucune collision entre couples distincts |

Aucun nombre de tests « verts » n'est fourni par le cours : écris les tests, exécute-les dans ton environnement et consigne la commande ainsi que le résultat réellement observé.

## Mesure et benchmark : sans chiffres inventés

La question n'est pas « le cache est-il toujours plus rapide ? », mais « réduit-il les appels à la source de vérité dans cette charge, et à quel coût ? ».

Protocole minimal, une fois `benchmark.js` écrit :

1. utiliser les mêmes données et la même séquence de clés pour le scénario sans cache et le scénario cache-aside ;
2. préparer les données hors de la zone chronométrée ;
3. mesurer séparément les appels au loader, les hits, les misses et le temps total ;
4. faire un warm-up puis au moins cinq répétitions par scénario ;
5. noter Node, OS, CPU, tailles/forme des données et paramètres du TTL ;
6. publier médiane et dispersion, pas seulement le meilleur temps ;
7. expliquer que le loader simulé ne reproduit pas automatiquement la latence d'une base ou d'un réseau de production.

Tu peux utiliser trois charges, par exemple 1 000, 10 000 et 100 000 lectures, à condition d'indiquer qu'il s'agit de tailles de charge choisies pour l'exercice. Ne préremplis aucun résultat. Une Map en mémoire peut être aussi rapide ou plus rapide qu'une seconde Map de cache ; la réduction du nombre d'appels au loader est une mesure distincte du temps écoulé.

Tableau de rapport à remplir avec tes propres observations :

| Charge | Scénario    | Appels loader | Hits | Misses | Médiane (ms) | Environnement |
| -----: | ----------- | ------------: | ---: | -----: | -----------: | ------------- |
|    ... | Sans cache  |           ... |    : |      : |          ... | ...           |
|    ... | Cache-aside |           ... |  ... |    ... |          ... | ...           |

Aucun benchmark n'est livré dans le ZIP ; aucun temps de performance n'est réputé observé.

## ADR attendus

Produis au moins trois ADR réellement motivés :

- stratégie TTL et règle exacte de frontière d'expiration ;
- construction des clés et isolation tenant/boutique ;
- politique d'invalidation/fraîcheur et décision de conserver ou non le cache selon les mesures.

Utilise le [template ADR commun](../97-templates/03-ADR_TEMPLATE.md). Les trois sujets sont des décisions à instruire, pas des réponses prédéterminées.

## Gate de fin

Le projet est recevable lorsque :

- le contrat `get/set/delete/clear` est respecté ;
- les 17 comportements d'acceptation C01 à C17 sont couverts par des tests pertinents qui passent dans le runtime déclaré ;
- le loader en erreur ne laisse pas de valeur incorrecte en cache ;
- l'invalidation a lieu après commit réussi et non avant ;
- les clés isolent tenant et boutique, y compris lorsque les identifiants contiennent `:` ;
- les limites de concurrence et le risque de donnée périmée sont écrits ;
- la cardinalité de la fixture est bornée et la limite mémoire de l’expiration paresseuse est reconnue ;
- les ADR et le rapport de mesure contiennent tes observations réelles ;
- le [Security Gate du projet](04-SECURITY-GATE.md) est satisfait avec des preuves locales.

## Ressources complémentaires

- [Map et tables de hachage](../../06-DATA-STRUCTURES/07_hash_table/README.md)
- [Structures de données : carte du module](../../06-DATA-STRUCTURES/README.md)
- [async/await](../../../01-CADRAGE/02-ASYNC/03_async_await/README.md)
- [Tests unitaires](../../03-TESTING/02-unit_sniper.md)
- [Mesurer avant d'optimiser](../../05-MEMORY-PERFORMANCE/02A-measure_first.md)
- [Cache HTTP et validation conditionnelle : pour aller plus loin](../../19-API-CRAFT/README.md)
- [Standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md)

## Pitch portfolio

Présente le problème de cohérence que tu as choisi, le contrat du cache, les tests qui couvrent les frontières, la mesure réelle des appels à la source, un compromis et la limite que tu n'as pas résolue. N'affirme pas avoir déployé un cache distribué ou amélioré la latence de production si tu n'as réalisé qu'un exercice local.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Cahier des charges](00-CAHIER-DES-CHARGES.md)
- [Règles du projet](01-RULES.md)
- [Journal TDD](02-TDD-JOURNAL.md)
- [Préparation sécurité](03-SECURITY.md)
- [Security Gate](04-SECURITY-GATE.md)
- [Déclencheurs de spec drift](05-SPEC-DRIFT-TRIGGERS.md)
- [Drill de spec drift](06-SPEC-DRIFT-DRILL.md)
- [Postmortem](08-POSTMORTEM.md)
- [ADR à produire](ADR/README.md)
- [`src/` : code à écrire](src/README.md)
- [`tests/` : tests à écrire](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## État des artefacts livrés

- Code exécutable fourni : **aucun**.
- Suite de tests fournie : **aucune**.
- Benchmarks fournis : **aucun**.
- Les fichiers `src/README.md` et `tests/README.md` sont des consignes d'espace de travail, pas des implémentations.
- Les exemples de commande ne deviennent exécutables qu'après création des fichiers correspondants.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
