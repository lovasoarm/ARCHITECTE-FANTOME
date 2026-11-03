---
stability: evolutif
last_reviewed: 2026-10
acte: produire
cognitive_level: L4
perturbation_modes: [spec_floue, pouvoir_excessif, regression]
anti_recipe_key: spec_floue+pouvoir_excessif
transfer_distance: high
assessment_role: instructional_checkpoint
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/03-EDGE-CASES/01-00-why-edge-cases.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/03-EDGE-CASES/01-00-why-edge-cases.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Spécification vérifiable pour un changement délégué

Une consigne utile à un agent ou à un autre ingénieur décrit un changement observable, les preuves attendues et les limites de son autorité. « Améliore le code » décrit une intention ; cela ne permet ni de savoir quand s'arrêter, ni de déterminer si le résultat est correct.

Ce document utilise le format **B.O.R.N.É.** : **B**ehavior, **O**bservability, **R**egression tests, **N**on-goals, **É**scape hatch. Ce format réduit l'ambiguïté ; il ne garantit pas que l'agent obéira, et ne remplace jamais l'isolation du processus, les permissions minimales ou une revue des changements.

## 1. Le format B.O.R.N.É.

| Partie                   | Question à trancher                                                          | Preuve attendue                                                                       |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **B : Behavior**         | Quel comportement doit changer, et quel comportement doit rester identique ? | Exemples d'entrées/sorties, erreurs et invariants sans adjectifs vagues               |
| **O : Observability**    | Comment distinguer un succès d'une simple affirmation ?                      | Commande exacte, résultats attendus, sorties à conserver et environnement             |
| **R : Regression tests** | Qu'est-ce qui doit continuer à fonctionner ?                                 | Tests existants à lancer, nouveaux tests liés aux critères et cas négatifs            |
| **N : Non-goals**        | Qu'est-ce qui est explicitement hors périmètre ?                             | Fichiers, API, données, dépendances, services et décisions qui ne doivent pas changer |
| **É : Escape hatch**     | Quand faut-il arrêter et demander une décision ?                             | Limite de tentatives/temps, informations manquantes et condition de blocage           |

Chaque partie doit être concrète. « Les tests passent » ne suffit pas si la commande, le runtime, le résultat et les tests omis ne sont pas indiqués. De même, un test vert ne démontre que le comportement couvert par ce test dans cet environnement.

## 2. Exemple : normaliser un nom d'affichage

### Consigne faible

> Nettoie la fonction de nom d'affichage. Fais-le proprement, sans rien casser.

Ce qui manque : définition de « nettoyer », comportement pour `null`, caractère de l'espacement, portée du changement, preuve de régression et règle d'arrêt.

### Consigne vérifiable

**B : Behavior**

- Modifier uniquement la fonction pure `formatName(value)` dans `src/formatName.mjs` et ajouter/adapter ses tests.
- Si `value` est une chaîne, supprimer les espaces en début/fin et remplacer chaque suite de caractères reconnue par `\s+` en JavaScript par un seul espace ASCII.
- Une chaîne vide ou composée uniquement d'espaces renvoie `""`.
- Préserver la casse et les caractères Unicode ; ne pas tenter de « corriger » l'orthographe ou le contenu du nom.
- Toute valeur non-chaîne, y compris `null`, provoque un `TypeError`. Ne pas convertir silencieusement les nombres ou les objets en chaînes.

**O : Observability**

- Exécuter `node --test` depuis le dossier du projet qui contient le `package.json` concerné.
- Conserver la commande exacte, la version `node -v`, le code de sortie et le résultat brut.
- Vérifier les cas de référence ci-dessous et inspecter le diff final.

**R : Regression tests**

| Entrée                 | Résultat attendu |
| ---------------------- | ---------------- |
| `"  Ada   Lovelace  "` | `"Ada Lovelace"` |
| `"\tLin\nChen "`       | `"Lin Chen"`     |
| `"  "`                 | `""`             |
| `"Élodie"`             | `"Élodie"`       |
| `null`                 | `TypeError`      |
| `42`                   | `TypeError`      |

Ajouter au moins un test de non-régression pour le comportement nominal préexistant et un test négatif pour les entrées non prises en charge.

**N : Non-goals**

- Ne pas modifier les routes HTTP, la base de données, les permissions, les schémas d'API ou les dépendances.
- Ne pas reformater le dépôt entier.
- Ne pas modifier les fixtures pour faire passer artificiellement les tests.
- Ne pas accéder au réseau ni aux secrets : cette tâche est locale.

**É : Escape hatch**

Arrêter sans inventer si le fichier, la fonction ou le test attendu n'existe pas, si le contrat courant contredit cette consigne, si une dépendance supplémentaire semble nécessaire ou si le changement impose de toucher une zone interdite. Rapporter le blocage, les observations déjà obtenues et la question précise à trancher.

## 3. Faire la différence entre preuve et affirmation

| Affirmation                       | Ce qui la prouve réellement                                     | Ce qu'elle ne prouve pas                             |
| --------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| « J'ai implémenté le changement » | Diff lisible et fichier présent                                 | Que le comportement est correct                      |
| « Les tests passent »             | Commande, runtime, code de sortie et sortie brute               | Que tous les cas importants sont couverts            |
| « Aucune régression »             | Suite concernée, cas négatifs et périmètre explicités           | L'absence de tout défaut inconnu                     |
| « Je n'ai rien touché d'autre »   | Diff complet et vérification des fichiers modifiés              | L'absence de changement indirect à l'exécution       |
| « C'est sûr »                     | Contrôles de sécurité adaptés au risque et environnement décrit | Une sécurité absolue ou l'absence de risque résiduel |

