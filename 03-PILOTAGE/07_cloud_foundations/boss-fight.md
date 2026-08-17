---
stability: perissable_2027
acte: produire
---

# BOSS FIGHT : RÉDUIRE LA FACTURE DE 30% CE TRIMESTRE

> Relevé le 2026-08-14, source : pages tarifaires publiques des fournisseurs citées dans ce fichier, à revérifier avant 2027. Tout montant de ce fichier est un ordre de grandeur daté, jamais une vérité intemporelle.

Compte 45 minutes, chrono lancé, sans IA. Tu écris tes décisions dans l'ordre, sans revenir corriger la précédente.

## La situation

Ton budget cloud validé au challenge est de 10 400 € par mois au palier atteint. La direction financière annonce une coupe : **30% de moins d'ici la fin du trimestre**, soit 3 120 € mensuels à trouver. Trois contraintes tombent avec l'annonce :

- Le SLO de 99,5% a été communiqué à trois clients par écrit. Le dégrader est possible, mais se négocie et se signe.
- La ligne egress représente 1 620 €, la ligne journaux 640 €, la base de données 3 100 €, le calcul 4 800 €.
- Une migration d'architecture est exclue : le trimestre ne le permet pas.

## Les trois coups du boss

**Coup 1 : le plan chiffré.** Écris le plan de réduction, poste par poste, avec pour chaque ligne : le montant économisé, l'effort, le risque, et l'effet sur le SLO. Total attendu : au moins 3 120 €. Interdiction d'écrire "optimiser" sans montant.

**Coup 2 : l'objection technique.** "Vos économies sur les journaux, c'est bien joli, mais l'équipe d'astreinte dit qu'elle ne pourra plus diagnostiquer les incidents. Vous économisez 400 € et vous ajoutez une heure à chaque RTO. Vous assumez ?" Réponds en chiffrant les deux côtés, y compris le coût d'une heure d'indisponibilité supplémentaire.

**Coup 3 : l'objection contractuelle.** "Passez le SLO à 99% et on gagne beaucoup plus, non ? Faites-le." Réponds : combien cela rapporte exactement, ce que cela change pour les trois clients signataires, et qui doit signer cette décision. Si tu refuses, chiffre ton refus.

## Verdict

- Les 3 120 € sont trouvés avec des montants ligne par ligne, l'arbitrage journaux est chiffré des deux côtés, et la question du SLO remonte à la personne qui a le pouvoir de signer : boss fight gagné.
- Tu atteins le montant en dégradant le SLO sans nommer les clients ni le signataire : tu as pris seul une décision contractuelle. C'est le reproche le plus fréquent fait à un architecte, et le plus coûteux.
- Tu proposes une migration d'architecture : hors contrainte, et cela signale que tu n'as pas exploité les leviers rapides de [02_modeles_cout.md](02_modeles_cout.md), section 5.

## Où ça ressort

Cette contrainte est exactement l'option 2 des contraintes imposées du dossier unique ([05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md](../../05-MAITRISE/08_maitrise_staff_engineer/01_dossier_unique.md)), et une objection du [CONTRADICTEUR](../../06-ANNEXES-TRANSVERSES/CONTRADICTEUR.md), groupe 2.

## ET APRÈS

Module terminé. Le module suivant du bloc, [08_produit_cout_roi](../08_produit_cout_roi/00_why_produit_cout_roi.md), transforme ces montants en arbitrages de roadmap.
