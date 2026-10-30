---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [regression, transmission]
anti_recipe_key: regression+transmission
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : jauge de chakra :** optimiser sans mesurer, c'est demander à Naruto de vider son chakra sans regarder la jauge. D'abord la mesure, ensuite le coup de génie ; sinon tu optimises peut-être le mauvais ralentissement.

# Challenge : `05-MEMORY-PERFORMANCE`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-profiling_basics_minimini_projet.md](04_profiling/50-profiling_basics_minimini_projet.md)
- [EXO LECTURE : 15-25 minutes (Memoire & Perf)](05A-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 02-CONSTRUCTION/05-MEMORY-PERFORMANCE](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE](97-EXO-VERIFICATION.md)

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

## Barème autonome : Mémoire et performance (20 points)

- **Mesure initiale (4 pts)** : baseline reproductible avec scénario, volume, environnement et métrique clairement définis.
- **Diagnostic mémoire (4 pts)** : heap snapshot/retainers ou preuve équivalente identifie la référence qui garde l'objet vivant.
- **Complexité et profilage (4 pts)** : hypothèse algorithmique reliée aux mesures CPU/mémoire, sans conclure à partir d'une seule exécution.
- **Correction (4 pts)** : patch ciblé, test de non-régression et mesure avant/après sur le même protocole.
- **Compromis et transfert (4 pts)** : coût mémoire/latence/complexité opérationnelle comparé et cas où l'optimisation ne convient pas expliqué.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : annoncer un gain sans protocole comparable ou masquer une régression fonctionnelle.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.
