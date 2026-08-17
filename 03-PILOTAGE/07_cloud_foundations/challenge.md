---
stability: perissable_2027
acte: produire
---

# CHALLENGE : LE BUDGET CLOUD QUI SURVIT À UNE RELECTURE

Ce challenge produit la pièce de preuve de la famille S1 de [PREUVES-STAFF-ENGINEER.md](../../PREUVES-STAFF-ENGINEER.md). Compte 45 minutes, chrono lancé, sans IA. Gabarit : [BUDGET-CLOUD.md](BUDGET-CLOUD.md). Exemplaire rempli : [PREUVES-MODELES/S1-BUDGET-CLOUD.md](../../PREUVES-MODELES/S1-BUDGET-CLOUD.md), à n'ouvrir qu'après ta première version.

## Le contexte narratif

La direction prépare le budget de l'année. On te demande une page : combien coûte ton système aujourd'hui, combien il coûtera si le produit réussit, et à partir de quel moment la courbe devient un problème.

## Ce que tu produis

1. **Le relevé daté, avant tout calcul.** Trois prix unitaires (calcul, egress, journaux) relevés toi-même chez deux fournisseurs, avec date, fournisseur, unité de facturation et URL, selon le [protocole de la donnée sourcée](../../06-ANNEXES-TRANSVERSES/meta/PROTOCOLE-DONNEE-SOURCEE.md). Le budget se construit avec ces chiffres, pas avec ceux du cours.
2. **La réponse écrite à l'objection "vos prix datent de quand ?"**, cinq lignes maximum, qui donne la date, la source, et ce que tu ferais si la grille avait bougé de 30 pour cent.
3. **Le portage chez le second fournisseur** ([06_portage_multicloud.md](06_portage_multicloud.md)) : même facture, plus la liste de ce qui change de nature et non de prix.
4. Les trois paliers chiffrés, une ligne par catégorie, egress inclus ([02_modeles_cout.md](02_modeles_cout.md)).
5. Le coût par utilisateur actif à chaque palier, avec la phrase qui explique sa trajectoire.
6. La ligne qui explose en premier, nommée, avec le palier où elle devient dominante.
7. Deux leviers d'économie chiffrés en euros par mois, pris dans le haut du tableau effort/gain.
8. Une phrase de tenabilité croisée avec ton `SLO.md` ([06_fiabilite_slo/challenge.md](../06_fiabilite_slo/challenge.md)) : ce que coûte la neuvième suivante.

## Barème honnête

- Trois paliers, egress présent partout, chaque chiffre daté, sourcé et porteur de son URL, portage écrit, un croisement SLO chiffré : la preuve S1 est acquise.\n- Chiffres repris du cours au lieu d'être relevés : le livrable enseigne à recopier, pas à sourcer. Il est refusé, même juste.\n- Portage absent : le budget vaut chez un seul fournisseur, donc il ne prouve aucune pensée transférable.
- Egress absent d'un palier : le budget masque son propre point de bascule, il est à refaire.
- Aucune date de relevé : ton document sera périmé sans que personne ne puisse le savoir. Ajoute-les avant d'aller plus loin.
- Leviers exprimés en pourcentages seulement : une direction arbitre des euros, pas des pourcentages.

## Soumis à un tiers, pas seulement calculé seul

Un budget cloud faux se repère souvent en une phrase, venant de quelqu'un qui n'a pas construit le calcul et n'a donc aucune raison de lui pardonner ses angles morts. Poste ce budget (ou son tableau des trois paliers) sur un forum technique public réel où des gens répondent vraiment à des questions de coût d'infrastructure, en demandant explicitement une relecture critique. Colle l'URL du fil et la date dans ton `JOURNAL.md`. Si une réponse pointe une erreur (egress oublié, hypothèse de volume irréaliste, service sous-tarifé), corrige le budget et garde la trace de la correction : c'est une meilleure preuve S1 qu'un budget jamais contredit par personne.

## Où ça ressort

Ce budget est repris en section 3 du dossier unique ([05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md)) et dans les tensions du capstone ([04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md](../../04-EPREUVE/06-CAPSTONE-ARENA/06-addendum-staff-engineer.md)).

## ET APRÈS

Le [boss fight](boss-fight.md) : on te demande 30% de moins, sans toucher au SLO.
