---
stability: intemporel
acte: pilotage
noyau: oui
cognitive_level: L3
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : mission de rang S :** l'architecture la plus élégante peut perdre si elle arrive après la fenêtre business. Tu dois choisir ce que tu sacrifies avant que quelqu'un d'autre ne le fasse à ta place.

# Pourquoi ce module mérite ton temps : produit, coût, ROI

<!-- AF-DIAGRAM:roi -->

```text
text
Decision
  │
  ├──► Value / impact
  ├──► Cost
  ├──► Risk
  └──► Opportunity cost
            │
            ▼
        trade-off
```

Une décision produit compare valeur, coût, risque et valeur sacrifiée ailleurs plutôt qu’un seul chiffre.

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
2,2 mois » ne se refuse pas par goût. Elle se discute sur ses hypothèses : c'est-à-dire sur ton
terrain.

## 4) LA LIMITE HONNÊTE

Tout ne se chiffre pas. Ce qui ne se chiffre pas se **nomme** et s'assume : « je ne sais pas quantifier
la perte de confiance, je l'énonce comme risque non chiffré ». C'est plus solide qu'un faux nombre.

> **Durée de vie : intemporel.**

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.
