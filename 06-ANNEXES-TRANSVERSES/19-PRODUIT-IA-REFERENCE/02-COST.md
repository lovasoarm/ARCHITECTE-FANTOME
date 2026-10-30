---
stability: stable
---

# Cost model

Le produit sépare le coût local de retrieval du coût variable du provider LLM.

`coût_total ≈ appels_provider × coût_par_appel + calcul + stockage + réseau + observabilité + exploitation`

Le budget du provider doit inclure un plafond par utilisateur/tenant, un budget global, les limites de tokens/longueur de contexte, les timeouts et le comportement dégradé. Le rate limit mémoire de l'exemple protège uniquement un processus ; il ne constitue pas un quota financier partagé entre instances. Ne déduis pas le coût d'une réponse de sa seule latence.

Aucun prix fournisseur n'est figé ici. Les prix réels doivent être relevés, datés et sourcés dans le module cloud, avec le modèle, la région, les unités facturées, le cache éventuel et les frais de réseau/observabilité. Sans appels réels et factures observées, le laboratoire n'affirme pas avoir mesuré un coût de production.
