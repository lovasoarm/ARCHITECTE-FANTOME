---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, changement_echelle]
anti_recipe_key: temps_limite+changement_echelle
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Le chaos des références

> **Repère :** deux bindings peuvent désigner le même tableau ; une mutation via l’un est visible via l’autre.

## TYPE

Projet fil rouge

## Niveau

[OK] Fondamental

## CONTEXTE

Deux noms sur le même objet, c'est du partage d'état involontaire. Dans le portfolio, ça arrive dès qu'on trie les projets pour la ligne « Continuer à regarder » tout en réutilisant le même tableau ailleurs.

## OBJECTIF

Ton premier utilitaire non destructif.

## APPLICATION

- Écris une fonction `sortByYear(projects)` qui utilise directement `.sort()` sur le tableau reçu.
- Appelle-la, puis affiche le tableau d'origine : constate qu'il a été réordonné.
- Réécris la fonction pour qu'elle retourne un nouveau tableau trié sans toucher l'entrée.
- Garde la version corrigée dans `lib/projects.js`.

## Critère de réussite

- [ ] Écris une fonction `sortByYear(projects)` qui utilise directement `.sort()` sur le tableau reçu.
- [ ] Appelle-la, puis affiche le tableau d'origine.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quelles méthodes de tableau modifient l'original, et comment les repères-tu avant de les utiliser ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Garde-fou

Avant de modifier le projet fil rouge :

1. Vérifie que le projet fonctionne.
2. Fais une modification minimale.
3. Vérifie le comportement demandé.
4. Lance les tests/build disponibles.
5. Ne supprime pas une fonctionnalité existante pour satisfaire l'exercice.
6. Si l'expérience est volontairement destructive, fais-la dans `scratch/` ou dans une branche dédiée.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton premier utilitaire non destructif.

`sortByYear` est une vraie pièce du portfolio : c'est elle qui ordonnera tes rangées de projets. Commit ce fichier, il ne sera plus jamais réécrit.

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 54-reference_chaos_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, reproduis deux consommateurs qui partagent la même référence de demande. Vérifie la propagation d’une mutation, puis introduis une copie au point où l’isolation est requise.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
