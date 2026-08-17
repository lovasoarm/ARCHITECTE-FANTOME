# Challenge 00 : ton contrat de départ

[Sommaire](../../06-ANNEXES-TRANSVERSES/archives/CURRICULUM-projectfunny.md) | [Niveau](README.md) | [Grimoire](grimoire.md)

Ce niveau n'enseigne aucune technique, mais il produit un livrable daté, réutilisé par les
quinze niveaux suivants : le contrat que tu signes avec toi-même sur ton projet fil rouge.

## Durée cible

45 minutes. Au-delà, tu es en train de choisir un projet que tu ne connais pas assez.

## Livrable

Un fichier `JOURNAL.md`, à la racine de ton projet fil rouge, contenant :

1. Le tableau de calibrage du projet fil rouge, celui de [README.md](README.md), rempli sur
   ses six colonnes (les cinq critères, plus la colonne « ce qu'il faut pouvoir écrire »),
   aucune cellule vide.
2. Le nom du domaine choisi, en une phrase, sans jargon.
3. Une phrase de non-objectif, même approximative : « ce projet ne fera pas X ».
4. La date du jour et ta signature.

## Critères de réussite mesurables (binaires)

```text
[ ] Le tableau est rempli sur les six colonnes, aucune cellule vide
[ ] Le domaine choisi ne figure PAS dans la liste interdite :
    todo, blog, e-commerce, login, "utilisateur/produit"
[ ] Une phrase de non-objectif est ecrite des maintenant
[ ] La date est anterieure a la premiere ligne de code du fil rouge
[ ] Un lecteur qui ne connait pas le projet dit, en une lecture, qui l'utilise
    et ce que ca lui evite de faire a la main
```

La quatrième condition est la même mécanique d'antériorité que celle qui note l'ADR face à
[l'enveloppe scellée](../../04-EPREUVE/06-CAPSTONE-ARENA/SCELLE-message-client-jalon-2.md) au niveau 12 : un
contrat écrit après coup décrit, il n'oriente pas. Si tu as déjà écrit du code sur ce
projet, tu changes de projet ou tu acceptes que ce challenge vaille 0.

## Comment vérifier l'antériorité

```text
git log --reverse --format=%cI | head -1      --> premiere ligne de code
git log -1 --format=%cI -- JOURNAL.md          --> date du contrat
Condition : date du contrat < premiere ligne de code
```

Si ton projet fil rouge n'est pas encore versionné, la date manuscrite dans `JOURNAL.md`
suffit, à condition qu'aucun fichier de code n'existe encore dans le dossier.

## Piège classique

Choisir un domaine qu'on ne connaît pas, pour « faire sérieux ».
Symptôme observable : au niveau 02, tu n'arrives pas à inventer une contrainte métier
crédible sans aller la chercher sur internet. Si tu passes plus de dix minutes à documenter
ton propre domaine, il n'est pas le tien : reprends la grille de calibrage.

## Ce que tu dois savoir défendre

1. Pourquoi ton projet coche au moins 4 des 5 critères de calibrage, exemple concret à
   l'appui pour chacun.
2. Quelle est la règle de concurrence de ton projet : quelle ressource, et qui gagne.
3. Ce que ton non-objectif t'interdit de faire au niveau 03, quand la tentation d'élargir
   le périmètre arrivera.
