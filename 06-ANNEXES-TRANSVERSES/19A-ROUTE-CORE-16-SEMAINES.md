---
stability: stable
acte: parcours
noyau: oui
route_family: core
---

# 19 : ROUTE CORE 16 SEMAINES

<!-- AF-DIAGRAM:core -->

```text
text
16 semaines
│
├─ pratique / projets ───────── 80 h
├─ compréhension active ────── 48 h
├─ transfert / perturbations ─ 32 h
├─ rappel ───────────────────── 16 h
└─ décision / défense ───────── 16 h
                               ─────
                               192 h
```

La route CORE réserve 192 heures à une progression intensive et sélective, sans confondre DEPTH/VAULT avec l’obligatoire.

> **Principe :** le corpus complet reste intact. La route CORE ne supprime rien : elle définit l'ordre, le temps et le niveau d'exigence du parcours intensif.

## Pourquoi une route CORE ?

ARCHITECTE-FANTOME contient volontairement davantage de matière que ce qu'un humain peut absorber en quatre mois. Ce n'est pas un défaut si la navigation distingue clairement :

- **CORE** : indispensable pour la sortie intensive ;
- **DEPTH** : approfondissement facultatif pendant le sprint ;
- **VAULT** : référence à consulter au besoin et après le sprint.

La durée cible est **16 semaines × 12 h = 192 h**. Ces 192 h comprennent lecture active, pratique, transfert, rappel, défense et rétrospective. Elles ne supposent pas que le diplôme signifie « Staff Engineer déjà accompli ».

## Ce que garantit la route CORE

À la fin des 16 semaines, l'apprenant doit être capable de :

1. cadrer un problème incomplet avant de choisir une solution ;
2. lire un système inconnu et construire une hypothèse vérifiable ;
3. concevoir et modifier un système sous contraintes contradictoires ;
4. mesurer avant de conclure ;
5. traiter legacy, dette, incidents, sécurité, coût et fiabilité ;
6. défendre une décision et construire le meilleur argument contre elle ;
7. changer d'avis à partir d'une preuve nouvelle ;
8. transférer un mécanisme vers une autre stack ou un contexte inversé ;
9. influencer plusieurs acteurs sans autorité hiérarchique ;
10. superviser une IA sans déléguer le jugement ;
11. produire une preuve réutilisable en entretien, revue ou portfolio.

## Budget hebdomadaire fixe

Chaque semaine fait **12 h**, réparties ainsi :

| Bloc                     | Temps | Règle                                                             |
| ------------------------ | ----: | ----------------------------------------------------------------- |
| Compréhension active     |   3 h | lecture + rappel à livre fermé ; aucune lecture passive prolongée |
| Pratique / mini-projet   |   5 h | production réelle ; pas de validation sur lecture seule           |
| Ambiguïté / transfert    |   2 h | problème nouveau ou contrainte contradictoire                     |
| Rappel / auto-évaluation |   1 h | rappel sans notes + correction après tentative                    |
| Journal de décision      |   1 h | hypothèses, changement d'avis, dette créée, signal de révision    |

**Règle de compression :** si un document prend plus de temps que son utilité dans la route CORE, ne pas le supprimer ; le déplacer en DEPTH/VAULT et extraire sa question de décision dans la session active.

## Les 16 semaines

### S01 : Lire avant de construire

CORE : `00-SOCLE` + problem solving + premier fil rouge.

Sortie : problème cadré, hypothèses, première reproduction, premier artefact de preuve.

### S02 : Async, erreurs et debug

CORE : `01-CADRAGE`.

Épreuve : bug incomplet, informations révélées progressivement.

### S03 : Tests, mémoire, structures

CORE : `02-CONSTRUCTION/03-TESTING` à `07-ALGORITHMS`.

Projet CORE : `01_rasengan_engine` en **slice 8 h**.

### S04 : Runtime, concurrence, backpressure

CORE : runtime + async avancé + `03_walking_dead_protocol` en **slice 10 h**.

### S05 : API, sécurité et frontières

