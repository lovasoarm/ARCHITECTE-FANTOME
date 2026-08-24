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

Module : **02-CONSTRUCTION/08-DATA-SPELLS** : SQL, ORM, cles etrangeres, requetes.

Encart obligatoire (Pierre 6 : Pensee Transferable). 3 lignes.
Objectif : prouver que ce que tu viens d'apprendre n'est pas _JS_, c'est
un concept d'ingenierie que tu retrouveras ailleurs.

- **Python** : `SQLAlchemy` (ORM le plus proche de Prisma/TypeORM en expressivite) ou Django ORM ; le SQL genere se lit et se debugue de la meme facon, les pieges N+1 sont identiques.
- **Go** : ORMs plus minces (`sqlc` genere du code type-safe depuis du SQL brut au lieu de generer le SQL depuis des objets, philosophie inverse d'un ORM classique) ; la gestion des transactions est plus explicite, moins de magie implicite.
- **Rust** : `sqlx` verifie les requetes SQL a la compilation contre le schema reel de la base (erreur de colonne = erreur de compilation, pas une exception a l'execution comme en JS) ; `diesel` pour un ORM plus classique avec le meme controle de type fort.

## Auto-test (1 min)

Ferme ce fichier. Ecris de tete, en 3 lignes, comment tu ferais la meme chose
en Python, Go, Rust. Rouvre. Compare. Ce que tu n'as pas su ecrire, c'est ce
qui reste postule sur la Pierre 6 : c'est la ta prochaine micro-lecture.
