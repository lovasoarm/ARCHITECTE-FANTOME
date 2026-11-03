---
stability: intemporel
acte: pratiquer
---

# Postmortem : 04 BREAKING CACHE

À remplir par l'apprenant après un incident réel de ton exercice ou une simulation explicitement indiquée comme telle. Ce document n'est pas un corrigé.

## Résumé

- Résultat attendu :
- Résultat observé :
- Contexte (simulation locale ou système réel) :

## Chronologie

| Temps | Signal / action | Observation vérifiable |
| ----- | --------------- | ---------------------- |
| T0    |                 |                        |
| T1    |                 |                        |
| T2    |                 |                        |

## Impact

- Donnée périmée ou incorrecte servie ?
- Tenant / boutique concernés :
- Durée d'exposition connue ou estimée :
- Appels loader / hits / misses observés :

## Cause

- Symptôme :
- Cause immédiate :
- Cause système (contrat, clé, TTL, invalidation, concurrence, mesure) :
- Hypothèse initiale qui était fausse :

## Correction et prévention

- Mitigation :
- Correction durable :
- Test ajouté :
- ADR modifié :
- Risque résiduel :

## Comment j'ai encaissé le drift

À compléter uniquement si une perturbation de `05-SPEC-DRIFT-TRIGGERS.md` a été activée.

## Ce que je ne peux pas conclure

Écris explicitement ce que tes tests locaux ne prouvent pas : charge réelle, multi-instance, cohérence distribuée, capacité de production, ou disponibilité d'une base distante.
