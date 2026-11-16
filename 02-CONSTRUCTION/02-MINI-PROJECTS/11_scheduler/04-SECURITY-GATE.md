---
stability: intemporel
gate: bloquante
acte: comprendre
---

# Security Gate : 11_scheduler

Cette gate est bloquante pour déclarer **ce mini-projet** terminé. Elle évalue les risques qui existent réellement dans un `Loop` et un `pMap` locaux. Elle ne demande pas de construire un serveur ou d'installer un outil de scan réseau sans rapport avec le livrable.

## Procédure

1. Copie le modèle AF `03-SECURITY.md` vers le document final `SECURITY.md` du dépôt apprenant, puis complète uniquement `SECURITY.md`.
2. Dans `SECURITY.md`, classe les risques pertinents avec OWASP Top 10:2025 lorsque cela aide le diagnostic. N’impose pas mécaniquement dix catégories. Pour un contrôle hors périmètre, utilise `NON APPLICABLE` et justifie-le ; ne crée pas artificiellement une surface pour exécuter un test sans objet.
3. Référence les tests précis et leur résultat brut ; ne coche pas une case sur la seule base d'une intention.
4. Lance `npm test` après la dernière modification.
5. Note les risques résiduels et les scénarios non testés dans `08-POSTMORTEM.md`.
6. Rejoue les tests si le code ou le contrat change.

## Contrôles bloquants

- [ ] Les arguments `items`, `mapper` et `concurrency` sont validés avant tout démarrage de travail.
- [ ] La concurrence est bornée à un entier de 1 à 100, avec défaut 5.
- [ ] Le maximum de mappers actifs est mesuré et ne dépasse jamais la configuration.
- [ ] Les résultats conservent l'ordre des entrées.
- [ ] Une erreur de mapper est propagée et stoppe les nouveaux lancements.
- [ ] Un signal déjà annulé ne lance aucun mapper.
- [ ] Un signal annulé en cours empêche les nouveaux lancements ; la limite d'annulation des tâches déjà actives est documentée.
- [ ] Les erreurs de callback de `Loop` ne sont pas masquées.
- [ ] `package.json` ne contient pas de dépendance inutile ; toute dépendance ajoutée est justifiée et vérifiée.

## Hors périmètre du projet de base

Les tests fonctionnels des surfaces suivantes sont non applicables tant que l'apprenant ne modifie pas le périmètre : authentification, autorisation par rôle/tenant, endpoints HTTP, ports exposés, secrets d'environnement, validation de fichiers utilisateur, injection SQL, conteneurs et déploiement. Le POSTMORTEM doit reprendre les risques réellement présents et justifier chaque `NON APPLICABLE` ; il ne doit pas dérouler mécaniquement les dix catégories OWASP. Le manifeste fourni ne contient aucune dépendance tierce : ne lance pas un scan fictif ; marque le contrôle des dépendances tierces d’A03 `NON APPLICABLE` en citant le manifeste. Ne considère pas pour autant toute la catégorie A03 comme définitivement hors périmètre : réévalue-la si l’apprenant ajoute une dépendance, un outil de build ou une chaîne de livraison. Une modification qui ajoute une surface impose de compléter la gate correspondante.

## Règle de blocage

Une case non testée reste décochée. Une preuve doit pointer vers un test/une commande réellement exécuté, avec sa version de runtime. Une limite non testée doit être nommée. L'autoévaluation ne constitue pas une revue indépendante ni une certification de sécurité.

## Statuts et décision globale

Statuts de ligne autorisés : `PASSÉ` (contrôle exécuté avec preuve suffisante), `ÉCHOUÉ` (contrôle exécuté, résultat insuffisant), `NON TESTÉ` (contrôle applicable non vérifié) et `NON APPLICABLE` (hors périmètre, justification obligatoire).

Décision globale : `ÉCHOUÉE` dès qu'au moins un contrôle applicable est `ÉCHOUÉ` ; `À FAIRE` si aucun contrôle applicable n'a échoué mais qu'au moins un reste `NON TESTÉ` ; `PASSÉE` uniquement lorsque tous les contrôles applicables sont `PASSÉ` et que chaque exclusion `NON APPLICABLE` est justifiée. Une case cochée, un champ rempli ou une commande prévue mais non exécutée ne constitue pas une preuve.
