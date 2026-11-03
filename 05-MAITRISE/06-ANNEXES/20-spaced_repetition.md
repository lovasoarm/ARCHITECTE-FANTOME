---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, changement_echelle]
anti_recipe_key: constraints_injectees+changement_echelle
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Répétition espacée : le planning qui grave

Temps de lecture ~5 min

Un concept vu une fois s'oublie en 3 jours. Vu 3 fois à intervalles croissants, il reste 6 mois.

## LE PROTOCOLE

Pour chaque nouveau concept clé :

| Quand | Quoi                                                                                              |
| ----- | ------------------------------------------------------------------------------------------------- |
| J+0   | Tu apprends, tu codes l'exercice.                                                                 |
| J+1   | Tu ouvres le `_recall_XX.md` du module, tu réponds aux questions SANS regarder.                   |
| J+7   | Tu réexpliques le concept à voix haute, en 60 secondes, sans notes.                               |
| J+30  | Tu résous une variante de l'exercice initial dans un langage différent (voir `transferability/`). |

## QUESTIONS DE RAPPEL : MODÈLES TYPES

<!-- AF-DIAGRAM:recall -->

```text
J+1 ──► J+3 ──► J+7 ──► J+14 ──► J+28
 │        │        │         │         │
free    explain  diagnose   transfer  defend inverse
```

Le rappel distribué réactive la compétence sous des formes différentes au fil du temps.

- "Que fait exactement `X` sous le capot ?"
- "Quel bug spécifique évite `Y` ?"
- "Donne un cas où `Z` est le mauvais choix."
- "Explique `X` à un dev qui ne connaît que Python."

## AUTO-DIAGNOSTIC

Si à J+7 tu bloques > 30 secondes sur une question, retour à la leçon. Pas de honte. C'est le signal que le concept n'est pas encore ancré.

Lié depuis chaque `_recall_XX.md`.

<!-- AF-DIAGRAM:default -->

## Repère visuel utile : Incrément vérifiable du produit Kintana

```text
acteur / besoin
      |
      v
notion de la leçon
      |
      v
comportement Kintana
      |
  +---+---+
  v       v
test     cas limite
  |       |
  +---+---+
      v
preuve + limite
```

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Répétition espacée : le planning qui grave** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « Répétition espacée : le planning qui grave » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
