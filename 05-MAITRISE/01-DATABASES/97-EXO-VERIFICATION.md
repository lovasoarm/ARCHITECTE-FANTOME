---
stability: stable
acte: pratiquer
cognitive_level: L5
assessment_role: executable_checkpoint
---

# Exercice 97 : Laboratoire PostgreSQL : supprimer avec un périmètre vérifié

**SGBD obligatoire pour ce laboratoire : PostgreSQL 15 ou supérieur.** Les exemples utilisent la syntaxe PostgreSQL. Ils ne doivent pas être transposés tels quels à MySQL, SQLite ou SQL Server.

Cet exercice fait suite à [l’analyse de risque multi-tenant](09-EXO-VERIFICATION.md). Ici, tu dois préparer puis exécuter une opération contrôlée sur une base de laboratoire jetable. N’exécute jamais cet exercice sur une production ou sur des données personnelles réelles.

## 1. Schéma de laboratoire

Dans une base locale de test, crée un schéma minimal :

```sql
CREATE TABLE IF NOT EXISTS sessions (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id   BIGINT NOT NULL,
    user_id     BIGINT NOT NULL,
    expires_at  TIMESTAMPTZ NOT NULL,
    revoked_at  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO sessions (tenant_id, user_id, expires_at, revoked_at)
VALUES
    (42, 1001, TIMESTAMPTZ '2026-07-01 00:00:00+00', TIMESTAMPTZ '2026-07-02 00:00:00+00'),
    (42, 1002, TIMESTAMPTZ '2026-10-20 00:00:00+00', NULL),
    (42, 1003, TIMESTAMPTZ '2026-10-10 00:00:00+00', TIMESTAMPTZ '2026-10-11 00:00:00+00'),
    (84, 2001, TIMESTAMPTZ '2026-07-01 00:00:00+00', TIMESTAMPTZ '2026-07-02 00:00:00+00');
```

La politique fictive de ce laboratoire est évaluée à la date de référence du `2026-10-30` : seule une session expirée avant le `2026-09-30` et déjà révoquée peut être purgée. L'opération vise uniquement le tenant `42`. Le tenant `84` ne doit jamais être touché par cette opération.

## 2. Pourquoi `LIMIT` n'est pas la solution

PostgreSQL n'accepte pas une clause `LIMIT` directement dans la syntaxe `DELETE`. On ne doit donc pas écrire `DELETE FROM sessions WHERE ... LIMIT 100` en PostgreSQL. Pour supprimer un lot borné, on sélectionne d’abord les identifiants dans une CTE (Common Table Expression, sous-requête nommée), puis on supprime en rejoignant ces identifiants.

Un `LIMIT` sur un échantillon de vérification ne constitue pas une limite de suppression. La sélection utilisée par l’opération destructive doit elle-même être bornée.

## 3. Flux de suppression sécurisée

```text
Intention métier
      |
      v
Vérifier le tenant et le filtre métier
      |
      v
Compter + examiner les lignes candidates
      |
      v
Comparer au seuil autorisé / obtenir validation
      |
      v
BEGIN : démarrer la transaction
      |
      v
Exécuter DELETE avec le même périmètre
      |
      v
Examiner RETURNING + contraintes + effets métier
      |
      +---- anomalie / doute ----> ROLLBACK
      |
      v
Vérifier les invariants post-opération
      |
      +---- invariant faux ------> ROLLBACK
      |
      v
COMMIT : rendre la suppression durable
      |
      v
Journaliser et vérifier après opération
```

Une transaction permet d’annuler les changements **avant** le `COMMIT`. Après un `COMMIT` réussi, `ROLLBACK` ne restaure pas les lignes déjà validées. La récupération dépend alors d’une sauvegarde, d’une restauration à un instant donné (PITR), d’une réplication exploitable ou d’une autre stratégie documentée. Une transaction ne remplace donc ni le contrôle métier ni une stratégie de restauration.

## 4. Inspection avant écriture

Utilise exactement le même prédicat dans le comptage, la sélection et la suppression. Pour rendre le résultat reproductible, utilise un instant de référence explicite dans ce laboratoire :

