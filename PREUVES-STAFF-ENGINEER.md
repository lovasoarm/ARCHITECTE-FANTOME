---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Preuves staff engineer : les six familles, la septième pièce, et où elles se prouvent

Temps de lecture ~6 min

Ce fichier n'est pas un résumé pédagogique. C'est un point d'entrée pour examiner les preuves : pour chacune des six familles de compétences visées, il indique le livrable que TU produis et l'endroit du parcours qui te prépare à le produire. Il ne certifie ni une expérience professionnelle ni un niveau de poste ; le recruteur, le jury ou l'organisation apprécie les preuves dans leur contexte.

Deux colonnes à distinguer, et ne jamais confondre :

- **Où ça s'apprend** : le fichier du parcours qui enseigne et fait pratiquer.
- **Ce que tu montres** : le fichier que tu produis dans ton propre dépôt de projet fil rouge. Tant qu'il n'existe pas chez toi, la famille n'est pas prouvée, même si tu as lu le module.

## Distinguer preuve pédagogique et preuve terrain

Les exercices, revues simulées et plans rédigés seul peuvent produire des preuves de préparation `T0/T1`. Ils ne ferment pas à eux seuls les critères d’influence collective, d’adoption ou de mentorat qui supposent des tiers réels.

Le [Pont preuve terrain](06-ANNEXES-TRANSVERSES/43-PONT-PREUVE-TERRAIN.md) définit les niveaux T0 à T4. Une simulation AF peut démontrer un raisonnement ; elle ne doit jamais être présentée comme une responsabilité de production que l'apprenant n'a pas réellement exercée.

## Contrat de sortie : `PREUVES/` dans le dépôt apprenant

ARCHITECTE-FANTOME distingue volontairement **le curriculum** et **la preuve**.

Le dépôt AF fournit les exercices, modèles, gates et critères. Le dépôt du projet
fil rouge de l'apprenant fournit les preuves exécutées. La présence de ce fichier
ne vaut donc jamais preuve de réussite.

À partir de l’entrée en Épreuve, initialise ce dossier et ajoute chaque pièce au moment où la compétence correspondante est étudiée ou démontrée. **La présence complète de toutes les pièces est un critère de sortie Staff, pas un prérequis pour entrer en Épreuve.**

```text
PREUVES/
├── 00_INDEX.md
├── 06A-BUDGET-CLOUD.md
├── ADR-PRINCIPAL.md           # index/synthèse, pas le remplacement des ADR détaillés
├── ADR/
│   ├── 001-contextes-bornes.md
│   ├── 002-persistance.md
│   └── 003-rupture-contrat.md
├── SLO.md
├── REVUE-SECURITE.md
├── REVUE-DE-CODE.md
├── DECISION-ARBITRAGE.md
├── NOTE-DIRECTION.md
├── PLAN-MENTORAT.md
├── LIVRAISON-EXPLOITATION.md
├── EVALUATION-IA.md
├── STANDARDS-AGENTS.md        # seulement si des agents/automatisations autonomes sont utilisés
├── IA-EN-PROD.md              # seulement si une brique IA est intégrée au système
└── PORTAGE.md
```

`PREUVES/00_INDEX.md` doit contenir pour chaque pièce : statut, commit source,
date de mesure, lien vers l'artefact, preuve de recroisement et dernier passage
du gate.

### Gate de sortie

Aucune famille S1–S6 n'est considérée comme **PROUVÉE** tant que ses pièces
applicables ne sont pas physiquement présentes, vérifiables et recroisées avec au moins
une autre famille. Une pièce conditionnelle non applicable doit être accompagnée d’une
justification explicite ; son absence silencieuse ne vaut jamais conformité. `APPLICABILITY.md` est ajouté lorsque le système traite des données/secteurs réglementés, opère dans plusieurs juridictions ou influence une décision encadrée ; dans les autres cas, documente pourquoi l’analyse approfondie n’est pas déclenchée.

Le capstone peut être terminé techniquement tout en restant **NON CERTIFIÉ STAFF**
si le dossier `PREUVES/` est incomplet. Cette séparation évite le faux positif « j'ai lu le cursus,
donc je peux prouver le niveau ». S6 et G8 sont deux contrôles différents : livraison/exploitation
d'un côté, évaluation critique de l'IA de l'autre. Le benchmark IA n'oblige pas à ajouter un LLM
au fil rouge.

## S1 : Systèmes, backend et cloud

