# Niveau 03 : MVP Split

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

[Sommaire](../../99-COULISSES/archives/CURRICULUM-projectfunny.md) | [Niveau précédent](../01-PROBLEM-HUNT/README.md) | [Niveau suivant](../../02-CONSTRUCTION/01-USER-WIZARD/README.md)

**Ce niveau réutilise :** [02-PROBLEM-HUNT](../01-PROBLEM-HUNT/04-scope-and-non-goals.md) : les non-objectifs et la metrique de succes, qui donnent les bornes du decoupage en tranches.

**Auto-test d'entrée :**
1. Quelle est la différence entre une demande et un besoin réel ?
2. A quoi sert une section de non-objectifs, concretement, sur les choix d'architecture ?
3. Comment distingues-tu un persona utile d'un persona decoratif ?

**Verdict de l'auto-test :** une seule réponse hésitante et tu n'entres pas encore. Relis
[le grimoire du niveau précédent](../01-PROBLEM-HUNT/grimoire.md) (20 minutes), puis refais son
[challenge](../01-PROBLEM-HUNT/challenge.md) si deux réponses sur trois manquent. Entrer ici avec un
trou amont, c'est attribuer au niveau 03 une difficulté qui vient du niveau 02.

**Durée :** source unique dans [CURRICULUM.md](../../99-COULISSES/archives/CURRICULUM-projectfunny.md) (règle de calcul : voir [_STYLE.md](../../06-ANNEXES-TRANSVERSES/meta/_STYLE.md), section « Durées »).

## Ce que c'est

Ce niveau apprend à découper un problème déjà bien compris (Niveau 02 fait) en tranches
livrables qui ont de la valeur individuellement. La compétence n'est pas "faire un MVP",
tout le monde connaît le mot. La compétence est de savoir couper une feature sans la casser,
d'estimer sans mentir, et de savoir dire non à un ajout de périmètre sans passer pour quelqu'un
qui ne veut pas travailler.

Ici tu apprends la différence entre une tranche verticale (qui traverse toute la stack et
livre un bout de valeur complet) et une couche horizontale (qui prépare l'infrastructure mais
ne livre rien d'utilisable seule). Tu apprends où placer les lignes de coupe dans une feature
complexe, comment estimer avec de l'incertitude assumée plutôt que cachée, et comment arbitrer
entre dire oui, dire non, et dire "pas maintenant, et voici pourquoi".

Prérequis : Niveau 02 (Problem Hunt) terminé. Tu dois arriver ici avec un besoin réel identifié,
des utilisateurs qui comptent, des non-objectifs écrits et une métrique de succès définie.
Sans ça, découper un problème mal posé ne fait que produire des tranches inutiles plus vite.

## Ce que tu sais faire à la sortie

- Tu sais distinguer une tranche verticale d'une couche horizontale et tu sais pourquoi
  livrer par couches retarde le retour terrain de plusieurs semaines.
- Tu sais identifier où couper une feature complexe sans casser son utilité, et tu sais
  utiliser un feature flag pour livrer du code incomplet en sécurité.
- Tu sais estimer une tâche en assumant l'incertitude au lieu de la maquiller derrière un
  chiffre unique, et tu sais repérer l'effet tunnel avant qu'il ne te morde.
- Tu sais dire non à une demande de périmètre supplémentaire avec un argument de coût
  d'opportunité, pas avec de la mauvaise volonté.
- Tu sais assumer une dette technique consciemment plutôt que la découvrir en production.

## Structure du niveau

- [01-why-this-level.md](01-why-this-level.md) : ce qui casse quand on découpe mal ou pas du tout
- [02-slicing-value.md](02-slicing-value.md) : tranches verticales vs couches horizontales
- [03-cut-lines.md](03-cut-lines.md) : où couper une feature sans la casser, feature flags
- [04-estimating-honestly.md](04-estimating-honestly.md) : incertitude, découpage, budget de temps, effet tunnel
- [05-when-to-say-no.md](05-when-to-say-no.md) : arbitrage, coût d'opportunité, dette assumée
- [challenge.md](challenge.md) : exercice appliqué, livrable, critères mesurables
- [boss-fight.md](boss-fight.md) : situation adverse + grille d'évaluation
- [grimoire.md](grimoire.md) : mémo dense

## Comment lire ce niveau

Dans l'ordre. `02-slicing-value.md` pose le principe (verticale vs horizontale),
`03-cut-lines.md` l'applique à une feature concrète, `04-estimating-honestly.md` t'apprend
à chiffrer ce découpage sans te mentir, et `05-when-to-say-no.md` te donne les mots pour
défendre ce découpage face à quelqu'un qui veut tout, tout de suite. Le `boss-fight.md`
simule exactement cette pression.

## Ce qui ne se passe pas ici

Pas de code de production détaillé, pas de choix de stack technique. Ce niveau produit un plan
de livraison en tranches avec des estimations honnêtes, pas une implémentation. L'exécution
technique du découpage arrive dans les niveaux suivants.

Avant de continuer : passe par [RETRO-BLOC-1-CADRAGE.md](../RETRO-BLOC-1-CADRAGE.md), la
rétrospective du bloc Cadrage que tu viens de terminer.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `01-CADRAGE/05-MVP-SPLIT` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_prereq_check.md](00_prereq_check.md)
- [01-why-this-level.md](01-why-this-level.md)
- [02-slicing-value.md](02-slicing-value.md)
- [03-cut-lines.md](03-cut-lines.md)
- [04-estimating-honestly.md](04-estimating-honestly.md)
- [05-when-to-say-no.md](05-when-to-say-no.md)
- [boss-fight.md](boss-fight.md)
- [challenge.md](challenge.md)
- [defense-orale.md](defense-orale.md)
- [grimoire.md](grimoire.md)

<!-- CONTENU-DOSSIER:fin -->
