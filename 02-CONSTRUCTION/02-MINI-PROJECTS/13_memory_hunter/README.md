---
stability: intemporel
acte: comprendre
---

[PORTFOLIO]

# 13 : MEMORY HUNTER

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00A-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~5 min

Un mini-serveur Node volontairement pourri. Cinq fuites cachées. Ton job : les traquer, les tuer, les documenter.

## Pitch 3 lignes

Ce projet prouve que je sais lire un heap snapshot, corréler une allocation à une closure, et écrire un post-mortem qu'un autre dev peut relire. Sans framework, sans magie.

## Les cinq bêtes

1. Closure qui capture un gros objet (voir `02-CONSTRUCTION/05-MEMORY-PERFORMANCE/01_gc/03`).
2. Event listener jamais retiré (`.on()` sans `.off()`).
3. `setInterval` orphelin après un unref manqué.
4. Variable globale (`global.cache = []`) qui push à l'infini.
5. Cache Map sans éviction (LRU absent).

## Ce qu'on te livre

- `src/server.js` : le serveur avec les 5 pièges.
- `bench/spam.sh` : script pour envoyer 10 000 requêtes.
- `TEMPLATE_LEAK_REPORT.md` : à remplir pour chaque fuite trouvée.

## Ce que tu dois livrer

- `LEAK_REPORT_01.md` … `LEAK_REPORT_05.md` : cause racine, preuve (snapshot), correction, mesure.
- `ADR-001_decision.md` : décision à produire par l’apprenant
- `08-POSTMORTEM.md` : ce que tu ferais différemment.

## Critères d'acceptation

- Heap stable après 10 000 requêtes (< +5 MB par rapport à la baseline).
- Aucun `setInterval` restant sans `unref`.
- Empreinte carbone : estime l'impact d'un serveur qui fuit vs corrigé (voir `05-MAITRISE/06-ANNEXES/04-finops_greenops.md`).

## Piège

Corriger sans mesurer, c'est deviner. Snapshot avant, snapshot après, sinon ça compte pas.

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
