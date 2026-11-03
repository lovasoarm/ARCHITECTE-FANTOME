---
stability: evolutif
acte: pilotage
noyau: renfort
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/07-CLOUD-FOUNDATIONS/97-CHECKPOINT-PACK/02-drill_2.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/07-CLOUD-FOUNDATIONS/97-CHECKPOINT-PACK/02-drill_2.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : QG de Konoha :** six équipes, trois régions, une mission critique. Si tu ne sais pas relier signal, seuil, coût et action, ton tableau de bord ressemble à une tour de contrôle qui clignote sans dire quel avion tombe.

# CRITÈRES DE PASSAGE : MODULE 07

| #   | Critère                                                 | Preuve attendue                 |
| --- | ------------------------------------------------------- | ------------------------------- |
| 1   | Action représentative définie et consommation détaillée | `06A-BUDGET-CLOUD.md` §1        |
| 2   | Trois paliers chiffrés, egress inclus                   | §2                              |
| 3   | Hypothèses écrites                                      | §3                              |
| 4   | Relevé personnel daté < 30 jours                        | §4 + captures                   |
| 5   | Trois leviers chiffrés                                  | §5                              |
| 6   | Coût de sortie calculé                                  | §6                              |
| 7   | Plafond mensuel + alerte 80 %                           | configuration + capture         |
| 8   | Levier appliqué et mesuré                               | avant/après 24 h                |
| 9   | Cohérence avec `SLO.md` (le SLO est finançable)         | tension écrite si contradiction |
| 10  | Aucun chiffre repris du relevé de référence             | contrôle de diff                |

Passage : 8 sur 10, dont obligatoirement 2, 4 et 10.

<!-- JALON-TECH-ILA:debut -->

## Jalon TECH-ILA

Ce module porte un jalon du référentiel TECH-ILA. Le critère est **binaire** : il est
validé, ou il est **non valide**. Il n'y a pas de validation partielle, et une lecture ne
vaut pas validation.

- [ ] L'artefact demandé par ce module existe, il est daté, il tourne.
- [ ] Tu sais le défendre à l'oral en trois minutes, sans relire tes notes.

Tant qu'une case reste vide, le jalon est **non valide** : le module suivant peut s'ouvrir,
le jalon reste dû. Référentiel : [03-TECH-ILA](../../../06-ANNEXES-TRANSVERSES/04-TECH-ILA/README.md).

<!-- JALON-TECH-ILA:fin -->

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une estimation indique un total mensuel, mais omet le trafic sortant et ne précise ni région ni date des tarifs. Elle échoue au critère de reproductibilité : un autre ingénieur ne peut pas recalculer le même montant. Après ajout de ces trois champs et des unités, le calcul devient auditable. **PASS** exige les unités, le périmètre, la source datée et les hypothèses ; un total isolé ne suffit pas.

**À toi :** Des stations distantes envoient des mesures avec réseau intermittent ; le système doit absorber les reprises sans doubler les écritures. Compare une journée normale et un pic dix fois supérieur. Pour « CRITÈRES DE PASSAGE : MODULE 07 », note le composant, le coût ou le risque qui varie, et le signal observable qui révèle la limite.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.
