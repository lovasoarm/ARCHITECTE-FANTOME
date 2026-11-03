---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [constraints_injectees, decision_organisationnelle]
anti_recipe_key: constraints_injectees+decision_organisationnelle
transfer_distance: medium
assessment_role: diagnostic_mastery
---

**SCÈNE CRAZYDEVS : Konoha :** un village qui n’a qu’une seule porte n’est pas accessible, il est fragile. Concevoir pour des chemins différents rend le système plus robuste.

> **CrazyDevs : Mur Maria :** une frontière utile n’est pas un mur décoratif. Elle doit contrôler les passages, signaler les brèches et avoir un plan quand le mur tombe.

# Dates et timezones : le cauchemar et comment le résoudre

Temps de lecture ~8 min

Tu stockes une date. Tu l'affiches. Ça marche sur ton écran, à Antananarivo, à 14h. Sauf que l'utilisateur à Tokyo voit une heure différente, et celui à New York encore une autre. Les fuseaux horaires (timezones) ne sont pas un détail cosmétique : c'est la source numéro un de bugs silencieux dans les apps qui touchent plusieurs pays. Walter White synchronise ses livraisons à la minute près : toi aussi, tu dois savoir exactement QUELLE heure tu manipules.

## 1) UTC : LA RÉFÉRENCE DES INSTANTS, PAS DE TOUTES LES DATES

UTC (Temps Universel Coordonné) est la référence non ambiguë pour représenter un **instant précis** : une création, un paiement, un événement déjà survenu ou un rendez-vous confirmé à un moment donné. Pour ces instants, persiste une valeur UTC (par exemple ISO 8601 avec suffixe `Z`) et formate-la dans le fuseau voulu au moment de l'affichage.

Mais une valeur de calendrier n'est pas toujours un instant. Avant de choisir son stockage, demande-toi ce qu'elle signifie :

| Sens métier            | Exemple                                     | Représentation adaptée                                                               |
| ---------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------ |
| Instant précis         | Une demande a été créée à un moment donné   | Instant UTC, par exemple `2026-11-03T11:30:00.000Z`                                  |
| Date civile sans heure | Date de visite, date limite ou jour férié   | Date seule `YYYY-MM-DD`, sans conversion de fuseau                                   |
| Heure locale planifiée | Visite prévue à 09:00 dans une ville donnée | Date + heure locale + fuseau IANA ; résoudre ensuite l'instant selon la règle métier |
| Durée                  | Intervention prévue pendant 90 minutes      | Durée explicite, sans lui attribuer un fuseau                                        |

Pour un rendez-vous fixé à une heure locale, conserve le fuseau IANA qui donne son sens (et la règle de résolution des heures ambiguës ou inexistantes lors d'un changement d'heure). Si le rendez-vous est confirmé comme un instant, conserve aussi cet instant UTC. Une date civile comme `2026-11-03` ne doit pas être transformée en minuit UTC puis affichée comme un instant : selon le fuseau, elle pourrait devenir la veille ou le lendemain.

La règle utile n'est donc pas « tout stocker en UTC », mais **ne jamais confondre un instant, une date civile, une heure locale et une durée**.

```js
// Ça casse (mais fun) : stocker l'heure locale du serveur, sans contexte
const dateCombat = new Date(); // (quelle heure exactement ? celle du serveur, où est-il ?)
db.save({ dateCombat: dateCombat.toString() }); // ("Mon Jun 16 2026 14:30:00 GMT+0300" : 3h de quoi ?)
```

```js
// Correct : stocker en UTC, format universel et non ambigu
const dateCombat = new Date();
db.save({ dateCombat: dateCombat.toISOString() }); // ("2026-06-16T11:30:00.000Z" : le Z = UTC, sans ambiguïté)
```

```text
Serveur à Tana (UTC+3) génère l'heure --> convertit en UTC pour stocker --> chaque client reconvertit en SON fuseau pour afficher
```

## 2) LE PIÈGE DU CHANGEMENT D'HEURE

