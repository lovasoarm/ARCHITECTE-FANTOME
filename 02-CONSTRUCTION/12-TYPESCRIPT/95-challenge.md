---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [transmission, changement_echelle]
anti_recipe_key: transmission+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# Challenge : `12-TYPESCRIPT`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-types_and_interfaces_minimini_projet.md](01_ts_basics/50-types_and_interfaces_minimini_projet.md)
- [51-functions_typed_minimini_projet.md](01_ts_basics/51-functions_typed_minimini_projet.md)
- [52-classes_typed_minimini_projet.md](01_ts_basics/52-classes_typed_minimini_projet.md)
- [50-generics_minimini_projet.md](02_ts_intermediate/50-generics_minimini_projet.md)
- [51-utility_types_minimini_projet.md](02_ts_intermediate/51-utility_types_minimini_projet.md)
- [52-union_intersection_minimini_projet.md](02_ts_intermediate/52-union_intersection_minimini_projet.md)
- [53-type_guards_minimini_projet.md](02_ts_intermediate/53-type_guards_minimini_projet.md)
- [50-conditional_types_minimini_projet.md](03_ts_advanced/50-conditional_types_minimini_projet.md)
- [51-mapped_types_minimini_projet.md](03_ts_advanced/51-mapped_types_minimini_projet.md)
- [52-ts_in_real_project_minimini_projet.md](03_ts_advanced/52-ts_in_real_project_minimini_projet.md)
- [50-ts_compiler_config_minimini_projet.md](04_typescript_tooling/50-ts_compiler_config_minimini_projet.md)
- [EXO LECTURE : 15-25 minutes (TypeScript)](02A-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 02-CONSTRUCTION/12-TYPESCRIPT](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/12-TYPESCRIPT](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
