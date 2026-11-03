---
stability: evolutif
acte: vérifier
cognitive_level: L4
assessment_role: executable_code_review
last_reviewed: 2026-10-30
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/01-DATABASES/01-00-why-databases.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/01-DATABASES/01-00-why-databases.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# Exercice 10 : Empêcher l'injection SQL et préserver le périmètre tenant

**SGBD de référence : PostgreSQL 15+.** L'exemple applicatif utilise `node-postgres` (`pg`) et les paramètres positionnels `$1`, `$2`. Cet exercice est distinct du 09 (analyse du risque d'une suppression multi-tenant) et du 97 (transaction et purge PostgreSQL).

## Situation de production

Une route `GET /sessions?email=...` cherche les sessions d'un utilisateur. Le service est multi-tenant. Un développeur propose :

```js
// DANGEREUX : les données utilisateur deviennent du code SQL.
const sql = `SELECT id, email FROM sessions
             WHERE tenant_id = ${tenantId}
               AND email = '${email}'`;
const result = await pool.query(sql);
```

Une entrée contenant une apostrophe ou une expression SQL peut modifier la structure de la requête. Selon le contexte et les privilèges du compte, l'impact peut aller d'un contournement du filtre à une lecture non autorisée ou une modification destructive.

## Mécanisme exact

Une requête paramétrée sépare le texte SQL des valeurs. Le serveur reçoit la structure de la requête et les valeurs en paramètres ; une valeur utilisateur ne peut donc pas fermer une chaîne SQL pour injecter un opérateur ou une clause.

```js
// authenticatedTenantId provient du contexte serveur authentifié et autorisé.
// email est une donnée non fiable reçue du client.
const sql = `
  SELECT id, email
  FROM sessions
  WHERE tenant_id = $1
    AND email = $2
`;
const result = await pool.query(sql, [authenticatedTenantId, email]);
```

La paramétrisation ne remplace pas l'autorisation : `$1` doit être le tenant dérivé du contexte validé côté serveur. Ne fais jamais confiance à un `tenant_id` transmis librement par le navigateur.

### Paramètres et identifiants SQL

Les paramètres servent aux **valeurs**, pas aux noms de table, de colonne ou aux mots-clés. Pour un tri choisi par l'utilisateur, utilise une liste d'autorisation :

```js
const sortColumns = new Map([
  ["newest", "created_at"],
  ["expiry", "expires_at"],
]);
const sortColumn = sortColumns.get(requestedSort) ?? "created_at";
const sql = `
  SELECT id, email, created_at, expires_at
  FROM sessions
  WHERE tenant_id = $1 AND email = $2
  ORDER BY ${sortColumn} DESC
`;
const result = await pool.query(sql, [authenticatedTenantId, email]);
```

L'interpolation de `sortColumn` est acceptable ici uniquement parce qu'elle provient d'une table de correspondance constante écrite par le développeur. Ne concatène jamais un identifiant SQL brut fourni par le client.

### Cas particulier de `LIKE`

La paramétrisation neutralise l'injection SQL, mais les caractères `%` et `_` gardent leur sens de jokers dans `LIKE`/`ILIKE`. Si l'intention métier est une recherche littérale, échappe les jokers ainsi que le caractère d'échappement avant de construire le motif :

```js
const escapeLikeLiteral = (value) =>
  value.replace(/[\\%_]/g, (ch) => `\\${ch}`);
const pattern = `%${escapeLikeLiteral(email)}%`;
const result = await pool.query(
  `SELECT id FROM sessions WHERE tenant_id = $1 AND email ILIKE $2 ESCAPE E'\\\\'`,
  [authenticatedTenantId, pattern],
);
```

Teste au minimum les valeurs contenant `%`, `_` et `\`. La paramétrisation sépare toujours code et valeurs ; l'échappement des jokers répond à la sémantique de recherche, pas à l'injection. Injection et recherche littérale sont deux problèmes différents.

## Diagramme du traitement sûr

```text
Entrée HTTP non fiable
        |
        v
Validation du format de l'email
        |
        v
Identité authentifiée ----> tenant autorisé côté serveur
        |                              |
        +--------------+---------------+
                       v
           SQL fixe + paramètres liés
                       |
                       v
              PostgreSQL exécute
                       |
                       v
       Résultat borné par tenant + email
                       |
                       v
          Tests / audit / réponse API
```

La validation de format améliore l'expérience utilisateur, mais ce n'est pas la protection principale contre l'injection. La séparation SQL/paramètres et l'autorisation serveur portent les garanties essentielles.

## Exercice progressif

1. Explique précisément comment la concaténation transforme une donnée en syntaxe SQL.
2. Réécris la requête avec `$1` et `$2` sans changer sa structure SQL.
3. Remplace le tri dynamique par une allowlist `Map` de colonnes (qui n’hérite pas de propriétés comme `constructor`).
4. Ajoute un test de tri avec `requestedSort = "constructor"` puis `"newest"` et vérifie que seul le nom constant de colonne est interpolé. Ajoute aussi des tests littéraux pour `%`, `_` et `\`. Ajoute un test avec une chaîne telle que `' OR 1=1 --` et vérifie qu'elle est traitée comme une valeur, pas comme une condition.
5. Ajoute un test multi-tenant : une session d'un autre tenant ne doit jamais apparaître, même si l'email correspond.
6. Si tu utilises `LIKE`, ajoute un test séparé pour `%` et `_` afin de vérifier la sémantique attendue.

## Critères d'évaluation (10 points)

| Critère                 | Points | Réussite observable                                                                                                              |
| ----------------------- | -----: | -------------------------------------------------------------------------------------------------------------------------------- |
| Séparation code/données |      3 | Toutes les valeurs utilisateur sont liées ; tout identifiant dynamique vient d'une allowlist constante ; aucun fragment SQL brut |
| Identité tenant         |      2 | Le tenant vient du contexte serveur ; un tenant fourni par le client est ignoré/rejeté                                           |
| Identifiant dynamique   |      2 | Le tri utilise une allowlist constante ; aucun identifiant SQL brut                                                              |
| Tests négatifs          |      2 | Injection de chaîne et fuite inter-tenant sont couvertes                                                                         |
| Limites `LIKE`          |      1 | L'effet de `%` et `_` est distingué de l'injection                                                                               |

**Seuil : 8/10**, sans défaut sur la paramétrisation ou l'isolation tenant. Un rapport écrit sans test ne valide pas les points de tests.

## Lien dans le parcours et preuve

- Avant : [SQL basics](02-sql_basics.md), [modélisation](04-data_modeling.md) et notions d'authentification/autorisation.
- À côté : [risque de suppression multi-tenant](09-EXO-VERIFICATION.md).
- Après : [laboratoire transactionnel PostgreSQL](97-EXO-VERIFICATION.md), puis [challenge Databases](95-challenge.md).

**Preuve attendue :** diff avant/après, tests exécutés ou mode papier explicitement marqué, origine du tenant expliquée et résultat observé pour les deux entrées hostiles. Ne prétends pas avoir testé PostgreSQL si seul le raisonnement a été vérifié.

## Références

- [PostgreSQL : commandes DELETE et paramètres de requêtes](https://www.postgresql.org/docs/current/sql-delete.html)
- [node-postgres : requêtes paramétrées](https://node-postgres.com/features/queries)
