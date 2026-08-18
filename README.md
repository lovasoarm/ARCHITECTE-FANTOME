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

> Contenu releve le 2026-08-14 ; les elements perissables et leur procedure de rafraichissement sont listes dans [06-ANNEXES-TRANSVERSES/PEREMPTION-2027.md](./06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md).


Un seul parcours, six paliers, un seul fil de progression : de zéro jusqu'à un profil Staff Engineer / Principal Engineer à forte dimension Software / Solutions Architect.

Le nom dit ce que devient le diplômé : un Staff Engineer influence tout le système sans être visible partout. Il laisse une empreinte d'architecture dans chaque décision sans avoir écrit chaque ligne.

<!-- ECHELLE:debut (genere par 99-COULISSES/outillage/generer_carte.mjs) -->

## Ou tu en es : six niveaux

```text
  [ ] Niveau 0 —     Fondations            (00-SOCLE, 6 modules, 3 Boss, ~103 h)
  [ ] Niveau 1 —     Developpeur           (01-CADRAGE, 5 modules, 2 Boss + 1 retrospective, ~81 h)
  [ ] Niveau 2 —     Developpeur confirme  (02-CONSTRUCTION, 13 modules, 6 Boss + 1 retrospective, ~239 h)
  [ ] Niveau 2bis —  Concepteur            (02-CONSTRUCTION, 7 modules, 3 Boss + 1 retrospective, ~73 h)
  [ ] Niveau 3 —     Senior                (03-PILOTAGE, 11 modules, 5 Boss + 1 retrospective, ~126 h)
  [ ] Niveau 4 —     Lead                  (04-EPREUVE, 6 modules, 2 Boss + 1 retrospective, ~60 h)
  [ ] Niveau 5 —     Architecte            (05-MAITRISE, 8 modules, 3 Boss + 1 retrospective, ~140 h)

  Route survie (raccourci employabilite) : s'arrete au Boss de sortie du niveau 3 (employable, pas Staff).
```

| Niveau | Heures estimees | Ce que tu sais faire a la sortie | Ce que tu as produit | Ce qui te reste |
| --- | --- | --- | --- | --- |
| 0 — Fondations | ~103 h | ecrire, lire et raisonner sur du code sans t'y perdre | ton environnement, ton plateau de suivi, tes premieres fonctions testees | les niveaux 1, 2, 2bis, 3, 4, 5 |
| 1 — Developpeur | ~81 h | choisir quoi construire et refuser par ecrit le reste | PROBLEM-HUNT, MVP-SPLIT et le projet fil rouge cadre | les niveaux 2, 2bis, 3, 4, 5 |
| 2 — Developpeur confirme | ~239 h | construire un systeme dont les frontieres resistent au changement | mini-projets livres, tests, refactorings sous test, code type | les niveaux 2bis, 3, 4, 5 |
| 2bis — Concepteur | ~73 h | decouper un systeme sur le langage du metier et tenir ses contrats | ADR de decoupage, contextes bornes, API documentee et versionnee | les niveaux 3, 4, 5 |
| 3 — Senior | ~126 h | tenir un systeme en production et le chiffrer | BUDGET-CLOUD.md, SLO.md, revue de securite, standards d'equipe | les niveaux 4, 5 |
| 4 — Lead | ~60 h | livrer sous contrainte reelle quand la spec et la priorite bougent | capstone sous derive, decisions d'arbitrage datees | les niveaux 5 |
| 5 — Architecte | ~140 h | concevoir ET defendre un systeme complet | le dossier unique Staff Engineer, soutenu sous contradiction | rien : tu soutiens |

Total annonce : ~821 h. Chiffre calcule, jamais saisi : lecons numerotees x 45 min, plus 3 h par Boss et 1.5 h par retrospective de palier.
Retrospective de palier : niveau 2 -> [MI-RETRO-BLOC-2-ARCHI.md](02-CONSTRUCTION/MI-RETRO-BLOC-2-ARCHI.md), niveau 2bis -> [RETRO-BLOC-2-BUILD.md](02-CONSTRUCTION/RETRO-BLOC-2-BUILD.md).
Engagement hebdomadaire minimal : 4 h/semaine (rythme MARATHON de [06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md](06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md)) ; en dessous, le droit d'entree paye a chaque reprise mange la seance.

> **Route survie** — si tu vises l'employabilite avant la maitrise, tu suis le meme fil filtre : il s'arrete au Boss de sortie du niveau 3. Tu es employable, tu n'es pas Staff, et tu peux reprendre le fil complet sans repartir de zero. Elle est decrite dans [00-SOCLE/01_getting_started/ROUTE-SURVIE.md](00-SOCLE/01_getting_started/ROUTE-SURVIE.md).

