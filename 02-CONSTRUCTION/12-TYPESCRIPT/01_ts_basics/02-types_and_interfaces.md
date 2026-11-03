---
perishability_id: PER-0021
stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes:
  - fausse_piste
  - changement_contexte
anti_recipe_key: fausse_piste+changement_contexte
transfer_distance: high
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
source_type: primary
review_interval: 6 mois
review_due: "2027-05-03"
source_scope: >-
  Documentation officielle TypeScript consultée pour « Types et interfaces : pas
  les mêmes armes ». La référence soutient le concept/version explicitement
  indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque
  snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées
  restent limitées au périmètre ci-dessous. Les sources officielles TypeScript
  couvrent les règles de declaration merging et les membres de même nom ; le
  Handbook Object Types confirme qu'un type incompatible sur une propriété
  fusionnée provoque une erreur de compilation. Cette vérification couvre les
  passages sur declaration merging corrigés dans cette leçon, pas toutes ses
  affirmations.
provenance_note: >-
  V6.4, 2026-11-03 : revue de référence réalisée sur deux pages officielles
  TypeScript. Le statut « verified_reference » est limité au périmètre indiqué ;
  il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue
  experte indépendante. Pour les informations volatiles, reconsulter la source à
  l'échéance ou avant toute décision. Le reste de la leçon n’a pas fait l’objet
  d’une revue exhaustive affirmation par affirmation.
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
additional_sources:
  - https://www.typescriptlang.org/docs/handbook/2/objects.html
claim_reviewed_on: "2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
---

**SCÈNE CRAZYDEVS : Garo :** ton armure ne rend pas le combat correct. Elle rend les erreurs plus difficiles à cacher. Le typage sert à la même chose : rendre les contradictions visibles tôt.

> **CrazyDevs : clan des ninjas :** une abstraction peut devenir une technique brillante ou une armure impossible à retirer. Le vrai skill est de savoir quand la jeter.

# Types et interfaces : pas les mêmes armes

Temps de lecture ~8 min

TypeScript te donne deux façons de décrire la forme d'un objet : `type` et `interface`.
La plupart des devs utilisent les deux au hasard. Mauvaise idée.
Ce ne sont pas des synonymes. Ils ont des comportements différents là où ça compte : l'extension, la fusion, et les types complexes.
Comprendre la différence, c'est ne plus jamais avoir de bug bizarre au moment où tu composes deux modules.

---

## 1) INTERFACE : LE CONTRAT QUI PEUT S'OUVRIR

Une interface décrit la forme d'un objet. Comme un accord signé entre deux modules : "cet objet aura ces propriétés, point".

```ts
interface Ninja {
  name: string;
  chakra: number;
  village: string;
}

// Le contrat est respecté : Naruto est bien un Ninja
const naruto: Ninja = {
  name: "Naruto",
  chakra: 9000,
  village: "Konoha",
};
```

Ce qui rend `interface` particulière : elle peut se **fusionner**.
Si tu déclares plusieurs fois une interface portant le même nom dans le même espace de déclaration, TypeScript réunit leurs membres au moment de la vérification des types. Cette fusion n'est pas automatiquement sans erreur : les membres non-fonctionnels de même nom doivent avoir le même type ; les méthodes de même nom suivent les règles de surcharge.
Cette opération ne crée pas, à elle seule, de propriété JavaScript à l'exécution.

```ts
interface Ninja {
  name: string;
}

interface Ninja {
  jutsu: string[]; // TypeScript ajoute ça à l'interface existante, pas d'erreur
}

// Maintenant Ninja = { name: string, jutsu: string[] }
const kakashi: Ninja = {
  name: "Kakashi",
  jutsu: ["Chidori", "Sharingan Copy"],
};
```

La fusion est possible parce que les deux déclarations ajoutent des membres compatibles. Exemple inverse : ce code doit produire une erreur de compilation (`TS2717`), car la propriété `score` n'a pas le même type dans les deux déclarations.

```ts
interface ScoreCard {
  score: number;
}

interface ScoreCard {
  score: string; // Erreur : les déclarations de score doivent avoir le même type.
}
```

