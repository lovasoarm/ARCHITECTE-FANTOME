---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [temps_limite, decision_organisationnelle]
anti_recipe_key: temps_limite+decision_organisationnelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Garo :** la règle est simple jusqu'au jour où un état caché traverse une frontière. À partir de là, le “petit raccourci” devient le Horror qui te poursuit pendant trois heures.

# Prototypes : expliqué à 3 publics

<!-- AF-DIAGRAM:prototype -->

```text
┌──────────────┐
│ objet        │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ prototype    │
└──────┬───────┘
       │ [[Prototype]]
       ▼
┌──────────────┐
│ Object.proto │
└──────────────┘
```

Une propriété absente sur l’objet est recherchée le long de sa chaîne de prototypes.

Temps de lecture ~2 min

-> ~10 min

## À UN ENFANT

Imagine un dictionnaire des mots que tu connais. Quand ta maîtresse te demande un mot que tu ne connais pas, tu ne dis pas "je ne sais pas" tout de suite : tu vas d'abord demander à ton grand frère, puis à ton père si ton frère ne sait pas, puis au dictionnaire de la maison. En JS, chaque objet a un "grand frère" (son prototype). Quand tu demandes une propriété qu'il n'a pas, il va la chercher chez son grand frère, puis chez le grand frère de son grand frère, jusqu'à `null`. C'est la **chaîne de prototypes**.

## À UN PAIR DEV

Tout objet a un lien interne `[[Prototype]]` (exposé via `Object.getPrototypeOf`). La résolution de propriété remonte cette chaîne jusqu'à `null`. `class Foo extends Bar` sucre sur `Foo.prototype.__proto__ = Bar.prototype`. Points chauds :

- `Object.create(null)` = objet SANS prototype, utile pour éviter la pollution.
- `Object.prototype.hasOwnProperty` vs `in` : le premier ignore la chaîne, le second la traverse.
- Prototype pollution : injecter `__proto__.polluted = true` corrompt **tous** les objets. Vecteur d'attaque réel (CVE Lodash 2019).

## À UN CTO

Les prototypes sont la mécanique sous-jacente de `class` en JS : un dev qui ne comprend que le sucre `class` sans le prototype chain se plantera sur (1) les questions de sécurité (prototype pollution), (2) les perfs (méthodes définies dans le constructeur vs sur le prototype), (3) le debug de code legacy pré-ES6. Le prototype chain est **le** différenciateur JS vs Java/C# : ignorer ça, c'est ignorer la nature du langage.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Pratique autonome : production attendue

À partir de « Prototypes : expliqué à 3 publics », produis une variante indépendante du cas suivant : Trois fabricants exposent des interfaces différentes ; le domaine doit exploiter un contrat commun sans connaître les SDK. Travaille sans recopier la solution de la leçon ; conserve l’entrée, les hypothèses, la sortie attendue et un artefact vérifiable (code, requête, schéma, trace ou décision).

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: oop-explain-prototypes -->

## Repères de décision

- **Pourquoi :** Expliquer les prototypes à plusieurs publics vérifie que tu sais passer d’une intuition simple au mécanisme exact, puis à ses conséquences de conception et de maintenance.
- **Quand l’utiliser / quand l’éviter :** Adapte le niveau de détail au besoin : analogie pour introduire la recherche de propriété, vocabulaire précis pour un pair, risques et coûts pour une décision de direction. Ne remplace jamais la mécanique réelle par une analogie lorsqu’une décision dépend du détail.
- **Limites :** Une analogie simplifie et peut masquer des différences ; la chaîne de prototypes n’est pas une hiérarchie de classes nominales. Les conséquences de performance ou de sécurité doivent être mesurées ou bornées, pas déduites d’une métaphore.

## Mécanisme : la version sans magie

Une propriété propre est prioritaire. Si elle n’existe pas, JavaScript remonte le lien `[[Prototype]]` de l’objet, puis celui du prototype, jusqu’à `null`. `Constructor.prototype` est l’objet vers lequel les instances créées par `new Constructor()` pointent par défaut ; ce n’est pas le prototype de la fonction constructrice elle-même.

## Ancrage produit / terrain : Kintana

Un reviewer Kintana doit pouvoir expliquer pourquoi deux adaptateurs partagent une méthode, mais conservent chacun leur configuration. Le même mécanisme doit être présenté simplement à un nouvel arrivant, précisément à un pair et en termes de risque à un décideur.

## Mission utile : Kintana : expliquer une chaîne réelle

**Livrable :** un diagramme de chaîne prototype et trois explications du même exemple : une analogie courte, une explication technique avec `Object.getPrototypeOf` et `Object.hasOwn`, puis une note sur le coût et les risques pour le système.

**Critères d’acceptation :** les trois explications décrivent le même mécanisme ; la distinction entre propriété propre et héritée est exacte ; les limites de l’analogie sont indiquées ; aucune promesse de performance ou de sécurité n’est inventée.

**Transfert obligatoire :** explique à ces trois publics pourquoi une structure avec `Object.create(null)` se comporte différemment et dans quel cas elle est utile.
