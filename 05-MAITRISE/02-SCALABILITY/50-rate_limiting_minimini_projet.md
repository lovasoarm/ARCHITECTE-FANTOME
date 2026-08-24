---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [changement_contexte, fausse_piste]
anti_recipe_key: changement_contexte+fausse_piste
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Une route publique de ton portfolio (formulaire de contact, API projets) peut être appelée en boucle. Limiter le débit est la première protection, avant toute mise à l'échelle.

## OBJECTIF

Une route publique de ton projet refuse proprement un débit anormal.

## APPLICATION

- Choisis la route la plus exposée de ton portfolio et définis une limite chiffrée (requêtes par minute et par appelant).
- Implémente la limite, avec une réponse claire quand elle est atteinte (statut dédié et information sur le délai d'attente).
- Écris un petit script qui envoie assez de requêtes pour déclencher la limite, et observe les réponses.
- Note la limite retenue et son raisonnement dans `docs/rate-limiting.md`.

## Critère de réussite

- [ ] Fait : au-delà de la limite, la réponse indique explicitement le refus et le délai.
- [ ] Fait : sous la limite, un usage normal n'est jamais bloqué.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi une limite stockée en mémoire d'un seul processus devient-elle insuffisante dès qu'il y a plusieurs instances ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta route exposée applique une limite de débit observable.

Tu as protégé un point d'entrée réel, avec un chiffre que tu peux défendre. Commit `docs/rate-limiting.md`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.
