---
stability: perissable_2028
acte: évaluer
---

# 99-COULISSES

**Ce dossier n'est pas pour toi si tu apprends.**

Rien ici n'est a apprendre : c'est la fabrique du depot, conservee pour l'audit.

## Regle de frontiere (appliquee par outillage)

La racine du depot ne contient que ce que l'apprenant ouvre. Liste blanche exhaustive et fermee :

| Entree | Role |
| --- | --- |
| `README.md` | porte d'entree unique |
| `LICENSE` | licence |
| `.gitignore` | hygiene de depot |
| `PROGRESSION.md` | la seule surface de suivi de l'apprenant |
| `PREUVES-STAFF-ENGINEER.md` | les six familles de preuve |
| `PREUVES-MODELES/` | les modeles de livrables |
| `00-SOCLE/` a `05-MAITRISE/` | les six paliers |
| `06-ANNEXES-TRANSVERSES/` | les annexes appelees par le fil |
| `99-COULISSES/` | la fabrique (ce dossier) |

Tout le reste — outillage, rapports generes, prompts, protocoles, decisions — vit ici.
`99-COULISSES/outillage/controle_livraison.mjs` refuse toute racine contenant une entree hors liste blanche.

## Contenu

- `outillage/` : les verrous de livraison (`.mjs`) et les rapports generes (`VERIFICATION_LIENS.md`).
- `archives/` : le prompt de fusion, l'ordre de bataille, l'ancien protocole d'audit et les decisions datees.
- `meta/` : le protocole de donnee sourcee, la note de contribution et l'index des coulisses.
- `CHANGELOG-CORRECTIONS.md` : le journal date des corrections du plan d'audit.

La charte de style active, elle, reste dans le produit :
[06-ANNEXES-TRANSVERSES/meta/_STYLE.md](../06-ANNEXES-TRANSVERSES/meta/_STYLE.md).
Ce dossier est volontairement absent des index generes destines a l'apprenant ; il est
reference une seule fois, en fin de [README racine](../README.md).
