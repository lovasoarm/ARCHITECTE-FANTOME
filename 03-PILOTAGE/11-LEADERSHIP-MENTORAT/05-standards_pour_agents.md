---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L9
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: staff_mastery
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# Standards pour agents : diriger ce qui n'est pas humain

<!-- AF-DIAGRAM:agent -->

```text
text
┌─────────┐
│ Goal    │
└────┬────┘
     ▼
┌─────────┐    tool    ┌──────────┐
│ Plan    │───────────►│ Tool     │
└────┬────┘            └────┬─────┘
     ▲                       │ result
     └──────── observe ◄─────┘
          │
          ▼
       done / loop
```

Un agent alterne planification, appel d’outil, observation du résultat et décision de poursuivre ou s’arrêter.

Temps de lecture ~9 min. Livrable : `STANDARDS-AGENTS.md`.

## 1) POURQUOI CE FICHIER EXISTE

Un agent n'a pas de jugement sur ce qui est irréversible. Il faut donc écrire la frontière à sa place,
une fois, par écrit, plutôt que de la redire à chaque tâche.

## 2) LES CINQ SECTIONS OBLIGATOIRES

1. **Décisions autonomes** : ce que l'agent fait sans demander (renommer une variable locale, ajouter
   un test, corriger une faute).
2. **Validations requises** : ce qui ne se fait jamais sans humain : migration de schéma, suppression
   de données, changement de contrat public, dépense, publication.
3. **Commande de vérification de sortie** : une commande unique, exécutable, qui dit oui ou non
   (par exemple `npm test && npm run lint`, ou toute autre commande de contrôle propre à ton projet).
4. **Coût plafond d'une tâche déléguée** : en euros et en temps mur. Au-delà, l'agent s'arrête et rend
   compte. Ce plafond doit être cohérent avec `06A-BUDGET-CLOUD.md`.
5. **Trace** : où l'agent écrit ce qu'il a fait, et comment on annule.

## 3) LE PRINCIPE DIRECTEUR

**Autonomie proportionnelle à la réversibilité.** Réversible en une commande → autonome. Irréversible
ou coûteux → validation humaine. Ce critère remplace toutes les listes d'interdits.

## 4) CE QUI SE VÉRIFIE, PAS CE QUI SE PROMET

Un standard non vérifiable par une commande n'est pas un standard. « Écris du code propre » ne se
vérifie pas ; « le lint passe et la couverture ne baisse pas » se vérifie.

## Exercice (25 min)

Écris `STANDARDS-AGENTS.md` pour ton fil rouge, les cinq sections remplies, puis **teste-le** : donne
une tâche à un agent avec ce fichier en contexte, et note les deux endroits où le fichier était flou.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.
