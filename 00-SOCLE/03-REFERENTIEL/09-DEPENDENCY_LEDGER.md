---
stability: stable
cognitive_level: L3
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# DÉPENDANCES D’APPRENTISSAGE

Ce fichier sert à répondre à une seule question : **« qu’est-ce que je dois vraiment savoir avant d’attaquer ce sujet ? »**

| Sujet        | Solide avant d’entrer                 | Si ce n’est pas solide                          |
| ------------ | ------------------------------------- | ----------------------------------------------- |
| Asynchrone   | fonctions, portée, valeurs et erreurs | revenir aux fondamentaux + refaire une pratique |
| Debugging    | exécution, exceptions, observation    | refaire un exercice de reproduction             |
| Testing      | fonctions, contrats, erreurs          | revoir le comportement attendu avant l’outil    |
| Performance  | données, boucles, mémoire             | refaire les exercices coût/mesure               |
| Architecture | modules, contrats, tests              | reprendre les frontières avant les patterns     |
| API          | HTTP, JSON, erreurs                   | revoir Web Concepts                             |
| Sécurité     | flux, données, erreurs                | reprendre la modélisation de menace             |
| Cloud        | coût, trafic, disponibilité           | revoir les mesures avant les services           |
| SLO          | métriques, incidents, disponibilité   | reprendre Observability                         |
| Staff        | toutes les preuves précédentes        | reprendre la preuve la plus faible              |

Ce tableau n’est pas une liste à réciter. C’est une rampe de secours.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
