---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [constraints_injectees, temps_limite]
anti_recipe_key: constraints_injectees+temps_limite
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# 08 : Smell hunter : chasser le code mort et puant

Temps de lecture ~5 min

Dix odeurs. Dix corrections. Un exercice terrain.

## Le bestiaire

| #   | Smell                    | Signal                                                   | Antidote                     |
| --- | ------------------------ | -------------------------------------------------------- | ---------------------------- |
| 1   | Long method (>50 lignes) | Scroll infini                                            | Extract method               |
| 2   | God object               | Fichier > 500 lignes qui touche à tout                   | Split par responsabilité     |
| 3   | Magic number             | `if (x > 42)` sans contexte                              | Constante nommée             |
| 4   | Duplication              | Copier-coller ×3                                         | DRY, mais après le 3e        |
| 5   | Feature envy             | Méthode qui n'utilise que les données d'une autre classe | Move method                  |
| 6   | Dead code                | `if (false)`, imports jamais utilisés                    | Delete. Git s'en souvient.   |
| 7   | Shotgun surgery          | Un changement métier = 15 fichiers touchés               | Regrouper la logique         |
| 8   | Primitive obsession      | `string` pour tout (email, id, url)                      | Types wrapper                |
| 9   | Nested conditionals >3   | Escalier de `if`                                         | Early return / guard clauses |
| 10  | Commented-out code       | "au cas où" depuis 2 ans                                 | Delete. Git. S'en. Souvient. |

## Ce que la liste cache

Un smell n'est pas un bug. Certains sont légitimes (ex: duplication contrôlée pour lisibilité). Le smell dit "regarde ici". Il ne dit pas "corrige".

## Mission

Prends `02-CONSTRUCTION/02-MINI-PROJECTS/10_legacy_dungeon` (ou n'importe quel repo public). Chasse **7 smells** de la liste. Pour chacun : ligne, verdict (corrigé / laissé volontairement), justification en 2 lignes.

Livre `SMELL_HUNT.md`.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Dans `calculerRemise()`, deux branches identiques sont copiées pour les clients Standard et Premium ; un tableau montre qu'elles renvoient exactement le même résultat pour les mêmes entrées. C'est une duplication à corriger. Dans le même fichier, une variable locale nommée `ancienPrix` n'est utilisée qu'une fois et rend le calcul plus lisible : on la conserve. **Verdict :** corriger la duplication parce qu'elle crée deux points de correction ; ne pas supprimer la variable parce qu'elle clarifie l'intention. Le rapport consigne les deux décisions et le test qui prouve que le résultat de remise reste inchangé.

**À toi :** Un moteur de règles mélange calcul, accès réseau, journalisation et règles métier ; une nouvelle règle provoque des régressions ailleurs. Construis un cas minimal qui illustre « 08 : Smell hunter : chasser le code mort et puant » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **08 : Smell hunter : chasser le code mort et puant** se rattache à ce cas concret : Kintana peut avoir une vieille règle de disponibilité utilisée par plusieurs écrans. Elle doit être isolée sans changer les réponses valides.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Refactorer une règle legacy sans régression

> **Arc Walking Dead :** tu ne démolis pas le camp pour refaire les murs. Tu sécurises une petite zone, tu vérifies qu'elle tient, puis tu avances.

**Mission liée à « 08 : Smell hunter : chasser le code mort et puant » :** Choisis une fonction legacy du domaine Kintana. Ajoute des tests de caractérisation avant de la déplacer, extrais une responsabilité à la fois et compare les sorties avant/après sur les mêmes fixtures.

**Livrable :** tests de caractérisation, commits courts, diff lisible, note sur les comportements conservés et une régression détectée.

**Critères d’acceptation :** les tests existent avant le refactoring ; le comportement valide reste identique ; les changements intentionnels sont documentés séparément ; rollback possible à chaque étape.

**Transfert obligatoire :** Une règle non couverte par les fixtures apparaît dans un incident. Explique comment l'ajouter sans invalider les preuves précédentes.
