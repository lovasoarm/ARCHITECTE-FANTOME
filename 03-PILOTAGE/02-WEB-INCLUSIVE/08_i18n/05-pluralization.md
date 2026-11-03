---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, fausse_piste]
anti_recipe_key: decision_organisationnelle+fausse_piste
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# Pluralisation : "1 résultat" vs "2 résultats" vs "many"

Temps de lecture ~7 min

"1 résultat", "2 résultats" : en français, c'est simple, juste un "s" qui apparaît. Mais en anglais, "1 result", "2 results", même logique. En japonais, il n'y a même pas de pluriel grammatical du tout. En russe ou en arabe, il existe plusieurs formes selon que le nombre est 1, 2, quelques-uns, ou beaucoup. Si tu codes ta pluralisation en pensant "juste ajouter un s", tu casses TOUTES les langues qui ne fonctionnent pas comme le français.

## 1) LE PIÈGE DU "AJOUTE UN S"

```js
// Ça casse (mais fun) : la pluralisation à la française appliquée partout
function direResultats(nombre) {
  return `${nombre} résultat${nombre > 1 ? "s" : ""}`;
}
// "1 résultat", "2 résultats" : ok en français
// Mais cette fonction ne marche QUE pour le français : elle suppose qu'il existe exactement 2 formes
```

```text
Langue   Nombre de formes plurielles  Exemple
Français  2 (singulier / pluriel)    1 résultat / 2 résultats
Anglais  2 (singulier / pluriel)    1 result / 2 results
Japonais  1 (aucune distinction)     結果 (identique pour 1 ou 100)
Russe   4 (one / few / many / other)  1 / 2-4 / 5-20 / 21+ ont des formes différentes
Arabe   6 formes différentes      zero / one / two / few / many / other
```

Le russe distingue 4 catégories selon des règles de divisibilité particulières. L'arabe en a 6. Coder "if nombre > 1, ajoute un s" casse instantanément sur ces langues.

## 2) INTL.PLURALRULES : LAISSER LE NAVIGATEUR DÉCIDER LA CATÉGORIE

```js
const regleFr = new Intl.PluralRules("fr-FR");
console.log(regleFr.select(0)); // "other" (en français : 0 résultat, pluriel)
console.log(regleFr.select(1)); // "one"
console.log(regleFr.select(2)); // "other"

const regleRu = new Intl.PluralRules("ru-RU");
console.log(regleRu.select(1)); // "one"
console.log(regleRu.select(2)); // "few"
console.log(regleRu.select(5)); // "many"
console.log(regleRu.select(21)); // "one" (oui, 21 redevient "one" en russe, règle de divisibilité)
```

`Intl.PluralRules` ne te donne pas le texte final, il te donne la CATÉGORIE grammaticale ("one", "few", "many", "other"). À toi ensuite d'associer chaque catégorie à sa traduction.

## 3) COMBINER PLURALRULES ET TES TRADUCTIONS

```js
// Fichier de traduction avec une entrée par catégorie grammaticale
const traductionsFr = {
  resultats: {
    one: "{nombre} résultat",
    other: "{nombre} résultats",
  },
};

const traductionsRu = {
  resultats: {
    one: "{nombre} результат",
    few: "{nombre} результата",
    many: "{nombre} результатов",
    other: "{nombre} результатов",
  },
};

function pluraliser(nombre, cle, locale, traductions) {
  const regle = new Intl.PluralRules(locale);
  const categorie = regle.select(nombre); // ("one", "few", "many", "other")
  const gabarit = traductions[cle][categorie] ?? traductions[cle].other;
  return gabarit.replace("{nombre}", nombre); // (injecte le nombre dans le texte choisi)
}

console.log(pluraliser(1, "resultats", "fr-FR", traductionsFr)); // "1 résultat"
console.log(pluraliser(5, "resultats", "ru-RU", traductionsRu)); // "5 результатов"
```

