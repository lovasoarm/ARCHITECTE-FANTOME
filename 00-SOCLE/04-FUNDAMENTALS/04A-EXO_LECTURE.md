---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: pratiquer
cognitive_level: L3
perturbation_modes: [decision_inversee, constraints_injectees]
anti_recipe_key: decision_inversee+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO LECTURE : ~50 minutes : 3 cycles de 15 min (les Fondamentaux JS)

**Durée indicative : environ 50 minutes** : 45 minutes de travail chronométré (3 cycles de 15 minutes, chacun avec un extrait différent), plus environ 2 minutes de prise en main et une petite marge de préparation. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 100 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier.

## L'extrait

On te fournit un extrait 20-40 lignes mêlant closure, `this`, hoisting, coercion : issu de tes exercices ou d'un fichier de `00-SOCLE/04-FUNDAMENTALS/`. 15 minutes de protocole par cycle ; traite un seul extrait pendant chaque cycle.

## Le protocole (15 min chrono)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : exécute (ou lis les tests), compare à ton hypothèse, explique tout écart. Le nombre d'écarts est le vrai résultat de l'exercice.

## Livrable

`LECTURE_<nom>.md` avec les trois cycles réunis dans un seul fichier, sous trois sections datées `Cycle 1`, `Cycle 2` et `Cycle 3`. Chaque section contient les trois parties du protocole. Ne remplace pas les résultats d’un cycle par ceux du suivant.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur les Fondamentaux JS. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Réalise trois cycles avec trois extraits différents ; conserve les résultats dans les trois sections datées de `LECTURE_<nom>.md`.
- Croise avec `EXO_VERIFICATION.md` du même module quand il existe : compare ton hypothèse humaine à celle qu'une IA produirait sur le même extrait.

---

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans `HYPOTHESES.md`, ne le fais pas dans le fichier**.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
