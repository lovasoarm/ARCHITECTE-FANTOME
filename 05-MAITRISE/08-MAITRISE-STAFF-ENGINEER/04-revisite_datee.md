---
stability: intemporel
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [constraints_injectees, regression]
anti_recipe_key: constraints_injectees+regression
transfer_distance: high
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# La revisite datée : ce qui sépare un dossier d'une photo

Temps de lecture ~2 min

Durée : 45 min à écrire, 3 h à jouer plus tard.

## Le principe

Un dossier décrit un système à un instant. Un ingénieur se juge sur ce qu'il fait quand la réalité a
bougé. Tu fixes donc, aujourd'hui, la date à laquelle tu rouvriras ton propre dossier.

## Les trois dates à écrire maintenant

| Échéance | Ce que tu rejoues                                 | Critère de réussite                                    |
| -------- | ------------------------------------------------- | ------------------------------------------------------ |
| J+30     | relevé tarifaire refait, budget recalculé         | écart au budget < 20 %, sinon explication              |
| J+90     | restauration réelle rechronométrée, SLO recalculé | RTO tenu, budget d'erreur documenté                    |
| J+180    | les trois tensions réexaminées                    | au moins une a changé de camp, ou le seuil est atteint |

## Le protocole de revisite

1. Relis le dossier **sans** rien corriger, et note en marge chaque phrase devenue fausse.
2. Pour chaque phrase fausse : est-ce le monde qui a changé, ou l'affirmation qui était fausse dès le
   départ ? La deuxième catégorie est la seule qui t'apprend quelque chose.
3. Écris `REVISITE-<date>.md` : ce qui a tenu, ce qui a cassé, ce que tu ne referais pas.
4. Mets à jour les chiffres, jamais l'historique. On n'efface pas une prévision ratée : on l'annote.

## Le critère qui compte

Un dossier revisité une fois vaut trois dossiers neufs. La compétence prouvée n'est pas d'avoir eu
raison : c'est d'avoir su à quel moment tu avais eu tort, et de l'avoir écrit.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une décision prise le 1er juin choisit une base relationnelle pour un volume estimé de 10 000 opérations par jour. La revisite du 1er septembre montre 12 000 opérations par jour, un p95 stable et aucun besoin de partitionnement. L'équipe maintient la décision et note le prochain déclencheur : hausse durable du p95 ou franchissement du budget. **Résultat :** ne pas changer est aussi une décision lorsqu'elle s'appuie sur des mesures datées.

**À toi :** Une décision locale réduit le coût d’une équipe mais crée une dépendance pour quatre autres ; tu dois arbitrer le système global et obtenir l’adoption. Pour « La revisite datée : ce qui sépare un dossier d'une photo », construis un exemple où deux équipes ont des objectifs contradictoires. Distingue contrainte, préférence, coût immédiat, coût différé et critère de décision.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:leadership -->

## Repère visuel utile : Revisiter une décision dans le temps

```text
décision datée
      |
      v
hypothèses initiales
      |
      v
nouvelles observations
      |
      v
conserver / adapter / inverser
      |
      v
prochaine date de revue
```

<!-- AF-LESSON-PROFILE: leadership -->

## Repères de décision

- **Pourquoi :** Le leadership technique fait avancer des problèmes qui dépassent une PR ou une équipe. Il exige écoute, arbitrage, adoption et responsabilité après la décision.
- **Quand l’utiliser / quand l’éviter :** Utilise RFC, ADR, revue et mentorat quand une décision affecte plusieurs personnes ou systèmes. Ne confonds pas autorité, volume de parole et influence réelle.
- **Limites :** Un document, une réunion ou un exercice ne prouvent pas une adoption. L'influence doit être vérifiée par le changement de comportement, les responsabilités et les résultats observés.

## Mécanisme : la version sans magie

Cadre le problème commun, collecte les contraintes, compare options, expose externalités, facilite la décision, attribue les actions et revient mesurer l'adoption.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **La revisite datée : ce qui sépare un dossier d'une photo** se rattache à ce cas concret : Une évolution Kintana peut toucher API, client mobile, données, sécurité et exploitation. La décision doit rendre les coûts visibles à chaque équipe concernée.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Revisiter une décision à partir de faits nouveaux

**Mission liée à « La revisite datée : ce qui sépare un dossier d'une photo » :** Reprends un ADR Kintana daté. Compare ses hypothèses aux observations disponibles, décide de conserver, modifier ou retirer la décision et explique pourquoi.

**Livrable :** Entrée de revisite datée avec hypothèses, observations, décision et prochaine échéance.

**Critères d’acceptation :** Le contexte initial est conservé ; les faits nouveaux sont sourcés ; la révision ne réécrit pas l’historique.

**Transfert obligatoire :** Aucun signal nouveau n’apparaît : justifie le maintien et fixe une prochaine date ou condition.
