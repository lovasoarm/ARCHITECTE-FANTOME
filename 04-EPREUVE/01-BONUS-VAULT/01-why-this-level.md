---
stability: intemporel
acte: restituer
---

# POURQUOI CE NIVEAU EXISTE : UN COFFRE, PAS UNE ÉTAPE

Temps de lecture ~4 min

## Son statut, en une phrase

Ce niveau est un **coffre de références consultable à la demande, pas une étape chronologique du
fil** : il ne s'ouvre pas parce que tu as fini le niveau précédent, il s'ouvre parce qu'une
situation réelle te le demande, et il porte un seul livrable obligatoire, la revue de risques du
projet fil rouge ([challenge.md](challenge.md)).

Tous les autres modules du parcours ont un fichier « pourquoi » parce qu'ils t'enseignent un
mécanisme neuf et doivent justifier leur coût en heures. Celui-ci n'enseigne aucun mécanisme :
il rassemble des formats déjà justifiés ailleurs. Son fichier « pourquoi » sert donc à autre
chose, et à une seule chose : te dire quand l'ouvrir, et te dire que tu n'es pas en train de
sauter une étape en ne le lisant pas de bout en bout.

## Ses trois cas d'usage, et rien d'autre

1. **Une décision technique dépasse une seule personne.** Tu as besoin du bon format, tout de
   suite, sans réinventer sa structure : [01b-decision-templates.md](01b-decision-templates.md)
   (ADR, RFC, note d'une page), à croiser avec la matrice de traduction par public de
   [../../03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md](../../03-PILOTAGE/11_leadership_mentorat/05_expliquer_trois_publics.md).

2. **Un moment à haut risque arrive** : mise en production, revue, incident, arrivée d'une
   personne dans l'équipe. Tu ouvres [02-checklists.md](02-checklists.md) **avant**, jamais après.
   En incident, la checklist se lit en même temps que
   [../../03-PILOTAGE/06_fiabilite_slo/02_alerting_astreinte.md](../../03-PILOTAGE/06_fiabilite_slo/02_alerting_astreinte.md).

3. **Tu prépares la revue de risques du capstone.** C'est le seul usage obligatoire et daté :
   [05-security-cost-privacy.md](05-security-cost-privacy.md) pose le vocabulaire et les seuils,
   [challenge.md](challenge.md) impose le livrable, et
   [../06-CAPSTONE-ARENA/04-evaluation-grid.md](../06-CAPSTONE-ARENA/04-evaluation-grid.md) note
   son antériorité. La revue de risques s'écrit avant de coder : découverte au moment de livrer,
   elle documente tes mauvaises décisions au lieu de les éviter.

[04-anti-patterns-hall-of-fame.md](04-anti-patterns-hall-of-fame.md) et
[03-reading-list.md](03-reading-list.md) ne relèvent d'aucun de ces trois moments : ils se lisent
à froid, en une fois, le jour où tu veux te reconnaître dans un catalogue d'erreurs plutôt que
dans un cours.

## Ce que tu perds si tu le traites comme une étape

Un format de décision rempli par quelqu'un qui n'a jamais vécu de décision contestée est un
exercice de style creux. Lu trop tôt et dans l'ordre, ce coffre te donne l'illusion d'avoir
acquis une méthode que tu n'as fait que parcourir. Lu au moment du besoin, il te fait gagner la
demi-journée que coûte l'invention d'un format sous pression.

## Mode de vérification

Les exercices de ce niveau ont un mode unique et déclaré : défense orale enregistrée contre
grille ([../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md](../../05-MAITRISE/08_maitrise_staff_engineer/challenge.md)).

## ET APRÈS

[README.md](README.md) pour la structure, puis le fichier correspondant à ta situation réelle.
