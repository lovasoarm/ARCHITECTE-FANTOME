---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L4
perturbation_modes: [regression, preuve_partielle]
anti_recipe_key: regression+preuve_partielle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Expliquer CQRS à trois publics

<!-- AF-DIAGRAM:cqrs -->

```text
                 ┌────────────┐
Command ────────►│ Write side │────► state
                 └────────────┘

Query ──────────►┌────────────┐
                 │ Read side  │────► view
                 └────────────┘
```

CQRS sépare le chemin des mutations du chemin des lectures afin de leur permettre des modèles et contraintes différents.

Temps de lecture ~2 min

Durée : 45 min. Rendu : trois textes, dans le même fichier.

Même contenu, trois auditoires. Le niveau Staff se mesure ici : la même idée, sans mensonge, à trois
altitudes.

## 1) À un junior (150 mots max, un exemple de code)

Objectif : qu'il sache **quand** l'utiliser, pas seulement ce que c'est. Analogie autorisée : le
comptoir de commande et la vitrine d'un restaurant : on ne fait pas la queue au même endroit pour
commander et pour regarder le menu.

## 2) À un pair (200 mots, un schéma, un compromis explicite)

Objectif : qu'il puisse te contredire. Donne le seuil de trafic, le délai de cohérence retenu, le cas
« relire son propre écrit », et ce que tu abandonnes en simplicité.

## 3) À une direction non technique (120 mots, aucun terme technique non défini, un chiffre)

Objectif : une décision. Formule attendue : « aujourd'hui les pages de consultation ralentissent quand
beaucoup de gens enregistrent. On sépare les deux chemins. Coût : X jours et Y €/mois. Effet : la page
passe de 2,4 s à 0,4 s. Contrepartie : une modification peut mettre jusqu'à 30 secondes à apparaître. »

## Auto-contrôle

- [ ] Aucun des trois textes ne contient une phrase copiée d'un autre.
- [ ] Le texte direction contient un chiffre et une contrepartie assumée.
- [ ] Le texte junior contient un contre-exemple (« ne fais pas ça quand… »).

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Expliquer CQRS à trois publics » à un autre bounded context et un consommateur externe. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: ddd -->

## Repères de décision

- **Pourquoi :** Le langage partagé et les frontières de contexte réduisent les malentendus entre métier, API, données et équipes.
- **Quand l’utiliser / quand l’éviter :** Utilise DDD quand les règles et termes métier sont complexes ou varient selon les acteurs. Ne crée pas de contextes bornés pour chaque table ou écran.
- **Limites :** Les frontières de domaine évoluent avec la compréhension du métier. Un vocabulaire documenté sans validation par les utilisateurs peut simplement formaliser une mauvaise hypothèse.

## Mécanisme : la version sans magie

Identifie les acteurs, commandes, événements, invariants et modèles ; sépare les contextes lorsque les termes ou règles changent réellement.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Expliquer CQRS à trois publics** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat métier et langage commun Kintana

> **Arc Naruto / Konoha :** le mot « mission » ne veut pas dire la même chose pour le demandeur, l'agent et l'administrateur. Le vocabulaire doit coller au métier qui l'utilise.

**Mission liée à « Expliquer CQRS à trois publics » :** Anime une mini revue de domaine sur la création et l'affectation d'une demande. Construis un glossaire validé, un event storming simple, les invariants et les contextes candidats ; teste une ambiguïté avec une évolution.

**Livrable :** glossaire métier, diagramme commandes/événements, frontières proposées et ADR qui explique pourquoi une frontière existe ou non.

**Critères d’acceptation :** chaque terme a un sens et un propriétaire ; les règles sont testables ; les contextes ne sont pas découpés par table ; les désaccords sont conservés comme questions ouvertes.

**Transfert obligatoire :** Une nouvelle organisation utilise le mot « agent » pour deux rôles différents. Montre comment ton modèle absorbe ou refuse cette ambiguïté.
