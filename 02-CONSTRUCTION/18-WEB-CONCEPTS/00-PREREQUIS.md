---
stability: intemporel
acte: évaluer
cognitive_level: L4
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# 00 : Prereq check : Web Concepts

Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre à ces questions
> **sans regarder**. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Ces questions portent sur `02-CONSTRUCTION/17-OOP-JS`, le module que tu viens de finir.

## Questions

1. `prototype` vs `__proto__` : que désigne exactement chacun ?
2. Que cache réellement le mot-clé `class` en JS, une fois le sucre syntaxique retiré ?
3. Cite deux règles qui déterminent la valeur de `this` à l'appel, avec un contre-exemple.
4. Composition vs héritage : dans quel cas préfères-tu la composition, et pourquoi ?

## Verdict

- **3+ réponses solides** → tu peux entrer.
- **2 ou moins** → retour à `02-CONSTRUCTION/17-OOP-JS/`, ou à sa synthèse `90-grimoire.md`.

> Se sentir "prêt" ≠ être prêt. Les questions ci-dessus tranchent.

> **Note pour ce module précis** : la différence CORS/CSP, ce qui bloque le
> rendu d'une page, et les directives Cache-Control sont le contenu que ce
> module va t'enseigner (notamment `02-http_rest_basics.md`) : normal de
> ne pas encore les maîtriser. Ta compréhension est testée en fin de
> module, dans `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
