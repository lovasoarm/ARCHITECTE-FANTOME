---
perishability_id: PER-0023

stability: perissable
acte: comprendre
cognitive_level: L4
perturbation_modes: [fausse_piste, changement_echelle]
anti_recipe_key: fausse_piste+changement_echelle
transfer_distance: medium
assessment_role: diagnostic_mastery
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://www.typescriptlang.org/docs/handbook/2/classes.html
source_type: primary
review_interval: "3 mois"
review_due: "2027-02-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « Classes typescript : l'armure avant le combat ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

**SCÈNE CRAZYDEVS : Garo :** ton armure ne rend pas le combat correct. Elle rend les erreurs plus difficiles à cacher. Le typage sert à la même chose : rendre les contradictions visibles tôt.

> **CrazyDevs : clan des ninjas :** une abstraction peut devenir une technique brillante ou une armure impossible à retirer. Le vrai skill est de savoir quand la jeter.

# Classes typescript : l'armure avant le combat

Temps de lecture ~8 min

Les classes JS existent depuis ES6. Les classes TypeScript, c'est les mêmes avec un casque, des gants, et une épée.
`public`, `private`, `protected`, `readonly`, `abstract` : chaque mot-clé est une contrainte délibérée sur ce qui peut toucher quoi.
En prod, ça veut dire des modules qui ne se marchent pas dessus, des données qu'on ne modifie pas par accident, et des erreurs détectées avant que le code tourne.

---

## 1) LA BASE : PROPRIÉTÉS ET CONSTRUCTEUR

Sans TypeScript, les propriétés d'une classe existent à partir du moment où tu les affectes. Avec TypeScript, elles sont déclarées avant et leur type est fixé.

```ts
class Ninja {
  name: string; // propriété déclarée, TypeScript sait que c'est un string
  chakra: number; // pareil pour chakra
  village: string;

  constructor(name: string, chakra: number, village: string) {
    this.name = name;
    this.chakra = chakra;
    this.village = village;
  }

  attack(): string {
    return `${this.name} lance un jutsu avec ${this.chakra} chakra`;
  }
}

const naruto = new Ninja("Naruto", 9000, "Konoha");
naruto.name; // ok
naruto.chakra; // ok
```

Raccourci : tu peux déclarer et initialiser les propriétés directement dans le constructeur.

```ts
class Ninja {
  constructor(
    public name: string, // public : accessible partout
    public chakra: number, // TypeScript crée la propriété ET l'initialise
    public village: string,
  ) {}
}
// identique à la version longue ci-dessus, juste plus court
```

---

## 2) PUBLIC, PRIVATE, PROTECTED

C'est là que les classes TypeScript deviennent des outils d'architecture, pas juste du sucre syntaxique.

```ts
class KnightArmor {
  public knight: string; // visible et modifiable depuis n'importe où
  private durability: number; // visible seulement dans cette classe
  protected energy: number; // visible dans cette classe ET ses sous-classes

  constructor(knight: string) {
    this.knight = knight;
    this.durability = 100;
    this.energy = 99.9;
  }

  takeDamage(amount: number): void {
    this.durability -= amount; // ok : on est dans la classe
    if (this.durability <= 0) {
      throw new Error("L'armure s'est désintégrée. Mission échouée.");
    }
  }
}

const armor = new KnightArmor("Leon");
armor.knight; // ok : public
armor.durability; // ERREUR : propriété private
armor.energy; // ERREUR : propriété protected
armor.takeDamage(20); // ok : méthode publique
```

Diagramme d'accès :

```text
          dans la classe  sous-classe  extérieur
public       oui       oui      oui
protected      oui       oui      non
private       oui       non      non
```

`private` TypeScript est principalement une restriction vérifiée par le compilateur ; `#` est une propriété privée native vérifiée au runtime. Utilise `#` lorsque tu veux empêcher l’accès ordinaire à un champ depuis l’extérieur. **Ce n’est pas un coffre à secrets ni une frontière de sécurité** : ne stocke pas de clés, mots de passe ou jetons secrets dans un objet côté client.

