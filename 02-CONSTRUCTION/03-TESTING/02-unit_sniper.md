---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, regression]
anti_recipe_key: changement_echelle+regression
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Unit sniper : tester une fonction précisément

Temps de lecture ~8 min

Un fusil à pompe tire dans tous les sens. Il touche, mais il détruit aussi beaucoup de choses utiles.
Un sniper vise une cible précise. Un seul coup. Pas de dégâts collatéraux.

le sniper de la horde (univers Walking Dead) est sniper. Il ne vide pas un chargeur sur une horde. Il compte ses carreaux, il vise, et chaque tir doit compter. Un unit test c'est exactement ça : une fonction, une responsabilité, un test isolé. Le problème de la plupart des devs qui "testent" : ils tirent à la pompe sans le savoir.

---

## 1) CE QUE "UNITAIRE" VEUT DIRE VRAIMENT

Un test unitaire teste **une seule unité de logique**.
En JS : une fonction, une méthode, un module pur.

Ce qu'il ne fait **pas** :

- appeler une vraie base de données
- faire une vraie requête HTTP
- toucher le filesystem
- dépendre du résultat d'une autre fonction non testée

Si ton test fait ça, c'est un test d'intégration (voir `05-integration_reactor.md`).

```js
// PAS un unit test : dépend d'une API externe
async function testGetSurvivor() {
  const survivor = await fetch("/api/survivors/rick"); // appel réseau réel
  assert(survivor.name === "Rick");
}

// UNIT TEST : la fonction est pure, isolée, prévisible
function formatSurvivorName(prenom, rang, camp) {
  return `[${rang.toUpperCase()}] ${prenom} · ${camp}`;
}

// test :
const result = formatSurvivorName("rick", "leader", "Alexandria");
// attendu : "[LEADER] rick · Alexandria"
```

---

## 2) ANATOMIE D'UN UNIT TEST : LES 3 PHASES

Tout bon test unitaire suit ce pattern : **AAA : Arrange, Act, Assert**

```js
// ARRANGE : prépare les données
const nourriture = 48; // rations disponibles au camp
const survivants = 12; // bouches à nourrir
const joursPrevu = 3; // durée de la mission

// ACT : appelle la fonction testée
const rations = calculeRationsJournalieres(nourriture, survivants, joursPrevu);

// ASSERT : vérifie le résultat
expect(rations).toBe(4); // 48 / 12 / 3 = 4 rations par survivant par jour... à peine
```

Simple. Toujours dans cet ordre. Jamais mélangé.

Si ton test fait plusieurs ACT ou plusieurs ASSERT sur des choses différentes : il teste trop de choses à la fois. Coupe-le en deux.

---

## 3) TESTER LES CAS LIMITES : LE VRAI TRAVAIL

Le cas normal, tout le monde le teste. Les edge cases, personne.
C'est pourtant là que les bugs vivent.

```js
function calculeRationsJournalieres(nourriture, survivants, jours) {
  if (
    !Number.isFinite(nourriture) ||
    !Number.isFinite(survivants) ||
    !Number.isFinite(jours)
  ) {
    throw new TypeError("Les trois valeurs doivent être des nombres finis");
  }
  if (nourriture < 0) {
    throw new RangeError("La nourriture ne peut pas être négative");
  }
  if (!Number.isInteger(survivants) || survivants <= 0) {
    throw new RangeError("Le nombre de survivants doit être un entier positif");
  }
  if (!Number.isInteger(jours) || jours <= 0) {
    throw new RangeError("Le nombre de jours doit être un entier positif");
  }
  return nourriture / survivants / jours;
}
```

Les tests qu'un dev pressé écrit :

```js
expect(calculeRationsJournalieres(48, 12, 3)).toBe(4); // cas normal, journée tranquille
```

Les tests que le sniper écrit avant de partir en mission :

```js
expect(calculeRationsJournalieres(48, 12, 3)).toBe(4); // cas normal
expect(calculeRationsJournalieres(0, 12, 3)).toBe(0); // plus de nourriture : 0
expect(calculeRationsJournalieres(1, 3, 1)).toBeCloseTo(1 / 3); // résultat flottant
expect(() => calculeRationsJournalieres(48, 0, 3)).toThrow(RangeError); // aucun bénéficiaire valide
expect(() => calculeRationsJournalieres(48, 12, 0)).toThrow(RangeError); // durée invalide
expect(() => calculeRationsJournalieres(-1, 12, 3)).toThrow(RangeError); // stock négatif
expect(() => calculeRationsJournalieres(48, 1.5, 3)).toThrow(RangeError); // effectif entier attendu
expect(() => calculeRationsJournalieres(NaN, 12, 3)).toThrow(TypeError); // donnée non finie
```

Chaque edge case est un vendredi soir en prod évité.

---

## 4) CE QU'UN TEST DOIT DOCUMENTER

Un bon test est une documentation vivante.
En lisant le test, tu comprends ce que la fonction est censée faire : même sans regarder son implémentation.

```js
describe("calculeRationsJournalieres", () => {
  it("retourne les rations correctes pour un camp normal", () => {
    expect(calculeRationsJournalieres(48, 12, 3)).toBe(4);
  });

  it("retourne 0 si le camp est vide de nourriture", () => {
    expect(calculeRationsJournalieres(0, 12, 3)).toBe(0);
  });

  it("refuse un camp sans survivant", () => {
    expect(() => calculeRationsJournalieres(48, 0, 3)).toThrow(RangeError);
  });

  it("refuse une durée nulle", () => {
    expect(() => calculeRationsJournalieres(48, 12, 0)).toThrow(RangeError);
  });
});
```

