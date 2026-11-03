---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: high
assessment_role: instructional_checkpoint
---

# Mise en pratique : CONCEVOIR POUR CE QUI VA CHANGER

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## Support de l’exercice

Utilise le [portfolio fictif de Noa](EXERCICE-PORTFOLIO-FICTIF.md). Le cas est indépendant de ton projet personnel ; travaille dans un fichier local, sur papier ou dans `scratch/problem-solving/`. Aucun dépôt Git ni site réel n’est requis.

## TYPE

Exercice de changement local

## Niveau

[OK] Avancé

## CONTEXTE

Le portfolio fictif va recevoir un septième projet et une nouvelle présentation. Concevoir pour le changement, c'est isoler ce qui bouge.

## OBJECTIF

Ajouter un projet coûte une seule ligne.

## APPLICATION

- Dans une fixture jetable `scratch/problem-solving/projects.js`, ajoute un septième projet fictif et note le temps nécessaire. Si tu ne peux pas exécuter le fichier, fais le même exercice sur papier et marque le résultat `SIMULATION`.
- Note chaque fichier que tu as dû toucher.
- Si tu en as touché plus de deux, refactore pour que l'ajout ne coûte qu'une entrée de données.
- Supprime ensuite le projet fictif de la fixture locale ; ne touche à aucun projet personnel.

## Critère de réussite

- [ ] Dans une fixture jetable `scratch/problem-solving/projects.js`, ajoute un septième projet fictif et note le temps nécessaire. Si tu ne peux pas exécuter le fichier, fais le même exercice sur papier et marque le résultat `SIMULATION`.
- [ ] Note chaque fichier que tu as dû toucher.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quels fichiers doivent rester intouchés lors de l'ajout d'un projet, et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ajouter un projet coûte une seule ligne.

Tu as observé le coût du changement dans cette petite fixture. Conserve `06-changement.md` et précise si le résultat est `LAB` ou `SIMULATION`. N'appelle pas ce résultat une preuve de production et ne fais aucun commit Git obligatoire.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.

## Pont Kintana différé : mesurer le coût d'un changement

**Statut : différé et non bloquant pour le Socle.** Après l'étude des API, de la persistance et des tests, tu pourras examiner l'ajout d'un nouvel état ou d'une nouvelle règle au flux Kintana, puis mesurer les composants touchés. Pour le challenge actuel, utilise la fixture locale du portfolio fictif de Noa ; aucun changement backend Kintana n'est attendu.
