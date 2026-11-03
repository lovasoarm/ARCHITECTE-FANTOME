---
stability: intemporel
acte: pratiquer
cognitive_level: L3
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO DE LECTURE : trois cycles de 15 minutes (45 min au total)

**Durée indicative : 45 minutes**, soit trois cycles distincts de 15 minutes. Chaque cycle utilise un extrait différent ; les trois cycles constituent un seul exercice.

> **LOCK : pas d'édition avant les hypothèses.** Pour chaque cycle, écris et date d'abord le fichier correspondant (`HYPOTHESES_01.md`, `HYPOTHESES_02.md` ou `HYPOTHESES_03.md`). Il doit contenir au moins trois hypothèses et, pour chacune, l'observation ou la preuve qui pourrait la confirmer ou l'infirmer. Ne modifie pas l'extrait avant d'avoir enregistré cette fiche.
>
> **Budget de lecture** : vise au plus 120 lignes pertinentes pendant le cycle de 15 minutes. Si l'extrait est plus long ou difficile à cartographier, note le blocage dans `MAP.md` et réduis le périmètre. Ce nombre est un repère de time-box, pas un objectif de vitesse : la justesse de ta compréhension compte davantage que le volume lu.
>
> **Protocole de cartographie** : suis `../../05-MAITRISE/06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Compétence : lire un extrait de code ou un exemple structuré que tu n'as pas écrit, puis expliquer son comportement AVANT de le modifier. C'est une part importante du métier.

## Les trois extraits

Effectue trois cycles de 15 minutes, sans réutiliser deux fois le même extrait :

1. `03-decompose.md` : choisis le bloc de code ou le découpage illustré dans la leçon.
2. `05-choose_an_approach.md` : choisis un extrait distinct, notamment l'exemple de fonction de recherche.
3. `06-read_fuzzy_requirements.md` : choisis l'exemple de transformation d'une demande floue en comportement observable.

Pour chaque cycle, identifie le point d'entrée, les entrées, les sorties et un cas limite. Si le point d'entrée, l'appelant ou le déclencheur ne figurent pas dans l'extrait, écris « non fourni » au lieu de l'inventer. Si l'extrait est illustratif et ne peut pas être exécuté tel quel, fais une trace statique sur papier : n'invente pas une exécution.

## Le protocole (15 min par cycle)

1. **POINT D'ENTRÉE** : quelle ligne s'exécute en premier ? Qui appelle ce code ? Quel est le trigger externe ?
2. **HYPOTHÈSE SUR LE COMPORTEMENT** : sans exécuter, écris ce que tu crois qu'il fait, entrée -> sortie. Nomme au moins 1 cas limite que tu suspectes de casser.
3. **VÉRIFICATION** : si le code est exécutable dans le contexte fourni, lance-le ou lis les tests disponibles. Sinon, effectue une trace statique. Compare le résultat à ton hypothèse et explique tout écart ; indique clairement `EXÉCUTION` ou `TRACE STATIQUE`.

## Livrable

Produis trois fichiers (`LECTURE_01.md`, `LECTURE_02.md`, `LECTURE_03.md`), un par cycle, chacun avec les trois sections du protocole remplies et datées. Interdiction de modifier l'extrait avant que les hypothèses et la première explication soient enregistrées. Cf `../../02-CONSTRUCTION/11-REFACTORING/07-do_not_touch_before_explain.md`.

## (attention) Ce que l'exo révèle

Si ton hypothèse était fausse, tant mieux : tu viens d'apprendre où ton modèle mental cloche sur Problem Solving. Un dev qui lit vite mais faux est plus dangereux qu'un dev lent mais juste.

## Enchainement

- Fais les trois cycles avec les trois extraits indiqués avant de passer au prochain module. Conserve une fiche datée par cycle.
- `98-EXO-VERIFICATION.md` (45 min) est un exercice autonome facultatif ; `97-EXO-VERIFICATION.md` (10 min) est un exercice facultatif de détection d'une suggestion IA trompeuse. Aucun des deux ne conditionne la première passe ni le challenge.

---

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans le fichier `HYPOTHESES_XX.md` du cycle concerné ; ne modifie pas l'extrait**.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
