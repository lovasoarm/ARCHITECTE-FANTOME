---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, solution_concurrente]
anti_recipe_key: defaut_cache+solution_concurrente
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Mocking madness : remplacer ce qu'on ne contrôle pas

Temps de lecture ~8 min

Ton code appelle une API externe. Il envoie un email. Il lit un fichier sur le disque.
Tu ne peux pas laisser ça tourner dans tes tests : c'est lent, imprévisible, et ça coûte parfois de l'argent.

Le système de vote du Ballon d'Or envoie des emails de confirmation à chaque journaliste qui vote. Si les tests appellent le vrai service d'email, t'envoies 500 emails à chaque `npm test`. La FIFA va t'appeler.

La solution : les mocks. Un mock remplace une dépendance réelle par une version qu'on contrôle totalement. Résultat : le test reste rapide, prévisible, isolé.

---

## 1) TROIS TYPES DE DOUBLURES : LA DISTINCTION QUI COMPTE

```text
Stub  → remplace une fonction par une valeur fixe
     "peu importe ce que tu lui passes, il retourne toujours ça"

Mock  → remplace ET enregistre les appels
     "est-ce que cette fonction a été appelée ? avec quels args ?"

Spy  → surveille une vraie fonction sans la remplacer
     "laisse-la tourner normalement, mais dis-moi comment elle a été appelée"
```

En pratique avec Jest, `jest.fn()` couvre les trois cas selon comment tu l'utilises.

---

## 2) `jest.fn()` : LE MOCK DE BASE

```js
// une fonction mock vide
const envoyerEmail = jest.fn();

// on peut lui donner une valeur de retour
const envoyerEmail = jest.fn().mockReturnValue(true);

// ou une implémentation complète
const envoyerEmail = jest.fn().mockImplementation((destinataire) => {
  return { envoyé: true, à: destinataire };
});

// utilisation dans un test
envoyerEmail("journaliste.fr@ballon-dor.com");

// vérifications
expect(envoyerEmail).toHaveBeenCalled();
expect(envoyerEmail).toHaveBeenCalledWith("journaliste.fr@ballon-dor.com");
expect(envoyerEmail).toHaveBeenCalledTimes(1);
```

Le mock enregistre tout : combien de fois il a été appelé, avec quels arguments, à chaque appel.

---

## 3) MOCKER UN MODULE ENTIER

Quand ton code importe un module externe (API, base de données, service tiers) :

```js
// notificationService.js
const emailClient = require("./emailClient"); // dépendance externe : 500 emails en test sinon

function notifierVotant(journaliste) {
  emailClient.envoyer({
    destinataire: journaliste.email,
    sujet: "Votre vote Ballon d'Or a été enregistré",
    corps: `Merci ${journaliste.nom}, votre voix compte.`,
  });
  return true;
}

module.exports = { notifierVotant };
```

```js
// notificationService.test.js

// Jest intercepte tous les require('./emailClient') dans ce fichier
jest.mock("./emailClient");

const emailClient = require("./emailClient");
const { notifierVotant } = require("./notificationService");

describe("notifierVotant", () => {
  beforeEach(() => {
    // reset les compteurs d'appels entre chaque test
    jest.clearAllMocks();
  });

  it("envoie un email de confirmation au journaliste", () => {
    const journaliste = { nom: "Jean Dupont", email: "jean@lequipe.fr" };

    notifierVotant(journaliste);

    expect(emailClient.envoyer).toHaveBeenCalledWith({
      destinataire: "jean@lequipe.fr",
      sujet: "Votre vote Ballon d'Or a été enregistré",
      corps: "Merci Jean Dupont, votre voix compte.",
    });
  });

  it("retourne true après notification", () => {
    const résultat = notifierVotant({ nom: "Jean", email: "jean@lequipe.fr" });
    expect(résultat).toBe(true);
  });
});
```

`jest.mock('./emailClient')` : toutes les fonctions exportées deviennent automatiquement des `jest.fn()`.

---

## 4) MOCKER DES VALEURS DE RETOUR ASYNC

Le système de vote récupère les stats des joueurs via une API FIFA. Pas question d'appeler la vraie API dans les tests.

```js
// joueurAPI.js
const fetch = require("node-fetch");

async function recupStats(joueurId) {
  const res = await fetch(`https://api.fifa.com/joueurs/${joueurId}`);
  const data = await res.json();
  return data.stats;
}
```

```js
// joueurAPI.test.js
jest.mock("node-fetch");
const fetch = require("node-fetch");
const { recupStats } = require("./joueurAPI");

