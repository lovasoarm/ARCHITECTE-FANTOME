# PREUVES STAFF ENGINEER : LES SIX FAMILLES, LA SEPTIÈME PIÈCE, ET OÙ ELLES SE PROUVENT

Ce fichier n'est pas un résumé pédagogique. C'est la pièce qu'un recruteur ou un jury ouvre en premier : pour chacune des six familles de compétences visées, le chemin exact du livrable que TU produis, et l'endroit du parcours qui te le fait produire.

Deux colonnes à distinguer, et ne jamais confondre :

- **Où ça s'apprend** : le fichier du parcours qui enseigne et fait pratiquer.
- **Ce que tu montres** : le fichier que tu produis dans ton propre dépôt de projet fil rouge. Tant qu'il n'existe pas chez toi, la famille n'est pas prouvée, même si tu as lu le module.

## S1 : Systèmes, backend et cloud

- Où ça s'apprend : [03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md](03-PILOTAGE/07_cloud_foundations/00_why_cloud_foundations.md), [05-MAITRISE/02_scalability](05-MAITRISE/02_scalability/00_why_scalability.md), [05-MAITRISE/01_databases](05-MAITRISE/01_databases/00_why_databases.md), [02-CONSTRUCTION/19_api_craft](02-CONSTRUCTION/19_api_craft/00_why_api_craft.md).
- Ce que tu montres : `BUDGET-CLOUD.md` de ton projet fil rouge : la facture mensuelle chiffrée à 100, 10 000 et 1 000 000 d'utilisateurs, une ligne par catégorie de service, la ligne egress incluse. Exercice 1 du module cloud, repris en section 3 du dossier final.
- Recroisement exigé : ce budget doit apparaître dans les tensions de [04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md](04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md).

## S2 : Architecture logicielle

- Où ça s'apprend : [02-CONSTRUCTION/16_ddd_contrats](02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md), [02-CONSTRUCTION/14_architecture_patterns](02-CONSTRUCTION/14_architecture_patterns/00_why_architecture_patterns.md), [02-CONSTRUCTION/15-ARCHI-LAB](02-CONSTRUCTION/15-ARCHI-LAB/README.md).
- Ce que tu montres : le dossier `ADR/` de ton projet, avec au minimum un ADR de découpage en contextes bornés, un ADR de choix de persistance, un ADR de rupture de contrat avec sa date d'extinction. Le gabarit de mini-projet impose déjà ce dossier : [02-CONSTRUCTION/02_mini_projects](02-CONSTRUCTION/02_mini_projects/00_why_mini_projects.md).
- Recroisement exigé : chaque ADR chiffre au moins une conséquence en coût (S1) ou en disponibilité (S3).

## S3 : Sécurité et fiabilité

- Où ça s'apprend : [03-PILOTAGE/06_fiabilite_slo](03-PILOTAGE/06_fiabilite_slo/00_why_fiabilite_slo.md), [03-PILOTAGE/04_security](03-PILOTAGE/04_security/00_why_security.md), [03-PILOTAGE/05_observability](03-PILOTAGE/05_observability/00_why_observability.md), [04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md](04-EPREUVE/01-BONUS-VAULT/05-security-cost-privacy.md).
- Ce que tu montres : `SLO.md` de ton projet, avec la phrase d'objectif, le budget d'erreur exprimé en requêtes ratées par semaine, le RTO mesuré chronomètre en main lors de la restauration, et la liste des alertes qui réveillent quelqu'un. Plus le fichier de revue de sécurité produit au passage BONUS-VAULT.
- Recroisement exigé : le SLO doit être tenable avec le budget S1. Si les deux ne se contredisent nulle part, l'un des deux n'a pas été chiffré sérieusement.

## S4 : Produit et business

- Où ça s'apprend : [03-PILOTAGE/08_produit_cout_roi](03-PILOTAGE/08_produit_cout_roi/00_why_produit_cout_roi.md), [01-CADRAGE/01-PROBLEM-HUNT](01-CADRAGE/01-PROBLEM-HUNT/README.md), [01-CADRAGE/05-MVP-SPLIT](01-CADRAGE/05-MVP-SPLIT/README.md), [03-PILOTAGE/01-ROADMAP-RUN](03-PILOTAGE/01-ROADMAP-RUN/README.md).
- Ce que tu montres : `DECISION-ARBITRAGE.md` : une page qui traite le changement de spec imposé au capstone ([04-EPREUVE/06-CAPSTONE-ARENA/05-changement-de-spec.md](04-EPREUVE/06-CAPSTONE-ARENA/05-changement-de-spec.md)) avec les trois nombres valeur, coût, risque, leurs sources, et le point mort du chantier retenu.
- Recroisement exigé : au moins un des trois nombres vient du budget cloud S1.

## S5 : Leadership et pédagogie

