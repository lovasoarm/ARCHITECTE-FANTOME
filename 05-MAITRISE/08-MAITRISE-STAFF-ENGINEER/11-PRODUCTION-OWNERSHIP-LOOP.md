---
stability: intemporel
acte: maitrise
noyau: oui
assessment_role: staff_mastery
---

# 11 : Boucle d'ownership en production

Ce module ferme le dernier écart entre « système correctement conçu » et « système réellement possédé dans le temps ».

## Contrat

Sur un même fil rouge, exécute une boucle longitudinale :

```text
baseline
  -> changement
  -> incident ou régression
  -> diagnostic
  -> décision
  -> mitigation
  -> migration / refactor
  -> mesure post-changement
  -> revisite
```

La preuve doit contenir au minimum :

- 3 états datés du système ;
- 1 changement de produit ou de charge ;
- 1 dégradation observable ;
- 1 décision de migration, rollback ou limitation de scope ;
- 1 mesure avant/après ;
- 1 condition qui aurait invalidé la décision.

## Ce qui est interdit

Un benchmark synthétique exécuté une seule fois ne ferme pas ce gate.
Une simulation peut fermer T0 ; elle ne doit jamais être présentée comme T4.

## Artefact

Créer `PREUVES/OWNERSHIP-LOOP.md` avec les horodatages, mesures, décisions et écarts.
Le document doit pouvoir être compris par un tiers sans explication orale.
