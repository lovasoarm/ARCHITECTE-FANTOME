---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# 13 : MEMORY HUNTER
> **Repère de navigation :** le dossier `00_fixture`/`00_fixtures` contient les données statiques nécessaires au scénario ; `00A-CAHIER-DES-CHARGES.md` décrit le travail à réaliser. Le dossier fournit les entrées, le fichier `00A` donne le contrat : ce ne sont pas deux leçons numérotées à lire dans cet ordre.


## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00A-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADR réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

> ~5 min

Un mini-laboratoire Node.js construit par toi : une fixture bornée montre un cas concret de rétention ; tu construis ensuite cinq scénarios isolés pour comprendre, diagnostiquer et corriger cinq familles de fuites mémoire. **Aucun serveur HTTP, générateur de charge ou correctif complet n'est fourni.**

## Pitch 3 lignes

Ce projet prouve que je sais lire un heap snapshot, relier une allocation à une référence qui la retient, vérifier le cycle de vie d'une ressource et écrire un post-mortem qu'un autre développeur peut relire. Sans framework, sans magie.

## Les cinq familles à construire et diagnostiquer

Les cinq entrées suivantes sont des **objectifs de travail**, pas cinq défauts déjà cachés dans un serveur livré :

1. Closure qui conserve un objet lourd après la fin de son propriétaire (voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/03`).
2. Event listener conservé après la fin du cycle de vie (`.on()` sans retrait correspondant avec `.off()` ou `removeListener()`).
3. Timer qui continue à retenir son callback ou sa ressource après l'arrêt du propriétaire : annulation explicite requise.
4. Collection globale ou de processus qui grandit sans limite.
5. Cache `Map` borné seulement en nombre d'entrées, sans politique adaptée au poids mémoire des valeurs.

Construis un exemple minimal et indépendant pour chaque famille dans `src/`. Tu peux les réunir dans un petit service local en extension, mais un serveur HTTP et 10 000 requêtes ne sont pas des prérequis du projet.

## Ce qui est fourni

- `00_fixture/00_leaky.js` : une fixture volontairement suspecte et **bornée dans le temps et le volume**. Elle illustre une Map dont les entrées sont évincées alors que les closures inscrites dans le tableau `listeners` continuent à retenir les buffers (ce tableau n'est pas un `EventEmitter`).
- `09-LEAK-REPORT-TEMPLATE.md` : le modèle réel à copier et remplir pour chaque cas étudié.
- Les consignes, règles, gabarits TDD, sécurité, ADR et postmortem du dossier.

**Ce qui n'est pas fourni :** `src/server.js`, `bench/spam.sh`, un serveur HTTP, un générateur de charge, les cinq scénarios déjà codés ou un correctif prêt à l'emploi. `src/` et `tests/` sont des espaces de travail à remplir par toi.

## Ce que tu dois construire et livrer

- Cinq reproductions isolées dans `src/`, une par famille ci-dessus, avec une explication du cycle de vie et du chemin de rétention.
- Des contrôles dans `tests/` qui vérifient les invariants fonctionnels et les limites de ressources ; écris les tests avant le code (TDD).
- `LEAK_REPORT_01.md` à `LEAK_REPORT_05.md` : symptôme, hypothèse initiale, protocole reproductible, preuve de rétention, cause racine, correction et limites de la mesure.
- Au moins **4 ADR réellement distincts** dans `ADR/` (voir `01-RULES.md` et `ADR/README.md`) ; ne crée pas de décisions artificielles pour remplir un quota.
- `08-POSTMORTEM.md` : ce que tu ferais différemment.

## Critères d'acceptation

- Chaque famille possède un scénario reproductible, une cause racine reliée à une référence qui retient l'objet et une correction testée.
- Après un warm-up et plusieurs séries identiques, les **objets/ressources retenus par les racines que tu contrôles ne croissent plus sans borne**. Les invariants attendus sont écrits pour chaque scénario (listeners retirés, timers annulés, collections nettoyées ou bornées, cache limité selon une politique explicitée).
- Compare les observations dans des conditions notées : même version de Node, même charge, même séquence d'opérations et même protocole de snapshot. Consigne `heapUsed`, `external` et `arrayBuffers` ; ajoute `rss` comme contexte, pas comme seuil universel. `arrayBuffers` est déjà inclus dans `external` : ne les additionne pas.
- Aucun `setInterval` ou `setTimeout` qui doit cesser avec le propriétaire ne reste actif après son arrêt : utilise `clearInterval()` ou `clearTimeout()` et vérifie le cycle de vie. `unref()` ne remplace pas l'annulation.
- Empreinte carbone : estime l'impact d'un service qui retient inutilement des ressources par rapport à une version corrigée (voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`).

