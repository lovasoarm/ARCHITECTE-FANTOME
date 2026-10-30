---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_organisationnelle]
anti_recipe_key: changement_contexte+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# Challenge : `17-OOP-JS`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-this_keyword_rules_minimini_projet.md](50-this_keyword_rules_minimini_projet.md)
- [EXO LECTURE : 15-25 minutes (OOP en JS)](12-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 02-CONSTRUCTION/17-OOP-JS](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Barème autonome : POO JavaScript (20 points)

- **Modèle objet (4 pts)** : prototype, propriété, lookup et `this` expliqués avec un cas qui échoue.
- **Encapsulation (4 pts)** : invariant protégé et mutations autorisées contrôlées.
- **Héritage/composition (4 pts)** : choix motivé par substituabilité et variation, pas par hiérarchie artificielle.
- **Comportement (4 pts)** : tests couvrent méthodes, contexte d'appel, overrides et cas limites.
- **Transfert (4 pts)** : le même modèle est expliqué en classes et en prototypes, avec limites.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : dépendre d'un `this` implicite sans contrat d'appel ou casser la substituabilité attendue.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.
