---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "05-MAITRISE/06-ANNEXES/30_transferability/09_pool_bugs/02-CANDIDATS.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 05-MAITRISE/06-ANNEXES/30_transferability/09_pool_bugs/02-CANDIDATS.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# POOL BUGS

> Sommaire de `05-MAITRISE/06-ANNEXES/30_transferability/09_pool_bugs`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Pool de bugs : candidats calibrés](02-CANDIDATS.md)
- [CHAOS INSTRUCTIONS : casser un projet volontairement pour s'entraîner](03-CHAOS_INSTRUCTIONS.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **notification fiable** : Intègre cette notion au traitement asynchrone des notifications Kintana. Simule au moins un timeout, un retry et un événement reçu deux fois ; conserve une clé stable pour empêcher un double effet. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le système ne perd pas silencieusement l’événement ; il ne double pas l’effet ; le délai et le nombre de tentatives sont observables.
