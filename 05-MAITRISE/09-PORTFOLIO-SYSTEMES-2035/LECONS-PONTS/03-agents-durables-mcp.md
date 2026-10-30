---
stability: evolutif
acte: apprendre
noyau: non
route: depth
---

# Leçon-pont 03 : Agents durables, outils et MCP

## Résultat attendu

Savoir séparer le modèle, l'orchestrateur, le store d'état, les outils et les contrôles de sécurité ; expliquer ce qui se passe en cas de crash entre deux effets.

## Modèle de base

Un agent est un processus non fiable qui propose des actions. Les composants classiques doivent imposer identité, autorisation, schémas d'entrée/sortie, quotas, timeouts, idempotence, audit et récupération. Le prompt n'est pas une frontière de sécurité.

## Exercices

1. Écrire la machine à états d'une tâche durable et les transitions interdites.
2. Simuler un crash avant/après l'appel d'un outil, mais avant persistance du résultat.
3. Définir les clés d'idempotence et les effets pouvant être compensés.
4. Exposer un outil de lecture puis un outil d'écriture sous autorisations distinctes.
5. Demander confirmation humaine avant une action externe ou irréversible.
6. Injecter une instruction hostile dans un document ou résultat d'outil ; vérifier que l'autorisation serveur, pas le prompt, bloque l'action.

## Règles de sécurité

- Donner le minimum de permissions et la plus petite portée de fichiers/réseau possible.
- Limiter profondeur de boucle, durée, tokens/appels, concurrence et coûts.
- Stocker la mémoire avec provenance, date et possibilité de révision/suppression. Un résumé de modèle reste une donnée non fiable.
- Les tool calls doivent être auditables et attribués à une identité.
- MCP définit des contrats d'interaction ; il n'octroie pas automatiquement une autorisation ni une isolation. Épingler la spécification/SDK réellement utilisés et les mises à jour de sécurité.

## Références

- [MCP : spécification publiée le 28 juillet 2026](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- [MCP : guide d'autorisation](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/docs/2026-07-28/tutorials/security/authorization.mdx)
- [OWASP GenAI : excessive agency et autres risques](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/)
