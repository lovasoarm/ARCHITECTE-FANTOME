---
perennite: evolutif
stability: evolutif
duree_de_vie_estimee: 3-5 ans
raison: Les runners changent (Jest, Vitest, Bun), les principes AAA restent.
acte: comprendre
cognitive_level: L3
perturbation_modes: [changement_contexte, decision_inversee]
anti_recipe_key: changement_contexte+decision_inversee
transfer_distance: medium
assessment_role: instructional_checkpoint
freshness_status: "not_verified"
source_verified_on: null
source_type: "internal"
canonical_resource: "02-CONSTRUCTION/03-TESTING/02-unit_sniper.md"
source_url: null
source_scope: "Notion et parcours internes reliés à 02-CONSTRUCTION/03-TESTING/02-unit_sniper.md ; la provenance interne ne couvre pas les affirmations externes hors de ce périmètre."
provenance_note: "Point d’ancrage interne du curriculum, pas certification des versions, prix, APIs, normes ou pratiques externes. Toute affirmation externe évolutive non reliée à une source primaire reste à vérifier avant réutilisation."
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

> **Statut de pérennité :** intemporel | **évolutif** | périssable
> Statut effectif de ce module : **évolutif**. Intemporel = mécanisme de fond (à mémoriser à vie). Évolutif = pratique métier qui bouge (relire tous les 2-3 ans). Périssable = dépend d'une version/vendor (relire tous les 12-18 mois).

> **CE MODULE RÉUTILISE** : fonctions pures (00-SOCLE/04-FUNDAMENTALS), async (01-CADRAGE/02-ASYNC), erreurs (01-CADRAGE/04-ERROR-HANDLING). Si un de ces prérequis est flou, retourne le voir avant. Ce module ne les réexplique pas.

# Pourquoi ce module mérite ton temps : testing

> **Durée de vie : 5+ ans.** Barème : intemporel = mécanisme de fond (runtime, mémoire, algo, architecture) ; 5+ ans = pratique métier stable ; 2-3 ans, revenir en 2028 = outils IA / stack en mouvement.
> Temps de lecture ~8 min

T'as déjà pushé un fix qui cassait autre chose ?
T'as déjà dit "ça marche sur ma machine" et eu tort ?
T'as déjà refactoré un truc et paniqué parce que t'avais aucun filet ?

Un test, c'est une preuve qui reste vraie même quand tu as oublié pourquoi tu l'as écrite. Ce module répond à ces questions. Et il te donne les outils pour transformer "j'espère que ça marche" en "je peux le prouver".

---

## 1) LE PROBLÈME QUE ÇA RÉSOUT

Sans tests, valider que ton code fonctionne veut dire le relancer manuellement, encore et encore, à chaque modification. C'est lent, faillible (tu oublies toujours un cas), et ça ne scale pas dès que le projet dépasse 10 fichiers.

```js
// calculeScore.js
function calculeScore(kills, assists, deaths) {
  return (kills * 3 + assists) / deaths;
}

// Ça marche.
// Sauf si deaths === 0.
// Division par zéro. NaN. Silencieux.
// Ton dashboard affiche NaN depuis 3 semaines.
// Personne n'a remarqué.
```

Un test aurait attrapé ça le jour J.

Les tests automatisent cette vérification. Tu écris une fois ce que ta fonction doit faire dans tel cas, et cette vérification tourne à chaque modification, en quelques secondes, sans intervention humaine. Tu sais immédiatement si ton changement a cassé quelque chose ailleurs, avant même de pousser ton code.

---

## 2) UN TEST, C'EST QUOI CONCRÈTEMENT

Un test c'est une fonction qui :

