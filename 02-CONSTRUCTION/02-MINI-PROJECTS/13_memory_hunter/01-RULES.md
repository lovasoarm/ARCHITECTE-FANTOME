---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# RULES : 13_memory_hunter

Temps de lecture ~2 min

Règles minimales de release. Un projet qui échoue une de ces règles est marqué
INCOMPLET par un critere binaire ecrit dans ton `02-TDD-JOURNAL.md`.

## ADR_MINIMUM

Nombre minimum d'ADR distincts, rédigés par l'apprenant et livrés dans `ADR/` : **4**

Les deux fichiers `ADR-001_decision.md` et `ADR-002_decision.md` fournis sont des prompts, pas des décisions déjà prises. Leur simple présence ne compte pas ; chacun peut compter si tu le complètes par une décision réelle et distincte. Quatre décisions réelles et distinctes sont attendues au total, choisies parmi les sujets pertinents : données, frontières de module, stratégie de tests/mesures, choix async, sécurité ou observabilité. Ne fractionne pas artificiellement une décision pour atteindre le nombre.
Template canonique : `../97-templates/03-ADR_TEMPLATE.md`.

## SPEC_DRIFT_MODE

default: off
activation: `SPEC_DRIFT_MODE=on`
triggers: voir `05-SPEC-DRIFT-TRIGGERS.md` (obligatoire, 3 déclencheurs J+1/J+3/J+5)

Si activé, `08-POSTMORTEM.md` doit contenir la section `## Comment j'ai encaissé le drift`.

## Security Gate

Bloc obligatoire : écris dans `tests/` une auto-vérification adaptée au scénario, puis documente dans le README la commande exacte que tu as réellement exécutée. Exemple possible : `node tests/learner-verifier.js` (fichier à créer par toi, non fourni).

- **Entrées validées** : chaque entrée externe passe par un schéma explicite (Zod, manuel documenté).
- **Secrets hors code** : jamais commités ; lus depuis env, documentés dans `SECURITY.md`.
- **Dépendances scannées** : `npm audit` (ou équivalent), snapshot copié dans `SECURITY.md`.
- **Surface d'exposition** : listée dans `SECURITY.md` (ports, endpoints, fichiers lus/écrits).

Absence de `SECURITY.md` = release refusée.

## TDD JOURNAL

Section obligatoire : `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente`.
Force l'introspection sur le lien code testable / refactoring.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