C'est la **declaration merging** : le compilateur construit un contrat de type commun. C'est puissant, mais une augmentation globale ou de module mal maîtrisée peut rendre le typage trompeur. Elle ne modifie pas automatiquement l'objet JavaScript réellement créé.

---

## 2) TYPE : L'OUTIL QUI FAIT PLUS

`type` peut décrire tout ce qu'une interface peut décrire. Mais il va plus loin.

```ts
type Ninja = {
  name: string;
  chakra: number;
};

// Exactement pareil qu'avec interface pour un objet simple
const sasuke: Ninja = {
  name: "Sasuke",
  chakra: 7500,
};
```

Mais `type` peut aussi décrire des **unions**, des **intersections**, des **primitives**, des **tuples** :

```ts
// Union : un Ninja peut être vivant ou mort
type NinjaStatus = "alive" | "dead" | "missing";

// Intersection : un Ninja ET un Médecin en même temps
type MedicalNinja = Ninja & { healingPower: number };

// Tuple : une position en 2D, dans l'ordre exact
type Position = [number, number];

// Primitive aliasée : un ID est un string mais on lui donne un nom
type NinjaId = string;
```

Une interface ne peut pas faire ça. Tu essaies `interface NinjaStatus = "alive" | "dead"` : erreur immédiate.

---

## 3) EXTENSION : DEUX SYNTAXES, MÊME RÉSULTAT... PRESQUE

Les deux peuvent s'étendre. La syntaxe diffère.

```ts
// Interface étend une interface
interface Ninja {
  name: string;
  chakra: number;
}

interface SageNinja extends Ninja {
  sageMode: boolean; // un Ninja normal + le mode Sage
}

// Type étend un type (intersection)
type Ninja = {
  name: string;
  chakra: number;
};

type SageNinja = Ninja & {
  sageMode: boolean; // même résultat, syntaxe différente
};
```

La vraie différence : `interface extends` donne une erreur si les propriétés sont incompatibles.
`type &` silencieusement produit `never` si tu intersectes des types incompatibles.

```ts
interface A {
  value: string;
}

interface B extends A {
  value: number; // ERREUR : "number" n'est pas compatible avec "string"
}

type A = { value: string };
type B = A & { value: number };
// Pas d'erreur à la déclaration.
// Mais B.value est de type "never" : string & number = impossible
// Ce type piège n'existera jamais en runtime:et TypeScript ne t'avertit pas tout de suite
```

Diagramme :

```text
interface extends interface --> erreur immédiate si conflit
type & type         --> never silencieux si conflit
```

---

## 4) LA RÈGLE SIMPLE POUR CHOISIR

```text
objet public d'une API / lib / module partagé  --> interface
 (la declaration merging permet à d'autres de l'étendre)

union / intersection / tuple / type complexe  --> type
 (interface ne peut pas faire ça)

objet interne à un fichier ou une fonction   --> type ou interface, peu importe
```

En pratique dans ce parcours : les types des modules exportés utilisent `interface`. Tout ce qui est complexe (union de statuts, tuples, types conditionnels) utilise `type`.

---

## 5) LE PIÈGE : DECLARATION MERGING EN PROD

C'est le bug classique avec les librairies tierces. Tu étends une interface depuis ta lib, sans le vouloir.

```ts
// quelque part dans ton code (ou dans un fichier d'un collègue)
interface Window {
  myCustomThing: () => void; // tu ajoutes ça à l'interface globale Window du navigateur
}

// maintenant PARTOUT dans ton projet, window.myCustomThing existe pour TypeScript
// mais pas en runtime si tu oublies de l'implémenter
window.myCustomThing(); // TypeScript : ok. Runtime : crash
```

`type Window = ...` aurait lancé une erreur : on ne peut pas redéclarer un `type`. L'interface le permet, silencieusement.

---

## EXERCICES

## EXO 1 : le vestiaire de l'équipe

_~10 min_

Tu construis le système de gestion d'une équipe de foot.
Un joueur a un nom, un numéro, un poste, et une nationalité.
Un capitaine est un joueur avec une propriété `armband: true` et un `yearsOfExperience: number`.

- Modélise `Player` et `Captain` avec des interfaces.
- Ajoute un troisième type `Transfer` : un joueur peut être transféré ou prêté. Utilise une union `type`.
- Bonus : essaie de mettre `value: string` dans Player et `value: number` dans Captain via `extends`. Lis l'erreur. Comprends pourquoi.

