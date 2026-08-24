---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_inversee, fausse_piste]
anti_recipe_key: decision_inversee+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# 00 : Prereq check : OOP en JS

<!-- AF-DIAGRAM:prototype -->

```text
┌──────────────┐
│ objet        │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ prototype    │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ Object.proto │
└──────────────┘
```

Une propriété absente sur l’objet est recherchée le long de sa chaîne de prototypes.

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/16-DDD-CONTRATS`, le module que tu viens de finir.

## Questions

1. Contexte borné : définition, et pourquoi `Planning.Client` n'est pas `Facturation.Client` ?
2. Pourquoi toute frontière entre deux contextes exige une traduction explicite, et quel coût elle porte ?
3. Règle de survie d'un contrat : que peut-on ajouter, que ne peut-on pas retirer, et à quelle condition ?
4. Cohérence à terme : quelle promesse métier chiffrée écris-tu, et qu'est-ce qu'une vue vide sans étiquette ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/16-DDD-CONTRATS/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : `prototype` vs `__proto__`, ce que
> `class` en JS cache réellement dessous, et composition vs héritage sont
> le contenu que ce module va t'enseigner (notamment
> `02-prototype_chain_raw.md`) : normal de ne pas encore les maîtriser. Ta
> compréhension est testée en fin de module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
