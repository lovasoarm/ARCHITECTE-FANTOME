# 03 : CONTRATS, VERSIONING, MIGRATION
Temps de lecture ~10 min

Un contrat d'API, c'est une promesse que quelqu'un d'autre a déjà mise en production chez lui. Trois règles qui tiennent en 2035 comme aujourd'hui :

1. Ajouter un champ optionnel : compatible. Supprimer ou renommer : rupture.
2. Une rupture se livre en version parallèle, jamais en remplacement immédiat : `v1` et `v2` coexistent le temps que le dernier consommateur migre.
3. Une migration sans date de fin annoncée ne finit jamais : tu maintiens deux versions pour l'éternité.

```
v1 (gelée) ---> période de double run ---> v1 éteinte
      \                                        ^
       +--> v2 (nouvelle) ---------------------+
```

Risque réel : le coût d'un contrat n'est pas dans son écriture, il est dans son retrait. Écris la date d'extinction le jour où tu publies la v2, pas le jour où tu en as marre.

## EXERCICE : LE TEST DE CONTRAT QUI CASSE (25 min, code + corrigé)

Un test de contrat vérifie la **forme** de la réponse, pas seulement son contenu ponctuel. Voici un contrat consommé par un service de logistique, testé indépendamment du code de surveillance qui le produit.

```js
// contrat_evasion.test.js : décrit la forme promise de la réponse
import { strict as assert } from "node:assert";
import { evaluerRisque } from "./surveillance.js";

function verifierContrat(payload) {
  const champsAttendus = ["idDetenu", "risque"];
  for (const champ of champsAttendus) {
    assert.ok(champ in payload, `champ manquant dans le contrat : ${champ}`);
  }
  assert.equal(typeof payload.idDetenu, "string");
  assert.equal(["eleve", "normal"].includes(payload.risque), true);
}

const payload = evaluerRisque({ id: "fox-river-01", incidents30j: 3 });
verifierContrat(payload);
console.log("contrat respecté");
```

```js
// surveillance.js : version initiale, respecte le contrat
export function evaluerRisque(detenu) {
  return { idDetenu: detenu.id, risque: detenu.incidents30j > 2 ? "eleve" : "normal" };
}
```

**Ce qui casse** : six mois plus tard, quelqu'un "nettoie" le champ jugé redondant.

```js
// surveillance.js : version qui casse le contrat, sans y penser
export function evaluerRisque(detenu) {
  // idDetenu renommé en "id" parce que "c'est plus cohérent avec le reste du module"
  return { id: detenu.id, risque: detenu.incidents30j > 2 ? "eleve" : "normal" };
}
```

Exécuter `contrat_evasion.test.js` sur cette nouvelle version produit :

```
AssertionError [ERR_ASSERTION]: champ manquant dans le contrat : idDetenu
```

Le test de contrat échoue immédiatement, dans le module surveillance, avant même que le déploiement n'atteigne le module logistique. C'est exactement le but : déplacer la découverte de la rupture du "en production, trois semaines plus tard" vers "en local, à la seconde du commit".

**Corrigé** : la rupture est réelle et volontaire (le champ `id` est jugé plus propre). Deux façons honnêtes de la livrer :

```js
// option A : champ ajouté en double, ancien conservé le temps de la migration
export function evaluerRisque(detenu) {
  const risque = detenu.incidents30j > 2 ? "eleve" : "normal";
  return { idDetenu: detenu.id, id: detenu.id, risque }; // idDetenu retiré à une date annoncée
}
```

```js
// option B : contrat versionné explicitement
export function evaluerRisqueV2(detenu) {
  return { id: detenu.id, risque: detenu.incidents30j > 2 ? "eleve" : "normal" };
}
// evaluerRisque (v1) reste inchangé jusqu'à la date d'extinction annoncée
```

Dans les deux cas, le test de contrat de la v1 continue de passer jusqu'à la date d'extinction écrite, et un nouveau test de contrat couvre la v2.

## EXERCICE 2 : casser sa propre v1 (25 min)

Prends un endpoint de ton API (module [19_api_craft](../19_api_craft/00_why_api_craft.md)). Renomme un champ. Écris la note de migration : qui casse, en combien de temps, quel plan de double run, quelle date d'extinction. Cette note part telle quelle dans ton dossier de preuves.

## RÉSUMÉ

Un test de contrat vérifie une forme, pas une valeur : il casse au bon endroit, tout de suite, plutôt qu'en production trois mois plus tard. Une rupture se livre avec un plan de double run et une date d'extinction écrite le jour de la publication, jamais après. Suite : [challenge.md](challenge.md), puis [04_exercice_architecture_trop_belle.md](04_exercice_architecture_trop_belle.md).
