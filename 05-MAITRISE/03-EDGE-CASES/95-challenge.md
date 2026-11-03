---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, transmission]
anti_recipe_key: decision_organisationnelle+transmission
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Challenge : `03-EDGE-CASES`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Edge Cases)](09-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 05-MAITRISE/03-EDGE-CASES](97-EXO-VERIFICATION.md)
- [SPEC_DRIFT_DRILL : 45 min](10-SPEC_DRIFT_DRILL.md)
- [Drill : spec floue + spec qui dérive (combo)](11-SPEC_FLOU_DRIFT_COMBO_DRILL.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Barème autonome : Edge cases (20 points)

- **Entrées hostiles (4 pts)** : null/undefined/NaN, coercions et bornes couvertes par des tests.
- **Numérique (4 pts)** : précision flottante, arrondis et comparaison expliqués selon le domaine.
- **Concurrence (4 pts)** : race condition reproduite de façon déterministe et cause isolée.
- **Contrat (4 pts)** : spécification floue/dérivée transformée en critères testables et contre-exemples.
- **Diagnostic (4 pts)** : hypothèse, reproduction, correction minimale et test de non-régression sont remis.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : corriger le symptôme sans isoler la condition de course ou modifier le contrat sans décision.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.
