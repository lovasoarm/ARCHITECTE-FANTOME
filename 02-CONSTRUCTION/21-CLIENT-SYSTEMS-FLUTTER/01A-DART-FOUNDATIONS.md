---
stability: evolutif
acte: construire
cognitive_level: L2
assessment_role: prerequisite_bridge
freshness_status: not_verified
source_type: primary
source_url: https://dart.dev/language
canonical_resource: "02-CONSTRUCTION/21-CLIENT-SYSTEMS-FLUTTER/01A-DART-FOUNDATIONS.md"
source_scope: "Initiation ciblée aux constructions Dart utilisées dans ce module ; les versions et APIs restent liées au SDK Flutter épinglé dans SETUP.md."
provenance_note: "Pont pédagogique interne : il aide à lire et écrire les exemples du module, mais ne remplace pas le parcours complet du langage Dart ni une compilation locale."
---

# 01A : Démarrer en Dart avant de construire avec Flutter

Temps indicatif : 35 à 50 min. Cette page est une passerelle pratique : elle enseigne juste assez de Dart pour lire les leçons Flutter et commencer le mini-projet sans confondre la syntaxe avec JavaScript.

## 1. Dart, c'est quoi ?

Dart est le langage. Flutter est le framework d'interface qui utilise Dart. Installer Flutter fournit aussi le SDK Dart : n'installe pas un deuxième Dart indépendant pour ce module.

```text
Dart = langage (variables, fonctions, classes, async)
Flutter = framework d'interface écrit en Dart (widgets, rendu, navigation)
```

## 2. Variables et types

```dart
String name = 'Naruto';
int wins = 12;
double rating = 8.5;
bool online = true;

var season = '2026'; // Dart déduit String
final playerId = 42; // affectation unique à l'exécution
const maxRetries = 3; // constante connue à la compilation
```

`var` ne signifie pas `dynamic` : Dart déduit un type et le conserve. `final` empêche de réaffecter la variable ; `const` sert aux valeurs constantes à la compilation.

## 3. Null safety

Par défaut, un `String` ne peut pas être `null`. Pour autoriser l'absence, écris `String?`.

```dart
String? nickname;
String label = nickname ?? 'Joueur anonyme';

if (nickname != null) {
  print(nickname.toUpperCase()); // promotion du type après le contrôle
}
```

`!` force une valeur nullable à être considérée non nulle. Ne l'utilise pas pour faire taire le compilateur sans avoir une preuve : une valeur réellement nulle provoquera une erreur à l'exécution.

## 4. Fonctions et paramètres nommés

```dart
int totalGoals(int leagueGoals, int cupGoals) {
  return leagueGoals + cupGoals;
}

String describePlayer({required String name, int goals = 0}) {
  return '$name : $goals buts';
}

final summary = describePlayer(name: 'Naruto', goals: 12);
```

Les paramètres entre `{}` sont nommés. `required` oblige l'appelant à fournir la valeur.

## 5. Collections typées

```dart
final List<String> queue = ['commande-1', 'commande-2'];
final Map<String, int> retryCount = {'commande-1': 2};
final Set<String> processedIds = {'commande-1'};

queue.add('commande-3');
retryCount['commande-1'] = 3;
```

`List<T>` est une liste ordonnée, `Map<K, V>` associe une clé à une valeur et `Set<T>` évite les doublons. Le type entre chevrons décrit les éléments attendus.

## 6. Classes et objets

```dart
class Order {
  Order({required this.id, required this.totalCents});

  final String id;
  final int totalCents;

  bool get isFree => totalCents == 0;
}

final order = Order(id: 'cmd-001', totalCents: 25000);
print(order.isFree);
```

Le constructeur nommé rend les arguments explicites. `final` sur les propriétés interdit leur réaffectation après construction ; cela ne rend pas automatiquement immuable tout objet imbriqué.

## 7. Asynchronisme : Future et await

Un `Future<T>` représente un résultat qui arrivera plus tard. `async` permet d'utiliser `await` à l'intérieur d'une fonction.

```dart
Future<String> loadOrderStatus(String orderId) async {
  await Future<void>.delayed(const Duration(milliseconds: 10));
  return 'Commande $orderId prête';
}

Future<void> main() async {
  final status = await loadOrderStatus('cmd-001');
  print(status);
}
```

Une `Future` n'est pas une valeur immédiate. Prévois les erreurs avec `try` / `catch` et n'oublie pas qu'une attente réseau peut échouer ou ne jamais répondre sans timeout approprié.

## 8. Imports et erreurs

```dart
import 'dart:convert';

Map<String, dynamic> decodeObject(String jsonText) {
  final decoded = jsonDecode(jsonText);
  if (decoded is Map<String, dynamic>) return decoded;
  throw const FormatException('Objet JSON attendu');
}
```

`dynamic` désactive une partie des vérifications statiques : utilise-le seulement à une frontière comme le décodage JSON, puis valide et convertis la donnée vers un modèle précis.

## 9. Le petit lien avec Flutter

Un widget Flutter est un objet Dart. Voici un squelette pour reconnaître la syntaxe, pas une application complète :

```dart
import 'package:flutter/material.dart';

class OrderLabel extends StatelessWidget {
  const OrderLabel({super.key, required this.orderId});

  final String orderId;

  @override
  Widget build(BuildContext context) {
    return Text('Commande : $orderId');
  }
}
```

Tu dois pouvoir repérer une classe, un constructeur, une propriété `final`, un `@override` et une méthode qui retourne un widget.

## 10. Vérification avant Flutter

Sans installer quoi que ce soit pour cette lecture, explique ou écris sur papier :

1. la différence entre `var`, `final` et `const` ;
2. pourquoi `String?` accepte `null`, mais `String` ne l'accepte pas ;
3. comment une fonction `Future<Order>` renvoie un résultat asynchrone ;
4. comment lire une `List<Order>` et un `Map<String, int>` ;
5. pourquoi un `dynamic` venant du JSON doit être validé avant d'entrer dans le domaine métier.

**Avant le mini-projet :** depuis la racine d’un vrai projet, exécute `flutter --version`, `dart --version`, `flutter analyze` et `flutter test`. Si le projet a des tests Dart non-Flutter séparés, `dart test` peut être utilisé lorsque la dépendance de test est déclarée. Un résultat papier ne remplace pas ces commandes ; sans environnement, garde le statut `NON TESTÉ  : ENVIRONNEMENT ABSENT`.

## Limites

Cette passerelle ne couvre pas tout Dart : isolates, records, patterns, extensions, génériques avancés, interopérabilité native et écosystème des packages restent hors du périmètre. Elle sert à entrer dans le module, pas à certifier la maîtrise du langage.

## Ressource officielle

- [Dart : Language tour](https://dart.dev/language)
- [Dart : Documentation et outils](https://dart.dev/docs)
