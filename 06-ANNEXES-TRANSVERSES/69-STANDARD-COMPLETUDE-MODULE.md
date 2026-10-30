---
stability: stable
acte: gouverner
---

# Standard de complétude d'un module AF

Un module ne peut être marqué `route: complete` ou `noyau: oui` que si les exigences ci-dessous sont démontrées par des fichiers accessibles et des vérifications exécutables ou explicitement évaluables. La présence d'un README, challenge et grimoire ne suffit pas.

## Gate pédagogique par concept majeur

1. Définition simple et exacte.
2. Problème résolu et raisons d'existence.
3. Mécanisme interne, étapes et invariants.
4. Exemple concret complet dans un fil conducteur.
5. Diagramme quand le flux, la distribution ou les états le justifient.
6. Erreurs, anti-patterns, limites et conséquences.
7. Exercice progressif à consigne non ambiguë.
8. Vérification : test, corrigé différé, grille ou critères observables.
9. Liaison avec les prérequis et modules suivants.
10. Preuve de maîtrise : résultat et transfert attendus.

## Gate module

- Tous les concepts noyaux ont une leçon approfondie, pas seulement une liste.
- Le challenge vérifie l'application intégrée ; le boss fight ajoute ambiguïté, incident ou arbitrage.
- Les tests démarrent dans un état documenté : verts de référence, rouges TDD attendus, ou absents à créer.
- Les chemins, liens, ancres, métadonnées et commandes sont vérifiés.
- Les limites de version/fraîcheur et les sources sont datées.
- La charge de travail et les prérequis sont réalistes pour le public annoncé.
- Une personne autre que l'auteur peut suivre le parcours et évaluer la preuve sans deviner les critères.

## Signification des métadonnées

- `route: complete` signifie que tous les gates pédagogiques et de navigation du module sont remplis et contrôlés.
- `noyau: oui` signifie que le module porte un concept structurel nécessaire au parcours ; ce statut exige une profondeur complète et des preuves d'appropriation.
- `review_status: a_verifier` interdit de présenter une ressource périssable comme fraîchement validée.
- `noyau: en_validation` signifie que le module reste prévu comme noyau, mais que les preuves pédagogiques ne suffisent pas encore à le certifier.
- `route: review-required` interdit de présenter la progression comme entièrement complétée jusqu’à la nouvelle revue.
- `paper_audit_status: STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING` signifie que les marqueurs de complétude et les preuves pédagogiques ont été ajoutés et contrôlés, mais qu'une relecture technique indépendante reste attendue.
- `paper_audit_status: CERTIFIÉ_SUR_PAPIER` est une ancienne valeur à ne plus utiliser dans les nouvelles éditions : elle peut être interprétée comme une certification. Préférer `STRUCTURE_COMPLETE_EXPERT_REVIEW_PENDING` avec `expert_review: pending`, et enregistrer séparément les limites terrain dans `terrain_validation`.
- `expert_review: pending` interdit de prétendre qu'un spécialiste indépendant a validé la justesse technique de toutes les leçons.
- `terrain_validation: NON_CERTIFIEE_DANS_CET_ENVIRONNEMENT` signifie que l'exécution réelle sur la plateforme ou le fournisseur concerné reste à réaliser.

En cas d'écart, corriger le contenu ou retirer honnêtement la déclaration de complétude. Ne jamais réduire le standard pour conserver un badge ou un statut.
