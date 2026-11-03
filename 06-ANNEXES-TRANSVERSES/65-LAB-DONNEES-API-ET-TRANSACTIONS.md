---
stability: evolutif
acte: pratiquer
noyau: renfort
route: formation-complete
prerequis:
  - 02-CONSTRUCTION/19-API-CRAFT/README.md
  - 05-MAITRISE/01-DATABASES/README.md
  - 02-CONSTRUCTION/03-TESTING/README.md
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 06-ANNEXES-TRANSVERSES/01-COMMENT-UTILISER-LE-PARCOURS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 65 : Laboratoire données, API et transactions

> Objectif : traverser une frontière applicative de bout en bout et prouver les garanties réelles. Ce laboratoire ne suppose ni fournisseur de base précis ni framework HTTP : l'apprenant commence par le contrat, puis mappe les garanties sur l'outil choisi.

## Résultats attendus

À la fin, l'apprenant doit pouvoir :

- écrire un contrat d'API qui distingue validation, autorisation, conflit et panne temporaire ;
- expliquer la différence entre validation en mémoire, atomicité locale et effet externe ;
- reproduire une course concurrente au lieu de se fier à un test séquentiel ;
- concevoir une stratégie d'idempotence dont la portée et la durée sont explicites ;
- faire évoluer un schéma sans supposer qu'une seule version du service tourne ;
- fournir des tests de contrat, des cas négatifs et des preuves de reprise.

## Atelier A : Contrat HTTP avant implémentation

### Contrat de départ

Un client soumet une demande de réservation avec `resourceId`, `startAt` et une clé d'idempotence. L'API doit renvoyer un identifiant stable si la même demande est répétée, et ne doit pas réserver deux fois la même ressource sur le même créneau.

Avant de coder, définis :

1. champs obligatoires, format et fuseau horaire ;
2. règles d'autorisation (qui peut réserver pour qui ?) ;
3. conflit de créneau et erreur de validation ;
4. portée de la clé d'idempotence : utilisateur, opération, fournisseur, ou autre ;
5. durée de conservation de la clé ;
6. comportement lorsqu'une clé est réutilisée avec un corps différent ;
7. champs de réponse autorisés et données à ne pas exposer ;
8. signaux permettant de diagnostiquer une requête échouée.

### Décision attendue

Une clé d'idempotence ne doit pas être une simple « valeur présente dans le header ». Le contrat doit expliquer quel acteur peut l'utiliser, sur quel type d'opération, pendant combien de temps, et quel résultat renvoyer lors d'une répétition. Une même clé avec un contenu différent doit être rejetée ou gérée selon une politique explicite ; elle ne doit pas silencieusement transformer la demande initiale.

### Exercice indépendant

Écris au minimum six cas de contrat : création valide, corps invalide, identité non autorisée, conflit métier, répétition identique, réutilisation de clé avec contenu différent. Écris-les d'abord comme tableau d'exemples, puis automatise-les à la frontière HTTP ou au niveau du service selon ce qui est réellement disponible.

**Correction de référence :** les tests affirment le comportement externe, pas le détail privé d'une fonction. La réponse exacte (par exemple 400/401/403/409/422) dépend du contrat et des conventions retenues ; la cohérence, la sécurité et la documentation comptent plus que le choix d'un code par mimétisme. Aucun code ne doit être annoncé comme universel sans spécification.

## Atelier B : Course read-modify-write

### Exemple de raisonnement

Un compte a un solde de 100 unités. Deux requêtes lisent 100, chacune soustrait 80, puis écrit 20. Si les opérations ne sont pas protégées, les deux réponses peuvent annoncer une réussite alors qu'un retrait total de 160 a été accepté dans le modèle métier. La lecture puis l'écriture séparées ne sont pas une opération atomique.

```text
T1: lire solde = 100
T2: lire solde = 100
T1: vérifier 80 <= 100
T2: vérifier 80 <= 100
T1: écrire 20
T2: écrire 20
Résultat visible : 20 ; effets métier acceptés : 160
```

La valeur finale seule ne révèle pas le défaut : il faut aussi regarder les opérations acceptées, le journal de transactions et le contrat métier.

### Travail

Implémente une reproduction déterministe de cette course avec deux opérations. Puis compare au moins deux stratégies : verrou/transaction d'isolation adaptée, ou écriture conditionnelle atomique (par exemple mise à jour conditionnée par `balance >= amount`). Décris les garanties, limites, risques de contention et traitement de l'échec.

**Correction de référence :** la correction doit faire de la vérification de solde et de la mise à jour une unité atomique, ou employer une écriture conditionnelle dont le nombre de lignes affectées est vérifié. Une transaction au niveau applicatif ne protège rien si la base exécute les étapes hors transaction ou si l'isolement est insuffisant. Une erreur de conflit doit être traitée comme résultat attendu, pas rejouée aveuglément.

**Erreur éliminatoire :** affirmer « j'utilise une transaction » sans préciser le périmètre, le niveau d'isolation pertinent et le test de concurrence qui prouve le comportement.

