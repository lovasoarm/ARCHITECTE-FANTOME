---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 99-PORTAGE-MENTAL.md : ce concept en Python / Go / Rust

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Temps de lecture ~2 min

Module : **02-CONSTRUCTION/16-DDD-CONTRATS** : contextes bornes, CQRS, event-driven, contrats d'API versionnes.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : DDD s'implemente pareil (entites, value objects, agregats sont des concepts de modelisation, pas de langage) ; CQRS souvent visible en Django via des serializers de lecture separes des serializers d'ecriture.
- **Go** : les contextes bornes se materialisent naturellement en packages Go isoles avec des types non partages entre eux ; event-driven frequent via des queues (Kafka, NATS) avec des consommateurs Go tres legers en memoire, contrainte differente de Node.
- **Rust** : les contrats d'API se verifient a la compilation quand les deux cotes (client et serveur) partagent les memes types generes (ex. via `protobuf` ou des crates partagees) ; une migration de contrat cassee devient une erreur de compilation plutot qu'un bug decouvert en prod.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