- Où ça s'apprend : [03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md), [02-SCALABILITY/01-00-why-scalability.md](05-MAITRISE/02-SCALABILITY/01-00-why-scalability.md), [01-DATABASES/01-00-why-databases.md](05-MAITRISE/01-DATABASES/01-00-why-databases.md), [19-API-CRAFT/01-00-why-api-craft.md](02-CONSTRUCTION/19-API-CRAFT/01-00-why-api-craft.md).
- Ce que tu montres : `06A-BUDGET-CLOUD.md` **de ton dépôt de projet fil rouge** : une estimation mensuelle du coût pour les scénarios 100, 10 000 et 1 000 000 d'utilisateurs, une ligne par catégorie de service, avec le transfert sortant inclus. Ce document n'est pas une facture réellement payée : chaque prix doit être relié à une source, une région, une unité, une date de consultation et des hypothèses de consommation. Une simulation pédagogique reste explicitement marquée comme simulation. Exercice 1 du module cloud, repris en section 3 du dossier final.
- Recroisement exigé : ce budget doit apparaître dans les tensions de [04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md](04-EPREUVE/05-CAPSTONE-ARENA/06-addendum-staff-engineer.md).

## S2 : Architecture logicielle

- Où ça s'apprend : [16-DDD-CONTRATS/01-00-why-ddd-contrats.md](02-CONSTRUCTION/16-DDD-CONTRATS/01-00-why-ddd-contrats.md), [14-ARCHITECTURE-PATTERNS/01-00-why-architecture-patterns.md](02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS/01-00-why-architecture-patterns.md), [15-ARCHI-LAB/README.md](02-CONSTRUCTION/15-ARCHI-LAB/README.md).
- Ce que tu montres : le dossier `ADR/` de ton projet, avec au minimum un ADR de découpage en contextes bornés, un ADR de choix de persistance, un ADR de rupture de contrat avec sa date d'extinction. Le gabarit de mini-projet impose déjà ce dossier : [02-MINI-PROJECTS/01A-00-why-mini-projects.md](02-CONSTRUCTION/02-MINI-PROJECTS/01A-00-why-mini-projects.md).
- Recroisement exigé : chaque ADR chiffre au moins une conséquence en coût (S1) ou en disponibilité (S3).

## S3 : Sécurité et fiabilité

- Où ça s'apprend : [06-FIABILITE-SLO/01-00-why-fiabilite-slo.md](03-PILOTAGE/06-FIABILITE-SLO/01-00-why-fiabilite-slo.md), [04-SECURITY/01-00-why-security.md](03-PILOTAGE/04-SECURITY/01-00-why-security.md), [05-OBSERVABILITY/01-00-why-observability.md](03-PILOTAGE/05-OBSERVABILITY/01-00-why-observability.md), [04-EPREUVE/01-BONUS-VAULT/04-security-cost-privacy.md](04-EPREUVE/01-BONUS-VAULT/04-security-cost-privacy.md).
- Ce que tu montres : `SLO.md` **de ton dépôt de projet fil rouge**, avec la phrase d'objectif, le budget d'erreur exprimé en requêtes ratées par semaine, le RTO mesuré chronomètre en main lors de la restauration, et la liste des alertes qui réveillent quelqu'un. Plus le fichier de revue de sécurité produit au passage BONUS-VAULT.
- Deuxième pièce, obligatoire : `REVUE-SECURITE.md` **de ton dépôt de projet fil rouge**, en trois sections produites par [03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md](03-PILOTAGE/04-SECURITY/11-secrets_et_rotation.md) (inventaire des secrets et délai de révocation mesuré), [12-chiffrement_repos_transit.md](03-PILOTAGE/04-SECURITY/12-chiffrement_repos_transit.md) (ce qui est chiffré, contre quel adversaire, coût mesuré) et [13-autorisation_rbac.md](03-PILOTAGE/04-SECURITY/13-autorisation_rbac.md) (matrice rôles × actions, surface évaluée et findings classés par gravité au premier passage). Sans ces éléments vérifiables, la sécurité de S3 reste déclarative.
- Recroisement exigé : le SLO doit être tenable avec le budget S1. Si les deux ne se contredisent nulle part, l'un des deux n'a pas été chiffré sérieusement.

## S4 : Produit et business

