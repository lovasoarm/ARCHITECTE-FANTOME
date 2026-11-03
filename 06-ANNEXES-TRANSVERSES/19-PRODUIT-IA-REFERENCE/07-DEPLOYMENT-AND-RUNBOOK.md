---
stability: stable
acte: exploiter
noyau: transversal
---

# Déploiement, exploitation et limites du laboratoire IA

## Contrat de service

- `GET /healthz` : processus joignable ; ne vérifie pas le provider externe.
- `GET /readyz` : corpus chargé et non vide pour le tenant configuré ; ce n'est pas un test d'ACL par document ni de provider.
- `POST /v1/query` : bearer token obligatoire, JSON, question non vide et bornée ; scope tenant dérivé de la configuration serveur.
- `GET /metrics` : format Prometheus minimal, bearer token obligatoire. Ne pas publier ces métriques sans une politique d'accès dédiée.

## Variables et défauts bornés

| Variable              |      Défaut | Contrat                                                                                              |
| --------------------- | ----------: | ---------------------------------------------------------------------------------------------------- |
| `API_TOKEN`           |      requis | Au moins 24 caractères pour la démonstration ; utiliser un générateur et un gestionnaire de secrets. |
| `API_TENANT_ID`       |      `demo` | Identité unique liée au serveur, jamais fournie par la requête.                                      |
| `HOST`                | `127.0.0.1` | Dans le conteneur, `0.0.0.0` est défini pour permettre le port mapping.                              |
| `PORT`                |      `8080` | Entier 1–65535.                                                                                      |
| `MAX_BODY_BYTES`      |     `16384` | Taille maximale du JSON.                                                                             |
| `MAX_QUESTION_CHARS`  |      `2000` | Longueur maximale de la question.                                                                    |
| `RATE_LIMIT_REQUESTS` |       `120` | Nombre de requêtes par fenêtre, pour l'adresse réseau vue par ce processus.                          |
| `MAX_IN_FLIGHT`       |        `32` | Plafond local de requêtes traitées simultanément.                                                    |
| `LLM_TIMEOUT_MS`      |      `8000` | Timeout du client provider, borné par le code.                                                       |

Les valeurs invalides des variables numériques sont remplacées par le défaut de démonstration ; un environnement production devrait plutôt échouer au démarrage pour les valeurs invalides et gérer la configuration par schéma versionné. Les limites sont en mémoire et ne sont pas coordonnées entre processus.

## Décision de déploiement

Le conteneur utilise un utilisateur non-root, une racine en lecture seule au niveau Compose, aucune capacité Linux additionnelle et un healthcheck local. Le port est publié sur loopback. Ces réglages réduisent la surface d'exposition du laboratoire, mais ne remplacent pas une configuration réseau, un ingress TLS, une gestion de secrets, une politique de logs/rétention et une revue de menace pour le contexte cible.

## Procédure de livraison recommandée

1. Geler les fixtures et les hashes, puis exécuter `npm test` et `npm run eval:retrieval`.
2. Construire l'image depuis un environnement propre avec le tag d'image défini dans le Dockerfile ; conserver le digest réel de l'image produite.
3. Démarrer un environnement isolé ; contrôler `/healthz`, `/readyz`, authentification, refus no-hit et `/metrics`.
4. Lancer `npm run eval:load` avec un volume/concurrence prédéfinis ; conserver le rapport brut et la configuration utilisée.
5. Vérifier les logs : aucun token, texte de question, contexte ou secret ne doit apparaître. Vérifier que l'identifiant de requête permet un diagnostic sans contenu sensible.
6. Déployer progressivement derrière TLS et un contrôle d'accès adapté ; observer les SLI avant d'élargir le trafic.
7. Définir un rollback, une personne responsable, un budget, des seuils d'alerte et une condition d'arrêt.

## Exercice de panne et critères de sortie

Provoque au moins : token invalide, JSON mal formé, body trop grand, quota dépassé, fournisseur absent, timeout, réponse provider mal formée et requête dont le corpus autorisé ne contient aucune preuve. Pour chaque cas, note statut HTTP, mode, métrique, log expurgé et effet attendu.

**Gate d'acceptation local :** tous les tests unitaires/intégration passent, le jeu de retrieval satisfait ses cas, la requête hors corpus n'appelle pas le modèle, le tenant hors périmètre ne récupère aucune ressource, et le rapport de charge indique clairement la taille du test et le runtime.

**Gate d'acceptation production :** non satisfait par le dépôt seul. Il exige un environnement réel, TLS, identité/rotation, quotas partagés, tests de sécurité/ACL représentatifs, données et seuils pré-enregistrés, supervision avec alertes, rollback vérifié, exercice de restauration si données persistées et revue indépendante.

<!-- AF-DIAGRAM:ai -->

## Repère visuel utile : FAQ IA en lecture seule et évaluable

```text
question utilisateur
       |
       v
contrôle d'accès + retrieval
       |
       v
sources autorisées ?
   | oui        | non
   v            v
générer + citer   abstention
   |
   v
validation / sécurité
   |
   v
réponse lecture seule
```

<!-- AF-LESSON-PROFILE: ai -->

## Repères de décision

- **Pourquoi :** L'ingénierie IA consiste à intégrer une capacité probabiliste dans un système déterministe qui doit gérer droits, qualité, coût et échecs.
- **Quand l’utiliser / quand l’éviter :** Utilise LLM/RAG/agents seulement quand la valeur est claire et une solution non-IA ne suffit pas. En lecture seule, l'IA peut assister ; elle ne doit pas effectuer une action métier sans autorisation et confirmation séparées.
- **Limites :** Une réponse plausible peut être fausse. Un score d'évaluation ne garantit pas la sécurité ; un prompt n'est pas une frontière d'autorisation ; une simulation n'est pas une mesure utilisateur.

## Mécanisme : la version sans magie

Définis contrat, sources, droits, abstention et évaluation ; observe retrieval, génération et post-traitement séparément ; garde les outils dans un périmètre minimal.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../77-FIL-ROUGE-KINTANA/README.md), **Déploiement, exploitation et limites du laboratoire IA** se rattache à ce cas concret : La FAQ IA Kintana répond à partir de documents approuvés, cite ses sources et s'abstient quand le contenu manque. Elle ne crée ni annule ni modifie une demande.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : FAQ IA en lecture seule et évaluable

> **Arc Capsule Corp. / DBZ :** l'IA est un copilote puissant, pas le Hokage. Elle peut proposer ; c'est ton système qui doit vérifier, limiter et refuser si besoin.

**Mission liée à « Déploiement, exploitation et limites du laboratoire IA » :** Ajoute ou évalue une tranche FAQ Kintana : corpus synthétique approuvé, retrieval, citations, questions sans réponse, contradiction de source et prompt injection. Vérifie que toute action d'écriture métier reste impossible.

**Livrable :** jeu d'évaluation versionné, rapport retrieval/génération, tests sécurité, règle d'abstention et dossier de coûts/latence LAB.

**Critères d’acceptation :** les sources sont traçables ; les réponses sans support s'abstiennent ; l'injection ne donne pas de droits ; aucune action métier n'est exposée ; les métriques ne sont pas présentées comme production.

**Transfert obligatoire :** Le fournisseur IA tombe ou renvoie une sortie mal formée. Vérifie le mode dégradé, la reprise et le comportement sûr.
