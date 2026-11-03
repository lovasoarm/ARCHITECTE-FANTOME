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

<!-- AF-DIAGRAM:testing -->

## Repère visuel utile : Protéger un invariant Kintana contre la régression

```text
risque / invariant
       |
       v
choisir le niveau de test
  |       |        |
 unité  intégr.  contrat / E2E
  |       |        |
  +-------+--------+
          v
   test rouge -> correctif
          |
          v
   test vert + mutation volontaire
```

<!-- AF-LESSON-PROFILE: testing -->

## Repères de décision

- **Pourquoi :** Les tests protègent un contrat observable pendant que le code évolue. Ils rendent les régressions moins coûteuses à diagnostiquer et à corriger.
- **Quand l’utiliser / quand l’éviter :** Choisis le niveau de test selon le risque : unité pour une règle isolée, intégration pour plusieurs composants, contrat pour les échanges, E2E pour un parcours critique. N'utilise pas des mocks pour simuler ce que tu dois réellement vérifier.
- **Limites :** Une suite verte ne prouve que les cas exécutés et les assertions observées. Les tests ne remplacent pas revue, sécurité, monitoring ou test de charge réaliste.

## Mécanisme : la version sans magie

Formule un invariant, prépare un état contrôlé, exécute l'action et affirme un résultat public. Ajoute le cas limite et vérifie que le test échoue si le bug revient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **09 : Stratégie de tests (pas framework)** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « 09 : Stratégie de tests (pas framework) » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
