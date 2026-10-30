---
stability: stable
---

# Observability contract

```text
Client ── requestId ──> HTTP gateway ──> scoped retrieval ──> optional LLM
  │                         │                  │                │
  └── status/latency        ├── JSON logs      ├── retrieved IDs└── timeout/mode
                            └── counters/p50/p95
```

Chaque requête doit pouvoir être diagnostiquée sans enregistrer son contenu sensible. La réponse fournit un identifiant de corrélation ; les logs HTTP incluent méthode, chemin, code et latence, mais pas le token, la question, le contexte ni la réponse générée.

Métriques disponibles sur `/metrics` (endpoint protégé) : nombre total de requêtes, erreurs HTTP, requêtes query, refus faute de preuve, modes dégradés, requêtes en cours, échantillon p50/p95 des latences HTTP. Ces p50/p95 sont des percentiles de l'échantillon glissant des 1 000 dernières réponses en mémoire, pas un histogramme Prometheus complet ni une base historique.

Les métriques sont locales au processus : elles ne survivent pas au redémarrage et ne se combinent pas entre instances. Le laboratoire n'exporte pas de traces distribuées ni de SLO calculé à partir de données persistées. Pour une production, agréger ces signaux avec un collecteur/stockage adapté, ajouter taux d'erreur et SLI end-to-end, alertes et corrélation aux déploiements.
