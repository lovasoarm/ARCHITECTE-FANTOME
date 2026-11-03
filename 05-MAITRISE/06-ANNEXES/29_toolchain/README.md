---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/06-ANNEXES/29_toolchain/01-00-why-toolchain.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/06-ANNEXES/29_toolchain/01-00-why-toolchain.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# TOOLCHAIN

> Sommaire de `05-MAITRISE/06-ANNEXES/29_toolchain`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Pourquoi ce module mérite ton temps](01-00-why-toolchain.md)
- [Git survival : branches, rebase, conflits, bisect](02-git_survival.md)
- [Vscode setup : ton camp de base, configuré pour tenir](03-vscode_setup.md)
- [Package managers : NPM, yarn, PNPM, les différences qui comptent vraiment en 2026](04-package_managers.md)
- [Bundlers : webpack, vite, esbuild, rollup : choisir sans subir](05-bundlers.md)
- [Docker basics : containeriser une app node : dockerfile, compose, multi-stage builds](06-docker_basics.md)
- [06 : CI/CD basics (feedback automatique)](07-cicd_basics.md)
- [Page verrouillée](90-grimoire.md)
- [08-NODE_VERSIONS.md](08-NODE_VERSIONS.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **livraison exploitable** : Rends le composant Kintana reproductible dans l’environnement prévu par le module : configuration explicite, health/readiness, arrêt propre, journal utile et procédure de retour arrière. N’ajoute pas d’outil qui n’est pas nécessaire au sujet. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Un tiers suit les commandes documentées ; une configuration invalide échoue clairement ; le retour à la version précédente est testé ou marqué non exécuté.

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
