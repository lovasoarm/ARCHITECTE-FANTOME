# Matrice des compétences : mode d’emploi des ressources

La matrice principale [`MATRICE-COMPETENCES.csv`](MATRICE-COMPETENCES.csv) reste le référentiel des 56 compétences. Son champ `canonical_resource` contient **une seule ressource principale** par compétence : un chemin relatif depuis la racine du curriculum.

Les ressources complémentaires sont stockées dans [`MATRICE-COMPETENCES-RESSOURCES.csv`](MATRICE-COMPETENCES-RESSOURCES.csv), sous forme relationnelle (une ligne par association compétence–ressource) :

| Champ            | Sens                                                                                |
| ---------------- | ----------------------------------------------------------------------------------- |
| `competency_id`  | Identifiant de la compétence, identique à la matrice principale                     |
| `resource_order` | Ordre de lecture/priorité au sein des ressources de cette compétence, à partir de 1 |
| `resource_role`  | `primary` pour la ressource canonique ; `supporting` pour un complément             |
| `resource_path`  | Chemin relatif depuis la racine du curriculum                                       |

## Cas NET-01

`NET-01` conserve comme ressource canonique la leçon-pont Réseau/DNS/TCP/TLS. Trois ressources complémentaires sont conservées explicitement, dans cet ordre :

1. `05-MAITRISE/09-PORTFOLIO-SYSTEMES-2035/LECONS-PONTS/12-fondations-reseau-dns-tcp-tls.md` : `primary` ;
2. `02-CONSTRUCTION/18-WEB-CONCEPTS/02-http_rest_basics.md` : `supporting` ;
3. `01-CADRAGE/03-DEBUGGING/03-debug_methodology.md` : `supporting` ;
4. `03-PILOTAGE/05-OBSERVABILITY/03-distributed_tracing.md` : `supporting`.

Aucune ressource n'est supprimée par la normalisation : la cellule historique multi-valeurs de `NET-01` a été répartie en quatre lignes ordonnées dans le fichier relationnel.

La matrice principale conserve son schéma et le sens historique de son champ `canonical_resource`. Les outils qui ne lisent que ce champ continuent donc à obtenir le chemin principal ; les consommateurs qui ont besoin des ressources complémentaires lisent le CSV relationnel.
