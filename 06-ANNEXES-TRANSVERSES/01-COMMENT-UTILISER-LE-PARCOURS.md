---
stability: stable
acte: orientation
noyau: non
---

# 01 - COMMENT UTILISER ARCHITECTE-FANTOME

> Tu viens de lire `00-GUIDE.md` et tu veux savoir comment entrer dans le parcours sans te perdre.
> Ce fichier est la rampe d'accès. Il ne rajoute pas un niveau technique.

## La route en une page

```text
00-GUIDE
   |
   | "Je comprends la carte."
   v
01-COMMENT-UTILISER-LE-PARCOURS
   |
   | "Je sais comment travailler."
   v
START HERE
   |
   v
SOCLE
   |
   v
CADRAGE
   |
   v
CONSTRUCTION
   |
   v
PILOTAGE
   |
   v
EPREUVE
   |
   v
MAITRISE
```

## Regle numero 1

Ne lis pas le depot comme un livre de 1 600 fichiers.

Lis le **fil canonique** (l'ordre prevu du parcours), puis ouvre les annexes seulement
quand une etape t'y envoie.

```text
README
  -> 00-GUIDE
  -> START HERE
  -> parcours courant
  -> annexe appelee par le parcours
  -> retour au parcours
```

## Regle numero 2

Une annexe n'est pas une salle de cours permanente.

C'est un outil.

```text
Tu es bloque ?
    -> annexe d'aide

Tu dois produire une preuve ?
    -> annexe de preuve

Tu dois verifier une decision ?
    -> annexe de revue / contradiction

Tu dois traiter le marche ou la peremption ?
    -> annexe de gouvernance
```

## Regle numero 3

Ne saute pas directement a Staff Engineer.

La capacite Staff (influence technique au-dela d'une equipe et decisions a plus grande portee)
se construit apres les fondamentaux, les systemes, les preuves et l'experience.

```text
fondamentaux
    +
execution
    +
systemes
    +
architecture
    +
fiabilite / securite
    +
preuves
    +
leadership
    =
base Staff / Principal
```

## Comment savoir si tu peux passer a la suite ?

Ne demande pas seulement :

> "Est-ce que j'ai lu le module ?"

Demande :

```text
Est-ce que je peux expliquer ?
Est-ce que je peux refaire ?
Est-ce que je peux debugger ?
Est-ce que je peux justifier ?
Est-ce que je peux mesurer ?
Est-ce que je peux transferer ?
```

Si la reponse est non, reste encore un peu.

## Ce que ce document ne fait pas

Il ne remplace pas :

- `PROGRESSION.md`
- `README.md` du niveau courant
- les prerequis
- les gates de preuve
- les exercices
- l'experience terrain

Il explique seulement comment **naviguer sans se perdre**.

## Point de sortie

Apres ce fichier :

```text
si tu es debutant
    -> suis START HERE

si tu as deja des bases
    -> utilise PROGRESSION.md pour te situer
       puis reprends le fil au niveau approprie

si tu prepares une preuve Staff
    -> suis les gates de preuve, pas seulement les modules techniques
```

> **Le depot est grand. Ton prochain pas ne l'est pas.**
