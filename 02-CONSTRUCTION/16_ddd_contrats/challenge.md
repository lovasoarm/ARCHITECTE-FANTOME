---
stability: intemporel
acte: construction
noyau: oui
type: challenge
---

# CHALLENGE : LA CARTE, LE CONTRAT, LE REFUS

Durée : 1 h 30. Solo. Tout est rendu dans ton dépôt fil rouge.

## Contexte imposé

Un second consommateur arrive sur ton API : une intégration partenaire que tu ne contrôles pas.
Elle a besoin d'un champ que tu n'exposes pas, et elle ne supporte pas les enums inconnus.

## Livrables (trois fichiers, pas un de plus)

1. `ADR/contextes-bornes.md` — carte en ASCII, 3 à 5 contextes, un mot ambigu justifiant chaque
   frontière, la traduction au passage.
2. `contrats/v2.md` — le nouveau contrat, la liste des changements classés cassants / non cassants,
   l'en-tête `Sunset` de la v1 avec une date réelle, et le jeu de cas exécutable (au moins 8 cas dont
   3 d'erreur).
3. `ADR/refus-architecture.md` — le refus chiffré de l'exercice 04, adapté à ton propre projet.

## Contrainte anti-copie

Chaque nombre cité doit venir d'une mesure ou d'un relevé de **ton** projet, avec la date du relevé.

## Barème (12 points, 9 pour passer)

- Carte : frontières justifiées par un mot, pas par une techno (3).
- Contrat : classification cassant/non cassant correcte + date d'extinction (3).
- Cas exécutables présents et rejouables (3).
- Refus chiffré avec seuil déclencheur et date de réexamen (3).
