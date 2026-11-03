---
stability: intemporel
acte: évaluer
cognitive_level: L3
perturbation_modes: [decision_inversee, defaut_cache]
anti_recipe_key: decision_inversee+defaut_cache
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 00 : Prereq check : Realtime

Temps de lecture ~5 min

> Avant de commencer ce module, essaie de répondre à ces questions **sans regarder**.
> Ce diagnostic n’est pas noté : il sert à repérer les bases déjà acquises et les notions à revoir, pas à te fermer l’accès.
> Ces questions portent sur `03-PILOTAGE/02-WEB-INCLUSIVE`, le module que tu viens de finir.

## Questions

1. Que fait un lecteur d'écran, concrètement, sur une page mal structurée ?
2. Quel est le contraste minimum exigé par WCAG AA ?
3. Pourquoi une `div` cliquable (sans `<button>`) est-elle un piège d'accessibilité ?
4. Cite un attribut ARIA et explique à quoi il sert.

## Verdict

- **3+ réponses solides** → commence le module et garde les points hésitants comme objectifs de révision.
- **2 ou moins** → relis le [grimoire du module précédent](../../03-PILOTAGE/02-WEB-INCLUSIVE/90-grimoire.md), puis refais ce diagnostic. Il t’aide à choisir une révision utile ; il ne ferme pas l’accès au module.

> Le but n’est pas de te bloquer : ce diagnostic t’aide à choisir une révision utile.

> **Note pour ce module précis** : quand choisir WebSocket vs SSE, ce
> qu'est le backpressure, et WebRTC sont le contenu que ce module va
> t'enseigner (notamment `02_sse/02-sse_basics.md`) : normal de ne pas
> encore les maîtriser. Ta compréhension est testée en fin de module, dans
> `90-grimoire.md`.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