```sql
SELECT count(*) AS candidate_count
FROM sessions
WHERE tenant_id = 42
  AND expires_at < TIMESTAMPTZ '2026-09-30 00:00:00+00'
  AND revoked_at IS NOT NULL;

SELECT id, tenant_id, user_id, expires_at, revoked_at
FROM sessions
WHERE tenant_id = 42
  AND expires_at < TIMESTAMPTZ '2026-09-30 00:00:00+00'
  AND revoked_at IS NOT NULL
ORDER BY id;
```

Le résultat attendu sur le jeu de données initial est **une ligne candidate**, tenant `42`, utilisateur `1001`. La ligne du tenant `84` respecte aussi l'âge et la révocation mais doit rester exclue par la portée tenant ; la session `1003` est révoquée mais n'a pas dépassé le délai de 30 jours. Si ton résultat diffère, arrête-toi : vérifie le schéma, les données et le fuseau horaire avant toute suppression.

Dans un service réel, le tenant vient du contexte serveur authentifié et autorisé ; il ne doit pas être accepté comme vérité parce que le client l’a envoyé. Les paramètres de filtre doivent être liés (requête paramétrée), jamais concaténés dans une chaîne SQL.

## 5. Exécution en transaction : d’abord rollback

Le premier passage est une répétition à blanc logique : la requête s’exécute, le résultat est contrôlé, puis tu annules volontairement.

```sql
BEGIN;
SET LOCAL lock_timeout = '2s';
SET LOCAL statement_timeout = '10s';

DELETE FROM sessions
WHERE tenant_id = 42
  AND expires_at < TIMESTAMPTZ '2026-09-30 00:00:00+00'
  AND revoked_at IS NOT NULL
RETURNING id, tenant_id, user_id;

-- Attendu : une seule ligne, id de la session de l'utilisateur 1001.
-- Vérifie le résultat et les effets attendus avant de continuer.
SELECT count(*) AS remaining_candidates
FROM sessions
WHERE tenant_id = 42
  AND expires_at < TIMESTAMPTZ '2026-09-30 00:00:00+00'
  AND revoked_at IS NOT NULL;

ROLLBACK;
```

Après `ROLLBACK`, la ligne doit être présente de nouveau. Vérifie-le par `SELECT`. Si le nombre retourné par `DELETE ... RETURNING` est différent de l'attendu, ou si une contrainte/trigger a produit un effet inattendu, n’effectue pas de `COMMIT`.

## 6. Passage validé : uniquement après revue

Pour le second passage dans cette base jetable :

1. répète le comptage et l’inspection ;
2. confirme que le périmètre, le nombre attendu et le tenant sont inchangés ;
3. commence une nouvelle transaction ;
4. exécute la même suppression paramétrée ;
5. vérifie les identifiants retournés et les invariants ;
6. exécute `COMMIT` seulement si tout correspond au runbook ;
7. vérifie après validation que le tenant `84` et les sessions non ciblées sont intacts.

Un exemple d’opération applicative doit utiliser des paramètres, par exemple `tenant_id = $1`, `cutoff = $2`, et conserver la même condition métier dans la commande. Le code appelant doit comparer le nombre de lignes supprimées au nombre approuvé et interrompre le processus si le nombre diffère. Évite de faire passer un contrôle manuel pour une garantie automatique : un contrôle automatisé doit être codé et testé.

## 7. Suppression par lots sous PostgreSQL

Pour un grand volume, on peut verrouiller un lot d’identifiants et supprimer uniquement ce lot :

```sql
WITH batch AS (
    SELECT id
    FROM sessions
    WHERE tenant_id = 42
      AND expires_at < TIMESTAMPTZ '2026-09-30 00:00:00+00'
      AND revoked_at IS NOT NULL
    ORDER BY id
    LIMIT 100
    FOR UPDATE SKIP LOCKED
)
DELETE FROM sessions AS s
USING batch AS b
WHERE s.id = b.id
  AND s.tenant_id = 42
RETURNING s.id, s.tenant_id;
```

Le `LIMIT` borne ici les identifiants sélectionnés par la CTE ; il n’est pas placé directement dans `DELETE`. En production, le traitement par lots exige un protocole complet : boucle avec arrêt, métriques, contrôle de concurrence, taille du lot, durée, reprise, journalisation, validation de la politique et test sur une copie représentative. `SKIP LOCKED` évite d’attendre certaines lignes verrouillées, mais ne résout pas à lui seul les exigences métier.

