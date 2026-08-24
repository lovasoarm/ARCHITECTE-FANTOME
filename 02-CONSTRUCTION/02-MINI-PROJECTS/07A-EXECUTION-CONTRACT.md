---
stability: stable
acte: executer
---

# Contrat d’exécution des mini-projets

Les répertoires `01` à `19` sont des **scaffolds d’épreuves**. Ils distribuent l’énoncé, les garde-fous, les fixtures et les espaces de production ; ils ne prétendent pas contenir la solution finale de l’apprenant.

## Règle de reproductibilité

Une commande n’est considérée comme exécutable dans la release AF que si **tous les artefacts nécessaires sont présents dans cette release**.

Lorsqu’un cahier des charges mentionne `npm install`, `npm test`, `npm start` ou une autre commande, il s’agit d’une **commande cible du dépôt apprenant à construire**, sauf si le projet distribue explicitement son `package.json`, ses dépendances/versionnements et les fichiers exécutables correspondants.

Dans ce cas :

1. ne pas considérer la commande illustrative comme une preuve d’exécution de la release AF ;
2. créer dans le dépôt apprenant le manifeste d’exécution approprié (`package.json`, lockfile si dépendances, `.nvmrc` ou équivalent lorsque pertinent) ;
3. consigner la version de runtime réellement utilisée ;
4. consigner la commande réellement exécutée ;
5. reproduire le résultat sur une extraction propre du dépôt apprenant.

## Cas sans dépendance

Pour un exercice Node.js qui n’a besoin que de la bibliothèque standard, préférer une commande explicite telle que `node <fichier-de-test>.js` ou `node --test`, selon la forme réelle des tests produits par l’apprenant.

## Cas avec dépendance

Si l’apprenant choisit Jest, Playwright, TypeScript, Sentry, Lighthouse ou une autre dépendance, celle-ci doit être déclarée dans le dépôt apprenant. AF ne transforme pas une commande de tutoriel en dépendance cachée.

## Critère de fermeture

Une preuve de type « PASS », « 0 erreur » ou un extrait de terminal présent dans un énoncé est **illustratif** tant qu’aucune exécution reproductible de la solution apprenant n’a été produite.
