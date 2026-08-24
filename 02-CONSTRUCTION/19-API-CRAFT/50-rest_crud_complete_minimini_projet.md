---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, changement_contexte]
anti_recipe_key: decision_organisationnelle+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

## TYPE

Mini-projet

## Niveau

[OK] Intermédiaire

## CONTEXTE

Le portfolio expose déjà des données : liste de projets, fiche par slug. Les servir via une petite API REST oblige à décider des URL, des codes de statut et de la forme des réponses.

## OBJECTIF

Tes projets sont accessibles via une API dont les contrats sont explicites.

## APPLICATION

- Expose `GET /api/projects` (liste) et `GET /api/projects/:slug` (détail) en réutilisant les données existantes du portfolio.
- Définis les codes de statut : succès, ressource absente, entrée invalide.
- Vérifie la forme de la réponse d'erreur : elle doit être exploitable par un client (message et code stables).
- Documente les deux routes dans `docs/api.md` : URL, paramètres, réponse type, erreurs possibles.

## Critère de réussite

- [ ] Fait : un slug inexistant renvoie un statut d'absence et un corps d'erreur exploitable.
- [ ] Fait : `docs/api.md` décrit les deux routes et leurs erreurs.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi le code de statut ne doit-il pas dépendre de la mise en forme du message d'erreur ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : tes données de projets sont servies par une API aux contrats explicites.

Tu as écrit un contrat, pas seulement du code. Commit `docs/api.md`.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
