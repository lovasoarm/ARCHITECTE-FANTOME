---
stability: intemporel
acte: comprendre
route_family: depth
---

> ### SCÈNE CRAZYDEVS : Kintana en période de pointe
>
> Le tableau de stock est consulté des centaines de fois. Une mise à jour vient pourtant de passer, et un utilisateur voit encore l'ancien total. Ton travail : réduire les relectures inutiles sans transformer la fraîcheur des données en loterie.
>
> **Règle de scène :** le cache est une copie temporaire ; la source de vérité reste l'autorité.

# Cahier des charges : 04 BREAKING CACHE

Temps de lecture estimé : 10 à 14 minutes.

## 1. Mission et résultat attendu

Construis un cache TTL en mémoire, utilisé par un service de lecture d'un résumé de stock Kintana, dans un seul processus Node.js. Le but est d'apprendre le contrat hit/miss, l'expiration, l'invalidation, la cohérence cache/source et la mesure d'une optimisation.

Le résultat doit permettre de répondre à ces questions :

- Quand une valeur est-elle absente, valide ou expirée ?
- Comment distinguer un miss d'un hit qui contient `null` ?
- Que se passe-t-il si la source échoue pendant un miss ?
- Quand invalider après une modification du stock ?
- Comment éviter qu'une boutique lise le résumé d'une autre boutique ?
- Quelle preuve montre que le cache réduit réellement les appels au loader ?

## 2. Ce qui est dans le périmètre

### Obligatoire

- stockage local `Map` ou structure équivalente justifiée ;
- clé textuelle non vide ;
- TTL entier, fini et strictement positif ;
- horloge injectable et monotone (par défaut `performance.now()` dans Node.js) ;
- expiration paresseuse avec frontière `now >= expiresAt` ;
- API hit/miss non ambiguë ;
- opérations `get`, `set`, `delete`, `clear` ;
- lecture-aside (loader appelé uniquement sur miss) ;
- absence de mise en cache si le loader échoue ;
- invalidation après le succès de la transaction d'écriture ;
- clé incluant tenant et boutique, avec sérialisation non ambiguë du couple d'identifiants ;
- tests et mesure locale documentés.

### Hors périmètre obligatoire

Pas de Redis, Memcached, cache distribué, base de données réelle, service HTTP, authentification complète, stratégie multi-région, synchronisation inter-processus, LRU/éviction par capacité, verrou distribué, anti-stampede, graphes, Dijkstra, BFS/DFS, heap, tris ou knapsack. Tu peux les proposer comme évolution dans un ADR, mais ne les construis pas pour satisfaire ce cahier.

## 3. Contrat observable

| Élément    | Règle                              | Justification                                                                               |
| ---------- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| Clé        | chaîne non vide après validation   | éviter les collisions triviales et les clés implicites                                      |
| TTL        | entier fini `> 0` en millisecondes | aucune durée nulle, négative ou non définie                                                 |
| Horloge    | injectée, retourne un nombre fini  | tester l'expiration de façon déterministe                                                   |
| Échéance   | `expiresAt = now + ttlMs`          | règle temporelle explicite                                                                  |
| Expiration | expiré si `now >= expiresAt`       | la valeur ne survit pas à sa borne                                                          |
| Hit        | `{ hit: true, value }`             | un `null` n'est pas confondu avec un miss                                                   |
| Miss       | `{ hit: false }`                   | absent ou expiré                                                                            |
| Nettoyage  | paresseux au `get`                 | aucun timer en arrière-plan requis ; une entrée expirée jamais relue peut rester en mémoire |

Le contrat peut être enrichi si ton ADR justifie la compatibilité et les tests associés. Ne change pas silencieusement la signification de l'expiration.

## 4. Parcours métier Kintana

La source de vérité contient le stock validé. Le cache ne contient qu'un snapshot de lecture construit depuis cette source.

Clé recommandée : `JSON.stringify(['stock-summary', tenantId, storeId])`. Valide les identifiants comme chaînes non vides, puis sérialise le tuple côté service. Ne concatène pas naïvement des identifiants avec `:` : `('a:b','c')` et `('a','b:c')` pourraient produire la même chaîne. Le cache ne doit pas devenir un moyen de choisir arbitrairement les données d'un autre tenant.

### Lecture-aside

1. Construire la clé du tenant et de la boutique concernés.
2. Lire le cache.
3. En cas de hit, retourner le snapshot.
4. En cas de miss, charger depuis le repository/source de vérité.
5. Si le chargement échoue, propager l'erreur et ne rien mettre en cache.
6. Si le chargement réussit, écrire le snapshot avec le TTL choisi puis le retourner.

### Mise à jour

1. Persister le changement de stock dans la source de vérité.
2. Attendre la réussite du commit.
3. Invalider uniquement la clé du résumé affecté.
4. Ne pas invalider sur une écriture échouée.

Une fenêtre de concurrence reste possible : une lecture qui a commencé avant le commit peut terminer après l'invalidation et réinsérer un ancien snapshot. Décris ce risque. Versionnement de clé, génération, verrou ou outbox sont des pistes d'évolution, pas des fonctionnalités exigées ici.

