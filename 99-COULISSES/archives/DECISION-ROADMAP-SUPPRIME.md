# DÉCISION : le ROADMAP.md de ProjectFunny a été supprimé, pas oublié

## Constat

Le dépôt source de ProjectFunny contenait un fichier `ROADMAP.md` à sa racine. Il n'a pas
de suite dans ce dépôt fusionné. Ce n'est pas une perte accidentelle lors de la fusion des
deux curriculums : c'est une suppression décidée, documentée ici pour qu'aucun lecteur ne
la prenne pour un oubli et n'aille chercher un fichier qui n'existe plus.

## Pourquoi il a disparu

`ROADMAP.md` de ProjectFunny annonçait un ordre de publication des 16 niveaux de ce
curriculum pris seul, avec des dates cibles propres à un dépôt qui vivait indépendamment
de MyFunnyJS. Trois raisons ont rendu ce fichier faux dès la fusion :

1. **La numérotation qu'il décrit n'existe plus.** Les 16 niveaux de ProjectFunny sont
   redistribués dans les six paliers actuels (`00-SOCLE` à `06-ANNEXES-TRANSVERSES`), avec
   les modules techniques de MyFunnyJS intercalés selon leurs propres prérequis. Un
   roadmap qui promet "niveau 7 la semaine 4" n'a plus de sens quand "niveau 7" n'est plus
   une unité de planification du dépôt.
2. **Les dates qu'il fixait étaient celles d'un mainteneur solo sur un seul dépôt.** Elles
   ne décrivaient pas un rythme d'apprentissage praticable par un apprenant, mais un
   calendrier de publication de contenu, devenu sans objet une fois les deux dépôts
   fusionnés en un seul livrable stable.
3. **Garder le fichier tel quel aurait fait doublon avec un document qui, lui, reste
   vivant et vrai** : la roadmap de run du produit que l'apprenant construit. Un roadmap de
   publication de curriculum et un roadmap de run de produit ne sont pas le même objet ;
   dupliquer le premier après la fusion aurait entretenu la confusion entre les deux.

## Ce qui le remplace

- Pour savoir dans quel ordre progresser dans le dépôt : le [README.md](../../README.md)
  racine, section sommaire, qui donne l'ordre des six paliers et renvoie module par module.
- Pour planifier un vrai roadmap produit, avec jalons datés et registre de risques, sur le
  projet fil rouge de l'apprenant : [03-PILOTAGE/01-ROADMAP-RUN](../../03-PILOTAGE/01-ROADMAP-RUN/README.md).
  Ce module enseigne exactement la compétence que l'ancien `ROADMAP.md` de ProjectFunny
  appliquait à lui-même, mais orientée vers le produit de l'apprenant, pas vers la
  publication du curriculum.

## Ce que ça change pour toi

Rien à récupérer. Si tu cherches "le planning du parcours", c'est le sommaire du
[README.md](../../README.md) racine. Si tu cherches "comment planifier mon propre projet",
c'est [03-PILOTAGE/01-ROADMAP-RUN](../../03-PILOTAGE/01-ROADMAP-RUN/README.md).