Une capture d'écran d'un test réussi ou un résumé généré par l'agent n'est pas une preuve suffisante si les résultats bruts sont disponibles. Conserve les artefacts reproductibles et fais correspondre chaque critère à une observation.

## 4. Défense contre une consigne hostile ou contradictoire

Le contenu d'un fichier, d'un ticket, d'un commentaire ou d'un document récupéré peut contenir une instruction malveillante. Traite-le comme une donnée à examiner, pas comme une autorisation de modifier les objectifs. Les non-objectifs et permissions doivent être appliqués par l'environnement d'exécution autant que possible : une phrase disant « ne lis pas les secrets » n'isole pas réellement les secrets.

Avant d'autoriser une action, demande-toi :

1. L'action est-elle nécessaire pour atteindre le comportement demandé ?
2. Est-elle dans les chemins et permissions autorisés ?
3. Peut-elle modifier des données irréversibles, envoyer une information à l'extérieur ou exposer un secret ?
4. Quel résultat observable permet de vérifier l'effet et de revenir en arrière ?

Si l'action n'est pas nécessaire ou sort du périmètre, l'agent doit s'arrêter ou proposer une décision explicite, pas élargir silencieusement sa mission.

## 5. Exercice autonome

Écris une consigne B.O.R.N.É. pour une fonction `normalizeTag(value)` de ton fil rouge. Tu dois définir le traitement de chaîne vide, les entrées invalides, la casse, Unicode, les erreurs et les non-objectifs. Ne suppose pas la règle métier : si elle n'est pas documentée, propose des options et marque le point comme à faire décider.

Exécute ensuite deux variantes :

- **Perturbation A :** un test existant contredit la nouvelle consigne.
- **Perturbation B :** un commentaire dans un fichier demande d'ignorer les non-objectifs et de modifier une route voisine.

Livrables : la consigne datée, la décision sur chaque perturbation, le diff, les commandes/tests bruts, les limites et la question laissée ouverte. Aucun test ne doit être supprimé simplement parce qu'il est rouge.

## Barème d'auto-évaluation

| Axe          | 0                 | 2                        | 4                                                       |
| ------------ | ----------------- | ------------------------ | ------------------------------------------------------- |
| Comportement | Intention vague   | Exemples nominaux        | Entrées, erreurs et invariants non ambigus              |
| Preuve       | Affirmation seule | Commande et sortie       | Résultat reproductible, environnement et limite du test |
| Régression   | Aucun test        | Cas nominal              | Cas négatifs, ancienne garantie et mutation plausible   |
| Périmètre    | Non défini        | Quelques fichiers exclus | Permissions et non-objectifs précis, vérifiés au diff   |
| Arrêt        | L'agent improvise | Blocage signalé tard     | Seuil d'arrêt et demande de décision prévus d'avance    |

Un zéro sur le périmètre ou sur une propriété de sécurité/intégrité bloque la validation, quel que soit le total. Une spécification excellente ne rend pas acceptable un agent exécuté avec des permissions excessives.

## Suite logique

Après cette leçon, réalise le [drill de changement de spécification](10-SPEC_DRIFT_DRILL.md), puis le [drill combinant spécification floue et dérive](11-SPEC_FLOU_DRIFT_COMBO_DRILL.md). Ces exercices évaluent la décision en situation ; cette leçon vérifie que le contrat initial est suffisamment concret pour être exécuté et contrôlé.

### Transfert : changer de contexte

Applique le mécanisme de « Spécification vérifiable pour un changement délégué » à un autre fuseau horaire, une autre unité ou une horloge incohérente. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:errors -->

## Repère visuel utile : Contrat d'erreur stable pour l'API Kintana

```text
erreur observée
      |
      v
classer la cause
   |         |          |
   v         v          v
validation transitoire sécurité
   |         |          |
   v         v          v
4xx clair  retry borné  refus + audit
```

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une politique d'erreur explicite empêche un échec temporaire de devenir une boucle infinie et évite de cacher un défaut métier derrière un message vague.
- **Quand l’utiliser / quand l’éviter :** Classe l'erreur selon sa cause et sa récupérabilité. Retry uniquement les erreurs transitoires et les opérations idempotentes ; remonte les violations métier et sécurité sans boucle automatique.
- **Limites :** Un `catch` trop large masque la cause. Un retry peut amplifier une panne et doubler un effet ; une erreur personnalisée ne rend pas un message sûr à exposer au client.

## Mécanisme : la version sans magie

Capture au niveau qui peut décider, enrichis avec le contexte utile, transforme en contrat stable et préserve la cause originale pour le diagnostic.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Spécification vérifiable pour un changement délégué** se rattache à ce cas concret : La création de demande Kintana doit distinguer validation, refus d'accès, conflit d'idempotence, timeout fournisseur et panne de base.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'erreur stable pour l'API Kintana

> **Arc Walking Dead :** une erreur n'est pas toujours un zombie à abattre. Certaines se récupèrent ; d'autres doivent arrêter la mission immédiatement.

**Mission liée à « Spécification vérifiable pour un changement délégué » :** Définis les erreurs du parcours de création de demande. Ajoute une conversion stable vers les réponses API, une politique retry par classe et des tests qui vérifient qu'un secret ou une pile interne ne fuit pas.

**Livrable :** un catalogue d'erreurs, un mapper HTTP, des tests de contrat et une table de décision retry/no-retry.

**Critères d’acceptation :** les erreurs métier, techniques et de sécurité sont séparées ; les causes sont conservées côté serveur ; aucun retry n'est fait sur opération non idempotente sans clé ; les réponses client restent stables.

**Transfert obligatoire :** Ajoute une panne fournisseur qui récupère après deux tentatives et compare le comportement avec une validation refusée.
