---
stability: intemporel
acte: restituer
---

# 06-ANNEXES-TRANSVERSES

Porte d'entree du dossier. Une annexe n'est pas un chapitre : c'est une piece appelee par un
module precis du fil, a un moment precis. Les entrees sont donc **numerotees par ordre d'appel**,
pas par ordre alphabetique. Une annexe que plus aucun module n'appelle descend en
`99-COULISSES/` : le lint [99-COULISSES/outillage/verifier_annexes.mjs](../99-COULISSES/outillage/verifier_annexes.mjs)
refuse la livraison si une entree n'est ni numerotee ni rattachee.

## Index par ordre d'appel

| N | Fichier | Module declencheur (chemin exact) | Moment d'ouverture | Ce que ca debloque |
| --- | --- | --- | --- | --- |
| 01 | [01-support.md](01-support.md) | `00-SOCLE/01_getting_started/README.md` | Premier blocage de plus de trente minutes | Ou chercher de l'aide, dans quel ordre, avant d'appeler une IA |
| 02 | [02-NODE_VERSION.md](02-NODE_VERSION.md) | `00-SOCLE/01_getting_started/README.md` | Jour de l'installation | La version de Node supposee par tout le depot, fixee une fois |
| 03 | [03-TECH-ILA/](03-TECH-ILA/README.md) | `00-SOCLE/01_getting_started/README.md` puis 5 autres modules | Parcours parallele obligatoire, 6 jalons | Ou les mecanismes appris se retrouvent dans les technologies reelles |
| 04 | [04-UNIVERS_AUTORISES.md](04-UNIVERS_AUTORISES.md) | `00-SOCLE/02-PROLOGUE/04-rules-of-the-game.md` | Avant d'ecrire ton premier exemple | La liste blanche des univers narratifs, opposable par le lint |
| 05 | [05-DEV_JOURNAL_HEBDO.md](05-DEV_JOURNAL_HEBDO.md) | `00-SOCLE/03_referentiel/README.md` | Fin de la premiere semaine | Le rituel de journal qui rend la progression mesurable |
| 06 | [06-ROADMAP-rythmes.md](06-ROADMAP-rythmes.md) | `01-CADRAGE/RETRO-BLOC-1-CADRAGE.md` | Premiere retro de bloc | Trois rythmes de parcours tenables, et comment en changer |
| 07 | [07-CONTRADICTEUR.md](07-CONTRADICTEUR.md) | `02-CONSTRUCTION/16_ddd_contrats/05_expliquer_cqrs_a_3_publics.md` | Premiere defense d'une decision | Le protocole d'objection solo, reutilise par tous les Boss |
| 08 | [08-SIMULATION-ENTREPRISE.md](08-SIMULATION-ENTREPRISE.md) | `02-CONSTRUCTION/16_ddd_contrats/README.md` | Des qu'un module suppose une equipe | Trois protocoles solo : comite d'architecture, direction financiere, astreinte |
| 09 | [09-PEREMPTION-2027.md](09-PEREMPTION-2027.md) | `03-PILOTAGE/07_cloud_foundations/README.md` | A l'ouverture du module le plus perissable | Ce qui perime, quand, et avec quelle source le reverifier |
| 10 | [10-COMMUNAUTE.md](10-COMMUNAUTE.md) | `05-MAITRISE/06_annexes/13_portfolio_publication.md` | Au moment de publier | Ou publier et comment encaisser une contradiction publique |
| 11 | [11-ANNEXE-perennite.md](11-ANNEXE-perennite.md) | `05-MAITRISE/06_annexes/20_PERISSABILITE.md` | Apres la grille intemporel/perissable | La doctrine de perennite du depot |
| 12 | [12-EPILOGUE.md](12-EPILOGUE.md) | `05-MAITRISE/RETRO-BLOC-5-MAITRISE.md` | Retro finale ecrite et signee | La fin du fil, sans felicitations creuses |
| 13 | [13-ANNEXE-et-apres.md](13-ANNEXE-et-apres.md) | `05-MAITRISE/RETRO-BLOC-5-MAITRISE.md` | Apres l'epilogue | Ce qui vient apres le depot : marche, entretien, entretien du niveau |
| 14 | [14-PREUVES-MODELES/](14-PREUVES-MODELES/README.md) | `04-EPREUVE/06-CAPSTONE-ARENA/00_prereq_check.md` et les modules Staff du palier 03 | Avant d'ecrire ta premiere piece de preuve | Les sept modeles de livrables Staff, forme attendue et criteres de refus |

Hors numerotation, parce que ce ne sont pas des annexes appelees par un module : ce README
(porte d'entree), `LICENSE-projectfunny` (licence heritee), `meta/` (gabarits de style) et
`assets/` (images).

<!-- CONTENU-DOSSIER:debut (genere par 99-COULISSES/outillage/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `06-ANNEXES-TRANSVERSES` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [01-support.md](01-support.md)
- [02-NODE_VERSION.md](02-NODE_VERSION.md)
- [04-UNIVERS_AUTORISES.md](04-UNIVERS_AUTORISES.md)
- [05-DEV_JOURNAL_HEBDO.md](05-DEV_JOURNAL_HEBDO.md)
- [06-ROADMAP-rythmes.md](06-ROADMAP-rythmes.md)
- [07-CONTRADICTEUR.md](07-CONTRADICTEUR.md)
- [08-SIMULATION-ENTREPRISE.md](08-SIMULATION-ENTREPRISE.md)
- [09-PEREMPTION-2027.md](09-PEREMPTION-2027.md)
- [10-COMMUNAUTE.md](10-COMMUNAUTE.md)
- [11-ANNEXE-perennite.md](11-ANNEXE-perennite.md)
- [12-EPILOGUE.md](12-EPILOGUE.md)
- [13-ANNEXE-et-apres.md](13-ANNEXE-et-apres.md)
- [03-TECH-ILA/](03-TECH-ILA/README.md)
- [14-PREUVES-MODELES/](14-PREUVES-MODELES/README.md)
- [assets/](assets/README.md)

<!-- CONTENU-DOSSIER:fin -->
