---
stability: intemporel
acte: comprendre
cognitive_level: L4
perturbation_modes: [solution_concurrente, defaut_cache]
anti_recipe_key: solution_concurrente+defaut_cache
transfer_distance: high
assessment_role: diagnostic_mastery
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Transformer "ça marche pas" en problème précis

Temps de lecture ~9 min

C'est le ticket le plus fréquent que tu vas recevoir dans ta carrière :

> _"ça marche pas"_
> _"c'est lent"_
> _"les utilisateurs se plaignent"_
> _"le truc fait pas ce qu'il devrait faire"_

Ces phrases ne sont pas des specs. Ce sont des symptômes.

Un dev junior ouvre le code et cherche le bug. Un dev senior s'arrête d'abord et transforme le symptôme en problème précis et attaquable.

---

## 1) POURQUOI LES SPECS SONT TOUJOURS FLOUES

Les gens qui écrivent les specs pensent dans leur domaine, pas dans le tien.

Rick Grimes ne pense pas en termes de structures de données. Il pense en termes de survie. Il dit "le système de rations marche pas" parce que c'est son problème à lui.

Ton boulot : traduire son problème en problème technique.

```text
Ce qu'on reçoit           Ce qu'on doit produire
"ça marche pas"       -->   "fonction X retourne null pour input Y"
"c'est lent"         -->   "endpoint /api/camp prend 4s pour 200 records"
"les stats sont fausses"   -->   "goalDifference calculé avec les matchs nuls inclus"
"ça freeze parfois"     -->   "UI bloquée pendant 800ms lors de l'import CSV"
```

---

## 2) LE PROTOCOLE DE CLARIFICATION

Quand une spec est floue, tu poses cinq questions. Dans cet ordre.

**1. Qu'est-ce qui se passe actuellement ?**
Pas ce qui devrait se passer. Ce qui se passe réellement. Avec des exemples concrets.

**2. Qu'est-ce qui devrait se passer ?**
Le comportement attendu. Précis. Pas "ça devrait fonctionner correctement".

**3. Dans quelles conditions ça se produit ?**
Toujours ? Parfois ? Sur certains inputs ? Sur certains navigateurs ? À partir d'un certain volume ?

**4. C'est quoi l'impact réel ?**
Bloquant ? Contournable ? Affecte combien d'utilisateurs ? Depuis quand ?

**5. Qu'est-ce qui a changé récemment ?**
Nouveau déploiement ? Nouvelles données ? Changement de config ? Pic de trafic ?

```text
Ticket reçu : "le classement du Ballon d'Or est faux"

Après le protocole :
- Actuellement  : Messi a 847 points mais apparaît 3ème
- Attendu    : Messi devrait être 1er (plus de points que les deux devant lui)
- Conditions   : seulement quand le vote dépasse 500 jurés
- Impact     : la cérémonie est dans 48h, le résultat sera publié en live
- Changé récemment : on a migré le système de vote de JSON flat à une DB il y a 3 jours
```

Maintenant c'est un problème attaquable.

---

## 3) LA TECHNIQUE DE LA REPRODUCTION MINIMALE

Un bug qu'on peut pas reproduire, on peut pas le corriger. Un bug qu'on peut reproduire sur 10 000 lignes de données, on peut rarement le comprendre.

La reproduction minimale : le plus petit exemple possible qui déclenche le problème.

```text
// Bug : "le classement est faux pour Messi"

// Reproduction minimale :
const votes = [
 { joueur: "Messi",  points: 847 },
 { joueur: "Mbappé", points: 712 },
 { joueur: "Haaland", points: 698 }
]

const classement = calculerClassement(votes)
console.log(classement[0].joueur)
// attendu : "Messi"
// obtenu : "Haaland"

// Le bug est maintenant isolé dans une fonction, sur 3 inputs
// Plus besoin des 500 jurés, de la DB, ou du système de vote complet
```

La reproduction minimale te dit trois choses :

- où exactement est le bug
- qu'est-ce que la fonction fait vraiment
- comment écrire le test qui va protéger ce fix pour toujours

---

## 4) LES SPECS CONTRADICTOIRES

Parfois les specs ne sont pas juste floues. Elles sont contradictoires.

```text
Spec A : "un prisonnier ne peut pas avoir deux cellules en même temps"
Spec B : "pendant un transfert, un prisonnier peut être associé à sa cellule d'origine ET sa cellule de destination"

Ces deux specs sont vraies. Et elles se contredisent.
```

Quand tu détectes une contradiction :

1. Tu ne choisis pas toi-même lequel respecter
2. Tu présentes les deux specs et leur contradiction de façon factuelle
3. Tu proposes deux implémentations possibles (une pour chaque interprétation)
4. Tu demandes une décision explicite

