---
stability: evolutif
acte: pilotage
noyau: oui
---

# POURQUOI CE MODULE MÉRITE TON TEMPS : CLOUD FOUNDATIONS

Temps de lecture ~8 min

T'as déjà vu une facture cloud tripler sans qu'aucune ligne de code ne change ?
T'as déjà choisi un service managé sans savoir sur quelle unité il facture ?
T'as déjà entendu « on migrera plus tard » comme réponse à une question de dépendance ?

## 1) LE PROBLÈME

Le cloud ne facture presque jamais ce que tu crois. Il facture des unités : requêtes, Go-mois, Go
sortants, secondes-Go de calcul, connexions ouvertes. Tant que tu ne sais pas nommer l'unité, tu ne
sais pas ce que coûte ta décision d'architecture — donc tu ne décides pas, tu subis.

## 2) L'EGRESS, LE PIÈGE UNIVERSEL

Entrer des données ne coûte presque rien. Les sortir coûte. Une architecture qui traverse trois fois
la frontière du fournisseur pour une seule requête utilisateur paie trois fois. C'est une décision
d'architecture déguisée en ligne de facture.

## 3) POURQUOI C'EST LA SEULE PREUVE DE TRANSFÉRABILITÉ DÉJÀ EXISTANTE

Porter un service d'un fournisseur à un autre force à séparer ce qui est *concept* (une file, un
stockage d'objets, un calcul) de ce qui est *marque*. C'est exactement l'exercice que la famille S7
demande, appliqué à l'infrastructure plutôt qu'au langage.

## 4) CE QUE ÇA CHANGE EN ENTRETIEN

« Combien coûte votre système à un million d'utilisateurs ? » — la réponse attendue n'est pas un
nombre juste, c'est un **calcul lisible**, avec ses hypothèses, ses unités et sa date de relevé.

> **Durée de vie : 2-3 ans.** Les prix bougent, les unités facturées beaucoup moins.
