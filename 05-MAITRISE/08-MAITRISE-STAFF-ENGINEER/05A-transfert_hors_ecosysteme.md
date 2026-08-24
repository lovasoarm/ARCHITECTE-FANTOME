## perishability_id: PER-0081

stability: perissable
acte: maitrise
noyau: oui
cognitive_level: L9
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: high
assessment_role: staff_mastery
review_due: 2027-12-31

---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 07 : Transfert hors écosystème

<!-- AF-DIAGRAM:transfer -->

```text
text
Principe appris
      │
      ▼
Nouveau contexte
      │
      ├── invariant ──► conserver
      │
      └── hypothèse cassée ─► adapter
                                │
                                ▼
                             nouvelle décision
```

Le transfert teste ce qui survit du principe et ce qui doit être révisé dans un contexte nouveau.

Temps de lecture ~2 min

Ce fichier est cité par [02-dossier_unique.md](02-dossier_unique.md) (section 9),
y compris comme **citation textuelle**. S'il manque sur le disque, le palier
terminal n'est pas franchissable même si tous les liens markdown sont verts.

## Mission

Choisis un service **non trivial** du fil rouge (pas un hello-world). Réécris la
partie déterminante dans un **second langage ou runtime** et déploie-la chez un
**second fournisseur**, sans recopier les détails accidentels de la première
solution (SDK, chemins, noms de tables « parce que c'était déjà là »).

## Contenu imposé de `PORTAGE.md`

1. Invariants conservés (contrats, SLO, plafond IA, schéma métier).
2. Décisions **repensées** et leur coût (ce qui n'a pas survécu au portage).
3. Delta mensuel constaté (même quatre postes que le relevé tarifaire).
4. SLO et RTO **mesurés** côté cible, chrono en main.
5. Preuve publique reproductible : dépôt ou archive, commandes exactes, dates.

Une différence de syntaxe n'est pas un transfert. L'épreuve porte sur les
contrats, les limites, les pannes et le coût.

## Validation solo

Dépôt public ou archive reproductible. Pas d'équipe réelle exigée. Modèle :
[S7-PORTAGE](../../06-ANNEXES-TRANSVERSES/17-PREUVES-MODELES/99-PORTAGE-MENTAL.md).

Le [boss fight](96-boss-fight.md) peut attaquer cette pièce : « qu'est-ce qui casse
si je change de fournisseur ? » : objection 18 du contradicteur.

## CHECKPOINT DE PROFONDEUR : variation G : boîte noire

Tu n'as plus le nom de la technologie ni l'exemple du cours. Décris uniquement le problème, le mécanisme, les invariants et les observations attendues. Puis indique quelle famille d'outils pourrait implémenter ce mécanisme et pourquoi ce choix n'est pas la compétence elle-même.
