---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [solution_concurrente, decision_organisationnelle]
anti_recipe_key: solution_concurrente+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

# Mise en pratique : Fetch : quand ton code parle à internet

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

## TYPE

Mini-projet

## Niveau

**Extension d'intégration avancée : Next.js App Router (différée, hors première passe Fundamentals).** Ce livrable n'est pas nécessaire pour apprendre `fetch` en JavaScript natif et ne constitue pas une gate Fundamentals.

## Prérequis

- Avoir terminé la leçon canonique Fetch et étudié Promises / `async`-`await`.
- Connaître les bases de React, `useEffect` et les frontières Server / Client de l'App Router Next.js.
- Savoir lire un statut HTTP et traiter une erreur réseau.
- Disposer d'un projet Next.js App Router et d'un dépôt GitHub public à consulter.

## CONTEXTE

Même un portfolio statique peut afficher des données externes. Cette variante choisit d'utiliser `fetch` dans un Server Component de l'App Router. Ce n'est pas une règle disant que tous les appels `fetch` doivent être faits côté serveur : le choix dépend du besoin, du contexte d'exécution et des données à exposer.

## OBJECTIF

Ton portfolio parle à GitHub.

## APPLICATION

- Dans un Server Component, fais un `fetch` vers l'API publique GitHub à partir du champ `github` configuré pour le dépôt de ton portfolio.
- Affiche le nombre d'étoiles et la date du dernier push.
- Gère explicitement le cas où la requête échoue : le reste de la page doit rester affiché.

## Critère de réussite

- [ ] Dans un Server Component, fais un `fetch` vers l'API publique GitHub à partir du champ `github` configuré pour le dépôt de ton portfolio.
- [ ] Affiche le nombre d'étoiles et la date du dernier push.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Pourquoi ce `fetch` est-il fait côté serveur et pas dans un `useEffect` ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton portfolio parle à GitHub.

La carte ce parcours affiche désormais une donnée vivante. C'est le genre de détail qu'un recruteur remarque. Commit.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Approfondissement différé : livraison produit Kintana : règle métier et état

> **Statut : différé, facultatif pour la première passe.** Termine d’abord la pratique de base de cette page. Reviens à cette intégration après avoir étudié les notions préalables et lorsque le dépôt Kintana et son environnement sont réellement disponibles. Cette tâche ne constitue pas une gate de progression Fundamentals. Si l’environnement manque, reporte-la ; une simulation ne vaut pas une livraison intégrée.

> **Contexte de pratique :** relie le principe de cette leçon à une règle métier de Kintana, sans supposer que le projet est déjà installé.

Le micro-exercice de cette page constitue la pratique de première passe. La livraison Kintana ci-dessous est un approfondissement produit différé : elle réutilise le principe dans un contexte plus large, mais ne conditionne pas la validation de cette notion ni la progression dans Fundamentals. Elle améliore le même produit [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md).

**Mission liée à « 51-fetch_adventure_minimini_projet » :** Dans l’adaptateur Kintana, récupère une demande distante et distingue erreur réseau, réponse HTTP non réussie et JSON invalide. Le domaine reçoit une donnée validée, pas l’objet `Response` brut.

**Livrable :** incrément intégré, tests ou vérifications, note de décision et contre-exemple. **Gate de cette livraison différée (pas gate de progression Fundamentals) :** un cas nominal et deux cas invalides sont testés ; le même scénario peut être rejoué ; un autre développeur peut expliquer l’invariant. Étiquette les résultats locaux `LAB` ; ne revendique `PRODUCTION` qu’après déploiement et observation réels.
