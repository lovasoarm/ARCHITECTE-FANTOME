---
stability: intemporel
acte: évaluer
---

# 00 : Prereq check : capstone arena
Temps de lecture ~8 min

> Cette porte n'est pas un questionnaire de confiance : c'est un **contrôle d'existence sur
> disque**. Le capstone est l'épreuve finale du parcours, et l'addendum Staff Engineer
> ([06-addendum-staff-engineer.md](06-addendum-staff-engineer.md)) exige quatre pièces déjà
> produites dans les modules amont. Tant que les quatre fichiers n'existent pas dans **ton**
> dépôt, le capstone ne démarre pas. Une intention ne se relit pas.

## Contrôle 1 : les quatre pièces existent physiquement

Réponse binaire par ligne : le fichier existe et contient les éléments listés, ou il n'existe pas.
Il n'y a pas de « presque ».

| # | Pièce exigée par l'addendum | Fichier attendu dans TON dépôt | Produit au module | Existe ? |
| --- | --- | --- | --- | --- |
| 1 | ADR principal, dont un ADR de découpage en contextes bornés | `PREUVES/ADR-PRINCIPAL.md` | [02-CONSTRUCTION/16_ddd_contrats](../../02-CONSTRUCTION/16_ddd_contrats/00_why_ddd_contrats.md) | oui / non |
| 2 | Budget cloud chiffré à trois échelles, prix relevés et datés | `PREUVES/BUDGET-CLOUD.md` + `PREUVES/RELEVE-TARIFAIRE.md` | [03-PILOTAGE/07_cloud_foundations](../../03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md) | oui / non |
| 3 | SLO écrit par toi, budget d'erreur et RTO mesuré | `PREUVES/SLO.md` | [03-PILOTAGE/06_fiabilite_slo](../../03-PILOTAGE/06_fiabilite_slo/01_sli_slo_budget_erreur.md) | oui / non |
| 4 | Au moins une pièce parmi S4, S5, S6 (arbitrage chiffré, soutenance en quatre traductions, ou intégration IA bornée) | `PREUVES/ARBITRAGE.md`, `PREUVES/SOUTENANCE.md` ou `PREUVES/IA-EN-PROD.md` | [03-PILOTAGE/08_produit_cout_roi](../../03-PILOTAGE/08_produit_cout_roi/02_grille_cout_risque_valeur.md), [03-PILOTAGE/11_leadership_mentorat](../../03-PILOTAGE/11_leadership_mentorat/00_why_leadership_mentorat.md) ou [04-EPREUVE/04_ai_native_dev/90_ia_dans_le_livrable_staff.md](../04_ai_native_dev/90_ia_dans_le_livrable_staff.md) | oui / non |

Les exemplaires de référence de ces quatre pièces sont dans
[PREUVES-MODELES/](../../PREUVES-MODELES/README.md) : ils montrent la forme attendue, ils ne
remplacent aucun de tes fichiers.

## Contrôle 2 : la matière de la tension n°1 est disponible

La tension n°1 du capstone est imposée et chiffrée. Elle ne peut pas s'écrire sans ces trois
éléments, à vérifier maintenant et non le jour de la rédaction :

1. un prix de calcul, de base managée, de stockage objet et d'egress, chacun avec **URL complète et date** ([07_releve_tarifaire_reel.md](../../03-PILOTAGE/07_cloud_foundations/07_releve_tarifaire_reel.md)) ;
2. le coût de la seconde zone calculé ligne par ligne, inter-zones compris ([04_rayon_impact_zones.md](../../03-PILOTAGE/07_cloud_foundations/04_rayon_impact_zones.md), section 3 bis) ;
3. un coût d'une minute d'arrêt, justifié en une phrase métier, écrit dans `PREUVES/SLO.md`.

## Verdict

- **Les quatre pièces existent et les trois éléments du contrôle 2 sont là** → tu démarres le capstone.
- **Une pièce manque** → tu ne démarres pas. Tu retournes au module qui la produit, et tu la produis. Le capstone n'est pas l'endroit où l'on rattrape un module sauté : il est l'endroit où l'on prouve qu'on ne l'a pas sauté.
- **Deux pièces manquent ou plus** → tu reviens en arrière d'un palier entier avant d'ouvrir ce module.

> La différence entre cette porte et les seize autres du dépôt : les autres testent ce que tu
> sais, celle-ci teste ce que tu as **livré**. Un jury ne lit pas des souvenirs.

## Et après

La porte franchie, l'ordre de lecture est : [01-why-this-level.md](01-why-this-level.md), puis
[02-briefing.md](02-briefing.md), puis l'addendum
[06-addendum-staff-engineer.md](06-addendum-staff-engineer.md) avant d'écrire la première ligne.

## Piece supplementaire exigee depuis S-09

`PREUVES/PORTAGE.md` existe physiquement dans ton depot, ses tests de contrat passent des deux cotes et son ecart de cout est chiffre depuis un releve date. Sinon, le capstone n'est pas ouvert : voir [PREUVES-MODELES/S7-PORTAGE.md](../../PREUVES-MODELES/S7-PORTAGE.md).
