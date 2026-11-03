---
perishability_id: PER-0013

stability: perissable
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: high
assessment_role: instructional_checkpoint
source_verified_on: "2026-11-03"
freshness_status: "verified_reference"
source_url: https://playwright.dev/docs/intro
source_type: primary
review_interval: "6 mois"
review_due: "2027-05-03"
source_scope: "Documentation officielle ou source primaire consultée en rapport avec « E2e playwright beast : simuler un vrai utilisateur ». La référence soutient le concept/version explicitement indiqué dans cette ressource ; ce statut ne certifie pas chaque phrase, chaque snippet ni l'exécution locale. Les affirmations empiriques et les API versionnées restent limitées au scope ci-dessous."
provenance_note: "V6.4, 2026-11-03 : revue de référence réalisée. Statut « verified_reference » limité au périmètre indiqué ; il ne vaut ni revue exhaustive ligne par ligne, ni exécution de code, ni revue experte indépendante. Pour les informations volatiles, reconsulter la source à l'échéance ou avant toute décision."
canonical_resource: null
source_access_status: "SOURCE_PUBLISHER_AND_CONTENT_SCOPE_RETRIEVED_OR_CORROBORATED_2026-11-03"
claim_alignment_status: "OFFICIAL_SOURCE_IDENTITY_AND_CONCEPT_SCOPE_CONFIRMED_2026-11-03"
source_review_status: "SCOPED_REFERENCE_REVIEW_COMPLETE_2026-11-03"
claim_reviewed_on: "2026-11-03"
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# E2e playwright beast : simuler un vrai utilisateur

Temps de lecture ~8 min

Un unit test vérifie une fonction.
Un test d'intégration vérifie plusieurs modules.
Un test E2E vérifie un parcours observable de bout en bout du point de vue de l’utilisateur, à travers les composants réellement inclus dans l’environnement de test. Il peut traverser l’API et la base de données si elles sont branchées au scénario ; un test UI avec API simulée ne vérifie pas la base de données.

Le soir de la cérémonie du Ballon d'Or, des milliers de journalistes accèdent à la plateforme de vote en même temps. Chacun clique, sélectionne, confirme. Si le bouton "Voter" plante pour 5% d'entre eux à cause d'un bug de timing, personne ne l'a vu venir en unit test. Playwright l'aurait vu.

Playwright lance un vrai navigateur (Chromium, Firefox, WebKit), clique, tape, attend, et vérifie. Si un humain peut le faire sur ton app, Playwright peut le tester.

---

## 1) INSTALLER PLAYWRIGHT

```bash
npm install --save-dev @playwright/test
npx playwright install  # télécharge les navigateurs
```

Configuration minimale dans `playwright.config.js` :

```js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
    headless: true, // true en CI, false pour voir ce qui se passe en debug
  },
});
```

---

## 2) PREMIER TEST E2E : LE VOTE DU BALLON D'OR

```js
// tests/e2e/vote.spec.js
const { test, expect } = require("@playwright/test");

test("un journaliste peut voter pour le Ballon d'Or", async ({ page }) => {
  // naviguer vers la page de vote
  await page.goto("/vote");

  // vérifier que la page est chargée
  await expect(page).toHaveTitle(/Ballon d'Or/);

  // remplir le formulaire de vote
  await page.fill('[data-testid="journaliste-nom"]', "Jean Dupont");
  await page.selectOption('[data-testid="choix-joueur"]', "messi");
  await page.click('[data-testid="bouton-voter"]');

  // vérifier le message de confirmation
  await expect(page.locator('[data-testid="confirmation"]')).toHaveText(
    "Vote enregistré",
  );
});
```

Playwright ouvre un vrai navigateur, fait exactement ce qu'un journaliste ferait le soir de la cérémonie.

---

## 3) LES LOCATORS : TROUVER LES ÉLÉMENTS

Playwright a plusieurs façons de trouver un élément. Certaines sont meilleures que d'autres.

```js
// EVITER : fragile, casse si le HTML change
page.locator(".vote-button");
page.locator("#btn-submit");
page.locator("div > button:nth-child(2)");

// PRÉFÉRER : sémantique, stable
page.getByRole("button", { name: "Voter" });
page.getByLabel("Joueur");
page.getByText("Vote enregistré");
page.getByPlaceholder("Nom du journaliste");

// ACCEPTABLE pour les tests : data-testid explicite
page.locator('[data-testid="bouton-voter"]');
```

Règle : utilise `getByRole` et `getByLabel` en priorité.
Les sélecteurs CSS et XPath cassent à la première restructuration du HTML.

---

## 4) ATTENTES : PLAYWRIGHT EST ASYNC PAR DÉFAUT

Playwright attend automatiquement que les éléments soient prêts avant d'interagir.
Mais pour les assertions, tu dois explicitement attendre.

```js
// automatique : Playwright attend que l'élément soit cliquable
await page.click("button");

// attendre qu'un élément apparaisse (animations, chargement du classement)
await expect(page.locator('[data-testid="classement"]')).toBeVisible();

// attendre qu'un texte soit présent
await expect(page.locator('[data-testid="classement"]')).toContainText("Messi");

// attendre une navigation vers la page de confirmation
await page.click('[data-testid="voir-classement"]');
await page.waitForURL("/classement");

// timeout personnalisé si une opération est lente (ex: calcul du vainqueur)
await expect(page.locator('[data-testid="vainqueur"]')).toBeVisible({
  timeout: 10000,
});
```

