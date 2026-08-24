---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, decision_organisationnelle]
anti_recipe_key: changement_echelle+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Kamehameha à charge :** la puissance n'arrive pas “quand tu as appelé la fonction”, elle arrive quand le runtime décide que la file peut avancer. Ici, le vrai boss est le timing, pas la syntaxe.

## TYPE

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

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Les callbacks sont partout en React : `onClick`, `onChange`, callbacks d'observers. Mal nommés ou imbriqués, ils rendent un composant illisible.

## OBJECTIF

Ta carte projet est devenue réutilisable.

## APPLICATION

- Dans ta rangée de projets, remplace les handlers anonymes en ligne par des fonctions nommées déclarées dans le composant.
- Passe un callback `onSelect` en prop de `ProjectCard` au lieu de gérer l'ouverture de la modale dans la carte.
- Vérifie que `ProjectCard` ne connaît plus la modale.

## Critère de réussite

- [ ] Dans ta rangée de projets, remplace les handlers anonymes en ligne par des fonctions nommées déclarées dans le composant.
- [ ] Passe un callback `onSelect` en prop de `ProjectCard` au lieu de gérer l'ouverture de la modale dans la carte.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi la carte ne doit-elle pas savoir ce qui se passe quand on clique dessus ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta carte projet est devenue réutilisable.

Inversion de contrôle réussie : la carte est utilisable dans n'importe quelle rangée. Commit.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
