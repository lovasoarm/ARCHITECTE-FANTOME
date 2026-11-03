---
stability: stable
acte: apprendre-et-pratiquer
noyau: oui
route: formation-complete
niveau: D-G
last_reviewed: 2026-10-31
---

# 75 : Platform Operations Lab : livrer, observer, dégrader, récupérer

## Objectif vérifiable

Ce laboratoire transforme les notions Cloud/DevOps/SRE en un artefact local exécutable. L'apprenant doit distinguer santé du processus et disponibilité fonctionnelle, produire un conteneur non-root, limiter ses privilèges, exposer des signaux de faible cardinalité, observer une dégradation et documenter le retour à l'état nominal.

Il fournit un **service pédagogique local**. Ce n'est ni une plateforme Cloud complète, ni une preuve de haute disponibilité, de sécurité certifiée ou d'exploitation de production.

## Prérequis

- Avoir validé la [passerelle Python](../../00-SOCLE/07-PYTHON-PASSERELLE/README.md) ou démontrer ses compétences de sortie ;
- compatibilité minimale annoncée : Python 3.12+ ; pour une nouvelle installation apprenant au 31 octobre 2026, préférer Python 3.15.x (branche la plus récente en correctifs réguliers) ;
- Docker Engine + Compose plugin pour la partie conteneur ;
- savoir lire un port TCP, une variable d'environnement et un code HTTP ;
- les notions de logs, métriques, SLI/SLO et rollback.

La partie A utilise un script Python fourni et ses tests. Tu n’as pas à écrire un serveur HTTP depuis zéro : comprends le contrat, les arguments, les variables d’environnement et les tests. Les détails de `ThreadingHTTPServer` sont expliqués comme mécanisme du service fourni, pas comme prérequis de programmation concurrente Python.

## Partie A : Exécution locale sans Docker

```bash
cd 06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS
python -m unittest discover -s tests -v
python service.py --host 127.0.0.1 --port 8080
```

Dans un second terminal :

```bash
curl -i http://127.0.0.1:8080/healthz
curl -i http://127.0.0.1:8080/readyz
curl -i http://127.0.0.1:8080/metrics
```

Contrats :

- `/healthz` répond si le processus traite les requêtes ;
- `/readyz` répond `503` si la dépendance pédagogique est déclarée indisponible ;
- `/metrics` expose seulement un compteur de requêtes et un uptime, sans label à cardinalité variable ;
- les routes inconnues répondent `404` ;
- aucune query string n'est reflétée dans les réponses de santé.

Pour provoquer une indisponibilité fonctionnelle tout en gardant le processus vivant :

```bash
AF_DEPENDENCY_READY=false python service.py --host 127.0.0.1 --port 8080
```

Le processus doit rester joignable sur `/healthz` alors que `/readyz` passe à `503`. C'est volontaire : redémarrer un processus sain à cause d'une dépendance indisponible peut créer une boucle de redémarrage sans réparer la dépendance.

## Partie B : Construction et lancement conteneurisé

```bash
docker compose config
docker compose build --no-cache
docker compose up -d
docker compose ps
```

Vérifie les endpoints, l'état healthcheck, le fait que le processus tourne avec un utilisateur non-root et les limites déclarées. Ensuite teste la dégradation :

```bash
AF_DEPENDENCY_READY=false docker compose up -d --force-recreate
curl -i http://127.0.0.1:8080/healthz
curl -i http://127.0.0.1:8080/readyz
```

Retour nominal :

```bash
AF_DEPENDENCY_READY=true docker compose up -d --force-recreate
docker compose ps
docker compose down
```

**Ne confonds pas :** `docker compose config` valide la résolution Compose, `build` construit une image, `up` lance un conteneur ; aucun de ces résultats ne prouve une disponibilité multi-zone, un autoscaling, un backup de données ou une résilience Cloud.

## Partie C : Livraison reproductible

Conserve un dossier `evidence/` avec :

1. commit/version du code et hash de l'image ;
2. versions réelles de Docker Engine et Compose ;
3. sortie de `docker compose config`, build et tests ;
4. preuve utilisateur non-root, filesystem read-only, capabilities supprimées et limites appliquées ;
5. résultats avant / pendant / après dégradation ;
6. diff de configuration et décision de rollback ;
7. limites non couvertes.

Avant une utilisation externe, épingle l'image de base par digest, exécute un scan d'image et de dépendances, signe les artefacts, sépare les secrets et fais valider le threat model. Le tag `python:3.12-slim` est volontairement lisible pour l'exercice, pas une politique de supply chain suffisante.

## Partie D : Drill SRE / Incident

Scénario : le processus est vivant, mais une dépendance critique n'est pas prête.

Prédis avant l'expérience :

- quel endpoint doit rester à `200` ?
- lequel doit passer à `503` ?
- faut-il redémarrer le processus ? Pourquoi ?
- quel signal déclenche une action et qui en est propriétaire ?
- comment distinguer panne applicative, dépendance et healthcheck mal configuré ?

Exécute, note les timestamps réels, puis produis un postmortem. Un timestamp inventé ou reconstitué après l'exercice n'est pas une preuve.

## Extensions Cloud et Kubernetes : travail de profondeur

Le conteneur local ne couvre pas à lui seul le Cloud ou Kubernetes. Pour renforcer la preuve :

1. déployer ce même artefact dans un environnement sandbox autorisé ;
2. utiliser IaC versionnée, variables et secrets séparés, budgets et alertes ;
3. configurer readiness/liveness/startup probes distinctement ;
4. définir requests/limits, policy réseau, identité minimale et stratégie de mise à jour ;
5. produire un déploiement progressif, un rollback et une restauration réellement exécutés ;
6. détruire les ressources et joindre la preuve de coût nul/arrêt.

Ne déploie pas sur un compte personnel sans budget, limites et procédure de destruction. La preuve Cloud reste `NOT RUN` tant qu'un environnement autorisé n'a pas été utilisé.

## Barème non compensatoire (20 points)

| Axe                                 | Points | Minimum | Preuve                                                         |
| ----------------------------------- | -----: | ------: | -------------------------------------------------------------- |
| Exécution & contrats                |      4 |       3 | tests et réponses HTTP exactes                                 |
| Conteneur & réduction de privilèges |      4 |       3 | image construite, utilisateur effectif, restrictions vérifiées |
| Observabilité                       |      4 |       2 | compteur et uptime interprétés ; cardinalité maîtrisée         |
| Incident & récupération             |      4 |       3 | dégradation provoquée, chronologie, décision et retour nominal |
| Provenance & reproductibilité       |      4 |       3 | commit, versions, hash, commandes et limites                   |

Un score total élevé ne compense pas l'absence de tests, une exécution en root non justifiée ou des mesures inventées. L'extension Cloud/Kubernetes est évaluée séparément et ne doit pas être cochée si elle n'a pas été réellement exécutée.

## Résultats de référence de cette archive

Les tests Python locaux sont la partie exécutable de référence. L'image Docker et le fichier Compose sont des artefacts fournis ; leur construction n'est déclarée `PASS` que lorsque l'apprenant les exécute avec Docker. Dans un environnement sans Docker, le statut est `NOT RUN`, jamais `PASS`.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
