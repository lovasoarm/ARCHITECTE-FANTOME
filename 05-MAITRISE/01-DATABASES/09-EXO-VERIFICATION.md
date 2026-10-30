---
stability: stable
acte: verification
cognitive_level: L4
assessment_role: risk_analysis
---

# Exercice 09 : Diagnostiquer une suppression dangereuse dans un système multi-tenant

**SGBD de référence : PostgreSQL.** Le scénario utilise une API JavaScript qui envoie une requête SQL à PostgreSQL. L’objectif de cet exercice n’est pas de mémoriser une règle isolée sur `WHERE` : il est d’évaluer la portée métier d’une opération destructive.

## Situation

Une équipe reçoit cette proposition d’un assistant de code :

```js
await db.query("DELETE FROM sessions");
```

Le commentaire associé dit : « purge quotidienne des sessions expirées, opération sans risque ».

La table `sessions` contient les sessions de plusieurs organisations clientes. Une session possède notamment `id`, `tenant_id`, `user_id`, `created_at`, `expires_at`, `revoked_at` et éventuellement `last_seen_at`.

## Ce que fait réellement la requête

Dans PostgreSQL, `DELETE FROM sessions;` supprime **toutes les lignes visibles de la table ciblée**. En l’absence de `WHERE`, la requête ne sélectionne aucune session particulière. Le nom de la table ne signifie pas « sessions expirées » : il signifie toutes les lignes de `sessions`.

Ce comportement peut invalider toutes les sessions de tous les tenants (espaces de données isolés de clients différents), y compris celles d’utilisateurs actifs. Il peut provoquer une déconnexion générale, une interruption d’activité, une charge de réauthentification et un incident de disponibilité.

Le commentaire, le nom de la fonction ou l’intention du développeur ne restreignent jamais la portée d’une instruction SQL.

## Analyse attendue

Réponds par écrit, sans assistant génératif, puis compare ta réponse à la grille différée.

1. **Portée physique :** quelles lignes la requête touche-t-elle réellement ?
2. **Portée métier :** quel événement autorise la suppression : expiration, révocation, fermeture de compte ou politique de rétention ? Ces événements ne sont pas interchangeables.
3. **Isolation tenant :** quel identifiant de tenant provient d’un contexte authentifié et vérifié côté serveur ? Pourquoi ne faut-il pas faire confiance à un `tenant_id` librement fourni par le client ?
4. **Nombre de lignes :** comment vérifier le nombre et un échantillon des lignes candidates avant d’écrire ? Quel seuil doit interrompre l’opération ?
5. **Contraintes :** quelles clés étrangères, cascades, triggers, politiques RLS (Row-Level Security, règles PostgreSQL qui filtrent les lignes selon le contexte) ou traitements asynchrones peuvent être déclenchés ?
6. **Retour arrière :** quelles données sont restaurables, pendant combien de temps et par quel mécanisme ?
7. **Permissions et audit :** le compte de l’application a-t-il réellement besoin du droit de supprimer ? Quelle trace permet de retrouver l’auteur, le motif, le périmètre et le résultat ?
8. **Prévention :** quelle protection doit exister dans le code, dans la base, dans le runbook et dans la revue de changement ?

## Décision métier à expliciter

Le mot « expirée » doit être défini. Dans ce cas d’étude, on décide que le job ne peut supprimer que les sessions :

- du tenant traité par le job, tenant obtenu à partir d’une configuration de travail autorisée ;
- dont `expires_at` est antérieur à l’instant de référence ;
- qui sont déjà révoquées (`revoked_at IS NOT NULL`) ;
- dont la politique de rétention est arrivée à échéance.

Une session expirée mais encore utile à une enquête de sécurité peut devoir être conservée. La règle définitive dépend donc de la politique métier et légale applicable. Ne copie pas aveuglément ces colonnes dans un vrai système : vérifie son schéma et sa politique.

## Grille de vérification différée

| Critère      | Solide                                                            | Insuffisant                                           |
| ------------ | ----------------------------------------------------------------- | ----------------------------------------------------- |
| Portée SQL   | Dit explicitement « toutes les lignes » sans `WHERE`              | Dit seulement « c’est dangereux »                     |
| Tenant       | Identifie l’isolation inter-clients et l’origine fiable du tenant | Utilise un identifiant fourni librement par le client |
| Métier       | Distingue expiration, révocation et rétention                     | Assimile les trois états                              |
| Impact       | Analyse cascades, audit, sessions actives et indisponibilité      | Ne parle que du nombre de lignes                      |
| Récupération | Définit sauvegarde/PITR, fenêtre et procédure testée              | Suppose qu’une transaction suffit après validation    |
| Prévention   | Propose droits minimaux, garde-fous et journalisation             | Se limite à ajouter un `WHERE` au hasard              |

**Réussite :** au moins 5 critères « solides » sur 6, sans erreur sur la portée de `DELETE` ni sur l’isolation tenant. Sinon, reprends la leçon SQL et le module sécurité.

## Lien dans le parcours

- Avant : [SQL basics](02-sql_basics.md), [modélisation](04-data_modeling.md) et les notions d’authentification/autorisation du parcours.
- Après : [laboratoire de suppression PostgreSQL](97-EXO-VERIFICATION.md), puis [challenge Databases](95-challenge.md).

## Preuve de maîtrise

Dépose un court threat model (analyse des menaces) qui nomme l’acteur, l’intention, les lignes autorisées, les lignes interdites, les contrôles préalables, la procédure de récupération et la trace d’audit. Tu dois pouvoir défendre le choix du hard-delete (suppression physique) ou du soft-delete (marquage logique) selon le besoin métier ; aucun des deux n’est universellement obligatoire.
