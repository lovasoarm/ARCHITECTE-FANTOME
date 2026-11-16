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

<!-- AF-DIAGRAM:report_generation -->

## Repère visuel : compilation d'un rapport PDF

```text
ADR + POSTMORTEMS + DEPENDENCY LEDGER
                  |
                  v
        sélection / normalisation
                  |
                  v
        document Markdown maître
                  |
                  v
       export PDF + métadonnées
                  |
                  v
contrôle pagination / liens / confidentialité
                  |
                  v
          rapport partageable
```

<!-- AF-LESSON-PROFILE: portfolio -->

## Repères de décision

- **Pourquoi :** Un rapport exporté rend plusieurs preuves consultables dans un seul document, à condition de préserver leurs sources, leur date et leur niveau de preuve.
- **Quand l’utiliser / quand l’éviter :** Génère-le lorsque plusieurs artefacts sont déjà stabilisés. N'automatise pas un dossier incomplet ou confidentiel uniquement pour obtenir un PDF.
- **Limites :** Un export n'améliore pas la qualité des preuves ; la sélection, la pagination, les liens, les licences et la confidentialité restent à vérifier.

## Mécanisme : la version sans magie

Sélectionne les artefacts autorisés, extrait les passages utiles, normalise les titres et liens, génère le Markdown puis le PDF, et vérifie visuellement les pages et les sources avant partage.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **generate_portfolio_report.md** se rattache à ce cas concret : à partir des ADR, postmortems et du registre des dépendances de Kintana, prépare une version compacte et partageable qui conserve la provenance et les limites des preuves.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : compiler et contrôler un rapport PDF

**Mission liée à « generate_portfolio_report.md » :** sélectionne un petit ensemble d'artefacts existants et autorisés (README, un ADR, un postmortem et une ligne du registre de dépendances). Assemble-les dans un document Markdown maître, ajoute une table des matières et conserve pour chaque section le chemin/source, le commit ou la date et le niveau de preuve. Exporte le document en PDF avec l'outil disponible dans ton environnement ; la méthode manuelle reste valable si aucun exporteur n'est installé.

**Livrable :** `portfolio.pdf` de 12 pages maximum, son fichier source Markdown, la liste des documents inclus/exclus et une checklist de contrôle avant partage. Le PDF n'est déclaré généré que si le fichier existe réellement.

**Critères d’acceptation :** chaque extrait remonte à une source ; aucune donnée secrète ou personnelle inutile n'est publiée ; les liens/titres sont lisibles ; aucune page n'est tronquée ; le niveau LAB/PILOT/PRODUCTION est conservé ; les éléments non vérifiés sont étiquetés.

**Transfert obligatoire :** retire une source et remplace-la par une preuve plus récente. Mets à jour le rapport sans perdre la provenance et vérifie le nombre de pages et les liens après export.
