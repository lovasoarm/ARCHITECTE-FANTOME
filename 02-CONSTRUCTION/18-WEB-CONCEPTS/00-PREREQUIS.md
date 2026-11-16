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

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `02-CONSTRUCTION/17-OOP-JS`, le module que tu viens de finir.

## Questions

1. `prototype` vs `__proto__` : que désigne exactement chacun ?
2. Que cache réellement le mot-clé `class` en JS, une fois le sucre syntaxique retiré ?
3. Cite deux règles qui déterminent la valeur de `this` à l'appel, avec un contre-exemple.
4. Composition vs héritage : dans quel cas préfères-tu la composition, et pourquoi ?

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../17-OOP-JS/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : CORS, CSP et CSRF sont introduits dans
> [`06-auth_authz.md`](06-auth_authz.md), le rendu navigateur dans
> [`03-browser_render_pipeline.md`](03-browser_render_pipeline.md), et les
> directives `Cache-Control` dans [`05-caching_strategies.md`](05-caching_strategies.md).
> Tu peux arriver sans les maîtriser ; le challenge vérifie que tu sais les
> distinguer à la fin du parcours.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
