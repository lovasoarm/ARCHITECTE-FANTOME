---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Preuves staff engineer : les six familles, la septième pièce, et où elles se prouvent

Temps de lecture ~6 min

Ce fichier n'est pas un résumé pédagogique. C'est la pièce qu'un recruteur ou un jury ouvre en premier : pour chacune des six familles de compétences visées, le chemin exact du livrable que TU produis, et l'endroit du parcours qui te le fait produire.

Deux colonnes à distinguer, et ne jamais confondre :

- **Où ça s'apprend** : le fichier du parcours qui enseigne et fait pratiquer.
- **Ce que tu montres** : le fichier que tu produis dans ton propre dépôt de projet fil rouge. Tant qu'il n'existe pas chez toi, la famille n'est pas prouvée, même si tu as lu le module.

## Contrat de sortie : `PREUVES/` dans le dépôt apprenant

ARCHITECTE-FANTOME distingue volontairement **le curriculum** et **la preuve**.

Le dépôt AF fournit les exercices, modèles, gates et critères. Le dépôt du projet
fil rouge de l'apprenant fournit les preuves exécutées. La présence de ce fichier
ne vaut donc jamais preuve de réussite.

À partir de l'entrée en Épreuve, le dépôt apprenant doit contenir :

```text
PREUVES/
├── 00_INDEX.md
├── 06A-BUDGET-CLOUD.md
├── ADR-PRINCIPAL.md
├── SLO.md
├── REVUE-DE-CODE.md
├── NOTE-DIRECTION.md
├── IA-EN-PROD.md
└── PORTAGE.md
```

`PREUVES/00_INDEX.md` doit contenir pour chaque pièce : statut, commit source,
date de mesure, lien vers l'artefact, preuve de recroisement et dernier passage
du gate.

### Gate de sortie

Aucune famille S1–S6 n'est considérée comme **PROUVÉE** tant que sa pièce n'est
pas physiquement présente, exécutable ou vérifiable, et recroisée avec au moins
une autre famille.

Le capstone peut être terminé techniquement tout en restant **NON CERTIFIÉ STAFF**
si le dossier `PREUVES/` est incomplet. Cette séparation évite précisément le
faux positif « j'ai lu le cursus, donc je peux prouver le niveau ».

## S1 : Systèmes, backend et cloud

- Où ça s'apprend : [03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/01-00-why-cloud-foundations.md), [02-SCALABILITY/01-00-why-scalability.md](05-MAITRISE/02-SCALABILITY/01-00-why-scalability.md), [01-DATABASES/01-00-why-databases.md](05-MAITRISE/01-DATABASES/01-00-why-databases.md), [19-API-CRAFT/01-00-why-api-craft.md](02-CONSTRUCTION/19-API-CRAFT/01-00-why-api-craft.md).
- Ce que tu montres : `06A-BUDGET-CLOUD.md` **de ton dépôt de projet fil rouge** : la facture mensuelle chiffrée à 100, 10 000 et 1 000 000 d'utilisateurs, une ligne par catégorie de service, la ligne egress incluse. Exercice 1 du module cloud, repris en section 3 du dossier final.
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
- Ce que tu montres : deux pièces, toutes deux productibles seul. Une revue de code écrite à trois niveaux annoncés, avec une référence immuable au commit audité (SHA complet) et la passe de contradiction S5 jouée sur ton bloquant. Le dépôt peut être public, privé ou anonymisé selon les contraintes de confidentialité ; aucune publication de code propriétaire, secret ou donnée personnelle n'est requise. Et la note d'une page destinée à une direction non technique, section 6 du dossier final [05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md), sans un seul terme technique non expliqué.
- Troisième pièce, obligatoire depuis A16 : `STANDARDS-AGENTS.md` **de ton dépôt de projet fil rouge** ([03-PILOTAGE/11-LEADERSHIP-MENTORAT/05-standards_pour_agents.md](03-PILOTAGE/11-LEADERSHIP-MENTORAT/05-standards_pour_agents.md)) : décisions autonomes de l'agent, validations requises, commande de vérification de sortie, coût plafond d'une tâche déléguée. Diriger des agents est un acte de leadership : sans ce fichier, S5 n'est pas couvert et le dossier unique est refusé.
- Quatrième pièce, obligatoire : `PLAN-MENTORAT.md` **de ton dépôt de projet fil rouge** ([03-PILOTAGE/11-LEADERSHIP-MENTORAT/06-plan_de_mentorat.md](03-PILOTAGE/11-LEADERSHIP-MENTORAT/06-plan_de_mentorat.md)) : point de départ observé, objectif unique formulé en acte observable, trois jalons datés avec leur preuve, jalon 1 constaté, et le bilan une fois la date de fin passée. Variante solo admise sur un contributeur open source. Le mentorat est ce que la revue ponctuelle n'est pas : une trajectoire datée.
- Recroisement exigé : la note reprend les chiffres exacts de S1 et la promesse de service de S3, et le coût plafond de `STANDARDS-AGENTS.md` est cohérent avec le budget S1.

