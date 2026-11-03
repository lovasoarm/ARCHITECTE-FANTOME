---
stability: intemporel
acte: construction
noyau: oui
perennite: intemporel
cognitive_level: L3
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Pourquoi ce module mérite ton temps : DDD et contrats

<!-- AF-DIAGRAM:ddd -->

```text
┌────────────────────┐     ┌────────────────────┐
│ Context A           │     │ Context B          │
│ Order / Customer    │◄───►│ Billing / Payment  │
└────────────────────┘     └────────────────────┘
          ▲                          ▲
          └──── contrats explicites ─┘
```

Les bounded contexts isolent des modèles locaux et relient les domaines par des contrats explicites.

Temps de lecture ~8 min

T'as déjà vu deux équipes utiliser le mot « commande » pour deux choses différentes ?
T'as déjà cassé un client en renommant un champ « parce que c'était plus propre » ?
T'as déjà lu une base de données où le mot « utilisateur » désignait trois populations ?

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Un système meurt rarement d'un mauvais algorithme. Il meurt d'un vocabulaire flou.
Quand « client » veut dire _prospect_ au marketing, _payeur_ à la facturation et _ligne en base_ pour
toi, chaque réunion produit un malentendu, et chaque malentendu produit un `if`.

```js
// Ce que devient un mot flou après dix-huit mois :
function getClient(
  id,
  { includeProspects = false, billingOnly = false, legacyShape = true } = {},
) {
  // 4 booléens = 16 comportements = 16 façons de se tromper
}
```

Le découpage en **contextes bornés** ne range pas des dossiers : il déclare qu'à l'intérieur d'une
frontière, un mot a **une** définition, et qu'au passage de la frontière il y a une **traduction
explicite**. C'est tout le sujet.

## 2) LE CONTRAT, C'EST LA PARTIE QUE TU N'AS PAS LE DROIT DE CASSER

À l'intérieur d'un contexte, tu refactores librement. À la frontière, tu as des clients que tu ne
contrôles pas. Un Staff se reconnaît là : il sait dire « oui, mais en v2, et la v1 s'éteint le 30 juin ».

## 3) CE QUE ÇA CHANGE POUR TOI EN ENTRETIEN

La question posée est toujours la même : « comment tu aurais découpé ce système ? ».
Une réponse par technologie (« microservices ») vaut zéro. Une réponse par langage métier, frontières
et contrats, avec le coût de chaque frontière, vaut le niveau visé.

## 4) CE QUE CE MODULE NE FAIT PAS

Il ne te vend pas le DDD complet, ni les patterns tactiques (agrégats, événements de domaine) comme un
dogme. Il garde ce qui survit à tous les langages : le vocabulaire, les frontières, les contrats.

> **Durée de vie : intemporel.** Les frameworks changent, l'ambiguïté d'un mot ne change jamais.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: contract -->

## Repères de décision

- **Pourquoi :** Les tests de contrat vérifient que deux composants indépendants restent compatibles sur leurs échanges, sans devoir lancer tout le système à chaque changement.
- **Quand l’utiliser / quand l’éviter :** Utilise-les quand un client et un fournisseur évoluent séparément ou sont déployés à des rythmes différents. Ne les confonds pas avec des tests unitaires ni avec une preuve complète d'intégration.
- **Limites :** Un contrat ne prouve que les interactions décrites. Il ne prouve pas les performances, la sécurité globale, la sémantique métier non modélisée ni la compatibilité de toutes les versions possibles.

## Mécanisme : la version sans magie

Le consommateur décrit les interactions attendues ; le fournisseur vérifie qu'il les satisfait ; le contrat versionné est exécuté dans le pipeline des deux côtés.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : DDD et contrats** se rattache à ce cas concret : Le client mobile Kintana peut rester plusieurs versions derrière l'API. Un changement de champ ou d'erreur doit être détecté avant déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Compatibilité API entre client et fournisseur

> **Arc One Piece / Grand Line :** un contrat d'API est une promesse entre équipages. Si le fournisseur change sa réponse sans prévenir, le client échoue en mer.

**Mission liée à « Pourquoi ce module mérite ton temps : DDD et contrats » :** Définis un contrat pour une opération Kintana consommée par le client web/mobile. Ajoute les réponses nominales, erreurs stables, champs obligatoires/optionnels et une version de contrat. Fais vérifier le contrat par le fournisseur et simule un client ancien.

**Livrable :** contrat OpenAPI ou pacte consommateur-fournisseur, fixtures, vérification côté fournisseur et test de compatibilité d'une ancienne version.

**Critères d’acceptation :** la rupture intentionnelle échoue dans le test ; les erreurs et champs sont documentés ; le contrat reflète le comportement réellement implémenté ; les limites non couvertes sont nommées.

**Transfert obligatoire :** Le fournisseur ajoute un champ ou change un code d'erreur. Décide si l'évolution est compatible et teste le déploiement dans l'ordre inverse.
