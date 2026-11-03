---
stability: intemporel
acte: évaluer
route: complete
---

**SCÈNE CRAZYDEVS : Attack on Titan :** avant de déplacer un mur, tu dois comprendre pourquoi il est là. Une grosse codebase ne se conquiert pas en éditant le premier fichier qui semble coupable.

# Auto-test d'entrée : `04-BIG-APP-SNOOP`

Temps de lecture ~3 min

Acte attendu : évaluer. Réponds sans ouvrir le module.

## Ce que tu dois déjà avoir terminé

- [`03-REALTIME`](../03-REALTIME/README.md) est le précédent recommandé dans le bloc Épreuve, mais n'est pas un prérequis technique.
- [`15-ARCHI-LAB`](../../02-CONSTRUCTION/15-ARCHI-LAB/README.md) et [`20-API-DOJO`](../../02-CONSTRUCTION/20-API-DOJO/README.md) apportent des repères utiles : couches, responsabilités, frontières de service, contrat d'API, flux d'une requête et pattern repository. Une expérience équivalente convient.

Le diagnostic ci-dessous vérifie ces repères ; il ne demande pas de collectionner des validations de modules. Si l'un des concepts est nouveau, commence la lecture et garde les grimoire liés comme remédiation avant l'analyse autonome d'un dépôt. Aucun prérequis IA ou Bonus Vault n'est imposé.

## Questions

1. Dans une application en couches, quelle responsabilité ne devrait pas être portée directement par l'interface utilisateur ?
2. À quoi sert un repository, et pourquoi son interface doit-elle rester cohérente avec le contrat attendu par le service appelant ?
3. Pourquoi un changement d'API peut-il casser un client même si le serveur continue de répondre correctement à ses propres tests ?

## Verdict

- **2 réponses solides sur 3** → ouvre [`README.md`](README.md).
- Si les responsabilités ou les frontières sont floues, reprends le grimoire
  d'[Archi Lab](../../02-CONSTRUCTION/15-ARCHI-LAB/90-grimoire.md).
- Si le contrat ou le flux d'appel est flou, reprends le grimoire
  d'[API Dojo](../../02-CONSTRUCTION/20-API-DOJO/90-grimoire.md).
- Realtime reste un module recommandé dans l'ordre de la voie Épreuve ; il ne bloque pas Big App Snoop.

