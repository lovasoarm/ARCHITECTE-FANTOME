---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : MVP split
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre **oui, sans regarder**
> aux cinq affirmations ci-dessous. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Module amont de référence : `01-CADRAGE/04_error_handling`.

Ce module apprend a decouper en tranches livrables et a choisir le fil rouge qui portera tout le parcours. Il suppose que tu sais deja prevoir l'echec : une tranche livrable qui ignore ses cas d'erreur n'est pas livrable.

## Les cinq affirmations (oui / non, rien entre les deux)

| # | Affirmation | Le fichier amont qui la fournit |
| --- | --- | --- |
| 1 | Je sais quand attraper une erreur et quand la laisser remonter, avec une raison, pas un reflexe. | [03_error_propagation.md](../04_error_handling/03_error_propagation.md) |
| 2 | Je sais definir une erreur metier propre plutot que de renvoyer une chaine de caracteres. | [02_custom_errors.md](../04_error_handling/02_custom_errors.md) |
| 3 | Je connais au moins deux pieges d'erreur en asynchrone et je sais les eviter. | [04_async_error_traps.md](../04_error_handling/04_async_error_traps.md) |
| 4 | J'ai une strategie d'erreur ecrite pour un projet, pas seulement des `try` disperses. | [05_error_strategy.md](../04_error_handling/05_error_strategy.md) |
| 5 | Je sais separer, dans une demande, ce qui est un besoin de ce qui est une solution deja choisie. | [02-find-the-real-need.md](../01-PROBLEM-HUNT/02-find-the-real-need.md) |

## Consigne d'arrêt

**Deux non = tu reviens en arrière avant d'ouvrir ce module.** Deux non = tu reviens dans `01-CADRAGE/04_error_handling` avant d'ouvrir ce module.

Un « oui » qui a besoin d'ouvrir le fichier pour être prononcé est un non. Se sentir prêt
n'est pas être prêt : les cinq affirmations tranchent, et elles se cochent en trois minutes.

## Verdict

- **5 oui** → tu entres.
- **4 oui** → tu entres, mais tu relis d'abord le fichier amont du non.
- **3 oui ou moins** → retour au module amont, grimoire compris.