## 8. Soft-delete, rollback et restauration : ne pas confondre

- **Hard-delete :** la ligne est physiquement supprimée de la table.
- **Soft-delete :** la ligne est conservée et marquée comme supprimée (par exemple `deleted_at`). Cette stratégie facilite certains besoins d’audit ou de restauration, mais impose de filtrer correctement les lignes non supprimées et de gérer leur rétention.
- **Rollback transactionnel :** annule des modifications non encore validées dans la transaction courante.
- **Restauration après commit :** nécessite une capacité de sauvegarde/restauration, PITR, archive ou reconstruction. Une transaction déjà validée n’est pas annulable par un simple `ROLLBACK`.

Le choix hard-delete / soft-delete dépend de la rétention, de la confidentialité, des obligations d’effacement, du coût, des contraintes et des besoins d’enquête. Le soft-delete n’est pas une obligation universelle.

## 9. Contrôles opérationnels à documenter

Avant toute purge réelle, ton runbook doit spécifier : portée (table, tenant, période), motif métier, filtre exact, nombre attendu et seuil maximal, aperçu des identifiants, contraintes/cascades/triggers, sauvegarde testée et point de restauration, durée de verrouillage, compte de service à privilèges minimaux, journal d’audit (acteur, motif, paramètres non secrets, nombre de lignes, horodatage, identifiant de job), procédure d’arrêt, procédure de rollback avant commit et de restauration après commit.

Une protection supplémentaire peut être placée dans une procédure stockée ou un rôle de base limité. La Row-Level Security peut contribuer à l’isolation, mais elle doit être configurée et testée avec le rôle réellement utilisé par l’application ; un rôle privilégié ou propriétaire peut avoir des comportements différents. La sécurité ne doit jamais reposer sur une seule couche.

## Exercice progressif

1. Reproduis le jeu de données et retrouve le nombre attendu.
2. Fais le passage `BEGIN` → `DELETE RETURNING` → `ROLLBACK` et prouve que la ligne revient.
3. Ajoute un scénario où le tenant vient d’une session serveur simulée et ne peut pas être fourni librement par l’utilisateur.
4. Écris un test qui échoue si une session du tenant `84` est supprimée.
5. Ajoute un seuil d’arrêt : si le nombre retourné diffère du nombre approuvé, l’application ne valide pas l’opération.
6. Rédige le runbook de reprise après `COMMIT` accidentel.

## Auto-évaluation différée

| Point              | Preuve attendue                                                                 |
| ------------------ | ------------------------------------------------------------------------------- |
| Syntaxe PostgreSQL | Pas de `LIMIT` directement après `DELETE`                                       |
| Périmètre          | Tenant et critères métier présents dans chaque phase                            |
| Nombre             | Comptage et aperçu avant écriture, contrôle du `RETURNING`                      |
| Transaction        | Le test démontre `ROLLBACK` avant commit et ne prétend pas annuler après commit |
| Concurrence        | Limites de verrouillage et concurrence expliquées                               |
| Récupération       | Runbook de restauration après commit documenté                                  |
| Sécurité           | Paramètres liés, privilèges minimaux, audit et protection tenant                |

**Réussite :** aucun critère critique n’est manquant et tous les tests qui protègent le tenant non ciblé passent. Une requête « qui marche » sans procédure de vérification ni reprise n’est pas une preuve de maîtrise.

## Sources techniques à consulter

- [PostgreSQL : DELETE](https://www.postgresql.org/docs/current/sql-delete.html)
- [PostgreSQL : Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [PostgreSQL : Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

## Lien dans le parcours

- Avant : [SQL basics](02-sql_basics.md), [exercice d’analyse de risque](09-EXO-VERIFICATION.md).
- Après : [challenge Databases](95-challenge.md), puis les modules sécurité et fiabilité.

## Preuve de maîtrise

Fournis le script SQL, les résultats avant/après, le test de non-régression inter-tenant, le runbook de restauration et une courte défense orale ou écrite expliquant pourquoi la transaction ne suffit pas après `COMMIT`.