1. prépare un contexte (données d'entrée)
2. appelle ton code
3. vérifie que la sortie correspond à ce que t'attends

```js
// test brut, sans framework, juste pour voir
function calculeScore(kills, assists, deaths) {
  if (deaths === 0) return 0;
  return (kills * 3 + assists) / deaths;
}

const resultat = calculeScore(10, 5, 2);
const attendu = 12.5;

if (resultat !== attendu) {
  console.error(`FAIL : attendu ${attendu}, reçu ${resultat}`);
} else {
  console.log("PASS : calculeScore fonctionne correctement");
}

// test edge case
const scoreZeroDeath = calculeScore(10, 5, 0);
if (scoreZeroDeath !== 0) {
  console.error(`FAIL : division par zéro mal gérée`);
} else {
  console.log("PASS : division par zéro gérée");
}
```

C'est ça un test. Pas de magie. Juste : j'appelle, je vérifie.
Les frameworks (Jest, Vitest) font exactement ça, mais avec de meilleures erreurs et plus d'outils.

---

## 3) LES QUATRE TYPES DE TESTS : LA PYRAMIDE

```text
     /\
     / \  E2E (Playwright, Cypress)
    /  \ lent, coûteux, réaliste
    /------\
   /    \ Intégration
   /     \ plusieurs modules ensemble
  /------------\
  /       \ Unit tests
 /        \ une fonction, isolée, rapide
 /------------------\
```

Règle d'or : plus c'est en bas de la pyramide, plus t'en veux.

- Unit tests : 80% de ta suite
- Intégration : 15%
- E2E : 5%

Pourquoi ? Parce que les unit tests sont instantanés. Les E2E prennent des minutes. Si tout est E2E, tu passes ta vie à attendre.

```text
fonction de calcul métier    --> unit test   --> vérifie le résultat isolé
plusieurs modules combinés   --> integration test --> vérifie l'interaction
parcours utilisateur complet  --> E2E test    --> simule un vrai usage
appel à une API externe     --> mock      --> teste sans dépendre du réseau
contrat entre deux services   --> contract test --> garantit la compatibilité
```

---

## 4) QUI SOUFFRE QUAND ÇA MANQUE

Le dev sans tests vit dans la peur permanente de toucher au code existant. Chaque modification devient un pari : "est-ce que ça va casser autre chose que je ne vois pas ?" Cette peur ralentit tout. Le dev évite de refactorer du code pourri parce qu'il n'a aucune garantie que ça ne va pas tout casser silencieusement.

Dans `03_walking_dead_protocol`, le code du camp de Rick existe déjà. Il fonctionne. Mais il est illisible, et personne ne sait ce qui casse si on touche à la rotation des gardes. Sans tests, refactorer c'est jouer à la roulette. Avec une suite de tests complète, chaque modification est vérifiée en quelques secondes.

```text
Dev sans tests :
 écriture --> "ça marche" --> push --> espoir --> bug en prod

Dev avec tests :
 écriture --> test vert --> refacto --> test toujours vert --> push serein
```

---

## 5) LE COÛT DE NE PAS TESTER

Y'a un mythe tenace : "écrire des tests prend trop de temps."

En réalité :

- trouver un bug en test : 5 minutes
- trouver le même bug en prod à 23h un vendredi : 3 heures + tu dors mal

Le temps passé à écrire des tests est toujours récupéré. Souvent dès le premier bug qu'ils t'évitent.

---

## 6) MODERNE, LEGACY, OU INTEMPOREL ?

Le principe est intemporel : vérifier que ton code fait ce qu'il doit faire, de façon répétable. Les outils changent (Jest aujourd'hui, Vitest demain), mais le concept de unit test, integration test, E2E test reste stable depuis des décennies.

La discipline TDD (test-driven development : développement piloté par les tests) a inversé la logique : le test arrive avant le code, pas après. Ça force une meilleure conception dès le départ, parce que tu dois savoir précisément ce que ta fonction doit faire avant de l'écrire.

Avec la montée du code généré par IA : qui peut sembler correct mais contenir des bugs subtils : savoir écrire un test précis et savoir lire un test généré pour vérifier qu'il teste vraiment quelque chose devient une compétence encore plus stratégique qu'avant.

---

## 7) NOYAU DUR DU MÉTIER ?

Oui, explicitement dans le noyau dur : "04 + 06, Error Handling + Testing : sans ça, t'es imprudent". `02-CONSTRUCTION/03-TESTING` dépend de `00-SOCLE/04-FUNDAMENTALS` et `01-CADRAGE/02-ASYNC`, et il devient un prérequis implicite pour tout module de refactoring sérieux : tu ne peux pas refactorer en confiance sans filet de sécurité.

---

## CE QUE TU DOIS RETENIR AVANT D'OUVRIR LE CHAPITRE 01

Sans tests, chaque modification de code est un pari et chaque déploiement un acte de foi. Ce module te donne les outils pour transformer ça en certitude vérifiable. Le principe ne se démode pas, même si les outils changent.

Maintenant, ouvre `02-unit_sniper.md`. Et arrête d'espérer que ton code marche : commence à le prouver.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

<!-- AF-LESSON-PROFILE: testing -->

## Repères de décision

- **Pourquoi :** Les tests protègent un contrat observable pendant que le code évolue. Ils rendent les régressions moins coûteuses à diagnostiquer et à corriger.
- **Quand l’utiliser / quand l’éviter :** Choisis le niveau de test selon le risque : unité pour une règle isolée, intégration pour plusieurs composants, contrat pour les échanges, E2E pour un parcours critique. N'utilise pas des mocks pour simuler ce que tu dois réellement vérifier.
- **Limites :** Une suite verte ne prouve que les cas exécutés et les assertions observées. Les tests ne remplacent pas revue, sécurité, monitoring ou test de charge réaliste.

## Mécanisme : la version sans magie

Formule un invariant, prépare un état contrôlé, exécute l'action et affirme un résultat public. Ajoute le cas limite et vérifie que le test échoue si le bug revient.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pourquoi ce module mérite ton temps : testing** se rattache à ce cas concret : Kintana doit préserver l'unicité d'une demande, les transitions autorisées, l'isolation des rôles et l'absence de double notification.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Protéger un invariant Kintana contre la régression

> **Arc DBZ / Capsule Corp. :** un test est un radar, pas une médaille. Il doit détecter le défaut qui ferait tomber le produit, pas juste colorer la console en vert.

**Mission liée à « Pourquoi ce module mérite ton temps : testing » :** Choisis l'invariant qui correspond à cette leçon. Écris d'abord un test rouge, puis le plus petit correctif. Ajoute un cas nominal, un cas limite et une défaillance réaliste au niveau de test approprié.

**Livrable :** une suite de tests déterministe, une matrice risque/niveau de test et un exemple de régression injectée détectée.

**Critères d’acceptation :** le test échoue avant le correctif ; il observe le contrat public ; les fixtures sont reproductibles ; le niveau de test est justifié ; un mock ne masque pas la frontière critique.

**Transfert obligatoire :** Fais évoluer le contrat sans prévenir le consommateur. Identifie quel test détecte la rupture et lequel ne peut pas la voir.
