---
stability: evolutif
acte: apprendre-et-pratiquer
noyau: renfort
route: formation-complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 63 : Laboratoire de tests : spécifier, falsifier et préserver un contrat

Ce laboratoire complète [02-CONSTRUCTION/03-TESTING](../02-CONSTRUCTION/03-TESTING/README.md). Il travaille le raisonnement qui rend un test utile : un test doit échouer pour un défaut significatif, rester lisible, et protéger un contrat précis sans figer l'implémentation inutilement.

## 1. Exemple travaillé : normalisation de recherche

Le mini-projet existant `searchProjects(query)` demande une recherche insensible à la casse et aux accents dans le titre et la stack, avec comportement défini pour une requête vide. Formalise le contrat avant d'écrire le code.

| Entrée                                | Attente à spécifier                                                                    | Risque si l'attente n'est pas explicite                      |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `"API"` vs `"api"`                    | Même ensemble de résultats                                                             | Différence artificielle liée à la casse                      |
| Mot accentué vs non accentué          | Même ensemble si la politique choisie ignore les accents                               | Résultat incomplet en français                               |
| Terme présent seulement dans la stack | Projet trouvé                                                                          | Recherche limitée au titre par accident                      |
| Espaces au début/à la fin             | Comportement défini et testé                                                           | Résultat surprenant dû à la normalisation                    |
| Requête vide ou blanche               | Contrat explicite : aucun résultat ou liste contrôlée, mais pas un catalogue inattendu | Fuite d'un catalogue complet, coût inutile ou UX incohérente |
| Entrée non-chaîne / `null`            | Type accepté ou rejet déterministe                                                     | Erreur incontrôlée ou coercition surprenante                 |

**Point important :** les exigences du projet initial ne déterminent pas toutes ces lignes. Lorsque l'énoncé ne tranche pas, écris une décision avant de coder et traite-la comme un contrat produit à faire confirmer, non comme une vérité implicite.

## 2. Exercice guidé : un test qui échoue pour la bonne raison

1. Écris d'abord un test pour la recherche d'un terme présent uniquement dans la stack.
2. Lance-le contre une implémentation qui ne recherche que le titre ; vérifie que le test échoue.
3. Corrige le comportement.
4. Refais passer l'ensemble, puis renomme le test pour décrire le comportement au lieu de décrire la fonction interne.
5. Retire temporairement la recherche dans la stack : le test doit échouer de nouveau.

**Correction attendue :** si le test reste vert après le retrait de la fonctionnalité, il ne protégeait pas le comportement attendu ou il n'exécutait pas le chemin concerné. Un test qui passe n'est informatif qu'au regard du défaut qu'il peut détecter.

## 3. Test de propriété et test d'exemple

Un exemple teste une entrée choisie ; une propriété décrit un invariant sur une famille d'entrées.

Propriétés candidates à tester pour une fonction de normalisation :

- idempotence : normaliser deux fois donne le même résultat que normaliser une fois ;
- stabilité à la casse, si le contrat ignore effectivement la casse ;
- stabilité aux accents, si le contrat ignore effectivement les accents ;
- absence de mutation des données de projets reçues en entrée ;
- déterminisme : même requête et même catalogue donnent le même résultat et le même ordre.

**Exercice :** génère des chaînes avec espaces, majuscules, accents combinés, ponctuation et chaîne vide. Écris une propriété, puis trouve une mutation du code qui la fait échouer.

**Correction attendue :** les propriétés doivent découler du contrat. Ne choisis pas « la liste ne change jamais d'ordre » si le contrat ne fixe pas cet ordre ; dans ce cas, vérifie plutôt l'ensemble des résultats puis définis séparément le tri attendu.

## 4. Mutation testing : la suite détecte-t-elle un vrai défaut ?

Choisis une mutation parmi :

- remplacer une comparaison de borne `>=` par `>` ;
- supprimer la normalisation des accents ;
- ignorer la stack dans la recherche ;
- retourner le premier résultat seulement ;
- modifier l'ordre déterministe à égalité.

Prédit quel test devrait échouer avant d'exécuter la mutation. Si aucun test ne réagit, ajoute le test le plus petit qui discrimine l'ancien comportement du comportement muté.

**Correction attendue :** une suite avec beaucoup de tests peut avoir peu de pouvoir discriminant. Le but n'est pas un pourcentage de mutation isolé ; il est d'identifier les comportements importants qui ne sont pas protégés. Une mutation équivalente ou sans rapport avec le contrat doit être documentée plutôt que comptée mécaniquement comme une lacune.

## 5. Choisir le bon niveau de test

Classe chaque défaut et justifie le niveau de test le moins coûteux qui donne une preuve suffisante :

1. une fonction qui normalise les accents est incorrecte ;
2. la route HTTP oublie d'appeler l'autorisation ;
3. un client interprète mal le schéma d'erreur renvoyé par l'API ;
4. l'application réussit en test mais échoue lorsque la base de données est lente ;
5. un changement de schéma casse une ancienne version qui tourne encore.

**Correction de référence :** 1) test unitaire/property ; 2) test d'intégration HTTP avec un cas d'autorisation négatif ; 3) test de contrat entre producteur et consommateur ; 4) intégration/charge avec dépendance contrôlée et limites de délai ; 5) migration et compatibilité de versions en intégration, éventuellement avec test de restauration. Ces catégories peuvent se chevaucher ; choisir un niveau ne dispense pas d'autres vérifications si l'invariant est traversant.

## 6. Doubles de test : ce qu'ils prouvent et ce qu'ils masquent

