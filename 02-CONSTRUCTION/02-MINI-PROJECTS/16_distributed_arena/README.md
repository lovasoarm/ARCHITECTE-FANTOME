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


-> ~8h (réparties sur 3 sessions)

Tu ne montes pas Kubernetes. Tu ne loues pas un cloud. Tu écris un système à N
processus Node qui parlent entre eux, en local, et tu prouves qu'il survit à :

- une race condition déterministe,
- un timeout réseau,
- une panne partielle (kill -9 sur un noeud),
- un retry non idempotent qui corrompt les données SI tu ne le sécurises pas.

C'est le mini-projet manquant qui distingue un dev mid d'un dev senior en 2026.

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
$ node chaos.js --scenario network-partition --duration 5s # coupe 2 workers du coordinateur pendant 5s (split-brain)
$ node verify.js
  expected = 500 observed = 500    [OK, quorum refuse le split OU réconcilie après reconnect]
```

---

## LES 5 LIVRABLES OBLIGATOIRES

1. `coordinator.js` : reçoit les increments, applique idempotence (clé unique par op).
2. `worker.js` : envoie des increments avec retry backoff.
3. `chaos.js` : injecte 4 scénarios (`race`, `kill-mid`, `network-drop`, `network-partition`). Sur `network-partition`, tu DOIS documenter dans l'ADR comment ton système réagit : refus d'écrire côté minoritaire (quorum type Raft) ou acceptation + réconciliation au reconnect (last-write-wins, CRDT, vector clock). Pas de bonne réponse, juste une décision assumée et défendable.
4. `verify.js` : compare total observé vs attendu, sort code 0 ou 1.
5. `ADR-001_decision.md` : décision à produire par l’apprenant
  compteur monotone par worker. Trade-offs.

Bonus (mais fortement recommandé) : 6. `08-POSTMORTEM.md` d'un bug que tu n'as PAS anticipé au design et qui est apparu au chaos.

---

## GRILLE DE RÉUSSITE

- [ ] `verify.js` renvoie 0 sur les 4 scénarios chaos, 10 runs consécutifs.
- [ ] `network-partition` : ton système soit refuse d'écrire côté minoritaire, soit accepte + réconcilie honnêtement. Choix documenté dans l'ADR avec trade-offs (CAP : tu choisis C ou A, tu ne bluffes pas les deux).
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
