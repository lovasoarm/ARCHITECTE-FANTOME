---
stability: stable
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# EXO IA MENTEUSE : module 07_math_basics

Temps : ~10 min. Format court, seul ou en binôme.

## Snippet IA plausible

L'assistant te propose ce code, l'air confiant :

```js
// Le service envoie ce code pour confirmer une demande de réinitialisation.
function createRecoveryCode() {
  return String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
}
```

Il ajoute : _"C'est propre, testé, prod-ready."_

## Ta question unique

**Où est la faille ?**

Prends 5 minutes. Écris ta réponse **sans** relancer l'IA. Nomme :

1. Le comportement observable qui trompe (pourquoi ça a l'air correct).
2. Le vrai problème (technique, sécurité, complexité, ou sémantique).
3. La correction minimale que **toi** tu apporterais.

## Piste de correction (à ne lire qu'après)

> Le code semble produire six chiffres, mais `Math.random()` n'est pas un générateur cryptographique et ne convient pas à un code de récupération. Dans Node.js, utilise `randomInt(0, 1_000_000)` de `node:crypto` : la borne supérieure est exclusive et la fonction évite le biais de modulo. Un code à six chiffres exige aussi expiration courte, usage unique, limitation des tentatives et stockage/protection adaptés ; le générateur aléatoire ne remplace pas ces contrôles.

### Correction possible (à lire après ta réponse)

```js
import { randomInt } from "node:crypto";

function createRecoveryCode() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
```

Le générateur corrige la partie aléatoire. Le service doit encore appliquer une expiration, un usage unique, une limitation des essais et une protection du code stocké. Aucun de ces contrôles n'est garanti par `randomInt` seul.

## Pourquoi cet exo

En 2026, l'IA génère du code **plausible** plus vite qu'elle ne le vérifie.
Le métier n'est plus d'écrire ; c'est de **repérer la faille** dans une
suggestion qui a l'air correcte. Ce drill de 10 min, une fois par module,
te transforme de consommateur en pilote.
