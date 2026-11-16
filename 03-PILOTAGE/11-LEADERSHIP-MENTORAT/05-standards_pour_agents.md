---
stability: evolutif
acte: pilotage
noyau: oui
cognitive_level: L9
perturbation_modes: [fausse_piste, regression]
anti_recipe_key: fausse_piste+regression
transfer_distance: low
assessment_role: staff_mastery
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "03-PILOTAGE/11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 03-PILOTAGE/11-LEADERSHIP-MENTORAT/01-00-why-leadership-mentorat.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : conseil de Konoha :** cinq ingénieurs, cinq idées, une personne qui ne parle plus depuis dix minutes. Ton rôle n'est pas seulement de gagner l'argument : c'est de récupérer l'information que le silence est en train de faire disparaître.

# Standards pour agents : diriger ce qui n'est pas humain

<!-- AF-DIAGRAM:agent -->

```text
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

Temps de lecture ~9 min. Livrable pédagogique : `STANDARDS-AGENTS-EXERCICE.md`.

Ce module enseigne la gouvernance d’un agent sans imposer son intégration au fil rouge.
`STANDARDS-AGENTS.md` est une preuve du système réel uniquement si celui-ci utilise des
agents ou automatisations autonomes qui prennent ou exécutent des décisions/actions.
Si le fil rouge n’en utilise pas, ne crée pas de fichier de gouvernance fictif : consigne
le non-usage et son périmètre dans `EVALUATION-IA.md`.

## 1) POURQUOI CE FICHIER EXISTE

Un agent n'a pas de jugement sur ce qui est irréversible. Il faut donc définir la frontière
de délégation avant toute utilisation réelle, plutôt que de la redire à chaque tâche.

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

Écris `STANDARDS-AGENTS-EXERCICE.md` avec les cinq sections remplies, puis choisis une voie :

- **Agent autonome réellement utilisé dans ton fil rouge :** applique le standard réel
  `STANDARDS-AGENTS.md` dans le périmètre autorisé, donne une tâche bornée à cet agent et
  conserve la commande, son résultat brut et les deux ambiguïtés observées. Ne lance pas
  d’action irréversible pour les besoins de l’exercice.
- **Aucun agent autonome dans ton fil rouge :** n’en installe pas et n’en introduis pas.
  Utilise le scénario de migration SQL ci-dessous comme simulation sur table ; vérifie que
  les cinq sections permettent de décider quoi autoriser, refuser ou faire valider. Marque
  le compte rendu `SIMULATION` et la commande hypothétique `NOT RUN`. Ne présente jamais
  la simulation comme une exécution réelle. Documente le choix de non-usage du fil rouge
  dans `EVALUATION-IA.md`.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

## Transfert vérifiable

Applique ce standard au scénario d’un agent qui propose une migration SQL. Si un agent autonome est réellement utilisé et que l’environnement est autorisé, vérifie le plan, le périmètre, le rollback, l’idempotence, la preuve sur base jetable et la revue humaine des opérations destructives. Sinon, traite exactement le même cas sur table et marque-le `SIMULATION`. **Vérification :** dans les deux voies, une simple explication ou un test sur mock ne suffit pas à franchir le gate ; consigne les artefacts manquants et le refus motivé. Une simulation ne prouve pas qu’un agent a été exécuté.
