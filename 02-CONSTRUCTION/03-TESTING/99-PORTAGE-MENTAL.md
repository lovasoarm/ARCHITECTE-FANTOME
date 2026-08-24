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

Module : **02-CONSTRUCTION/03-TESTING** : tests unitaires, mocking, TDD, tests de contrat, e2e.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `pytest` remplace Jest (fixtures au lieu de `beforeEach`, `monkeypatch` pour le mocking) ; TDD et tests de contrat (`pact-python`) identiques dans l'intention, syntaxe plus permissive.
- **Go** : testing integre au langage (`go test`, pas de framework externe requis) ; pas de mocking magique, on passe par des interfaces implementees par un faux objet (dependency injection explicite) au lieu d'un `jest.mock()` qui reecrit le module.
- **Rust** : tests unitaires dans le meme fichier que le code (`#[cfg(test)]`), le compilateur empeche deja une classe de bugs que JS ne detecte qu'a l'execution ; mocking via traits (comme les interfaces Go), jamais de reecriture dynamique de module.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