## EXO 2 : le réseau de distribution de Walter

_~12 min_

Tu modélises les noeuds d'un réseau.
Un noeud a un `id: string`, un `location: string`, et un `riskLevel: "low" | "medium" | "high"`.
Certains noeuds sont des `DistributionHub` : ils ont en plus un `capacity: number` et une liste de `connectedNodes: string[]`.

- Modélise avec `interface` et `extends`.
- Ajoute un type `NetworkEdge = [string, string, number]` pour représenter une arête (noeud A, noeud B, poids de la route).
- Essaie la même chose avec une interface. Observe le résultat.

## EXO 3 : le bug silencieux

_~15 min_

```ts
type EntityA = { id: string; score: number };
type EntityB = EntityA & { score: string };

declare const e: EntityB;
e.score; // quel est le type de score ici ?
```

Réponds sans lancer le code. Vérifie ensuite dans ton éditeur.
(indice : `string & number` donne quelque chose d'impossible)

---

## RÉSUMÉ

`interface` décrit la forme d'un objet et peut se fusionner. `type` fait tout ça plus les unions, intersections, tuples, et types complexes.
Pour les APIs publiques et les objets extensibles : `interface`. Pour tout ce qui dépasse la forme d'un objet : `type`.
La declaration merging est une différence du système de types : elle permet au compilateur de réunir des déclarations compatibles. Elle ne crée pas à elle seule de comportement runtime. Une augmentation de type peut néanmoins faire croire au code qu'une propriété existe alors qu'aucune valeur ne l'ajoute réellement ; teste donc aussi le comportement JavaScript.
Choisir au hasard entre les deux, c'est rendre les contrats de ton codebase plus difficiles à comprendre.

## CHECKPOINT DE PROFONDEUR : variation L : changement d'avis

Écris d'abord ton conseil actuel en une phrase. Puis invente une information nouvelle qui le rend mauvais. Révise ton conseil et explique précisément **quelle hypothèse a changé**, ce que tu conserves et ce que tu abandonnes.

### Vérification observable : critères de réussite

Ajoute un nouvel événement au contrat. Vérifie que les consommateurs exhaustifs signalent les branches oubliées et que les champs réellement optionnels sont traités.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: typescript -->

## Repères de décision

- **Pourquoi :** Le typage statique rend les formes de données explicites et déplace certaines erreurs au moment du développement, avant qu'elles arrivent aux utilisateurs.
- **Quand l’utiliser / quand l’éviter :** Utilise les types aux frontières de modules et dans les contrats partagés. Combine-les avec validation runtime pour les données externes ; n'écris pas des types avancés sans gain lisible.
- **Limites :** Les types TypeScript sont effacés à l'exécution. Un `as` ou un `any` peut faire taire le compilateur sans rendre la valeur vraie ; un `.d.ts` incorrect ment à tous les consommateurs.

## Mécanisme : la version sans magie

Décris l'état valide avec des types, utilise unions discriminées pour les variantes, génériques pour les comportements réutilisables et guards runtime pour les entrées inconnues.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Types et interfaces : pas les mêmes armes** se rattache à ce cas concret : L'API Kintana et le client mobile doivent partager un contrat de demande sans confondre brouillon, demande soumise et résultat d'erreur.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat TypeScript sûr entre API et client

> **Arc Konoha / Naruto :** le type est un contrat écrit entre les équipes. Il évite que chacun imagine une forme différente du même rouleau.

**Mission liée à « Types et interfaces : pas les mêmes armes » :** Type le contrat Kintana concerné par la leçon. Remplace les `any`/casts non justifiés, modélise les états et ajoute un parseur runtime aux données qui viennent du réseau.

**Livrable :** types, guard/parseur si nécessaire, test de compilation et test runtime de payload invalide.

**Critères d’acceptation :** les états impossibles sont évités par le type ; les données externes restent validées au runtime ; aucun `any` ajouté sans justification ; les versions du contrat sont explicites.

**Transfert obligatoire :** Fais évoluer le serveur avant le client. Distingue compatibilité source, compatibilité runtime et déploiement progressif.
