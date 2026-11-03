---
stability: intemporel
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Naruto :** un CMS n'est pas seulement un écran pour publier. Il relie des contenus, des personnes, des droits et plusieurs systèmes.

# Prérequis : CMS Architecture Lab

Ce diagnostic ne bloque pas la lecture. Tu n'as pas besoin d'avoir déjà construit un CMS ni de connaître toutes les briques avant d'entrer. Le module les présente puis les combine dans un cas guidé.

## Repères à reconnaître

- **API** : contrat qui permet à deux systèmes d'échanger.
- **Cache** : copie temporaire qui accélère une lecture et doit être invalidée au bon moment.
- **Authentification / autorisation** : vérifier qui agit, puis ce qu'il a le droit de faire.
- **Persistance** : conserver les données après la fin du programme.
- **Webhook** : notification envoyée à un autre système lorsqu'un événement survient.
- **Rôle** : ensemble de permissions associé à une fonction.
- **Déploiement / migration** : mettre une version en service et faire évoluer les données sans les perdre.

## Remédiation ciblée

- API, contrat, validation et webhooks : [API Craft](../../../02-CONSTRUCTION/19-API-CRAFT/README.md) et [API Dojo : contrats](../../../02-CONSTRUCTION/20-API-DOJO/02-contracts-first.md).
- Cache et cohérence : [Memory & Performance](../../../02-CONSTRUCTION/05-MEMORY-PERFORMANCE/README.md).
- Données, tables et migrations : [Databases](../../../05-MAITRISE/01-DATABASES/README.md).
- Authentification et permissions : [Security](../../04-SECURITY/README.md) et [RBAC](../../04-SECURITY/13-autorisation_rbac.md).

## Verdict

- **Les repères sont familiers** → commence `01-00-why-cms-architecture.md`.
- **Un ou plusieurs repères sont nouveaux** → commence aussi la lecture ; consulte le lien de remédiation au moment où la notion apparaît. Avant de rendre le challenge, tu dois pouvoir expliquer les frontières et les droits que tu proposes.

Tu n'as pas besoin de créer un compte chez un fournisseur ni de déployer un CMS public pour suivre le laboratoire : utilise le périmètre local/simulé du dossier.
