# Correction A5 — Les prix cloud sont enfin sources

Date : 2026-08-18 — reference d'audit 0.6

## Le defaut

Les montants du modele `PREUVES-MODELES/S1-BUDGET-CLOUD.md` renvoyaient a « pages tarifaires
publiques du fournisseur » : aucune URL, donc aucun chiffre contredisable. L'exercice de releve
exigeait de l'apprenant une rigueur que le depot ne s'appliquait pas.

## Ce qui a ete fait

1. Nouveau `03-PILOTAGE/07_cloud_foundations/RELEVE-REFERENCE-2026.md` : 12 lignes reellement
   relevees (3 fournisseurs x calcul, stockage objet, egress, base managee), chacune avec
   fournisseur, reference, prix liste, devise, unite, date de releve et URL complete. Les 12 URL
   ont repondu 200 le 2026-08-18.
2. Methode ecrite : une region par fournisseur, tarif liste sans engagement, paliers gratuits
   exclus, ligne incomplete retiree plutot qu'estimee.
3. Trois lectures chiffrees, dont la seule qui compte : l'egress varie de 38 % entre fournisseurs
   quand le calcul varie peu.
4. `S1-BUDGET-CLOUD.md` : toutes les mentions vagues remplacees par le lien vers le releve source.
5. `07_releve_tarifaire_reel.md` : le releve du depot est declare **repli hors ligne**, jamais
   substitut au releve personnel.
6. `06-ANNEXES-TRANSVERSES/09-PEREMPTION-2027.md` : procedure annuelle, qui / quand / preuve, avec
   regle de retrait si le rafraichissement n'a pas lieu.

## Limite assumee

Ce sont des tarifs liste publics a une date donnee, pas des factures. Ils ne remplacent pas le
releve de l'apprenant et perissent au 2027-08-18.
