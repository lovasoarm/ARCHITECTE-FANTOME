---
stability: intemporel
acte: évaluer
route: complete
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, preuve_partielle]
anti_recipe_key: decision_organisationnelle+preuve_partielle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Auto-test d'entrée : `08-DATA-SPELLS`

Temps de lecture ~2 min

Acte attendu : évaluer. Trois minutes, seul, sans ouvrir le module.

Ce diagnostic vérifie les notions d'interface réutilisées pour modéliser les données ; il ne demande aucune connaissance préalable de SQL, de transaction ou d'ORM. Ces notions sont introduites progressivement dans le module avant leur réutilisation.

## Repères utiles

Le module `02-CONSTRUCTION/01-USER-WIZARD` (ou une expérience équivalente) aide à comprendre les états d'une interface et les effets d'une création répétée. Si tu ne l'as pas terminé, consulte son grimoire au besoin. Tu peux commencer Data Spells sans savoir écrire une jointure SQL ni une transaction : la syntaxe relationnelle de base est expliquée dans les leçons de ce module.

## Verdict

- **Les trois réponses sont solides** → ouvre [`README.md`](README.md).
- **Une réponse hésite** → tu peux quand même commencer par `01-01-why-this-level.md` et `02-model-the-domain.md`. Revois le grimoire de User Wizard si les états d’interface ou l’idempotence sont flous ; apprends la syntaxe SQL dans les exemples avant de passer aux migrations et aux transactions. Le diagnostic ne bloque pas l’accès.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
