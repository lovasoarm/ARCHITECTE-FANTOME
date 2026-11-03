---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_echelle, changement_contexte]
anti_recipe_key: changement_echelle+changement_contexte
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# TDD arena : le test en premier, toujours

Temps de lecture ~8 min

La plupart des devs écrivent du code, puis pensent aux tests.
TDD inverse ça : t'écris le test d'abord, le code ensuite.

Au début ça semble bizarre. La cérémonie du Ballon d'Or a ses règles : tu sais d'avance quel comportement le système doit avoir avant d'écrire une seule ligne. Tu définies d'abord ce qui doit arriver, et le code suit. Après trois sessions TDD : t'as du mal à coder autrement.

---

## 1) LE CYCLE RED-GREEN-REFACTOR

```text
RED   → écrire un test qui décrit le comportement voulu
      lancer → il échoue (normal : le code n'existe pas encore)

GREEN  → écrire le minimum de code pour que le test passe
      pas d'optimisation, pas de beauté : juste le strict minimum

REFACTOR → nettoyer le code sans casser les tests
      les tests sont verts avant et après le refacto
```

```text
 RED ──→ GREEN ──→ REFACTOR
  ↑          │
  └───────────────────┘
     cycle suivant
```

Chaque nouvelle feature : un nouveau cycle. Chaque bug corrigé : commencer par écrire le test qui reproduit le bug avant de le fixer.

---

## 2) UN VRAI CYCLE : PAS À PAS

On va coder le système de vote du Ballon d'Or. Pas tout d'un coup : test par test.

### Cycle 1 : créer un votant

**RED** : le test d'abord :

```js
// ballonDor.test.js
const { creerVotant } = require("./ballonDor");

it("crée un votant avec son pays et son journal", () => {
  const votant = creerVotant("France", "Jean Dupont", "L'Équipe");
  expect(votant.pays).toBe("France");
  expect(votant.nom).toBe("Jean Dupont");
  expect(votant.journal).toBe("L'Équipe");
  expect(votant.aVoté).toBe(false);
});
```

On lance. Ça échoue. `creerVotant` n'existe pas. **C'est normal. C'est le but.**

**GREEN** : le minimum pour passer :

```js
// ballonDor.js
function creerVotant(pays, nom, journal) {
  return { pays, nom, journal, aVoté: false };
}
module.exports = { creerVotant };
```

On lance. Vert.

**REFACTOR** : rien à nettoyer ici. On passe au cycle suivant.

---

### Cycle 2 : voter

**RED** :

```js
const { creerVotant, voter } = require("./ballonDor");

it("enregistre le vote et marque le votant comme ayant voté", () => {
  const votant = creerVotant("France", "Jean Dupont", "L'Équipe");
  const résultat = voter(votant, "Messi");
  expect(résultat.choix).toBe("Messi");
  expect(résultat.votant.aVoté).toBe(true);
});
```

**GREEN** :

```js
function voter(votant, joueur) {
  return {
    choix: joueur,
    votant: { ...votant, aVoté: true },
  };
}
```

**REFACTOR** : toujours vert.

---

### Cycle 3 : empêcher de voter deux fois

**RED** :

```js
it("rejette un double vote : un journaliste ne vote qu'une fois", () => {
  const votant = creerVotant("France", "Jean Dupont", "L'Équipe");
  const votantAyantVoté = voter(votant, "Messi").votant;

  expect(() => voter(votantAyantVoté, "Vinicius")).toThrow(
    "Votant a déjà voté",
  );
});
```

**GREEN** :

```js
function voter(votant, joueur) {
  if (votant.aVoté) throw new Error("Votant a déjà voté");
  return {
    choix: joueur,
    votant: { ...votant, aVoté: true },
  };
}
```

Tous les tests précédents restent verts. Le nouveau aussi.

---

## 3) CE QUE TDD FORCE À FAIRE BIEN

TDD n'est pas une discipline de test. C'est une discipline de design.

Quand tu écris le test en premier, tu te forces à répondre à ces questions **avant** de coder :

- quelle est l'interface de cette fonction ? (params, retour)
- quel comportement exact est attendu ?
- quels edge cases dois-je gérer ?

