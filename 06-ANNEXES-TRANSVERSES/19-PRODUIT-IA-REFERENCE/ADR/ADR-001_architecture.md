---
stability: stable
---

# ADR-001 : retrieval déterministe local + gateway HTTP + provider optionnel

## Décision

Le retrieval et la séparation tenant restent déterministes et côté serveur. Une petite gateway HTTP expose le service derrière un bearer token, des limites bornées et des métriques ; le fournisseur LLM reste une dépendance optionnelle derrière une interface unique.

## Pourquoi

Cela permet d'évaluer le pipeline hors ligne, de tester les failure modes et d'observer les requêtes sous charge légère sans envoyer les questions à un fournisseur externe. Le tenant vient du binding serveur, et les documents sont filtrés avant la récupération et la génération.

## Conséquences et compromis

- Avantages : dépendance runtime externe nulle, tests reproductibles, fallback, séparation explicite du tenant, limites et observabilité minimales.
- Coûts : bearer token de démonstration, limiteur mémoire mono-instance, corpus local, métriques simplifiées ; pas d'identité fédérée, de révocation en ligne ni de coordination distribuée.
- Une sortie LLM est non vérifiée ; citations, schéma de sortie, policy métier et contrôle humain doivent être implémentés selon le risque.

## Non-objectifs

Cette architecture ne certifie pas une production, ne fournit pas à elle seule une plateforme RAG multi-tenant, un service de secrets, du TLS, des alertes, de la haute disponibilité ou des garanties de conformité. Le déploiement Docker et le smoke load test constituent un modèle pédagogique à durcir par cas d'usage.
