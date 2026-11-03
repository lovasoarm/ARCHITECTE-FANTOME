---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [preuve_partielle, changement_contexte]
anti_recipe_key: preuve_partielle+changement_contexte
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Realtime)

**Durée indicative : environ 50 minutes** : 45 minutes de travail chronométré (3 cycles de 15 minutes), environ 3 minutes pour lire la consigne et environ 2 minutes de préparation/consignation, soit un repère global d’environ 50 minutes. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~3 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 380 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier.

## L'extrait

On te fournit un extrait WebSocket / SSE / backpressure ou un scheduler qui coordonne des flux : issu de `04-EPREUVE/03-REALTIME/` ou `02-CONSTRUCTION/02-MINI-PROJECTS/11_scheduler/`. 15 minutes de protocole par cycle ; traite un seul extrait pendant chaque cycle.

## Le protocole (15 min chrono)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : exécute (ou lis les tests), compare à ton hypothèse, explique tout écart. Le nombre d'écarts est le vrai résultat de l'exercice.

## Livrable

`LECTURE_<nom>.md` avec les trois cycles réunis dans un seul fichier, sous trois sections datées `Cycle 1`, `Cycle 2` et `Cycle 3`. Chaque section contient les trois parties du protocole. Ne remplace pas les résultats d’un cycle par ceux du suivant.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur Realtime. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Réalise trois cycles avec trois extraits différents ; conserve les résultats dans les trois sections datées de `LECTURE_<nom>.md`.
- Croise avec `EXO_VERIFICATION.md` du même module quand il existe : compare ton hypothèse humaine à celle qu'une IA produirait sur le même extrait.

## Livrable obligatoire : MAP_15MIN.md

Ce bloc appartient au parcours « Système web complet » / « Ingénierie senior ».

Crée un seul fichier `MAP_15MIN.md` dans ton espace de travail apprenant, avec trois sections distinctes et datées : `Cycle 1`, `Cycle 2` et `Cycle 3`. Pour chaque cycle, reprends les rubriques du [template MAP_15MIN](../../02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/08-MAP_15MIN_TEMPLATE.md). Conserve les trois cartographies dans le même fichier ; ne fusionne pas leurs observations et n’efface pas les résultats précédents. Ne crée pas ce livrable dans le dépôt source du curriculum.

Le `MAP_15MIN.md` complète `LECTURE_<nom>.md` : le MAP conserve la cartographie, le chemin critique, les points chauds et les hypothèses testables ; la fiche LECTURE conserve la prédiction de comportement, la vérification et l’écart observé. **La cartographie est réalisée pendant le même créneau de 15 minutes que le cycle correspondant ; elle n’ajoute pas une quatrième séance ni 45 minutes supplémentaires.**

**Critère binaire pour chacun des trois cycles :** 15 minutes chronométrées (ou dépassement documenté), cartographie non vide, chemin critique, exactement 3 points chauds et exactement 3 hypothèses testables. Le fichier final doit donc contenir les trois sections complètes.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

<!-- AF-DIAGRAM:transfer -->

```text
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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
