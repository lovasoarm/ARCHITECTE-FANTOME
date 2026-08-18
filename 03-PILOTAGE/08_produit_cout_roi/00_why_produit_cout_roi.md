---
stability: intemporel
acte: pilotage
noyau: oui
---

# POURQUOI CE MODULE MÉRITE TON TEMPS : PRODUIT, COÛT, ROI

Temps de lecture ~8 min

T'as déjà vu un refactoring refusé sans argument, ou accepté sans chiffre ?
T'as déjà dit « c'est de la dette technique » et vu la conversation s'arrêter là ?

## 1) LE PROBLÈME

Les décisions techniques sont prises par des gens qui ne lisent pas ton code. Ils lisent des nombres :
combien ça coûte, combien ça rapporte, ce qui casse si on ne le fait pas. Un ingénieur qui ne traduit
pas sa décision dans ces trois nombres délègue l'arbitrage à quelqu'un de moins informé que lui.

## 2) LES TROIS NOMBRES

- **Valeur** : ce que ça rapporte ou ce que ça évite de perdre, par mois.
- **Coût** : jours-homme + surcoût d'exploitation mensuel.
- **Risque** : probabilité x impact, en euros ou en temps d'indisponibilité.

Aucun n'a besoin d'être exact. Tous ont besoin d'être **sourcés** et d'un ordre de grandeur défendable.

## 3) CE QUE ÇA CHANGE

Une phrase du type « ce chantier de 12 jours économise 40 h/mois de traitement manuel, point mort à
2,2 mois » ne se refuse pas par goût. Elle se discute sur ses hypothèses — c'est-à-dire sur ton
terrain.

## 4) LA LIMITE HONNÊTE

Tout ne se chiffre pas. Ce qui ne se chiffre pas se **nomme** et s'assume : « je ne sais pas quantifier
la perte de confiance, je l'énonce comme risque non chiffré ». C'est plus solide qu'un faux nombre.

> **Durée de vie : intemporel.**
