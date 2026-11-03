---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [fausse_piste, decision_organisationnelle]
anti_recipe_key: fausse_piste+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Databases

Temps de lecture ~5 min

> Ce filtre vérifie les bases nécessaires pour comprendre la persistance. Il ne teste pas
> le contenu que ce module doit justement t'enseigner.

## Ce que tu dois déjà savoir faire

- Manipuler des objets et des collections, et retrouver un élément à partir d'un identifiant
  ([Structures de données](../../02-CONSTRUCTION/06-DATA-STRUCTURES/README.md)).
- Expliquer ce qu'un test vérifie et distinguer un cas nominal d'un cas négatif
  ([Testing](../../02-CONSTRUCTION/03-TESTING/README.md)).
- Comprendre qu'une API expose un contrat entre un client et un service
  ([API Craft](../../02-CONSTRUCTION/19-API-CRAFT/README.md) et
  [API Dojo](../../02-CONSTRUCTION/20-API-DOJO/README.md)).

## Questions

1. Dans une collection d'utilisateurs, pourquoi un identifiant stable est-il plus fiable
   que la position d'un utilisateur dans la liste ?
2. Quelle différence fais-tu entre une donnée présente uniquement pendant l'exécution du
   programme et une donnée que le système doit retrouver après son redémarrage ?
3. À quoi sert un contrat d'API lorsque le client et le serveur évoluent séparément ?
4. Quel test simple détecterait qu'une création répétée produit deux enregistrements alors
   qu'une seule création métier était attendue ?

## Ce que ce module va t'apprendre

Tu n'as pas besoin de connaître SQL, les transactions ACID, l'isolation, les index, Redis,
la normalisation, ni les différences entre SQL et NoSQL avant d'entrer. Ces notions sont
enseignées dans ce module. Les exiger ici reviendrait à te demander de connaître le cours
avant de le suivre.

## Verdict

- **3 réponses solides sur 4**, et les trois capacités de la section précédente acquises
  → ouvre [`README.md`](README.md).
- Si une capacité de base manque, reviens à la ressource correspondante, puis refais ce
  diagnostic. Ne remonte pas jusqu'à Big App Snoop : ce module n'en dépend pas.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