it("retourne les stats du joueur", async () => {
  // on contrôle ce que fetch "retourne" : pas d'appel réseau réel
  fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      stats: { buts: 45, passes: 18, matchs: 52 },
    }),
  });

  const stats = await recupStats("mbappe-7");

  expect(stats.buts).toBe(45);
  expect(fetch).toHaveBeenCalledWith("https://api.fifa.com/joueurs/mbappe-7");
});

it("gère une réponse d'API en erreur", async () => {
  fetch.mockRejectedValue(new Error("API FIFA indisponible"));

  await expect(recupStats("mbappe-7")).rejects.toThrow("API FIFA indisponible");
});
```

`mockResolvedValue` : simule une Promise résolue.
`mockRejectedValue` : simule une Promise rejetée.

---

## 5) SPY : SURVEILLER SANS REMPLACER

Le logger de la cérémonie doit enregistrer chaque vote important. On veut vérifier qu'il a bien été appelé, sans couper le vrai logging.

```js
const logger = require("./logger");

it("log un avertissement si un vote arrive hors délai", () => {
  // espionne logger.warn sans le remplacer
  const spy = jest.spyOn(logger, "warn");

  enregistrerVote({ journaliste: "marc", horodatage: Date.now() + 99999 });

  expect(spy).toHaveBeenCalledWith(expect.stringContaining("hors délai"));

  // important : remettre l'original après le test
  spy.mockRestore();
});
```

Le spy est utile quand tu veux vérifier un effet de bord (log, event, compteur) sans bloquer l'exécution réelle.

---

## 6) LES ERREURS CLASSIQUES DES MOCKS

```text
Piège 1 : oublier jest.clearAllMocks() entre les tests
     → un mock conserve son état d'un test à l'autre
     → les vérifications de nombre d'appels deviennent fausses

Piège 2 : mocker trop
     → si tu mocks tout, tu testes plus rien de réel
     → règle : mock uniquement ce qui est externe à la logique testée

Piège 3 : ne pas vérifier les arguments
     → expect(envoyerEmail).toHaveBeenCalled() ne dit pas COMMENT il a été appelé
     → toujours vérifier les args si ils comptent pour la logique
```

---

## EXERCICES

## EXO 1 : le mock du virement FIFA

La fonction distribue le prix au vainqueur du Ballon d'Or :

```js
const tributService = require("./tributService");

function distribuerPrixBallon(joueur) {
  if (joueur.rang === 1) {
    tributService.virer({ montant: 500000, destinataire: joueur.id });
    return "prix versé";
  }
  return "pas de prix";
}
```

Écris les tests avec mock de `tributService` pour :

- le vainqueur (rang 1) : vérifier que `virer` a été appelé avec les bons args
- un autre joueur (rang 2) : vérifier que `virer` n'a PAS été appelé

---

## EXO 2 : mock async de l'API FIFA

Écris le test pour cette fonction avec un mock de `fetch` :

```js
async function estEligibleCeremonie(joueurId) {
  const res = await fetch(`https://api.fifa.com/joueurs/${joueurId}`);
  const data = await res.json();
  return data.licenceActive === true && data.matchsJoues >= 15;
}
```

Teste :

- un joueur éligible (licence active + assez de matchs) → `true`
- un joueur inéligible (licence inactive) → `false`
- une API qui explose → que se passe-t-il ?

---

## RÉSUMÉ

Mock = remplacer une dépendance externe par une version contrôlée.
`jest.fn()` pour les fonctions, `jest.mock('./module')` pour les modules entiers.
`mockResolvedValue` / `mockRejectedValue` pour les Promises.
`jest.spyOn` pour surveiller sans remplacer.
`jest.clearAllMocks()` dans `beforeEach` : pas négociable.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.

<!-- AF-LESSON-PROFILE: testing -->

## Repères de décision

- **Pourquoi :** Les tests protègent un contrat observable pendant que le code évolue. Ils rendent les régressions moins coûteuses à diagnostiquer et à corriger.
- **Quand l’utiliser / quand l’éviter :** Choisis le niveau de test selon le risque : unité pour une règle isolée, intégration pour plusieurs composants, contrat pour les échanges, E2E pour un parcours critique. N'utilise pas des mocks pour simuler ce que tu dois réellement vérifier.
- **Limites :** Une suite verte ne prouve que les cas exécutés et les assertions observées. Les tests ne remplacent pas revue, sécurité, monitoring ou test de charge réaliste.

## Mécanisme : la version sans magie

Formule un invariant, prépare un état contrôlé, exécute l'action et affirme un résultat public. Ajoute le cas limite et vérifie que le test échoue si le bug revient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Mocking madness : remplacer ce qu'on ne contrôle pas** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « Mocking madness : remplacer ce qu'on ne contrôle pas » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