Un faux contrôlé permet de simuler un timeout, une réponse invalide ou une panne rare. Il vérifie que le code réagit comme prévu à ce scénario. Il ne prouve pas que le vrai fournisseur respecte le contrat, que le réseau se comporte comme le faux ou que la configuration réelle est correcte.

**Exercice :** pour le client LLM de référence, classe chaque propriété comme testable avec transport simulé, test de contrat avec fournisseur, ou preuve opérationnelle : parsing JSON, timeout/abort, authentification du fournisseur, facture réelle, rétention du fournisseur, disponibilité, taille maximale de réponse et qualité sémantique.

**Correction de référence :** le parsing, la borne de taille et les voies timeout/fallback sont testables avec un faux transport ; compatibilité du fournisseur et authentification nécessitent un test de contrat contrôlé ; disponibilité et facture réelles demandent des observations dans le contexte correspondant. Pour la rétention ou l'usage des données, il faut des engagements/documentation fournisseurs et un examen de configuration, pas un test unitaire.

## 7. Épreuve cumulative

Prends une fonctionnalité du fil rouge. Le formateur ou toi-même introduisez un défaut discret sans révéler lequel : borne fausse, branche absente, accès trop large, retry non idempotent, migration incompatible ou budget ignoré.

Livrables :

- le contrat écrit avant d'inspecter le défaut ;
- un test ou une mesure qui échoue contre le défaut ;
- une correction limitée au bon composant ;
- tests positifs, négatifs et cas limites ;
- explication de ce que la suite ne prouve pas ;
- une variante de transfert qui oblige à réévaluer le choix.

## Barème d'évaluation

| Axe             | 0                                | 2                       | 4                                                               |
| --------------- | -------------------------------- | ----------------------- | --------------------------------------------------------------- |
| Contrat         | Aucun comportement attendu       | Cas nominaux explicités | Hypothèses et cas ambigus isolés avant l'implémentation         |
| Pouvoir du test | Test décoratif                   | Détecte le défaut connu | Mutation plausible détectée et limites identifiées              |
| Niveau de test  | Tout en unitaires ou tout en E2E | Mix raisonnable         | Chaque test couvre une frontière justifiée et minimise le bruit |
| Diagnostic      | Modifications au hasard          | Cause plausible testée  | Hypothèses départagées, correction minimale et preuve après fix |
| Transfert       | Même entrée répétée              | Variante proche         | Contrainte changée, propriété réévaluée et solution adaptée     |

Un zéro sur un invariant de sécurité ou d'intégrité des données bloque la maîtrise, même si les autres axes sont élevés.

## Suite logique

Après ce laboratoire, reprends [Testing](../02-CONSTRUCTION/03-TESTING/README.md), applique la méthode à ton fil rouge, puis utilise [59 : DevOps/SRE](59-LAB-DEVOPS-LIFECYCLE.md) et [60 : Service IA/RAG](60-LAB-SERVICE-IA-END-TO-END.md) pour vérifier que tes tests protègent aussi le système en dehors du processus unitaire.

<!-- AF-DIAGRAM:contract -->

## Repère visuel utile : Compatibilité API entre client et fournisseur

```text
client version N -> contrat publié <- API version N
        |                         |
        v                         v
 test consommateur       vérification fournisseur
        |                         |
        +-----------+-------------+
                    v
             pipeline compatible
                    |
           +--------+--------+
           v                 v
         PASS              BREAK
```

<!-- AF-LESSON-PROFILE: contract -->

## Repères de décision

- **Pourquoi :** Les tests de contrat vérifient que deux composants indépendants restent compatibles sur leurs échanges, sans devoir lancer tout le système à chaque changement.
- **Quand l’utiliser / quand l’éviter :** Utilise-les quand un client et un fournisseur évoluent séparément ou sont déployés à des rythmes différents. Ne les confonds pas avec des tests unitaires ni avec une preuve complète d'intégration.
- **Limites :** Un contrat ne prouve que les interactions décrites. Il ne prouve pas les performances, la sécurité globale, la sémantique métier non modélisée ni la compatibilité de toutes les versions possibles.

## Mécanisme : la version sans magie

Le consommateur décrit les interactions attendues ; le fournisseur vérifie qu'il les satisfait ; le contrat versionné est exécuté dans le pipeline des deux côtés.

## Ancrage produit / terrain : Kintana

Dans [Kintana](77-FIL-ROUGE-KINTANA/README.md), **63 : Laboratoire de tests : spécifier, falsifier et préserver un contrat** se rattache à ce cas concret : Le client mobile Kintana peut rester plusieurs versions derrière l'API. Un changement de champ ou d'erreur doit être détecté avant déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Compatibilité API entre client et fournisseur

> **Arc One Piece / Grand Line :** un contrat d'API est une promesse entre équipages. Si le fournisseur change sa réponse sans prévenir, le client échoue en mer.

**Mission liée à « 63 : Laboratoire de tests : spécifier, falsifier et préserver un contrat » :** Définis un contrat pour une opération Kintana consommée par le client web/mobile. Ajoute les réponses nominales, erreurs stables, champs obligatoires/optionnels et une version de contrat. Fais vérifier le contrat par le fournisseur et simule un client ancien.

**Livrable :** contrat OpenAPI ou pacte consommateur-fournisseur, fixtures, vérification côté fournisseur et test de compatibilité d'une ancienne version.

**Critères d’acceptation :** la rupture intentionnelle échoue dans le test ; les erreurs et champs sont documentés ; le contrat reflète le comportement réellement implémenté ; les limites non couvertes sont nommées.

**Transfert obligatoire :** Le fournisseur ajoute un champ ou change un code d'erreur. Décide si l'évolution est compatible et teste le déploiement dans l'ordre inverse.
