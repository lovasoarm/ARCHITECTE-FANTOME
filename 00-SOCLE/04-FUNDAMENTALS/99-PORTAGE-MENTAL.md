---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

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

Module : **00-SOCLE/04-FUNDAMENTALS** : variables, scope, fonctions, types, modules, regex.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : scope de fonction + `global`/`nonlocal` explicites (pas de `var` fantome) ; typage dynamique fort, annotations optionnelles (`mypy`) ; modules = fichiers `.py` + `import`, pas de hoisting.
- **Go** : scope de bloc strict, pas de closures implicites sur boucle avant Go 1.22 ; typage statique, pas de coercion implicite ; modules = `go.mod` + packages, tout export commence par une majuscule.
- **Rust** : scope de bloc avec ownership (une variable peut devenir inaccessible sans etre hors scope) ; typage statique inferrable, jamais de conversion implicite ; modules = `mod` + `Cargo.toml`, visibilite explicite via `pub`.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
