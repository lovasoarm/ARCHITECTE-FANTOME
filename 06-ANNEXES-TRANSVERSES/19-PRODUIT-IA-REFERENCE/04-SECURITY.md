---
stability: stable
---

# Security gate : retrieval-gateway

- **Credential** : `API_TOKEN` est requis et comparé en temps constant pour les valeurs de même longueur. Le secret ne doit jamais se retrouver dans le dépôt, les logs ou les métriques.
- **Scope tenant** : `API_TENANT_ID` est lié à la configuration serveur ; le corps de requête ne peut pas sélectionner un autre tenant. Les documents sont filtrés avant le retrieval et avant l'envoi du contexte au modèle.
- **Prompt injection** : le contexte récupéré est de la donnée non fiable, pas une instruction système. Le prompt aide, mais ne remplace pas les autorisations, les tests de sortie et la validation déterministe.
- **Sortie modèle** : toutes les réponses `live` sont marquées `unverified-model-output`; aucun effet irréversible ne doit être déclenché sur cette seule base.
- **Minimisation** : seuls les extraits récupérés sont envoyés au provider. Ne pas envoyer de secret ni de donnée personnelle sans base légitime et contrôle explicite.
- **Endpoint provider** : HTTPS requis par défaut. HTTP est toléré uniquement pour loopback avec `LLM_ALLOW_INSECURE_HTTP=true`; cet interrupteur ne doit pas servir en production.
- **Timeout et volume** : timeout provider borné, taille de réponse limitée, body JSON limité, longueur de question et concurrence bornées ; rate limit local par processus seulement.
- **Secrets/logs** : les logs HTTP ne consignent pas la question, le token, le texte de contexte ou la réponse complète. Les codes d'erreur retournés au client restent génériques pour les erreurs serveur.
- **Mode dégradé** : provider absent ou en échec => extraits déterministes ou refus si aucune preuve autorisée ; pas de retry infini.
- **Déploiement** : bind loopback par défaut, conteneur non-root, image de base épinglée, racine read-only sous Compose. Une exposition publique exige TLS/ingress et contrôles d'accès adaptés.

Les tests locaux couvrent les invariants explicitement cités dans les tests d'intégration ; ils ne prouvent pas qu'une application RAG est sûre face à tous les prompts adversariaux ou dans un déploiement réel.
