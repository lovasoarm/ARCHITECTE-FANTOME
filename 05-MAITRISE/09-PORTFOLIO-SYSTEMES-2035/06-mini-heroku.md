---
stability: evolutif
acte: maitrise
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/08-platform-engineering-gitops.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/08-platform-engineering-gitops.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 06 : Mini-Heroku

> Petite plateforme interne : build, déploiement, rollback, autoscaling guidé, GitOps et FinOps.

**Place dans le parcours :** Avancé : plateforme comme produit.  
**Prérequis :** Linux, Git, processus, Docker Basics validé avant le pont Platform Engineering, CI/CD, santé/observabilité, sécurité de secrets, coût et limites de ressources.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

- [Shell Survival](../../00-SOCLE/01-GETTING-STARTED/04-shell_survival.md), [Git 101](../../00-SOCLE/01-GETTING-STARTED/05-git_101.md), [process/env](../../02-CONSTRUCTION/13-RUNTIME-ENV/05-process_env_argv.md), puis la leçon complète [Docker Basics](../06-ANNEXES/29_toolchain/06-docker_basics.md) (image, conteneur, port, logs, Dockerfile, Compose et multi-stage).
- [Cloud Foundations](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md), [architecture réseau/identité/reprise](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/08-ARCHITECTURES-RESEAUX-IDENTITES-REPRISE.md), [Quality Shield](../../03-PILOTAGE/03-QUALITY-SHIELD/README.md).
- [GitOps](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/02-gitops-and-drift.md), [IDP](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/03-internal-developer-platform.md), [Lab Platform Operations 75](../../06-ANNEXES-TRANSVERSES/75-LAB-PLATFORM-OPERATIONS/README.md), [Atelier DevOps/SRE 59](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md), puis [Leçon-pont 08](LECONS-PONTS/08-platform-engineering-gitops.md).

**Gate d'entrée :** tu as terminé [Docker Basics](../06-ANNEXES/29_toolchain/06-docker_basics.md) et tu peux, sans copier la solution, builder une image locale, lancer/arrêter un conteneur, publier un port, lire ses logs, utiliser Compose avec `condition: service_healthy`, lancer un service avec configuration séparée, tester health/readiness, faire échouer une release et restaurer la version précédente. Kubernetes et Terraform ne sont pas requis pour entrer. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-1--systèmes-en-production).

## Mission

Créer une plateforme locale qui prend un service déclaré, construit un artefact reproductible, le déploie, le surveille et permet rollback. La plateforme doit réduire la charge cognitive des développeurs sans cacher les coûts ou les pannes.

## Version de départ : obligatoire

- [ ] Définir une interface de déploiement petite (manifest de service avec image/command, resources, health check, env references et ports).
- [ ] Construire un artefact versionné à partir d’un commit ; conserver provenance, logs de build et résultat des tests.
- [ ] Déployer sur un environnement local (Docker Compose ou processus isolés) avec health checks, release id et rollback vérifié.
- [ ] Gérer secrets via références protégées ; ne pas les inclure dans l’image, les logs ou les artefacts.
- [ ] Simuler ou implémenter une réconciliation GitOps : l’état désiré du repo est comparé à l’état observé, avec drift detection et refus d’un changement manuel risqué.
- [ ] Modéliser l’autoscaling à partir de signaux et limites ; si aucun cluster n’est disponible, faire une simulation exacte et étiquetée comme telle.
- [ ] Produire un coût estimé et mesuré quand possible : heures d’exécution, mémoire, CPU, stockage, egress et appels IA éventuels.

## Extensions Depth : une à la fois

- [ ] Progressive rollout/canary avec seuil de rollback, migration de schéma compatible et déploiement sans interruption dans un périmètre mesurable.
- [ ] SBOM, scan des dépendances et provenance de build signée, reliés à l’artefact exact.
- [ ] Backpressure, quota et fair use multi-application ; métriques d’adoption et temps de mise en production.

## Tests d’acceptation

- [ ] Un build cassé ne remplace pas la dernière version stable.
- [ ] Un health check négatif ou une régression SLO déclenche un rollback testé, pas une promesse dans le README.
- [ ] Le système peut reconstruire le même release à partir de ses entrées documentées ; les écarts d’images/dépendances sont visibles.
- [ ] Les quotas évitent qu’une seule application consomme les ressources allouées aux autres.

## Dossier de preuves attendu

Manifeste, pipeline build/release, registre local, dashboard SLO/coûts, preuve rollback, politique de secrets, ADR GitOps/autoscaling et guide développeur.

## Hors périmètre et limites

Pas de clone de toute la plateforme Heroku, pas de Kubernetes obligatoire. Le résultat initial doit prendre en charge un seul type d’application, puis s’étendre à la suite d’une preuve de besoin.

## Ponts vers AF

Commence par [59 : Atelier DevOps/SRE](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) : il relie le commit, l'artefact, la stratégie de rollout, les signaux, l'incident, le rollback et la restauration. Puis étudie [Platform Engineering](../../03-PILOTAGE/12-PLATFORM-ENGINEERING/README.md), [Cloud Foundations](../../03-PILOTAGE/07-CLOUD-FOUNDATIONS/README.md) et les [références techniques vivantes](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md). Les outils réels sont choisis par besoin et par environnement ; ils ne remplacent pas le modèle de livraison.

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
