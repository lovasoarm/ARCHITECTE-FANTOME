---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [regression, fausse_piste]
anti_recipe_key: regression+fausse_piste
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Le dossier unique : la pièce qui tient tout

Temps de lecture ~2 min

Durée : 6 h de rédaction, étalées. C'est le livrable terminal du parcours.

Un dossier de 10 à 14 pages, écrit sur **ton** fil rouge, qu'un jury ouvre sans toi et comprend seul.

## Les dix sections imposées

| #   | Section                         | Contenu                                                                                                                                | Source                                                                                                                                     |
| --- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Le problème                     | qui souffre, de quoi, combien ça coûte                                                                                                 | 01-CADRAGE                                                                                                                                 |
| 2   | Le découpage                    | carte de contextes, frontières justifiées                                                                                              | S2, module `02-CONSTRUCTION/14-ARCHITECTURE-PATTERNS`                                                                                      |
| 3   | Le coût                         | facture aux trois paliers, profil de charge, relevé daté et hypothèses explicites                                                      | S1, `03-PILOTAGE/07-CLOUD-FOUNDATIONS` + `02-CONSTRUCTION/04-MATH-BASICS` pour les unités/calculs                                          |
| 4   | La promesse                     | SLI/SLO, budget d'erreur, RPO/RTO mesurés                                                                                              | S3, `03-PILOTAGE/06-FIABILITE-SLO`, `04-SECURITY` et `05-OBSERVABILITY` ; Testing comme support de vérification                            |
| 5   | L'arbitrage                     | grille coût/risque/valeur, point mort, dette déclarée                                                                                  | S4, `03-PILOTAGE/08-PRODUIT-COUT-ROI` ; Memory Performance uniquement comme source de mesures de performance, pas comme module d’arbitrage |
| 6   | La note direction               | une page, zéro jargon, un chiffre, une contrepartie                                                                                    | S5, `03-PILOTAGE/11-LEADERSHIP-MENTORAT` et `10-TEAM-CRAFT`                                                                                |
| 7   | Livraison & exploitation        | version, release, migration, signaux post-déploiement, rollback/recovery daté                                                          | S6                                                                                                                                         |
| 8   | Les trois tensions              | trois contradictions chiffrées **entre** familles                                                                                      | `03-trois_tensions.md`                                                                                                                     |
| 9   | Le transfert                    | portage hors langage et hors fournisseur                                                                                               | S7, `05A-transfert_hors_ecosysteme.md`                                                                                                     |
| 10  | La transformation décisionnelle | croyance initiale, confiance, preuve contradictoire, changement d’avis, biais, junior-was-right, pression et mécanisme de compensation | `05-PSYCHOLOGIE-DECISION/README.md`                                                                                                        |

Le squelette exact de `PREUVES/`, les pièces conditionnelles et leur statut de preuve sont définis dans [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md). Ce tableau de dix sections est le document de synthèse du jury ; il ne remplace pas les pièces sources.

## Les règles de rédaction

- **Un chiffre par section, minimum, avec sa date de relevé et sa méthode.**
- Chaque affirmation renvoie à un fichier de ton dépôt par un chemin relatif qui existe.
- Aucune section ne dépasse une page et demie. Le jury lit 40 minutes, pas trois heures.
- Le dossier cite au moins un échec : un chantier abandonné, une hypothèse fausse, un coût sous-estimé.
  Un dossier sans échec est un dossier non vécu, et cela se voit en quinze secondes.

## Conditions de recevabilité (toutes)

- [ ] Les dix sections existent.
- [ ] Les six pièces S1–S6 et la preuve S7 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md) sont liées.
- [ ] Le contrôle transversal G8 `PREUVES/EVALUATION-IA.md` est annexé.
- [ ] `STANDARDS-AGENTS.md` est présent si des agents/automatisations autonomes sont utilisés ; sinon, la non-utilisation est justifiée dans `EVALUATION-IA.md`. La gouvernance d’agents n’est pas un substitut au leadership humain S5.
- [ ] `PREUVES/EVALUATION-IA.md` est annexée pour G8, même si le fil rouge n'intègre pas d'IA ; le périmètre hors IA, les automatisations utilisées et les raisons de refus d'IA sont justifiés.
- [ ] `PREUVES/IA-EN-PROD.md` est annexée uniquement si une brique IA fait partie du système réel.
- [ ] `REVUE-SECURITE.md`, `DECISION-ARBITRAGE.md` et `PLAN-MENTORAT.md` sont présentes avec leur niveau de preuve réel ; un plan de mentorat non exécuté ne prouve pas un résultat humain.
- [ ] Le dossier `ADR/` contient les ADR détaillés demandés par S2 ; `ADR-PRINCIPAL.md` en est l’index/synthèse.
- [ ] La section 8 contient trois tensions **chiffrées des deux côtés**.
- [ ] La section 9 contient un dossier `transfert/` réellement exécutable.
- [ ] Une date de revisite est fixée (`04-revisite_datee.md`).
- [ ] La section 10 contient une comparaison avant / pendant / après avec au moins une mesure chiffrée.
- [ ] `04-BELIEF-CHANGE-LOG.md`, `05-BIAS-LOG.md` et au moins deux épreuves de `05-PSYCHOLOGIE-DECISION/` sont annexés.

## Défense

La soutenance dure 30 minutes : 12 de présentation, 18 de contradiction. Le jury attaque la section 8 puis la section 10 : d’abord la qualité des arbitrages, puis la capacité du candidat à réviser son propre modèle sous contradiction.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Le dossier unique d'un service de réservation contient : objectif et SLO, diagramme de frontières, contrat API, modèle de données, menaces, procédure de déploiement, alertes, rollback, post-mortem et liens vers les décisions. Une personne externe peut retrouver la preuve de disponibilité et sa période, mais le dossier précise qu'aucune mesure de disponibilité n'existe avant la date de mise en place du suivi. **Pourquoi :** un dossier utile expose aussi les inconnues au lieu de les masquer.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « Le dossier unique : la pièce qui tient tout », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Assembler une preuve de bout en bout

```text
problème observé
      |
      v
baseline et contexte
      |
      v
décision + compromis
      |
      v
changement livré
      |
      v
résultat observé
      |
      v
limites et contre-preuves
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Le dossier unique : la pièce qui tient tout** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Assembler un dossier de preuve cohérent

**Mission liée à « Le dossier unique : la pièce qui tient tout » :** Construis un dossier sur une évolution Kintana en reliant problème, baseline, décision, changement livré, résultat observé et limites. Signale les preuves manquantes.

**Livrable :** Dossier indexé, chronologie, liens de preuve et résumé exécutif.

**Critères d’acceptation :** Chaque conclusion renvoie à une preuve ; les contributions sont attribuées ; les estimations ne deviennent pas des résultats.

**Transfert obligatoire :** Une preuve contredit le récit initial : corrige le dossier plutôt que de l’écarter.
