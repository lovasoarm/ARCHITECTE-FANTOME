---
stability: stable
acte: pratiquer
---

# PROGRESSION

**La seule surface de suivi de ce depot.** Il n'existe aucun autre compteur, aucun autre
tableau d'avancement, aucune autre case a cocher ailleurs : si tu veux savoir ou tu en es,
tu ouvres ce fichier, et lui seul.

Ce fichier est un **modele versionne, que tu remplis toi-meme**. Le depot ne connait pas ton
avancement et ne le devinera jamais. Seule la **grille de checkpoints** ci-dessous est
regeneree depuis le disque (`node 99-COULISSES/outillage/generer_progression.mjs`) : les
niveaux et les Boss existent sur le disque, tes coches n'appartiennent qu'a toi.

**Regle unique de ce fichier** : rien ne se coche sans **artefact**. Pas de case pour du
temps passe, pas de case pour une video regardee, pas de case pour un module parcouru. Un
Boss passe = un verdict ecrit et date. Un badge = un fichier qui existe dans ton depot de
projet fil rouge. C'est le contrat de validation B4, applique a ton suivi.

Deux chemins possibles, un seul fil : la [route survie](00-SOCLE/01_getting_started/ROUTE-SURVIE.md)
(raccourci employabilite) et la route complete. Les deux se cochent dans cette meme grille.

---

## 1. CHECKPOINTS — les six niveaux et leurs Boss

Grille generee depuis le disque : les six niveaux viennent de l'echelle (B3), les Boss du
rythme « deux modules, un Boss » (B2). Tu coches, tu dates, tu n'ajoutes pas de ligne.

<!-- CHECKPOINTS:debut (genere par 99-COULISSES/outillage/generer_progression.mjs) -->

### Niveau 0 — Fondations (`00-SOCLE`)

Capacite visee : a la fin de ce palier, tu sais ecrire, lire et raisonner sur du code sans t'y perdre. Livrable : ton environnement, ton plateau de suivi, tes premieres fonctions testees.
Etapes de la route survie dans ce palier : 3.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01_getting_started`, `02-PROLOGUE` | |
| [ ] | `BOSS-2` | `03_referentiel`, `04_fundamentals` | |
| [ ] | `BOSS-3` | `05_problem_solving`, `06-MINDSET` | |

- [ ] **Niveau 0 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

### Niveau 1 — Developpeur (`01-CADRAGE`)

Capacite visee : a la fin de ce palier, tu sais choisir quoi construire et refuser par ecrit le reste. Livrable : PROBLEM-HUNT, MVP-SPLIT et le projet fil rouge cadre.
Etapes de la route survie dans ce palier : 5.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01-PROBLEM-HUNT`, `02_async` | |
| [ ] | `BOSS-2` | `03_debugging`, `04_error_handling` | |
| [ ] | `RETRO-BLOC-1-CADRAGE.md (Boss de palier)` | `05-MVP-SPLIT` | |

- [ ] **Niveau 1 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

### Niveau 2 — Developpeur confirme (`02-CONSTRUCTION`)

