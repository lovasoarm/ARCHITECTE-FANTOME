---
stability: intemporel
acte: pratiquer
cognitive_level: L4
perturbation_modes: [decision_inversee, constraints_injectees]
anti_recipe_key: decision_inversee+constraints_injectees
transfer_distance: low
assessment_role: diagnostic_mastery
---

# Mise en pratique : Auditer une page : les outils et la méthode

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

## TYPE

Mini-projet

## Niveau

[OK] Avancé

## CONTEXTE

Un audit transforme des impressions en liste d'actions chiffrées, et se rejoue à chaque évolution du site.

## OBJECTIF

Ton score d'accessibilité est mesuré et amélioré.

## APPLICATION

- Lance un audit automatisé (Lighthouse ou axe) sur l'accueil et sur une fiche projet.
- Parcours ensuite la page uniquement au clavier : une IA ne détecte pas tout.
- Vérifie une lecture logique avec un lecteur d'écran si tu en as un à disposition.
- Classe les problèmes trouvés : bloquant / important / amélioration.
- Classe les résultats en trois catégories : à corriger, faux positif, hors scope.
- Corrige tout ce qui est classé « à corriger » et relance l'audit.

## Critère de réussite

- [ ] Lance un audit automatisé (Lighthouse ou axe) sur l'accueil et sur une fiche projet.
- [ ] Parcours ensuite la page uniquement au clavier.
- [ ] Je peux expliquer le résultat obtenu sans relire le cours.

## Vérification

Quel problème l'outil a-t-il manqué que ta navigation clavier avait révélé ?

## Preuve à conserver

Après l'expérience, conserve :

- le résultat observé ;
- l'explication ;
- la règle générale que tu en tires ;
- une limite ou une exception connue.

## Ce que tu viens de démontrer

Dans ce scénario, tu as vérifié que : ton score d'accessibilité est mesuré et amélioré.

Tu peux annoncer un chiffre vérifiable sur ton portfolio. Commit le rapport dans `docs/`.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

## Livraison produit : Kintana : conduire un audit d'accessibilité reproductible

> **Fil rouge :** Kintana conserve le même parcours de demande. Cette mission assemble les vérifications pertinentes et produit un état des lieux borné ; un score automatisé n'est ni une preuve exhaustive ni une certification de conformité.

Le micro-exercice reste la mise en jambe. La livraison évaluée améliore le même produit [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), sans exiger une refonte complète.

**Mission liée à « Auditer une page : les outils et la méthode » :** définis le périmètre de l'audit (au minimum l'accueil du service et le parcours formulaire jusqu'à la confirmation), puis exécute un audit automatisé avec Lighthouse ou axe. Complète-le par une navigation clavier et un contrôle lecteur d'écran. Classe les constats, corrige les défauts avérés dans ce périmètre et relance exactement les mêmes contrôles.

**Livrable :** rapport daté contenant les URL/états inspectés, versions d'outils et environnement, rapport avant/après, registre des constats (`bloquant / important / amélioration`), statut (`à corriger / corrigé / faux positif / hors scope`), justification, preuve de retest et limites.

**Gate : la preuve porte sur la méthode d'audit :**

- le périmètre et les parcours sont fixés avant le scan ; les mêmes pages et états sont utilisés avant/après ;
- au moins un audit automatisé et deux contrôles manuels distincts sont documentés : clavier et lecteur d'écran ;
- chaque constat retenu est reproduit ou justifié ; chaque faux positif/hors scope comporte une raison vérifiable ;
- tout défaut bloquant du périmètre est corrigé et retesté ; s'il ne peut pas l'être, le statut devient `BLOCKED` avec responsable et raison, et la gate n'est pas validée ;
- le rapport distingue les violations détectées, les contrôles manuels, les zones non testées et les limites des outils ; aucun score unique ni résultat local n'est présenté comme certification WCAG.

**Contre-épreuve :** identifie au moins un problème que le scanner ne peut pas décider seul (par exemple pertinence d'un nom, logique du focus ou compréhension d'une annonce) et joins la vérification manuelle qui tranche.

Étiquette les résultats locaux `LAB` ; `PRODUCTION` exige un audit effectué sur la version déployée et une observation réelle.
