---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L9
perturbation_modes: [changement_echelle, solution_concurrente]
anti_recipe_key: changement_echelle+solution_concurrente
transfer_distance: medium
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# La revue de code à trois niveaux

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

Temps de lecture ~8 min

## 1) LES TROIS NIVEAUX, ANNONCÉS DANS CHAQUE COMMENTAIRE

| Préfixe            | Sens                                                  | Le lecteur doit           |
| ------------------ | ----------------------------------------------------- | ------------------------- |
| `[bloquant]`       | correction, sécurité, contrat cassé, perte de données | corriger avant fusion     |
| `[recommandation]` | lisibilité, structure, dette évitable                 | décider, et répondre      |
| `[goût]`           | préférence personnelle, aucune obligation             | ignorer sans se justifier |

Une revue sans préfixe force le lecteur à deviner l'importance : il traite tout comme bloquant, ou
rien. Les deux sont mauvais.

## 2) LE RATIO SAIN

Au maximum trois `[bloquant]` par revue. Au-delà, le problème n'est pas le code : c'est le cadrage en
amont, et c'est ça qu'il faut écrire, pas 14 commentaires.

## 3) LA FORME D'UN BON COMMENTAIRE BLOQUANT

Observation → conséquence concrète → proposition → question ouverte.

```txt
[bloquant] `parseInt(x)` sans base : "08" devient 8 sur certains moteurs anciens, 0 sur d'autres.
Conséquence : un identifiant sur deux mal résolu en production.
Proposition : `Number.parseInt(x, 10)` + un cas de test avec "08".
Question : y a-t-il un endroit où l'entrée est déjà normalisée en amont ?
```

## 4) CE QU'ON NE FAIT JAMAIS

Réécrire le code de l'autre dans le commentaire sans expliquer. Ironiser. Poser une question dont on
connaît la réponse pour humilier. Bloquer sur du goût.

## 5) VARIANTE SOLO (obligatoire ici)

Choisis une _pull request_ ouverte sur un dépôt open source actif. Écris la revue complète, en
français ou en anglais, avec les trois niveaux. Publie-la. Note l'URL et le **SHA complet** du commit
audité : c'est la preuve S5, elle doit rester consultable.

## Exercice (25 min)

Fais-le. Une revue, trois niveaux, maximum trois bloquants, publiée.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
