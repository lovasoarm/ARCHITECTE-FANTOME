---
stability: "intemporel"
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_contexte, temps_limite]
anti_recipe_key: changement_contexte+temps_limite
transfer_distance: high
assessment_role: instructional_checkpoint
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/05-OBSERVABILITY/README.md"
source_scope: "Index interne du module Observability associé à l’exercice de lecture logs, métriques et traces."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# EXO LECTURE : ~20 minutes : un cycle (Observabilite)

**Durée indicative : environ 20 minutes** : environ 2 minutes pour prendre connaissance de la consigne, puis 15 minutes pour le protocole et quelques minutes pour consigner le résultat. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

<!-- AF-DIAGRAM:observability -->

```text
                         System
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           Logs         Metrics        Traces
             │             │             │
        events/text     trends/SLO    causality/path
```

Logs, métriques et traces donnent trois angles complémentaires pour reconstruire le comportement d’un système.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 470 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Competence : lire du code reel que tu n'as pas ecrit et le comprendre AVANT de
le modifier. C'est 80% du metier. Applique le protocole
`05-MAITRISE/06-ANNEXES/02-cartographier_codebase_inconnue.md` en version zoom.

## L'extrait

On te fournit : un logger structure avec correlation-id : trace la propagation de l'id dans 3 appels async imbriques.

## Le protocole (15 min chrono)

1. POINT D'ENTREE : quelle ligne s'execute en premier ? Qui appelle ce code ?
2. HYPOTHESE SUR LE COMPORTEMENT : sans l'executer, ecris ce que tu crois qu'il
   fait, entree -> sortie.
3. VERIFICATION : execute (ou lis les tests), compare a ton hypothese, explique
   tout ecart.

## Livrable

`LECTURE_<nom>.md` avec tes 3 sections remplies + un dessin ASCII du flux.

## (attention) Ce que l'exo revele

Si ton hypothese etait fausse, tant mieux : tu viens d'apprendre ou ton modele
mental cloche. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent
mais juste.

## RÈGLE READ_ONLY_FIRST (non négociable)

**Tu n'as PAS le droit de modifier le code tant que tu ne peux pas :**

1. Expliquer à voix haute ce que fait la fonction / le fichier, en 3 phrases.
2. Prédire correctement la sortie sur au moins 2 entrées distinctes (sans exécuter).
3. Nommer une hypothèse implicite du code (ex : "suppose que l'input est trié", "suppose qu'il y a un seul thread").

Tant que ces 3 points ne sont pas faits, `git status` doit rester `working tree clean` sur ce fichier. La lecture précède l'écriture. Un dev qui modifie avant d'avoir lu est un dev qui casse.

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans `HYPOTHESES.md`, ne le fais pas dans le fichier**.

---

## Livrable obligatoire : MAP_15MIN.md

Ce bloc appartient au parcours « Système web complet » / « Ingénierie senior ».

Crée `MAP_15MIN.md` dans ton espace de travail apprenant, en suivant le [template MAP_15MIN](../../02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/08-MAP_15MIN_TEMPLATE.md). Ne place pas ce livrable dans le dépôt source du curriculum.

Le `MAP_15MIN.md` complète `LECTURE_<nom>.md` : le MAP conserve la cartographie, le chemin critique, les points chauds et les hypothèses testables ; la fiche LECTURE conserve la prédiction de comportement, la vérification et l’écart observé. **Le MAP est le livrable du même protocole de 15 minutes ; il ne constitue pas une séance supplémentaire.**

**Critère binaire :** 15 minutes chronométrées (ou dépassement documenté), cartographie non vide, chemin critique, exactement 3 points chauds et exactement 3 hypothèses testables.

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
