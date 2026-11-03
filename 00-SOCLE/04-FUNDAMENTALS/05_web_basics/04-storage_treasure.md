---
stability: stable
last_reviewed: 2026-10-31
acte: comprendre
cognitive_level: L2-L3
perturbation_modes: [changement_contexte, decision_organisationnelle]
anti_recipe_key: changement_contexte+decision_organisationnelle
transfer_distance: low
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** le navigateur peut garder quelques informations utiles, mais cet espace n'est pas un coffre-fort. Une donnée disponible au code de la page ne doit pas être traitée comme un secret.

# Storage treasure : le stockage du navigateur

Temps de lecture indicatif : 7 à 9 min.

Une variable JavaScript disparaît quand la page est rechargée. Le navigateur propose des espaces de stockage pour conserver certaines données entre deux chargements. Ils sont pratiques pour les préférences et les brouillons non sensibles ; ils ne remplacent ni une base de données serveur ni un système d'authentification.

## 1. LocalStorage : conserver une préférence

`localStorage` est un stockage clé-valeur associé à une **origine** (schéma, hôte et port). Une page chargée depuis la même origine peut retrouver ces valeurs après un rechargement et, en général, après la fermeture puis la réouverture du navigateur.

Le mot « permanent » serait trompeur : l'utilisateur, le navigateur, un mode privé ou une politique de stockage peuvent supprimer ou limiter ces données. Ne construis jamais une règle métier qui dépend de leur conservation éternelle.

```javascript
const storageKey = "af-demo:theme";
localStorage.setItem(storageKey, "dark");

const theme = localStorage.getItem(storageKey);
console.log(theme); // "dark" ou null si la clé n'existe pas
```

`localStorage` stocke des chaînes de caractères. Si tu lui donnes un objet directement, JavaScript le convertit en texte d'une manière qui ne conserve pas sa structure.

## 2. Les opérations de base

```javascript
localStorage.setItem("af-demo:hero", "Blob");
const hero = localStorage.getItem("af-demo:hero");
localStorage.removeItem("af-demo:hero");
```

`removeItem()` supprime une clé précise. `clear()` supprime **toutes les clés de localStorage pour l'origine courante**, y compris celles créées par d'autres pages ou exercices utilisant cette même origine. Pour apprendre, préfère une clé préfixée par ton application et `removeItem()`.

```javascript
// À réserver à un profil ou une origine de test isolée :
localStorage.clear();
```

Le navigateur peut refuser l'accès au stockage (par exemple selon ses réglages ou son contexte). Dans une application réelle, prévois un comportement de repli et traite les erreurs possibles ; ne suppose pas que le stockage est toujours disponible.

## 3. Enregistrer un objet avec JSON

Pour conserver un objet, transforme-le en chaîne avec `JSON.stringify()`. Pour le relire, utilise `JSON.parse()`.

```javascript
const player = { name: "Blob", hp: 100 };
const playerKey = "af-demo:player";

localStorage.setItem(playerKey, JSON.stringify(player));

const raw = localStorage.getItem(playerKey);
let restoredPlayer = null;

if (raw !== null) {
  try {
    restoredPlayer = JSON.parse(raw);
  } catch {
    console.log("La valeur enregistrée n'est pas un JSON valide.");
  }
}

console.log(restoredPlayer?.name); // "Blob" si la valeur est valide
```

`JSON.parse()` peut échouer si le texte est invalide. Les données locales peuvent aussi être modifiées par l'utilisateur ou par un autre script de la même origine : valide leur forme avant de les utiliser.

## 4. Règle de sécurité : aucun secret dans Web Storage

**Ne stocke jamais dans `localStorage` ou `sessionStorage` :**

- mot de passe ou clé privée ;
- token d'accès, JWT, refresh token ou identifiant de session ;
- secret d'API ou donnée sensible qui donnerait un accès à un compte.

Ces espaces sont lisibles par le JavaScript exécuté sur la même origine. Une faille XSS peut donc exposer les valeurs qui s'y trouvent. Ils ne chiffrent pas les données et ne constituent pas un coffre-fort. Utilise-les pour des préférences non sensibles, comme un thème ou l'état local d'un exercice.

Pour une session web, le serveur peut utiliser un cookie de session configuré avec des attributs adaptés, notamment `HttpOnly`, `Secure` et `SameSite`, ou une architecture BFF. Le choix exact dépend du modèle de menace ; les protections CSRF nécessaires doivent aussi être étudiées. Cette leçon ne te demande pas de construire un système d'authentification.

## 5. SessionStorage : durée plus courte, pas plus secret

`sessionStorage` suit une page-session, généralement limitée à l'onglet courant et supprimée lorsque cette session d'onglet se termine. Les valeurs survivent aux rechargements de cette page-session, mais restent accessibles au JavaScript de la même origine.

```javascript
sessionStorage.setItem("af-demo:step", "2");
const step = sessionStorage.getItem("af-demo:step");
sessionStorage.removeItem("af-demo:step");
```

Il convient à un état temporaire non sensible, par exemple l'étape d'un quiz local. « Temporaire » ne signifie pas « sécurisé » : n'y place pas de token ou de secret.

## 6. Cookies : une autre mécanique

Un cookie peut être envoyé automatiquement au serveur avec les requêtes qui correspondent à ses règles de domaine, chemin, sécurité et site. Le navigateur n'envoie pas tous les cookies à tous les serveurs : les règles comptent.

Un cookie n'est pas forcément caché au JavaScript. Sans l'attribut `HttpOnly`, un script de la page peut généralement lire les cookies accessibles via `document.cookie`. Un cookie `HttpOnly` est créé par le serveur dans l'en-tête `Set-Cookie` et n'est pas accessible par `document.cookie`.

