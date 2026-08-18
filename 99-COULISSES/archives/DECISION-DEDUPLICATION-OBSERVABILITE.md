---
stability: stable
acte: évaluer
---

# DECISION — Deduplication de l'observabilite

Date : 2026-08-17 (journalisation retroactive de la decision prise a la fusion du 2026-08-14).
Reference d'audit : 0.6, 0.10 — correction A12.

## Contexte

Deux traitements de l'observabilite coexistaient apres fusion :
un traitement de reference issu de MyFunnyJS (`03-PILOTAGE/05_observability/`, 10 fichiers,
~60 Ko) et un chapitre applicatif issu de ProjectFunny
(`09-QUALITY-SHIELD/03-observability.md`, 15 113 octets).

## Decision

Un seul traitement de reference : `03-PILOTAGE/05_observability/`.
`03-PILOTAGE/03-QUALITY-SHIELD/03-observability.md` est reduit a sa valeur propre — l'angle
« bouclier qualite » — et renvoie vers le traitement de reference pour le fond.

| Element | Avant | Apres | Ecart |
| --- | --- | --- | --- |
| `03-PILOTAGE/03-QUALITY-SHIELD/03-observability.md` | 15 113 octets | 4 687 octets | −10 426 octets |

## Ce qui a ete fusionne vers `03-PILOTAGE/05_observability/`

- logs structures -> [01_structured_logging.md](../../03-PILOTAGE/05_observability/01_structured_logging.md)
- traces distribuees -> [02_distributed_tracing.md](../../03-PILOTAGE/05_observability/02_distributed_tracing.md)
- metriques et alertes -> [04_metrics_alerting.md](../../03-PILOTAGE/05_observability/04_metrics_alerting.md)
- outillage de production -> [05_sentry_in_prod.md](../../03-PILOTAGE/05_observability/05_sentry_in_prod.md)

## Ce qui a ete supprime comme redondant

Les rappels de definition (log / metrique / trace), les exemples de code dupliques et la
checklist de mise en place, tous presents a l'identique dans le traitement de reference.

## Version source archivee integralement

[sources/SOURCE-projectfunny-09-QUALITY-SHIELD-03-observability.md](sources/SOURCE-projectfunny-09-QUALITY-SHIELD-03-observability.md)

## Regle generalisee

Toute suppression de plus de 2 Ko de contenu source exige une decision datee dans ce dossier,
avec octets avant/apres et lien vers la source archivee. Le controle de livraison le rappelle
dans son rapport.
