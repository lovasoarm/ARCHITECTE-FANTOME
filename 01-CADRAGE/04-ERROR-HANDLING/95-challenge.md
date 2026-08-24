---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L3
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# Challenge : `04-ERROR-HANDLING`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-try_catch_basics_minimini_projet.md](50-try_catch_basics_minimini_projet.md)
- [51-custom_errors_minimini_projet.md](51-custom_errors_minimini_projet.md)
- [52-error_propagation_minimini_projet.md](52-error_propagation_minimini_projet.md)
- [53-async_error_traps_minimini_projet.md](53-async_error_traps_minimini_projet.md)
- [54-error_strategy_minimini_projet.md](54-error_strategy_minimini_projet.md)
- [EXO LECTURE : 15-25 minutes (Error Handling)](07-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 01-CADRAGE/04-ERROR-HANDLING](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 01-CADRAGE/04-ERROR-HANDLING](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