Capacite visee : a la fin de ce palier, tu sais construire un systeme dont les frontieres resistent au changement. Livrable : mini-projets livres, tests, ADR de decoupage, API documentee.
Etapes de la route survie dans ce palier : 3.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01-USER-WIZARD`, `02_mini_projects` | |
| [ ] | `BOSS-2` | `03_testing`, `04_math_basics` | |
| [ ] | `BOSS-3` | `05_memory_performance`, `06_data_structures` | |
| [ ] | `BOSS-4` | `07_algorithms`, `08-DATA-SPELLS` | |
| [ ] | `BOSS-5` | `09_functional_js`, `10_design_patterns` | |
| [ ] | `BOSS-6` | `11_refactoring`, `12_typescript` | |
| [ ] | `BOSS-7` | `13_runtime_env`, `14_architecture_patterns` | |
| [ ] | `BOSS-8` | `15-ARCHI-LAB`, `16_ddd_contrats` | |
| [ ] | `BOSS-9` | `17_oop_js`, `18_web_concepts` | |
| [ ] | `RETRO-BLOC-2-BUILD.md (Boss de palier)` | `19_api_craft`, `20-API-DOJO` | |

- [ ] **Niveau 2 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

### Niveau 3 — Senior (`03-PILOTAGE`)

Capacite visee : a la fin de ce palier, tu sais tenir un systeme en production et le chiffrer. Livrable : BUDGET-CLOUD.md, SLO.md, revue de securite, standards d'equipe.
Etapes de la route survie dans ce palier : 3.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01-ROADMAP-RUN`, `02_web_inclusive` | |
| [ ] | `BOSS-2` | `03-QUALITY-SHIELD`, `04_security` | |
| [ ] | `BOSS-3` **(sortie route survie)** | `05_observability`, `06_fiabilite_slo` | |
| [ ] | `BOSS-4` | `07_cloud_foundations`, `08_produit_cout_roi` | |
| [ ] | `BOSS-5` | `09-TEAM-QUEST`, `10_team_craft` | |
| [ ] | `RETRO-BLOC-3-CONDUITE.md (Boss de palier)` | `11_leadership_mentorat` | |

- [ ] **Niveau 3 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

### Niveau 4 — Lead (`04-EPREUVE`)

