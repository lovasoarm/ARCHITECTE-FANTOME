---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, solution_concurrente]
anti_recipe_key: fausse_piste+solution_concurrente
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

# 06 : Blind Debug

Temps de lecture ~5 min

> **Principe universel** : un bon debugger raisonne à partir des **symptômes**, pas du code. C'est ce que tu fais quand tu aides un collègue dont tu n'as pas le repo sous les yeux.

## Règle du jeu

- Un binôme (ou l'IA) tient le code.
- **Toi**, tu ne le vois pas.
- Tu poses **des questions** pour localiser le bug.
- Objectif : **nommer la ligne fautive** et le fix, sans ouvrir le fichier.

## 3 scénarios fournis (reproductibles, code fourni)

Le code de chaque scénario est dans [`17_scenarios/`](./17_scenarios/) : celui qui **tient le code** ouvre le fichier, celui qui **debug** ne le voit jamais.

1. Un `debounce` qui ne debounce pas -> [`17_scenarios/00_scenario_1_debounce.js`](./17_scenarios/00_scenario_1_debounce.js)
2. Une requête `POST` qui part deux fois -> [`17_scenarios/01_scenario_2_double_post.js`](./17_scenarios/01_scenario_2_double_post.js)
3. Un state React qui oublie une update -> [`17_scenarios/02_scenario_3_react_stale_state.jsx`](./17_scenarios/02_scenario_3_react_stale_state.jsx)

Les scénarios sont **reproductibles** : deux binômes différents jouent exactement le même bug, la comparaison de scores est valide.

## Rubrique de score

- Nombre de questions posées avant identification (moins = mieux).
- Les 3 meilleures questions à réutiliser plus tard.

## (attention) Piège

"Envoie-moi le code" = tu perds. La contrainte fait le muscle.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
