---
stability: evolutif
acte: maitrise
noyau: non
route: depth
---

# 01 : La Tour de Contrôle

> Observabilité OpenTelemetry, SLO, tests de charge, chaos contrôlé et postmortems.

**Place dans le parcours :** Base opérationnelle : à réutiliser dans les projets suivants.  
**Prérequis :** HTTP/API, gestion des erreurs, tests, bases Linux/containers ; module 03-PILOTAGE/05-OBSERVABILITY et 06-FIABILITE-SLO.

## Mission

Faire fonctionner un service que tu comprends et le rendre observable. Le but n’est pas d’avoir de jolis dashboards ; il faut détecter une dégradation, diagnostiquer une cause probable et prouver la récupération.

## Version de départ : obligatoire

- [ ] Prendre un service existant (API de projet ou service distribué Arena) ; instrumenter traces, métriques et journaux corrélés avec OpenTelemetry.
- [ ] Définir 2–3 SLI utiles (disponibilité de requête, latence, taux d’erreur ou fraîcheur) puis un SLO motivé par le besoin utilisateur.
- [ ] Ajouter health/readiness distincts si le système le justifie, délais d’attente, limites de charge et identifiants de corrélation ; ne pas journaliser secrets ou données sensibles.
- [ ] Créer un test de charge reproductible avec environnement, scénario et limites consignés ; mesurer une ligne de base avant d’optimiser.
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

`SLO.md`, `OBSERVABILITY.md`, scénario de charge et données brutes, runbook, postmortem, ADR sur les signaux retenus, S6.

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
