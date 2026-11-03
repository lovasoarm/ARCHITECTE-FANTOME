---
stability: evolutif
acte: parcours
noyau: non
review_interval: 6 mois
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/19-API-CRAFT/97-CHECKPOINT-PACK/97-criteres.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/19-API-CRAFT/97-CHECKPOINT-PACK/97-criteres.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

# VERIFICATION PACK

> Sommaire de `02-CONSTRUCTION/19-API-CRAFT/97-CHECKPOINT-PACK`.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [Critères de vérification : `19-API-CRAFT`](97-criteres.md)

<!-- CONTENU-DOSSIER:fin -->

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Le module utilise le cas d’étude pédagogique commun [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). Pour ce bloc, la mission centrale est **contrat api utile** : Expose une capacité Kintana avec contrat d’entrée/sortie, codes d’erreur stables, validation, autorisation et stratégie de retry/idempotence si l’opération écrit des données. Le module est validé par une preuve reproductible, un cas limite et une explication du compromis : Le contrat est testé côté serveur ; les erreurs sont prévisibles ; un client peut évoluer sans deviner le comportement.
