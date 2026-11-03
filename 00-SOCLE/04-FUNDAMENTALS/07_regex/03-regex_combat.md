---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: comprendre
cognitive_level: L4
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: low
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : briefing de mission :** ce concept doit survivre au moment où quelqu’un te demande « pourquoi ? » en plein chaos. Garde l’explication technique exacte, puis donne-lui une image qu’on peut raconter demain.

# Regex combat : valider des formats d’entrée

Temps de lecture ~9 min

La validation de formulaires, c'est un terrain de guerre. Les shinobis tapent n'importe quoi. Des espaces au début. Des points en trop. Des extensions bizarres. Des numéros avec des tirets, des espaces, des parenthèses.

Ton regex doit tenir. Dans ce fichier, on construit des validateurs réels : pas des exercices académiques. Des patterns que tu vas réutiliser en prod.

---

## 1) GROUPES DE CAPTURE : extraire ce qui compte

Avant d'attaquer la validation, il faut comprendre les groupes de capture : c'est eux qui te donnent accès aux parties matchées.

```js
const texte = "Naruto a 17 ans et Sasuke a 17 ans aussi"

// sans groupes : juste vérifier si ça matche
/\d+/.test(texte)  // true

// avec groupes : capturer la valeur
const match = texte.match(/(\w+) a (\d+) ans/)
// match[0] : "Naruto a 17 ans" : le match complet
// match[1] : "Naruto"      : groupe 1
// match[2] : "17"        : groupe 2
```

Avec le flag `g`, `.match()` retourne toutes les occurrences mais sans les groupes. Pour extraire les groupes sur plusieurs matches, on utilise `.matchAll()` :

```js
const resultats = [...texte.matchAll(/(\w+) a (\d+) ans/g)];
resultats.forEach((m) => {
  console.log(`${m[1]} : ${m[2]} ans`);
});
// Naruto : 17 ans
// Sasuke : 17 ans
```

---

## 2) GROUPES NOMMÉS : lisibilité maximale

Au lieu de `match[1]`, `match[2]`... tu nommes tes groupes.

```js
const date = "2024-04-15";
const match = date.match(/(?<annee>\d{4})-(?<mois>\d{2})-(?<jour>\d{2})/);

console.log(match.groups.annee); // "2024"
console.log(match.groups.mois); // "04"
console.log(match.groups.jour); // "15"
```

`(?<nom>...)` : groupe nommé. Ça se lit mieux, ça casse moins quand tu réorganises le pattern.

---

## 3) VALIDER UN EMAIL

L'email complet selon RFC 5321 est une horreur de 6 000 caractères. Ce qu'on valide en pratique : une forme raisonnable qui couvre 99% des cas réels.

```js
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validerEmail = (email) => {
  if (typeof email !== "string") return false;
  return emailRegex.test(email.trim());
};
```

Décortiqué :

```text
^           : commence ici, nulle part ailleurs
[a-zA-Z0-9._%+-]+  : partie locale : lettres, chiffres, et ces symboles, au moins 1 fois
@           : le @ obligatoire
[a-zA-Z0-9.-]+    : domaine : lettres, chiffres, points, tirets
\.          : un point littéral (échappé)
[a-zA-Z]{2,}     : extension : au moins 2 lettres (com, fr, io, dev...)
$           : finit ici
```

```js
validerEmail("naruto@konoha.village"); // true
validerEmail("kakashi.sensei@anbu.jp"); // true
validerEmail("@konoha.com"); // false : partie locale manquante
validerEmail("naruto@"); // false : domaine manquant
validerEmail("naruto@ko noha.com"); // false : espace dans le domaine
```

Limite connue : cette regex accepte `naruto@ko..noha.com` (double point dans le domaine). Pour une validation stricte, il faut plus. Pour un formulaire standard : ça suffit.

---

## 4) RECONNAÎTRE UNE URL HTTP(S) SIMPLE

Une URL a des formes nombreuses. Une regex courte peut filtrer une forme attendue, mais elle ne remplace pas un parseur d'URL et ne prouve pas qu'un domaine existe.

```js
const urlRegex = /^https?:\/\/[^\s]+$/i;

const ressembleAUneUrlHttp = (value) => {
  if (typeof value !== "string") return false;
  const candidate = value.trim();
  if (!urlRegex.test(candidate)) return false;

  try {
    const url = new URL(candidate);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== ""
    );
  } catch {
    return false;
  }
};
```

Décortiqué :