- Où ça s'apprend : [08-PRODUIT-COUT-ROI/01-00-why-produit-cout-roi.md](03-PILOTAGE/08-PRODUIT-COUT-ROI/01-00-why-produit-cout-roi.md), [01-PROBLEM-HUNT/README.md](01-CADRAGE/01-PROBLEM-HUNT/README.md), [05-MVP-SPLIT/README.md](01-CADRAGE/05-MVP-SPLIT/README.md), [01-ROADMAP-RUN/README.md](03-PILOTAGE/01-ROADMAP-RUN/README.md).
- Ce que tu montres : `DECISION-ARBITRAGE.md` **de ton dépôt de projet fil rouge** : une page qui traite le changement de spec imposé au capstone ([04-EPREUVE/05-CAPSTONE-ARENA/05-changement-de-spec.md](04-EPREUVE/05-CAPSTONE-ARENA/05-changement-de-spec.md)) avec les trois nombres valeur, coût, risque, leurs sources, et le point mort du chantier retenu.
- Recroisement exigé : au moins un des trois nombres vient du budget cloud S1.

## S5 : Leadership et pédagogie

- Où ça s'apprend : [11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md](03-PILOTAGE/11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md), [10-TEAM-CRAFT/01-00-why-team-craft.md](03-PILOTAGE/10-TEAM-CRAFT/01-00-why-team-craft.md), [09-TEAM-QUEST/README.md](03-PILOTAGE/09-TEAM-QUEST/README.md).
- Ce que tu montres en préparation : deux pièces, toutes deux productibles seul, qui ne ferment pas à elles seules G7. Une revue de code écrite à trois niveaux annoncés, avec une référence immuable au commit audité (SHA complet) et la passe de contradiction S5 jouée sur ton bloquant. Le dépôt peut être public, privé ou anonymisé selon les contraintes de confidentialité ; aucune publication de code propriétaire, secret ou donnée personnelle n'est requise. Et la note d'une page destinée à une direction non technique, section 6 du dossier final [05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md), sans un seul terme technique non expliqué.
- `STANDARDS-AGENTS.md` est **conditionnel** : il est requis lorsque le système délègue des décisions à des agents ou automatismes autonomes. Il doit préciser tâches déléguées, permissions, validations humaines, vérification des sorties, budget et arrêt. Si aucun agent n’est utilisé, documente cette décision et son périmètre dans `EVALUATION-IA.md` ; ne fabrique pas un fichier de gouvernance fictif.
- `PLAN-MENTORAT.md` décrit une trajectoire de progression observée chez une autre personne : point de départ, objectif observable, jalons, retours et bilan. Le plan peut être préparé seul, mais l’exécution et le résultat ne deviennent une preuve de mentorat qu’avec une personne réelle, son consentement et des éléments corroborant la progression. Une simulation reste une préparation.
- Recroisement exigé : la note reprend les chiffres exacts de S1 et la promesse de service de S3. Si des agents autonomes sont utilisés, leur coût plafond dans `STANDARDS-AGENTS.md` doit être cohérent avec le budget S1 ; sinon, le choix de non-usage et son périmètre sont cohérents avec `EVALUATION-IA.md`.

## S6 : Livraison & exploitation

- Ce que tu montres : `LIVRAISON-EXPLOITATION.md` **de ton dépôt de projet fil rouge** : version livrée, procédure de release, migration, contrôles qualité, signaux post-déploiement, critère de rollback/recovery et preuve datée d'une panne contrôlée ou d'un essai de récupération.
- Où ça s'apprend : [modèle de preuve S6](06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/07-S6-LIVRAISON-EXPLOITATION.md), fiabilité/SLO, sécurité, cloud et qualité.
- Recroisement exigé : la procédure protège le SLO S3, son coût et ses contraintes sont compatibles avec S1, et les décisions risquées sont reliées à un ADR S2.

### G8 : Évaluation IA et automatisation vérifiée (contrôle transversal, pas une famille supplémentaire)

- Ce que tu montres : `EVALUATION-IA.md`, produit par le laboratoire [Produit IA de référence](06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE/README.md). La preuve peut être un test local déterministe sans clé API : hypothèses, jeu d'évaluation versionné, critères, résultats, erreurs, limites, coût/latence quand mesurables, sécurité et cas où l'IA est refusée.
- Si le fil rouge embarque une brique IA, ajoute `IA-EN-PROD.md` avec son coût plafond, ses permissions, son SLO ou mode dégradé, son observabilité et ses conditions d'arrêt. C'est un supplément conditionnel, pas une exigence d'ajouter un LLM à tout projet.
- Si des agents autonomes sont utilisés, `STANDARDS-AGENTS.md` décrit les tâches délégables, permissions, validation humaine, budget et commande de vérification. En l’absence d’agents, `EVALUATION-IA.md` documente la décision de non-usage et ses limites.
- Règle : une sortie générée ne vaut jamais preuve avant vérification indépendante du comportement.

