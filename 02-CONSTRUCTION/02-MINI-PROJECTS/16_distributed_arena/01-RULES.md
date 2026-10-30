---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [defaut_cache, decision_inversee]
anti_recipe_key: defaut_cache+decision_inversee
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# RULES : 16_distributed_arena

Temps de lecture ~2 min

Règles minimales de release. Un projet qui échoue une de ces règles est marqué
INCOMPLET par un critere binaire ecrit dans ton `02-TDD-JOURNAL.md`.

## ADR_MINIMUM

**CORE (slice 7 h) :** au moins un ADR qui justifie l'idempotence, le contrat de reprise et une alternative rejetée.

**DEPTH (projet complet) :** nombre minimum de quatre ADR dans `ADR/`. Les décisions latérales couvrent notamment données, frontières de module, stratégie de tests, choix async, sécurité et observabilité. Un même document peut relier des décisions si les conséquences restent distinctes et explicites. Template canonique : `../97-templates/03-ADR_TEMPLATE.md`.

## SPEC_DRIFT_MODE

default: off
activation: `SPEC_DRIFT_MODE=on`
triggers: voir `05-SPEC-DRIFT-TRIGGERS.md` (obligatoire, 3 déclencheurs J+1/J+3/J+5)

Si activé, `08-POSTMORTEM.md` doit contenir la section `## Comment j'ai encaissé le drift`.

## Security Gate

**CORE :** valider les entrées des opérations, empêcher le double comptage par rejeu, limiter ce qu'un worker peut modifier et conserver une preuve de test de ces contrôles.

**DEPTH :** le drill complet ci-dessous, y compris analyse de dépendances et modélisation STRIDE. Ne présente pas le slice CORE comme une évaluation exhaustive de sécurité.

Bloc obligatoire en DEPTH (drill `node learner-verifier.js`, auto-vérification écrite par toi) :

- **Entrées validées** : chaque entrée externe passe par un schéma explicite (Zod, manuel documenté).
- **Secrets hors code** : jamais commités ; lus depuis env, documentés dans `SECURITY.md`.
- **Dépendances scannées** : `npm audit` (ou équivalent), snapshot copié dans `SECURITY.md`.
- **Surface d'exposition** : listée dans `SECURITY.md` (ports, endpoints, fichiers lus/écrits).

Absence de `SECURITY.md` = release refusée.

## Security Gate DEPTH : modélisation de menace STRIDE

Pour le projet complet, `SECURITY.md` doit inclure une modélisation STRIDE (Spoofing,
Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege) avec au
moins un scénario par catégorie.

## TDD JOURNAL

Section obligatoire : `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente`.
Force l'introspection sur le lien code testable / refactoring.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
