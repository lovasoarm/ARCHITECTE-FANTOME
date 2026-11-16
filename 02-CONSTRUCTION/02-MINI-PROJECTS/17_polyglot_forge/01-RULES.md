---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [temps_limite, transmission]
anti_recipe_key: temps_limite+transmission
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# RULES : 17_polyglot_forge

Temps de lecture ~2 min

Règles minimales de release. Un projet qui échoue une de ces règles est marqué
INCOMPLET par un critere binaire ecrit dans ton `02-TDD-JOURNAL.md`.

## ADR_MINIMUM : 1 décision(s) indépendantes

Nombre minimum de décisions architecturales documentées dans `ADR/` : **1**.

Les décisions obligatoires à couvrir sont :

1. Sémantique de l'event loop et ordre d'exécution.

Un ADR doit contenir contexte, contraintes, options crédibles, décision, conséquences, risques résiduels et signal de révision. Ne multiplie pas les fichiers pour une même décision ; un ADR supplémentaire n'est justifié que par une décision indépendante qui change une frontière, un contrat, un attribut de qualité, un risque ou un arbitrage structurant. Une correction éditoriale ou un changement mineur ne crée pas automatiquement un ADR.

Les ADR de contexte fournis par AF ne sont pas automatiquement des preuves personnelles : l'apprenant doit vérifier, adopter ou réviser chaque décision et laisser une trace de son propre raisonnement.

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

## TDD JOURNAL

Section obligatoire : `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente`.
Force l'introspection sur le lien code testable / refactoring.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
