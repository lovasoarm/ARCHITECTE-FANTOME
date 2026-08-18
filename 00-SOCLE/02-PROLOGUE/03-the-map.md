---
stability: stable
acte: comprendre
---

# La carte : six paliers, 56 modules, un seul fil

<!-- FICHIER GENERE par 99-COULISSES/outillage/generer_carte.mjs — ne pas editer a la main.
     Tout chiffre structurel du depot vient de ce generateur, jamais d'une saisie manuelle. -->

## La scene

Avant de partir en randonnee sur un itineraire de plusieurs jours, tu regardes la carte
entiere, pas seulement le premier sentier. Ce fichier est cette carte. Tu n'as pas besoin de
la memoriser : tu dois savoir qu'elle existe, et qu'elle dit la verite du disque.

Un seul fil : six paliers, 56 modules pedagogiques. Il n'y a pas d'autre comptage dans ce depot.
Si un document en cite un autre, il est estampille **document historique d'avant fusion**.

## L'echelle : six niveaux, pas 56 raisons de fuir

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
Retrospective de palier : niveau 2 -> [MI-RETRO-BLOC-2-ARCHI.md](../../02-CONSTRUCTION/MI-RETRO-BLOC-2-ARCHI.md), niveau 2bis -> [RETRO-BLOC-2-BUILD.md](../../02-CONSTRUCTION/RETRO-BLOC-2-BUILD.md).
Engagement hebdomadaire minimal : 4 h/semaine (rythme MARATHON de [06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md](../../06-ANNEXES-TRANSVERSES/06-ROADMAP-rythmes.md)) ; en dessous, le droit d'entree paye a chaque reprise mange la seance.

> **Route survie** — si tu vises l'employabilite avant la maitrise, tu suis le meme fil filtre : il s'arrete au Boss de sortie du niveau 3. Tu es employable, tu n'es pas Staff, et tu peux reprendre le fil complet sans repartir de zero. Elle est decrite dans [00-SOCLE/01_getting_started/ROUTE-SURVIE.md](../../00-SOCLE/01_getting_started/ROUTE-SURVIE.md).

Rythme : deux modules, un Boss (dossiers `BOSS-*`) ; la retrospective de bloc ferme le palier et est comptee a part, pour que le total se verifie par un simple `ls`.
Un niveau se coche quand son **Boss de palier** est passe, jamais quand les fichiers sont lus.

## Les six paliers, palier par palier

| Palier | Modules | Capacite debloquee | Livrable produit |
| --- | --- | --- | --- |
| 00-SOCLE | 6 | a la fin de ce palier, tu sais ecrire, lire et raisonner sur du code sans t'y perdre | ton environnement, ton plateau de suivi, tes premieres fonctions testees |
| 01-CADRAGE | 5 | a la fin de ce palier, tu sais choisir quoi construire et refuser par ecrit le reste | PROBLEM-HUNT, MVP-SPLIT et le projet fil rouge cadre |
| 02-CONSTRUCTION | 20 | a la fin de ce palier, tu sais construire un systeme dont les frontieres resistent au changement | mini-projets livres, tests, ADR de decoupage, API documentee |
| 03-PILOTAGE | 11 | a la fin de ce palier, tu sais tenir un systeme en production et le chiffrer | BUDGET-CLOUD.md, SLO.md, revue de securite, standards d'equipe |
| 04-EPREUVE | 6 | a la fin de ce palier, tu sais livrer sous contrainte reelle quand la spec et la priorite bougent | capstone sous derive, decisions d'arbitrage datees |
| 05-MAITRISE | 8 | a la fin de ce palier, tu sais concevoir ET defendre un systeme complet | le dossier unique Staff Engineer, soutenu sous contradiction |

## Le detail, genere depuis le disque

### 00-SOCLE — Niveau 0 : Fondations (6 modules)

- `01_getting_started` — **route survie**
- `02-PROLOGUE`
- `03_referentiel`
- `04_fundamentals` — **route survie**
- `05_problem_solving` — **route survie**
- `06-MINDSET`

### 01-CADRAGE — Niveau 1 : Developpeur (5 modules)

- `01-PROBLEM-HUNT` — **route survie**
- `02_async` — **route survie**
- `03_debugging` — **route survie**
- `04_error_handling` — **route survie**
- `05-MVP-SPLIT` — **route survie**

### 02-CONSTRUCTION — Niveau 2 : Developpeur confirme (20 modules)

- `01-USER-WIZARD`
- `02_mini_projects` — **route survie**
- `03_testing` — **route survie**
- `04_math_basics`
- `05_memory_performance`
- `06_data_structures`
- `07_algorithms`
- `08-DATA-SPELLS`
- `09_functional_js`
- `10_design_patterns`
- `11_refactoring`
- `12_typescript`
- `13_runtime_env`
- `14_architecture_patterns`
- `15-ARCHI-LAB`
- `16_ddd_contrats`
- `17_oop_js`
- `18_web_concepts`
- `19_api_craft` — **route survie**
- `20-API-DOJO`

### 03-PILOTAGE — Niveau 3 : Senior (11 modules)

- `01-ROADMAP-RUN`
- `02_web_inclusive`
- `03-QUALITY-SHIELD`
- `04_security` — **route survie**
- `05_observability` — **route survie**
- `06_fiabilite_slo` — **route survie**
- `07_cloud_foundations`
- `08_produit_cout_roi`
- `09-TEAM-QUEST`
- `10_team_craft`
- `11_leadership_mentorat`

### 04-EPREUVE — Niveau 4 : Lead (6 modules)

- `01-BONUS-VAULT`
- `02-TOOL-CAVE`
- `03_realtime`
- `04_ai_native_dev`
- `05-BIG-APP-SNOOP`
- `06-CAPSTONE-ARENA`

### 05-MAITRISE — Niveau 5 : Architecte (8 modules)

- `01_databases`
- `02_scalability`
- `03_edge_cases`
- `04_ai_agents_and_autonomy`
- `05-DAY-TO-LEGEND`
- `06_annexes`
- `07_tools`
- `08_maitrise_staff_engineer`

## Tracabilite des origines

Les etapes marquees **route survie** forment le raccourci employabilite decrit par
[00-SOCLE/01_getting_started/ROUTE-SURVIE.md](../01_getting_started/ROUTE-SURVIE.md). C'est un filtre
sur ce meme fil, jamais un second parcours.

Origine : **[M]** module venu de MyFunnyJS, **[P]** niveau venu de ProjectFunny, **[N]** module
nouveau, ecrit pour ce parcours fusionne. Le tableau ligne a ligne est porte par le
[README racine](../../README.md), section « Le fil complet, avec sa tracabilite ».

## Combien il m'en reste ?

C'est la seule question qui compte quand le parcours est long. Elle a une reponse unique :
ouvre [PROGRESSION.md](../../PROGRESSION.md). Aucun autre compteur n'existe dans ce depot.