Rythme : deux modules, un Boss (dossiers `BOSS-*`) ; la retrospective de bloc ferme le palier et est comptee a part, pour que le total se verifie par un simple `ls`.
Un niveau se coche quand son **Boss de palier** est passe, jamais quand les fichiers sont lus.

Carte detaillee : [00-SOCLE/02-PROLOGUE/03-the-map.md](00-SOCLE/02-PROLOGUE/03-the-map.md).
Suivi personnel : [PROGRESSION.md](PROGRESSION.md).

<!-- ECHELLE:fin -->

## La promesse

À la sortie, tu ne sais pas seulement coder proprement. Tu sais :

1. Décider quoi construire, et refuser par écrit ce qui ne vaut pas son coût.
2. Découper un système sur le langage du métier, et le documenter par des ADR.
3. Chiffrer ce que ton système coûte par mois, et ce que coûte une neuvième de disponibilité en plus.
4. Écrire la promesse de service que tu tiens, la mesurer, et dire ce que tu fais quand tu la brises.
5. Expliquer la même décision à une direction, à un produit, à des ops et à la conformité, chacun dans sa langue.
6. Intégrer une brique IA dans un produit réel, avec son plafond de coût et sa frontière de confiance.

Et surtout : les faire tenir ensemble sur un seul système, pas séparément dans six exercices.

Un mot sur le seul dossier hors parcours : `99-COULISSES/` est l'atelier du mainteneur (verrous
automatiques, archives de fabrication, decisions datees). N'y entre pas tant que tu apprends.

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


## Ce que tu montres à la fin

Le contenu ne suffit pas : le diplôme doit être ouvrable. Les six familles de compétences Staff Engineer et le chemin exact du livrable qui prouve chacune sont listés dans [PREUVES-STAFF-ENGINEER.md](PREUVES-STAFF-ENGINEER.md). C'est le premier fichier à ouvrir quand quelqu'un demande ce que tu sais faire.

## Les mécanismes qui ne changent pas

- Les fichiers `00_prereq_check.md` de chaque module d'origine MyFunnyJS restent des portes d'entrée.
- Les auto-tests d'entrée des niveaux d'origine ProjectFunny restent obligatoires.
- Le PLATEAU_JOURNAL et le DEPENDENCY_LEDGER vivent dans [00-SOCLE/03_referentiel](00-SOCLE/03_referentiel/00_why_referentiel.md).
- Les cinq rétrospectives de bloc restent des points de passage, à la fin de leur palier.

## Traçabilité des corrections

Les corrections d'audit livrées version par version sont tracées dans [99-COULISSES/CHANGELOG-CORRECTIONS.md](99-COULISSES/CHANGELOG-CORRECTIONS.md).

## Preuves de qualite du depot

Le depot se verifie en une minute, sans lire une ligne :

```bash
node 99-COULISSES/outillage/verifier_numerotation.mjs .
node 99-COULISSES/outillage/verifier_liens.mjs . --ecrire
node 99-COULISSES/outillage/generer_perissabilite.mjs
node 99-COULISSES/outillage/controle_livraison.mjs --strict
```

- [99-COULISSES/outillage/VERIFICATION_LIENS.md](99-COULISSES/outillage/VERIFICATION_LIENS.md) : la preuve d'exhaustivité des liens, générée, avec fichiers parcourus, liens trouvés, liens résolus.
- [99-COULISSES/outillage/README.md](99-COULISSES/outillage/README.md) : ce que chaque verrou refuse, et pourquoi.

<!-- CONTENU-DOSSIER:debut (genere par 99-COULISSES/outillage/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `.` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [PREUVES-STAFF-ENGINEER.md](PREUVES-STAFF-ENGINEER.md)
- [PROGRESSION.md](PROGRESSION.md)
- [00-SOCLE/](00-SOCLE/README.md)
- [01-CADRAGE/](01-CADRAGE/README.md)
- [02-CONSTRUCTION/](02-CONSTRUCTION/README.md)
- [03-PILOTAGE/](03-PILOTAGE/README.md)
- [04-EPREUVE/](04-EPREUVE/README.md)
- [05-MAITRISE/](05-MAITRISE/README.md)
- [06-ANNEXES-TRANSVERSES/](06-ANNEXES-TRANSVERSES/README.md)

<!-- CONTENU-DOSSIER:fin -->

## Pour auditer l'origine de ce repo

La tracabilite pedagogique est deja portee par la colonne [M]/[P]/[N] du sommaire : elle dit,
ligne par ligne, d'ou vient chaque module. Si tu veux remonter plus loin — prompt de fusion,
ordre de bataille, protocole d'audit d'origine, notes de decision internes — tout est conserve
dans [99-COULISSES/](99-COULISSES/README.md). Rien de ce qui s'y trouve n'est a apprendre, et
c'est pourquoi ce dossier n'apparait dans aucun index destine a l'apprenant.
