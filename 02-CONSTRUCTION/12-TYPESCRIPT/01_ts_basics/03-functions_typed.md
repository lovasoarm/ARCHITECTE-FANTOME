---
perishability_id: PER-0022

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [changement_contexte, changement_echelle]
anti_recipe_key: changement_contexte+changement_echelle
transfer_distance: medium
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://www.typescriptlang.org/docs/handbook/2/functions.html
source_type: primary
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Fonctions typées : signer un contrat avant d'exécuter ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : Garo :** ton armure ne rend pas le combat correct. Elle rend les erreurs plus difficiles à cacher. Le typage sert à la même chose : rendre les contradictions visibles tôt.

> **CrazyDevs : clan des ninjas :** une abstraction peut devenir une technique brillante ou une armure impossible à retirer. Le vrai skill est de savoir quand la jeter.

# Fonctions typées : signer un contrat avant d'exécuter

Temps de lecture ~8 min

Une fonction sans types, c'est un contrat oral. Ça marche jusqu'au jour où quelqu'un passe autre chose que ce qu'on avait dit.
TypeScript transforme ça en contrat écrit : le compilateur vérifie que tout le monde respecte les termes avant même que le code tourne.
En prod, ça veut dire des bugs détectés à la compilation, pas à 3h du matin sur une alerte Sentry.

---

## 1) SIGNATURE DE BASE : PARAMS ET RETOUR

```ts
// version JS : on sait rien. chakra peut être n'importe quoi
function calculateDamage(base, multiplier) {
  return base * multiplier;
}

// version TS : le contrat est signé
function calculateDamage(base: number, multiplier: number): number {
  return base * multiplier;
}

calculateDamage(100, 1.5); // ok : 150
calculateDamage("100", 1.5); // ERREUR : "100" n'est pas un number
calculateDamage(100); // ERREUR : multiplier est requis
```

Si la fonction ne retourne rien : `void`. Si elle ne peut jamais retourner (throw toujours) : `never`.

```ts
function logAttack(jutsu: string): void {
  console.log(`Jutsu lancé : ${jutsu}`);
  // pas de return : void
}

function failHard(reason: string): never {
  throw new Error(reason); // cette fonction ne finit jamais normalement
}
```

---

## 2) PARAMÈTRES OPTIONNELS ET DÉFAUTS

`?` rend un param optionnel. Il devient `string | undefined` à l'intérieur.

```ts
function summonNinja(name: string, village?: string): string {
  // ici village est string | undefined
  // si on l'utilise sans vérifier, TypeScript nous arrête
  return `${name} de ${village ?? "village inconnu"}`;
}

summonNinja("Naruto", "Konoha"); // ok
summonNinja("Naruto"); // ok aussi : village est undefined
```

Valeur par défaut : le param n'est plus optionnel dans la signature, TypeScript infère le type.

```ts
function createNinja(name: string, chakra: number = 1000) {
  // chakra est number, pas number | undefined
  return { name, chakra };
}
```

---

## 3) TYPE ALIAS ET INTERFACE POUR LES FONCTIONS

On peut typer une fonction elle-même, pas juste ses params.

```ts
// type alias pour une signature de fonction
type AttackFn = (target: string, power: number) => void;

// une fonction qui respecte ce type
const rasengan: AttackFn = (target, power) => {
  console.log(`${target} prend ${power} dégâts`);
};

// interface pour un objet callable (rare mais ça existe)
interface Jutsu {
  name: string;
  execute: (target: string) => void;
}

const chidori: Jutsu = {
  name: "Chidori",
  execute: (target) => console.log(`${target} touché`),
};
```

Diagramme :

```text
type AttackFn = (target: string, power: number) => void
    |        |       |       |
  nom du type   param 1     param 2    retour
```

---

## 4) OVERLOADS : PLUSIEURS SIGNATURES, UNE IMPLÉMENTATION

Quand une fonction peut recevoir des types différents et retourner des choses différentes selon ce qu'elle reçoit.

```ts
// les signatures visibles par l'extérieur
function parseScore(input: string): number;
function parseScore(input: number): string;
// l'implémentation réelle (pas visible depuis l'extérieur)
function parseScore(input: string | number): string | number {
  if (typeof input === "string") return parseInt(input, 10);
  return input.toString();
}

parseScore("42"); // TypeScript sait que ça retourne number
parseScore(42); // TypeScript sait que ça retourne string
```

Attention : l'overload ne sert à rien si tu peux juste utiliser une union. Il sert quand le **retour** dépend du **type de l'input**.

```text
input: string --> retour: number
input: number --> retour: string
```

Sans overload, TypeScript dirait "ça retourne string | number" et tu perdrais la précision.

---

## 5) CALLBACKS TYPÉS

Un callback non typé, c'est une porte ouverte aux bugs silencieux.

