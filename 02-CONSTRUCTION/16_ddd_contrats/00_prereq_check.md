---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : DDD et contrats
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/15-ARCHI-LAB`, le module que tu viens de finir.

## Questions

1. Différence entre couplage et cohésion, en une phrase chacun ?
2. Pourquoi une dépendance dirigée ne doit jamais former de cycle dans le graphe de modules ?
3. Qu'est-ce qu'une source de vérité, et que se passe-t-il si deux copies d'une même donnée divergent sans que personne ne l'ait décidé ?
4. Cite les quatre critères qui justifient de découper un monolithe en services.

## Calibration obligatoire : tracer une frontière de contexte (10 min)

Les questions ci-dessus vérifient du vocabulaire de découpage. Ce module demande autre chose : sentir où une même notion cesse d'être la même notion selon qui en parle. C'est le geste fondateur du contexte borné, et il ne s'apprend pas en le lisant.

Pour chacune des trois notions, écris en une ligne ce qu'elle signifie pour deux métiers différents d'un club de football, et dis si les deux définitions peuvent vivre dans le même modèle :

1. "joueur", pour le staff médical et pour la billetterie ;
2. "match", pour l'entraîneur et pour la comptabilité ;
3. "saison", pour le centre de formation et pour le service juridique.

### Corrigé

1. Non : le staff médical suit un corps dans le temps, la billetterie suit une identité commerciale. Même mot, deux cycles de vie, deux contextes.
2. Non : l'entraîneur voit un événement sportif avec composition et minutes jouées, la comptabilité voit une recette et des charges datées.
3. Oui, exceptionnellement : les deux parlent d'une période bornée par les mêmes dates. C'est le cas rare où le partage d'un modèle est légitime, et il faut savoir le reconnaître aussi.

### Seuil de passage

Trois réponses justifiées par un cycle de vie ou par une source de vérité différente, dont au moins un "oui" ou un "non" correctement identifié à contre-courant de ton premier réflexe : tu entres. Une réponse justifiée par "ce n'est pas la même table" ne compte pas : c'est une justification technique pour une frontière métier.

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/15-ARCHI-LAB/`, ou à son `grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : le langage ubiquitaire, les contextes bornés, CQRS et
> le versioning de contrat sont le contenu que ce module va t'enseigner (notamment
> `01_langage_contextes_bornes.md` et `02_cqrs_coherence_terme.md`) : normal de ne pas
> encore les maîtriser. Ta compréhension est testée en fin de module, dans
> `grimoire.md` et dans `boss-fight.md`.
