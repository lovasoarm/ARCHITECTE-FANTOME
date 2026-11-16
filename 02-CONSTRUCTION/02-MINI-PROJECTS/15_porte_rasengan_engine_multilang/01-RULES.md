---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: medium
assessment_role: project_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# RULES : 15_porte_rasengan_engine_multilang

Temps de lecture ~2 min

Règles minimales de release. Un projet qui échoue une de ces règles est marqué
INCOMPLET par un critere binaire ecrit dans ton `02-TDD-JOURNAL.md`.

## ADR_MINIMUM : 2 décision(s) indépendantes

Nombre minimum de décisions architecturales documentées dans `ADR/` : **2**.

Les décisions obligatoires à couvrir sont :

1. Choix du langage cible.
2. Comparaison des modèles, conventions et conséquences du portage.

Un ADR doit contenir contexte, contraintes, options crédibles, décision, conséquences, risques résiduels et signal de révision. Ne multiplie pas les fichiers pour une même décision ; un ADR supplémentaire n'est justifié que par une décision indépendante qui change une frontière, un contrat, un attribut de qualité, un risque ou un arbitrage structurant. Une correction éditoriale ou un changement mineur ne crée pas automatiquement un ADR.

Les ADR de contexte fournis par AF ne sont pas automatiquement des preuves personnelles : l'apprenant doit vérifier, adopter ou réviser chaque décision et laisser une trace de son propre raisonnement.

Template canonique : `../97-templates/03-ADR_TEMPLATE.md`.

## SPEC_DRIFT_MODE

default: off
activation: `SPEC_DRIFT_MODE=on`
triggers: voir `05-SPEC-DRIFT-TRIGGERS.md` (obligatoire, 3 déclencheurs J+1/J+3/J+5)

Si activé, `08-POSTMORTEM.md` doit contenir la section `## Comment j'ai encaissé le drift`.

## Security Gate

Bloc obligatoire : consigne une grille de vérification locale dans `SECURITY.md` et apporte une preuve par contrôle. Aucun script `learner-verifier.js` n’est fourni ou supposé.

- **Entrées validées** : chaque entrée externe passe par un schéma explicite (Zod, manuel documenté).
- **Secrets hors code** : jamais commités ; lus depuis env, documentés dans le document final `SECURITY.md` (produit depuis le modèle `03-SECURITY.md`).
- **Dépendances scannées** : `npm audit` (ou équivalent), snapshot copié dans `SECURITY.md`.
- **Surface d'exposition** : listée dans `SECURITY.md` (ports, endpoints, fichiers lus/écrits).

Absence de `SECURITY.md` final complété = release refusée. `03-SECURITY.md` reste le modèle AF ; ne maintiens pas deux versions complétées.

## TDD JOURNAL

Section obligatoire : `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente`.
Force l'introspection sur le lien code testable / refactoring.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
