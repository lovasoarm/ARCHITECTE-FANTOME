---
stability: intemporel
acte: appliquer
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Prison Break :** Scofield modifie son plan alors qu’il est déjà dans le tunnel. Le client offline fait pareil : il doit agir avec un bout de vérité, puis réconcilier le reste plus tard.

# Offline, cache et synchronisation

<!-- AF-DIAGRAM:offline_sync -->

```text
text
        Local changes
Client ───────────────► Local store
  ▲                        │
  │ sync                   │ reconnect
  └────────────── Server ◄─┘
                    │
                    ▼
                conflicts
```

Un système offline conserve des changements locaux puis négocie leur synchronisation et leurs conflits au retour du réseau.

Décide explicitement :

- ce qui peut être obsolète ;
- ce qui ne peut jamais l’être ;
- qui gagne en cas de conflit ;
- combien de temps un cache est acceptable ;
- comment une action est idempotente ;
- comment l’utilisateur comprend qu’il regarde une donnée temporaire.

## Le piège

« Offline-first » ne signifie pas « on stocke tout ». Cela signifie que le système possède un comportement défini quand le réseau n’est plus disponible.

## Exercice

Simule : écriture locale → perte réseau → modification concurrente serveur → reconnexion. Tu dois produire le protocole de résolution, pas seulement le code.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
