---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [transmission, changement_contexte]
anti_recipe_key: transmission+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# generate_portfolio_report.md

Temps de lecture ~5 min

> Script mental (ou vrai script) qui compile ADR + POSTMORTEM + DEPENDENCY_LEDGER en **un PDF partageable**.

## Ce que le rapport contient

1. **Page de garde** : nom, dates, 3 phrases sur toi.
2. **Sommaire** : projets traités.
3. Pour chaque projet :

- Problème résolu (1 §)
- Décisions clés (extraits d'ADR)
- Ce qui a cassé (extraits de POSTMORTEM)
- Dépendances externes (extraits du Ledger)

4. **Bilan** : compétences transférables (renvoie à `transferability/`).

## Version manuelle

Ouvre chaque source, copie/colle dans un doc Markdown, exporte en PDF.

## Version scriptée (bonus)

```bash
# script.sh : squelette
cat README.md ADR/*.md 08-POSTMORTEM.md ../09-DEPENDENCY_LEDGER.md > /tmp/report.md
pandoc /tmp/report.md -o portfolio.pdf
```

## Livrable

`portfolio.pdf` ≤ 12 pages. Lisible sans contexte.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.
