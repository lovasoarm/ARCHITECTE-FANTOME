---
stability: stable
type: canonical-standard
scope: mini-projects
---

# STANDARD GLOBAL DES MINI-PROJETS

Les mini-projets sont le pont entre l'exercice et le travail d'ingénierie.

## Paquet minimal

Chaque mini-projet important doit produire :

```text
BRIEF
HYPOTHESES
IMPLEMENTATION
MESURES
SECURITY REVIEW
PERTURBATION
ADR (Architecture Decision Record : trace d'une décision)
SPEC DRIFT
POSTMORTEM
TRANSFER
REVIEW
```

Le dépôt peut utiliser une structure historique différente. Le contenu reste obligatoire.

## Contrainte

Au moins 3 contraintes explicites parmi :

```text
budget
latence
débit
disponibilité
stockage
sécurité
temps
compatibilité
maintenance
expérience utilisateur
```

## Mesure

Avant l'exécution :

```text
JE PREVOIS
```

Après l'exécution :

```text
J'AI OBSERVE
```

Les valeurs doivent être marquées :

```text
SIMULE
OBSERVE
EXTERNE
REEL
```

## Perturbation

Au moins une perturbation non triviale :

```text
dependency down
latence x5
DB indisponible
quota atteint
message dupliqué
cache incohérent
schéma modifié
permission retirée
coût augmenté
```

## Postmortem

Le postmortem doit être écrit **après** la perturbation et doit conserver les erreurs.

```text
hypothèse initiale
écart
cause
impact
décision
résultat
action préventive
```

## Revue

Avant de classer le mini-projet comme preuve forte :

```text
SELF REVIEW
   |
   v
PEER REVIEW
   |
   v
EXTERNAL REVIEW
```

Une revue faite par soi-même reste une revue interne.

## Sortie vers le terrain

Chaque mini-projet important doit proposer au moins une option concrète :

```text
A. 3 utilisateurs externes
B. une contribution open source
C. une petite mission autorisée
D. un partenaire associatif / communauté
```

Si rien n'est faisable, exécuter un **replay externe** (même décision confrontée à un contexte nouveau)
et marquer explicitement la preuve comme simulation.
