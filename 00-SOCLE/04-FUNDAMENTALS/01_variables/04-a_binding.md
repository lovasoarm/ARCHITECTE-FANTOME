---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# 01a : Binding : nommer, c'est déjà décider

Temps de lecture ~5 min

Avant de lancer un Rasengan, faut savoir canaliser ton chakra. Une variable, c'est pas une boîte : c'est un **nom collé sur une valeur**. Ce collage, c'est le _binding_.

## L'idée

```text
let ninja = "Naruto"
  ^^^^^  ^^^^^^^^
  nom   valeur en mémoire
```

Le `=` n'est pas "égal". C'est "colle ce nom à cette valeur". Retiens ça, tu viens de sauver 2 ans de bugs.

## Trois moments qui comptent

1. **Déclaration** : tu réserves le nom (`let x`).
2. **Assignation** : tu colles une valeur (`x = 42`).
3. **Lecture** : tu demandes la valeur derrière le nom (`console.log(x)`).

## Risque

Réutiliser un nom qui existe déjà dans un scope parent. Tu crois modifier, tu shadow. On y revient dans `01b`.

## Ce que l'analogie cache

Le chakra Naruto est fini. En JS, la valeur peut être partagée par 10 noms sans se "diviser". Le binding ne consomme rien.

## Mission (5 min)

Écris trois lignes qui déclarent, assignent, puis relisent un nom. Sans copier-coller. Fais-le maintenant.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
