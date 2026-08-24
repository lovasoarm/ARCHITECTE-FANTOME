---
stability: intemporel
acte: pratique
noyau: oui
route_family: core
---

# 22 : SIMULATION CROSS-TEAM

<!-- AF-DIAGRAM:influence -->

```text
text
                 ┌───────────┐
                 │ Decision  │
                 └─────┬─────┘
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Product       SRE        Security
          │            │            │
          └──── objections / feedback ───┘
                         │
                         ▼
                      adoption
```

L’influence traverse des parties prenantes aux objectifs différents avant d’aboutir à l’adoption.

> **Le Staff ne livre pas seulement une architecture. Il crée de l'alignement autour d'elle.**

## Pourquoi

Le parcours couvre déjà leadership, communication et désaccord. Cette simulation ajoute le dimensionnement organisationnel qui apparaît dans les rôles Staff réels : direction technique, alignement entre équipes, priorités et influence sans autorité. urlStaff Engineer guides : What do Staff engineers actually do?https://staffeng.com/guides/what-do-staff-engineers-actually-do/

## Scénario

L'apprenant reçoit un problème transversal impliquant au moins trois acteurs :

- équipe produit ;
- équipe plateforme ou infrastructure ;
- équipe cliente ou métier.

Chaque acteur possède :

- un objectif légitime ;
- une contrainte cachée ;
- une métrique différente ;
- une raison de refuser la première proposition.

## Cycle

```text
PROBLÈME FLOU
→ cadrage
→ proposition
→ objection équipe A
→ compromis
→ nouvelle contrainte équipe B
→ révision
→ décision
→ plan d'adoption
→ mesure d'impact
```

## Ce qui est évalué

- qualité technique ;
- clarté du problème ;
- compréhension des intérêts opposés ;
- capacité à distinguer non-négociable et négociable ;
- qualité du compromis ;
- répartition du travail ;
- adoption réelle ;
- capacité à laisser une décision meilleure que celle de départ.

## Anti-bullshit

La meilleure architecture techniquement n'obtient pas automatiquement le meilleur score.

Une architecture légèrement moins élégante mais correctement adoptée, mesurée et maintenue peut gagner.

## Preuve

L'apprenant produit :

1. one-pager de stratégie ;
2. carte des parties prenantes ;
3. décision + option rejetée ;
4. plan d'adoption ;
5. métrique de succès ;
6. message de désaccord respectueux ;
7. rétrospective après la simulation.
