---
stability: intemporel
acte: comprendre
cognitive_level: L3
---

> **Règle pédagogique :** un contenu périssable doit être revu avant son échéance et remplacé ou actualisé lorsque sa validité change.

# PÉRISSABILITÉ DU PARCOURS

Les compteurs ci-dessous décrivent l'inventaire de cette édition : **1 854 fichiers Markdown**, dont **1 744 avec frontmatter** et **110 sans frontmatter**. La ventilation par `stability` porte uniquement sur les 1 744 fichiers qui déclarent cette métadonnée. Les 110 autres restent hors de cette ventilation : l'absence de frontmatter n'est pas automatiquement une anomalie, notamment pour certains README de dossier, gabarits ou supports ; leur rôle doit être apprécié dans leur contexte. N'ajoute pas de YAML par défaut à un fichier qui n'en a pas besoin. Les ateliers de consolidation renvoient explicitement à une leçon canonique : leurs métadonnées sont héritées de cette leçon, sans duplication.

**Deux notions distinctes :** `stability` décrit le niveau de pérennité dominant du document entier. `perishability_id` identifie un élément précis à revalider (API, version, prix, norme, fournisseur, donnée ou pratique). Un document `intemporel` ou `stable` peut donc porter un identifiant si un sous-élément réellement volatile y est présent. Dans ce cas, le texte doit nommer le périmètre suivi et son rythme de revue. L’identifiant ne requalifie pas à lui seul tout le document. Un identifiant sans élément volatile identifiable est une anomalie à résoudre, pas une raison de reclasser automatiquement le document. Les documents d’exercice fondés sur des données explicitement fictives ne reçoivent pas un identifiant uniquement parce que leur scénario contient une date ou un chiffre ; la source et la cadence doivent viser une donnée réellement volatile.

| Statut                                                  |  Fichiers |
| ------------------------------------------------------- | --------: |
| intemporel                                              |     1 243 |
| stable                                                  |       218 |
| evolutif                                                |       206 |
| perissable                                              |        76 |
| mixte - invariants durables et technologies périssables |         1 |
| **Total avec frontmatter**                              | **1 744** |
| sans frontmatter                                        |       110 |
| **Total Markdown**                                      | **1 854** |

Anciennes variantes normalisées : `mouvant → evolutif`, `perissable_2027/2028 → perissable` avec échéance conservée dans `review_due`.

| Zone                                             | Périssable |
| ------------------------------------------------ | ---------: |
| `00-SOCLE/01-GETTING-STARTED`                    |          4 |
| `00-SOCLE/03-REFERENTIEL`                        |          1 |
| `01-CADRAGE/03-DEBUGGING`                        |          2 |
| `01-CADRAGE/04-ERROR-HANDLING`                   |          2 |
| `02-CONSTRUCTION/03-TESTING`                     |          2 |
| `02-CONSTRUCTION/04-MATH-BASICS`                 |          1 |
| `02-CONSTRUCTION/05-MEMORY-PERFORMANCE`          |          2 |
| `02-CONSTRUCTION/07-ALGORITHMS`                  |          1 |
| `02-CONSTRUCTION/12-TYPESCRIPT`                  |         16 |
| `02-CONSTRUCTION/13-RUNTIME-ENV`                 |          1 |
| `02-CONSTRUCTION/19-API-CRAFT`                   |          1 |
| `02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER`      |          1 |
| `03-PILOTAGE/03-QUALITY-SHIELD`                  |          1 |
| `03-PILOTAGE/04-SECURITY`                        |          4 |
| `03-PILOTAGE/05-OBSERVABILITY`                   |         10 |
| `03-PILOTAGE/07-CLOUD-FOUNDATIONS`               |          3 |
| `03-PILOTAGE/12-PLATFORM-ENGINEERING`            |          1 |
| `04-EPREUVE/02-TOOL-CAVE`                        |          1 |
| `04-EPREUVE/05-CAPSTONE-ARENA`                   |          1 |
| `05-MAITRISE/06-ANNEXES`                         |          2 |
| `05-MAITRISE/07-TOOLS`                           |          5 |
| `05-MAITRISE/08-MAITRISE-STAFF-ENGINEER`         |          2 |
| `06-ANNEXES-TRANSVERSES`                         |          5 |
| `06-ANNEXES-TRANSVERSES/04-TECH-ILA`             |          6 |
| `06-ANNEXES-TRANSVERSES/19-PRODUIT-IA-REFERENCE` |          1 |