## S7 : Pensée transférable (la septième pièce)

- Où ça s'apprend : les 38 fichiers `99-PORTAGE-MENTAL.md` des modules (exemple : [99-PORTAGE-MENTAL.md](02-CONSTRUCTION/12-TYPESCRIPT/99-PORTAGE-MENTAL.md)), qui portent le raisonnement d'un langage à l'autre, et [03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md) pour le passage d'un fournisseur à l'autre. Le chiffrage vient de [03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md).
- Ce que tu montres : `PORTAGE.md` **de ton dépôt de projet fil rouge** : un service du fil rouge réécrit dans un second langage et réellement déployé chez un second fournisseur, en trois sections : ce qui a été transféré tel quel, ce qui a dû être repensé, et l'écart de coût mensuel constaté entre les deux fournisseurs. Le mode `PORTAGE_CONÇU` (tests des deux implémentations en local + cible cloud documentée) permet d'entrer au Capstone, mais ne ferme pas S7 ; seule la preuve `PORTAGE_EXÉCUTÉ` ferme cette famille.
- Modèle rempli : [06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md](06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).
- Recroisement exigé : les prix viennent du même relevé que le budget S1, les invariants portés sont ceux de l'ADR S2, et le SLO tenu côté cible est celui de S3.
- Pourquoi cette pièce compte plus que les autres pour un recruteur : les six premières prouvent que tu sais faire ici. Celle-ci prouve que ce que tu sais ne dépend ni du langage ni du fournisseur. C'est la seule que la plupart des candidats ne peuvent pas produire.

## Terrains supplémentaires qui renforcent les familles

- **Client Systems / Flutter** : sert de terrain S1/S2/S3 pour montrer qu’un client n’est pas une simple couche d’écran : cache, offline, contrat, sécurité, performance et observabilité.
- **Platform Engineering** : renforce S1/S3/S5 en faisant traiter GitOps, dérive, IDP, golden paths, supply chain et expérience développeur comme un produit interne.
- **CMS Architecture Lab** : renforce S4/S2 en forçant le choix entre couplé, headless et custom avec coût, migration, sécurité et conditions de sortie.
- **IA Governance & Security** : renforce G8 (évaluation IA), et S3/S6 uniquement lorsque le système réel intègre une brique IA : threat model, permissions, évaluation, observabilité, coût, fallback et kill switch.

## Le livrable qui prouve que les six tiennent ensemble

Une famille prouvée seule ne prouve rien pour ce profil. La pièce qui tranche est le dossier unique : [05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md). Sa section 8, "Les trois tensions", est la seule preuve acceptable de croisement : trois contradictions réelles entre deux familles, chiffrées des deux côtés, arbitrées par écrit.

## État actuel des preuves, sans complaisance

En l'état, le parcours produit les six familles côté enseignement et côté exercice. Ce qui n'existe pas encore, et qu'aucun texte ne remplacera :

- Les six fichiers de preuve ci-dessus vivent dans TON dépôt de projet, pas ici. Tant qu'ils ne sont pas écrits, coche zéro famille.
- S6 est obligatoire dans la sortie Staff et signifie **livraison & exploitation** : release traçable, vérification post-déploiement, rollback/recovery et preuve datée d'un test ou d'une panne contrôlée. G8 exige séparément `EVALUATION-IA.md`. Le fil rouge n'a pas à embarquer une brique IA ; `IA-EN-PROD.md` n'est requis que si le système l'intègre réellement.
- La préparation S5 peut commencer en solo : revue de code sur commit immuable (SHA complet), note direction, analyse contradictoire et plan de mentorat. Mais la preuve **d’influence** S5/G7 ne se ferme pas en solo : elle exige au moins une décision réellement discutée avec d’autres personnes, une adoption ou un changement de pratique observé et une corroboration indépendante. Un jeu de rôle ou une contradiction du CONTRADICTEUR est un entraînement `SIMULATION`, jamais une adoption réelle. Aucun code propriétaire, secret ou donnée personnelle ne doit être publié pour satisfaire le gate.

Une grille remplie, un score de challenge ou un artefact produit seul ne délivre aucun titre et ne transforme pas une simulation en expérience professionnelle. Les preuves doivent être lues avec leur niveau T0–T4, leur périmètre, leurs limites et, lorsque le gate le demande, une revue ou une corroboration externe.

