---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "04-EPREUVE/03-REALTIME/02_sse/02-sse_basics.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 04-EPREUVE/03-REALTIME/02_sse/02-sse_basics.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# SSE

> Sommaire de `04-EPREUVE/03-REALTIME/02_sse`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [01_Sse_basics : le serveur qui parle en premier](02-sse_basics.md)
- [02_Sse_live_feed : le dashboard de match en temps réel](03-sse_live_feed.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **notification fiable** : Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables.
