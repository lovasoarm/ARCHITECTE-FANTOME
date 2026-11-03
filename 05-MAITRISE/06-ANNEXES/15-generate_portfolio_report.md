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

### Vérification observable : critères de réussite

Prépare trois vérifications : cas nominal, cas limite et cas invalide. Écris avant l’exécution l’assertion attendue pour « generate_portfolio_report.md », puis conserve le résultat et explique tout écart.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-DIAGRAM:portfolio -->

## Repère visuel utile : Dossier de preuve examinable

```text
problème -> rôle -> artefact
                   |
                   v
             commande reproductible
                   |
                   v
             résultat + limites
                   |
                   v
             revue / objection
                   |
                   v
             preuve renforcée ou claim retiré
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un portfolio crédible relie compétence, artefact, décision et résultat sans transformer une simulation en expérience réelle.
- **Quand l’utiliser / quand l’éviter :** Utilise-le pour montrer ton travail à un reviewer, entretien ou équipe. Mets en avant une preuve profonde plutôt qu'une collection de technologies.
- **Limites :** Un portfolio personnel ne démontre pas à lui seul influence organisationnelle ou impact production. Respecte confidentialité, licences et données non publiques.

## Mécanisme : la version sans magie

Présente le problème, ton rôle, les contraintes, les choix, le code/tests, la mesure, les limites et ce qui a changé après feedback.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **generate_portfolio_report.md** se rattache à ce cas concret : Les tranches Kintana peuvent servir de cas d'étude LAB ; les contributions externes ou travaux en entreprise doivent être séparés et attestés selon les faits.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Dossier de preuve examinable

> **Arc Arène Staff :** ton portfolio n'est pas une vitrine de captures. C'est un dossier que quelqu'un peut examiner, contredire et reproduire.

**Mission liée à « generate_portfolio_report.md » :** Transforme une tranche Kintana en dossier de portfolio. Donne accès au commit, aux commandes reproductibles, aux tests, à l'ADR et aux limites. Fais une revue par un pair si possible ; sinon note `EXTERNAL_REVIEW: NOT RUN`.

**Livrable :** une étude de cas courte, liens d'artefacts, résultat de tests, décisions et registre des limites.

**Critères d’acceptation :** ton rôle est précis ; les faits sont datés ; les résultats LAB/PILOT/PRODUCTION sont séparés ; les chiffres sont reproductibles ; aucune contribution d'équipe n'est revendiquée comme individuelle.

**Transfert obligatoire :** Un reviewer conteste une mesure ou un choix. Ajoute la preuve qui manque ou retire la revendication au lieu de défendre un chiffre fragile.
