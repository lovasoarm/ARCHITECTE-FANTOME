---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : traqueur de jutsu :** Naruto voit l'explosion finale et accuse le dernier fichier touché. Mauvais réflexe. Ton enquête doit remonter le flux, figer les hypothèses et retrouver la première trace qui ne colle plus.

# 05 : Debug hypothèse-dirigé

Temps de lecture ~5 min

> **Principe universel** : méthode scientifique appliquée au code. Hypothèse → expérience → réfutation. Sherlock, pas devin.

## Le protocole

1. **Observation** : symptôme précis, pas "ça marche pas".
2. **Hypothèse** : phrase **réfutable**. "Le bug vient de X parce que Y."
3. **Expérience** : la plus petite modification qui **prouve ou réfute** l'hypothèse.
4. **Verdict** : si réfutée, nouvelle hypothèse. Jamais "je change et je vois".
5. **Explication** : tu dois pouvoir expliquer le bug **à voix haute** avant le fix.

## 5 bugs à traiter

Pour chacun, produis un fichier `HYPOTHESES.md` avec au minimum 3 hypothèses ordonnées par coût.

1. `list.map(async fn)` renvoie `[Promise, Promise, ...]` non résolues.
2. `setTimeout(fn, 100)` s'exécute après 3s en prod.
3. `fetch` renvoie `undefined` sous Safari uniquement.
4. Un test passe seul, échoue en suite.
5. Un compteur affiche `NaN` après 1h d'usage.

## (attention) Piège

Coder le fix pendant qu'on formule l'hypothèse. **Interdit.** Sépare pensée et action.

> **Ce protocole revient plus tard, à l'échelle système.** Une fois rendu à
> `05-MAITRISE/02-SCALABILITY`, tu appliqueras exactement ce même protocole à des pannes
> distribuées (cascading failure, incohérence entre services) dans
> [`09-b_hypotheses_panne_distribuee.md`](../../05-MAITRISE/02-SCALABILITY/09-b_hypotheses_panne_distribuee.md).
> Rien à faire ici, juste à savoir que ce protocole n'est pas qu'un exercice local.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
