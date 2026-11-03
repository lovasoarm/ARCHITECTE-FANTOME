---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [defaut_cache, transmission]
anti_recipe_key: defaut_cache+transmission
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# Ne touche à rien avant de pouvoir l'expliquer

Temps de lecture ~2 min

-> ~7 min

## RÈGLE

Face à une codebase inconnue, **aucune modification** n'est autorisée avant
que tu puisses expliquer, à voix haute et sans lire, ce que fait le fichier
que tu veux toucher.

Ce n'est pas une posture morale. C'est une garantie anti-régression : 80 %
des bugs de refactor viennent d'un dev qui a "compris grosso modo" avant
d'éditer.

## PROTOCOLE

1. **Lecture passive** : lis le fichier entier, sans éditer, sans même
   ouvrir ton clavier de code.
2. **Explication au canard** : verbalise, en français, ce que ce fichier
   fait, pourquoi il existe, et **où il peut casser**.
3. **Écris un `RESUME_AVANT_EDIT.md`** de 10 lignes qui résume ta compréhension.
4. **Seulement ensuite**, tu peux éditer : et ton premier commit doit
   correspondre exactement à ce que ton résumé disait vouloir faire.

## ANTI-PATTERN À REPÉRER

- "Je vais juste renommer ça vite fait" → non, tu casses un contrat.
- "L'IA me dit que c'est ok" → l'IA n'a pas lu le fichier entier avec toi.
- "Le test passe, donc c'est bon" → les tests couvrent 40 %, pas 100 %.

## VÉRIFIABLE

Livrable : `RESUME_AVANT_EDIT.md` + diff du commit. Un pair te lit et vote :
"tu avais compris avant de toucher, oui/non". Non = tu recommences.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

### Transfert : changer de contexte

Applique le mécanisme de « Ne touche à rien avant de pouvoir l'expliquer » à une codebase dont tu ne connais pas l’auteur ni l’historique. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:refactoring -->

## Repère visuel utile : Refactorer une règle legacy sans régression

```text
legacy + comportement connu
          |
          v
  tests de caractérisation
          |
          v
 extraction minimale
          |
          v
   tests verts ?
      | oui   | non
      v       v
 étape suivante  rollback + diagnostic
```

<!-- AF-LESSON-PROFILE: refactoring -->

## Repères de décision

- **Pourquoi :** Le refactoring améliore la structure sans changer le comportement attendu. Sans tests de caractérisation, une refonte peut casser une règle métier que personne n'avait documentée.
- **Quand l’utiliser / quand l’éviter :** Refactorise quand un changement devient risqué ou qu'un code smell ralentit les évolutions. N'effectue pas un grand nettoyage sans objectif, test et possibilité de rollback.
- **Limites :** Les tests existants peuvent omettre des comportements cachés. Une structure plus élégante n'est pas automatiquement plus rapide ou plus facile à maintenir.

## Mécanisme : la version sans magie

Caractérise le comportement, fais un petit changement, relance les tests, compare les traces utiles et conserve un commit réversible.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Ne touche à rien avant de pouvoir l'expliquer** se rattache à ce cas concret : Kintana peut avoir une vieille règle de disponibilité utilisée par plusieurs écrans. Elle doit être isolée sans changer les réponses valides.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Refactorer une règle legacy sans régression

> **Arc Walking Dead :** tu ne démolis pas le camp pour refaire les murs. Tu sécurises une petite zone, tu vérifies qu'elle tient, puis tu avances.

**Mission liée à « Ne touche à rien avant de pouvoir l'expliquer » :** Choisis une fonction legacy du domaine Kintana. Ajoute des tests de caractérisation avant de la déplacer, extrais une responsabilité à la fois et compare les sorties avant/après sur les mêmes fixtures.

**Livrable :** tests de caractérisation, commits courts, diff lisible, note sur les comportements conservés et une régression détectée.

**Critères d’acceptation :** les tests existent avant le refactoring ; le comportement valide reste identique ; les changements intentionnels sont documentés séparément ; rollback possible à chaque étape.

**Transfert obligatoire :** Une règle non couverte par les fixtures apparaît dans un incident. Explique comment l'ajouter sans invalider les preuves précédentes.
