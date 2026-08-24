---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [constraints_injectees, preuve_partielle]
anti_recipe_key: constraints_injectees+preuve_partielle
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# ARCHITECTURE & HUMAN BIASES : quand les biais deviennent des systèmes

Une architecture n'est pas seulement le résultat de contraintes techniques. Elle porte les peurs, incitations et habitudes de ceux qui la conçoivent.

## Carte de lecture

| Signal humain       | Risque architectural possible | Indice à chercher                | Garde-fou                 |
| ------------------- | ----------------------------- | -------------------------------- | ------------------------- |
| peur du changement  | système figé                  | migrations repoussées sans seuil | fenêtre de réouverture    |
| culte de l'élégance | surarchitecture               | abstractions sans gain mesuré    | test de simplicité        |
| ego technique       | technologie irremplaçable     | dépendance à une personne        | documentation + transfert |
| urgence permanente  | optimisation du présent       | dette ignorée                    | budget de dette           |
| ownership flou      | service sans propriétaire     | incidents renvoyés ailleurs      | responsabilité explicite  |

## Épreuve

Sur ton fil rouge, identifie un mécanisme humain qui a laissé une trace dans l'architecture. Produis :

1. l'observation ;
2. l'hypothèse sur l'incitation ou le biais ;
3. l'effet technique ;
4. une contre-mesure structurelle qui fonctionne même lorsque tu n'es pas là.

Pas de diagnostic psychologique des personnes. On analyse des comportements observables et leurs effets sur le système.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
