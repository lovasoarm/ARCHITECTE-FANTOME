---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 01 : La méthode Polya (avant de toucher au clavier)

Temps de lecture ~5 min

> **Principe universel** : résoudre un problème, ce n'est **pas** commencer à taper. C'est une routine en 4 étapes qui existe depuis 1945 et n'a jamais vieilli.

## Les 4 étapes

### 1. Comprendre le problème

- Quelles sont les **entrées** ? Types, plages, cas dégénérés (vide, null, énorme) ?
- Quelle est la **sortie attendue** ? Format, contraintes ?
- Reformule le problème **avec tes mots**, à voix haute.

### 2. Élaborer un plan

- As-tu déjà vu un problème **similaire** ?
- Peux-tu résoudre un cas plus **simple** d'abord (n=1, n=2) ?
- Découpe en sous-problèmes. Chaque sous-problème doit tenir en une phrase.

### 3. Exécuter le plan

- Traduis chaque sous-problème en fonction.
- Une fonction, un rôle. Nom explicite.

### 4. Regarder en arrière

- Le résultat est-il correct sur les cas limites ?
- Peux-tu réutiliser la méthode ailleurs ?
- Peux-tu **simplifier** le code que tu viens d'écrire ?

## Exercice : découpe avant de coder

Problème : "Étant donné une liste de virements bancaires (from, to, amount), calcule le solde final de chaque compte et détecte les cycles suspects."

Livrable **avant** toute ligne de code :

- Types d'entrée / sortie (schema).
- Cas limites (5 minimum).
- Plan en 4 étapes maximum.
- Sur papier ou dans un `.md`. **Aucun `.js` autorisé** à ce stade.

## (attention) Ce que la précipitation cache

Coder tout de suite = tu résous **le problème que tu as compris**, pas le vrai. La différence tue en prod.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-DIAGRAM:accessibility -->

## Repère visuel utile : Parcours de demande accessible

```text
action utilisateur
       |
       v
structure sémantique + nom
       |
  +----+-----+
  v          v
clavier   lecteur d'écran
  |          |
  +----+-----+
       v
état / erreur annoncé
       |
       v
parcours utilisable
```

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **01 : La méthode Polya (avant de toucher au clavier)** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Statut Kintana : prolongement accessibilité différé, facultatif et sans gate supplémentaire.** Pour la première passe, fais l'exercice de raisonnement de cette leçon sur le cas fictif de Noa. L'audit d'un parcours web avec focus, annonces, zoom et lecteur d'écran se reprend après Web Basics, les formulaires/accessibility concernés et le module Testing. Aucun composant, audit automatisé ou lecteur d'écran n'est requis pour terminer cette leçon de Problem Solving.

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « 01 : La méthode Polya (avant de toucher au clavier) » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

## Transfert facultatif : après les prérequis indiqués ci-dessus

Lorsque tu reprendras cette mission d’accessibilité, teste le même parcours à 200 % de zoom et avec un lecteur d’écran. Identifie les défauts que l’audit automatique ne détecte pas. Ce transfert ne conditionne pas la validation de Problem Solving.
