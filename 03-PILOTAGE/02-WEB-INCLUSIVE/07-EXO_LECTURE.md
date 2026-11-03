---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [changement_echelle, fausse_piste]
anti_recipe_key: changement_echelle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# EXO LECTURE : ~50 minutes : 3 cycles de 15 min (Web Inclusive (a11y + i18n))

**Durée indicative : environ 50 minutes** : 45 minutes de travail chronométré (3 cycles de 15 minutes, chacun avec un extrait différent), plus environ 2 minutes de prise en main et une petite marge de préparation. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 350 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier.

## L'extrait

On te fournit un extrait qui gère un composant accessible (roles ARIA, focus trap) OU un pluriel i18n : issu de `03-PILOTAGE/02-WEB-INCLUSIVE/` ou `i18n/`. 15 minutes de protocole par cycle ; traite un seul extrait pendant chaque cycle.

## Le protocole (15 min chrono)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : exécute (ou lis les tests), compare à ton hypothèse, explique tout écart. Le nombre d'écarts est le vrai résultat de l'exercice.

## Livrable

`LECTURE_<nom>.md` avec les trois cycles réunis dans un seul fichier, sous trois sections datées `Cycle 1`, `Cycle 2` et `Cycle 3`. Chaque section contient les trois parties du protocole. Ne remplace pas les résultats d’un cycle par ceux du suivant.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur Web Inclusive. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Réalise trois cycles avec trois extraits différents ; conserve les résultats dans les trois sections datées de `LECTURE_<nom>.md`.
- Croise avec `EXO_VERIFICATION.md` du même module quand il existe : compare ton hypothèse humaine à celle qu'une IA produirait sur le même extrait.

---

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans `HYPOTHESES.md`, ne le fais pas dans le fichier**.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
