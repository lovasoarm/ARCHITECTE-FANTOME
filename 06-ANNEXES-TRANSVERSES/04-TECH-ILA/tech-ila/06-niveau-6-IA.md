---
companion: ce parcours
stability: stable
acte: comprendre
---

> **SCÈNE CRAZYDEVS : salle des machines :** un modèle peut proposer une réponse, appeler un outil ou déclencher une action. Le système reste responsable de vérifier ce qui entre, ce qui sort et ce qui a le droit de se produire.

[← Sommaire TECH-ILA](../README.md) · [← Cartes du parcours](08-cartes-parcours-technologies.md) · [Exercices IA, marché et audit →](08-IA-exercices-marche-audit.md)

# Niveau 6 : Ingénierie des systèmes intégrant de l'IA

Temps de lecture ~22 min

## 1. Le modèle n'est qu'un composant

Un système d'IA utile ne se résume pas à un appel HTTP vers un modèle. Il comporte une entrée, un contexte, une décision de routage, un modèle ou un outil, une validation, une gestion des erreurs et une personne ou un système responsable du résultat.

```text
demande
  │
  ▼
validation + identité + autorisation
  │
  ▼
contexte utile (données / documents / historique)
  │
  ▼
modèle ou outil adapté
  │
  ▼
validation du résultat + garde-fous
  │
  ├── résultat accepté ─► réponse / action autorisée
  └── résultat douteux ─► correction / abstention / revue humaine
```

Le modèle peut être remplacé. Les obligations de sécurité, de confidentialité, de traçabilité et de responsabilité ne disparaissent pas.

## 2. Choisir la bonne forme d'IA

| Besoin                                  | Forme souvent suffisante                      | Risque à surveiller                                       |
| --------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Classer ou extraire une information     | Modèle avec schéma de sortie et validation    | Sortie invalide ou classification incertaine              |
| Répondre à partir de documents internes | Recherche + contexte récupéré (RAG) + modèle  | Mauvais document, document obsolète, fuite inter-tenant   |
| Calculer ou consulter une donnée fiable | Fonction métier ou API déterministe           | Confier un calcul exact au texte généré                   |
| Agir sur un système                     | Outil étroit, autorisé et audité              | Action non autorisée, répétée ou irréversible             |
| Enchaîner plusieurs tâches              | Workflow explicite ; agent seulement si utile | Boucle, coût, latence et comportement difficile à prévoir |

Un workflow déterministe est souvent préférable à un agent autonome lorsque les étapes sont connues. Un agent devient intéressant quand il doit choisir dynamiquement parmi plusieurs actions, mais cette liberté exige des limites plus fortes.

## 3. RAG : retrouver avant de répondre

RAG signifie _Retrieval-Augmented Generation_ : le système récupère des passages pertinents puis les fournit au modèle comme contexte. Le modèle ne « connaît » pas pour autant la vérité du dépôt documentaire.

**Chemin simplifié :**

```text
documents autorisés
   │ découpage + métadonnées
   ▼
index de recherche
   │ requête + filtres d'accès
   ▼
passages récupérés
   │ pertinence + fraîcheur + provenance
   ▼
contexte borné
   │
   ▼
réponse avec références vérifiables
```

À contrôler :

- provenance et date de chaque document ;
- filtrage des résultats selon les droits de l'utilisateur **avant** de les fournir au modèle ;
- séparation des tenants, y compris dans les caches et les index ;
- taille du contexte et priorité des passages ;
- réponse d'abstention lorsque les sources ne suffisent pas ;
- liens ou identifiants permettant de retrouver la source exacte.

Une citation générée par un modèle n'est pas une preuve. Le système doit pouvoir vérifier que la référence existe et que le passage soutient réellement la réponse.

## 4. Appels d'outils et agents

Un appel d'outil est une demande structurée du modèle à une fonction définie par l'application. Il ne doit pas être exécuté simplement parce que le modèle l'a demandé.

```text
modèle propose une action
          │
          ▼
schéma de paramètres valide ?
          │ oui
          ▼
utilisateur / service autorisé ?
          │ oui
          ▼
ressource dans le bon périmètre ?
          │ oui
          ▼
validation métier + limite de risque
          │
          ▼
exécution contrôlée + journal d'audit
```

Règles de conception :

