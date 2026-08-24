---
stability: stable
acte: comprendre
---

# ADR : 04_breaking_cache

<!-- AF-DIAGRAM:cache -->

```text
text
Request
  │
  ▼
┌──────────┐
│  Cache   │
└─┬────┬───┘
  │hit │miss
  ▼    ▼
Value  ┌──────────┐
       │ Database │
       └────┬─────┘
            ▼
         populate
```

Le cache court-circuite la source de vérité en cas de hit et la recharge en cas de miss.

Temps de lecture ~2 min

Dossier de depot. Les ADR de ce projet, c'est toi qui les ecris :
ils sont un livrable note, pas une lecture.

## Format attendu

`ADR-NNN_<slug>.md`, numerotation continue a partir de `ADR-001`, sur le gabarit
[03-ADR_TEMPLATE.md](../../97-templates/03-ADR_TEMPLATE.md). Minimum 3 ADR pour valider le mini-projet,
cf. [../README.md](../README.md).

## Critere de succes

Chaque ADR porte une decision reellement prise pendant ce projet : contexte,
options ecartees, decision, consequence, signal de revision. Un ADR ecrit
apres coup pour remplir le quota se voit : il n'a pas de consequence.

## Contenu du dossier

<!-- CONTENU-DOSSIER:debut -->

Fourni par le cours (contexte impose, ne remplace pas tes ADR) :

- [ADR-001 : décision d’architecture](ADR-001_decision.md)

<!-- CONTENU-DOSSIER:fin -->
