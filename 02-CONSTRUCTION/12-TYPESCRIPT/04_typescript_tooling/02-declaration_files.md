---
perishability_id: PER-0032

stability: "perissable"
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, decision_inversee]
anti_recipe_key: decision_organisationnelle+decision_inversee
transfer_distance: low
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html"
source_type: "primary"
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Declaration files : .d.ts, écrire les types pour du JS sans types ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : clan des ninjas :** une abstraction peut être une technique secrète… ou une montagne de parchemins pour un problème de trois lignes. Ton défi est de savoir laquelle des deux tu construis.

# Declaration files : .d.ts, écrire les types pour du JS sans types

Temps de lecture ~8 min

Michael a accès au plan de Fox River, mais c'est un vieux plan, dessiné à la main, sans légende. Il sait que chaque salle existe, mais pas ce qu'elle contient exactement. Un fichier `.d.ts` c'est cette légende qu'on rajoute par-dessus : ça décrit la FORME de quelque chose qui existe déjà, sans le réécrire.

---

## 1) LE CONCEPT : DÉCRIRE SANS IMPLÉMENTER

```js
// Une lib JS classique, sans aucun type, genre "fox-river-utils.js"
function calculerTempsEvasion(distance, vitesse) {
  return distance / vitesse;
}

module.exports = { calculerTempsEvasion };
```

```ts
// Le fichier de déclaration correspondant : "fox-river-utils.d.ts"
// Note : AUCUNE implémentation ici, juste la FORME de la fonction
declare function calculerTempsEvasion(
  distance: number,
  vitesse: number,
): number;

export { calculerTempsEvasion };
```

```text
fichier .js  --> contient le VRAI code qui s'exécute
fichier .d.ts --> contient SEULEMENT la description des types, jamais exécuté
```

**Technique :** un fichier `.d.ts` décrit des types ; il ne contient pas d’implémentation JavaScript à exécuter. Le consommateur s’en sert pendant l’analyse statique, pas à l’exécution. En revanche, TypeScript peut produire des fichiers `.d.ts` à partir de fichiers `.ts` lorsque `declaration` est activé (et peut ne produire que ces déclarations avec `emitDeclarationOnly`). Il faut donc distinguer le fichier de déclaration du code source qui a servi à le générer.

**Qui casse en prod :** un `.d.ts` qui ment sur la vraie signature de la fonction JS qu'il décrit. TypeScript te dit "c'est sûr, ça retourne un `number`", mais le JS réel retourne parfois `undefined` dans un cas que le `.d.ts` a pas prévu. Le compilateur te fait confiance aveuglément sur ce fichier, et plante en silence à l'exécution.

---

## 2) D'OÙ VIENNENT LES TYPES D'UNE LIB EXTERNE

Trois situations possibles quand t'importes une lib npm :

```text
SITUATION 1 : la lib inclut ses propres types
package.json de la lib --> "types": "dist/index.d.ts"
Rien à faire, ça marche directement.

SITUATION 2 : la lib n'a pas de types, mais la communauté en a écrit
npm install --save-dev @types/nom-de-la-lib
DefinitelyTyped (le plus gros repo de types communautaires) maintient ça.

SITUATION 3 : aucun type n'existe nulle part
Tu écris ton propre .d.ts, ou tu déclares un module en mode "boîte noire"
```

```ts
// SITUATION 3 : déclaration minimale "boîte noire" pour faire taire TS
// (utile en dépannage, pas en solution finale propre)
declare module "lib-sans-types-du-tout";

// Maintenant TypeScript accepte l'import, mais tout est typé "any" implicitement
import { uneFonction } from "lib-sans-types-du-tout";
```

**Pourquoi ça compte :** la situation 3, déclarer un module en boîte noire, c'est un pansement, pas un traitement. Ça fait taire l'erreur de compilation, mais ça te prive de tout l'intérêt de TypeScript sur cette lib. À utiliser en dernier recours, jamais comme habitude.

---

## 3) ÉCRIRE UN .D.TS RÉEL : LE PLAN DÉTAILLÉ DE LA SALLE

```js
// fox-river-comms.js (le vrai code JS de la lib, sans types)
class RadioCrypte {
  constructor(frequence) {
    this.frequence = frequence;
    this.historique = [];
  }

  envoyer(message) {
    this.historique.push(message);
    return true;
  }

  recevoir() {
    return this.historique.pop() || null;
  }
}

module.exports = { RadioCrypte };
```

```ts
// fox-river-comms.d.ts (le plan détaillé, écrit à côté)
declare class RadioCrypte {
  constructor(frequence: number);

  frequence: number;
  historique: string[];

  envoyer(message: string): boolean;
  recevoir(): string | null;
}

export { RadioCrypte };
```

```ts
// Maintenant, côté consommateur, TypeScript connaît TOUT de RadioCrypte
import { RadioCrypte } from "./fox-river-comms";

const radio = new RadioCrypte(145.5);
radio.envoyer("Le plan est en mouvement"); // autocomplétion ET vérification de type
const dernierMessage = radio.recevoir(); // TS sait que c'est "string | null"
```

**Technique :** le mot-clé `declare` indique à TypeScript "fais-moi confiance, cette chose existe quelque part au runtime (à l'exécution), décris juste sa forme, t'as pas besoin de l'implémenter ici". C'est ce qui sépare un `.d.ts` d'un fichier `.ts` normal.

**Risque réel :** `recevoir()` retourne `string | null` dans le `.d.ts`, ce qui force chaque appelant à gérer le cas `null`. Si le `.d.ts` avait juste dit `string` (en mentant), TypeScript laisserait passer du code qui plante à l'exécution sur `null`. La précision du `.d.ts` EST la protection.

---

