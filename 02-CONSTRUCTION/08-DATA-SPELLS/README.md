# Niveau 05 : Data Spells

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

[Sommaire](../../06-ANNEXES-TRANSVERSES/archives/CURRICULUM-projectfunny.md) | [Niveau précédent](../01-USER-WIZARD/README.md) | [Niveau suivant](../15-ARCHI-LAB/README.md)

**Ce niveau réutilise :** [04-USER-WIZARD](../01-USER-WIZARD/03-states-and-empty-cases.md) : les états obligatoires d'un affichage (vide, chargement, erreur), qui deviennent des contraintes sur le modèle de données.

**Auto-test d'entrée :**
1. Cite les cinq états obligatoires de tout affichage de données.
2. Pourquoi un double submit sur un formulaire peut-il creer deux fois la meme ressource si l'idempotence n'est pas geree ?
3. Qu'est-ce qu'une UI optimiste, et quel est son risque principal ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../01-USER-WIZARD/grimoire.md) (20 minutes), puis refais son
[challenge](../01-USER-WIZARD/challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au niveau 05 une difficulté qui vient du niveau 04.

**Durée :** source unique dans [CURRICULUM.md](../../06-ANNEXES-TRANSVERSES/archives/CURRICULUM-projectfunny.md) (règle de calcul : voir [_STYLE.md](../../06-ANNEXES-TRANSVERSES/meta/_STYLE.md), section « Durées »).

## Ce niveau en une phrase

Modéliser des données qui restent vraies dans dix ans, sous concurrence, avec de l'historique, et
qui répondent vite même quand la table a dix millions de lignes.

## Pourquoi ce nom

Un schéma de base de données bien pensé a quelque chose d'un sort : invisible tant qu'il fonctionne,
et absolument impossible à défaire proprement s'il est mal lancé au départ. Une migration mal
pensée n'est pas un bug qu'on corrige, c'est une dette qu'on porte pendant des années.

## Ce que tu sais déjà en arrivant ici

- Tu sais écrire des requêtes SQL simples et créer des tables avec des clés étrangères.
- Tu as déjà utilisé un ORM pour lire et écrire des données.
- Tu n'as jamais eu à décider seul comment modéliser une relation many-to-many avec de l'historique,
  ni à écrire une migration réversible sur une table déjà pleine de données réelles.

## Ce que tu sauras faire à la sortie

- Modéliser un domaine en identifiant ses entités, ses invariants, et le bon choix entre clé
  naturelle et clé technique.
- Normaliser un schéma pour éviter les incohérences, puis dénormaliser sciemment quand la
  performance ou la lecture l'exige, en connaissant le prix exact du choix.
- Écrire des migrations réversibles, gérer les données historiques, choisir entre suppression dure
  et suppression douce, et savoir quand un audit trail est nécessaire.
- Écrire des requêtes qui restent rapides à l'échelle : indexation pertinente, éviter le N+1,
  paginer par curseur plutôt que par offset, choisir un niveau d'isolation de transaction en
  connaissance de cause.

## Terrain de jeu

Ce niveau utilise deux fils rouges complémentaires : la refacturation d'énergie d'un syndic
d'immeuble (compteurs, relevés, tarifs qui changent dans le temps, répartition entre logements) et
la bibliothèque d'un club d'escalade (emprunts de matériel, adhérents, historique de prêts). Deux
domaines avec de vrais invariants temporels et une vraie concurrence d'accès.

## Plan du niveau

- [01-why-this-level.md](01-why-this-level.md) : ce qui casse quand le modèle de données est pensé après le code.
- [02-model-the-domain.md](02-model-the-domain.md) : entités, invariants, clés naturelles vs techniques.
- [03-relations-and-normalization.md](03-relations-and-normalization.md) : normaliser puis dénormaliser sciemment.
- [04-migrations-and-time.md](04-migrations-and-time.md) : migrations réversibles, historique, soft delete, audit.
- [05-queries-that-scale.md](05-queries-that-scale.md) : index, N+1, pagination par curseur, transactions et isolation.
- [challenge.md](challenge.md) : exercice appliqué et critères de réussite mesurables.
- [boss-fight.md](boss-fight.md) : situation adverse réaliste, avec grille d'évaluation.
- [grimoire.md](grimoire.md) : mémo dense à garder sous la main.

## Trois paliers

Ce niveau est le plus lourd du bloc build et le second point d'abandon du parcours : charge
maximale, gratification différée, et il arrive après trois niveaux où tu n'as rien construit.
Il se joue en trois paliers, jamais d'un bloc.

```text
Palier 1 (4 h)  02 + 03  --> livrable : schema initial en SQL, avec au moins deux
                             invariants defendus par une contrainte de base
Palier 2 (4 h)  04       --> livrable : une migration expand/contract jouee et annulee
                             sur une base de test
Palier 3 (4 h)  05       --> livrable : une requete lente identifiee, mesuree avant/apres,
                             avec le plan d'execution colle dans ton JOURNAL.md
```

Chaque palier se termine par une entrée datée dans `JOURNAL.md`. Si tu décroches, tu reprends
au palier, pas au niveau.

## Prérequis

Niveau 04, ou une expérience équivalente d'écriture d'API avec base de données relationnelle. Tu dois
savoir écrire une jointure SQL et une transaction basique avant d'attaquer la leçon 3.

## Comment progresser

Modélise un des deux domaines sur papier avant d'ouvrir un éditeur SQL. Code le schéma, remplis-le
avec un volume de données réaliste (des dizaines de milliers de lignes, pas dix), puis observe ce
qui devient lent et pourquoi. Le challenge et le boss fight vérifient que tes décisions tiennent sous
charge, pas seulement sur ton jeu de données de trois lignes.

## Si tu bloques

Ce niveau est le plus lourd du bloc construction et le seul à exiger une installation logicielle.
C'est aussi le premier point d'abandon du parcours. Trois issues, dans cet ordre, aucune n'est une
triche :

1. **Version réduite acceptable.** Si l'installation de PostgreSQL 16 te coûte plus de 2 h, passe à
   une base gérée gratuite ou à un conteneur Docker unique, et fais le niveau avec **3 tables au
   lieu de 6**. Conditions non négociables pour que ça compte : au moins une contrainte d'unicité
   métier, au moins une contrainte de temps (créneau ou période), une migration jouée puis annulée.
   Ce qui est enseigné ici, c'est l'invariant défendu par la base, pas le nombre de tables.
2. **Point de reprise après une pause.** Le niveau se coupe proprement en deux : les leçons 02 et 03
   (modéliser) forment un tout, les leçons 04 et 05 (faire évoluer, faire tenir la charge) en
   forment un autre. Reprends au début de la moitié non finie, jamais au début du niveau, et relis
   d'abord [grimoire.md](grimoire.md). Protocole complet dans
   [00-PROLOGUE/02-how-to-use-this-curriculum.md](../../00-SOCLE/02-PROLOGUE/02-how-to-use-this-curriculum.md),
   section « Reprendre après une pause longue ».
3. **Continuer ou recommencer : le critère.** Recommence uniquement si tu ne peux pas répondre à la
   question « quel invariant métier mon schéma actuel laisse-t-il violer ? ». Si tu peux y répondre,
   même mal, tu continues : la suite du parcours va corriger le schéma de toute façon, c'est prévu
   au niveau 06 et au capstone. Recommencer par confort est le piège le plus coûteux du parcours.

Signal d'alerte honnête : trois séances d'affilée sans une seule ligne de SQL exécutée. Ce n'est pas
un manque de motivation, c'est un blocage d'outillage. Applique l'issue 1 le jour même.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `02-CONSTRUCTION/08-DATA-SPELLS` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [01-why-this-level.md](01-why-this-level.md)
- [02-model-the-domain.md](02-model-the-domain.md)
- [03-relations-and-normalization.md](03-relations-and-normalization.md)
- [04-migrations-and-time.md](04-migrations-and-time.md)
- [05-queries-that-scale.md](05-queries-that-scale.md)
- [boss-fight.md](boss-fight.md)
- [challenge.md](challenge.md)
- [defense-orale.md](defense-orale.md)
- [grimoire.md](grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
