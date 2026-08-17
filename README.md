---
stability: perissable_2027
acte: restituer
---

```
   ____  ____   ___  _   _ ___ _____ _____ ____ _____ _____
  / ___||  _ \ / __|| | | |_ _|_   _| ____/ ___|_   _| ____|
  \___ \| |_) | |   | |_| || |  | | |  _|| |     | | |  _|
   ___) |  _ <| |__ |  _  || |  | | | |__| |___  | | | |___
  |____/|_| \_\\___||_| |_|___| |_| |_____\____| |_| |_____|
              F A N T O M E
```

# ARCHITECTE-FANTOME

Un seul parcours, six paliers, un seul fil de progression : de zéro jusqu'à un profil Staff Engineer / Principal Engineer à forte dimension Software / Solutions Architect.

Le nom dit ce que devient le diplômé : un Staff Engineer influence tout le système sans être visible partout. Il laisse une empreinte d'architecture dans chaque décision sans avoir écrit chaque ligne.

## La promesse

À la sortie, tu ne sais pas seulement coder proprement. Tu sais :

1. Décider quoi construire, et refuser par écrit ce qui ne vaut pas son coût.
2. Découper un système sur le langage du métier, et le documenter par des ADR.
3. Chiffrer ce que ton système coûte par mois, et ce que coûte une neuvième de disponibilité en plus.
4. Écrire la promesse de service que tu tiens, la mesurer, et dire ce que tu fais quand tu la brises.
5. Expliquer la même décision à une direction, à un produit, à des ops et à la conformité, chacun dans sa langue.
6. Intégrer une brique IA dans un produit réel, avec son plafond de coût et sa frontière de confiance.

Et surtout : les faire tenir ensemble sur un seul système, pas séparément dans six exercices.

## Comment lire ce repo

Un palier après l'autre, de `00-SOCLE` à `05-MAITRISE`. À l'intérieur d'un palier, dans l'ordre des numéros locaux. Les paliers 01 à 05 se terminent par une rétrospective de bloc obligatoire : ce n'est pas un bonus, c'est un point de passage.

Tu portes UN projet fil rouge, choisi au palier `01-CADRAGE`, et tu le gardes jusqu'au dernier fichier.

Le dossier `06-ANNEXES-TRANSVERSES` n'est pas un palier de progression : c'est la réserve de références qu'on consulte à tout moment.

## Le fil complet, avec sa traçabilité

Origine : **[M]** module venu de MyFunnyJS, **[P]** niveau venu de ProjectFunny, **[N]** module nouveau, écrit pour ce parcours fusionné.

### 00-SOCLE : avant tout, savoir écrire et raisonner

| Position | Contenu | Origine |
| --- | --- | --- |
| 01_getting_started | installer, configurer, écrire ses premières lignes | [M] |
| 02-PROLOGUE | les règles du jeu, le test d'entrée 10 questions | [P] |
| 03_referentiel | où tu en es, plateau, dépendances, répétition espacée | [M] |
| 04_fundamentals | variables, scope, fonctions, types, modules, regex | [M] |
| 05_problem_solving | décomposer un problème avant de coder | [M] |
| 06-MINDSET | penser en systèmes, en coûts, sous incertitude | [P] |

### 01-CADRAGE : poser un projet avant d'écrire du code

| Position | Contenu | Origine |
| --- | --- | --- |
| 01-PROBLEM-HUNT | séparer demande, besoin réel et contrainte | [P] |
| 02_async | event loop, promesses, backpressure | [M] |
| 03_debugging | méthode de recherche de bug | [M] |
| 04_error_handling | prévoir et traiter l'échec | [M] |
| 05-MVP-SPLIT | découper en tranches livrables, choisir son fil rouge | [P] |
| RETRO-BLOC-1-CADRAGE.md | rétrospective obligatoire | [P] |

### 02-CONSTRUCTION : le bloc le plus dense

