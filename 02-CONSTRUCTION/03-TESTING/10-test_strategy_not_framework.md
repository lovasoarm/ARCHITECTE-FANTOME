---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 09 : Stratégie de tests (pas framework)

Temps de lecture ~5 min

> **INTEMPOREL** : les frameworks passeront (Jest → Vitest → Node --test → …),
> la stratégie ne bougera pas.

## Objet du fichier

Décider **quoi tester, à quel niveau, à quel coût**. Rien sur `expect()` ou
`describe()` : c'est du folklore de framework.

## La pyramide (et ses limites)

```text
    /\    e2e (rare, cher, lent, révèle des bugs uniques)
    /--\    intégration (modéré, réaliste, coûteux à maintenir)
   /----\   unitaire (nombreux, rapides, ciblés)
   /______\
```

- **Unitaire** : une fonction pure ou une classe isolée. Cible : logique
  métier, invariants.
- **Intégration** : plusieurs modules ensemble (ex: route + service + DB
  mémoire). Cible : contrats entre couches.
- **E2E** : le système complet, comme un utilisateur. Cible : _happy paths_
  critiques uniquement (mission_start, session_start).

**Nouvelle réalité** : la pyramide devient un **trapèze** : beaucoup
d'intégration en mémoire (SQLite-in-mem, HTTP local), peu de vrai E2E.

## Faux positifs / faux négatifs

- **Faux positif** : test vert alors que le code est cassé
  (assertion trop laxe, mock qui ment).
- **Faux négatif** : test rouge alors que le code est bon
  (assertion trop stricte, dépendance externe flaky).

Un test flaky est **toujours** un des deux. Voir `../../01-CADRAGE/03-DEBUGGING/08-flaky_bugs.md`.

## Coût de maintenance

Un test qui casse à chaque refacto **anodine** est un test **couplé à
l'implémentation**, pas au comportement. À supprimer ou réécrire pour tester
le contrat, pas le "comment".

Règle Thor : **un test doit survivre à une réécriture complète de la fonction
tant que le contrat externe ne bouge pas.**

## Quoi tester en priorité

1. Les invariants métier (l'utilisateur ne peut jamais avoir un solde négatif).
2. Les frontières (0, 1, max, null, unicode).
3. Les erreurs (que se passe-t-il si la DB est down ?).
4. Ce qui a déjà cassé une fois (test de régression = mémoire d'équipe).

## Ce qu'on ne teste pas

- Le code du framework.
- Les getters/setters triviaux.
- Le hasard "juste au cas où" (chaque test a un **but** documenté).

## (attention) Ce que l'analogie "100% coverage = code sûr" cache

100% de couverture = 100% des lignes **exécutées** par les tests. Ça ne dit
rien sur les **assertions**. Un test sans `assert` couvre sans vérifier.
Coverage est un outil de détection, pas un objectif.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