```ts
class KnightArmor {
  #durability: number = 100; // private natif JS : inaccessible même via reflection
}
```

---

## 3) READONLY : IMMUABLE APRÈS CONSTRUCTION

`readonly` interdit toute modification après l'initialisation dans le constructeur.

```ts
class Player {
  readonly id: string; // fixé une fois, jamais modifié
  name: string;

  constructor(id: string, name: string) {
    this.id = id; // ok : on est dans le constructeur
    this.name = name;
  }

  rename(newName: string): void {
    this.name = newName; // ok : name n'est pas readonly
    this.id = "autre"; // ERREUR : impossible de modifier id après construction
  }
}
```

`readonly` dans les interfaces et les types aussi :

```ts
interface MatchResult {
  readonly homeTeam: string;
  readonly awayTeam: string;
  readonly score: [number, number];
  // une fois créé, ce résultat ne change plus
}
```

---

## 4) ABSTRACT : LE CONTRAT QU'ON NE PEUT PAS INSTANCIER

Une classe `abstract` définit une structure sans l'implémenter complètement.
Elle ne peut pas être instanciée directement. Elle sert de base pour les sous-classes.

```ts
abstract class Horror {
  abstract readonly name: string; // chaque Horror a un nom, défini par la sous-classe
  abstract attack(target: string): void; // chaque Horror attaque différemment

  // une méthode concrète partagée par tous les Horrors
  manifest(): void {
    console.log(`${this.name} apparaît dans l'ombre`);
  }
}

class BladeHorror extends Horror {
  readonly name = "Blade Horror";

  attack(target: string): void {
    console.log(`${this.name} lacère ${target}`);
  }
}

const horror = new Horror(); // ERREUR : impossible d'instancier une classe abstraite
const blade = new BladeHorror(); // ok
blade.manifest(); // ok : hérité de Horror
blade.attack("Leon"); // ok : implémenté dans BladeHorror
```

Diagramme :

```text
Horror (abstract)
 |-- BladeHorror  --> implémente attack()
 |-- FlameHorror  --> implémente attack()
 |-- ShadowHorror  --> implémente attack()
```

Chaque Horror est différent. Mais ils partagent tous `manifest()` et tous doivent implémenter `attack()`.

---

## 5) IMPLEMENTS : FORCER UNE CLASSE À RESPECTER UNE INTERFACE

Une classe peut `extend` une autre classe (héritage). Elle peut aussi `implement` une interface (contrat).

```ts
interface Auditable {
  createdAt: Date;
  updatedAt: Date;
  audit(): string;
}

class Transaction implements Auditable {
  createdAt: Date;
  updatedAt: Date;
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  audit(): string {
    return `Transaction de ${this.amount} le ${this.createdAt.toISOString()}`;
  }
}
```

Si `Transaction` n'implémente pas `audit()` ou n'a pas `createdAt` : erreur de compilation. Le contrat n'est pas respecté.

---

## 6) LE PIÈGE : PRIVATE NE PROTÈGE PAS EN RUNTIME

```ts
class WaltherVault {
  private secret: string = "methylamine";
}

const vault = new WaltherVault();
console.log((vault as any).secret); // compile. affiche "methylamine".
```

TypeScript `private` est une vérification statique. Elle disparaît à la compilation. Le JS généré est un objet normal. Quelqu'un qui cast en `any` contourne tout.

Pour une encapsulation au runtime : `#` natif JavaScript ou une closure. Pour protéger un secret, garde-le hors du client et applique des contrôles d’accès côté serveur.

---

## EXERCICES

## EXO 1 : le Chevalier d'Or

_~15 min_

Modélise un `GoldKnight` avec :

- `name` : public, readonly
- `energy` : protected (accessible dans la sous-classe `SilverKnight`)
- `#secretTechnique` : private natif JS
- une méthode abstraite `fight(horror: string): string`
- une méthode concrète `introduce(): string` qui retourne le nom du chevalier

