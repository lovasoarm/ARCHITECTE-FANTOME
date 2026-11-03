---
stability: stable
type: canonical-progression-map
release: 1.1.33
introduced_release: 1.1.5
---

# 80 : Matrice canonique des progressions AF

Ce document résout une confusion de vocabulaire : AF utilise plusieurs cartes, mais elles ne décrivent **pas** plusieurs parcours concurrents et ne se correspondent pas terme à terme.

## Les six couches à ne pas confondre

| Couche                | Référence                                                                                        | Ce qu’elle décrit                                                                                     | Ce qu’elle ne décrit pas                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Organisation physique | Six blocs `00` à `05`                                                                            | Où se trouvent les ressources dans le dépôt                                                           | Six niveaux de compétence strictement équivalents                            |
| Capacité démontrée    | Paliers `A` à `H` dans [Formation complète](../FORMATION-COMPLETE-INGENIERIE.md)                 | Ce que l’apprenant sait démontrer, du socle à l’influence transverse                                  | Des années, semaines ou modules à terminer mécaniquement                     |
| Phases thématiques    | Huit phases de la [Formation complète](../FORMATION-COMPLETE-INGENIERIE.md)                      | Les grandes familles de savoirs et leur ordre de dépendance, des fondations à la portée Distinguished | Huit étapes opérationnelles ou des durées fixes                              |
| Progression mentale   | Huit verbes dans le [Prologue : la carte](../00-SOCLE/02-PROLOGUE/03-the-map.md)                 | Le type de question d’ingénierie que l’apprenant apprend à poser                                      | Huit niveaux supplémentaires ni une certification                            |
| Ordre opérationnel    | Étapes `0` à `12` et sous-étapes `9A` à `9C` dans la [Route 58](58-ROUTE-APPRENANT-COHERENTE.md) | L’enchaînement des apprentissages, pratiques, preuves et remédiations                                 | Un planning calendaire ou une correspondance un-à-un avec les blocs          |
| Validation            | Modules, projets, gates `G1–G9`, familles `S1–S6` et transfert `S7`                              | Comment une capacité est pratiquée et vérifiée                                                        | Une nouvelle hiérarchie de dossiers ou des prérequis globaux supplémentaires |

## Correspondance des huit phases de la Formation complète

| Phase | Thème canonique                                    | Ressources dominantes                                                       | Paliers principalement concernés |
| ----- | -------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| 1     | Fondations de programmation et pensée informatique | `00-SOCLE`, `01-CADRAGE`, mathématiques, structures et algorithmes          | A–C                              |
| 2     | Construction d’un logiciel maintenable             | Testing, refactoring, TypeScript, runtime, patterns, DDD, API et clients    | B–D                              |
| 3     | Systèmes internes                                  | Runtime, mémoire, concurrence, réseau, protocoles et bases de données       | C–E                              |
| 4     | Réseau, systèmes distribués et architecture        | Async, pannes partielles, cohérence, réplication, migrations et scalabilité | C–F                              |
| 5     | Sécurité, livraison et exploitation                | Security, Observability, SLO, Cloud, CI/CD, restauration et incidents       | C–G                              |
| 6     | Données, mathématiques, ML et IA                   | Data Engineering, statistiques, ML, évaluation, RAG et gouvernance IA       | C–G                              |
| 7     | Plateformes, produit et leadership technique       | Platform Engineering, ROI, Team Craft, RFC, mentorat et adoption            | E–H                              |
| 8     | Portée Principal et Distinguished                  | Capstone intégré, décisions longitudinales, influence et preuves externes   | G–H                              |

Les huit phases sont un **ordre thématique et de dépendance**, pas un deuxième calendrier. Elles peuvent se chevaucher et certaines compétences sont revisitées à plusieurs paliers.

## Correspondance d’orientation

| Bloc physique       | Paliers A–H principalement travaillés | Questions mentales dominantes          | Étapes de la Route 58 principalement concernées                                                 |
| ------------------- | ------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `00-SOCLE`          | A, début B                            | Comprendre                             | 0–1                                                                                             |
| `01-CADRAGE`        | A–B                                   | Comprendre, construire, réparer        | 1, puis cadrage du fil rouge                                                                    |
| `02-CONSTRUCTION`   | B–E                                   | Construire, casser, réparer, concevoir | 1–5, puis 8 selon le sujet                                                                      |
| `03-PILOTAGE`       | C–G                                   | Concevoir, exploiter, arbitrer         | 6–7, puis 10                                                                                    |
| `04-EPREUVE`        | C–H                                   | Casser, réparer, arbitrer, transférer  | 3–4, 7–12                                                                                       |
| `05-MAITRISE`       | D–H                                   | Exploiter, arbitrer, diriger           | 5, 8–12                                                                                         |
| Annexes transverses | selon le prérequis et la preuve       | Les huit questions                     | Laboratoires, spécialisations, rétention et transfert ; elles ne créent pas une route parallèle |

Cette table est une **correspondance d’orientation**, pas un mapping rigide. Un même bloc contribue à plusieurs paliers et une même preuve peut renseigner plusieurs compétences sans les remplacer.

## Statut des parcours particuliers

- **Route canonique complète :** suit les prérequis et les preuves de la Route 58. Elle n’a pas de durée garantie.
- **CORE 16 semaines / 192 heures :** scénario facultatif d’orientation ou d’accélération, limité à son périmètre déclaré. Ce n’est ni la totalité d’AF ni une promesse de niveau professionnel.
- **Mode Survie :** vue courte et facultative de certaines preuves existantes ; ce n’est ni une deuxième route de certification ni une dispense automatique des gates.
- **Kintana :** cas d’étude pédagogique fictif. Le fil rouge personnel de l’apprenant est qualifié séparément après le Cadrage.
- **Gates G1–G9 :** contrôles transversaux de préparation Staff. Ils ne remplacent pas les gates individuels des 19 mini-projets.
- **S1–S6 :** familles de preuves ; **S7** est le transfert transversal, pas une septième famille ; G8 est le contrôle IA/automatisation défini dans le Staff Readiness Gate.

## Règle d’usage

Quand deux documents semblent se contredire, conserve l’identifiant et le rôle de chaque couche, puis consulte la Route 58 pour l’ordre opérationnel. Ne déduis jamais un prérequis uniquement du numéro d’un dossier ou d’un palier.
