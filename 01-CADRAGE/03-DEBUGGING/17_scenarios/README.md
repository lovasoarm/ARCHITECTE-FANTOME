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

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
