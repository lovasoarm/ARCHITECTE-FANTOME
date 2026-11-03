---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [preuve_partielle, defaut_cache]
anti_recipe_key: preuve_partielle+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Challenge : `10-DESIGN-PATTERNS`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-factory_pattern_minimini_projet.md](01_creational/50-factory_pattern_minimini_projet.md)
- [51-singleton_pattern_minimini_projet.md](01_creational/51-singleton_pattern_minimini_projet.md)
- [52-builder_pattern_minimini_projet.md](01_creational/52-builder_pattern_minimini_projet.md)
- [50-decorator_pattern_minimini_projet.md](02_structural/50-decorator_pattern_minimini_projet.md)
- [51-adapter_pattern_minimini_projet.md](02_structural/51-adapter_pattern_minimini_projet.md)
- [50-observer_pattern_minimini_projet.md](03_behavioral/50-observer_pattern_minimini_projet.md)
- [51-strategy_pattern_minimini_projet.md](03_behavioral/51-strategy_pattern_minimini_projet.md)
- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Design Patterns)](02A-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 02-CONSTRUCTION/10-DESIGN-PATTERNS](98-EXO-VERIFICATION.md)
- [EXO FRONTIÈRE : quel module aurait dû accueillir ce geste ?](03A-EXO_FRONTIERE.md)
- [EXO [IA MENTEUSE] : design_patterns (singleton qui fuit)](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

## Barème autonome : Design patterns (20 points)

- **Problème avant pattern (4 pts)** : pression de changement et variation réelle identifiées avant de nommer un pattern.
- **Structure et responsabilités (4 pts)** : participants, dépendances et flux d'appel représentés correctement.
- **Implémentation (4 pts)** : pattern appliqué sur un cas métier avec tests du comportement attendu.
- **Alternative (4 pts)** : solution plus simple comparée et coût d'abstraction explicité.
- **Évolution (4 pts)** : une nouvelle variation est ajoutée sans changement diffus ni couplage caché.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : ajouter un pattern uniquement pour respecter un catalogue ou multiplier les couches sans besoin.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.