```text
// Présentation factuelle de la contradiction :
// "Selon Spec A, un prisonnier a toujours exactement une cellule active.
// Selon Spec B, pendant un transfert, il en a deux.
//
// Option 1 : cellule unique avec un statut de transfert
//  prisonnier = { celluleActive, statut: 'normal' | 'enTransfert' }
//
// Option 2 : tableau de cellules avec des dates d'entrée/sortie
//  prisonnier = { cellules: [ { id, entrée, sortie | null } ] }
//
// Quelle option correspond au comportement attendu ?"
```

---

## 5) LES SPECS QUI CACHENT UN PROBLÈME XY

Le problème XY : quelqu'un a un problème X. Il pense que la solution est Y. Il te demande de l'aide sur Y. Mais Y est pas la bonne solution.

```text
Demande reçue : "j'ai besoin d'un bouton qui rafraîchit la liste des matchs toutes les 5 secondes"

Problème réel (après questions) : "la liste des matchs n'est pas à jour en temps réel"

// La solution demandée : polling toutes les 5 secondes
// Le vrai problème  : synchronisation en temps réel
// La bonne solution  : WebSocket ou SSE

// Répondre à la demande Y sans comprendre le problème X :
// --> un bouton qui rafraîchit toutes les 5 secondes et qui surcharge l'API
// --> 5 secondes de retard sur des stats de match en direct
// --> des utilisateurs qui voient un score qui date
```

Le test : _"si j'implémente exactement ce qui est demandé, est-ce que ça résout le vrai problème ?"_
Si non : remonter au problème réel avant de toucher au clavier.

---

## 6) DOCUMENTER LA SPEC CLARIFIÉE

Une fois que le problème est précis, tu l'écris.

Format minimal :

```text
CONTEXTE  : système de classement du Ballon d'Or
PROBLÈME  : Messi (847pts) apparaît 3ème au lieu de 1er
CONDITIONS : reproductible avec > 500 jurés dans la DB
CAUSE   : la requête de tri utilise ORDER BY total_pts mais total_pts
       est calculé sans les votes du jury international (ajouté lors de la migration)
FIX    : inclure jury_international_votes dans le calcul de total_pts
TEST    : 3 jurés = ordre correct, 501 jurés = ordre correct
```

Ce document : c'est ce que tu envoies avant de commencer à coder le fix.
Pas après. Avant.

---

## EXERCICES

## EXO 1 : Démêler le ticket de Rick Grimes

Rick t'envoie ce ticket :

> _"le système de rations marche plus depuis ce matin, les gardes du quart de nuit reçoivent pas leurs rations, c'est urgent, les zombies approchent"_

Applique le protocole de clarification. Écris les 5 questions que tu poses.
Invente des réponses plausibles. Produis la spec clarifiée en format `CONTEXTE / PROBLÈME / CONDITIONS / CAUSE / FIX`.

---

## EXO 2 : La spec contradictoire de Michael Scofield

Michael te donne deux specs pour son plan d'évasion :

- Spec A : _"chaque checkpoint ne peut être franchi qu'une seule fois"_
- Spec B : _"si le plan échoue, on peut recommencer depuis n'importe quel checkpoint déjà visité"_

Identifie la contradiction. Propose deux implémentations. Formule la question de décision.

---

## EXO 3 : Reproduire le bug de Walter White

Walter dit :

> _"parfois la route choisie par le système est pas la plus sûre"_

Ta mission : transformer ça en reproduction minimale.
Invente un graphe de 4 villes avec des poids de risque. Montre le bug sur ce graphe minimal.
Écris le test qui fixe ce bug pour toujours.

---

## RÉSUMÉ

Les specs floues sont la norme, pas l'exception. Ton boulot : transformer un symptôme en problème précis avant d'ouvrir l'éditeur. Le protocole de clarification en cinq questions. La reproduction minimale pour isoler le bug. Les contradictions : tu les présentes, tu proposes, tu demandes une décision. Le problème XY : tu remontes toujours au vrai problème avant de répondre à la demande.

## CHECKPOINT DE PROFONDEUR : variation C : décision sous contrainte

Sans relire, choisis une solution avec une contrainte supplémentaire (budget, latence, sécurité, disponibilité ou dette). Donne deux alternatives, un critère mesurable, une externalité négative et une observation qui invaliderait ta décision.

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Transformer "ça marche pas" en problème précis** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Statut Kintana : prolongement produit différé, facultatif et sans gate supplémentaire.** La première passe de Problem Solving se fait avec les exercices fictifs de Noa et les pratiques locales de cette leçon. La reproduction d'un incident Kintana suppose des notions d'API, de persistance, de concurrence, de logs et de tests qui sont enseignées plus tard. Ne tente pas de corriger un vrai système et ne fabrique pas de preuve terrain : reprends cette extension après les modules techniques concernés, sur une simulation locale.

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Transformer "ça marche pas" en problème précis » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert facultatif, à la reprise :** change l'ordre des événements ou ajoute une latence variable dans la simulation locale. Vérifie si la même hypothèse tient toujours ; conserve le résultat comme `SIMULATION`, pas comme preuve de terrain.
