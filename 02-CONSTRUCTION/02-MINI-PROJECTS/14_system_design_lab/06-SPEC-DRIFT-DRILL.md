---
stability: intemporel
acte: comprendre
cognitive_level: L5
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# SPEC DRIFT : 14_system_design_lab

Temps de lecture ~2 min

## Règle du jeu

À mi-parcours de ce mini-projet, la spec CHANGE. Volontairement. C'est le geste central.

## Contrainte imposée en cours de route

Au moment où tu as terminé la première itération (design + premier code), on t'annonce :

> "On passe de mono-tenant à multi-tenant. Le trafic sera 10x, les données doivent être isolées par client, et la latence P99 doit rester < 200ms."

## Ce que tu dois produire

1. Un **ADR supplémentaire** (`ADR/002_multi_tenant_pivot.md`) qui documente :

- Le changement de contrainte.
- Les options considérées (schema-per-tenant, row-level, DB-per-tenant).
- Le choix retenu et pourquoi.
- Ce qui casse dans la V1 et le plan de migration.

2. Une entrée dans `08-POSTMORTEM.md` : ce que tu aurais fait différemment en V1 sachant ça.

3. Un test de non-régression qui prouve que la V2 respecte la P99.

## Pourquoi ce drill

Les specs bougent. Les vraies. Un ingénieur qui rage-quit au premier changement de spec ne
survit pas 6 mois en équipe. Ce drill matérialise la résilience aux specs mouvantes.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
