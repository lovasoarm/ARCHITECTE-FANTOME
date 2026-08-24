---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [defaut_cache, fausse_piste]
anti_recipe_key: defaut_cache+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Challenge 00 : ton contrat de départ

Temps de lecture ~2 min

[Sommaire](../../06-ANNEXES-TRANSVERSES/04A-CARTE-DU-PARCOURS.md) | [Niveau](README.md) | [Grimoire](90-grimoire.md)

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
    , blog, e-commerce, login, "utilisateur/produit"
[ ] Une phrase de non-objectif est ecrite des maintenant
[ ] La date est anterieure a la premiere ligne de code du fil rouge
[ ] Un lecteur qui ne connait pas le projet dit, en une lecture, qui l'utilise
    et ce que ca lui evite de faire a la main
```

La quatrième condition est la même mécanique d'antériorité que celle qui note l'ADR face à
[l'enveloppe scellée](../../04-EPREUVE/05-CAPSTONE-ARENA/08-SCELLE-MESSAGE-CLIENT-JALON-2.md) au module `04-EPREUVE/05-CAPSTONE-ARENA` : un
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
Symptôme observable : au 01-PROBLEM-HUNT, tu n'arrives pas à inventer une contrainte métier
crédible sans aller la chercher sur internet. Si tu passes plus de dix minutes à documenter
ton propre domaine, il n'est pas le tien : reprends la grille de calibrage.

## Ce que tu dois savoir défendre

1. Pourquoi ton projet coche au moins 4 des 5 critères de calibrage, exemple concret à
   l'appui pour chacun.
2. Quelle est la règle de concurrence de ton projet : quelle ressource, et qui gagne.
3. Ce que ton non-objectif t'interdit de faire au 05-MVP-SPLIT, quand la tentation d'élargir
   le périmètre arrivera.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