---

## 5) FIXTURES : PRÉPARER L'ÉTAT

Les tests E2E ont besoin d'un état cohérent. Un journaliste non authentifié ne peut pas voter. Playwright permet de préparer cet état avant chaque test.

```js
// tests/e2e/fixtures.js
const { test: baseTest } = require("@playwright/test");

// fixture qui crée un journaliste authentifié avant le test
const test = baseTest.extend({
  journalisteConnecté: async ({ page }, use) => {
    await page.goto("/enter_dojo");
    await page.fill('[data-testid="email"]', "jean@lequipe.fr");
    await page.fill('[data-testid="password"]', "pass1234");
    await page.click('[data-testid="btn-login"]');
    await page.waitForURL("/dashboard");
    // maintenant le contexte est authentifié pour tout le test
    await use(page);
  },
});

module.exports = { test };
```

```js
// tests/e2e/vote-auth.spec.js
const { test } = require("./fixtures");
const { expect } = require("@playwright/test");

test("un journaliste connecté peut voter", async ({
  journalisteConnecté: page,
}) => {
  await page.goto("/vote");
  // page est déjà authentifiée grâce à la fixture
  await page.selectOption('[data-testid="choix-joueur"]', "messi");
  await page.click('[data-testid="bouton-voter"]');
  await expect(page.locator('[data-testid="confirmation"]')).toBeVisible();
});
```

---

## 6) CE QUE L'E2E ATTRAPE QUE PERSONNE D'AUTRE NE VOIT

```text
Exemple : soir de la cérémonie Ballon d'Or

Unit tests : validerVote() retourne true
Intégration : vote stocké en DB
Contract : format de réponse API respecté

E2E : le bouton "Voter" est désactivé après un vote, mais
   si le journaliste clique très vite deux fois (double-click),
   deux votes sont envoyés depuis le même compte.
   Aucun des tests précédents ne pouvait voir ça.
   Playwright le voit en 30 secondes.
```

L’E2E teste un parcours comme un utilisateur le vit. Les éléments réellement traversés dépendent de l’environnement : navigateur, interface, API ou stockage peuvent être réels ou simulés. Décris ce qui est effectivement inclus dans ton test.

---

## 7) E2E EN CI : NE PAS EN ABUSER

Les tests E2E sont lents (10-60 secondes par test). Sur une suite de 50 tests E2E : plusieurs minutes.

En CI/CD, les règles pratiques :

- unit tests : à chaque push
- intégration : à chaque push
- E2E : sur les PRs et avant deploy, pas sur chaque commit

Et ne teste en E2E que les **flux critiques** :

- connexion du journaliste
- vote et confirmation
- affichage du classement final

Pas besoin d'E2E sur chaque bouton. Les unit tests couvrent les détails.

---

## EXERCICES

## EXO 1 : le bug du soir de cérémonie

Tu hérites d'un rapport de bug soumis le soir de la cérémonie : "Des journalistes disent avoir voté mais leur vote n'apparaît pas dans le classement en direct." Ton unit test passe. Ton test d'intégration passe. Quelque chose se passe entre le clic et le serveur.

Écris un test Playwright qui reproduit le chemin complet : connexion → vote → vérification que le vote est visible dans le classement en direct. Si ce test passe, le bug est ailleurs. S'il échoue, tu viens de localiser le problème à l'interface.

Contrainte : utilise `getByRole` et `getByLabel` pour tous les sélecteurs. Aucun sélecteur CSS, aucun `data-testid` inventé. Construis le test comme si l'interface existait, et commente ce que chaque sélecteur cherche.

(Indice : la page de classement met peut-être 2-3 secondes à se mettre à jour après le vote. `await expect(...).toBeVisible({ timeout: 5000 })` est ton filet.)

---

## EXO 2 : simuler la pression du jour J

Le soir de la cérémonie, des milliers de journalistes votent en même temps. Playwright peut pas simuler 1000 utilisateurs, mais il peut simuler un cas de concurrence : deux votes du même compte depuis deux onglets différents.

Écris un test qui :

1. ouvre deux contextes de navigateur distincts (`browser.newContext()`)
2. dans les deux contextes, connecte le même journaliste
3. lance les deux votes quasi-simultanément avec `Promise.all`
4. vérifie que le système n'a enregistré qu'un seul vote (le deuxième doit être rejeté ou ignoré)

C'est ça, un test E2E qui teste autre chose que le flux normal. Et c'est exactement ce que les unit tests ne peuvent pas voir.

---

## RÉSUMÉ

Playwright lance un vrai navigateur et simule un vrai utilisateur.
`getByRole`, `getByLabel`, `getByText` : plus stables que les sélecteurs CSS.
Playwright attend automatiquement les éléments : utilise `expect(...).toBeVisible()` pour les assertions async.
E2E attrape ce que les autres tests ne voient pas : timing, UI, interactions complexes.
Ne mets pas tout en E2E : c'est lent. Réserve-les aux flux critiques.

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

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **E2e playwright beast : simuler un vrai utilisateur** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « E2e playwright beast : simuler un vrai utilisateur » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
