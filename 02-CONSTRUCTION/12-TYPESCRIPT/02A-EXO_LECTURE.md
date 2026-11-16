---
stability: "intemporel"
acte: pratiquer
cognitive_level: L4
perturbation_modes: [defaut_cache, solution_concurrente]
anti_recipe_key: defaut_cache+solution_concurrente
transfer_distance: low
assessment_role: diagnostic_mastery
source_verified_on: null
freshness_status: "not_verified"
source_url: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/12-TYPESCRIPT/README.md"
source_scope: "Référence interne du module TypeScript associée à l’exercice de lecture ; toute assertion dépendant d’une version doit être vérifiée séparément."
provenance_note: "Référence interne explicitement reliée au sujet ; elle ancre le parcours mais ne constitue pas une preuve externe. Aucun contenu n’est déclaré revérifié par cette mise à jour."
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# EXO LECTURE : ~50 minutes : 3 cycles de 15 min (TypeScript)

**Durée indicative : environ 50 minutes** : 45 minutes de travail chronométré (3 cycles de 15 minutes, chacun avec un extrait différent), plus environ 2 minutes de prise en main et une petite marge de préparation. Le checkpoint de profondeur, s’il est présent, est un prolongement séparé et n’est pas compris dans cette durée.

Lecture de la consigne : ~2 min

> **LOCK : pas d'édition avant le fichier `LECTURE_<nom>.md` signé.** Pour chacun des trois cycles, ajoute au moins trois hypothèses avec leur preuve attendue, puis indique l'auteur et la date dans la section du cycle. Le livrable est un seul fichier, pas trois fichiers parallèles.
>
> **Signature pédagogique (convention commune) :** chaque fichier d’hypothèses doit se terminer par les deux mentions suivantes :
>
> - `Auteur (nom ou identifiant) : ...`
> - `Date (AAAA-MM-JJ) : ...`
>   Pour un exercice en plusieurs cycles, signe chaque fiche de cycle ; pour un fichier unique, signe-le une fois après l’avoir complété. Cette mention identifie l’auteur et la date ; ce n’est ni une signature électronique ou juridique, ni une revue indépendante.
>
> **Budget lecture** : 300 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire du code réel que tu n'as pas écrit et le comprendre AVANT de le modifier. C'est une part importante du métier.

## L'extrait

On te fournit un extrait TS avec types conditionnels, `infer`, discriminated union ou template literal types : issu de `02-CONSTRUCTION/12-TYPESCRIPT/03_ts_advanced/`. 15 minutes de protocole par cycle ; traite un seul extrait pendant chaque cycle.

## Le protocole (15 min chrono)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : exécute (ou lis les tests), compare à ton hypothèse, explique tout écart. Le nombre d'écarts est le vrai résultat de l'exercice.

## Livrable

`LECTURE_<nom>.md` avec les trois cycles réunis dans un seul fichier, sous trois sections datées `Cycle 1`, `Cycle 2` et `Cycle 3`. Chaque section contient les trois parties du protocole. Ne remplace pas les résultats d’un cycle par ceux du suivant.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur TypeScript. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Réalise trois cycles avec trois extraits différents ; conserve les résultats dans les trois sections datées de `LECTURE_<nom>.md`.
- Pour questionner une réponse IA trop confiante, utilise [`97-EXO-VERIFICATION.md`](97-EXO-VERIFICATION.md) : ce drill examine une suggestion trompeuse, il ne remplace pas la compilation.
- Pour une preuve de comportement et de typage, utilise [`98-EXO-VERIFICATION.md`](98-EXO-VERIFICATION.md) : il exige une compilation TypeScript et des assertions exécutables.

---

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans la section `HYPOTHÈSES` du cycle concerné dans `LECTURE_<nom>.md`, ne le fais pas dans le fichier source**.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.
