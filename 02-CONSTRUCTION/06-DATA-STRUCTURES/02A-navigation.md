---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, constraints_injectees]
anti_recipe_key: fausse_piste+constraints_injectees
transfer_distance: low
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : tournoi de Konoha :** si tu tries 10 000 combattants comme si tu cherchais un seul nom dans une liste de 12, l'arène devient un gag. Ici, la complexité est le nombre de combats que ton algorithme impose.

# Navigation : data structures en 3 paliers

Temps de lecture ~2 min

Ce module a 9 sous-dossiers. C'est plus que les autres modules du
curriculum, et c'est voulu : les structures de données forment une
famille dense, mais pas une famille homogène. Les enchaîner d'un coup
sans respirer, c'est le meilleur moyen de finir avec une bouillie
mentale où tout se mélange.

Découpe-toi ce module en 3 paliers. Fais une vraie pause entre chaque
(pas juste un café : une session de sommeil, ou au moins un autre module
entre les deux si tu es pressé).

```text
PALIER A : structures linéaires
  01_array --> 02_linked_list --> 03_stack --> 04_queue

  Point commun : un seul chemin pour naviguer les éléments
  (avant/arrière). Si tu comprends un array, tu comprends
  déjà 80% de la logique des 3 suivants.

PALIER B : structures non-linéaires
  05_heap --> 06_bst --> 07_hash_table --> 08_graphs

  Point commun : navigation qui n'est plus une ligne droite
  (arbre, hachage, graphe). Change de logiciel mental ici :
  la question n'est plus "avant ou après" mais "où exactement".

PALIER C : bonus
  09_advanced_bonus

  Optionnel dans une première passe. Reviens-y après avoir
  pratiqué le module 02-CONSTRUCTION/07-ALGORITHMS : certaines structures
  bonus ne prennent sens qu'avec un peu d'algo derrière.
```

## Pourquoi cette coupure précisément

Le palier A regroupe des structures qui partagent un seul mécanisme
mental (position dans une séquence). Le palier B regroupe des
structures qui demandent un vrai changement de paradigme (arborescence,
hachage, graphe) : chacune a sa propre façon de répondre à "où est mon
élément", contrairement au palier A où c'est toujours une question de
position linéaire.

Si tu sens que tu confonds heap et BST après les avoir vus à la suite :
c'est normal, pas un échec. Reviens sur le `90-grimoire.md`
avant de continuer, il te redonne les 9 définitions côte à côte pour
trancher les confusions.

## Ce que ce fichier ne remplace pas

`00-PREREQUIS.md` reste le gate d'entrée du module entier (basé sur ce
que `02-CONSTRUCTION/05-MEMORY-PERFORMANCE` t'a déjà enseigné). Cette navigation ne
remplace pas ce gate : elle organise ce qui vient après.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-LESSON-PROFILE: structures -->

## Repères de décision

- **Pourquoi :** La structure choisie détermine le coût des opérations dominantes et la façon dont l'état évolue.
- **Quand l’utiliser / quand l’éviter :** Choisis à partir des opérations fréquentes, du volume et des contraintes d'ordre. N'utilise pas une structure sophistiquée si un tableau ou une Map répond au besoin mesuré.
- **Limites :** La complexité moyenne ne garantit pas les performances réelles. Mémoire, distribution des clés, ordre, synchronisation et sérialisation peuvent changer le coût.

## Mécanisme : la version sans magie

Liste les opérations, leur fréquence et les garanties attendues ; compare complexité, mémoire et comportement aux cas limites.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Navigation : data structures en 3 paliers** se rattache à ce cas concret : Kintana doit retrouver une demande, dédupliquer les événements ou ordonner des notifications sans parcourir toute l'historique à chaque action.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Choisir la structure selon le trafic métier

> **Arc One Piece / Grand Line :** choisir une structure de données, c'est choisir comment la cargaison circule. Une mauvaise structure transforme chaque recherche en traversée de l'océan.

**Mission liée à « Navigation : data structures en 3 paliers » :** Prends une opération de Kintana (lookup par ID, file de notification, regroupement par tenant ou historique ordonné). Compare deux structures avec un coût théorique et un test reproductible sur données synthétiques.

**Livrable :** une implémentation courte, tests d'invariants, tableau coût/avantages et mesure locale si elle est pertinente.

**Critères d’acceptation :** les opérations dominantes sont identifiées ; l'ordre et les doublons sont traités explicitement ; la complexité est expliquée ; le choix n'est pas justifié par la mode.

**Transfert obligatoire :** Multiplie par dix le volume et change la distribution des clés. Réévalue le choix et indique si un index persistant devient nécessaire.
