---
stability: intemporel
acte: construction
noyau: oui
cognitive_level: L3
perturbation_modes: [temps_limite, changement_contexte]
anti_recipe_key: temps_limite+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Langage ubiquitaire et contextes bornés

Temps de lecture ~9 min

## 1) LE LANGAGE UBIQUITAIRE

Règle : **un mot du code = un mot que le métier prononce**. Pas de traduction mentale.
Si le métier dit « dossier », ta classe ne s'appelle pas `UserRecord`.

Méthode en trois passes, applicable seul :

1. Relis dix messages réels (tickets, mails, specs). Surligne chaque nom commun métier.
2. Pour chaque nom, écris une définition d'une ligne. Les mots dont tu écris deux définitions sont des
   **frontières déguisées**.
3. Renomme dans le code, en un commit par mot, jamais deux mots dans le même commit.

## 2) LE CONTEXTE BORNÉ

Un contexte borné est le territoire à l'intérieur duquel une définition tient.
« Commande » côté vente = une intention d'achat. « Commande » côté logistique = un colis à préparer.
Deux définitions, donc deux contextes, donc une traduction au passage.

```txt
[Vente]  Commande{lignes, montant, client}
            |  traduction explicite (anti-corruption)
            v
[Logistique] Ordre{colis, poids, adresse}
```

La couche de traduction n'est pas de la plomberie : c'est le seul endroit où le malentendu est visible.

## 3) LA CARTE DE CONTEXTES

Trois relations suffisent pour 95 % des cas :

- **Client / fournisseur** : l'aval demande, l'amont s'engage sur un contrat.
- **Conforme** : l'aval subit le modèle de l'amont (souvent un SaaS externe).
- **Anti-corruption** : l'aval traduit pour se protéger du modèle de l'amont.

## 4) LE COÛT D'UNE FRONTIÈRE

Chaque frontière coûte : une traduction, une latence, un mode de panne, un déploiement coordonné.
Écris ce coût. Une frontière que tu ne sais pas justifier par un mot ambigu ou une équipe distincte
est une frontière à supprimer.

## Exercice (25 min)

Sur ton fil rouge : liste 12 noms métier, écris leur définition, identifie les deux mots qui en ont
deux. Dessine la carte de contextes en ASCII. Rends `ADR/0xx-contextes-bornes.md`.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.

### Transfert : changer de contexte

Applique le mécanisme de « Langage ubiquitaire et contextes bornés » à un autre bounded context et un consommateur externe. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Langage ubiquitaire et contextes bornés** se rattache à ce cas concret : Dans Kintana, « attribuée » peut signifier différent selon demandeur, agent et superviseur. La règle doit être claire dans chaque contexte.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat métier et langage commun Kintana

> **Arc Naruto / Konoha :** le mot « mission » ne veut pas dire la même chose pour le demandeur, l'agent et l'administrateur. Le vocabulaire doit coller au métier qui l'utilise.

**Mission liée à « Langage ubiquitaire et contextes bornés » :** Anime une mini revue de domaine sur la création et l'affectation d'une demande. Construis un glossaire validé, un event storming simple, les invariants et les contextes candidats ; teste une ambiguïté avec une évolution.

**Livrable :** glossaire métier, diagramme commandes/événements, frontières proposées et ADR qui explique pourquoi une frontière existe ou non.

**Critères d’acceptation :** chaque terme a un sens et un propriétaire ; les règles sont testables ; les contextes ne sont pas découpés par table ; les désaccords sont conservés comme questions ouvertes.

**Transfert obligatoire :** Une nouvelle organisation utilise le mot « agent » pour deux rôles différents. Montre comment ton modèle absorbe ou refuse cette ambiguïté.