## 5. Arborescence suggérée

```text
src/
├── ttl-cache.js
├── stock-summary-service.js
├── demo.js
└── benchmark.js

tests/
├── ttl-cache.test.js
└── stock-summary-service.test.js
```

Tu peux adapter le découpage si tes frontières sont plus simples ou plus testables ; explique les écarts dans un ADR.

## 6. Tests d'acceptation à écrire

| ID  | Comportement à prouver                                                |
| --- | --------------------------------------------------------------------- |
| C01 | clé absente → miss                                                    |
| C02 | valeur présente avant échéance → hit                                  |
| C03 | `null`/`undefined` stocké → hit distinct d'un miss                    |
| C04 | `now < expiresAt` → entrée encore valide                              |
| C05 | `now === expiresAt` → entrée expirée                                  |
| C06 | `now > expiresAt` → entrée expirée                                    |
| C07 | clé vide/invalide et TTL invalide rejetés                             |
| C08 | `delete` indique correctement si une entrée existait                  |
| C09 | `clear` supprime toutes les entrées                                   |
| C10 | loader non appelé lors d'un hit                                       |
| C11 | loader appelé lors d'un miss                                          |
| C12 | chargement échoué → aucune valeur mise en cache                       |
| C13 | chargement réussi → valeur mise en cache                              |
| C14 | commit réussi → clé ciblée invalidée                                  |
| C15 | commit échoué → pas d'invalidation                                    |
| C16 | tenant ou boutique différents → clés isolées                          |
| C17 | identifiants contenant `:` → aucune collision entre couples distincts |

Ces identifiants sont des comportements, pas un nombre imposé de fonctions de test. Tu peux couvrir plusieurs cas dans un même test si les assertions restent lisibles.

## 7. Benchmarks et preuves de performance

Aucun timing, ratio ou benchmark n'est livré par le cours. Ne transforme pas un exemple en résultat mesuré.

Compare deux chemins sur le même jeu de clés :

- **sans cache :** chaque requête appelle le loader ;
- **cache-aside :** le loader n'est appelé que lorsque la clé est absente ou expirée.

Pour chaque charge choisie (par exemple 1k, 10k et 100k lectures), relève au minimum : nombre d'appels loader, hits, misses, temps total, médiane de cinq répétitions ou plus, version Node, système, CPU, données et TTL. Prépare les fixtures hors de la fenêtre chronométrée. Réalise un warm-up. Explique qu'un loader synthétique ne prouve pas un gain identique sur une base de données ou un réseau réel.

La preuve principale de l'exercice est la réduction mesurée des appels au loader et le respect de la cohérence. Un cache peut ne pas accélérer un simple accès `Map` local : n'impose pas une conclusion positive avant la mesure.

## 8. Sécurité et confidentialité

- ne pas mettre de secret, token, mot de passe ou donnée personnelle dans la clé ou la valeur ;
- inclure tenant et boutique dans la clé ;
- sérialiser le couple sans collision de séparateur (tuple JSON recommandé) ;
- valider les identifiants avant de construire la clé ;
- ne pas accepter une clé arbitraire comme autorisation ;
- ne pas journaliser les valeurs stockées ;
- tester l'isolation entre deux périmètres, y compris les identifiants qui contiennent `:` ;
- garder le nombre de clés de la fixture borné : l'expiration paresseuse ne retire pas une entrée jamais relue ;
- documenter la durée maximale d'obsolescence liée au TTL.

Le [Security Gate local](04-SECURITY-GATE.md) vérifie ces risques propres au projet. Il ne demande pas de revendiquer une conformité générale OWASP.

## 9. Livrables

- implémentation dans `src/` ;
- tests dans `tests/` ;
- journal TDD renseigné au fil du travail ;
- au moins trois ADR issus de décisions réellement prises ;
- tableau de benchmark avec données réelles ou mention explicite « non exécuté » ;
- fiche sécurité complétée et gate avec références précises ;
- postmortem incluant au moins une limite et une piste d'évolution.

## 10. Définition de terminé

Le projet est terminé lorsque les 17 comportements C01 à C17 sont couverts par des tests pertinents qui passent sur le runtime indiqué, que la commande réellement exécutée est consignée, que la cohérence lecture/écriture est expliquée, que l’isolation tenant/boutique et l’absence de collision de clés sont prouvées, et que les mesures ne contiennent aucun temps inventé. Si un comportement ne s’applique pas à ton implémentation, justifie-le explicitement au lieu de le déclarer implicitement satisfait.

Si le code n'a pas été exécuté, indique-le. Une intention, un exemple de sortie ou un fichier présent ne constitue pas une preuve d'exécution.

## 11. Références de préparation

- [Map et tables de hachage](../../06-DATA-STRUCTURES/07_hash_table/README.md)
- [async/await](../../../01-CADRAGE/02-ASYNC/03_async_await/README.md)
- [Tests unitaires](../../03-TESTING/02-unit_sniper.md)
- [Mesurer avant d'optimiser](../../05-MEMORY-PERFORMANCE/02A-measure_first.md)
- [Politique de version Node.js](../../../06-ANNEXES-TRANSVERSES/03-NODE_VERSION.md)