CORE : API craft + auth + contrats.

Projet CORE : `05_prison_break_api` en **slice 8 h**.

### S06 : Performance et systèmes clients

CORE : performance + observabilité de base + client systems.

Projet CORE : `06_ultras_dashboard` en **slice 10 h**.

### S07 : Legacy et évolution sans casser

CORE : legacy + refactoring + tests de caractérisation.

Projet CORE : `10_legacy_dungeon` en **slice 8 h**.

### S08 : Architecture sous contraintes

CORE : DDD, modularité, contrats, ADR, trade-offs.

Projet CORE : `14_system_design_lab` en **slice 12 h**.

### S09 : Systèmes distribués et fiabilité

CORE : idempotence, retries, partition, observabilité, récupération.

Projet CORE : `16_distributed_arena` en **slice 7 h**.

### S10 : Cloud, coût et décisions irréversibles

CORE : cloud foundations + produit/coût/ROI + FinOps.

Épreuve : proposer une solution puis expliquer pourquoi une option apparemment meilleure doit être rejetée.

### S11 : Reprise d'un système vivant

Projet CORE : `12_legacy_takeover` en **slice 12 h**.

Épreuve : reproduire avant de modifier ; une décision de refonte doit être chiffrée.

### S12 : Sécurité, incidents et opérations

CORE : sécurité + observabilité + SLO + incident + postmortem.

Épreuve : incident en temps limité avec information nouvelle au milieu.

### S13 : Leadership technique et influence

CORE : `03-PILOTAGE/09-TEAM-QUEST` + simulation cross-team.

Sortie : proposition technique, objection d'une partie prenante, négociation de périmètre, mesure d'adoption.

### S14 : IA, gouvernance et transfert

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Projet CORE : `19_supervise_the_ai` en **slice 5 h**.

Épreuve : revue aveugle de provenance + transfert négatif + arrêt explicite d'une automatisation mal adaptée.

### S15 : Capstone sous double dérive

Capstone : architecture + changement de spécification + contrainte organisationnelle + incident + nouvelle information.

Objectif : aucune indication sur « quelle compétence utiliser ».

### S16 : Défense, synthèse et vérité de sortie

Soutenance : décision, contradiction, changement d'avis, coût, sécurité, transfert, limites.

Le diplômé produit aussi une page **« ce que ce diplôme prouve / ce qu'il ne prouve pas »**.

## Slices et profondeur

Un **slice CORE** n'est pas une version appauvrie du projet. C'est une sélection d'objectifs qui doit produire la preuve essentielle dans le budget de la semaine. Le reste du projet demeure intact et passe en DEPTH/VAULT.

Pour chaque slice :

1. aucun corrigé ;
2. aucune architecture imposée après le début de la tentative ;
3. une décision écrite ;
4. un contre-argument obligatoire ;
5. une contrainte injectée après la première décision ;
6. un rappel à froid une semaine plus tard ;
7. un transfert dans un nouveau contexte.

## Matrice de preuve

La fermeture des six familles Staff suit [27-MATRICE-PREUVES-CORE.md](27-MATRICE-PREUVES-CORE.md). Une famille n’est pas « couverte » parce qu’elle possède des leçons : elle doit produire, subir une perturbation, transférer et défendre.

## Ce qui se passe après 16 semaines

Le parcours ne promet pas que l'apprenant est Staff Engineer. Il certifie une **préparation intensive et démontrable à la trajectoire Staff** : fondations, jugement, architecture, exploitation, transfert, influence et supervision de l'automatisation.

Le niveau Staff réel continue à se construire par le scope, les conséquences de décisions sur la durée, l'influence organisationnelle et l'expérience de systèmes vivants.

## Règle d'honnêteté

Ne jamais écrire :

> « 16 semaines = Staff Engineer. »

Écrire :

> « 16 semaines = base exceptionnellement solide et preuves de préparation à des responsabilités Staff ; le niveau Staff reconnu se construit ensuite par l'expérience et l'impact réel. »
