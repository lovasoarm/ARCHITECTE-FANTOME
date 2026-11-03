---
stability: stable
acte: orientation
noyau: non
---

# 01 - COMMENT UTILISER ARCHITECTE-FANTOME

> Pour le chemin concret, utilise [58 : Route apprenant cohérente](58-ROUTE-APPRENANT-COHERENTE.md) : elle relie les ressources existantes à leurs prérequis, livrables, critères de sortie et chemins de remédiation. Ce guide reste le mode d'emploi de navigation.

> Ce guide est une référence de navigation facultative. Tu n'as pas besoin de le lire avant de commencer : ouvre directement [START HERE](../00-SOCLE/01-GETTING-STARTED/01-START_HERE.md).
> Il ne rajoute pas un niveau technique et ne crée pas une seconde porte d'entrée.

## La route en une page

```text
README
   |
   v
START HERE
   |
   v
GETTING STARTED
   |
   v
PROLOGUE
   |
   v
RÉFÉRENTIEL
   |
   v
ROUTE APPRENANT (58)
   |
   v
RESSOURCE DE L'ÉTAPE COURANTE
   |
   v
ANNEXE, SEULEMENT SI LA ROUTE L'INDIQUE
```

## Regle numero 1

Ne lis pas le depot comme un livre de 1 600 fichiers.

Lis le **fil canonique** (l'ordre prevu du parcours), puis ouvre les annexes seulement
quand une etape t'y envoie.

```text
README
  -> START HERE
  -> Getting Started
  -> Prologue
  -> Référentiel
  -> Route apprenant (58)
  -> ressource de l'étape courante
  -> annexe appelée par la route, si nécessaire
  -> retour à la route
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

Tu dois vérifier une information susceptible d'évoluer ?
    -> source officielle indiquée par la ressource
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
si tu es débutant
    -> ouvre directement START HERE

si tu as deja des bases
    -> utilise PROGRESSION.md pour te situer
       puis reprends le fil au niveau approprie

si tu prepares une preuve Staff
    -> suis les gates de preuve, pas seulement les modules techniques
```

> **Le depot est grand. Ton prochain pas ne l'est pas.**