Certains pays appliquent l'heure d'été (passage en avance ou en retard d'une heure), d'autres non. Une date stockée naïvement "avant" le changement peut devenir fausse après.

```js
// Ça casse (mais fun) : calculer "dans 24h" en ajoutant des millisecondes brutes
function dansUneJournee(date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000); // (faux le jour du changement d'heure !)
}
// Le jour du passage à l'heure d'été, une journée locale dure 23h, pas 24h
// Résultat : un rendez-vous "demain à la même heure" peut tomber une heure à côté
```

Le piège exact : `getTime()` renvoie des millisecondes depuis 1970, une mesure absolue qui ignore complètement les fuseaux. Ajouter "24h en millisecondes" suppose que chaque jour calendaire dure exactement 24h partout. C'est faux deux fois par an, dans les pays à heure d'été.

```js
// Correct : raisonner sur le CALENDRIER (année, mois, jour), pas sur les millisecondes brutes
function dansUneJournee(date) {
  const lendemain = new Date(date); // (copie de la date d'origine)
  lendemain.setDate(lendemain.getDate() + 1); // (avance d'UN jour calendaire, peu importe sa durée réelle en heures)
  return lendemain;
}
// setDate() raisonne en "jours du calendrier", pas en millisecondes : le moteur JS gère
// lui-même la conversion, y compris les jours de 23h ou 25h lors d'un changement d'heure
```

```text
Millisecondes brutes (+86400000) --> ignore le calendrier --> faux les jours de changement d'heure
Composants de date (setDate +1)  --> respecte le calendrier --> correct même les jours de changement d'heure
```

Risque réel : coder l'arithmétique des dates en millisecondes brutes marche 363 jours sur 365, et plante exactement les jours de changement d'heure. Ces bugs sont les pires : rares, donc jamais détectés en test, et catastrophiques en prod le jour J. La règle simple à retenir : pour "+1 jour", "+1 mois", "+1 an", utilise toujours les méthodes `setDate`, `setMonth`, `setFullYear` du calendrier, jamais l'addition de millisecondes.

## 3) AFFICHER DANS LE FUSEAU DU UTILISATEUR

```js
// L'API Intl native du navigateur fait le travail sans librairie externe
const dateUTC = new Date("2026-06-16T11:30:00.000Z");

const formatteurTokyo = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  dateStyle: "full",
  timeStyle: "short",
});

console.log(formatteurTokyo.format(dateUTC)); // (affiche l'heure correcte pour Tokyo, calcul automatique)
```

```text
Même instant UTC --> formatteur Tokyo --> "16 juin 2026, 20:30"
Même instant UTC --> formatteur Tana  --> "16 juin 2026, 14:30"
```

Une seule vérité stockée (UTC), des affichages multiples calculés à la demande. C'est le principe de single source of truth du module 02-CONSTRUCTION/18-WEB-CONCEPTS appliqué aux dates.

## 4) LE PIÈGE DU FUSEAU CÔTÉ CLIENT VS SERVEUR

```js
// Ça casse (mais fun) : faire confiance à l'heure locale de la machine de l'utilisateur
const heureLocale = new Date(); // (et si l'utilisateur a réglé sa machine sur le faux fuseau ?)
if (heureLocale.getHours() >= 22) {
  bloquerAccesNocturne(); // (logique de sécurité basée sur une horloge qu'on ne contrôle pas)
}
```

Pour toute logique sensible (sécurité, planification, facturation), ne fais JAMAIS confiance à l'horloge du client. Calcule côté serveur, en UTC, et compare avec le fuseau réel déclaré (pas deviné) de l'utilisateur.

```js
// Correct : le serveur calcule, en connaissant le fuseau RÉEL déclaré par l'utilisateur
function estHeureNocturne(maintenantUTC, fuseauSpectateur) {
  const heureLocaleReelle = DateTime.fromJSDate(maintenantUTC, {
    zone: fuseauSpectateur,
  });
  return heureLocaleReelle.hour >= 22;
}
```

## 5) LE CAS GARO : COORDONNER DES CHEVALIERS DANS PLUSIEURS VILLES

Imagine le Conseil de Garo qui synchronise une patrouille entre Tokyo, Paris et New York. Si chaque Chevalier reçoit l'heure de combat dans SON fuseau local sans référence UTC commune, la coordination devient un carnage.

```js
// L'heure de rendez-vous, stockée en UTC, partagée entre TOUS les Chevaliers
const heureRendezVous = new Date("2026-06-16T22:00:00.000Z"); // (référence unique, peu importe où on est)

// Chaque Chevalier l'affiche dans SON fuseau local, mais c'est le MÊME instant pour tous
["Asia/Tokyo", "Europe/Paris", "America/New_York"].forEach((fuseau) => {
  const formatteur = new Intl.DateTimeFormat("fr-FR", {
    timeZone: fuseau,
    timeStyle: "short",
  });
  console.log(`${fuseau} : ${formatteur.format(heureRendezVous)}`);
});
```

---

## EXERCICES

EXO 1 : Le rendez-vous qui ne ment jamais :
Construit une fonction qui prend une date UTC et un fuseau cible, et retourne l'heure locale formatée correctement avec `Intl.DateTimeFormat`.

EXO 2 : Le piège du changement d'heure :
Trouve une date qui correspond à un changement d'heure dans un pays de ton choix (cherche "passage heure d'été" pour l'année en cours). Calcule "24h après" avec l'arithmétique naïve (+86400000 ms) puis avec une lib qui gère les fuseaux. Compare les résultats.

EXO 3 : La patrouille mondiale de Garo :
Affiche une même heure de rendez-vous UTC dans 3 fuseaux différents (Tokyo, Paris, New York) en utilisant `Intl.DateTimeFormat`, sans librairie externe.

## RÉSUMÉ

Stocke les instants précis dans une représentation UTC ; conserve les dates civiles comme `YYYY-MM-DD` et les heures locales planifiées avec leur fuseau IANA. Ne transforme pas une date sans heure en instant artificiel. Pour « demain à la même heure », raisonne avec le calendrier et le fuseau, pas avec une addition brute de 86 400 000 ms. Affiche les instants avec une locale et un fuseau explicites via `Intl.DateTimeFormat` ou une bibliothèque adaptée. Pour toute logique sensible, ne fais pas confiance à l'horloge locale du client.

## CHECKPOINT DE PROFONDEUR : variation E : diagnostic à information incomplète

Imagine qu'on te donne seulement le symptôme, pas la cause. Liste les trois informations que tu demanderais en premier, dans l'ordre, puis l'hypothèse que chacune permet de tester. Refuse explicitement au moins une action qui serait prématurée.

### Transfert : changer de contexte

Applique le mécanisme de « Dates et timezones : le cauchemar et comment le résoudre » à une personne qui utilise clavier, contraste renforcé ou lecteur d’écran. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: accessibility -->

## Repères de décision

- **Pourquoi :** L'accessibilité permet à davantage de personnes d'utiliser le produit et rend souvent l'interface plus robuste pour tous, y compris sur mobile et au clavier.
- **Quand l’utiliser / quand l’éviter :** Teste les parcours critiques avec clavier, lecteur d'écran, contraste et zoom. N'attends pas la fin du design pour corriger la structure sémantique.
- **Limites :** Un score Lighthouse ou une vérification automatique ne couvre pas tous les usages. Il faut aussi tester manuellement avec plusieurs modes d'interaction et, quand possible, avec des personnes concernées.

## Mécanisme : la version sans magie

Utilise HTML sémantique, labels, focus visible, ordre logique, messages d'état annoncés et alternatives aux interactions pointer-only.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Dates et timezones : le cauchemar et comment le résoudre** se rattache à ce cas concret : Le demandeur Kintana peut utiliser un petit écran, un clavier externe, le zoom ou un lecteur d'écran. Le formulaire doit rester compréhensible dans tous ces cas.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Parcours de demande accessible

> **Arc One Piece / Grand Line :** un parcours n'est pas réussi si seule une partie de l'équipage peut monter à bord. L'accessibilité enlève les obstacles inutiles.

**Mission liée à « Dates et timezones : le cauchemar et comment le résoudre » :** Audite le flux de création d'une demande Kintana. Corrige les labels, focus, erreurs associées, annonces de statut et navigation clavier ; ajoute des tests automatisés plus une vérification manuelle documentée.

**Livrable :** audit WCAG ciblé, patch de composants, matrice clavier/lecteur d'écran et résultats reproductibles.

**Critères d’acceptation :** aucun contrôle sans nom accessible ; focus visible et séquentiel ; erreurs reliées aux champs ; les états ne reposent pas seulement sur la couleur ; limites des outils automatiques reconnues.

**Transfert obligatoire :** Teste le même parcours à 200 % de zoom et avec un lecteur d'écran. Identifie les défauts non détectés par l'audit automatique.
