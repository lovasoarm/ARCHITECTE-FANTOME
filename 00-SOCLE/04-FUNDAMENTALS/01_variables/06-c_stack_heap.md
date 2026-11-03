---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L2
perturbation_modes: [schema_simple, contre_exemple]
anti_recipe_key: schema_simple+contre_exemple
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **Repère :** distingue les appels actifs (pile d’appels) des objets accessibles par des références ; le schéma est conceptuel.

# 01c : Stack vs Heap : où vit ta valeur ?

Temps de lecture ~5 min

Deux notions utiles, mais qu'il ne faut pas transformer en règle magique de placement mémoire. Le _call stack_ suit les appels de fonctions (frames empilées puis dépilées, selon LIFO). Le _heap_ désigne couramment la mémoire utilisée pour les objets créés dynamiquement et gérés par le moteur. JavaScript ne garantit pas l'emplacement physique de chaque valeur, ni une règle universelle « primitive sur la stack / objet sur le heap ».

## Règle fiable

En JavaScript, l'affectation copie toujours une valeur. Ce n'est pas un passage par référence. Pour une primitive, la valeur copiée est la primitive elle-même ; pour un objet, c'est une valeur de référence qui désigne l'objet.

- **Une affectation copie toujours une valeur.** Pour une primitive, la valeur copiée est la primitive elle-même.
- **Pour un objet** (objet littéral, tableau, fonction), la valeur copiée est une référence vers cet objet. Deux bindings peuvent donc désigner le même objet.
- Le langage ne spécifie pas l'adresse physique ni la zone mémoire exacte utilisée par le moteur. Le dessin stack/heap ci-dessous est seulement conceptuel.

## Schéma

```text
CALL STACK (concept)       OBJET (concept)
+--------------------+      +-------------------+
| frames d'appels     |      | { x: 10 }         |
| bindings locaux    |      +---------▲---------+
| obj : valeur-ref ---+-----------------+
| obj2: valeur-ref ---+-----------------+
+--------------------+

Les deux valeurs de référence désignent le même objet ; ce schéma ne représente aucune adresse réelle.
```

`obj` et `obj2` désignent le même objet → modifier via `obj.x = 99` change ce que voit `obj2`. Ce comportement observable n'impose pas au moteur un emplacement physique précis.

## Piège de débutant

```js
const a = { hp: 100 };
const b = a;
b.hp = 0;
console.log(a.hp); // 0
```

Tu n'as pas copié. Tu as fait un raccourci vers le même sac.

## Ce que l'analogie cache

Le modèle stack/heap ne décrit pas fidèlement l'agencement interne de chaque moteur JavaScript. Les moteurs peuvent optimiser ou éliminer des allocations ; le langage ne permet pas au programme de déduire une adresse physique à partir du type d'une valeur. Garde ce schéma pour comprendre les appels et les références partagées, pas pour diagnostiquer l'emplacement réel d'un objet.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## Défi avancé facultatif : variation H : contre-exemple hostile

Construis le plus petit contre-exemple crédible qui ferait échouer le conseil de cette page. Explique pourquoi il échoue, comment le détecter en production, et quelle modification minimale du modèle le rend à nouveau utile.

<!-- AF-LESSON-PROFILE: variables -->

## Repères de décision

- **Pourquoi :** La pile d'appels aide à suivre l'ordre d'exécution des fonctions. Le modèle du tas aide à raisonner sur les objets qui restent accessibles après un appel.
- **Quand l’utiliser / quand l’éviter :** Utilise ces modèles pour expliquer les appels et les références partagées. Ne les utilise pas pour prétendre connaître une adresse ou optimiser une allocation sans mesure adaptée.
- **Limites :** ECMAScript ne garantit pas qu'une primitive se trouve physiquement dans la stack ni qu'un objet se trouve à une adresse précise du heap. Les moteurs peuvent optimiser leur représentation.

## Mécanisme : la version sans magie

Le call stack représente les appels actifs et leurs cadres d'exécution. Le heap est un modèle courant pour décrire la mémoire des objets gérés dynamiquement. Un appel peut se terminer alors que l'objet qu'il a renvoyé reste accessible par un binding conservé ailleurs.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), une fonction prépare un payload de demande puis le transmet à un autre composant. Suivre le retour de fonction et les références vers ce payload aide à comprendre pourquoi l'objet peut rester accessible après la fin de l'appel.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : suivre un appel et une référence

> **Arc Dragon Ball :** la pile d'appels indique quelle action est en cours ; le modèle du tas aide à raisonner sur les objets qui restent accessibles. Ce sont des cartes mentales, pas une radiographie du moteur.

**Mission liée à « 01c : Stack vs Heap : où vit ta valeur ? » :** Suis l'appel d'une fonction qui construit un payload, puis observe deux bindings qui désignent le même objet. Dessine le retour de fonction et explique ce qui reste accessible. Ne cherche pas à mesurer une adresse mémoire ni à déduire le placement physique réel.

```js
function buildPayload() {
  const requestId = "REQ-104";
  return { id: requestId, status: "queued" };
}

const payload = buildPayload();
const alias = payload;
alias.status = "sent";
console.log(payload.status); // "sent"
```

**Livrable :** un schéma simple montrant l'appel de `buildPayload`, son retour, puis les deux bindings qui désignent le même objet.

**Critères d’acceptation :** le schéma montre que le cadre d'appel disparaît lorsque la fonction retourne ; il montre aussi que `payload` et `alias` observent le même objet ; il précise que stack/heap est un modèle conceptuel et non une garantie ECMAScript.

**Transfert obligatoire :** modifie le code pour que `alias` désigne un nouvel objet, puis compare ce qui change dans ton schéma.
