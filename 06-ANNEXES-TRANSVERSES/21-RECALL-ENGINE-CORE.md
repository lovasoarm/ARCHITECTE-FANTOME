---
stability: intemporel
acte: pratique
noyau: oui
route_family: core
---

# 21 : RECALL ENGINE CORE

<!-- AF-DIAGRAM:recall -->

```text
text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

## But

Les fichiers `24_recall` existants restent inchangés. Ce protocole ajoute un rythme homogène au parcours CORE afin que la réussite ne dépende pas de la reconnaissance de formulations déjà vues.

## Rythme

Chaque compétence critique revient au minimum à :

```text
J0  → première production
J+1 → rappel sans notes
J+3 → nouveau contexte
J+7 → contre-exemple
J+14 → problème inversé
J+28 → défense de l'inverse
```

## Règle de correction

L'apprenant tente d'abord. La correction n'est consultée qu'après horodatage de la tentative.

## Types de rappel

### Reconstruction

« Explique le mécanisme sans utiliser le vocabulaire du cours. »

### Diagnostic

« Voici un système défaillant. Quel invariant soupçonnes-tu ? »

### Choix

« Deux solutions sont valides. Laquelle choisis-tu sous cette contrainte ? »

### Inversion

« Quand la bonne pratique habituelle devient-elle mauvaise ? »

### Transfert

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

« Même problème, autre stack, autre budget. »

### Enseignement

« Explique à un junior qui propose exactement l'erreur que tu faisais avant. »

## Score de maîtrise

```text
0 = reconnaissance seulement
1 = restitution
2 = application guidée
3 = diagnostic nouveau
4 = arbitrage
5 = transfert
6 = invalidation du modèle
```

Une note 8/10 à un quiz de mémorisation ne ferme jamais une compétence critique.

Une compétence critique est considérée **CORE pratiquement acquise** lorsque l'apprenant atteint au moins 4 à deux reprises, puis 5 dans un contexte non vu. Ce seuil L0–L6 est un seuil de pratique du sprint : il **ne remplace pas** les preuves D7/D8 exigées pour les compétences architecturales critiques et la synthèse Staff.
