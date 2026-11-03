---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L3
perturbation_modes: [regression, defaut_cache]
anti_recipe_key: regression+defaut_cache
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Contrats : versionner, déprécier, éteindre

Temps de lecture ~9 min

## 1) UN CONTRAT, C'EST QUOI

Le triplet : **forme** (schéma d'entrée/sortie), **sémantique** (ce que les champs veulent dire),
**garanties** (codes d'erreur, idempotence, ordre, délai). La forme seule ne suffit jamais.

## 2) CE QUI CASSE ET CE QUI NE CASSE PAS

| Changement                                      | Casse ?                                            |
| ----------------------------------------------- | -------------------------------------------------- |
| ajouter un champ optionnel en sortie            | non, si les clients ignorent l'inconnu             |
| rendre un champ optionnel obligatoire en entrée | oui                                                |
| resserrer un format (`string` → `enum`)         | oui                                                |
| élargir un enum en sortie                       | oui, en pratique (les `switch` exhaustifs cassent) |
| renommer un champ                               | oui, toujours                                      |

Règle : **on ajoute, on ne retire pas, on n'attribue jamais un nouveau sens à un ancien nom.**

## 3) LA MIGRATION EN QUATRE TEMPS, DATÉE

1. **Annonce** : v2 publiée, v1 marquée dépréciée, date d'extinction écrite dans la doc et dans
   l'en-tête `Deprecation` / `Sunset` de la réponse.
2. **Double service** : les deux versions vivent. Tu mesures le trafic v1 par client.
3. **Rappel** : à trafic v1 résiduel, tu contactes les clients restants, chiffres en main.
4. **Extinction** : date tenue. Une extinction non datée n'arrive jamais.

## 4) LE TEST DE CONTRAT EST LA SEULE PREUVE

Un jeu de cas exécutable, versionné à côté du contrat, rejoué en CI des deux côtés.
Le contrat qui n'est pas exécutable est une intention.

## Exercice (25 min)

Sur ton fil rouge : publie `contrats/v1.md` et `contrats/v2.md`, ajoute l'en-tête `Sunset`, écris
`ADR/0xx-rupture-contrat.md` avec la date d'extinction et le nom du client le plus exposé.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Le contrat v1 publie `{stationId, measuredAt, value}`. La v2 ajoute `qualityFlag`, facultatif, sans renommer ni retirer les trois champs existants. Pendant la transition, le producteur émet les deux formes et les deux consommateurs sont observés : l'ancien ignore le champ facultatif ; le nouveau le lit lorsqu'il est présent. L'équipe annonce une date de fin de v1 seulement après avoir constaté que les clients actifs utilisent v2. **Décision :** ajout compatible d'abord, migration observée ensuite, extinction datée en dernier. Un changement qui rend `qualityFlag` obligatoire ne serait pas compatible et demanderait une version/transition distincte.

**À toi :** Les équipes collecte, qualité de l’eau et maintenance ont des règles et des rythmes différents, mais échangent des événements contractuels. Construis un cas minimal qui illustre « Contrats : versionner, déprécier, éteindre » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:contract -->

## Repère visuel utile : Compatibilité API entre client et fournisseur

```text
client version N -> contrat publié <- API version N
        |                         |
        v                         v
 test consommateur       vérification fournisseur
        |                         |
        +-----------+-------------+
                    v
             pipeline compatible
                    |
           +--------+--------+
           v                 v
         PASS              BREAK
```

<!-- AF-LESSON-PROFILE: contract -->

## Repères de décision

- **Pourquoi :** Les tests de contrat vérifient que deux composants indépendants restent compatibles sur leurs échanges, sans devoir lancer tout le système à chaque changement.
- **Quand l’utiliser / quand l’éviter :** Utilise-les quand un client et un fournisseur évoluent séparément ou sont déployés à des rythmes différents. Ne les confonds pas avec des tests unitaires ni avec une preuve complète d'intégration.
- **Limites :** Un contrat ne prouve que les interactions décrites. Il ne prouve pas les performances, la sécurité globale, la sémantique métier non modélisée ni la compatibilité de toutes les versions possibles.

## Mécanisme : la version sans magie

Le consommateur décrit les interactions attendues ; le fournisseur vérifie qu'il les satisfait ; le contrat versionné est exécuté dans le pipeline des deux côtés.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Contrats : versionner, déprécier, éteindre** se rattache à ce cas concret : Le client mobile Kintana peut rester plusieurs versions derrière l'API. Un changement de champ ou d'erreur doit être détecté avant déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Compatibilité API entre client et fournisseur

> **Arc One Piece / Grand Line :** un contrat d'API est une promesse entre équipages. Si le fournisseur change sa réponse sans prévenir, le client échoue en mer.

**Mission liée à « Contrats : versionner, déprécier, éteindre » :** Définis un contrat pour une opération Kintana consommée par le client web/mobile. Ajoute les réponses nominales, erreurs stables, champs obligatoires/optionnels et une version de contrat. Fais vérifier le contrat par le fournisseur et simule un client ancien.

**Livrable :** contrat OpenAPI ou pacte consommateur-fournisseur, fixtures, vérification côté fournisseur et test de compatibilité d'une ancienne version.

**Critères d’acceptation :** la rupture intentionnelle échoue dans le test ; les erreurs et champs sont documentés ; le contrat reflète le comportement réellement implémenté ; les limites non couvertes sont nommées.

**Transfert obligatoire :** Le fournisseur ajoute un champ ou change un code d'erreur. Décide si l'évolution est compatible et teste le déploiement dans l'ordre inverse.
