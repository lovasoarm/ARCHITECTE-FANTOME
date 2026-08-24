---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: medium
assessment_role: project_mastery
---

> ### SCÈNE CRAZYDEVS : Prison Break
>
> Le système est maintenant ton Fox River : le mécanisme semble tranquille jusqu'au moment où une petite incohérence fait toute la différence. Ton job n'est pas de réciter la règle : **trouve l'ouverture, mesure ce qui casse, puis ferme-la sans tricher**.
>
> **Règle de scène :** l'analogie sert le mécanisme ; dès qu'elle simplifie trop, reviens au modèle technique exact.

# RULES : 05_prison_break_api

Temps de lecture ~2 min

Règles minimales de release. Un projet qui échoue une de ces règles est marqué
INCOMPLET par un critere binaire ecrit dans ton `02-TDD-JOURNAL.md`.

## ADR_MINIMUM

Nombre minimum d'ADR à livrer dans `ADR/` : **3**

Un ADR unique ("choix d'architecture") ne suffit pas. Décisions latérales attendues :
données, frontières de module, stratégie de tests, choix async, sécurité, observabilité.
Template canonique : `../97-templates/03-ADR_TEMPLATE.md`.

## SPEC_DRIFT_MODE

default: off
activation: `SPEC_DRIFT_MODE=on`
triggers: voir `05-SPEC-DRIFT-TRIGGERS.md` (obligatoire, 3 déclencheurs J+1/J+3/J+5)

Si activé, `08-POSTMORTEM.md` doit contenir la section `## Comment j'ai encaissé le drift`.

## Security Gate

Bloc obligatoire (drill `node learner-verifier.js` (auto-verif ecrite par toi)) :

- **Entrées validées** : chaque entrée externe passe par un schéma explicite (Zod, manuel documenté).
- **Secrets hors code** : jamais commités ; lus depuis env, documentés dans `SECURITY.md`.
- **Dépendances scannées** : `npm audit` (ou équivalent), snapshot copié dans `SECURITY.md`.
- **Surface d'exposition** : listée dans `SECURITY.md` (ports, endpoints, fichiers lus/écrits).

Absence de `SECURITY.md` = release refusée.

## Security Gate : modélisation menace STRIDE

Ce projet ayant une surface d'exposition structurelle, `SECURITY.md` doit inclure
une modélisation STRIDE (Spoofing, Tampering, Repudiation, Information disclosure,
DoS, Elevation of privilege) avec au moins un scénario par catégorie.

## TDD JOURNAL

Section obligatoire : `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente`.
Force l'introspection sur le lien code testable / refactoring.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
