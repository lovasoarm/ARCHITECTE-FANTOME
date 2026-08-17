---
stability: perissable_2027
acte: restituer
---

# 03-PILOTAGE/07_cloud_foundations : les fondations cloud

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~4 min

## Ce que c'est

Le module qui répond aux trois questions posées à tout architecte : combien ça coûte par mois, qui a le droit d'y toucher, et qu'est-ce qui s'arrête quand une zone tombe. On raisonne par catégories de service stables, pas par noms commerciaux périssables.

## Structure du module

- [00_prereq_check.md](00_prereq_check.md) : filtre anti-illusion avant d'entrer.
- [00_why_cloud_foundations.md](00_why_cloud_foundations.md) : pourquoi ce module mérite ton temps.
- [01_categories_service.md](01_categories_service.md) : les catégories, et le service pris par réflexe.
- [02_modeles_cout.md](02_modeles_cout.md) : les cinq lignes d'une facture, et le coût par utilisateur.
- [03_identite_droits_secrets.md](03_identite_droits_secrets.md) : moindre privilège, secrets, frontières.
- [04_rayon_impact_zones.md](04_rayon_impact_zones.md) : topologies, rayon d'impact, prix d'une neuvième.
- [05_choisir_fournisseur.md](05_choisir_fournisseur.md) : comparer sans s'enfermer (grille datée 2026-08).
- [06_portage_multicloud.md](06_portage_multicloud.md) : porter le budget chez un second fournisseur, et nommer ce qui change de nature.
- [08_EXO_JEUNE_IA.md](08_EXO_JEUNE_IA.md) : decider seul, IA coupee, puis mesurer l'ecart avec l'IA.
- [verification_pack/criteres.md](verification_pack/criteres.md) : les trois drills et leurs criteres binaires.
- [grimoire.md](grimoire.md) : mémo dense, à ouvrir seulement après le reste.
- [BUDGET-CLOUD.md](BUDGET-CLOUD.md) : le gabarit vivant du livrable S1.
- [challenge.md](challenge.md) : challenge, produire ton budget cloud.
- [boss-fight.md](boss-fight.md) : boss fight, réduire de 30% sans casser la promesse.

## Avertissement de péremption

Les montants cités dans [05_choisir_fournisseur.md](05_choisir_fournisseur.md) sont relevés en 2026-08 et périment en 2027-02. La méthode de comparaison, elle, ne périme pas. Toute reprise de ces chiffres doit porter une date. Le protocole complet est dans [../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md](../../99-COULISSES/meta/PROTOCOLE-DONNEE-SOURCEE.md).

## Signal que tu es prêt pour le module suivant

Ton `BUDGET-CLOUD.md` existe, chiffré à trois paliers, egress inclus, chaque nombre daté, et tu sais dire en une phrase ce que coûte la neuvième suivante de ton SLO.

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `03-PILOTAGE/07_cloud_foundations` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_prereq_check.md](00_prereq_check.md)
- [00_why_cloud_foundations.md](00_why_cloud_foundations.md)
- [01_categories_service.md](01_categories_service.md)
- [02_modeles_cout.md](02_modeles_cout.md)
- [03_identite_droits_secrets.md](03_identite_droits_secrets.md)
- [04_rayon_impact_zones.md](04_rayon_impact_zones.md)
- [05_choisir_fournisseur.md](05_choisir_fournisseur.md)
- [06_portage_multicloud.md](06_portage_multicloud.md)
- [07_releve_tarifaire_reel.md](07_releve_tarifaire_reel.md)
- [08_EXO_JEUNE_IA.md](08_EXO_JEUNE_IA.md)
- [BUDGET-CLOUD.md](BUDGET-CLOUD.md)
- [08_EXO_JEUNE_IA.md](08_EXO_JEUNE_IA.md)
- [boss-fight.md](boss-fight.md)
- [challenge.md](challenge.md)
- [defense-orale.md](defense-orale.md)
- [grimoire.md](grimoire.md)
- [verification_pack/](verification_pack/README.md)

<!-- CONTENU-DOSSIER:fin -->
- [defense-orale.md](defense-orale.md) — trois objections a soutenir a voix haute avant de valider le module.

> **Contexte d'entreprise manquant ?** Ce module suppose une direction qui impose une contrainte budgetaire. Protocole solo jouable, avec tirage au sort et verdict binaire : [SIMULATION-ENTREPRISE.md](../../06-ANNEXES-TRANSVERSES/SIMULATION-ENTREPRISE.md) (protocole 2).
