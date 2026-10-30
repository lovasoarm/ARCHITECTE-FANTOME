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

## Exercice guidé : la même décision devant trois publics

**Contexte.** L'équipe propose de remplacer une requête synchrone par une file asynchrone pour absorber un pic. Le changement augmente la latence de confirmation, ajoute un worker et un nouveau mode d'échec.

**Production attendue.** Écris trois explications de 120 à 180 mots : (1) développeur qui doit implémenter et opérer ; (2) responsable produit qui doit arbitrer UX/délai ; (3) direction qui doit accepter coût/risque. Les trois explications doivent conserver les mêmes faits, hypothèses, limites et décision ; seul le niveau de détail change.

**Vérification autonome.** Note chaque public sur 0–2 pour exactitude, clarté, décision/action attendue, limites et cohérence factuelle. Une explication qui promet une fiabilité absolue ou cache la nouvelle latence échoue, même si elle est convaincante. Seuil : 8/10 par public, aucun zéro en exactitude.

**Transfert.** Réutilise ce format pour un incident, une dette technique ou un désaccord d'architecture ; consigne les questions non résolues et le propriétaire de la décision.
