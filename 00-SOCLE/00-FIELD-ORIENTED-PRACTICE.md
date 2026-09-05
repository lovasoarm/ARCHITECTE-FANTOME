---
stability: stable
type: canonical-practice-standard
scope: all-exercises
---

# FIELD-ORIENTED PRACTICE - STANDARD GLOBAL

ARCHITECTE-FANTOME traite chaque exercice comme un entraînement à l'observation,
à la décision et à la confrontation avec des contraintes.

Le standard ne prétend pas fabriquer une expérience professionnelle. Il garantit
que l'apprenant développe les réflexes qui rendent cette expérience profitable.

## La boucle canonique

```text
PROBLEME
   |
   v
CONTEXTE
   |
   v
CONTRAINTE
   |
   v
HYPOTHESE
   |
   v
IMPLEMENTATION
   |
   v
OBSERVATION
   |
   v
PERTURBATION
   |
   v
MESURE
   |
   v
DECISION / REVISION
   |
   v
POSTMORTEM
   |
   v
TRANSFER
   |
   v
REVIEW
   |
   v
SORTIE TERRAIN
```

## Profondeur selon le niveau

```text
L0 - FONDAMENTAL
objectif + observation + explication

L1 - EXERCICE RENFORCE
contrainte + mesure + cas limite

L2 - MINI-PROJET
contrainte + mesure + perturbation + postmortem + transfert

L3 - BOSS / CAPSTONE
incertitude + arbitrage + perturbation + décision + défense + review

L4 - VALIDATION EXTERNE
reviewer indépendant / open source / mission / utilisateurs

L5 - TERRAIN REEL
système vivant + conséquences réelles + maintenance + historique
```

## Règle d'honnêteté

```text
SIMULE    = comportement volontairement créé par le protocole
OBSERVE   = résultat réellement exécuté par l'apprenant
EXTERNE   = résultat produit avec un tiers ou un système hors du contrôle du candidat
REEL      = système vivant soumis à de vraies conséquences
```

Aucun livrable ne peut transformer automatiquement `SIMULE` en `REEL`.

## Anti-tutoriel

Un exercice important ne peut pas être validé uniquement parce que :

```text
le code compile
```

Le candidat doit pouvoir montrer au minimum :

```text
ce qu'il cherchait à observer
ce qu'il pensait observer
ce qu'il a réellement observé
ce qu'il a appris
```

## Standard de répétition

Toute notion majeure doit réapparaître sous au moins trois formes
avant de pouvoir être considérée comme robuste :

```text
1. EXERCICE
2. CONTEXTE DIFFERENT
3. TRANSFERT OU PERTURBATION
```

Pour les notions Staff/architecture :

```text
4. DEFENSE
5. REVIEW EXTERNE
```

## Sortie terrain

A partir du premier mini-projet majeur, le parcours doit proposer un chemin de sortie :

```text
mini-projet
    |
    +--> open source
    |
    +--> utilisateurs externes
    |
    +--> petite mission
    |
    +--> association / communauté
    |
    v
preuve externe
```

Le candidat choisit le niveau réaliste pour son contexte.

## Verdict

Un exercice est "field-oriented" s'il entraîne une décision sous contrainte
et produit une observation vérifiable, même si la contrainte est simulée.

Un portfolio est "terrain-backed" uniquement lorsqu'il comporte au moins une preuve
externe identifiable.
