---
stability: intemporel
acte: pratiquer
route: complete
cognitive_level: L4
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : coupe du monde :** un bon algorithme ne gagne pas parce qu'il connaît un mouvement célèbre ; il gagne parce qu'il réduit le nombre d'actions nécessaires quand le terrain explose.

# Challenge : `07-ALGORITHMS`

Temps de lecture ~2 min

Acte attendu : pratiquer. Ce fichier ne contient pas de nouvel énoncé : il **promeut** les
épreuves déjà écrites dans ce module et fixe ce qui les valide.

## Les épreuves de ce module, dans l'ordre

- [50-sorting_race_minimini_projet.md](01_sorting/50-sorting_race_minimini_projet.md)
- [50-linear_binary_minimini_projet.md](02_searching/50-linear_binary_minimini_projet.md)
- [SEARCH CHALLENGES : LES VARIANTES QUI PIÈGENT](02_searching/95-challenge.md)
- [EXO LECTURE : ~20 minutes : un cycle (Algorithmes)](02A-EXO_LECTURE.md)
- [EXO [JEUNE IA] : 02-CONSTRUCTION/07-ALGORITHMS](98-EXO-VERIFICATION.md)
- [EXO IA MENTEUSE : module 02-CONSTRUCTION/07-ALGORITHMS](97-EXO-VERIFICATION.md)

## Ce qui valide le challenge (les quatre actes, aucun ne se saute)

- [ ] **Construire** : le livrable demandé existe dans ton dépôt de projet fil rouge, il tourne.
- [ ] **Expliquer** : tu décris en cinq lignes ce que tu as construit, sans jargon.
- [ ] **Justifier** : tu écris pourquoi cette solution et pas l'autre, avec le critère qui a tranché.
- [ ] **Défendre** : un contradicteur attaque le point faible, tu réponds par écrit.

Rien ne se coche sur une lecture. Reporte le résultat dans
[PROGRESSION.md](../../PROGRESSION.md).

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Barème autonome : Algorithmes (20 points)

- **Modélisation (4 pts)** : entrées, sorties, préconditions, invariants et cas limites sont écrits avant le code.
- **Exactitude (4 pts)** : tests couvrent entrée vide, doublons, valeurs extrêmes et cas adversarial.
- **Complexité (4 pts)** : borne temporelle et mémoire sont justifiées par le mécanisme.
- **Comparaison (4 pts)** : deux approches sont comparées sur les mêmes données et les mêmes conditions.
- **Choix terrain (4 pts)** : stabilité, mémoire, ordre, taille de données et lisibilité motivent le choix final.

**Seuil de réussite : 15/20**, avec au moins 2 points sur chaque critère. Échec critique : appliquer recherche binaire à une entrée non triée ou choisir un algorithme sans vérifier ses préconditions.

**Auto-correction différée :** attribue les points uniquement à partir des artefacts listés et des tests/observations attachés. Si un artefact manque, le critère vaut zéro ; ne compense pas un défaut de sécurité ou d'intégrité par une bonne documentation.
