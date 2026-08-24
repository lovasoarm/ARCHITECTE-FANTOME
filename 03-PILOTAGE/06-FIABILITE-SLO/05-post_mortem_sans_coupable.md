---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L4
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: medium
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : finale au stade :** 99,9 % de disponibilité sur un slide ne sauve personne à 03:17 quand le service hurle. La vraie compétence commence quand il faut transformer la métrique en décision.

# Post-mortem sans coupable

Temps de lecture ~7 min

La culture sans blâme et la conduite d'incident sont traitées en
[03-QUALITY-SHIELD/05](../03-QUALITY-SHIELD/05-incidents-and-postmortem.md). Ce fichier
n'applique le gabarit qu'au cas d'un budget d'erreur brûlé.

## 2) LE GABARIT (une page, jamais plus)

1. **Impact** : combien d'utilisateurs, combien de temps, combien de budget d'erreur consommé.
2. **Chronologie** : heures précises : début réel, détection, première action, rétablissement.
3. **Ce qui a bien marché** : obligatoire, deux lignes minimum.
4. **Facteurs contributifs** : au pluriel, toujours. Une cause unique est une enquête arrêtée trop tôt.
5. **Actions** : chacune avec un responsable, une date, et un critère de vérification.
6. **Ce qu'on ne fera pas** : et pourquoi.

## 3) LES TROIS DÉLAIS QUI COMPTENT

Détection, diagnostic, réparation. La plupart des équipes travaillent la réparation alors que leur
temps est mangé par la détection. Mesure les trois avant de décider quoi améliorer.

## 4) LA RÈGLE DES ACTIONS

Maximum cinq actions, dont au moins une réduit la **détection**. Une action sans date est une opinion.

## Exercice (20 min)

Reprends la dernière panne réelle de ton fil rouge (même minuscule). Écris le post-mortem au gabarit.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.
