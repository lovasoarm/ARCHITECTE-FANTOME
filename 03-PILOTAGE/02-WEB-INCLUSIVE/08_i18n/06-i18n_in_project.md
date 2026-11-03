---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, constraints_injectees]
anti_recipe_key: decision_organisationnelle+constraints_injectees
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : armure Garo :** une protection qui existe mais n'est jamais vérifiée est juste un costume brillant. Ici, chaque garde-fou doit être testable et attaquable.

# I18n dans un vrai projet : organisation, performance, dx

Temps de lecture ~7 min

Tu sais maintenant gérer les clés, les dates, les nombres, le pluriel. Reste la question que les tutos évitent : comment tout ça s'organise dans un VRAI projet, sans faire exploser le poids de ton bundle (le paquet de fichiers JS envoyé au navigateur) ni rendre la vie des devs infernale. L'i18n mal architecturée, c'est le genre de dette qui se paie cher six mois plus tard, exactement comme le code spaghetti du module 02-CONSTRUCTION/11-REFACTORING.

## 1) LE PIÈGE DU BUNDLE QUI GONFLE

```js
// Ça casse (mais fun) : charger TOUTES les langues d'un coup, pour tout le monde
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import mg from "./locales/mg.json";
// 4 langues chargées même si l'utilisateur n'en lit qu'une seule
```

Un utilisateur français télécharge aussi les traductions japonaises et malgaches qu'il n'utilisera jamais. Sur une grosse app avec 10 langues, ça peut représenter des centaines de Ko inutiles, ce qui touche directement le LCP (Largest Contentful Paint) du module 02-CONSTRUCTION/05-MEMORY-PERFORMANCE.

```js
// Correct : chargement dynamique, seulement la langue active
async function chargerTraductions(locale) {
  const module = await import(`./locales/${locale}.json`); // (import dynamique : un seul fichier chargé)
  return module.default;
}

const traductions = await chargerTraductions("fr"); // (seul fr.json est téléchargé)
```

```text
Sans lazy loading --> toutes les langues dans le bundle initial --> poids gonflé pour tout le monde
Avec lazy loading --> seule la langue active est chargée --> poids minimal, par utilisateur
```

## 2) DÉTECTER LA LANGUE DU UTILISATEUR

```js
function detecterLangue() {
  const langueNavigateur = navigator.language; // ("fr-FR", "ja-JP"...)
  const languesSupportees = ["fr", "en", "ja", "mg"];
  const langueCourte = langueNavigateur.split("-")[0]; // ("fr-FR" devient "fr")

  return languesSupportees.includes(langueCourte) ? langueCourte : "en"; // (fallback si non supportée)
}
```

Risque réel : forcer une langue par défaut sans détecter celle du navigateur, c'est imposer ta langue natale à un utilisateur japonais qui n'a jamais demandé ça. Détecter, puis laisser l'utilisateur changer manuellement s'il veut : les deux options ensemble, jamais une seule.

## 3) STRUCTURE DE FICHIERS QUI TIENT À L'ÉCHELLE

```text
locales/
├── fr/
│  ├── auth.json
│  ├── profil.json
│  └── radio.json
├── en/
│  ├── auth.json
│  ├── profil.json
│  └── radio.json
└── ja/
  ├── auth.json
  ├── profil.json
  └── radio.json
```

Un fichier par namespace, par langue. Ça permet de charger SEULEMENT le namespace nécessaire à la page courante, en plus de la langue.

```js
// Charger uniquement ce dont la page a besoin : langue ET contexte
async function chargerNamespace(locale, namespace) {
  const module = await import(`./locales/${locale}/${namespace}.json`);
  return module.default;
}

const traductionsAuth = await chargerNamespace("fr", "auth"); // (page de login : juste 'auth', pas 'radio')
```

## 4) LA DX (DEVELOPER EXPERIENCE) : ÉVITER LES CLÉS FANTÔMES

```js
// Problème courant : une clé existe en français mais a été oubliée en anglais
// fr/profil.json : { "titre": "Mon profil", "bouton": "Sauvegarder" }
// en/profil.json : { "titre": "My profile" } // ("bouton" a été oublié)
```

