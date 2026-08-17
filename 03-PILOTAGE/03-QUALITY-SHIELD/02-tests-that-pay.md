# Pyramide vs trophée, quoi tester selon le coût de la panne

> **Hiérarchie de traitement.** Le traitement de référence des tests est
> [02-CONSTRUCTION/03_testing/](../../02-CONSTRUCTION/03_testing/README.md) : unitaire,
> mocking, intégration, TDD, contrat, end-to-end, stratégie. Cette page est la **mise en
> pratique sur ton fil rouge** : elle arbitre quoi tester chez toi selon le coût réel d'une
> panne. Reviens ici quand tu as lu la référence.

## Le piège

L'équipe du système de tournées de livraison frigorifique a un objectif affiché : "80 % de
couverture de tests". Ils l'atteignent en six semaines en écrivant des centaines de tests
unitaires sur des fonctions pures (formatage de dates, calcul d'un total simple) : faciles à
tester, faible risque si elles cassent. Pendant ce temps, la fonction qui décide si une
tournée respecte la chaîne du froid (température mesurée, durée de trajet, seuils
réglementaires) n'a aucun test, parce qu'elle dépend de plusieurs services externes et
qu'elle est "compliquée à tester". Six mois plus tard, un changement de format de données du
capteur de température casse silencieusement cette fonction pendant deux semaines avant
d'être détecté par un client qui reçoit des produits périmés. Le chiffre "80 %" n'a rien
protégé de ce qui comptait.

## Ce qui se passe vraiment

La couverture de tests est une mesure de _quantité de code exécuté par des tests_, pas de
_probabilité de détecter un bug coûteux_. Une équipe qui optimise la couverture optimise
mécaniquement pour tester ce qui est facile à tester, pas ce qui coûte cher si ça casse, 
parce que ce qui est facile à tester tire la métrique vers le haut plus vite.

```text
Coût réel d'une panne x probabilité qu'un bug s'y glisse = priorité de test

Fonction de formatage de date        Fonction de conformité chaîne du froid
coût si fausse : très faible          coût si fausse : produits perdus,
(un affichage moche)                  client perdu, potentiel litige sanitaire

priorité de test : basse              priorité de test : très haute
                                       (même si "compliquée à tester")
```

### Pyramide de tests, et pourquoi elle ne suffit pas seule

La pyramide de tests classique préconise beaucoup de tests unitaires (rapides, isolés),
moins de tests d'intégration, encore moins de tests bout-en-bout (lents, fragiles) :

```text
        ^
       /E2E\          peu nombreux, lents, coûteux à maintenir
      /-----\
     /Integ. \        nombre moyen, vérifient les frontières entre modules
    /---------\
   /   Unit    \      nombreux, rapides, isolent une seule règle
  /-------------\
```

Cette forme est un bon défaut _technique_ : elle optimise pour la vitesse d'exécution et la
facilité de diagnostic (un test unitaire qui échoue pointe précisément la fonction en cause).
Mais elle ne dit rien sur _quoi_ tester à chaque niveau. Une pyramide remplie de tests
unitaires sur du code sans risque business est une pyramide creuse.

### Trophée de tests : une autre répartition, un autre pari

Le "trophée de tests" (popularisé pour les applications à forte logique d'intégration)
inverse une partie du pari : il mise gros sur les tests d'intégration, parce que c'est là
que se cachent la majorité des vrais bugs de production : aux frontières entre modules, pas
à l'intérieur d'une fonction isolée.

```text
        ^
       / \    E2E : très peu, juste les parcours critiques
      /---\
     /     \  Integration : gros du budget de test : c'est ici que les
    /-------\  vrais bugs de frontière se révèlent (base de données réelle,
   /  Unit   \  appel réseau simulé fidèlement, format de message réel)
  /-----------\
     (statique : linter, typage : filet gratuit en continu)
```

Ni la pyramide ni le trophée n'est "la bonne réponse" universelle. Le bon choix dépend d'où
se trouve, dans _ton_ système, le point où les bugs coûteux se produisent réellement.

```text
Question à se poser pour chaque zone du système :
"Si un bug se glisse ici, quel est le coût réel, et à quel niveau (unité,
frontière entre modules, parcours complet) ce bug serait-il visible avant
la production ?"
```

Analogie : des tests qui rapportent, c'est un menuisier qui vérifie l'équerrage d'un
assemblage avant de le coller définitivement, et un protocole de triage aux urgences qui
vérifie les mêmes signes vitaux sur chaque patient pour ne rater aucune urgence connue.
Où l'analogie casse : l'équerrage ou le protocole de triage se vérifient en quelques
secondes avec un outil simple. Une suite de tests logiciels coûte du temps à écrire et à
maintenir à chaque changement de code, tester ne devient jamais gratuit comme relire un
angle au niveau à bulle.

## Exemple concret : où mettre l'effort sur le système de tournées

```typescript
// Fonction pure, coût de panne faible : test unitaire suffisant, rapide à écrire.
function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${String(m).padStart(2, "0")}`;
}

// Règle métier à fort coût de panne : mérite un test d'intégration avec de
// vraies données de capteur (rejouées depuis un enregistrement réel), pas
// un mock trop simplifié qui masquerait les cas limites du capteur réel.
async function checkColdChainCompliance(
  tourId: string,
  sensorReadings: SensorReading[], // relevés réels, pas une valeur unique
  thresholds: ComplianceThresholds,
): Promise<ComplianceResult> {
  // logique de vérification : chaque relevé, sa durée hors seuil cumulée,
  // le seuil réglementaire par type de produit transporté.
  // ...
  return evaluateReadings(sensorReadings, thresholds);
}
```

Le test unitaire de `formatDuration` protège contre un affichage cassé : coût faible, effort
faible, cohérent. Le test de `checkColdChainCompliance` doit être un test d'intégration
utilisant un jeu de données de capteur réel rejoué (pas une valeur inventée à la main), parce
que le bug qui compte n'est pas dans la logique de calcul isolée, mais dans la façon dont
elle réagit à des données réelles bruitées, en retard, ou incomplètes.

## Le contre-exemple qui casse : 90 % de couverture, incident quand même

L'équipe de facturation d'un cabinet vétérinaire multi-sites affiche fièrement 91 % de
couverture sur son module de calcul de remise fidélité. Le dashboard CI est vert depuis huit
mois. Un jour, un client reçoit une facture avec une remise de -15 % au lieu de +15 % :
l'application a facturé plus cher un client fidèle plutôt que de le récompenser.

```typescript
// loyaltyDiscount.ts : la fonction, telle qu'elle existe en production
function applyLoyaltyDiscount(amount: number, loyaltyYears: number): number {
  const rate = loyaltyYears >= 5 ? 0.15 : loyaltyYears >= 2 ? 0.05 : 0;
  // Bug réel : le signe est appliqué à l'envers pour les clients à taux plein
  // depuis un refactor qui a inversé l'ordre d'un ternaire imbriqué.
  return loyaltyYears >= 5 ? amount * (1 + rate) : amount * (1 - rate);
}
```

```typescript
// La suite de tests existante : quatre tests, tous verts, 91 % de lignes couvertes
test("client sans ancienneté ne reçoit aucune remise", () => {
  expect(applyLoyaltyDiscount(100, 0)).toBe(100);
});

test("client 2 ans reçoit 5 % de remise", () => {
  expect(applyLoyaltyDiscount(100, 2)).toBe(95);
});

test("le montant retourné est bien un nombre", () => {
  expect(typeof applyLoyaltyDiscount(100, 5)).toBe("number");
});

test("la fonction ne lève pas d'exception avec une valeur négative", () => {
  expect(() => applyLoyaltyDiscount(100, -1)).not.toThrow();
});
```

Chaque ligne de `applyLoyaltyDiscount` est exécutée par au moins un de ces quatre tests : la
couverture de lignes est donc réelle, pas un artefact d'outillage. Pourtant aucun test ne
vérifie la valeur exacte retournée pour un client à 5 ans d'ancienneté, le seul cas où le
signe s'inverse. Le test manquant est celui-ci :

```typescript
// Le test qui aurait attrapé le bug avant production, absent de la suite existante
test("client fidèle depuis 5 ans paie MOINS cher, pas plus", () => {
  expect(applyLoyaltyDiscount(100, 5)).toBe(85); // et non 115
});
```

La leçon ne porte pas sur "il fallait plus de tests". La suite avait déjà 91 % de couverture.
Elle porte sur la nature du test manquant : un test qui vérifie une valeur de sortie exacte
sur le cas métier le plus important (le palier de remise maximal), pas un test qui vérifie
que la fonction "ne plante pas" ou "retourne un nombre". La couverture de lignes ne distingue
pas un test qui vérifie un résultat correct d'un test qui vérifie seulement que le code
s'exécute sans erreur.

```text
Coût de l'incident : 340 factures erronées avant détection (six jours), 340 avoirs
correctifs à émettre manuellement, une clinique qui menace de résilier son contrat, et
deux jours d'un développeur senior pour auditer tout le module de facturation par
précaution. Coût estimé total : environ 6 000 euros de temps + un risque commercial non
chiffrable. Le test manquant coûtait quatre lignes à écrire, cinq minutes.
```

## Le coût de maintenance d'un test, chiffré sur un an

Un test n'est pas gratuit une fois écrit : il doit être lu, compris et parfois corrigé à
chaque changement du code qu'il couvre. Sur une équipe de taille moyenne, on peut estimer ce
coût de façon simple, par catégorie de test :

```text
Test unitaire sur fonction pure
  Coût d'écriture initial : ~10 minutes
  Fréquence de casse par changement de code voisin : faible (1 à 2 fois/an)
  Coût de correction par casse : ~5 minutes (le message d'échec pointe la ligne exacte)
  Coût annuel estimé : 10 + (1,5 x 5) = ~17 minutes/an

Test d'intégration (base de données réelle, appel réseau simulé)
  Coût d'écriture initial : ~45 minutes (mise en place de l'environnement de test)
  Fréquence de casse par changement de code voisin : moyenne (3 à 5 fois/an, la
    frontière entre modules change plus souvent que la logique interne d'une fonction)
  Coût de correction par casse : ~20 minutes (diagnostic plus long, plusieurs
    composants impliqués)
  Coût annuel estimé : 45 + (4 x 20) = ~125 minutes/an

Test end-to-end (parcours complet, interface incluse)
  Coût d'écriture initial : ~90 minutes
  Fréquence de casse SANS lien avec un vrai bug (fragilité, timing, environnement) :
    élevée (8 à 12 fois/an sur une suite non stabilisée)
  Coût de correction par casse : ~30 minutes, souvent pour un faux positif
  Coût annuel estimé : 90 + (10 x 30) = ~390 minutes/an, dont une large part sans
    aucun bug réel détecté en contrepartie
```

Un test end-toeend coûte environ vingt-trois fois plus cher à maintenir sur un an qu'un test
unitaire équivalent, pour un pouvoir de détection qui n'est pas vingt-trois fois supérieur.
C'est ce calcul, pas une préférence esthétique, qui justifie d'en écrire peu et seulement sur
les parcours réellement critiques.

## Quel test payer en premier : la règle de choix

Face à une liste de tests possibles et un temps limité, la question n'est jamais "quel test
est le plus facile à écrire" mais "quel test, s'il manque, coûte le plus cher en production,
rapporté au coût de son écriture et de son entretien" :

```text
Score de priorité = (coût estimé d'une panne non détectée x probabilité qu'elle survienne)
                     / (coût d'écriture + coût de maintenance annuel estimé)

Un score élevé : panne coûteuse et probable, test bon marché à écrire et entretenir
  --> à écrire en premier, sans hésitation

Un score faible : panne peu coûteuse ou improbable, test cher à écrire et fragile
  --> à écrire en dernier, ou pas du tout, sauf obligation réglementaire
```

Appliqué au cas de la remise fidélité : le palier maximal (5 ans, 15 %) touche les clients
les plus rentables et les plus visibles commercialement, le test coûte cinq minutes à écrire
et presque rien à maintenir (une fonction pure, sans dépendance externe). Le score est
maximal. Un test end-to-end qui vérifie que la page de facturation "s'affiche sans erreur
visuelle" a un score bien plus faible : la panne qu'il détecte est visible immédiatement par
n'importe quel utilisateur, et son coût de maintenance est élevé.

## Compromis

| Option                                    | Coût                                                                | Bénéfice                                                           | Quand choisir                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Optimiser pour la couverture globale      | Facile à mesurer, facile à afficher en réunion                      | Donne une impression objective de sérieux                          | Jamais comme objectif en soi : utile seulement comme indicateur secondaire          |
| Prioriser par coût de panne x probabilité | Demande une analyse préalable, moins facile à résumer en un chiffre | Concentre l'effort là où un bug coûterait vraiment cher            | Systématiquement, sur tout système avec des zones de risque inégal                  |
| Pyramide (beaucoup d'unitaires)           | Rapide à exécuter, diagnostic précis                                | Bon defaut pour de la logique pure et isolée                       | Système avec beaucoup de règles calculables indépendamment                          |
| Trophée (accent sur l'intégration)        | Tests plus lents, plus proches de la réalité                        | Détecte les vrais bugs de frontière (réseau, base, format externe) | Système dont le risque vient des interactions entre composants ou services externes |

## Pièges classiques

- Fixer un objectif de pourcentage de couverture sans lien avec le coût de panne : le
  symptôme est une suite de tests énorme qui n'a jamais attrapé le bug qui a fait mal.
- Tester une règle métier critique avec un mock trop simplifié : le symptôme est un test
  vert qui ne détecte pas un vrai bug parce que le mock ne reproduit pas les cas limites
  réels des données externes.
- Écrire des tests end-to-end pour chaque variation mineure : le symptôme est une CI si
  lente que l'équipe arrête de la faire tourner avant de merger.
- Considérer l'absence de test comme acceptable "parce que c'est compliqué à tester" : le
  symptôme récurrent : le code compliqué à tester est justement celui qui casse le plus
  silencieusement, parce que sa complexité cache aussi la complexité de ses bugs.

## Ce que tu dois savoir défendre

1. Explique pourquoi un pourcentage de couverture de tests peut monter alors que le risque
   réel de production, lui, ne baisse pas.
2. Pour un système que tu connais, identifie une zone à faible coût de panne (bon candidat
   pour un test unitaire simple) et une zone à fort coût de panne (candidate à un test
   d'intégration avec données réelles).
3. Explique la différence entre pyramide et trophée de tests, et quel facteur du système
   fait pencher le choix vers l'un ou l'autre.
