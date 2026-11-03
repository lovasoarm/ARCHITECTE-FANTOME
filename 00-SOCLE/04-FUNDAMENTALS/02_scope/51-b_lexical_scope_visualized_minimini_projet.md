---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [fausse_piste, changement_contexte]
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: low
assessment_role: instructional_checkpoint
---

# Mise en pratique : Scope lexical, en images

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

Niveau : Fondamental

## CONTEXTE

La portée lexicale se lit dans le code, pas à l'exécution. C'est ce qui explique qu'un composant enfant « voie » les props qu'on lui passe et rien d'autre.

## OBJECTIF

Ta carte projet a une hiérarchie claire.

## APPLICATION

- Dessine (papier ou commentaire) les portées imbriquées de ton fichier `ProjectCard.jsx` : module → composant → handler `onClick`.
- Utilise dans le handler une variable venant de chacune des trois portées.
- Vérifie que ça compile et explique en une phrase la chaîne de résolution.

## Critère de réussite

- [ ] Dessine (papier ou commentaire) les portées imbriquées de ton fichier `ProjectCard.jsx`.
- [ ] Utilise dans le handler une variable venant de chacune des trois portées.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Si deux variables portent le même nom dans deux portées imbriquées, laquelle gagne et pourquoi ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ta carte projet a une hiérarchie claire.

Tu sais maintenant lire un composant React comme une pile de portées : c'est l'outil mental n°1 pour comprendre le code des autres.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-b_lexical_scope_visualized_minimini_projet » :** Dans Kintana, isole la valeur ou la transformation concernée dans une fonction métier ; vérifie l’état avant/après, les entrées invalides et l’absence de mutation involontaire.

Dans `domain/requests/`, fais lire à une fonction interne une configuration définie dans son environnement lexical. Ajoute un cas de shadowing et explique quel binding est résolu.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