```ts
// version dangereuse
function onMatchEnd(callback: Function) {
  callback(90, "1-0"); // on passe deux args mais TypeScript s'en fout
}

// version correcte
function onMatchEnd(callback: (minute: number, score: string) => void): void {
  callback(90, "1-0");
}

// si tu passes un callback avec la mauvaise signature
onMatchEnd((minute, score, extra) => console.log(extra));
// ERREUR : le callback attend (number, string), pas un troisième arg
```

Pour les callbacks async :

```ts
function fetchPlayer(
  id: string,
  onSuccess: (player: { name: string; rating: number }) => Promise<void>,
): void {
  // ...
}
```

---

## 6) LE PIÈGE : `any` DANS LES CALLBACKS

```ts
// ce code compile. mais c'est une bombe à retardement
function process(data: any, transform: (x: any) => any): any {
  return transform(data);
}

// TypeScript ne vérifie plus rien ici
process(42, (x) => x.toUpperCase()); // compile. crash en runtime : 42.toUpperCase() n'existe pas
```

`any` dans une signature de fonction désactive TypeScript pour tout ce qui passe par là.
Règle : si tu te retrouves à écrire `any`, c'est le signe que tu as besoin d'un générique (module suivant) ou que tu as mal modélisé ton type.

---

## EXERCICES

## EXO 1 : le système de stats d'un match

_~10 min_

Tu construis une fonction `computeStats` qui prend une liste de tirs (`{ onTarget: boolean, power: number }[]`) et retourne un objet `{ totalShots: number, onTargetRate: number, avgPower: number }`.
Signe la fonction complètement. Pas d'inférence laissée au hasard.

## EXO 2 : le dispatcher de missions de Garo

_~15 min_

Une fonction `dispatchMission` reçoit un type de Horror (`"low" | "medium" | "high"`) et retourne :

- si `"low"` : `{ knight: string, eta: number }`
- si `"medium"` ou `"high"` : `{ knight: string, backup: string, eta: number }`

Modélise ça avec des overloads. Sans overloads, TypeScript ne peut pas distinguer les deux cas de retour.

## EXO 3 : le callback de vote

_~15 min_

Tu construis un système de vote pour le Ballon d'Or.
Une fonction `registerVote` prend :

- `playerId: string`
- `points: number`
- `onSuccess: (updatedRank: number) => void`
- `onError: (reason: string) => void`

Signe tout. Appelle la fonction avec un callback incorrect et observe l'erreur.

---

## RÉSUMÉ

Typer une fonction, c'est signer un contrat : inputs attendus, output garanti.
Les overloads permettent d'exprimer "selon ce que tu passes, tu reçois quelque chose de précis", sans perdre la précision du retour.
Les callbacks non typés sont la source numéro un de bugs silencieux en TypeScript : si tu passes `Function` au lieu d'une signature précise, tu as juste du JS déguisé.
`any` dans une signature désactive toute vérification pour tout ce qui passe par là. C'est la porte par laquelle les bugs entrent.

## CHECKPOINT DE PROFONDEUR : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

<!-- AF-LESSON-PROFILE: contract -->

## Repères de décision

- **Pourquoi :** Les tests de contrat vérifient que deux composants indépendants restent compatibles sur leurs échanges, sans devoir lancer tout le système à chaque changement.
- **Quand l’utiliser / quand l’éviter :** Utilise-les quand un client et un fournisseur évoluent séparément ou sont déployés à des rythmes différents. Ne les confonds pas avec des tests unitaires ni avec une preuve complète d'intégration.
- **Limites :** Un contrat ne prouve que les interactions décrites. Il ne prouve pas les performances, la sécurité globale, la sémantique métier non modélisée ni la compatibilité de toutes les versions possibles.

## Mécanisme : la version sans magie

Le consommateur décrit les interactions attendues ; le fournisseur vérifie qu'il les satisfait ; le contrat versionné est exécuté dans le pipeline des deux côtés.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Fonctions typées : signer un contrat avant d'exécuter** se rattache à ce cas concret : Le client mobile Kintana peut rester plusieurs versions derrière l'API. Un changement de champ ou d'erreur doit être détecté avant déploiement.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Compatibilité API entre client et fournisseur

> **Arc One Piece / Grand Line :** un contrat d'API est une promesse entre équipages. Si le fournisseur change sa réponse sans prévenir, le client échoue en mer.

**Mission liée à « Fonctions typées : signer un contrat avant d'exécuter » :** Définis un contrat pour une opération Kintana consommée par le client web/mobile. Ajoute les réponses nominales, erreurs stables, champs obligatoires/optionnels et une version de contrat. Fais vérifier le contrat par le fournisseur et simule un client ancien.

**Livrable :** contrat OpenAPI ou pacte consommateur-fournisseur, fixtures, vérification côté fournisseur et test de compatibilité d'une ancienne version.

**Critères d’acceptation :** la rupture intentionnelle échoue dans le test ; les erreurs et champs sont documentés ; le contrat reflète le comportement réellement implémenté ; les limites non couvertes sont nommées.

**Transfert obligatoire :** Le fournisseur ajoute un champ ou change un code d'erreur. Décide si l'évolution est compatible et teste le déploiement dans l'ordre inverse.