```js
// Script de vérification à lancer en CI (intégration continue, voir module 05-MAITRISE/06-ANNEXES)
function verifierClesManquantes(traductionsBase, traductionsCible) {
  const clesBase = Object.keys(traductionsBase);
  const clesCible = Object.keys(traductionsCible);
  const manquantes = clesBase.filter((cle) => !clesCible.includes(cle));

  if (manquantes.length > 0) {
    throw new Error(`Clés manquantes en anglais : ${manquantes.join(", ")}`); // (bloque le build, pas la prod)
  }
}
```

Sans ce genre de vérification automatique, une clé oubliée passe inaperçue jusqu'à ce qu'un utilisateur anglophone tombe sur un trou ou un `undefined` dans l'interface. Mieux vaut que le build casse avant la mise en prod plutôt que l'utilisateur le découvre.

## 5) LE CAS TRAPSOUL RADIO : 4 LANGUES, ZÉRO COMPROMIS

Trapsoul Radio supporte français, anglais, japonais et malgache. Voici comment les pièces s'assemblent :

```js
async function initialiserI18n() {
  const locale = detecterLangue(); // (étape 2 : détection)
  const namespace = determinerNamespacePage(); // ("radio", "profil", "auth" selon la page)

  const traductions = await chargerNamespace(locale, namespace); // (étape 3 : chargement ciblé)

  return {
    t: (cle, params) =>
      pluraliser(params?.nombre, cle, locale, traductions) ?? traductions[cle], // (étape 1+4 combinées)
  };
}
```

```text
Page chargée --> détecte la langue du navigateur --> détecte le namespace utile --> charge SEULEMENT ce fichier précis
--> fonction t() prête, avec pluralisation et fallback intégrés
```

Risque réel à surveiller : multiplier les imports dynamiques sans cache peut recharger le même fichier plusieurs fois si l'utilisateur navigue entre les mêmes pages. Mets en cache le résultat de `chargerNamespace` en mémoire pour éviter de retélécharger ce qui est déjà là.

---

## EXERCICES

EXO 1 : Allège le bundle :
Transforme un import statique de plusieurs fichiers de traduction en import dynamique (`await import(...)`), et vérifie dans l'onglet Network de DevTools que seule la langue active est bien téléchargée.

EXO 2 : Le détective de clés manquantes :
Écris une fonction qui compare deux objets de traduction (français comme référence, anglais comme cible) et liste toutes les clés présentes en français mais absentes en anglais.

EXO 3 : Le namespace de Trapsoul Radio :
Organise 3 namespaces (`auth`, `radio`, `profil`) pour 2 langues (`fr`, `en`), avec une fonction qui charge uniquement le namespace demandé pour la langue active, sans jamais charger les autres.

## RÉSUMÉ

Charger toutes les langues d'un coup gonfle le bundle pour rien : utilise l'import dynamique pour ne charger que la langue active. Détecte la langue du navigateur en fallback intelligent, mais laisse toujours l'utilisateur la changer manuellement. Découpe les traductions par namespace et par fichier pour que ça tienne à l'échelle. Et automatise la détection des clés manquantes en CI, pour qu'un trou de traduction casse le build plutôt que l'expérience utilisateur en prod.

## CHECKPOINT DE PROFONDEUR : variation A : prédire avant de réparer

Ferme la page. Introduis un changement de contexte (charge, données, concurrence ou contrainte).
Prédit deux effets observables **avant** toute correction. Puis explique le mécanisme causal qui relie l'hypothèse au symptôme. Termine par : une mauvaise intuition plausible, la mesure qui permettrait de la réfuter, et le signal qui te ferait changer de modèle.

### Transfert : changer de contexte

Applique le mécanisme de « I18n dans un vrai projet : organisation, performance, dx » à une personne qui utilise clavier, contraste renforcé ou lecteur d’écran. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **I18n dans un vrai projet : organisation, performance, dx** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « I18n dans un vrai projet : organisation, performance, dx » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.
