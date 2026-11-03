---
stability: intemporel
acte: construction
noyau: renfort
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Critères de passage : module 16

Temps de lecture ~2 min

Chaque ligne se coche avec un chemin de fichier de **ton** dépôt en face. Sans chemin, non coché.

| #   | Critère                                                     | Preuve attendue                                         |
| --- | ----------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Carte de contextes justifiée par le langage                 | `ADR/contextes-bornes.md`                               |
| 2   | Chaque frontière a un coût écrit                            | même fichier, section coût                              |
| 3   | Contrat v2 publié, changements classés                      | `contrats/v2.md`                                        |
| 4   | Double service effectif                                     | logs des deux versions le même jour                     |
| 5   | Jeu de cas exécutable ≥ 8 cas dont 3 erreurs                | `contrats/cas/` + sortie CI                             |
| 6   | Extinction datée et annoncée                                | en-tête `Sunset` + message d'annonce                    |
| 7   | Refus chiffré avec seuil déclencheur                        | `ADR/refus-architecture.md`                             |
| 8   | Gate sécurité passé (diff de schéma, pas de fuite de champ) | diff joint au boss fight                                |
| 9   | Explication à trois publics rendue                          | fichier du module `01-CADRAGE/04-ERROR-HANDLING` rempli |
| 10  | Défense orale enregistrée                                   | lien ou fichier local daté                              |

Passage : 9 critères sur 10, dont obligatoirement 3, 4, 6 et 8.

## Exemple travaillé : cas métier

**Exemple résolu (fictif).** Le dossier affiche 9 critères cochés sur 10, mais le critère 8 (absence de fuite de champ à la frontière de sécurité) est obligatoire et reste non vérifié. Le résultat est donc **NON PASS**, même si le score brut atteint 90 %. Après ajout d'un test négatif qui prouve que le champ interne n'est pas exposé, le critère 8 peut être marqué PASS si la trace est conservée. **Règle :** le seuil numérique ne compense jamais l'échec d'un critère non compensatoire.

**À toi :** Les équipes collecte, qualité de l’eau et maintenance ont des règles et des rythmes différents, mais échangent des événements contractuels. Construis un cas minimal qui illustre « Critères de passage : module 16 » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:ddd -->

## Repère visuel utile : Contrat métier et langage commun Kintana

```text
acteur -> commande -> invariant
                    |
                    v
                événement
                    |
          +---------+---------+
          v                   v
     contexte A           contexte B
   sens / modèle A       sens / modèle B
          |                   |
          +---- contrat ------+
```

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Critères de passage : module 16** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat métier et langage commun Kintana

> **Arc Naruto / Konoha :** le mot « mission » ne veut pas dire la même chose pour le demandeur, l'agent et l'administrateur. Le vocabulaire doit coller au métier qui l'utilise.

**Mission liée à « Critères de passage : module 16 » :** Anime une mini revue de domaine sur la création et l'affectation d'une demande. Construis un glossaire validé, un event storming simple, les invariants et les contextes candidats ; teste une ambiguïté avec une évolution.

**Livrable :** glossaire métier, diagramme commandes/événements, frontières proposées et ADR qui explique pourquoi une frontière existe ou non.

**Critères d’acceptation :** chaque terme a un sens et un propriétaire ; les règles sont testables ; les contextes ne sont pas découpés par table ; les désaccords sont conservés comme questions ouvertes.

**Transfert obligatoire :** Une nouvelle organisation utilise le mot « agent » pour deux rôles différents. Montre comment ton modèle absorbe ou refuse cette ambiguïté.
