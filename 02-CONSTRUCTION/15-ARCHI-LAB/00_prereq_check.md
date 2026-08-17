---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : archi lab
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre **oui, sans regarder**
> aux cinq affirmations ci-dessous. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Module amont de référence : `02-CONSTRUCTION/14_architecture_patterns`.

Ce module trace des frontieres et choisit une architecture. Il suppose connus les patterns d'architecture : on ne choisit pas entre des options qu'on ne sait pas nommer.

## Les cinq affirmations (oui / non, rien entre les deux)

| # | Affirmation | Le fichier amont qui la fournit |
| --- | --- | --- |
| 1 | Je sais enoncer les cinq principes SOLID et donner un contre-exemple vecu pour au moins deux d'entre eux. | [02_solid_principles.md](../14_architecture_patterns/02_solid_principles.md) |
| 2 | Je sais ce qu'une architecture en couches interdit, pas seulement ce qu'elle organise. | [04_clean_architecture.md](../14_architecture_patterns/04_clean_architecture.md) |
| 3 | Je sais decrire un flux evenementiel et dire ce qu'il rend impossible a garantir. | [05_event_driven.md](../14_architecture_patterns/05_event_driven.md) |
| 4 | Je sais nommer au moins trois couts d'un decoupage en microservices. | [06_microservices_intro.md](../14_architecture_patterns/06_microservices_intro.md) |
| 5 | Je sais reecrire un module sans casser son comportement observable, tests a l'appui. | [README.md](../11_refactoring/README.md) |

## Consigne d'arrêt

**Deux non = tu reviens en arrière avant d'ouvrir ce module.** Deux non = tu reviens dans `02-CONSTRUCTION/14_architecture_patterns` avant d'ouvrir ce module.

Un « oui » qui a besoin d'ouvrir le fichier pour être prononcé est un non. Se sentir prêt
n'est pas être prêt : les cinq affirmations tranchent, et elles se cochent en trois minutes.

## Verdict

- **5 oui** → tu entres.
- **4 oui** → tu entres, mais tu relis d'abord le fichier amont du non.
- **3 oui ou moins** → retour au module amont, grimoire compris.
