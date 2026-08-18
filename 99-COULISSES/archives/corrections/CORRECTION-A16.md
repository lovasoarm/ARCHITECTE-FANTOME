# Correction A16 — « Diriger des agents » devient prouvable

Date : 2026-08-18 — reference d'audit 20.4

## Le defaut

Le module `07_standards_pour_agents.md` se terminait par « aucun document nouveau » : la seule
competence de leadership propre a l'IA ne produisait donc aucune preuve, et le dossier unique
pouvait etre valide sans qu'on sache jamais ce que les agents decidaient seuls.

## Ce qui a ete fait

1. Livrable obligatoire `STANDARDS-AGENTS.md`, une page, quatre blocs binaires : decisions
   autonomes (liste fermee), validations requises (liste fermee de declencheurs), verification de
   sortie (commande executable), cout plafond d'une tache deleguee (un nombre + l'action au
   depassement).
2. Ajoute aux pieces du dossier unique : **absent = dossier refuse**, sans examen des huit sections.
3. Cite dans S5 et S6 de `PREUVES-STAFF-ENGINEER.md`, avec recroisement au budget S1.
4. Relu en `RETRO-BLOC-5-MAITRISE.md` (critere binaire pose en A15).