Exemple conceptuel d'en-tête envoyé par un serveur pour une session HTTPS :

```http
Set-Cookie: session=<identifiant-opaque>; Path=/; HttpOnly; Secure; SameSite=Lax
```

- `HttpOnly` empêche le JavaScript de lire ce cookie ;
- `Secure` demande son envoi uniquement sur une connexion sécurisée HTTPS ;
- `SameSite` limite certains envois dans les contextes inter-sites, mais ne remplace pas à lui seul toutes les protections CSRF.

Pour comprendre `document.cookie`, tu peux tester un cookie **non sensible** de préférence sur ton serveur local :

```javascript
document.cookie = "af-demo:theme=dark; Max-Age=604800; Path=/; SameSite=Lax";
console.log(document.cookie);
```

Ce test ne crée pas un cookie `HttpOnly` et ne doit jamais être transformé en code d'authentification.

## 7. Comparaison utile

|                                      | `localStorage`                                                | `sessionStorage`                                            | Cookie                                                                                |
| ------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Durée                                | Jusqu'à suppression ou nettoyage ; pas une garantie éternelle | Page-session, généralement jusqu'à la fermeture de l'onglet | Selon `Expires` / `Max-Age` ou la session du navigateur                               |
| Portée                               | Même origine                                                  | Même origine et page-session                                | Selon domaine, chemin et règles du cookie                                             |
| Envoyé automatiquement au serveur    | Non                                                           | Non                                                         | Oui, si la requête correspond aux règles                                              |
| Lisible par le JavaScript de la page | Oui                                                           | Oui                                                         | Généralement oui, sauf `HttpOnly`                                                     |
| Usage débutant sûr                   | Préférences non sensibles                                     | État temporaire non sensible                                | Préférences non sensibles ; sessions uniquement avec une conception serveur sécurisée |

## Mission utile : première passe

Crée une préférence de thème non sensible. Enregistre `"dark"` sous `af-demo:theme`, recharge la page et vérifie que la préférence est relue. Ajoute ensuite un bouton qui supprime uniquement cette clé avec `removeItem()`.

**Pourquoi :** ce petit cas montre la persistance d'une préférence sans confondre stockage local et authentification.

**Quand :** cette première passe se fait après les exemples `setItem()`, `getItem()` et `removeItem()` de la leçon.

**Limites :** l'exercice ne prouve ni la sécurité d'une session, ni une persistance garantie, ni une synchronisation serveur.

**Mécanisme :** le navigateur associe la clé à l'origine ; le code relit une chaîne et décide comment l'utiliser.

## Transfert produit différé : préférences et état Kintana

> **Statut : différé et non bloquant.** Ce transfert n'est pas requis pour valider la première passe Storage et ne doit pas conduire à stocker des données d'authentification.

**Mission liée :** dans un cas produit fourni ultérieurement, proposer quelles préférences non sensibles peuvent être conservées localement, quelles données doivent rester côté serveur et quelles données ne doivent jamais être placées dans Web Storage. Justifier la suppression ciblée des clés et le comportement si le stockage est indisponible.

**Gate différée :** aucune donnée sensible ou d'authentification dans Web Storage ; la portée de chaque donnée est justifiée ; l'application ne dépend pas d'une conservation éternelle.

## MISSIONS

### Mission 1 : Le profil du joueur

Crée cet objet :

```javascript
{ name: "Blob", gold: 500, level: 3 }
```

Enregistre-le sous une clé `af-demo:player`, relis-le avec JSON et affiche `Player chargé : Blob niveau 3`. Si la clé est absente ou le texte invalide, affiche un message explicite au lieu de supposer que le joueur existe.

### Mission 2 : Le compteur de visites locales

Lis `af-demo:visits`, convertis la valeur en nombre, augmente-la de 1 et enregistre-la. Gère le cas où la clé n'existe pas encore. Ce compteur est une démonstration locale : il ne sert pas à mesurer des visiteurs réels ni à appliquer une règle métier.

### Mission 3 : L'inventaire

Enregistre `["épée", "potion", "bouclier"]` sous une clé `af-demo:inventory`, relis le tableau après rechargement et affiche chaque élément avec `forEach()`.

### Mission 4 : Effacer une seule donnée

Crée un bouton qui supprime uniquement `af-demo:player` avec `removeItem()`, puis affiche `Le profil de démonstration a été supprimé.` N'utilise pas `localStorage.clear()` sur une origine partagée.

### Mission 5 : Le thème clair / sombre

Crée un bouton `Toggle Dark Mode`. Au clic, ajoute ou enlève la classe `dark` sur le `body` et enregistre la préférence sous `af-demo:theme`. Au chargement suivant, relis cette préférence et applique le thème. Ne stocke aucune information d'authentification.

## RÉSUMÉ

- `localStorage` conserve des chaînes associées à une origine, jusqu'à ce qu'elles soient supprimées ou nettoyées ; ce n'est pas une promesse de durée éternelle.
- `sessionStorage` conserve un état temporaire de page-session ; il n'est pas plus secret.
- `JSON.stringify()` transforme les objets en texte ; `JSON.parse()` relit ce texte et peut échouer si son contenu est invalide.
- Les données Web Storage sont accessibles au JavaScript de la même origine : **pas de mots de passe, tokens, sessions ou secrets**.
- Les cookies suivent des règles d'envoi spécifiques ; `HttpOnly` empêche l'accès par JavaScript, tandis que `Secure` et `SameSite` apportent des protections différentes.

Pour aller plus loin sur les sessions et les tokens, attends le module Sécurité et Authentification. Ne construis pas une authentification à partir de cet exercice de stockage.