`describe` groupe les tests d'une même unité.
`it` décrit le comportement attendu en langage humain.
Si le test échoue et que quelqu'un le lit, il comprend immédiatement ce qui est cassé : pas juste "un test a raté".

---

## 5) ISOLATION : POURQUOI C'EST OBLIGATOIRE

Un test unitaire qui dépend d'un autre test : c'est une bombe à retardement. Si quelqu'un s'incruste dans le camp entre les deux tests, tout s'effondre.

```js
// DANGEREUX : test 2 dépend du résultat de test 1
let survivants = [];

it("ajoute un survivant au camp", () => {
  survivants.push("Carol");
  expect(survivants).toHaveLength(1);
});

it("retire un survivant du camp", () => {
  // si test 1 n'a pas tourné, survivants est vide, ce test explose
  survivants.pop();
  expect(survivants).toHaveLength(0);
});
```

```js
// CORRECT : chaque test gère son propre état
it("ajoute un survivant au camp", () => {
  const survivants = [];
  survivants.push("Carol");
  expect(survivants).toHaveLength(1);
});

it("retire un survivant du camp", () => {
  const survivants = ["Carol"];
  survivants.pop();
  expect(survivants).toHaveLength(0);
});
```

Règle : un test ne doit jamais supposer qu'un autre a déjà tourné avant lui.

---

## EXERCICES

## EXO 1 : le sniper de le sniper

La fonction suivante vérifie si un survivant peut partir en mission de reconnaissance :

```js
function peutPartirEnMission(survivant) {
  return (
    survivant.stamina > 60 &&
    survivant.blessures === 0 &&
    survivant.munitions > 0
  );
}
```

Écris les tests unitaires pour cette fonction en suivant AAA :

- le cas où le survivant peut partir
- le cas où la stamina est trop basse
- le cas où il a des blessures
- le cas où les munitions sont épuisées
- le cas où les trois conditions échouent en même temps

---

## EXO 2 : trouver les edge cases

Pour cette fonction de calcul de menace du camp :

```js
function niveauMenace(zombiesDetectes, distancePérimètre) {
  return zombiesDetectes / distancePérimètre;
}
```

Liste tous les edge cases auxquels tu penses.
Puis écris un test pour chacun.

(Indice : que se passe-t-il si `distancePérimètre` est 0 ? Et si les deux sont 0 ? Et si les valeurs sont négatives ?)

---

## EXO 3 : réécrire un mauvais test

Ce test teste trop de choses à la fois. Coupe-le en tests unitaires propres :

```js
it("gère un survivant complet", () => {
  const survivant = { nom: "Michonne", kills: 40, blessures: 0 };
  const nomFormaté = formatNom(survivant.nom);
  const efficacite = calculeEfficacite(survivant.kills, survivant.blessures);
  const rang = attribueRang(efficacite);
  expect(nomFormaté).toBe("MICHONNE");
  expect(efficacite).toBe(40);
  expect(rang).toBe("elite");
});
```

---

## RÉSUMÉ

Un unit test : une fonction, isolée, avec Arrange-Act-Assert.
Le cas normal est un point de départ. Les cas limites, les invariants et les erreurs métier demandent eux aussi des tests explicites.
Un bon test documente le comportement attendu : en le lisant tu comprends la fonction.
L'isolation est obligatoire : chaque test gère son propre état, jamais celui d'un autre.

> Complément à l'analogie du sniper de la horde (univers Walking Dead) : un test unitaire est aussi une **documentation de contrat exécutable**. Ce que le test décrit, c'est ce que le code PROMET. Casse le contrat → casse le test.

## CHECKPOINT DE PROFONDEUR : variation K : mesure avant conclusion

Donne une hypothèse que tu serais tenté de croire immédiatement. Ensuite, définis une mesure minimale capable de la confirmer ou de l'infirmer. Interdis-toi toute conclusion avant cette mesure et explique pourquoi.

<!-- AF-DIAGRAM:testing -->

## Repère visuel utile : Protéger un invariant Kintana contre la régression

```text
risque / invariant
       |
       v
choisir le niveau de test
  |       |        |
 unité  intégr.  contrat / E2E
  |       |        |
  +-------+--------+
          v
   test rouge -> correctif
          |
          v
   test vert + mutation volontaire
```

<!-- AF-LESSON-PROFILE: testing -->

## Repères de décision

- **Pourquoi :** Les tests protègent un contrat observable pendant que le code évolue. Ils rendent les régressions moins coûteuses à diagnostiquer et à corriger.
- **Quand l’utiliser / quand l’éviter :** Choisis le niveau de test selon le risque : unité pour une règle isolée, intégration pour plusieurs composants, contrat pour les échanges, E2E pour un parcours critique. N'utilise pas des mocks pour simuler ce que tu dois réellement vérifier.
- **Limites :** Une suite verte ne prouve que les cas exécutés et les assertions observées. Les tests ne remplacent pas revue, sécurité, monitoring ou test de charge réaliste.

## Mécanisme : la version sans magie

Formule un invariant, prépare un état contrôlé, exécute l'action et affirme un résultat public. Ajoute le cas limite et vérifie que le test échoue si le bug revient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Unit sniper : tester une fonction précisément** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « Unit sniper : tester une fonction précisément » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
