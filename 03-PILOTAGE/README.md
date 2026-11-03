---
stability: intemporel
acte: restituer
---

# 03-PILOTAGE : Niveau 3 : Senior

> Pour l'intégration entre modules, ne traite pas sécurité, observabilité, SLO, cloud et plateforme comme des checklists indépendantes. Termine les leçons correspondantes puis applique [59 : Atelier DevOps/SRE](../06-ANNEXES-TRANSVERSES/59-LAB-DEVOPS-LIFECYCLE.md) au même fil rouge : release, signal, incident, récupération et correction.

Porte d'entrée du palier. Douze modules. Tu tiens un système en production et tu le chiffres.
Livrables : `06A-BUDGET-CLOUD.md`, `SLO.md`, revue de sécurité, `STANDARDS-AGENTS.md`,
`DECISION-ARBITRAGE.md`.

Cinq modules **Staff** de ce palier : `06-FIABILITE-SLO`,
`07-CLOUD-FOUNDATIONS`, `08-PRODUIT-COUT-ROI`, `11-LEADERSHIP-MENTORAT`, `12-PLATFORM-ENGINEERING`. La
[02A-RETRO-BLOC-3-CONDUITE.md](02A-RETRO-BLOC-3-CONDUITE.md) les interroge, pas seulement ROADMAP /
QUALITY / TEAM-QUEST.

## Modules

| Dossier                                                      | Rôle                                                | Mode Survie |
| ------------------------------------------------------------ | --------------------------------------------------- | ----------- |
| [01-ROADMAP-RUN](01-ROADMAP-RUN/README.md)                   | risques et rythme                                   | :           |
| [02-WEB-INCLUSIVE](02-WEB-INCLUSIVE/README.md)               | accessibilité, i18n                                 | :           |
| [03-QUALITY-SHIELD](03-QUALITY-SHIELD/README.md)             | stratégie de tests en prod                          | :           |
| [04-SECURITY](04-SECURITY/README.md)                         | OWASP, secrets, privacy                             | oui         |
| [05-OBSERVABILITY](05-OBSERVABILITY/README.md)               | logs, traces, signaux                               | oui         |
| [06-FIABILITE-SLO](06-FIABILITE-SLO/README.md)               | SLO, RTO, panne provoquée                           | oui         |
| [07-CLOUD-FOUNDATIONS](07-CLOUD-FOUNDATIONS/README.md)       | budget 3 paliers, relevé daté                       | :           |
| [08-PRODUIT-COUT-ROI](08-PRODUIT-COUT-ROI/README.md)         | grille coût / risque / valeur                       | :           |
| [09-TEAM-QUEST](09-TEAM-QUEST/README.md)                     | flux d'équipe (variante solo)                       | :           |
| [10-TEAM-CRAFT](10-TEAM-CRAFT/README.md)                     | README, revue, conventions                          | :           |
| [11-LEADERSHIP-MENTORAT](11-LEADERSHIP-MENTORAT/README.md)   | influence sans autorité                             | :           |
| [12-PLATFORM-ENGINEERING](12-PLATFORM-ENGINEERING/README.md) | GitOps, IDP, golden paths, plateforme comme produit | :           |

Tu coches le niveau 3 quand la retrospective de palier est signée.
Le [Mode Survie](../00-SOCLE/01-GETTING-STARTED/09-ROUTE-SURVIE.md) s'arrête au Boss de sortie
de ce niveau : employable, pas Staff.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [`01-ROADMAP-RUN/`](01-ROADMAP-RUN/README.md)
- [`02-WEB-INCLUSIVE/`](02-WEB-INCLUSIVE/README.md)
- [`03-QUALITY-SHIELD/`](03-QUALITY-SHIELD/README.md)
- [`04-SECURITY/`](04-SECURITY/README.md)
- [`05-OBSERVABILITY/`](05-OBSERVABILITY/README.md)
- [`06-FIABILITE-SLO/`](06-FIABILITE-SLO/README.md)
- [`07-CLOUD-FOUNDATIONS/`](07-CLOUD-FOUNDATIONS/README.md)
- [`08-PRODUIT-COUT-ROI/`](08-PRODUIT-COUT-ROI/README.md)
- [`09-TEAM-QUEST/`](09-TEAM-QUEST/README.md)
- [`10-TEAM-CRAFT/`](10-TEAM-CRAFT/README.md)
- [`11-LEADERSHIP-MENTORAT/`](11-LEADERSHIP-MENTORAT/README.md)
- [`12-PLATFORM-ENGINEERING/`](12-PLATFORM-ENGINEERING/README.md)
- [Rétrospective de bloc : Bloc CONDUITE (de 03-PILOTAGE/01-ROADMAP-RUN a 03-PILOTAGE/11-LEADERSHIP-MENTORAT)](02A-RETRO-BLOC-3-CONDUITE.md)

<!-- CONTENU-DOSSIER:fin -->

> **Compagnons actifs :** [Code d'honneur CrazyDevs](../06-ANNEXES-TRANSVERSES/07-FUN-CODE-HONNEUR.md) · [Synchronisation TECH-ILA](../06-ANNEXES-TRANSVERSES/04-TECH-ILA/02-SYNCHRONISATION-PARCOURS.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **décision qui traverse les équipes** : Rédige une RFC/ADR sur une décision Kintana qui affecte API, données et exploitation. Compare au moins deux options, demande une revue contradictoire et transforme les objections en critères d’acceptation. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : La décision a un propriétaire, un coût, un plan de migration et une condition de révision ; l’adoption réelle reste « non démontrée » tant qu’une équipe ne l’a pas adoptée.
