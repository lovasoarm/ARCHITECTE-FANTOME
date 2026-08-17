---
stability: intemporel
acte: restituer
---

# 02-CONSTRUCTION/16_ddd_contrats : langage, contextes bornés et contrats

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~4 min

## Ce que c'est

Le module qui traite la cause la plus fréquente des architectures qui pourrissent : le même mot
qui désigne deux choses selon l'équipe. On y apprend à découper par langage plutôt que par couche
technique, à séparer lecture et écriture quand la cohérence le justifie, et à rompre un contrat
d'API avec un préavis et une date d'extinction plutôt qu'un jour de panique.

## Structure du module

- [00_prereq_check.md](00_prereq_check.md) : filtre anti-illusion avant d'entrer.
- [00_why_ddd_contrats.md](00_why_ddd_contrats.md) : pourquoi ce module mérite ton temps.
- [01_langage_contextes_bornes.md](01_langage_contextes_bornes.md) : découper par langage, pas par couche.
- [02_cqrs_coherence_terme.md](02_cqrs_coherence_terme.md) : lecture, écriture, et cohérence à terme.
- [03_contrats_migration.md](03_contrats_migration.md) : rompre un contrat avec préavis et date d'extinction.
- [challenge.md](challenge.md) : challenge, le découpage de ton projet.
- [04_exercice_architecture_trop_belle.md](04_exercice_architecture_trop_belle.md) : l'exercice qui punit la sur-conception.
- [boss-fight.md](boss-fight.md) : boss fight, la rupture de contrat imposée.
- [EXO_JEUNE_IA.md](EXO_JEUNE_IA.md) : decider seul, IA coupee, puis mesurer l'ecart avec l'IA.
- [verification_pack/criteres.md](verification_pack/criteres.md) : les trois drills et leurs criteres binaires.
- [grimoire.md](grimoire.md) : mémo dense, à ouvrir après le reste.

## Comment lire ce module

Dans l'ordre. Le grimoire se lit en dernier. Le challenge produit la matière de la famille S2 :
le dossier `ADR/` de ton projet, dont l'exemplaire de référence est
[PREUVES-MODELES/S2-ADR-PRINCIPAL.md](../../PREUVES-MODELES/S2-ADR-PRINCIPAL.md).

## Signal que tu es prêt pour la suite

Tu sais nommer deux contextes bornés de ton projet et le mot qu'ils ne comprennent pas de la même
façon, et tu as écrit au moins un ADR dont une conséquence est chiffrée en coût ou en disponibilité.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `02-CONSTRUCTION/16_ddd_contrats` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_prereq_check.md](00_prereq_check.md)
- [00_why_ddd_contrats.md](00_why_ddd_contrats.md)
- [01_langage_contextes_bornes.md](01_langage_contextes_bornes.md)
- [02_cqrs_coherence_terme.md](02_cqrs_coherence_terme.md)
- [03_contrats_migration.md](03_contrats_migration.md)
- [04_exercice_architecture_trop_belle.md](04_exercice_architecture_trop_belle.md)
- [EXO_JEUNE_IA.md](EXO_JEUNE_IA.md)
- [boss-fight.md](boss-fight.md)
- [challenge.md](challenge.md)
- [grimoire.md](grimoire.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->
