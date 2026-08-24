---
stability: intemporel
acte: comprendre
---

Temps de lecture ~2 min

[PORTFOLIO]

# 14 : SYSTEM DESIGN LAB

## Ordre de lecture

Lis ce dossier dans cet ordre : `README.md` → `00-CAHIER-DES-CHARGES.md` → `01-RULES.md` → `02-TDD-JOURNAL.md` → `03-SECURITY.md` → `04-SECURITY-GATE.md` → `05-SPEC-DRIFT-TRIGGERS.md` → `06-SPEC-DRIFT-DRILL.md` → travail dans `src/` et `tests/` → `08-POSTMORTEM.md` → ADRs réellement produits. Les dossiers `ADR/`, `src/` et `tests/` sont des espaces de production, pas des lectures préalables.


> **Route CORE 16 semaines :** ce projet conserve son contenu complet. Pour le sprint intensif, consulte [la carte CORE](../../../06-ANNEXES-TRANSVERSES/25-CORE-MINI-PROJECT-MAP.md) pour le slice recommandé. Le passage CORE ajoute une perturbation, un transfert et un rappel à froid ; voir [Engine d’ambiguïté](../../../06-ANNEXES-TRANSVERSES/20-ENGINE-AMBIGUITE.md).


-> ~15 h

## PITCH 3 LIGNES

Deux services qui se parlent via une queue, avec retry, idempotence et tracing. Tu chaos-testes le tout et tu écris le postmortem. Le mini-projet qui prouve que tu penses en systèmes, pas en fonctions.

## MISSION

Tu construis un mini-écosystème :

```json
  [ API-Front ] ──HTTP──► [ Broker (Redis/RabbitMQ) ] ──► [ Worker ]
    ▲                            │
    └─────────────── tracing (OpenTelemetry) ◄──────────────┘
```

Contraintes non négociables :

- Docker Compose : 3 services minimum (front, broker, worker).
- Retry avec backoff exponentiel côté worker.
- Idempotence : rejouer un message ne double PAS l'effet.
- Tracing distribué : un `trace_id` traverse les 3 services.

## LIVRABLES

1. `ARCHITECTURE.md` : diagramme ASCII + décisions (queue, DB, retry policy).
2. `ADR-001_decision.md` : décision à produire par l’apprenant
3. Code fonctionnel + `docker-compose up` qui marche du premier coup.
4. **Chaos test** : tue le worker en plein traitement, tue le broker 30 s, coupe le réseau front↔broker. Vérifie que rien n'est perdu ni dupliqué.
5. `08-POSTMORTEM.md` : ce qui a cassé, ce que t'as appris, ce que tu changerais.
6. Dépôt GitHub public, lien dans le `09-DEPENDENCY_LEDGER.md`.

## CE QUE LE PROJET CACHE

L'idempotence a l'air simple ("juste un id unique"). En vrai, tu dois choisir OÙ tu stockes les ids vus, TTL, comment tu gères les collisions, quoi faire si le stockage d'idempotence tombe. Trois lignes de spec, deux jours de galère.

## THÈME NEUTRE (si Naruto/DBZ ne te parle pas)

Pense "mission assignée → notification au utilisateur". Même problème, même solution.

## AUTO-ÉVAL

- [ ] Chaos test survécu 3 scénarios sur 3
- [ ] Trace_id visible bout en bout
- [ ] Pas de duplication après retry
- [ ] POSTMORTEM publié
- [ ] Peer-review reçue avant merge final

## VARIANTE CHAOS (obligatoire)

Après 30 minutes de conception, tu reçois deux contraintes contradictoires imposées d'en haut, sans préavis (comme un vrai changement de scope) :

- "Le système doit maintenant supporter le mode offline côté front."
- "Le budget infra est divisé par deux : un service de moins."

Tu dois adapter ton architecture pour absorber les deux, ou arbitrer explicitement laquelle tu sacrifies partiellement et pourquoi. Documente la bascule dans un ADR supplémentaire `ADR-003_decision.md` : décision à produire par l’apprenant

---

## REPRODUCTIBILITÉ

Le dépôt pédagogique ne fournit ni `node_modules/` ni lockfile de ton futur dépôt apprenant. Si le projet utilise des dépendances npm, ton dépôt apprenant doit versionner `package.json` et `package-lock.json`, puis utiliser `npm ci` en CI pour installer exactement cet arbre. Si le projet est sans dépendances, consigne simplement la version de runtime et la commande de test réellement utilisée. La preuve de reproductibilité est la commande et la version relevées dans ton propre dépôt, pas une valeur inventée dans le curriculum.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [SPEC DRIFT : 14_system_design_lab](06-SPEC-DRIFT-DRILL.md)
- [`ADR/`](ADR/README.md)
- [Postmortem : system design lab](08-POSTMORTEM.md)
- [RULES : 14_system_design_lab](01-RULES.md)
- [SECURITY : 14_system_design_lab](03-SECURITY.md)
- [Security Gate : 14_system_design_lab](04-SECURITY-GATE.md)
- [SPEC DRIFT TRIGGERS : 14_system_design_lab](05-SPEC-DRIFT-TRIGGERS.md)
- [TDD journal : system design lab](02-TDD-JOURNAL.md)
- [Cahier des charges : system design lab](00-CAHIER-DES-CHARGES.md)
- [`src/`](src/README.md)
- [`tests/`](tests/README.md)

<!-- CONTENU-DOSSIER:fin -->
