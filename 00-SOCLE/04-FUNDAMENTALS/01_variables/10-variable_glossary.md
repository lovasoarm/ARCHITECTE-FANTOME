---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [temps_limite, preuve_partielle]
anti_recipe_key: temps_limite+preuve_partielle
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **Repère :** distingue binding, valeur, référence, portée, réaffectation et mutation avant d’utiliser ces termes.

# Variable grimoire : les mots que tu dois maîtriser

Temps de lecture ~5 min

> Ce module, c'est la mémoire. Si tu ne comprends pas ces termes, tu ne comprends pas ce que JS fait avec tes données.

---

| Terme        | Définition                                                                                                                                | Code                                                                  | Analogies                                                                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Variable     | Binding : nom associé à une valeur dans un environnement lexical ; le langage n'expose pas nécessairement un emplacement physique         | `let score = 42;`                                                     | Une boîte avec une étiquette / Un tiroir avec un post-it collé dessus                                                                           |
| Primitive    | Valeur primitive immuable (`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) ; une affectation copie cette valeur   | `let a = 10; let b = a; b = 99; // a reste 10`                        | Un billet de banque que tu tiens dans la main / Un chiffre écrit sur un papier : tu le copies, les deux sont indépendants                       |
| Object       | Valeur qui désigne un objet ; une affectation copie la valeur de référence, si bien que plusieurs bindings peuvent désigner le même objet | `let obj = { hp: 100 }; let copy = obj; copy.hp = 0; // obj.hp aussi` | Un ticket de vestiaire : tu as l'adresse, pas l'objet / Un lien vers un Google Doc : le fichier est ailleurs                                    |
| Reference    | Valeur permettant d'accéder à un objet ; ce modèle ne promet pas une adresse physique exposée par le moteur                               | `let a = {}; let b = a; console.log(a === b); // true`                | Les coordonnées GPS d'une maison / Le numéro de chambre dans un hôtel                                                                           |
| Mutation     | Modifier le contenu d'un objet existant : toutes les références vers cet objet voient le changement                                       | `let arr = [1,2]; let b = arr; b.push(3); // arr aussi`               | Repeindre la maison : tout le monde qui a l'adresse voit le changement / Modifier un Google Doc partagé : la mise à jour est pour tout le monde |
| Shallow Copy | Copie de la première couche seulement : les objets imbriqués restent partagés                                                             | `let copy = [...arr]; // tableau nouveau, objets internes partagés`   | Photocopier la couverture d'un livre, pas les pages / Dupliquer un dossier sans copier les fichiers qu'il contient                              |
| Deep Copy    | Copie complète de toute la structure, tous les niveaux imbriqués inclus                                                                   | `let deep = structuredClone(obj);`                                    | Imprimer l'intégralité du livre, page par page / Cloner une clé USB avec tout son contenu                                                       |

> **Statut : approfondissement facultatif.** Termine d’abord la mission de base et vérifie que tu comprends l’exemple principal. Ce checkpoint n’est pas une gate et ne conditionne pas le passage au sous-module suivant. S’il utilise une notion que tu n’as pas encore étudiée, saute-le pour la première passe et reviens-y plus tard.

## Approfondissement facultatif : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

<!-- AF-DIAGRAM:variables -->

## Repère visuel utile : les notions à ne pas confondre

```text
binding (nom) ──associe──► valeur
                              |
             référence ───────┘ (si la valeur désigne un objet)
                              |
mutation : change l'objet ou une propriété
réaffectation : change la valeur associée au binding
portée : délimite où le nom est accessible
```

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** Les bindings, la portée et la mutation déterminent quelle valeur une fonction lit réellement. Une erreur ici peut attribuer une notification au mauvais utilisateur ou réutiliser un état déjà modifié.
- **Quand l’utiliser / quand l’éviter :** Choisis `const` par défaut pour un binding non réassigné, `let` si tu dois le réassigner et évite `var` dans du code neuf sauf contrainte explicite de compatibilité. Utilise une copie ou un modèle immuable quand plusieurs composants partagent un état.
- **Limites :** `const` ne rend pas un objet immuable ; `let` ne règle pas un problème de concurrence ; `var` reste nécessaire à connaître pour lire du legacy. La portée lexicale n'est pas une protection de sécurité.

## Mécanisme : la version sans magie

Distingue la variable (binding), la valeur référencée, la portée et la durée de vie. Une closure garde accès à son environnement lexical ; dans une boucle, `var` partage un binding de fonction alors que `let` crée un binding par itération.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Variable grimoire : les mots que tu dois maîtriser** se rattache à ce cas concret : Le worker de notifications Kintana construit une tâche par demande. Une closure mal capturée peut envoyer plusieurs notifications au même destinataire ou utiliser le mauvais identifiant.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : expliquer les mots sans les mélanger

> **Arc DBZ / Capsule Corp. :** avant de réparer une machine, nomme la pièce que tu touches. Le bon mot évite le mauvais diagnostic.

**Mission liée à « Variable grimoire : les mots que tu dois maîtriser » :** À partir d'une demande Kintana simple, donne un exemple de `binding`, `valeur`, `référence`, `portée`, `réaffectation` et `mutation`. Pour chaque mot, écris une phrase et une ligne de code qui l'illustre.

**Livrable :** un mini-glossaire personnel de six entrées, avec un exemple exécutable ou un exemple de code commenté.

**Critères d’acceptation :** chaque terme est expliqué sans utiliser un autre terme comme seule définition ; les exemples montrent des comportements distincts ; aucune adresse mémoire physique n'est inventée.

**Transfert obligatoire :** reprends l’un des exemples de code de cette leçon ou invente un petit exemple local. Explique quel mécanisme produit le comportement observé. Aucun projet personnel ni expérience préalable n’est nécessaire.
