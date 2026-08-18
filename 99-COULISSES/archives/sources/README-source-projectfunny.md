> **Document historique d'avant fusion.** Les chiffres qu'il cite decrivent MyFunnyJS ou ProjectFunny seul. La carte vivante est [00-SOCLE/02-PROLOGUE/03-the-map.md](../../../00-SOCLE/02-PROLOGUE/03-the-map.md).

# ProjectFunny : Le curriculum qui fabrique des cerveaux d'ingénieurs

Ce n'est pas un cours. C'est un parcours d'entraînement.

Un cours te donne des notions. Ici, on te met en situation, on casse ton plan, on te demande de
défendre tes choix, et on te fait livrer. À la sortie, tu ne "connais" pas l'ingénierie logicielle :
tu sais conduire un projet réel du besoin flou jusqu'à la mise en production, et expliquer pourquoi
chaque décision a été prise.

## À qui ça s'adresse

- Tu sais déjà coder un peu (une boucle, une fonction, une requête HTTP ne te font pas peur).
  Ce niveau de départ n'est pas une impression : il se vérifie en 20 minutes avec l'auto-test
  d'entrée de [00-PROLOGUE/02-how-to-use-this-curriculum.md](../../../00-SOCLE/02-PROLOGUE/02-how-to-use-this-curriculum.md),
  section « Auto-test d'entrée : 10 questions ». Sous 7 réponses justes sur 10, ce dépôt te fera
  décrocher au niveau 05 : fais d'abord la remise à niveau indiquée dans l'auto-test, puis reviens.
- Tu bloques dès que le projet devient réel : trop d'options, trop de flou, tout casse.
- Tu veux comprendre ce que font les seniors dans leur tête, pas recopier leurs recettes.

Si tu cherches un tutoriel "framework X en 10 minutes", ce dépôt n'est pas pour toi.

## Le principe

```text
   BESOIN FLOU
       |
       v
  [ 02 PROBLEM-HUNT ]  ->  tu sais ce qu'il faut construire, et surtout ce qu'il ne faut pas
       |
       v
  [ 03 MVP-SPLIT ]     ->  tu sais découper en tranches livrables
       |
       v
  [ 04..07 CONSTRUCTION ] -> UI, données, architecture, API : tu sais où sont les frontières
       |
       v
  [ 08..10 CONDUITE ]  ->  roadmap, qualité, équipe : ça tient dans le temps
       |
       v
  [ 11..12 EPREUVE ]   ->  gros code inconnu, puis projet complet noté
       |
       v
    INGENIEUR
```

## Règles du jeu

1. **Tu livres.** Chaque niveau se termine par un artefact : un document, un schéma, du code.
2. **Tu défends.** Chaque leçon finit par trois questions. Si tu ne sais pas répondre à l'oral, tu
   n'as pas fini la leçon.
3. **Tu mesures.** Une décision sans critère de succès est une opinion.
4. **Tu jettes.** Le premier découpage est faux. Le refaire fait partie du travail.
5. **Tu écris la décision, pas seulement le code.** Le code dit le "comment". Ton texte dit le "pourquoi".

## Structure du dépôt

```text
ProjectFunny/
  README.md              ce fichier
  CURRICULUM.md          détail des 16 niveaux, objectifs et durées (source unique des durées)
  ROADMAP.md             trois rythmes de parcours (sprint, saison, marathon)
  EPILOGUE.md            ce qui vient après le dernier niveau
  ANNEXE-perennite.md    comment ce curriculum reste valable quand les outils changent
  ANNEXE-et-apres.md     spécialisations possibles et signaux de progression
  .meta/CONTRIBUTING.md        comment améliorer ce curriculum
  RETRO-BLOC-1-CADRAGE.md    OBLIGATOIRE, après le niveau 03
  RETRO-BLOC-2-BUILD.md      OBLIGATOIRE, après le niveau 07
  RETRO-BLOC-3-CONDUITE.md   OBLIGATOIRE, après le niveau 10
  RETRO-BLOC-4-EPREUVE.md    OBLIGATOIRE, après le niveau 12
  RETRO-BLOC-5-MAITRISE.md   OBLIGATOIRE, après le niveau 15
  LICENSE
  00-PROLOGUE/ ... 15-BONUS-VAULT/
```

