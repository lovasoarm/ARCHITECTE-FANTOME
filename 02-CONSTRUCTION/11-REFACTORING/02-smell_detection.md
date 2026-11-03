---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, regression]
anti_recipe_key: defaut_cache+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# 00 : Smell detection

Temps de lecture ~5 min

> **Principe universel** : refactorer sans détecter les smells = déplacer la poussière.

## Catalogue (extrait)

| Smell                     | Signe                                                | Refacto canonique      |
| ------------------------- | ---------------------------------------------------- | ---------------------- |
| **Long function**         | > 40 lignes, plusieurs verbes dans le nom            | Extract function       |
| **Feature envy**          | Méthode qui utilise + les données d'une autre classe | Move method            |
| **Primitive obsession**   | `string` partout pour un `Email`, `UserId`           | Value object           |
| **Data clumps**           | Mêmes 3-4 params dans plusieurs fonctions            | Parameter object       |
| **Shotgun surgery**       | Un petit changement touche 10 fichiers               | Consolidate            |
| **Divergent change**      | 1 classe modifiée pour N raisons différentes         | Split responsibilities |
| **Comments as deodorant** | Long commentaire pour "expliquer" du code obscur     | Renomme, extrait       |
| **Boolean flag param**    | `send(true)` → devinette                             | Split en 2 fonctions   |

## Exercice : repérage guidé

Ouvre `00-SOCLE/04-FUNDAMENTALS/03_functions/` (ou n'importe quel module dense).

- Trouve **3 smells** dans le code d'exercices/solutions.
- Pour chacun : nomme le smell, propose le refacto, écris pourquoi.

Livrable : `SMELLS.md`.

## (attention) Piège

Refacto par plaisir esthétique. Non. **Un smell + un test qui protège + un refacto ciblé**.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une fonction `creerCommande()` valide les articles, calcule le total, appelle le paiement et envoie un e-mail. Un test montrant que le total est correct échoue dès que le fournisseur de paiement est indisponible, même si le calcul n'a pas changé. Le smell n'est pas simplement la longueur : plusieurs raisons de changement sont mélangées. Le refactoring minimal consiste à extraire `calculerTotal(lignes)` en fonction pure et à garder le paiement derrière une frontière. On conserve le test du total et on ajoute un test de contrat pour l'adaptateur de paiement. **Résultat attendu :** le calcul reste vérifiable sans réseau ; aucun comportement métier n'est modifié.

**À toi :** Un moteur de règles mélange calcul, accès réseau, journalisation et règles métier ; une nouvelle règle provoque des régressions ailleurs. Construis un cas minimal qui illustre « 00 : Smell detection » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **00 : Smell detection** se rattache à ce cas concret : Kintana peut avoir une vieille règle de disponibilité utilisée par plusieurs écrans. Elle doit être isolée sans changer les réponses valides.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Refactorer une règle legacy sans régression

> **Arc Walking Dead :** tu ne démolis pas le camp pour refaire les murs. Tu sécurises une petite zone, tu vérifies qu'elle tient, puis tu avances.

**Mission liée à « 00 : Smell detection » :** Choisis une fonction legacy du domaine Kintana. Ajoute des tests de caractérisation avant de la déplacer, extrais une responsabilité à la fois et compare les sorties avant/après sur les mêmes fixtures.

**Livrable :** tests de caractérisation, commits courts, diff lisible, note sur les comportements conservés et une régression détectée.

**Critères d’acceptation :** les tests existent avant le refactoring ; le comportement valide reste identique ; les changements intentionnels sont documentés séparément ; rollback possible à chaque étape.

**Transfert obligatoire :** Une règle non couverte par les fixtures apparaît dans un incident. Explique comment l'ajouter sans invalider les preuves précédentes.
