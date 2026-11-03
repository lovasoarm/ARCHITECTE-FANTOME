---
perishability_id: PER-0102
stability: "perissable"
acte: appliquer
noyau: oui
source_verified_on: "2026-11-03"
freshness_status: "verified_current"
source_url: "https://www.nist.gov/itl/ai-risk-management-framework"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "NIST AI Risk Management Framework : RMF 1.0 reste un cadre volontaire publié en janvier 2023 et le NIST a annoncé sa révision en 2026. Le cadre ne constitue pas, à lui seul, une loi, une certification ou une preuve de conformité."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_current » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "NIST_AI_RMF_1_0_STATUS_AND_REVISION_NOTICE_CONFIRMED_2026-11-03"
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

# Produit IA de référence : `retrieval-gateway`

> **État du référentiel NIST au 3 novembre 2026 :** le NIST AI RMF 1.0, publié le 26 janvier 2023, reste le cadre publié accessible dans les ressources NIST. La page officielle indique toutefois que l'AI RMF 1.0 est en cours de révision dans le cadre du White House AI Action Plan ; elle mentionne également une note de concept publiée le 7 avril 2026 pour un profil consacré à l'IA digne de confiance dans les infrastructures critiques. Utilise donc l'AI RMF 1.0 comme cadre de référence existant, mais ne le présente pas comme une édition définitivement stabilisée ou comme une norme de conformité obligatoire. Vérifie la page NIST avant chaque décision de gouvernance.

Ce laboratoire produit une **preuve transversale d'évaluation critique de l'IA (G8)**. Il ne remplace
pas la preuve S6 de livraison/exploitation et n'impose pas d'ajouter un LLM au fil rouge.

Le protocole de référence pour étendre les évaluations est [la matrice des défaillances IA/RAG](06-MATRICE-EVALUATION-IA-SECURITE.md). Elle sépare explicitement les scénarios proposés des contrôles réellement implémentés : aucun cas de sécurité n'est réputé validé par la seule présence de la matrice.

## Parcours pédagogique du code

Commence par [09 : Parcours de lecture apprenant](09-PARCOURS-LECTURE-APPRENANT.md) : il donne l'ordre de lecture de `knowledge.json`, du retriever, du client LLM, du serveur et du jeu d'évaluation, avec des exercices, des défauts à injecter et des critères de sortie. Puis utilise [60 : Laboratoire IA de bout en bout](../60-LAB-SERVICE-IA-END-TO-END.md) pour relier le code aux questions de retrieval, d'ACL, de génération, de budget et de release.

## Architecture et capacités nouvelles

Le laboratoire reste **offline-first**, sans dépendance runtime npm. Il inclut maintenant deux parcours :

- **CLI local** (`src/cli.mjs`) pour comprendre et tester le retriever sans réseau ni compte cloud ;
- **service HTTP de référence** (`src/server.mjs`) pour travailler l'authentification, le périmètre tenant, les limites de requête, la capacité, les métriques, la santé, l'arrêt propre et le mode dégradé.

L'API filtre les documents autorisés **avant** la récupération et avant la construction du contexte envoyé au modèle. L'identité tenant provient du binding serveur `API_TENANT_ID`, jamais d'un champ de requête fourni par le client. L'exemple de corpus livré est associé au tenant `demo` ; une autre valeur ne donne donc pas accès aux documents du tenant demo. Ce mécanisme est une démonstration de séparation logique, pas un fournisseur d'identité multi-tenant complet.

La sortie d'un appel LLM est étiquetée `unverified-model-output`. Ni un prompt ni un score lexical ne prouvent la véracité d'une réponse. En l'absence de document autorisé pertinent, l'API refuse la génération et retourne une réponse d'insuffisance de preuve.

## Ce que le code permet de tester