```text
^          : début de la chaîne
https?     : "http" ou "https" (s optionnel)
:\/\/      : séparateur "://"
[^\s]+    : au moins un caractère non blanc jusqu'à la fin
$          : fin de la chaîne
```

La regex filtre le protocole et les espaces ; `new URL()` analyse ensuite la structure. Même cette vérification ne prouve pas que le site répond, qu'il est sûr ou que l'application est autorisée à l'appeler.

```js
ressembleAUneUrlHttp("https://crazydevs.io"); // true
ressembleAUneUrlHttp("http://127.0.0.1:4173/api/users"); // true
ressembleAUneUrlHttp("ftp://fichier.com"); // false : protocole non accepté
ressembleAUneUrlHttp("crazydevs.io"); // false : protocole absent
ressembleAUneUrlHttp("https://"); // false : URL incomplète
```

---

## 5) VALIDER UN NUMÉRO DE TÉLÉPHONE

Le format varie par pays. Ici, on traite une forme pédagogique des numéros français : dix chiffres en format national `0X...`, ou neuf chiffres après `+33`, avec des séparateurs facultatifs entre les groupes. Cette regex vérifie la forme, pas l'attribution réelle du numéro.

```js
// accepte : 06 12 34 56 78 / 0612345678 / 06-12-34-56-78 / +33612345678 / +33 6 12 34 56 78
const telRegex = /^(?:\+33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

const validerTel = (tel) => {
  if (typeof tel !== "string") return false;
  return telRegex.test(tel.trim());
};
```

Décortiqué :

```text
^                    : début de la chaîne
(?:\+33[\s.-]?|0) : préfixe "+33" avec séparateur facultatif, ou "0"
[1-9]                : premier chiffre national : 1 à 9
(?:[\s.-]?\d{2}){4} : quatre groupes de deux chiffres ; séparateur facultatif
$                    : fin de la chaîne
```

La répétition `{4}` s'applique au groupe complet : quatre groupes de deux chiffres, donc huit chiffres après le premier chiffre national.

```js
validerTel("06 12 34 56 78"); // true
validerTel("0612345678"); // true
validerTel("06-12-34-56-78"); // true
validerTel("+33612345678"); // true
validerTel("+33 6 12 34 56 78"); // true
validerTel("06.12.34.56.78"); // true
validerTel("123"); // false
validerTel("06 123 45 678"); // false : mauvais groupement
validerTel("+330612345678"); // false : le zéro national ne suit pas +33
```

---

## 6) LE PIÈGE DES REGEX TROP PERMISSIVES

Une regex qui accepte trop c'est pire que pas de validation.

```js
// mauvais -> accepte presque tout
const emailBof = /\w+@\w+\.\w+/;
emailBof.test("a@b.c"); // true : trop court pour être réel
emailBof.test("test@test.test"); // true : .test est réservé aux usages de test, pas une adresse de production validée

// autre piège : oublier les ancres ^ et $
const emailSansFrontiere = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
// accepte : "INJECTION pas-un-email naruto@konoha.com du-texte-après"
// parce que la regex cherche juste si le pattern apparaît quelque part
emailSansFrontiere.test("INJECTION naruto@konoha.com xss"); // true
```

La règle : si tu valides un champ complet, `^` et `$` sont obligatoires.

---

## 7) LOOKAHEAD / LOOKBEHIND : matcher sans consommer

Parfois tu veux vérifier ce qui précède ou suit sans l'inclure dans le match.

```js
// lookahead positif (?=...) : suivi de
// "un mot suivi d'un espace et d'un chiffre"
"Naruto 17 Sasuke 17".match(/\w+(?=\s\d)/g);
// ["Naruto", "Sasuke"] : les mots, sans les chiffres

// lookbehind positif (?<=...) : précédé de
"prix: 42€ bonus: 15€".match(/(?<=:\s)\d+/g);
// ["42", "15"] : les nombres, sans les labels
```

Utile pour extraire une valeur entourée de contexte sans inclure ce contexte dans le résultat.

---

## EXERCICES

## EXO 1 : le validateur de profil ninja

Un formulaire d'inscription pour l'académie de Konoha. Valide les trois champs :

- `username` : 3 à 20 caractères, lettres, chiffres et underscores uniquement
- `email` : format valide
- `telephone` : format FR valide

Écris `validerProfil({ username, email, telephone })` qui retourne :

```js
{
 valide: boolean,
 erreurs: { username?: string, email?: string, telephone?: string }
}
```

Pas de librairie externe. Que des regex.

---

## EXO 2 : l'extracteur de données de match

Tu reçois des chaînes de résultats de matchs :

