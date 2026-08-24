---
stability: intemporel
acte: comprendre
cognitive_level: L8
perturbation_modes: [changement_contexte, regression]
anti_recipe_key: changement_contexte+regression
transfer_distance: high
assessment_role: transfer_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Drill : Python

Temps de lecture ~5 min

Objectif P6 : montrer que ta méthode ce parcours survit au changement de langage.

```python
def make_counters(n):
  return [lambda: i for i in range(n)]

counters = make_counters(3)
print([c() for c in counters])  # ?
```

- Prédis la sortie **avant** de lancer.
- Explique pourquoi, en faisant appel à ta connaissance des closures JS (`var` vs `let`).
- Corrige pour obtenir `[0, 1, 2]`. Pas de bibliothèque externe.

<details>
<summary>Piste (ne clique qu'après avoir essayé)</summary>

Python capture par référence de nom, comme JS `var`. Utilise un default arg pour figer la valeur.

</details>

## Debrief à écrire (obligatoire)

- Qu'est-ce qui a été **identique** à JS ?
- Qu'est-ce qui a été **différent** ?
- Qu'est-ce que tu retiens pour la prochaine fois ?

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