## S6 : IA et automatisation

- Ce que tu montres : `IA-EN-PROD.md` **de ton dépôt de projet fil rouge**. La pièce doit pointer vers un produit IA réel ou un service en production-like, pas uniquement vers un cahier des charges. : coût par utilisateur actif, plafond retenu, timeout et réponse dégradée, SLO séparé de la brique IA, et le jeu de 20 cas d'évaluation rejoué à chaque changement de modèle.
- Pièce jointe partagée avec S5 : `STANDARDS-AGENTS.md` **de ton dépôt de projet fil rouge**, qui borne ce que la brique IA et les agents décident sans toi.
- Recroisement exigé : le coût variable apparaît dans le budget S1, la sortie du modèle est validée selon les règles S3, et le coût plafond de `STANDARDS-AGENTS.md` couvre les appels de cette brique IA.

## S7 : Pensée transférable (la septième pièce)

- Où ça s'apprend : les 38 fichiers `99-PORTAGE-MENTAL.md` des modules (exemple : [99-PORTAGE-MENTAL.md](02-CONSTRUCTION/12-TYPESCRIPT/99-PORTAGE-MENTAL.md)), qui portent le raisonnement d'un langage à l'autre, et [03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/99-PORTAGE-MENTAL.md) pour le passage d'un fournisseur à l'autre. Le chiffrage vient de [03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md](03-PILOTAGE/07-CLOUD-FOUNDATIONS/05-releve_tarifaire_reel.md).
- Ce que tu montres : `PORTAGE.md` **de ton dépôt de projet fil rouge** : un service du fil rouge réécrit dans un second langage et redéployé chez un second fournisseur, en trois sections : ce qui a été transféré tel quel, ce qui a dû être repensé, et l'écart de coût mensuel constaté entre les deux fournisseurs.
- Modèle rempli : [06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md](06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).
- Recroisement exigé : les prix viennent du même relevé que le budget S1, les invariants portés sont ceux de l'ADR S2, et le SLO tenu côté cible est celui de S3.
- Pourquoi cette pièce compte plus que les autres pour un recruteur : les six premières prouvent que tu sais faire ici. Celle-ci prouve que ce que tu sais ne dépend ni du langage ni du fournisseur. C'est la seule que la plupart des candidats ne peuvent pas produire.

## Terrains supplémentaires qui renforcent les familles

- **Client Systems / Flutter** : sert de terrain S1/S2/S3 pour montrer qu’un client n’est pas une simple couche d’écran : cache, offline, contrat, sécurité, performance et observabilité.
- **Platform Engineering** : renforce S1/S3/S5 en faisant traiter GitOps, dérive, IDP, golden paths, supply chain et expérience développeur comme un produit interne.
- **CMS Architecture Lab** : renforce S4/S2 en forçant le choix entre couplé, headless et custom avec coût, migration, sécurité et conditions de sortie.
- **IA Governance & Security** : renforce S3/S6 avec threat model, permissions agentiques, évaluation, observabilité, coût et kill switch.

## Le livrable qui prouve que les six tiennent ensemble

Une famille prouvée seule ne prouve rien pour ce profil. La pièce qui tranche est le dossier unique : [05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md](05-MAITRISE/08-MAITRISE-STAFF-ENGINEER/02-dossier_unique.md). Sa section 8, "Les trois tensions", est la seule preuve acceptable de croisement : trois contradictions réelles entre deux familles, chiffrées des deux côtés, arbitrées par écrit.

## État actuel des preuves, sans complaisance

En l'état, le parcours produit les six familles côté enseignement et côté exercice. Ce qui n'existe pas encore, et qu'aucun texte ne remplacera :

- Les six fichiers de preuve ci-dessus vivent dans TON dépôt de projet, pas ici. Tant qu'ils ne sont pas écrits, coche zéro famille.
- S6 n'est plus optionnelle dans la sortie Staff : le fil rouge doit contenir une brique IA/automatisation réelle, ou un produit de référence explicitement accepté par le capstone, avec évaluation, sécurité, coût, observabilité et modes d'échec.
- La famille S5 **se prouve intégralement en solo**. La revue de [02-revue_de_code_trois_niveaux.md](03-PILOTAGE/11-LEADERSHIP-MENTORAT/02-revue_de_code_trois_niveaux.md) doit pointer vers un commit immuable (SHA complet) dans un dépôt public, privé ou anonymisé auquel l'évaluateur peut accéder. Aucun code propriétaire, secret ou donnée personnelle ne doit être publié pour satisfaire le gate. La contradiction vient de la passe S5 du [CONTRADICTEUR](06-ANNEXES-TRANSVERSES/09-CONTRADICTEUR.md), jouée seul. Une réponse de mainteneur ou un commentaire reçu sur la note de direction sont des bonus, jamais des conditions.
