---
stability: stable
acte: comprendre
---

# Transferability : same idea, other language

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


Temps de lecture ~5 min

Ces exercices existent pour **prouver** (à toi-même) que tu as appris des
**concepts**, pas de la syntaxe JS.

Règle : tu n'as pas le droit de dire « je sais faire ça » avant d'avoir
livré l'exercice équivalent hors JS.

## Comment ça marche

1. Choisis un exercice JS que tu as réussi dans le curriculum.
2. Ré-implémente-le dans un langage que tu ne pratiques pas au quotidien
   (Python, Go, Rust, Elixir, Bash pur, peu importe pourvu que ce ne soit
   pas JS/TS).
3. Compare : mêmes entrées, mêmes sorties, mêmes cas limites.

## Grille d'évaluation (auto-notation)

Note-toi honnêtement de 0 à 5 sur chaque axe :

| Axe | 0 | 3 | 5 |
|---|---|---|---|
| **Parité fonctionnelle** | La sortie diffère | Certains cas limites ratés | Byte-à-byte identique |
| **Idiomatique** | Traduction ligne à ligne du JS | Quelques adaptations | Utilise les vraies conventions du langage cible |
| **Test** | Aucun test | Tests happy path | Tests cas limites + tests de propriété |
| **Documentation** | Aucune | README minimal | Explique les choix propres au langage |
| **Temps** | > 3× le temps JS | ~2× | ≤ 1,5× |

Score minimal pour valider : **15/25**.

## Exercices recommandés pour commencer

- Un pipeline FP du module `02-CONSTRUCTION/09-FUNCTIONAL-JS` (map/filter/reduce composés).
- L'algorithme LRU du module `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` ou du mini-projet 13.
- Un mini-serveur HTTP du module `04-EPREUVE/03-REALTIME` ou 21.

## Piège fréquent

Réécrire mot-à-mot le JS en Python donne l'illusion du transfert. Le vrai
transfert se voit à ce que tu utilises `enumerate` en Python plutôt que
`for (let i = 0; i < arr.length; i++)`. Si ton code Python ressemble à du
JS déguisé, tu n'as pas transféré : tu as translittéré.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Drill : Python](02-closure_in_python.md)
- [Drill : Java](03-debug_java_cold_read.md)
- [Drill : Pseudo-Rust](04-event_loop_in_pseudorust.md)
- LIRE DU CODE HUMAIN vs LIRE DU CODE IA
- [Drill : Rust](06-map_rust_repo.md)
- [Drill : Go](07-observer_in_go.md)
- [EXERCICE DE TRANSFERT : mode d'emploi](08-EXERCICE_DE_TRANSFERT.md)
- [Épreuve finale : debug cross-language + ADR comparatif en 4h](95-challenge.md)
- [`09_pool_bugs/`](09_pool_bugs/README.md)

<!-- CONTENU-DOSSIER:fin -->
