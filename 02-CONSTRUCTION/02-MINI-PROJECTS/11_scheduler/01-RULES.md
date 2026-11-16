---
stability: intemporel
acte: comprendre
cognitive_level: L6
perturbation_modes: [regression, solution_concurrente]
anti_recipe_key: regression+solution_concurrente
transfer_distance: medium
assessment_role: project_mastery
---

# RULES : 11_scheduler

Règles minimales de validation. Un projet qui échoue une règle doit rester marqué **INCOMPLET** avec un critère observable écrit dans le journal TDD.

## ADR_MINIMUM

Nombre minimum d'ADR réellement produits dans `ADR/` : **3**. Les deux documents de consigne fournis ne comptent pas comme décisions rédigées par l'apprenant.

Les trois décisions doivent être distinctes. Couvrir les sujets pertinents au projet (files et ordonnanceur, concurrence et ressources, erreurs et annulation, stratégie de test). Ne fabrique pas une décision non prise pour atteindre le nombre.

Gabarit : [03-ADR_TEMPLATE.md](../97-templates/03-ADR_TEMPLATE.md).

## SPEC_DRIFT_MODE

default: off
activation: `SPEC_DRIFT_MODE=on`
triggers: voir `05-SPEC-DRIFT-TRIGGERS.md`.

Si activé, `08-POSTMORTEM.md` doit contenir la section `## Comment j'ai encaissé le drift` et distinguer les déclencheurs réellement vécus des scénarios seulement proposés.

## Security Gate

La gate exécutable est limitée au périmètre de cette bibliothèque pédagogique : validation des arguments, borne de concurrence, propagation des erreurs, comportement d'annulation et absence de lancement de tâches après erreur/abort. Le POSTMORTEM résume les risques réellement pertinents et renvoie vers `SECURITY.md`. OWASP Top 10:2025 sert de référentiel de classement lorsque cela aide le diagnostic ; il n'impose pas de traiter artificiellement les dix catégories. Chaque contrôle est marqué `PASSÉ`, `ÉCHOUÉ`, `NON TESTÉ` ou `NON APPLICABLE` (avec justification).

La procédure et les preuves attendues sont définies dans le document final `SECURITY.md` et `04-SECURITY-GATE.md`. N'ajoute pas artificiellement de serveur, de port, de secrets ou de dépendance tierce ; ces surfaces ne font pas partie du livrable de base.

## TDD JOURNAL

Le journal doit contenir la section `## Ce qui aurait été impossible à tester si j'avais gardé la version précédente` et relier au moins un refactor à un comportement nouvellement testable.

## CHECKPOINT DE PROFONDEUR : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, taille des données, concurrence ou règle d'annulation). Prédit deux effets observables **avant** toute correction. Explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par une mauvaise intuition plausible, la mesure qui permettrait de la réfuter et le signal qui te ferait changer de modèle.
