## perishability_id: PER-0060

stability: perissable
acte: appliquer

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

### Sans compte cloud

Le labo reste évalué jusqu'au niveau d'architecture et de `plan`. La preuve
« exécuté chez les deux fournisseurs » ne peut être validée que dans le dépôt
apprenant avec les URLs/captures/logs datés correspondants.

Le curriculum ne confond donc pas **portabilité conçue** et **portabilité exécutée**.