| Position | Contenu | Origine |
| --- | --- | --- |
| 01-USER-WIZARD | parcours, états, formulaires, accessibilité | [P] |
| 02_mini_projects | les 19 mini-projets, débloqués par vagues | [M] |
| 03_testing | tests qui paient | [M] |
| 04_math_basics | les maths utiles au code | [M] |
| 05_memory_performance | mémoire, copies, profilage | [M] |
| 06_data_structures | choisir sa structure de données | [M] |
| 07_algorithms | complexité et algorithmes | [M] |
| 08-DATA-SPELLS | modéliser le domaine, migrations, requêtes | [P] |
| 09_functional_js | code prévisible | [M] |
| 10_design_patterns | patterns de conception | [M] |
| MI-RETRO-BLOC-2-BUILD.md | mi-rétrospective obligatoire, après le module 10 | [N] |
| 11_refactoring | réécrire sans casser | [M] |
| 12_typescript | typer pour attraper avant l'exécution | [M] |
| 13_runtime_env | où le code tourne vraiment | [M] |
| 14_architecture_patterns | SOLID, clean, event-driven, microservices | [M] |
| 15-ARCHI-LAB | frontières, couplage, choix d'architecture | [P] |
| 16_ddd_contrats | DDD, contextes bornés, CQRS, versioning de contrat | [N] |
| 17_oop_js | objets et prototypes | [M] |
| 18_web_concepts | comment deux machines se parlent | [M] |
| 19_api_craft | construire une API | [M] |
| 20-API-DOJO | contrats, idempotence, limites | [P] |
| RETRO-BLOC-2-BUILD.md | rétrospective obligatoire | [P] |

### 03-PILOTAGE : tenir un système dans la durée

| Position | Contenu | Origine |
| --- | --- | --- |
| 01-ROADMAP-RUN | planifier par le risque | [P] |
| 02_web_inclusive | accessibilité et internationalisation | [M] |
| 03-QUALITY-SHIELD | tests, revue, CI, incidents | [P] |
| 04_security | XSS, CSRF, hachage, OWASP, chaîne d'approvisionnement | [M] |
| 05_observability | logs structurés, traces, métriques, astreinte | [M] |
| 06_fiabilite_slo | SLI, SLO, SLA, budget d'erreur, RPO/RTO, résilience | [N] |
| 07_cloud_foundations | catégories cloud, coûts, IAM, rayon d'impact | [N] |
| 08_produit_cout_roi | roadmap, grille coût/risque/valeur, ROI, dette | [N] |
| 09-TEAM-QUEST | travailler à plusieurs | [P] |
| 10_team_craft | revue, écrit technique, rituels | [M] |
| 11_leadership_mentorat | mentorat, revue avancée, standards, quatre publics | [N] |
| RETRO-BLOC-3-CONDUITE.md | rétrospective obligatoire | [P] |

Point de passage bloquant de ce palier : le défi de transfert vers un autre langage, déclenché après le module de typage du palier précédent. Il est décrit dans [00-SOCLE/03_referentiel/DEPENDENCY_LEDGER.md](00-SOCLE/03_referentiel/DEPENDENCY_LEDGER.md) et dans les fichiers `98_PORTAGE_MENTAL.md` des modules concernés.

### 04-EPREUVE : le grand test

| Position | Contenu | Origine |
| --- | --- | --- |
| 01-BONUS-VAULT | coffre de références consultable à la demande, pas une étape chronologique ; sa section sécurité/coût/vie privée est un prérequis du capstone, et son statut est déclaré dans [04-EPREUVE/01-BONUS-VAULT/01-why-this-level.md](04-EPREUVE/01-BONUS-VAULT/01-why-this-level.md) | [P] |
| 02-TOOL-CAVE | ses fiches débogage et audit de réponse IA sont exigées par le capstone | [P] |
| 03_realtime | temps réel, websockets, WebRTC | [M] |
| 04_ai_native_dev | coder avec une IA, RAG, plus l'ajout IA en production | [M] + [N] |
| 05-BIG-APP-SNOOP | entrer dans un gros projet écrit par d'autres | [P] |
| 06-CAPSTONE-ARENA | le capstone, plus son addendum Staff Engineer obligatoire | [P] + [N] |
| RETRO-BLOC-4-EPREUVE.md | rétrospective obligatoire | [P] |

### 05-MAITRISE : ce qui se prouve après la livraison

