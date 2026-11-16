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
          node-version-file: .nvmrc
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
    node-version-file: .nvmrc
    cache: npm
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

<!-- AF-DIAGRAM:tooling -->

## Repère visuel utile : Outil reproductible pour l'équipe Kintana

```text
problème répétitif
       |
       v
solution native ?
   | oui       | non
   v           v
simple     outil évalué
               |
               v
version + tests + docs
               |
               v
usage reproductible
```

<!-- AF-LESSON-PROFILE: tooling -->

## Repères de décision

- **Pourquoi :** La CI transforme les critères de qualité en contrôles répétés à chaque changement et rend visible la raison d'un échec.
- **Quand l’utiliser / quand l’éviter :** Exécute les vérifications nécessaires au risque du dépôt. N'ajoute pas de déploiement automatique avant d'avoir un rollback, des permissions et des environnements maîtrisés.
- **Limites :** Un pipeline vert ne prouve pas l'absence de défaut ; il prouve uniquement que les contrôles configurés ont réussi sur ce commit.

## Mécanisme : la version sans magie

Construis un workflow qui checkout, configure la version Node du dépôt, installe à partir du lockfile, lance tests/lint/build et publie un résumé lisible. Introduis volontairement une assertion qui échoue pour vérifier que le job devient rouge et bloque le succès global ; restaure ensuite le test.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **CI/CD : pipeline de vérification et seuil de merge** s'applique au dépôt de l'équipe : la preuve doit correspondre à l'outil et au problème traités, pas à une automatisation générique.

**À observer :** comportement attendu, cas d'échec, trace utile et niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Ne transforme pas un exemple en résultat exécuté.

## Mission utile : Kintana : CI/CD : pipeline de vérification et seuil de merge

**Mission liée à « CI/CD : pipeline de vérification et seuil de merge » :** Construis un workflow qui checkout, configure la version Node du dépôt, installe à partir du lockfile, lance tests/lint/build et publie un résumé lisible. Introduis volontairement une assertion qui échoue pour vérifier que le job devient rouge et bloque le succès global ; restaure ensuite le test.

**Livrable :** `.github/workflows/ci.yml`, une capture/trace de run vert et un run d'échec volontaire, avec le SHA du commit testé.

**Critères d’acceptation :** Le workflow se parse ; l'installation respecte le lockfile ; chaque étape critique a un code de sortie ; un test échoué fait échouer le job ; aucun secret n'est exposé et aucun déploiement n'est ajouté sans nécessité.

**Transfert obligatoire :** Le pipeline doit aussi lancer un job de vérification rapide sur une pull request. Décris les contrôles parallélisables, les dépendances entre jobs et le signal qui autorise le merge.