Capacite visee : a la fin de ce palier, tu sais livrer sous contrainte reelle quand la spec et la priorite bougent. Livrable : capstone sous derive, decisions d'arbitrage datees.
Aucune etape de route survie ici : palier de la route complete.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01-BONUS-VAULT`, `02-TOOL-CAVE` | |
| [ ] | `BOSS-2` | `03_realtime`, `04_ai_native_dev` | |
| [ ] | `RETRO-BLOC-4-EPREUVE.md (Boss de palier)` | `05-BIG-APP-SNOOP`, `06-CAPSTONE-ARENA` | |

- [ ] **Niveau 4 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

### Niveau 5 — Architecte (`05-MAITRISE`)

Capacite visee : a la fin de ce palier, tu sais concevoir ET defendre un systeme complet. Livrable : le dossier unique Staff Engineer, soutenu sous contradiction.
Aucune etape de route survie ici : palier de la route complete.

| Coche | Boss | Modules couverts | Verdict ecrit le |
| --- | --- | --- | --- |
| [ ] | `BOSS-1` | `01_databases`, `02_scalability` | |
| [ ] | `BOSS-2` | `03_edge_cases`, `04_ai_agents_and_autonomy` | |
| [ ] | `BOSS-3` | `05-DAY-TO-LEGEND`, `06_annexes` | |
| [ ] | `RETRO-BLOC-5-MAITRISE.md (Boss de palier)` | `07_tools`, `08_maitrise_staff_engineer` | |

- [ ] **Niveau 5 franchi** : tous les Boss ci-dessus sont passes, verdict ecrit et date.

<!-- CHECKPOINTS:fin -->

---

## 2. BILANS — cinq lignes apres chaque Boss

Un bilan par Boss passe, jamais avant. Cinq lignes, pas six, ecrites le jour meme. Recopie
le bloc ci-dessous a la suite pour chaque Boss.

```text
Boss :            (ex. 03-PILOTAGE/BOSS-3)
Date :            (AAAA-MM-JJ)
1. Ce que je sais faire de neuf :
2. Ce que j'ai rate :
3. Ce que je refais, et quand :
4. L'artefact produit (chemin dans mon depot) :
5. L'objection a laquelle je n'ai pas su repondre :
```

Un bilan sans ligne 4 n'est pas un bilan : c'est un souvenir.

---

## 3. BADGES — les six familles Staff, sur artefact uniquement

Un badge a trois etats, et trois seulement : **VIDE**, **PARTIEL**, **COUVERT**. Les
criteres ne sont pas ici : ils sont deja ecrits, famille par famille, dans
[PREUVES-STAFF-ENGINEER.md](PREUVES-STAFF-ENGINEER.md). Ce tableau ne fait que porter ton
etat courant. Aucune nouvelle taxonomie, aucun niveau intermediaire invente.

Regle de passage : **COUVERT** exige le livrable de la famille **et** son recroisement exige
(la colonne « Recroisement exigé » du fichier de preuves). Sans recroisement, c'est PARTIEL.

| Famille | Ce que tu montres | Mon etat | Chemin de l'artefact chez moi | Date |
| --- | --- | --- | --- | --- |
| S1 — Systemes, backend, cloud | `BUDGET-CLOUD.md` | VIDE | | |
| S2 — Architecture logicielle | dossier `ADR/` | VIDE | | |
| S3 — Securite et fiabilite | `SLO.md` + revue de securite | VIDE | | |
| S4 — Produit et business | `DECISION-ARBITRAGE.md` | VIDE | | |
| S5 — Leadership et pedagogie | revue de code publique + note direction + `STANDARDS-AGENTS.md` | VIDE | | |
| S6 — IA et automatisation | `IA-EN-PROD.md` | VIDE | | |
| S7 — Pensee transferable | `PORTAGE.md` | VIDE | | |

---

## 4. PREUVES VISIBLES — le tableau qu'un jury ouvre

Les artefacts, avec leur chemin **chez toi**, et l'endroit du parcours qui te les fait
produire. Tant que la colonne « chez moi » est vide, la preuve n'existe pas.

| Artefact | Ou le parcours te le fait produire | Chemin chez moi | Date |
| --- | --- | --- | --- |
| `BUDGET-CLOUD.md` | [03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md](03-PILOTAGE/07_cloud_foundations/BUDGET-CLOUD.md) | | |
| `SLO.md` | [03-PILOTAGE/06_fiabilite_slo](03-PILOTAGE/06_fiabilite_slo/README.md) | | |
| ADR de decoupage, de persistance, de rupture de contrat | [02-CONSTRUCTION/16_ddd_contrats](02-CONSTRUCTION/16_ddd_contrats/README.md) | | |
| `DECISION-ARBITRAGE.md` | [04-EPREUVE/06-CAPSTONE-ARENA/05-changement-de-spec.md](04-EPREUVE/06-CAPSTONE-ARENA/05-changement-de-spec.md) | | |
| `DECISION-DOUBLE-DERIVE.md` | [04-EPREUVE/06-CAPSTONE-ARENA/07-semaine-double-derive.md](04-EPREUVE/06-CAPSTONE-ARENA/07-semaine-double-derive.md) | | |
| `STANDARDS-AGENTS.md` | [03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md](03-PILOTAGE/11_leadership_mentorat/07_standards_pour_agents.md) | | |
| `IA-EN-PROD.md` | [04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md](04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md) | | |
| `PORTAGE.md` | [03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md](03-PILOTAGE/07_cloud_foundations/06_portage_multicloud.md) — modele : [PREUVES-MODELES/S7-PORTAGE.md](PREUVES-MODELES/S7-PORTAGE.md) | | |
| Dossier unique Staff Engineer | [05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md) | | |

---

## 5. RECAPITULATIF DES ACQUIS — ce que tu peux dire, par niveau franchi

A ne remplir qu'apres avoir coche le niveau au bloc 1. La formulation est imposee :
« je peux concevoir X, chiffrer Y, defendre Z ». Trois verbes, trois objets, aucun adjectif.

| Niveau franchi | Je peux concevoir | Je peux chiffrer | Je peux defendre |
| --- | --- | --- | --- |
| 0 — Fondations | | | |
| 1 — Developpeur | | | |
| 2 — Developpeur confirme | | | |
| 3 — Senior | | | |
| 4 — Lead | | | |
| 5 — Architecte | | | |

Sortie de la route survie (Boss `03-PILOTAGE/BOSS-3` passe) : tu es **employable**, tu n'es
ni Staff ni architecte — la liste de ce qui te manque est dans
[ROUTE-SURVIE.md](00-SOCLE/01_getting_started/ROUTE-SURVIE.md), et la reprise ne recommence rien.

---

## Ou j'en suis, en une phrase

Ecris-la ici, et remplace-la a chaque Boss. C'est la phrase que tu diras en entretien.

> (a remplir)