**Important pour les mesures :** ne traite pas un seuil absolu de RSS (par exemple `+5 MB`) comme une preuve universelle. Le RSS inclut notamment des allocations natives et peut évoluer avec l'environnement. Une conclusion doit s'appuyer sur plusieurs signaux, des objets retenus identifiés et un protocole comparable ; explique les limites plutôt que d'inventer un seuil.

## Piège

Corriger sans mesurer, c'est deviner. Snapshot avant, snapshot après, même protocole et chemin de rétention expliqué ; sinon la preuve est incomplète.

## THÈME NEUTRE (optionnel)

Si les références Naruto/DBZ ne te parlent pas, remplace mentalement par un domaine que tu connais (foot, cuisine, musique). Le concept technique reste identique.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [06-SPEC-DRIFT-DRILL.md : spec drift **en cours de projet** (mouvant)](06-SPEC-DRIFT-DRILL.md)
- [`00_fixture/`](00_fixture/README.md)
- [LEAK_REPORT : <nom du service ou fixture>](09-LEAK-REPORT-TEMPLATE.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : memory hunter](08-POSTMORTEM.md)
- [RULES : 13_memory_hunter](01-RULES.md)
- [SECURITY : 13_memory_hunter](03-SECURITY.md)
- [Security Gate : 13_memory_hunter](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 13_memory_hunter](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : memory hunter](02-TDD-JOURNAL.md)
- [Cahier des charges : memory hunter](00A-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État initial, tests et validation

- **Code fourni :** aucune implémentation des cinq scénarios, aucun serveur, aucun générateur de charge et aucun correctif ne sont livrés dans `src/`. Ce dossier est un scaffold documentaire. `00_fixture/00_leaky.js` est l'unique fixture JavaScript volontairement suspecte ; elle illustre un cas de rétention, pas les cinq familles, et ce n'est ni le correctif ni un test automatisé.
- **Tests de référence verts :** aucun test automatisé livré.
- **Tests volontairement rouges :** aucun. La fixture est un sujet d'analyse ; elle n'est pas censée échouer comme un test.
- **Prérequis :** Node.js 22.x. `--expose-gc` peut aider à rendre l'observation plus contrôlable, mais `global.gc()` ne garantit pas une collecte immédiate.
- **Premières commandes sûres :** depuis la racine du dossier projet, `node --check 00_fixture/00_leaky.js`, puis lecture du fichier. L'exécution de la fixture est facultative, bornée à 20 secondes et environ 20 MiB de buffers alloués ; n'augmente pas ses constantes sur ta machine principale.
- **Travail à construire :** reproduire cinq familles de rétention dans des scénarios isolés, isoler chaque chemin qui conserve la référence et comparer avant/après sous une charge bornée. Vérifie la libération fonctionnelle sans supposer un instant exact pour le GC.
- **Validation finale :** rapports avec heap snapshots ou profils comparables, protocole de mesure, warm-up, version Node, taille/volume des données, invariants de cycle de vie et limites.
- **Preuve attendue :** réduction reproductible de la rétention sans régression fonctionnelle ; `tests/README.md` décrit les artefacts à produire, pas une suite déjà livrée.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
