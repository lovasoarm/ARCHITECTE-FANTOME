---
stability: intemporel
acte: comprendre
---

Temps de lecture ~3 min

[PORTFOLIO]
[ATELIER]

# 16 : DISTRIBUTED ARENA

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00A-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.

> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).

-> Projet complet : budget à calibrer ; 8 h est une estimation de départ, pas un engagement garanti. Slice CORE : 7 h selon la carte CORE ; le reste est DEPTH.

Tu ne montes pas Kubernetes. Tu ne loues pas un cloud. Tu écris un système à N
processus Node qui parlent entre eux, en local, et tu mesures son comportement face à :

- une race condition déterministe,
- un timeout réseau,
- une panne partielle (arrêt d'un worker),
- un retry non idempotent qui peut corrompre les données si tu ne le sécurises pas.

Ce projet produit des preuves plus substantielles qu'une simple démonstration de déploiement : tests, mesure, reprise et décisions documentées. Il ne garantit pas à lui seul un niveau Senior ni un résultat de recrutement.

Prérequis : `01-CADRAGE/02-ASYNC` complet, `05-MAITRISE/02-SCALABILITY`, `03-PILOTAGE/05-OBSERVABILITY`.

---

## PITCH 3 LIGNES

Un mini système de "compteur distribué" : 4 workers Node qui incrémentent un total
partagé via un coordinateur. Tu injectes du chaos (latence, drop, kill). Tu prouves,
métriques à l'appui, que ton total final est correct ou honnêtement dégradé.

---

## CE QUE ÇA FAIT

```bash
$ node coordinator.js &
$ for i in 1 2 3 4; do node worker.js $i & done
$ node chaos.js --scenario race     # 500 incréments simultanés
$ node verify.js
  expected = 500 observed = 500    [OK]
$ node chaos.js --scenario kill-mid   # kill un worker à mi-parcours
$ node verify.js
  expected = 500 observed = 500    [OK, retry idempotent]
$ node chaos.js --scenario network-drop # drop 30% des messages
$ node verify.js
  expected = 500 observed = 500    [OK, at-least-once + dédup]
$ node chaos.js --scenario network-partition --duration 5s # isole des workers du coordinateur unique pendant 5s
$ node verify.js
  expected = 500 observed = 500    [OK si les opérations sont reprises sans double comptage ; sinon écart mesuré]

# Extension DEPTH distincte, uniquement si plusieurs coordinateurs sont implémentés :
$ node chaos.js --scenario coordinator-partition --duration 5s # isole des réplicas qui peuvent écrire
$ node verify.js
```

---

## LES 5 LIVRABLES OBLIGATOIRES

1. `coordinator.js` : reçoit les increments, applique idempotence (clé unique par op).
2. `worker.js` : envoie des increments avec retry backoff.
3. `chaos.js` : injecte les 4 scénarios (`race`, `kill-mid`, `network-drop`, `network-partition`). Pour `network-partition`, documente le comportement des workers isolés, les timeouts, le buffering/retry et la reprise, puis prouve l'absence de double comptage. Ne nomme pas cela « split-brain » tant qu'il n'existe pas plusieurs coordinateurs susceptibles d'accepter des écritures concurrentes. En extension DEPTH multi-coordinateur, compare une stratégie de quorum/consensus à une stratégie de disponibilité avec résolution de conflits : last-write-wins est une politique de conflit avec risque de perte d'écriture, un CRDT doit respecter des propriétés de convergence propres à son type, et un vector clock aide à détecter la concurrence mais ne définit pas à lui seul sa résolution.
4. `verify.js` : compare total observé vs attendu, sort code 0 ou 1.
5. `ADR-001_decision.md` : décision à produire par l’apprenant
   compteur monotone par worker. Trade-offs.

Bonus (mais fortement recommandé) : 6. `08-POSTMORTEM.md` d'un bug que tu n'as PAS anticipé au design et qui est apparu au chaos.

---

## GRILLE DE RÉUSSITE

- [ ] `verify.js` renvoie 0 sur les 4 scénarios chaos, 10 runs consécutifs.
- [ ] `network-partition` (coordinateur unique) : les opérations isolées échouent ou attendent selon un timeout documenté, puis reprennent sans double comptage ou le manque est signalé honnêtement.
- [ ] Extension multi-coordinateur seulement : le modèle documente les garanties de cohérence et de disponibilité pendant la partition. CAP ne signifie pas que le système choisit globalement « C ou A » en toutes circonstances ; sous partition, un système ne peut pas garantir simultanément la cohérence forte et la disponibilité pour les opérations concernées de chaque côté.
- [ ] `race` reproduit un data race avant fix (branche `broken`), corrigé après.
- [ ] `kill-mid` : au moins 1 worker relance sa dernière op sans double-comptage.
- [ ] `network-drop` : at-least-once avec dédup côté coordinateur (par clé UUID).
- [ ] ADR argumente idempotent-by-key vs sequence-number, cite 2 sources.
- [ ] Métriques exportées (au moins : `ops_sent`, `ops_acked`, `retries`, `dups_rejected`).

---

## PIÈGES CONNUS (ne pas les éviter, les traverser)

- **Le retry naïf casse tout.** Un `retry` sans clé d'idempotence double le compteur
  au premier drop réseau. Tu vas le voir. C'est la leçon.
- **`Date.now()` comme clé** : deux workers peuvent collisionner à la même ms. Utilise
  `crypto.randomUUID()`.
- **Coordinator unique = SPOF.** À la fin du projet, écris 3 lignes dans l'ADR sur
  comment tu ferais un vrai consensus (Raft, Paxos) : tu ne l'implémentes pas, tu
  démontres que tu sais que c'est là.

---

## POURQUOI CE PROJET EXISTE

En 2026, "je sais faire du distribué" est le mot magique qui fait passer un CV de
mid à senior. La plupart des devs qui le disent ont fait un tuto Kubernetes. Toi,
tu auras cassé et réparé un système chaos-tested, avec un ADR défendable. C'est
un ordre de magnitude plus crédible en entretien.

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Séquence de preuve et limites du résultat

1. **Modéliser** : écris la machine à états, la clé d'idempotence, la propriété de sécurité/correction et le périmètre exact de la garantie.
2. **Prédire** les effets d'une course, d'un retry, d'une perte de réponse et d'un arrêt de worker.
3. **Reproduire avant fix** au moins un double-comptage ou une mise à jour perdue.
4. **Corriger** puis lancer plusieurs répétitions contrôlées ; consigne les opérations envoyées, acceptées, rejetées comme doublons et en attente.
5. **Transférer** : ajoute une seconde contrainte et explique si la solution dépend toujours du coordinateur unique. Ne nomme pas « split-brain » une partition de workers sans plusieurs nœuds pouvant accepter des écritures concurrentes.

**Gate :** la conclusion sépare garantie, comportement observé et hypothèse non testée. Les résultats d'un modèle local ne certifient pas un système distribué en production. Complète avec [65 : Données/API/transactions](../../../06-ANNEXES-TRANSVERSES/65-LAB-DONNEES-API-ET-TRANSACTIONS.md), [61 : Exercices systèmes](../../../06-ANNEXES-TRANSVERSES/61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md) et [67 : Gate de maîtrise](../../../06-ANNEXES-TRANSVERSES/67-GATE-MAITRISE-ET-CAPSTONE.md).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [SPEC DRIFT : la specification change en cours de projet](06-SPEC-DRIFT-DRILL.md)
- [`00_fixtures/`](00_fixtures/README.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : distributed arena](08-POSTMORTEM.md)
- [RULES : 16_distributed_arena](01-RULES.md)
- [SECURITY : 16_distributed_arena](03-SECURITY.md)
- [Security Gate : 16_distributed_arena](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 16_distributed_arena](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : distributed arena](02-TDD-JOURNAL.md)
- [Cahier des charges : distributed arena](00A-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->

---

## État des tests et point de départ (référence AF)

Consulte aussi le [standard commun des mini-projets](../00A-FIELD-PRACTICE-STANDARD.md). Les catégories ci-dessous décrivent **l'état réel de ce ZIP**, pas un résultat de tests supposé.

### État initial, tests et validation

- **Code fourni :** aucun moteur distribué dans `src/`. `00_fixtures/` contient des consignes et fixtures de travail ; services, stockage et orchestration sont à construire.
- **Tests de référence verts :** aucun test automatisé livré.
- **Tests volontairement rouges :** aucun test exécutable n'est livré au démarrage.
- **Prérequis :** bases de concurrence, messages et persistance. Docker ou un broker réel ne sont pas exigés pour la conception initiale ; s'ils sont utilisés, consigne leurs versions et coûts.
- **Tests/scénarios à définir :** livraison au moins une fois, doublons, idempotence, ordre partiel, retry/backoff, poison message, panne de nœud, redémarrage, partition, cohérence et rétention.
- **Validation sur papier :** définir invariants, modèle d'état, transitions, contrat d'événement, clé d'idempotence, stratégie de reprise et test de chaos simulé. Une affirmation « exactly once » sans modèle d'effet et de déduplication ne passe pas.
- **Ordre de travail :** définir le modèle de défaillance, les invariants et les états ; décrire les transitions et les effets ; simuler le rejeu, le redémarrage et les partitions avant de choisir les composants.
- **Validation finale :** démontrer qu'un redémarrage et un rejeu ne dupliquent pas l'effet métier, avec journaux et états avant/après.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
- [Référence technique différée](reference/README.md) : à consulter après la tentative, sans recopier dans le livrable.
