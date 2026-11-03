---
stability: evolutif
acte: piloter
noyau: oui
route: complete
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/12-PLATFORM-ENGINEERING/01-00-why-platform-engineering.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Prison Break :** un seul passage secret peut suffire à une équipe. Pour trente équipes, il faut un système de portes, de badges, de chemins sûrs et une règle pour les changer sans tout casser.

# 12 : PLATFORM ENGINEERING : LA ROUTE RAPIDE DOIT AUSSI ÊTRE LA ROUTE SÛRE

Le cloud moderne n’est plus seulement « où je déploie mon service ». Le vrai problème Staff devient : comment donner à plusieurs équipes un chemin de livraison répétable, observable, sécurisé et réversible.

## Parcours

- `00-PREREQUIS.md`
- `01-00-why-platform-engineering.md`
- `02-gitops-and-drift.md`
- `03-internal-developer-platform.md`
- `04-golden-paths-and-dx.md`
- `05-platform-as-a-product.md` : discovery, roadmap, métriques, coûts et valeur.
- `06-secrets-and-credentials.md` : cycle de vie, privilèges, rotation, audit et révocation. Vérifie les recommandations de sécurité auprès des sources officielles avant de les appliquer à un système réel.
- `07-case-fil-rouge-platform.md` : cas complet qui relie IDP, GitOps, Golden Path, sécurité et fiabilité.
- `95-challenge.md`
- `96-boss-fight.md`
- `90-grimoire.md`
- `99-PORTAGE-MENTAL.md`
- `99A-PONT.md`

## Comment utiliser le module

Suivre le parcours dans l’ordre : GitOps → IDP → Golden Path/DX → Platform as a Product → secrets. Réaliser le cas fil rouge, puis le challenge, et terminer par le boss fight sans consulter les critères détaillés avant la première tentative. Le module est réussi lorsque les livrables et les preuves du challenge atteignent le seuil indiqué, sans échec critique en sécurité ni en reprise.

Les idées cloud/platform ici s’appuient sur les pratiques actuelles Kubernetes, GitOps, IDP et supply-chain security ; elles restent enseignées comme mécanismes, pas comme marques de produit. La CNCF documente en 2026 la montée des plateformes internes et de GitOps comme indicateurs de maturité cloud-native. [Source officielle](https://www.cncf.io/announcements/2026/01/20/kubernetes-established-as-the-de-facto-operating-system-for-ai-as-production-use-hits-82-in-2025-cncf-annual-cloud-native-survey/)

## Navigation complète des ressources

Le sommaire ci-dessus reste le parcours recommandé. Les index ci-dessous rendent accessibles les ressources d'appui et les sous-parcours qui ne sont pas des étapes linéaires supplémentaires.

### Ressources d'appui et vérification

- [Prérequis : Platform Engineering](00-PREREQUIS.md)
- [Pourquoi Platform Engineering existe](01-00-why-platform-engineering.md)
- [GitOps : déclarer l'état désiré et réconcilier l'état réel](02-gitops-and-drift.md)
- [Internal Developer Platform : rendre le chemin sûr accessible en self-service](03-internal-developer-platform.md)
- [Golden Paths et Developer Experience : réduire la friction sans enfermer les équipes](04-golden-paths-and-dx.md)
- [Platform as a Product : traiter les développeurs comme des utilisateurs](05-platform-as-a-product.md)
- [Secrets et credentials : protéger les identités des automatisations](06-secrets-and-credentials.md)
- [Cas fil rouge : plateforme interne pour trois équipes produit](07-case-fil-rouge-platform.md)
- [Grimoire : Platform Engineering](90-grimoire.md)
- [Challenge : livrer un chemin développeur sûr et mesurable](95-challenge.md)
- [Boss fight : drift, incident de plateforme et rollback sous pression](96-boss-fight.md)
- [Portage mental](99-PORTAGE-MENTAL.md)
- [Pont : vers la maîtrise Staff](99A-PONT.md)

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.