| Position | Contenu | Origine |
| --- | --- | --- |
| 01_databases | SQL, NoSQL, index, cache | [M] |
| 02_scalability | tenir la charge, systèmes distribués | [M] |
| 03_edge_cases | fuseaux, flottants, encodages | [M] |
| 04_ai_agents_and_autonomy | déléguer à une IA sans perdre le contrôle | [M] |
| 05-DAY-TO-LEGEND | routine de maintien sur 12 semaines | [P] |
| 06_annexes | carrière, portfolio, FinOps, entretiens | [M] |
| 07_tools | outillage du moment | [M] |
| 08_maitrise_staff_engineer | le dossier unique : six familles, un seul système | [N] |
| RETRO-BLOC-5-MAITRISE.md | rétrospective obligatoire | [P] |

### 06-ANNEXES-TRANSVERSES : références, hors progression

Charte de style, univers narratifs autorisés, pérennité, cartes TECH-ILA, rythmes de travail, épilogue, et l'archive du plan d'entrelacement d'origine dans [06-ANNEXES-TRANSVERSES/archives/ARCHIVE-ORDRE-DE-BATAILLE.md](06-ANNEXES-TRANSVERSES/archives/ARCHIVE-ORDRE-DE-BATAILLE.md). Ce plan décrivait comment naviguer entre deux repos séparés : il est conservé comme trace historique, il n'est plus la carte à suivre. La carte, c'est ce README. Les cartes TECH-ILA ne sont plus une pure référence libre : chacun de ses 6 niveaux est accroché à la rétrospective du bloc correspondant (RETRO-BLOC-1 à RETRO-BLOC-5), avec un seul livrable noté, le portage d'un service du fil rouge dans un second langage, au bloc EPREUVE.

## Ce que tu montres à la fin

Le contenu ne suffit pas : le diplôme doit être ouvrable. Les six familles de compétences Staff Engineer et le chemin exact du livrable qui prouve chacune sont listés dans [PREUVES-STAFF-ENGINEER.md](PREUVES-STAFF-ENGINEER.md). C'est le premier fichier à ouvrir quand quelqu'un demande ce que tu sais faire.

## Les mécanismes qui ne changent pas

- Les fichiers `00_prereq_check.md` de chaque module d'origine MyFunnyJS restent des portes d'entrée.
- Les auto-tests d'entrée des niveaux d'origine ProjectFunny restent obligatoires.
- Le PLATEAU_JOURNAL et le DEPENDENCY_LEDGER vivent dans [00-SOCLE/03_referentiel](00-SOCLE/03_referentiel/00_why_referentiel.md).
- Les cinq rétrospectives de bloc restent des points de passage, à la fin de leur palier.

## Traçabilité des corrections

Les corrections d'audit livrées version par version sont tracées dans [CHANGELOG-CORRECTIONS.md](CHANGELOG-CORRECTIONS.md).

## Preuves de qualite du depot

Le depot se verifie en une minute, sans lire une ligne :

```bash
node outils/verifier_numerotation.mjs .
node outils/verifier_liens.mjs . --ecrire
node outils/generer_perissabilite.mjs
node outils/controle_livraison.mjs --strict
```

- [VERIFICATION_LIENS.md](VERIFICATION_LIENS.md) : la preuve d'exhaustivité des liens, générée, avec fichiers parcourus, liens trouvés, liens résolus.
- [outils/README.md](outils/README.md) : ce que chaque verrou refuse, et pourquoi.
- [06-ANNEXES-TRANSVERSES/archives/](06-ANNEXES-TRANSVERSES/archives/README.md) : le protocole d'audit d'origine et le prompt de fusion v3, archivés en texte intégral pour rendre la fusion traçable de l'extérieur.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `.` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [CHANGELOG-CORRECTIONS.md](CHANGELOG-CORRECTIONS.md)
- [PREUVES-STAFF-ENGINEER.md](PREUVES-STAFF-ENGINEER.md)
- [VERIFICATION_LIENS.md](VERIFICATION_LIENS.md)
- [00-SOCLE/](00-SOCLE/README.md)
- [01-CADRAGE/](01-CADRAGE/README.md)
- [02-CONSTRUCTION/](02-CONSTRUCTION/README.md)
- [03-PILOTAGE/](03-PILOTAGE/README.md)
- [04-EPREUVE/](04-EPREUVE/README.md)
- [05-MAITRISE/](05-MAITRISE/README.md)
- [06-ANNEXES-TRANSVERSES/](06-ANNEXES-TRANSVERSES/README.md)
- [PREUVES-MODELES/](PREUVES-MODELES/README.md)
- [outils/](outils/README.md)

<!-- CONTENU-DOSSIER:fin -->