```text
Nombre + locale --> Intl.PluralRules choisit la catégorie --> traductions[catégorie] --> texte final correct
```

## 4) LE CAS DES STREAMS TRAPSOUL RADIO

Trapsoul Radio affiche "X auditeurs en direct". Si l'app sort à l'international, cette phrase doit se pluraliser correctement dans chaque langue de l'audience.

```js
const traductionsAuditeurs = {
  fr: { one: "{n} auditeur en direct", other: "{n} auditeurs en direct" },
  en: { one: "{n} listener live", other: "{n} listeners live" },
  ja: { other: "{n}人のリスナーが視聴中" }, // (japonais : une seule forme, pas de "one")
};

function direAuditeurs(nombre, locale) {
  const regle = new Intl.PluralRules(locale);
  const categorie = regle.select(nombre);
  const gabarits = traductionsAuditeurs[locale.slice(0, 2)];
  const gabarit = gabarits[categorie] ?? gabarits.other; // (fallback si la catégorie n'existe pas dans cette langue)
  return gabarit.replace("{n}", nombre);
}
```

Risque réel : oublier le fallback `?? gabarits.other`. Si le japonais n'a qu'une catégorie "other" et que ton code essaie d'accéder à `gabarits.one` qui n'existe pas, tu obtiens `undefined` affiché en pleine interface.

## 5) LE PIÈGE QUI CASSE (MAIS FUN) : LE ZÉRO OUBLIÉ

```js
// Ça casse (mais fun) : oublier le cas zéro, qui a parfois sa propre forme
function direMessages(nombre) {
  return nombre === 1 ? "1 message" : `${nombre} messages`;
}
console.log(direMessages(0)); // "0 messages" : grammaticalement correct en français, mais...
```

En français, "0 résultat" (singulier) est en fait la forme correcte selon certaines conventions, contrairement à "0 résultats". `Intl.PluralRules('fr-FR').select(0)` retourne `"other"`, donc le pluriel : c'est la règle officielle ICU (International Components for Unicode) suivie par `Intl`, plus fiable que ton intuition perso sur ce cas limite.

---

## EXERCICES

EXO 1 : Le tableau de scores qui ne boite pas :
Utilise `Intl.PluralRules` pour afficher correctement "1 but" / "2 buts" en français, puis teste la même fonction sur la locale `ru-RU` avec les nombres 1, 2, 5, 21 pour observer les 4 catégories.

EXO 2 : Les auditeurs en direct de Trapsoul Radio :
Construit la fonction `direAuditeurs` complète avec un fallback `other` pour le japonais, et vérifie qu'aucun `undefined` n'apparaît jamais à l'écran, peu importe le nombre testé.

EXO 3 : Le cas zéro qui piège tout le monde :
Teste `Intl.PluralRules('fr-FR').select(0)` et `Intl.PluralRules('en-US').select(0)`. Compare les deux résultats et explique pourquoi coder cette règle "à l'intuition" est risqué.

## RÉSUMÉ

La pluralisation n'est jamais juste "ajouter un s" : certaines langues ont 1 forme, d'autres 2, d'autres jusqu'à 6 selon des règles de divisibilité précises. `Intl.PluralRules` donne la bonne catégorie grammaticale ("one", "few", "many", "other") pour n'importe quelle locale, et tes fichiers de traduction doivent prévoir une entrée par catégorie. Toujours prévoir un fallback `other` pour les langues qui n'ont pas toutes les catégories, sinon tu affiches `undefined` en prod.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

### Transfert : changer de contexte

Applique le mécanisme de « Pluralisation : "1 résultat" vs "2 résultats" vs "many" » à une personne qui utilise clavier, contraste renforcé ou lecteur d’écran. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Pluralisation : "1 résultat" vs "2 résultats" vs "many"** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « Pluralisation : "1 résultat" vs "2 résultats" vs "many" » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.
