---
stability: stable
---

# ADR-001 : Retrieval local + provider LLM derrière interface

## Décision

Le retrieval et les contrôles de sécurité restent déterministes et locaux.
Le fournisseur LLM est une dépendance optionnelle derrière une interface unique.

## Pourquoi

Cela permet d'évaluer le pipeline sans clé externe, de tester les failure modes
et de changer de fournisseur ou de modèle sans modifier la logique de retrieval.

## Conséquence

Le produit peut fonctionner sans IA distante. Lorsqu'un provider est branché,
la réponse reste soumise au même contexte, au même timeout et aux mêmes contrôles.