- Où ça s'apprend : [03-PILOTAGE/11_leadership_mentorat](03-PILOTAGE/11_leadership_mentorat/00_why_leadership_mentorat.md), [03-PILOTAGE/10_team_craft](03-PILOTAGE/10_team_craft/00_why_team_craft.md), [03-PILOTAGE/09-TEAM-QUEST](03-PILOTAGE/09-TEAM-QUEST/README.md).
- Ce que tu montres : deux pièces, toutes deux productibles seul. Une revue de code écrite à trois niveaux annoncés, publiée sur un dépôt open source public, avec l'URL permanente du commit audité (SHA complet) et la passe de contradiction S5 jouée sur ton bloquant. Et la note d'une page destinée à une direction non technique, section 6 du dossier final [05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md), sans un seul terme technique non expliqué.
- Troisième pièce, obligatoire depuis A16 : `STANDARDS-AGENTS.md` ([03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md](03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md)) — décisions autonomes de l'agent, validations requises, commande de vérification de sortie, coût plafond d'une tâche déléguée. Diriger des agents est un acte de leadership : sans ce fichier, S5 n'est pas couvert et le dossier unique est refusé.
- Recroisement exigé : la note reprend les chiffres exacts de S1 et la promesse de service de S3, et le coût plafond de `STANDARDS-AGENTS.md` est cohérent avec le budget S1.

## S6 : IA et automatisation

- Où ça s'apprend : [04-EPREUVE/04_ai_native_dev](04-EPREUVE/04_ai_native_dev/00_why_ai_native_dev.md), son pipeline RAG [04-EPREUVE/04_ai_native_dev/11b_construire_un_pipeline_rag.md](04-EPREUVE/04_ai_native_dev/11b_construire_un_pipeline_rag.md), l'ajout production [04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md](04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md), et [05-MAITRISE/04_ai_agents_and_autonomy](05-MAITRISE/04_ai_agents_and_autonomy/00_why_ai_agents.md). La preuve se produit au [challenge](04-EPREUVE/04_ai_native_dev/challenge.md) du module, combinée au [boss fight](04-EPREUVE/04_ai_native_dev/boss-fight.md).
- Ce que tu montres : `IA-EN-PROD.md` : coût par utilisateur actif, plafond retenu, timeout et réponse dégradée, SLO séparé de la brique IA, et le jeu de 20 cas d'évaluation rejoué à chaque changement de modèle.
- Pièce jointe partagée avec S5 : `STANDARDS-AGENTS.md`, qui borne ce que la brique IA et les agents décident sans toi.
- Recroisement exigé : le coût variable apparaît dans le budget S1, la sortie du modèle est validée selon les règles S3, et le coût plafond de `STANDARDS-AGENTS.md` couvre les appels de cette brique.

## S7 : Pensée transférable (la septième pièce)

- Où ça s'apprend : les 19 fichiers `98_PORTAGE_MENTAL.md` des modules, qui portent le raisonnement d'un langage à l'autre, et [03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md](03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md) pour le passage d'un fournisseur à l'autre. Le chiffrage vient de [03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md](03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md).
- Ce que tu montres : `PORTAGE.md` : un service du fil rouge réécrit dans un second langage et redéployé chez un second fournisseur, en trois sections — ce qui a été transféré tel quel, ce qui a dû être repensé, et l'écart de coût mensuel constaté entre les deux fournisseurs.
- Modèle rempli : [06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S7-PORTAGE.md](./06-ANNEXES-TRANSVERSES/14-PREUVES-MODELES/S7-PORTAGE.md).
- Recroisement exigé : les prix viennent du même relevé que le budget S1, les invariants portés sont ceux de l'ADR S2, et le SLO tenu côté cible est celui de S3.
- Pourquoi cette pièce compte plus que les autres pour un recruteur : les six premières prouvent que tu sais faire ici. Celle-ci prouve que ce que tu sais ne dépend ni du langage ni du fournisseur. C'est la seule que la plupart des candidats ne peuvent pas produire.

## Le livrable qui prouve que les six tiennent ensemble

Une famille prouvée seule ne prouve rien pour ce profil. La pièce qui tranche est le dossier unique : [05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md). Sa section 8, "Les trois tensions", est la seule preuve acceptable de croisement : trois contradictions réelles entre deux familles, chiffrées des deux côtés, arbitrées par écrit.

## État actuel des preuves, sans complaisance

À ce stade de la fusion, le parcours produit les six familles côté enseignement et côté exercice. Ce qui n'existe pas encore, et qu'aucun texte ne remplacera :

- Les six fichiers de preuve ci-dessus vivent dans TON dépôt de projet, pas ici. Tant qu'ils ne sont pas écrits, coche zéro famille.
- La famille S6 est la seule dont la mise en pratique dépend d'un choix de projet : si ton fil rouge n'a aucune brique IA, remplace-la par S4 ou S5 dans les quatre familles exigées par le capstone, et note ce choix ici même.
- La famille S5 **se prouve intégralement en solo** (corrigé en A6). La revue de [02_revue_de_code_trois_niveaux.md](03-PILOTAGE/11_leadership_mentorat/02_revue_de_code_trois_niveaux.md) porte sur un dépôt open source public et cite l'URL permanente du commit audité : n'importe qui peut rouvrir le diff et juger la revue, sans que personne ait à te répondre. La contradiction, elle, vient de la passe S5 du [CONTRADICTEUR](06-ANNEXES-TRANSVERSES/07-CONTRADICTEUR.md), jouée seul. Une réponse de mainteneur ou un commentaire reçu sur la note de direction sont des bonus datés, jamais des conditions : aucune preuve du dépôt ne dépend de la bonne volonté d'un inconnu.
