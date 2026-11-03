---
stability: evolutif
acte: maitrise
noyau: non
route: depth
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/01-rag-recherche-hybride.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# 01 : La Tour de Contrôle

> Observabilité OpenTelemetry, SLO, tests de charge, chaos contrôlé et postmortems.

**Place dans le parcours :** Base opérationnelle : à réutiliser dans les projets suivants.  
**Prérequis :** HTTP/API, gestion des erreurs, tests, bases Linux/containers ; module 03-PILOTAGE/05-OBSERVABILITY et 06-FIABILITE-SLO.

## Parcours de préparation obligatoire

Commence par valider le [socle commun G0](00-PARCOURS-PREPARATION.md#niveau-0--socle-commun-obligatoire), puis suis les prérequis spécifiques ci-dessous. Un lien lu n’est pas une compétence validée : réussis aussi la preuve de sortie du parcours central.

Avant de commencer, termine les leçons suivantes :

- [Logs structurés](../../03-PILOTAGE/05-OBSERVABILITY/02-structured_logging.md), [tracing distribué](../../03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md), [métriques et alertes](../../03-PILOTAGE/05-OBSERVABILITY/05-metrics_alerting.md), [instrumenter ton projet](../../03-PILOTAGE/05-OBSERVABILITY/10-instrumenter_ton_projet.md).
- [SLI/SLO et budget d'erreur](../../03-PILOTAGE/06-FIABILITE-SLO/02-sli_slo_budget_erreur.md), [RPO/RTO](../../03-PILOTAGE/06-FIABILITE-SLO/04-reprise_rpo_rto.md), [injection de panne](../../03-PILOTAGE/06-FIABILITE-SLO/07-injection_panne.md).
- [59 : Atelier DevOps/SRE](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) ; [Leçon-pont 11 : Tests de charge HTTP](LECONS-PONTS/11-tests-de-charge-http.md).

**Gate d'entrée :** tu sais instrumenter un service HTTP, relier logs/traces par un identifiant, définir un SLI avec son dénominateur, injecter une panne contrôlée et restaurer le service. Tu as aussi validé la [leçon-pont 11 : Tests de charge HTTP](LECONS-PONTS/11-tests-de-charge-http.md) et produit une baseline locale reproductible avec trois essais, résultats bruts et limites explicites. Si tu ne sais pas récupérer le système ou interpréter une mesure de charge, tu n'es pas encore `READY`. Voir le [parcours central](00-PARCOURS-PREPARATION.md#niveau-1--systèmes-en-production).

## Mission

Faire fonctionner un service que tu comprends et le rendre observable. Le but n’est pas d’avoir de jolis dashboards ; il faut détecter une dégradation, diagnostiquer une cause probable et prouver la récupération.

## Version de départ : obligatoire

- [ ] Prendre un service existant (API de projet ou service distribué Arena) ; instrumenter traces, métriques et journaux corrélés avec OpenTelemetry.
- [ ] Définir 2–3 SLI utiles (disponibilité de requête, latence, taux d’erreur ou fraîcheur) puis un SLO motivé par le besoin utilisateur.
- [ ] Ajouter health/readiness distincts si le système le justifie, délais d’attente, limites de charge et identifiants de corrélation ; ne pas journaliser secrets ou données sensibles.
- [ ] Reprendre la méthode de la [leçon-pont 11](LECONS-PONTS/11-tests-de-charge-http.md) pour mesurer un endpoint représentatif ; archiver trois essais comparables, les sorties brutes, la charge, les ressources et les limites avant toute optimisation.
- [ ] Injecter au moins deux pannes contrôlées : latence/erreur d’un dépendant et arrêt d’un processus ou épuisement de ressource simulé.
- [ ] Produire un dashboard simple, une alerte actionnable, un runbook, un postmortem et une preuve S6 de release/rollback ou récupération.

## Extensions Depth : une à la fois

- [ ] Tracer une requête à travers plusieurs services ; ajouter sampling motivé et propagation de contexte.
- [ ] Tester un budget d’erreur, une alerte anti-bruit et un exercice d’astreinte simulé.
- [ ] Comparer les résultats avant/après une correction et vérifier qu’elle n’a pas déplacé le coût ou la panne ailleurs.

## Tests d’acceptation

- [ ] Une requête peut être suivie de bout en bout sans exposer jetons, mots de passe ou corps sensibles.
- [ ] L’injection de panne déclenche le signal attendu dans un délai mesuré ; la cause demeure une hypothèse jusqu’à corroboration.
- [ ] Le runbook permet à une autre personne de reproduire le diagnostic ; rollback/récupération est testée, pas seulement écrite.
- [ ] Le postmortem sépare chronologie, impact observé, causes confirmées, facteurs contributifs et actions de prévention.

## Chaîne pédagogique

Relie ce projet à [59 : Atelier DevOps/SRE](../../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) : le dashboard n’est pas la preuve finale. Il doit conduire à une décision, puis à une vérification après l’action.

## Dossier de preuves attendu

`SLO.md`, `OBSERVABILITY.md`, `LOAD-TEST-REPORT.md` issu du pont 11 avec trois sorties brutes et protocole, runbook, postmortem, ADR sur les signaux retenus, S6.

## Hors périmètre et limites

Pas besoin de Kubernetes, d’un outil payant ou d’un dashboard très visuel. Ne prétends pas garantir une disponibilité réelle à partir d’un test local de quelques minutes.

## Ponts vers AF

[Observability](../../03-PILOTAGE/05-OBSERVABILITY/README.md), [Fiabilité SLO](../../03-PILOTAGE/06-FIABILITE-SLO/README.md), [Incident Commander Gate](../../06-ANNEXES-TRANSVERSES/50-INCIDENT-COMMANDER-GATE.md), [OpenTelemetry](../../06-ANNEXES-TRANSVERSES/55-REFERENCES-TECHNIQUES-VIVANTES.md).

## Soutenance sans assistance

En 10–15 minutes, explique le besoin, les invariants, deux options, la défaillance la plus grave, le résultat d’un test réel, une limite et la prochaine mesure qui pourrait changer ta décision. Puis réalise une modification non préparée sans suivre pas à pas une sortie IA. Si tu ne peux pas le faire, la preuve reste `REVISE` même si la démo fonctionne.

## Verdict

- `PASS` : le minimum, les tests et les preuves sont exécutés et reproductibles ; aucun échec éliminatoire du contrat commun.
- `REVISE` : le comportement de base existe mais la preuve, la sécurité ou la récupération est incomplète.
- `FAIL` : les invariants critiques sont violés ou le résultat ne peut pas être vérifié.

Un `PASS` signifie que ce projet pédagogique est validé. Il ne signifie pas que tu as acquis un grade d’entreprise ou une expérience de production supérieure à son niveau réel.