## 4) AMBIENT DECLARATIONS : QUAND TS NE SAIT MÊME PAS QUE LE TRUC EXISTE

Certaines choses n'ont jamais été des modules importables : des variables globales injectées par un script externe, des propriétés ajoutées à `window` par une lib tierce chargée en `<script>`.

```ts
// global.d.ts
// On dit à TypeScript : "il existe une variable globale FOX_RIVER_CONFIG,
// injectée par un script chargé avant le tien, fais-lui confiance"
declare global {
  interface Window {
    FOX_RIVER_CONFIG: {
      planActif: boolean;
      niveauAlerte: number;
    };
  }
}

export {}; // nécessaire pour que ce fichier soit traité comme un module
```

```ts
// N'importe où dans ton code, maintenant typé correctement :
if (window.FOX_RIVER_CONFIG.planActif) {
  console.log(`Niveau d'alerte : ${window.FOX_RIVER_CONFIG.niveauAlerte}`);
}
// Sans ce .d.ts, TypeScript hurlerait : "Property 'FOX_RIVER_CONFIG' does not exist on type 'Window'"
```

**Pourquoi ça marche :** `declare global` étend une interface existante de TypeScript (ici `Window`) au lieu d'en créer une nouvelle. C'est une fusion de déclarations (declaration merging), une fonctionnalité propre à TS qui permet d'ajouter des propriétés à des types déjà définis ailleurs, y compris dans les types natifs du navigateur.

---

## EXERCICES

EXO 1 : Le plan retrouvé :
Prends une petite lib JS sans types (écris-en une toi-même, genre 2-3 fonctions utilitaires), écris son `.d.ts` correspondant, puis importe-la dans un fichier `.ts` et vérifie que l'autocomplétion et la vérification de type fonctionnent.

EXO 2 : Le plan qui ment :
Dans le `.d.ts` que tu viens d'écrire, fais mentir volontairement une signature (genre une fonction qui peut retourner `undefined` mais que tu déclares comme retournant toujours un `string`). Écris du code qui exploite ce mensonge et observe le crash silencieux à l'exécution, malgré une compilation TS réussie.

EXO 3 : La variable globale planquée :
Crée un `global.d.ts` qui déclare une propriété custom sur `window` (ou sur `globalThis` si t'es en environnement Node). Vérifie que TypeScript accepte ton code une fois la déclaration en place, et qu'il le refusait avant.

---

## RÉSUMÉ

Un `.d.ts` décrit la forme de quelque chose qui existe déjà ailleurs, il n'implémente jamais rien et n'est jamais exécuté. `declare` dit à TypeScript de te faire confiance sur l'existence d'une chose au runtime. La précision d'un `.d.ts` est ta seule protection : un type trop optimiste te fait perdre exactement ce que TypeScript est censé t'apporter. `declare global` étend des types existants via la fusion de déclarations, utile pour les variables globales injectées de l'extérieur. Un `.d.ts` mal écrit, c'est un plan de Fox River qui ment sur l'emplacement d'un mur : tu fonces dedans en pensant qu'il y a une porte.

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « Declaration files : .d.ts, écrire les types pour du JS sans types » à un producteur ancien qui cohabite avec un nouveau contrat. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: typescript -->

## Repères de décision

- **Pourquoi :** Le typage statique rend les formes de données explicites et déplace certaines erreurs au moment du développement, avant qu'elles arrivent aux utilisateurs.
- **Quand l’utiliser / quand l’éviter :** Utilise les types aux frontières de modules et dans les contrats partagés. Combine-les avec validation runtime pour les données externes ; n'écris pas des types avancés sans gain lisible.
- **Limites :** Les types TypeScript sont effacés à l'exécution. Un `as` ou un `any` peut faire taire le compilateur sans rendre la valeur vraie ; un `.d.ts` incorrect ment à tous les consommateurs.

## Mécanisme : la version sans magie

Décris l'état valide avec des types, utilise unions discriminées pour les variantes, génériques pour les comportements réutilisables et guards runtime pour les entrées inconnues.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Declaration files : .d.ts, écrire les types pour du JS sans types** se rattache à ce cas concret : L'API Kintana et le client mobile doivent partager un contrat de demande sans confondre brouillon, demande soumise et résultat d'erreur.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat TypeScript sûr entre API et client

> **Arc Konoha / Naruto :** le type est un contrat écrit entre les équipes. Il évite que chacun imagine une forme différente du même rouleau.

**Mission liée à « Declaration files : .d.ts, écrire les types pour du JS sans types » :** Type le contrat Kintana concerné par la leçon. Remplace les `any`/casts non justifiés, modélise les états et ajoute un parseur runtime aux données qui viennent du réseau.

**Livrable :** types, guard/parseur si nécessaire, test de compilation et test runtime de payload invalide.

**Critères d’acceptation :** les états impossibles sont évités par le type ; les données externes restent validées au runtime ; aucun `any` ajouté sans justification ; les versions du contrat sont explicites.

**Transfert obligatoire :** Fais évoluer le serveur avant le client. Distingue compatibilité source, compatibilité runtime et déploiement progressif.

## Références officielles utiles

> **Référence principale vérifiée le 2 novembre 2026 :** la première ressource de ce panneau, également enregistrée dans `source_url`, a été consultée pour le mécanisme versionné traité ici. Les autres liens sont des compléments officiels utiles ; ils ne constituent pas chacun une attestation indépendante de l’exemple du curriculum. Aucune référence ne prouve que l’exemple a été exécuté. Vérifie la version cible et teste dans ton environnement avant un usage réel.

- [TypeScript : Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [TypeScript : emitDeclarationOnly](https://www.typescriptlang.org/tsconfig/emitDeclarationOnly.html)
