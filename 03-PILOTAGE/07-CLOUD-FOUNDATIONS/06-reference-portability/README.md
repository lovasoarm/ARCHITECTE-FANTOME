---
perishability_id: PER-0060

stability: "perissable"
acte: appliquer
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "AWS Well-Architected Framework : structure officielle du cadre et de ses piliers. Le cadre est une référence d’évaluation/conception, pas une certification automatique de conformité ou de qualité."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "AWS_WELL_ARCHITECTED_FRAMEWORK_REFERENCE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

# Reference portability lab : deux fournisseurs, un même contrat

Ce labo renforce le transfert sans inventer de tarifs.

## Contrat immuable

Le service de référence expose :

- `GET /health`
- `GET /items/:id`
- stockage objet d'un artefact ;
- métriques de latence et d'erreur ;
- budget mensuel à trois paliers.

## Variante A : fournisseur AWS

Le déploiement de référence utilise l'équivalent :
calcul + stockage objet + base managée + observabilité.

## Variante B : fournisseur GCP

Le déploiement de référence utilise les équivalents :
calcul + stockage objet + base managée + observabilité.

## Ce qui doit rester identique

Les invariants du service, les tests de contrat, les objectifs SLO, la structure de
journalisation et les hypothèses de charge restent identiques. Seules les
interfaces fournisseur sont remplacées.

## Ce que l'apprenant doit démontrer

1. plan/apply ou exécution équivalente chez A ;
2. plan/apply ou exécution équivalente chez B ;
3. mêmes tests de contrat des deux côtés ;
4. prix relevés le même jour pour les deux fournisseurs ;
5. une différence de service qui a réellement coûté une décision ;
6. stratégie de retour arrière.

### Sans compte cloud ni moyen de paiement

Le labo reste réalisable sans créer de compte fournisseur et sans lancer de ressource
facturable : compare les pages tarifaires publiques, décris les équivalences, prépare les
manifests/plans et exécute les deux implémentations et leurs tests de contrat dans des
environnements locaux distincts. Étiquette le dossier `PORTAGE_CONÇU` ; cette preuve suffit
pour la porte d'entrée du Capstone.

La preuve « exécuté chez les deux fournisseurs » ne peut être validée que dans le dépôt
apprenant avec les URLs/captures/logs datés d'un service réellement accessible chez chacun.
Étiquette alors le dossier `PORTAGE_EXÉCUTÉ` ; cette preuve ferme S7. N'achète rien et ne
crée pas une ressource payante pour satisfaire le labo.

Le curriculum ne confond donc pas **portabilité conçue**, **implémentation locale exécutée**
et **portabilité réellement exécutée chez deux fournisseurs**.

<!-- AF-KINTANA-MODULE -->

## Mise en pratique produit : Kintana

Kintana est un cas d’étude pédagogique commun, pas un projet personnel imposé. Pour ce module, applique **la notion réellement enseignée ici** à la mission correspondante dans la [carte des missions Kintana par domaine](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md). N’utilise pas automatiquement la FAQ IA : elle est réservée aux activités IA/RAG. Le challenge local de ce module reste la source de la consigne et de ses critères ; cette mise en pratique ne crée ni prérequis, ni gate supplémentaire.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework)
- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

## Ressources pratiques associées

- [Préparer l'activité (`SETUP.md`)](SETUP.md) : environnement, prérequis et commandes.
