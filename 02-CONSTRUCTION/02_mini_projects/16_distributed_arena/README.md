---
stability: intemporel
acte: restituer
---


Temps de lecture ~3 min

[PORTFOLIO]
[ATELIER]

# 16 : DISTRIBUTED ARENA

> Mode de vérification des exercices de ce module : critère binaire du `verification_pack` ([verification_pack/criteres.md](verification_pack/criteres.md)). Aucun exercice de ce module n'est corrigé par une IA.

-> ~8h (réparties sur 3 sessions)

Tu ne montes pas Kubernetes. Tu ne loues pas un cloud. Tu écris un système à N
processus Node qui parlent entre eux, en local, et tu prouves qu'il survit à :

- une race condition déterministe,
- un timeout réseau,
- une panne partielle (kill -9 sur un noeud),
- un retry non idempotent qui corrompt les données SI tu ne le sécurises pas.

C'est le mini-projet manquant qui distingue un dev mid d'un dev senior en 2026.

Prérequis : `01-CADRAGE/02_async` complet, `05-MAITRISE/02_scalability`, `03-PILOTAGE/05_observability`.

---

## PITCH 3 LIGNES

Un mini système de "compteur distribué" : 4 workers Node qui incrémentent un total
partagé via un coordinateur. Tu injectes du chaos (latence, drop, kill). Tu prouves,
métriques à l'appui, que ton total final est correct ou honnêtement dégradé.

---

## CE QUE ÇA FAIT

```
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

## LES 6 LIVRABLES OBLIGATOIRES

1. `coordinator.js` : reçoit les increments, applique idempotence (clé unique par op).
2. `worker.js` : envoie des increments avec retry backoff.
3. `chaos.js` : injecte 4 scénarios (`race`, `kill-mid`, `network-drop`, `network-partition`). Sur `network-partition`, tu DOIS documenter dans l'ADR comment ton système réagit : refus d'écrire côté minoritaire (quorum type Raft) ou acceptation + réconciliation au reconnect (last-write-wins, CRDT, vector clock). Pas de bonne réponse, juste une décision assumée et défendable.
4. `verify.js` : compare total observé vs attendu, sort code 0 ou 1.
5. `ADR-001_decision.md` : pourquoi tu as choisi une clé UUID par op et pas un
  compteur monotone par worker. Trade-offs.

6. `POSTMORTEM.md` (OBLIGATOIRE, pas bonus) d'un bug que tu n'as PAS anticipé au design et qui est apparu au chaos.

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

Installation canonique : `npm ci` (pas `npm install`). `npm ci` respecte strictement le `package-lock.json` : deux personnes qui clonent obtiennent exactement les mêmes versions. Committe toujours ton `package-lock.json`. Sans lui, un `npm install` 3 mois plus tard installera d'autres versions et tu debug un fantôme.


---

## INCIDENT/ (OBLIGATOIRE)

Le dossier `INCIDENT/` n'est pas un bonus : c'est une étape obligatoire de ce
mini-projet, au même titre que les 6 livrables ci-dessus.

- `01_scenario_panne.js` : scénario de panne déterministe, rejouable à l'identique.
- `02_logs_correles.md` : logs corrélés entre coordinateur et workers pour ce scénario.
- `03_CHECKLIST_DEBOGAGE_DISTRIBUE.md` : checklist de débogage distribué à suivre pendant l'incident.
- `04_POSTMORTEM_GABARIT.md` : gabarit de postmortem spécifique à l'incident (distinct du `POSTMORTEM.md` global du projet, obligatoire lui aussi).
- `05_CORRIGE.md` : corrigé de l'incident, à ne consulter qu'après avoir tenté la checklist seul.

Tant que `INCIDENT/` n'est pas traité, le mini-projet 16 n'est pas livré,
même si `verify.js` renvoie 0 sur les 4 scénarios chaos.

Renvoi croisé : la notion d'annulation/timeout/retry mobilisée ici est posée
dans `01-CADRAGE/02_async` (callbacks, promises, event loop, backpressure) et
son usage en pilotage de fiabilité est prolongé dans
`03-PILOTAGE/06_fiabilite_slo` (SLO, budget d'erreur, reprise).

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `02-CONSTRUCTION/02_mini_projects/16_distributed_arena` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_SPEC_DRIFT.md](00_SPEC_DRIFT.md)
- [POSTMORTEM.md](POSTMORTEM.md)
- [RULES.md](RULES.md)
- [SECURITY.md](SECURITY.md)
- [SECURITY_GATE.md](SECURITY_GATE.md)
- [SPEC_DRIFT_TRIGGERS.md](SPEC_DRIFT_TRIGGERS.md)
- [TDD_JOURNAL.md](TDD_JOURNAL.md)
- [cahierdescharges.md](cahierdescharges.md)
- [ADR/](ADR/README.md)
- [INCIDENT/](INCIDENT/README.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->