1. ingestion de documents locaux et retrieval lexical déterministe ;
2. API JSON HTTP avec bearer token, identité tenant liée côté serveur, limite de taille et longueur de question ;
3. limitation de débit par adresse réseau observée par le processus, plafond de requêtes concurrentes et limite de délai côté serveur ;
4. endpoints de santé/readiness, métriques protégées et logs structurés ne contenant ni question, ni token, ni texte de document ;
5. appel optionnel d'un provider HTTPS compatible derrière une interface ;
6. refus avant génération si aucun document autorisé n'est récupéré ;
7. suite de tests unitaires et d'intégration, test de fumée retrieval et test de charge local borné ;
8. Dockerfile non-root, conteneur en lecture seule via Compose, healthcheck et CI sans dépendance runtime tierce ;
9. matrices de coût, observabilité, sécurité, limites et arbitrages documentés.

## Prérequis et tests locaux

Runtime de référence : Node.js `22.23.4` (cf. `package.json` et Dockerfile). Aucun paquet externe n'est nécessaire.

```bash
node src/cli.mjs "Quel est le SLO du service ?"
node --test src/*.test.mjs
node eval/run.mjs
```

Pour le service HTTP, définir un secret local d’au moins 32 caractères, non-placeholder et démarrer le serveur :

```bash
# Bash / macOS / Linux  : ne pas committer de vraie valeur de secret
export API_TOKEN="$(openssl rand -hex 32)"
export API_TENANT_ID='demo'
node src/server.mjs
```

Dans un autre terminal :

```bash
curl -sS http://127.0.0.1:8080/healthz
curl -sS http://127.0.0.1:8080/readyz
curl -sS -H "Authorization: Bearer $API_TOKEN" http://127.0.0.1:8080/metrics
curl -sS -X POST http://127.0.0.1:8080/v1/query \
  -H "Authorization: Bearer $API_TOKEN" -H 'Content-Type: application/json' \
  -d '{"question":"Quel est le SLO du service ?"}'
```

Le `API_TENANT_ID` est un paramètre du serveur : ne le laissez pas devenir une valeur contrôlée par le client. Le service demeure un laboratoire de référence ; le token Bearer unique ne constitue pas une identité complète. Une mise en production exige un système d'identité/rotation adapté, une terminaison TLS et des permissions plus fines.

## Test de charge borné

Après avoir lancé le serveur de test et exporté `API_TOKEN`, exécutez :

```bash
node eval/load.mjs
```

Réglages optionnels : `LOAD_TEST_URL`, `LOAD_REQUESTS` (1–10 000) et `LOAD_CONCURRENCY` (1–250). Le rapport donne runtime, statut, nombre de requêtes et latences p50/p95/max. La valeur par défaut est un micro-test de 100 requêtes : elle valide l'intégration sous charge légère, **pas** une capacité production. Fixer un profil et des seuils avant tout benchmark de décision.

## Construire et lancer avec Docker Compose

À partir du répertoire de ce laboratoire, fournir `API_TOKEN` à l'environnement puis :

```bash
export API_TOKEN="$(openssl rand -hex 32)"
docker compose up --build -d
docker compose ps
docker compose logs --tail=100 ia-reference
```

La publication est liée à `127.0.0.1:8080`; le processus s'exécute sans root, sans capacités Linux additionnelles et avec le système de fichiers racine en lecture seule. Le Dockerfile épingle l'image de base à la version de référence. Pour un déploiement exposé, terminer TLS sur un proxy/ingress maîtrisé et ajouter identité, rotation des secrets, stockage durable, sauvegardes, alertes, politique de rétention et protections adaptées à votre environnement.

Pour automatiser les vérifications dans ton propre dépôt, tu peux créer un workflow de CI qui utilise le runtime demandé par `package.json`, exécute `npm test` et `npm run eval:retrieval`, puis conserve les résultats bruts. Le test de charge ne doit être lancé qu’après démarrage du serveur et avec un profil adapté. Les tests locaux livrés ici n’appellent aucun fournisseur IA réel.

## Portée du jeu d'évaluation et métriques

`eval/run.mjs` est toujours un **test de fumée lexical déterministe** sur un petit jeu local versionné : il mesure `HitRate@3` et `MRR@3` pour les requêtes positives et teste séparément les requêtes sans résultat. Les hash SHA-256 du corpus et du jeu de cas rendent la fixture plus traçable. Cela teste le comportement de retrieval sur ces fixtures ; ce n'est pas un benchmark représentatif, une évaluation des réponses générées ou une campagne de sécurité. Le test de fumée ne valide pas la sécurité du système RAG de production.