## Registre opérationnel

La liste ci-dessus reste une vue consolidée. Utilise `perishability_id` pour distinguer les contenus durables des contenus qui demandent une attention particulière lorsque les outils, versions ou pratiques évoluent.

## CHECKPOINT DE PROFONDEUR

Transpose le mécanisme dans un contexte où il devient une mauvaise pratique : quelle hypothèse tombe, quel signal le montre, et quel modèle de remplacement choisis-tu ?

### Exemple travaillé : cas métier

**Exemple résolu (fictif).** Une procédure indique `node --experimental-...` pour activer une option. Cette commande est volatile : le registre la note avec version Node, date, lien officiel et statut. Le principe durable « vérifier les options supportées par le runtime » reste dans la documentation conceptuelle. À la mise à jour Node suivante, l'équipe revalide la commande avant de la réutiliser. **Résultat :** la procédure périssable est vérifiée au bon rythme sans réécrire les concepts stables.

**À toi :** Tu rejoins une organisation qui possède plusieurs services, une documentation incomplète et un incident ouvert ; il faut comprendre avant de proposer. Construis un cas minimal qui illustre « PÉRISSABILITÉ DU PARCOURS » avec des données concrètes. Décris l’état initial, une seule opération, l’état final attendu et la raison pour laquelle ce résultat est correct.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:learning -->

## Repère visuel utile : Rappel actif et transfert

```text
Lire -> masquer la leçon -> rappeler
                         |
                         v
                   pratiquer Kintana
                         |
                         v
                   comparer au test
                         |
                +--------+--------+
                v                 v
             corriger          expliquer
                |                 |
                +--------+--------+
                         v
                   transfert différé
```

<!-- AF-LESSON-PROFILE: learning -->

## Repères de décision

- **Pourquoi :** Un parcours long ne produit pas de maîtrise par simple lecture. Il faut transformer chaque notion en rappel, application, correction et preuve conservée.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode pour planifier, réviser ou sortir d'un plateau. Évite de transformer le suivi en usine à cases cochées : le signal est la capacité à résoudre un problème nouveau.
- **Limites :** Le journal et le calendrier ne prouvent pas la compétence. Seule une tâche refaite sans copier, puis transférée à un autre contexte, apporte une preuve utile.

## Mécanisme : la version sans magie

Prédis, rappelle sans support, pratique, compare à un critère, corrige, puis reviens après un délai et transfère vers un cas différent.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **PÉRISSABILITÉ DU PARCOURS** se rattache à ce cas concret : Le cas d’étude Kintana donne un contexte stable ; tu peux vérifier si une notion apprise sur le client réapparaît correctement dans l'API, les données ou l'exploitation.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Rappel actif et transfert

> **Arc Équipe 7 / Naruto :** le scroll ne te rend pas meilleur. Ce qui compte, c'est ce que tu peux rappeler, expliquer et réutiliser sans regarder la solution.

**Mission liée à « PÉRISSABILITÉ DU PARCOURS » :** Choisis une capacité Kintana déjà étudiée. Sans rouvrir la leçon, reconstruis le mécanisme, applique-le à une évolution imprévue, puis compare ton résultat aux critères de la leçon et consigne l'écart.

**Livrable :** une fiche de rappel à froid, un commit ou artefact produit, les tests exécutés et une note de correction datée.

**Critères d’acceptation :** la tentative initiale est conservée ; l'écart est expliqué ; le transfert change au moins une contrainte ; le niveau de preuve est étiqueté LAB, PILOT ou PRODUCTION sans confusion.

**Transfert obligatoire :** Refais la tâche une semaine plus tard sans relire la fiche. Si tu ne peux pas expliquer les limites, classe la compétence en cours plutôt que maîtrisée.
