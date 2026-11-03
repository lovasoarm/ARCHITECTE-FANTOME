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

- **Pourquoi :** La toolchain et les outils de diagnostic réduisent les tâches répétitives et rendent le comportement du système visible.
- **Quand l’utiliser / quand l’éviter :** Choisis un outil quand il résout un problème fréquent et mesurable. Vérifie sa licence, sa maintenance, ses versions, ses permissions et son coût avant de l'ajouter.
- **Limites :** Un outil n'est pas une politique de qualité. Un benchmark, logger ou générateur peut donner une fausse confiance si son protocole et ses limites ne sont pas écrits.

## Mécanisme : la version sans magie

Décris le problème, compare l'outil à une commande native ou à une alternative plus simple, épingle sa version et vérifie le résultat qu'il produit.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **06 : CI/CD basics (feedback automatique)** se rattache à ce cas concret : L'équipe Kintana doit pouvoir diagnostiquer une panne et refaire un build sans dépendre d'une configuration cachée sur le poste d'une seule personne.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Outil reproductible pour l'équipe Kintana

> **Arc Capsule Corp. / DBZ :** le bon outil accélère le diagnostic ; dix outils mal choisis ne font que déplacer le bazar.

**Mission liée à « 06 : CI/CD basics (feedback automatique) » :** Automatise une opération récurrente du cycle Kintana (analyse, benchmark, log, build ou debug). Ajoute un mode dry-run si l'action est destructive et une vérification qui empêche l'outil de masquer une erreur.

**Livrable :** outil/script, README d'usage, tests sur succès/échec, version épinglée et comparaison au processus manuel.

**Critères d’acceptation :** les arguments sont validés ; les erreurs ont un code de sortie ; aucune donnée sensible n'est imprimée ; la même commande donne une sortie compréhensible et reproductible.

**Transfert obligatoire :** Exécute l'outil sur une autre machine ou avec une version différente. Documente les prérequis et le mode dégradé.
