---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_contexte]
anti_recipe_key: constraints_injectees+changement_contexte
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Un bug non reproductible n'est pas corrigé, il est masqué. Reproduire d'abord, corriger ensuite.

## OBJECTIF

Ton bug est reproductible sur commande.

## APPLICATION

- Choisis un bug d'affichage (par ex. barre de progression absente).
- Écris les étapes exactes de reproduction, données comprises, dans un fichier.
- Vérifie que quelqu'un d'autre pourrait le reproduire sans toi.
- Corrige seulement après.

## Critère de réussite

- [ ] Choisis un bug d'affichage (par ex. barre de progression absente).
- [ ] Écris les étapes exactes de reproduction, données comprises, dans un fichier.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Comment sais-tu que ta reproduction est complète ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton bug est reproductible sur commande.

Tu tiens la base d'un futur test de non-régression en `02-CONSTRUCTION/03-TESTING`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
