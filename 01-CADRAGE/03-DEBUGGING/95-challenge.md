---
stability: intemporel
acte: pratiquer
route: survie
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# Challenge : `03-DEBUGGING`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-read_stack_trace_minimini_projet.md](50-read_stack_trace_minimini_projet.md)
- [51-debug_methodology_minimini_projet.md](51-debug_methodology_minimini_projet.md)
- [52-devtools_debugger_minimini_projet.md](52-devtools_debugger_minimini_projet.md)
- [53-repro_before_fix_minimini_projet.md](53-repro_before_fix_minimini_projet.md)
- [54-hypothesis_driven_debug_minimini_projet.md](54-hypothesis_driven_debug_minimini_projet.md)
- [55-blind_debug_minimini_projet.md](55-blind_debug_minimini_projet.md)
- [56-flaky_bugs_minimini_projet.md](56-flaky_bugs_minimini_projet.md)
- [EXO : Reproduction déterministe d'un bug flaky](09-exo_repro_deterministe.md)
- [EXO LECTURE : 15-25 minutes (Debugging)](14-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 01-CADRAGE/03-DEBUGGING](20-EXO-VERIFICATION-IA.md)
- [EXO : debugging a l'aveugle (Pierre 5, 11.5)](15-EXO_DEBUG_AVEUGLE.md)
- [EXO IA MENTEUSE : module 01-CADRAGE/03-DEBUGGING](17A-EXO_VERIFICATION.md)

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
