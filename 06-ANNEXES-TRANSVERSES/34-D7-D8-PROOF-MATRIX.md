---
stability: stable
route: depth
acte: prouver
---

# 34 : Matrice D7 → D8 : preuves de raisonnement architectural

<!-- AF-DIAGRAM:d7d8 -->

```text
D1 connaître
  │
  ▼
D3 diagnostiquer
  │
  ▼
D4 arbitrer
  │
  ▼
D5 transférer
  │
  ▼
D7 invalider son modèle
  │
  ▼
D8 reconstruire sous contrainte
```

La profondeur D7→D8 exige de pouvoir abandonner puis reconstruire son propre modèle mental.

Ce document ne remplace aucun exercice. Il rend visible **où la progression demande de falsifier, réviser, transférer et reconstruire** un modèle mental.

| Compétence intégratrice    | Point d’entrée                                           | Épreuve de révision                                 | Preuve attendue                                                     | Niveau cible |
| -------------------------- | -------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------- | ------------ |
| Décision d’architecture    | `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/`              | perturbation/spec drift d’un mini-projet            | ADR initial + ADR révisé + justification du changement              | D7           |
| Conception sous changement | `00-SOCLE/05-PROBLEM-SOLVING/07-design_for_change.md`    | nouvelle contrainte après première solution         | modèle avant/après + raison du pivot                                | D7           |
| Systèmes distribués        | `02-CONSTRUCTION/02-MINI-PROJECTS/16_distributed_arena/` | incident, idempotence ou charge nouvelle            | décision, contre-argument, stratégie révisée                        | D7           |
| Reprise de legacy          | `02-CONSTRUCTION/02-MINI-PROJECTS/12_legacy_takeover/`   | découverte contradictoire après lecture initiale    | hypothèse initiale, preuve, changement de plan                      | D7           |
| Produit / coût / risque    | `03-PILOTAGE/08-PRODUIT-COUT-ROI/`                       | budget ou objectif business modifié                 | arbitrage avant/après + métrique d’impact                           | D7           |
| Sécurité / fiabilité       | `03-PILOTAGE/04-SECURITY/` + mini-project gates          | incident ou nouvelle contrainte de sécurité         | menace réévaluée + décision + rollback/mitigation                   | D7           |
| Revue comparative de code  | `02-CONSTRUCTION/02-MINI-PROJECTS/18_human_vs_ai_smell/` | edge case qui invalide l’intuition initiale         | audit des hypothèses + correction justifiée                         | D7           |
| Gouvernance IA             | `02-CONSTRUCTION/02-MINI-PROJECTS/19_supervise_the_ai/`  | proposition IA contradictoire                       | accept/reject/escalate + raisons + garde-fous                       | D7           |
| Synthèse Staff             | capstone                                                 | perturbation importante après première architecture | reconstruction complète du modèle et transfert à un contexte inédit | D8           |

## Règle de preuve

Une simple bonne réponse ne ferme pas D7. La preuve doit montrer :

`hypothèse initiale → observation contradictoire → révision → décision → justification → transfert`.

Pour D8, ajouter :

`nouveau contexte → contraintes nouvelles → modèle reconstruit → défense de l’inverse → limites explicites`.

## Anti-gaming

Le document ne fournit aucune solution d’exercice ni architecture canonique à recopier. Il sert uniquement à rendre l’attendu de profondeur observable.

<!-- AF-D8-LEADERSHIP-TRACE -->

## Traçabilité D8 : décision, objection et transmission

| Compétence intégratrice                      | Épreuve                                                                                                                                                                                          | Preuve exigée                                                                                | Statut de preuve                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Reconstruire une décision sous contrainte    | [29 : Épreuve D8](29-EPREUVE-D8-RECONSTRUCTION.md) et [73 : Leadership Simulation Gate](73-TECHNICAL-LEADERSHIP-PRACTICUM.md#leadership-simulation-gate--kintana--décision-technique-transverse) | Décision initiale, contrainte inconnue, objection adverse, ADR révisé, défense et passation  | `SIMULATION` si personnages fictifs ; revue/adoption réelle uniquement si observée séparément                     |
| Rendre le système reprenable sans son auteur | Gate 73, étape 7                                                                                                                                                                                 | `HANDOVER.md`, responsabilités, invariants, risques, runbook, rollback et décisions ouvertes | La qualité du document peut être évaluée en simulation ; la reprise effective par un tiers est une preuve externe |

La réussite D8 dépend de la chaîne `hypothèse → information contradictoire → révision → décision → transfert → passation`. Un ADR bien rédigé sans objection examinée ni transfert ne suffit pas à démontrer D8.
