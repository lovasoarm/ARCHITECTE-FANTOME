---
stability: intemporel
scope: "portage mental (Pierre 6 : Pensee Transferable)"
acte: comprendre
---

> **SCÈNE CRAZYDEVS : mur de siège :** le bug n'est pas “où ça a explosé ?”, mais “où la première fissure est-elle apparue ?”. Ici, chaque log, test et reproduction est une empreinte dans le mur.

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

Module : **01-CADRAGE/04-ERROR-HANDLING** : try/catch, erreurs typees, propagation, erreurs silencieuses.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : exceptions comme en JS (`try`/`except`), mais hierarchie de classes riche (`ValueError`, `KeyError`...) a capturer par type precis, jamais `except:` nu.
- **Go** : pas d'exceptions du tout ; l'erreur est une valeur de retour explicite (`val, err := f()`), verifiee ligne par ligne. Oublier un `if err != nil` est le buveur silencieux du langage.
- **Rust** : erreurs recuperables via `Result<T, E>` (type somme, force le traitement par le compilateur), erreurs irrecuperables via `panic!`. Pas d'exception cachee possible : tout throw JS non catche a un equivalent explicite en signature de fonction.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