Crée une sous-classe `SilverKnight extends GoldKnight` qui implémente `fight()`.
Vérifie qu'on ne peut pas accéder à `#secretTechnique` depuis `SilverKnight`.

## EXO 2 : le système d'inventaire du camp

_~15 min_

Inspiré de Walking Dead. Le camp a un inventaire.

Crée une classe `Inventory` avec :

- `readonly campId: string`
- `private items: Map<string, number>` (item name → quantity)
- méthode `add(item: string, qty: number): void`
- méthode `consume(item: string, qty: number): void` : lance une `InsufficientSupplyError` si pas assez
- méthode `report(): { item: string; qty: number }[]` : retour typé, pas d'`any`

Bonus : crée une interface `Auditable` avec `audit(): string` et fais implémenter `Inventory`.

## EXO 3 : le bug de l'any

_~20 min_

```ts
class SecureVault {
  private pin: string = "1234";
  validate(input: string): boolean {
    return input === this.pin;
  }
}

const vault = new SecureVault();
// Comment accéder à pin sans passer par validate() ?
// Fais-le. Comprends pourquoi c'est possible.
// Qu'est-ce qui aurait vraiment bloqué l'accès ?
```

---

## RÉSUMÉ

`public` / `private` / `protected` définissent qui peut toucher quoi. Pas juste une convention : TypeScript bloque à la compilation.
`readonly` garantit qu'une propriété est fixée une fois pour toutes après la construction. Essentiel pour les identifiants et les configs.
`abstract` force les sous-classes à implémenter ce qui manque. C'est un contrat avec le compilateur, pas avec les humains.
`private` TypeScript est une restriction statique. `#` natif JS conserve l’encapsulation au runtime, mais ni l’un ni l’autre ne remplace une gestion sécurisée des secrets côté serveur.
`implements` sépare le contrat (interface) de l'implémentation (classe) : deux modules peuvent respecter le même contrat sans se connaître.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Transfert : changer de contexte

Applique le mécanisme de « Classes typescript : l'armure avant le combat » à un producteur ancien qui cohabite avec un nouveau contrat. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: typescript -->

## Repères de décision

- **Pourquoi :** Le typage statique rend les formes de données explicites et déplace certaines erreurs au moment du développement, avant qu'elles arrivent aux utilisateurs.
- **Quand l’utiliser / quand l’éviter :** Utilise les types aux frontières de modules et dans les contrats partagés. Combine-les avec validation runtime pour les données externes ; n'écris pas des types avancés sans gain lisible.
- **Limites :** Les types TypeScript sont effacés à l'exécution. Un `as` ou un `any` peut faire taire le compilateur sans rendre la valeur vraie ; un `.d.ts` incorrect ment à tous les consommateurs.

## Mécanisme : la version sans magie

Décris l'état valide avec des types, utilise unions discriminées pour les variantes, génériques pour les comportements réutilisables et guards runtime pour les entrées inconnues.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Classes typescript : l'armure avant le combat** se rattache à ce cas concret : L'API Kintana et le client mobile doivent partager un contrat de demande sans confondre brouillon, demande soumise et résultat d'erreur.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat TypeScript sûr entre API et client

> **Arc Konoha / Naruto :** le type est un contrat écrit entre les équipes. Il évite que chacun imagine une forme différente du même rouleau.

**Mission liée à « Classes typescript : l'armure avant le combat » :** Type le contrat Kintana concerné par la leçon. Remplace les `any`/casts non justifiés, modélise les états et ajoute un parseur runtime aux données qui viennent du réseau.

**Livrable :** types, guard/parseur si nécessaire, test de compilation et test runtime de payload invalide.

**Critères d’acceptation :** les états impossibles sont évités par le type ; les données externes restent validées au runtime ; aucun `any` ajouté sans justification ; les versions du contrat sont explicites.

**Transfert obligatoire :** Fais évoluer le serveur avant le client. Distingue compatibilité source, compatibilité runtime et déploiement progressif.