Chaque niveau contient : `README.md` (la carte), `01-why-this-level.md` (pourquoi il existe et ce
qui casse sans lui), des leçons numérotées, `challenge.md` (livrable), `boss-fight.md` (situation
adverse), `grimoire.md` (mémo dense).

Exception : le niveau 15 (Bonus Vault) n'a ni `01-why-this-level.md` ni `boss-fight.md`, 
c'est un coffre de référence consultable hors ordre, pas un niveau à traverser linéairement.
Voir la section " Écart au gabarit " de `15-BONUS-VAULT/README.md` pour la justification
complète.

Les cinq [rétrospectives de bloc](../../../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md) ne sont pas optionnelles : ce sont les seuls
points du parcours où tu relis un livrable déjà rendu avec ta grille de lecture actuelle.
Un bloc terminé sans sa rétro compte comme non terminé :
[1-CADRAGE](../../../01-CADRAGE/RETRO-BLOC-1-CADRAGE.md), [2-BUILD](../../../02-CONSTRUCTION/RETRO-BLOC-2-BUILD.md),
[3-CONDUITE](../../../03-PILOTAGE/RETRO-BLOC-3-CONDUITE.md), [4-EPREUVE](../../../04-EPREUVE/RETRO-BLOC-4-EPREUVE.md),
[5-MAITRISE](../../../05-MAITRISE/RETRO-BLOC-5-MAITRISE.md).

Le dossier `.meta/` contient les règles de rédaction et de contribution du dépôt. Il n'est pas
dans le parcours : tu peux traverser les 16 niveaux sans jamais l'ouvrir.

**Deux coffres, deux rôles, ne les confonds pas :** le niveau 13 (Day to Legend) est l'entretien
continu de ta compétence après le parcours, borné à 12 semaines et 3 artefacts datés. Le niveau 15
(Bonus Vault) porte des exigences bonus dont une est **éliminatoire au capstone**
([15-BONUS-VAULT/05-security-cost-privacy.md](../../../04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md), qui
produit la revue de risques exigée par
[12-CAPSTONE-ARENA/04-evaluation-grid.md](../../../04-EPREUVE/06-CAPSTONE-ARENA/04-evaluation-grid.md)). Le 15 se lit
donc **avant** le 12, même s'il est numéroté après.

## Comment démarrer

1. Lis `00-PROLOGUE/README.md`.
2. Passe l'auto-test d'entrée (10 questions,
   [00-PROLOGUE/02](../../../00-SOCLE/02-PROLOGUE/02-how-to-use-this-curriculum.md)). Verdict binaire, 7/10 minimum.
3. Choisis un projet fil rouge **réel** (pas une todo-list) : un besoin que tu as vu de tes yeux,
   puis fais-le passer le **test de calibrage à 5 critères** de
   [00-PROLOGUE/README.md](../../../00-SOCLE/02-PROLOGUE/README.md). Sous 4 critères sur 5, change de projet
   maintenant : c'est le choix qui conditionne les 130 heures suivantes.
4. Fais chaque niveau sur ce projet. Le curriculum n'a de valeur que collé à un cas concret.

## Durée honnête

La seule source de durée du dépôt est [CURRICULUM.md](../CURRICULUM-projectfunny.md). Total réel du parcours :
**130 à 145 h hors niveau 13**, soit 11 à 12 semaines à 12 h/semaine, ou 8 à 9 mois à 4 h/semaine.
Le niveau 13 s'ajoute par-dessus sous forme de routine bornée à 12 semaines. Le capstone (niveau 12)
pèse 25 à 40 h à lui seul.

Aucun chiffre de durée n'est recopié ici : si tu en trouves un, c'est un défaut, corrige-le en
renvoyant à `CURRICULUM.md`.

Le parcours réaliste dure des mois, donc tu t'arrêteras au moins une fois. C'est prévu : voir
« Reprendre après une pause longue » dans
[00-PROLOGUE/02-how-to-use-this-curriculum.md](../../../00-SOCLE/02-PROLOGUE/02-how-to-use-this-curriculum.md).
