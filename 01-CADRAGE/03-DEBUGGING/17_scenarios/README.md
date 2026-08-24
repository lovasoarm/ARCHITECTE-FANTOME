---
stability: intemporel
acte: comprendre
---

# Scénarios de blind debug

Trois bugs reproductibles. Le binôme (ou l'IA) charge le scénario et **ne montre pas le code** à celui qui debug. Ce dernier pose des questions ciblées jusqu'à identifier la ligne fautive et le fix.

Voir `../07-blind_debug.md` pour la règle du jeu.

- `scenario_1_debounce.js` : un `debounce` qui ne debounce pas.
- `scenario_2_double_post.js` : une requête POST qui part deux fois.
- `scenario_3_react_stale_state.jsx` : un state React qui "oublie" une update.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [`00_scenario_1_debounce.js`](00_scenario_1_debounce.js)
- [`01_scenario_2_double_post.js`](01_scenario_2_double_post.js)
- [`02_scenario_3_react_stale_state.jsx`](02_scenario_3_react_stale_state.jsx)

<!-- CONTENU-DOSSIER:fin -->
