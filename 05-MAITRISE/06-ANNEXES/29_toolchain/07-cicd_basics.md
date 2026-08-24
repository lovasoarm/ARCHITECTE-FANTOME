---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [transmission, changement_echelle]
anti_recipe_key: transmission+changement_echelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 06 : CI/CD basics (feedback automatique)

Temps de lecture ~5 min

> **INTEMPOREL** : la CI existe depuis Cruise Control (2001). Les YAML
> changent, l'idée non : **chaque push est vérifié automatiquement**.

## Objectif

Pour chaque mini-projet, un pipeline qui :

1. installe les deps avec la version Node figée (`.nvmrc`),
2. lance les tests (`node --test tests/`),
3. lance le linter si présent,
4. échoue bruyamment si un des trois échoue.

## Template GitHub Actions

Fichier : `.github/workflows/ci.yml`

```yaml
name: ci
on:
 push:
  branches: [main]
 pull_request:

jobs:
 test:
  runs-on: ubuntu-latest
  steps:
   - uses: actions/checkout@v4
   - uses: actions/setup-node@v4
    with:
     node-version-file: '.nvmrc'
   - run: npm ci --ignore-scripts
   - run: node --test tests/
   - run: npm run lint --if-present
```

## Pourquoi `--ignore-scripts`

Les scripts `postinstall` des dépendances peuvent exécuter n'importe quel
code. En CI, sur un runner qui a un token du repo → **vecteur classique
d'attaque supply chain**. Voir `03-PILOTAGE/04-SECURITY/08-supply_chain_sbom.md`.

## Cache

Ajoute pour accélérer :

```yaml
   - uses: actions/setup-node@v4
    with:
     node-version-file: '.nvmrc'
     cache: 'npm'
```

## Signalisation dans le README

Chaque mini-projet doit afficher son badge :

```md
![CI](https://github.com/<toi>/<repo>/actions/workflows/ci.yml/badge.svg)
```

Un badge rouge dans un portfolio = **signal ultra positif** : tu montres
que ta CI existe et que tu réagis aux échecs. Un projet sans CI = signal
négatif silencieux.

## Étapes suivantes (hors scope)

- Déploiement automatique (CD) : Vercel, Fly.io, Cloudflare, k8s.
- Tests de sécurité en CI : `npm audit --production`, `trivy fs`.
- Preview environments par PR.

## (attention) Ce que l'analogie "CI = tests dans le cloud" cache

La CI est aussi un **contrat social** : elle rend visible ce que tu ne
veux pas voir. Un test flaky en CI publique force l'équipe à le régler.
En local, on l'oublie.

## CHECKPOINT DE PROFONDEUR : variation D : transfert négatif

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

Prends le mécanisme de cette page et transpose-le dans un contexte où il risque de devenir une mauvaise pratique. Explique **quelle hypothèse cesse d'être vraie**, quelle conséquence apparaît, et quelle stratégie tu utiliserais à la place.
