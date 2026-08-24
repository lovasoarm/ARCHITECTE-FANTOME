---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L9
perturbation_modes: [preuve_partielle, regression]
anti_recipe_key: preuve_partielle+regression
transfer_distance: low
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : coach du village :** tu n'as pas 40 matchs à préparer, tu en as trois cette semaine. La question n'est donc pas “que peut-on construire ?” mais “quel pari vaut le terrain maintenant ?”.

# Expliquer à trois publics

<!-- AF-DIAGRAM:roi -->

```text
text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

Temps de lecture ~7 min. Rendu : trois textes.

Sujet imposé : **la décision technique la plus coûteuse de ton fil rouge**.

## 1) Au junior : 150 mots, un exemple, un contre-exemple

Il doit savoir quand appliquer et quand ne pas appliquer. Une analogie maximum.

## 2) Au pair : 200 mots, un compromis, un chiffre

Il doit pouvoir te contredire : donne-lui la mesure, l'option écartée et pourquoi.

## 3) À la direction : 120 mots, zéro jargon non défini, un chiffre, une contrepartie

Structure : situation → décision → coût → effet mesurable → ce qu'on perd.

## Le test qui tranche

Lis le texte « direction » à voix haute à quelqu'un qui ne code pas. S'il peut reformuler la décision
et la contrepartie de mémoire, c'est bon. Sinon, réécris : le problème est ton texte, jamais lui.

## Erreurs fréquentes

- Le texte direction n'est que le texte pair avec les mots techniques retirés : il faut **changer
  l'objet**, pas le vocabulaire. La direction décide d'un coût, pas d'une implémentation.
- Aucun chiffre : la crédibilité tombe à zéro en une phrase.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