## Atelier C : Effet externe, timeout et idempotence

### Incident

Une API appelle un prestataire de paiement. Le prestataire réalise l'opération, mais la réponse se perd. Le service local constate un timeout et le client réessaie.

### Modèle obligatoire

Dessine les états `RECEIVED`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED_CONFIRMED`, `OUTCOME_UNKNOWN` ou un modèle équivalent. Indique les transitions autorisées, ce qui est stocké durablement, et les actions de réconciliation. Sépare :

- la déduplication locale ;
- la garantie fournie par le prestataire ;
- la reprise après crash ;
- la résolution d'un état inconnu ;
- la compensation éventuelle d'un effet non réversible.

### Correction de référence

Un timeout indique que le service n'a pas reçu une réponse à temps ; il ne prouve ni l'échec ni le succès côté prestataire. Une clé stable doit être propagée au fournisseur si celui-ci garantit l'idempotence pour cette opération. Le service conserve une trace durable et doit pouvoir rechercher/reconcilier l'état après incertitude. Si le fournisseur ne propose aucune déduplication ou interrogation fiable, la conception doit exposer cette limite et définir une procédure métier de rapprochement : elle ne peut pas inventer « exactly once ».

### Exercice indépendant

Provoque le crash à trois frontières : avant l'appel externe, après l'effet mais avant la sauvegarde locale, et après la sauvegarde mais avant la réponse client. Pour chaque crash, prédis l'état après redémarrage puis vérifie le modèle. Les effets doivent être comptés, pas seulement les requêtes HTTP.

## Atelier D : Migration compatible pendant un déploiement

### Situation

Une ancienne version lit `status`, une nouvelle version lit `state`, et certaines lignes historiques ont une valeur imprévue. Les deux versions peuvent coexister pendant le déploiement et un rollback reste possible.

### Plan demandé

1. inventorier les versions, producteurs et consommateurs ;
2. définir la correspondance entre les deux champs et les données invalides ;
3. ajouter le nouveau champ sans casser l'ancienne version ;
4. remplir les anciennes lignes par lots idempotents, avec compteurs de réussite/échec ;
5. écrire ou lire de manière compatible pendant la transition si nécessaire ;
6. vérifier la parité et mesurer les anomalies ;
7. basculer les lecteurs ;
8. observer une fenêtre de stabilité ;
9. supprimer l'ancien champ seulement après preuve qu'il n'est plus consommé et que le rollback prévu n'en dépend plus.

**Correction de référence :** une stratégie « expand → migrate → contract » est un patron, pas une preuve automatique de sûreté. Le mapping doit être défini, les erreurs visibles et les opérations rejouables. Une migration non idempotente peut corrompre les données au second lancement. Une suppression trop tôt rend le rollback impossible ou mensonger.

**Transfert :** applique le plan à une API publique versionnée ou à un événement sur un bus consommé par deux générations de workers.

## Atelier E : Contrôle de qualité des tests

Pour chaque atelier, au moins :

- un cas nominal ;
- un cas invalide ;
- un test de frontière/limite ;
- une répétition ou une concurrence ;
- une panne injectée ;
- une assertion sur les effets persistés ;
- un test qui échoue sur la version défectueuse ;
- un transfert avec une hypothèse modifiée.

Les tests unitaires peuvent établir une règle locale, mais ne prouvent pas le comportement d'une base réelle, d'un fournisseur ou d'un réseau. Les tests d'intégration, de contrat et d'injection de panne couvrent d'autres frontières. Voir [63 : Testing Engineering](63-LAB-TESTING-ENGINEERING.md) pour une grille détaillée des preuves et limites.

## Grille de sortie

| Critère     | Preuve minimale                                   | Échec critique                                       |
| ----------- | ------------------------------------------------- | ---------------------------------------------------- |
| Contrat     | Exemples de requête/réponse et cas négatifs       | Contrat ambigu sur les erreurs ou la répétition      |
| Atomicité   | Course reproduite et testée après correction      | Deux opérations incompatibles toutes deux acceptées  |
| Idempotence | Répétition et crash testés à plusieurs frontières | Une répétition crée un double effet sans détection   |
| Migration   | Plan progressif, métriques et rollback testable   | Suppression prématurée ou données invalides masquées |
| Transfert   | Variante nouvelle, deux contraintes changées      | Copie du même scénario sans réviser les hypothèses   |
| Explication | Cause, preuve, limites et condition de révision   | « Ça marche chez moi » comme seule justification     |

Un critère critique ne peut pas être compensé par une moyenne élevée. En cas d'échec, refaire uniquement l'atelier concerné, puis exécuter un scénario de transfert différent.

## Livrable

Un mini-dossier contenant contrat, machine à états, reproduction de course, tests avant/après, plan de migration, décision d'arbitrage et liste des garanties non obtenues. Référence complémentaire : [61 : Pack d'exercices systèmes et arbitrages](61-PACK-EXERCICES-SYSTEMES-ET-ARBITRAGES.md).
