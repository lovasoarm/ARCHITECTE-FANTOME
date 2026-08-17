---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : API dojo
Temps de lecture ~5 min

> Tu ne dois **pas** entrer dans ce module si tu ne peux pas répondre **oui, sans regarder**
> aux cinq affirmations ci-dessous. Ce n'est pas un test noté, c'est un filtre anti-illusion.
> Module amont de référence : `02-CONSTRUCTION/19_api_craft`.

Ce module durcit les contrats, l'idempotence et les limites. Il suppose que tu sais deja construire une API qui repond : on ne durcit pas ce qui n'existe pas.

## Les cinq affirmations (oui / non, rien entre les deux)

| # | Affirmation | Le fichier amont qui la fournit |
| --- | --- | --- |
| 1 | J'ai construit une API REST complete avec ses quatre operations, et je l'ai appelee depuis un client. | [02_rest_crud_complete.md](../19_api_craft/02_rest_crud_complete.md) |
| 2 | Je sais renvoyer une erreur d'API exploitable : code, message, et de quoi agir. | [03_error_handling_api.md](../19_api_craft/03_error_handling_api.md) |
| 3 | Je sais ce que porte un jeton d'authentification et ce qu'il ne prouve pas. | [04_auth_jwt.md](../19_api_craft/04_auth_jwt.md) |
| 4 | Je sais versionner une API et dire ce qui constitue une rupture de contrat. | [06_api_versioning.md](../19_api_craft/06_api_versioning.md) |
| 5 | Je sais decrire une API dans un document que quelqu'un d'autre peut consommer sans me parler. | [07_openapi_swagger.md](../19_api_craft/07_openapi_swagger.md) |

## Consigne d'arrêt

**Deux non = tu reviens en arrière avant d'ouvrir ce module.** Deux non = tu reviens dans `02-CONSTRUCTION/19_api_craft` avant d'ouvrir ce module.

Un « oui » qui a besoin d'ouvrir le fichier pour être prononcé est un non. Se sentir prêt
n'est pas être prêt : les cinq affirmations tranchent, et elles se cochent en trois minutes.

## Verdict

- **5 oui** → tu entres.
- **4 oui** → tu entres, mais tu relis d'abord le fichier amont du non.
- **3 oui ou moins** → retour au module amont, grimoire compris.