```text
Dev sans TDD : code → réalise que l'interface est bizarre → refactorise → peut-être teste
Dev avec TDD : pense à l'interface → écrit le test → code → interface propre dès le départ
```

---

## 4) TDD SUR UN BUG

Bug signalé par la FIFA : "un vote est accepté même si le nom du joueur est vide."

**RED** : reproduis le bug d'abord :

```js
it("rejette un vote avec un joueur vide ou null", () => {
  const votant = creerVotant("France", "Jean", "L'Équipe");
  expect(() => voter(votant, "")).toThrow("Joueur requis");
  expect(() => voter(votant, null)).toThrow("Joueur requis");
});
```

Test rouge : confirme que le bug existe.

**GREEN** :

```js
function voter(votant, joueur) {
  if (votant.aVoté) throw new Error("Votant a déjà voté");
  if (!joueur) throw new Error("Joueur requis");
  return {
    choix: joueur,
    votant: { ...votant, aVoté: true },
  };
}
```

Tous les tests sont verts. Le bug ne peut plus revenir : le test est là pour la vie.

---

## 5) TDD N'EST PAS UNE RELIGION

TDD est un outil. Pas un dogme.

Y'a des cas où il aide vraiment :

- logique métier complexe (calculs de pondération du Ballon d'Or, règles de vote)
- algorithmes avec des edge cases nombreux
- refactoring d'une feature existante

Y'a des cas où il aide moins :

- exploration d'une API inconnue (prototyper d'abord, tester après)
- UI très couplée au visuel
- scripts one-shot qui ne vivent pas longtemps

L'objectif n'est pas de faire 100% TDD. L'objectif est de penser "quel comportement j'attends ?" avant "comment je l'implémente ?". TDD force cette habitude.

---

## EXERCICES

## EXO 1 : TDD sur le calcul de classement

Implémente `calculClassement(votes)` en TDD pur.

Contraintes :

- `votes` est un tableau d'objets `{ joueur: string, points: number }`
- retourne un tableau trié par points décroissants
- deux joueurs avec le même total sont à égalité (même rang)
- un tableau vide retourne un tableau vide

Cycle obligatoire : RED → GREEN → REFACTOR pour chaque comportement.

---

## EXO 2 : TDD sur un bug réel du système de vote

Ce code a un bug silencieux. Trouve-le via TDD :

1. écris d'abord le test qui le reproduit (rouge)
2. fixe le code (vert)
3. vérifie que tous les tests précédents sont encore verts

```js
function calculePourcentageVotes(votesJoueur, totalVotes) {
  return ((votesJoueur / totalVotes) * 100).toFixed(2);
}
// usage attendu : calculePourcentageVotes(3, 10) → "30.00"
// mais que retourne calculePourcentageVotes(0, 0) ?
// et que retourne calculePourcentageVotes(1, 3) ? Comparer avec 0.1 + 0.2...
```

---

## RÉSUMÉ

TDD c'est : RED (test qui échoue) → GREEN (code minimal) → REFACTOR (nettoyer sans casser).
Le test en premier force à penser l'interface avant le code.
Sur les bugs : reproduire le bug par un test avant de le corriger.
TDD n'est pas un dogme : c'est l'outil qu'on sort quand la logique est complexe.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

<!-- AF-LESSON-PROFILE: testing -->

## Repères de décision

- **Pourquoi :** Les tests protègent un contrat observable pendant que le code évolue. Ils rendent les régressions moins coûteuses à diagnostiquer et à corriger.
- **Quand l’utiliser / quand l’éviter :** Choisis le niveau de test selon le risque : unité pour une règle isolée, intégration pour plusieurs composants, contrat pour les échanges, E2E pour un parcours critique. N'utilise pas des mocks pour simuler ce que tu dois réellement vérifier.
- **Limites :** Une suite verte ne prouve que les cas exécutés et les assertions observées. Les tests ne remplacent pas revue, sécurité, monitoring ou test de charge réaliste.

## Mécanisme : la version sans magie

Formule un invariant, prépare un état contrôlé, exécute l'action et affirme un résultat public. Ajoute le cas limite et vérifie que le test échoue si le bug revient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **TDD arena : le test en premier, toujours** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « TDD arena : le test en premier, toujours » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
