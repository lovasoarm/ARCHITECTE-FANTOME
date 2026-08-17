---
stability: intemporel
acte: restituer
---

# Templates réutilisables

> Mode de vérification des exercices de ce module : défense orale enregistrée contre grille ([../../08_maitrise_staff_engineer/challenge.md](../../08_maitrise_staff_engineer/challenge.md)).

Temps de lecture ~2 min

Cet emplacement regroupe les templates qui servent à plusieurs modules à la
fois. Chaque module peut y pointer sans dépendre d'un chemin d'un autre
module.

| Template | Rôle | Utilisé par |
|---|---|---|
| `POSTMORTEM.md` | Squelette de post-mortem d'incident ou de mini-projet | 02-CONSTRUCTION/02_mini_projects, 03-PILOTAGE/05_observability, 03-PILOTAGE/04_security |
| `HYPOTHESES.md` | Grille d'hypothèses pour un debug méthodique | 01-CADRAGE/03_debugging, 05-MAITRISE/03_edge_cases, 03-PILOTAGE/05_observability |
| `PUBLICATION_CHECKLIST.md` | Checklist avant de publier un billet ou un repo | 02-CONSTRUCTION/02_mini_projects, 03-PILOTAGE/10_team_craft, 05-MAITRISE/06_annexes/career |

## Convention

- Un template ne se lit pas comme une leçon : il se copie et se remplit.
- Ne jamais modifier le template en place quand tu remplis un cas concret :
  copie-le dans le mini-projet ou l'incident, puis remplis la copie.
- Un ajout de template ici doit être précédé d'au moins deux modules qui
  en ont besoin (sinon il reste dans le module d'origine).

<!-- CONTENU-DOSSIER:debut (genere par outils/generer_index_dossiers.mjs) -->

## Contenu du dossier

Liste generee : tout fichier de `05-MAITRISE/06_annexes/28_templates` est joignable depuis ici, aucun document n'est laisse sans porte d'entree.

- [00_HYPOTHESES.md](00_HYPOTHESES.md)
- [01_PUBLICATION_CHECKLIST.md](01_PUBLICATION_CHECKLIST.md)
- [POSTMORTEM.md](POSTMORTEM.md)

<!-- CONTENU-DOSSIER:fin -->