Le jeu ne couvre pas à lui seul la qualité métier des réponses, les citations, la révocation dynamique des droits, les attaques adaptatives, le juge d'évaluation, le comportement de plusieurs instances, les bases persistantes ou la dérive d'un modèle. Les tests du client LLM utilisent un faux transport et ne prouvent pas la compatibilité avec un fournisseur réel. Les tests d'intégration de l'API prouvent uniquement les invariants couverts par leurs fixtures.

## Limites de production connues : pas de certification implicite

- Le rate limit est en mémoire et par processus ; il ne se coordonne pas entre plusieurs instances et n'est pas un substitut à un quota au niveau passerelle.
- Le corpus est chargé au démarrage depuis un fichier local ; il n'y a ni ingestion de documents utilisateur, ni stockage durable de sessions, ni révocation ACL en ligne.
- Le tenant est lié à une configuration/credential unique ; l'exemple n'est pas un service d'identité complet.
- Il n'y a pas de déploiement réel, de benchmark lourd, de test de chaos, de restauration ou de preuve de conformité exécutée dans ce dépôt.
- Le fournisseur LLM reste optionnel ; aucune évaluation n'atteste qu'un modèle répond bien, résiste à une injection ou cite correctement les sources.

Avant une revendication de production, ajouter selon le risque : identité fédérée et scopes, quota partagé, TLS/ingress durci, gestion/rotation KMS des secrets, ACL par document/revocation, tests RAG adversariaux de bout en bout, supervision et alertes reliées à des SLO, déploiement/rollback automatisés, charge représentative, sauvegarde/restauration et revue de sécurité indépendante.

## Gate G8 : preuve IA et exploitation

L'apprenant doit apporter des résultats réels datés, pas simplement recopier des objectifs :

- architecture et frontière de confiance ;
- jeu d'évaluation versionné, tailles, provenance, cas exclus et résultats bruts ;
- cas où l'IA est volontairement refusée ;
- budget d'appel, timeout, mode dégradé et preuve d'absence de secret dans les logs ;
- latences, erreurs, débit et limites sous un profil spécifié ;
- test de régression qui détecte une dégradation volontaire ;
- comportement des invariants après changement de modèle ;
- revue extérieure, risques résiduels et décision de mise en service.

La preuve S6 de livraison/exploitation reste distincte : `PREUVES/LIVRAISON-EXPLOITATION.md`. Si un système personnel embarque réellement une brique IA, produire aussi `PREUVES/IA-EN-PROD.md` et documenter le contexte exact de son exploitation.

## Avant toute utilisation réelle

Ce laboratoire permet de pratiquer les gates d’une release ; sa présence dans le curriculum ne signifie pas qu’un service est prêt pour la production. Avant d’exposer un système réel, consigne les versions utilisées, les résultats bruts, les scénarios négatifs, les limites connues, la revue de sécurité, le comportement sous charge représentative, la restauration et la procédure de retour arrière. Une revue indépendante et des essais dans l’environnement cible restent nécessaires. Ne marque jamais une étape comme réussie sans preuve observée.

## Références officielles utiles

> **Référence principale vérifiée le 3 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [NIST : AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [OpenAI : API documentation](https://platform.openai.com/docs/)
- [Anthropic : API documentation](https://docs.anthropic.com/)

## Détails opérationnels

- [Observabilité](03-OBSERVABILITY.md) : signaux et exploitation.
- [Sécurité](04-SECURITY.md) : frontières de confiance et contrôles.
- [Déploiement et runbook](07-DEPLOYMENT-AND-RUNBOOK.md) : procédure d’exploitation et de reprise.
- [Release gates](08-RELEASE-GATES.md) : conditions de mise en service.
- [ADR architecture](ADR/ADR-001_architecture.md) : décisions d’architecture du produit de référence.
