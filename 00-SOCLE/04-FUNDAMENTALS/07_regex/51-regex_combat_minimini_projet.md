---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [transmission, temps_limite]
anti_recipe_key: transmission+temps_limite
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Regex combat : valider des formats d’entrée

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Micro-drill

## Niveau

[OK] Fondamental

## CONTEXTE

Valider une saisie utilisateur côté client, c'est du confort ; mal la valider, c'est une fausse sécurité. Le formulaire de contact du portfolio en a besoin.

## APPLICATION

- Dans le formulaire de contact, écris une validation d'email par regex volontairement trop stricte, puis teste-la avec une adresse valide qu'elle rejette.
- Remplace-la par une validation permissive + le type `email` natif du champ.
- Note en commentaire pourquoi une regex d'email « parfaite » est une mauvaise idée.

## Critère de réussite

- [ ] Remplace-la par une validation permissive + le type `email` natif du champ.
- [ ] Note en commentaire pourquoi une regex d'email « parfaite » est une mauvaise idée.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Contre quoi une validation regex côté client ne protège-t-elle absolument pas ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton formulaire valide sans frustrer.

Tu as évité le classique « mon adresse est refusée » qui fait fuir un recruteur. Commit le formulaire.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-regex_combat_minimini_projet » :** Valide un identifiant de demande au format `KNT-` suivi de quatre chiffres, en ancrant le motif au début et à la fin. Ajoute des cas de longueur, séparateur et caractères invalides.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