1. Exposer uniquement les outils nécessaires ; pas de shell général ou d'accès global à la base par défaut.
2. Valider les paramètres côté serveur, même si le modèle fournit un JSON conforme.
3. Appliquer l'authentification et l'autorisation à chaque action, comme pour une requête humaine.
4. Prévoir une confirmation explicite pour les actions sensibles, coûteuses, externes ou irréversibles.
5. Rendre les actions rejouables sans effets en double lorsque c'est possible (clé d'idempotence, contrôle d'état).
6. Limiter nombre d'étapes, durée, budget, taille des réponses et domaines accessibles.
7. Traiter les documents, pages Web et résultats d'outils comme des données non fiables, jamais comme des instructions privilégiées.

## 5. Évaluer le système, pas seulement la réponse choisie

Un exemple qui marche une fois ne mesure pas la qualité. Construis un jeu de cas représentatif, versionné et séparé de ceux qui servent à régler les prompts.

| Dimension    | Question d'évaluation                                                      | Exemple de mesure                                      |
| ------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| Exactitude   | La réponse est-elle soutenue par les sources ?                             | exactitude sur un jeu de référence, erreurs factuelles |
| Couverture   | Le système sait-il reconnaître les cas sans réponse ?                      | taux d'abstention correcte, faux refus                 |
| Récupération | Les bons passages sont-ils retrouvés ?                                     | recall@k, précision des passages                       |
| Sécurité     | Les instructions hostiles ou demandes hors périmètre sont-elles bloquées ? | tests d'injection, taux de fuite                       |
| Outils       | L'action et ses paramètres sont-ils corrects et autorisés ?                | taux d'appels valides, effets en double                |
| Robustesse   | Le comportement tient-il avec des entrées ambiguës ou longues ?            | tests adversariaux et cas limites                      |
| Exploitation | Le service reste-t-il soutenable ?                                         | latence, coût par tâche, erreurs, disponibilité        |

Sépare les erreurs de modèle des erreurs de données, de récupération, d'autorisation, d'interface et d'infrastructure. Une moyenne globale peut masquer une défaillance grave sur un cas rare.

## 6. Observabilité et maîtrise des coûts

Mesure au minimum : modèle et version, type de tâche, durée, nombre de tokens ou unité facturée, appels d'outils, statut, résultat de validation et raison d'abstention. Ne journalise pas par défaut des contenus sensibles, secrets, prompts contenant des données personnelles ou documents complets.

Prévois :

- limites par utilisateur, tenant et fonctionnalité ;
- cache compatible avec la confidentialité et la fraîcheur ;
- timeout et limite de taille pour chaque appel ;
- fallback ou réponse dégradée en cas de panne du fournisseur ;
- budget/quotas et alerte avant dépassement ;
- versionnage du prompt, des outils, du modèle et du jeu d'évaluation ;
- procédure de désactivation rapide d'une fonctionnalité dangereuse.

Le modèle le moins cher n'est pas toujours le moins coûteux si le taux d'échec, le besoin de reprise ou la latence augmentent. Mesure le coût d'une tâche réussie, pas seulement le prix d'un appel.

## 7. Ce qu'il ne faut pas déléguer aveuglément

- Une contrainte métier ambiguë doit être clarifiée, pas inventée.
- Un calcul monétaire, une règle d'accès ou une décision réglementée doit suivre un contrat déterministe et vérifiable.
- Une sortie plausible ne doit pas devenir automatiquement une donnée persistée.
- Un outil ne doit pas obtenir des droits plus larges que l'utilisateur ou le service qui l'a déclenché.
- Un modèle ne doit pas être la seule source de preuve d'une action qu'il prétend avoir réalisée.

## 8. Repères de fraîcheur

Les modèles, prix, API, limites, noms de produits et comportements évoluent rapidement. Les mécanismes (provenance, validation, autorisation, évaluation, observabilité, limitation) sont plus durables que les noms d'outils.

Pour les tendances d'usage, le [Stack Overflow Developer Survey 2026 : données IA](https://survey.stackoverflow.co/2026/ai/data) présente les dénominateurs par question. Pour les exigences réglementaires, reviens au texte de l'AI Act et à la fiche [RGPD et AI Act](../../../03-PILOTAGE/04-SECURITY/07-privacy_and_data_regulation.md) : une page de technologie ne remplace pas une qualification juridique.

**Preuve de compréhension :** propose une architecture qui utilise un modèle pour résumer des demandes client, mais interdit toute lecture inter-tenant et toute modification de compte sans contrôle serveur et confirmation. Présente trois cas où le système doit s'abstenir.

[← Sommaire TECH-ILA](../README.md) · [Exercices IA, marché et audit →](08-IA-exercices-marche-audit.md)