```text
"PSG 3-1 OM | 45+2' : But de Mbappé (pen.) | 67' : But de Hakimi"
```

Extrait avec des groupes nommés :

- les équipes et scores
- les minutes (avec temps additionnel optionnel)
- les buteurs

Résultat attendu : un objet structuré. Utilise `.matchAll()` pour les événements multiples.

---

## EXO 3 : le validateur de config YAML-like

Des configurations arrivent dans ce format texte :

```text
host: api.konoha.dev
port: 8080
timeout: 30000
debug: true
```

Valide chaque ligne :

- clé : que des lettres et underscores
- valeur : nombre, booléen, ou URL valide

Retourne les lignes invalides avec leur numéro et la raison.

(Indice : `split("\n")` puis regex sur chaque ligne)

---

## RÉSUMÉ

Les groupes de capture transforment une regex de validateur en extracteur. Les groupes nommés rendent le code lisible six mois après. Les ancres `^` et `$` font la différence entre valider et juste détecter.

Lookahead et lookbehind permettent de conditionner un match sur le contexte sans l'inclure dans le résultat.

La regex parfaite n'existe pas : elle couvre un spectre de cas réels. Connaître ses limites est aussi important que de la connaître.

> **Statut pour la première passe : différé.** Termine d’abord la leçon et la pratique de base. Cette variation n’est pas une gate ; saute-la si elle utilise une notion non encore étudiée et reviens-y après les prérequis.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

<!-- AF-DIAGRAM:regex -->

## Repère visuel utile : Import contrôlé des demandes Kintana

```text
ligne externe
   |
   v
regex bornée -> captures nommées
   |
   v
validation métier
   |
 +-----+-----+
 v           v
acceptée   quarantaine
             |
             v
       raison traçable
```

<!-- AF-LESSON-PROFILE: regex -->

## Repères de décision

- **Pourquoi :** Un parseur fiable transforme une chaîne externe en champs vérifiés. Une regex aide pour un motif local, mais ne remplace pas une grammaire ni une validation métier.
- **Quand l’utiliser / quand l’éviter :** Utilise une expression régulière pour reconnaître un motif borné ou extraire un format simple. Évite-la pour parser un langage imbriqué ou une structure complexe ; utilise un parseur dédié.
- **Limites :** Les regex peuvent devenir illisibles, coûteuses ou vulnérables au ReDoS. Une correspondance syntaxique ne prouve pas que la valeur existe ou est autorisée.

## Mécanisme : la version sans magie

Définis le format accepté, ancre le motif, limite les répétitions, capture uniquement les champs utiles, puis valide les valeurs extraites au niveau métier.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Regex combat : valider des formats d’entrée** se rattache à ce cas concret : Kintana importe des coordonnées de contact ou des fichiers de demandes. Un motif trop permissif accepte du bruit ; un motif trop strict rejette des formats légitimes.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Import contrôlé des demandes Kintana

> **Statut Kintana : prolongement d'import différé, facultatif et sans gate supplémentaire.** Les missions de Regex basics, Regex combat et Regex extractor décrivent une seule évolution du même importeur ; ne construis pas trois parseurs. Termine la pratique locale de chaque leçon. Reprends l'import Kintana après les notions d'API, de gestion de fichiers/CSV et le module [Testing](../../../02-CONSTRUCTION/03-TESTING/README.md). Tant que ces prérequis ne sont pas étudiés, n'essaie pas de remplacer un parseur CSV par une regex : cette décision fait justement partie de l'approfondissement.

> **Arc Konoha / Naruto :** un formulaire n'est pas un parchemin fiable. Si le sceau ne correspond pas, tu bloques l'entrée avant qu'elle contamine le village.

**Mission liée à « Regex combat : valider des formats d’entrée » :** Ajoute une extraction ciblée à l'import des demandes : identifie les champs supportés, refuse les lignes mal formées, conserve la ligne source et écris des tests pour les entrées longues et adversariales.

**Livrable :** un parseur d'import, une fixture valide/invalide, des tests de limites et une note sur les formats volontairement non supportés.

**Critères d’acceptation :** la regex est ancrée et commentée ; les champs sont validés après extraction ; les lignes refusées sont traçables sans donnée sensible ; aucun cas de backtracking coûteux connu n'est ignoré.

**Transfert facultatif, à la reprise :** lorsque les prérequis d'import et de test seront étudiés, ajoute des champs optionnels et des séparateurs dans les valeurs. Décide alors si la regex reste adaptée ou si un parseur CSV devient nécessaire.
