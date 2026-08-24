---
stability: intemporel
acte: comprendre
---

# Templates réutilisables

Temps de lecture ~2 min

Cet emplacement regroupe les templates qui servent à plusieurs modules à la
fois. Chaque module peut y pointer sans dépendre d'un chemin d'un autre
module.

| Template | Rôle | Utilisé par |
|---|---|---|
| `02-POSTMORTEM.md` | Squelette de post-mortem d'incident ou de mini-projet | 02-CONSTRUCTION/02-MINI-PROJECTS, 03-PILOTAGE/05-OBSERVABILITY, 03-PILOTAGE/04-SECURITY |
| `HYPOTHESES.md` | Grille d'hypothèses pour un debug méthodique | 01-CADRAGE/03-DEBUGGING, 05-MAITRISE/03-EDGE-CASES, 03-PILOTAGE/05-OBSERVABILITY |
| `PUBLICATION_CHECKLIST.md` | Checklist avant de publier un billet ou un repo | 02-CONSTRUCTION/02-MINI-PROJECTS, 03-PILOTAGE/10-TEAM-CRAFT, 05-MAITRISE/06-ANNEXES/16_career |

## Convention

- Un template ne se lit pas comme une leçon : il se copie et se remplit.
- Ne jamais modifier le template en place quand tu remplis un cas concret :
  copie-le dans le mini-projet ou l'incident, puis remplis la copie.
- Un ajout de template ici doit être précédé d'au moins deux modules qui
  en ont besoin (sinon il reste dans le module d'origine).

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

- [03-HYPOTHESES.md](03-HYPOTHESES.md)
- [Publication checklist](97-PUBLICATION_CHECKLIST.md)
- [POSTMORTEM : {titre}](02-POSTMORTEM.md)

<!-- CONTENU-DOSSIER:fin -->
