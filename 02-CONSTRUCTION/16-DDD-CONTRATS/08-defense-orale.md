---
stability: intemporel
acte: construction
noyau: oui
type: defense
cognitive_level: L3
perturbation_modes: [preuve_partielle, regression]
anti_recipe_key: preuve_partielle+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Défense orale : module 16

Temps de lecture ~2 min

12 minutes, enregistrées. Seul devant la caméra, ou face à un contradicteur.

## Plan imposé

| Minute | Contenu                                                                                    |
| ------ | ------------------------------------------------------------------------------------------ |
| 0-2    | Le domaine en une phrase, et les trois mots ambigus trouvés.                               |
| 2-5    | La carte de contextes, et le coût de chaque frontière.                                     |
| 5-8    | La rupture de contrat : ce qui cassait, la stratégie, la date.                             |
| 8-10   | Le refus chiffré : ce que tu n'as pas construit, et à quelle condition tu le construirais. |
| 10-12  | Trois questions hostiles, répondues.                                                       |

## Les trois questions hostiles obligatoires

1. « Pourquoi pas un seul contexte ? Tu inventes de la complexité. »
2. « Ta date d'extinction est arbitraire. Prouve-la. »
3. « Un enum en sortie, c'est déjà un couplage. Qu'est-ce que tu fais à la sixième valeur ? »

## Grille

- Aucune réponse par nom de technologie (éliminatoire).
- Un chiffre au minimum par réponse.
- Une phrase d'aveu d'ignorance au moins, si elle est vraie
  (voir `../../03-PILOTAGE/11-LEADERSHIP-MENTORAT/04-aveu_ignorance.md`).

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** À la question « Pourquoi versionner le contrat ? », la réponse défendable est : « Deux consommateurs lisent aujourd'hui `stationId`, `measuredAt` et `value`. Nous ajoutons `qualityFlag` comme champ facultatif pour ne pas casser l'ancien consommateur. Nous suivrons les versions réellement utilisées avant de fixer l'extinction de v1. Je ne sais pas encore si tous les clients se mettront à jour dans le délai prévu ; la métrique de consommation et une date de revue permettront de le vérifier. » La réponse donne un mécanisme, un risque, une preuve à collecter et une incertitude honnête ; elle ne se contente pas de citer une technologie.

**À toi :** Les équipes collecte, qualité de l’eau et maintenance ont des règles et des rythmes différents, mais échangent des événements contractuels. Construis un cas minimal qui illustre « Défense orale : module 16 » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Défense orale : module 16** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission Kintana : défendre une décision sous objection

Prépare une soutenance de 12 minutes sur une décision réelle de ton cas Kintana. Le contradicteur doit contester au moins trois points différents : la frontière métier, le coût de la solution et le risque lié au contrat externe. Réponds d'abord sans changer la décision, puis identifie l'observation qui te ferait réellement la réviser.

**Livrable :** plan chronométré, journal objections/réponses, décision finale datée et liste des incertitudes restantes. Un enregistrement est utile mais une simulation écrite structurée est acceptable si aucun interlocuteur n'est disponible.

**Acceptation :** les objections sont traitées sans caricature ; les réponses citent des faits ou des hypothèses étiquetées ; la décision et son seuil de révision sont compréhensibles par un tiers.

**Transfert :** une objection techniquement valide invalide une hypothèse centrale. Montre comment tu corriges publiquement ton arbitrage.
