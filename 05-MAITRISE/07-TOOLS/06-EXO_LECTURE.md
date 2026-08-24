## perishability_id: PER-0079

stability: perissable
acte: pratiquer
cognitive_level: L4
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
review_due: 2028-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# EXO LECTURE : 15-25 minutes (05-MAITRISE/07-TOOLS)

Temps de lecture ~2 min

> **LOCK : pas d'édition avant HYPOTHESES.md signé.** Tu ne modifies AUCUN fichier avant que ton `HYPOTHESES.md` soit signé (>= 3 hypothèses, chacune avec preuve attendue). Sinon, l'exo ne compte pas.
>
> **Budget lecture** : 500 lignes en 15 min chrono. Si tu dépasses, note pourquoi dans `MAP.md`. Objectif progressif : tu dois pouvoir tenir 500 lignes en 15 min à la fin du curriculum.
>
> **Protocole de cartographie** : suis `../06-ANNEXES/23_reading/02-cartographie_15min.md` si tu ne sais pas par où entrer.

Temps de lecture ~2 min

Compétence : lire une doc d'outil (logger, benchmark, debug toolkit) et
identifier ce qui est spécifique à l'outil versus ce qui est un principe
transposable.

## L'extrait

Ouvre `./02-logger_structure.md` (ou un autre chapitre du module `05-MAITRISE/07-TOOLS`
que tu n'as pas encore fait).

## Questions (10 min)

1. Cite **2 concepts** du chapitre qui restent valides si tu changes de
   logger (Pino → Winston, ou l'inverse).
2. Cite **1 détail** qui est spécifique à l'outil documenté et qui ne
   survivrait pas à un changement d'outil.
3. Le chapitre propose-t-il un contre-exemple (une situation où l'outil
   n'est PAS le bon choix) ? Résume-le en une phrase.
4. Si tu devais intégrer cet outil dans un mini-projet du bloc 30, lequel
   choisirais-tu et pourquoi ?

## Auto-évaluation

- 4/4 juste : tu as extrait l'invariant. C'est ce qui te rendra difficile
  à remplacer par une IA qui recopie une doc.
- < 4/4 : relis en te posant explicitement la question « qu'est-ce qui
  survit à un changement d'outil ? » à chaque paragraphe.

## RÈGLE READ_ONLY_FIRST (non négociable)

**Tu n'as PAS le droit de modifier le code tant que tu ne peux pas :**

1. Expliquer à voix haute ce que fait la fonction / le fichier, en 3 phrases.
2. Prédire correctement la sortie sur au moins 2 entrées distinctes (sans exécuter).
3. Nommer une hypothèse implicite du code (ex : "suppose que l'input est trié", "suppose qu'il y a un seul thread").

Tant que ces 3 points ne sont pas faits, `git status` doit rester `working tree clean` sur ce fichier. La lecture précède l'écriture. Un dev qui modifie avant d'avoir lu est un dev qui casse.

Si tu veux "juste renommer une variable pour comprendre" : **note-le dans `HYPOTHESES.md`, ne le fais pas dans le fichier**.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
