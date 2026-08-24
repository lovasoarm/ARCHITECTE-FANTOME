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
