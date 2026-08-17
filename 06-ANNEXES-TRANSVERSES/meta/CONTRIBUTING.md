# CONTRIBUER À ARCHITECTE-FANTOME

Ce repo est un parcours d'apprentissage, pas une bibliothèque de code. Contribuer veut donc dire : ajouter du contenu qui tient la charte, ou corriger ce qui est faux.

## Avant d'ajouter quoi que ce soit

1. Lis [_STYLE.md](_STYLE.md) en entier. Un contenu hors charte sera refusé même s'il est juste.
2. Vérifie que le sujet n'est pas déjà traité ailleurs dans le fil. Un doublon coûte plus cher qu'un manque : il fait douter l'apprenant sur le fichier à ouvrir.
3. Trouve la vraie position de prérequis du contenu. Un module se place là où ses dépendances sont déjà satisfaites, jamais à la fin par confort.

## Règles de placement

- Un module va dans le palier dont le bloc correspond à son moment d'usage réel.
- Il prend un numéro local à deux chiffres, dans l'ordre de traversée du palier.
- Il garde la convention de nommage de son voisinage : snake_case pour un module d'origine MyFunnyJS, MAJUSCULES-AVEC-TIRETS pour un niveau d'origine ProjectFunny.

## Règles de lien

Tout lien interne est relatif et résolu depuis le dossier du fichier source. Après un déplacement de fichier, les liens se recalculent : la vérification complète est décrite dans le fichier de contrôle qualité VERIFICATION_LIENS.md, livré hors du parcours.
