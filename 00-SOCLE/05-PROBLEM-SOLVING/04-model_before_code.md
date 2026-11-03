---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [preuve_partielle, fausse_piste]
anti_recipe_key: preuve_partielle+fausse_piste
transfer_distance: medium
assessment_role: instructional_checkpoint
---

**SCÈNE CRAZYDEVS : Naruto :** avant de lancer le jutsu, tu vérifies ton chakra, ton terrain et ce que tu crois savoir. Ici, le piège est de coder avant d’avoir compris.

> **CrazyDevs : mission de rang S :** avant de foncer sur la solution, identifie ce qui fait réellement échouer la mission. Le piège est souvent dans la question, pas dans la réponse.

# Modéliser avant de coder

Temps de lecture ~8 min

Ouvrir l'éditeur en premier, c'est l'erreur numéro un.

Pas parce que coder c'est mal. Parce que quand tu codes sans modèle, tu prends des décisions structurelles en silence, sans t'en rendre compte, et tu t'enfermes dedans. Deux heures plus tard, tout refactorer coûte plus cher que d'avoir réfléchi 15 minutes au départ.

Modéliser, c'est décider de la forme des données et des contrats entre les pièces avant d'écrire une seule fonction.

---

## 1) QU'EST-CE QU'UN MODÈLE

Un modèle, c'est la représentation de ton domaine en structures de données et en contrats.

Pas du code. Pas encore. Juste des formes.

```text
Domaine : un tournoi de foot
Entités : Équipe, Joueur, Match, Score, Classement

Équipe   : { id, nom, joueurs: Joueur[] }
Joueur   : { id, nom, poste, equipeId }
Match   : { id, domicile: Équipe, extérieur: Équipe, score: Score, statut }
Score   : { domicile: number, extérieur: number }
Classement : { equipeId, points, goalDifference, joués }
```

Tu peux lire ça à voix haute. Tu peux expliquer ça à quelqu'un qui code pas. Si tu peux pas : le modèle est pas clair.

---

## 2) LES CONTRATS ENTRE LES PIÈCES

Un contrat, c'est la promesse qu'un module fait à ceux qui l'appellent.

```text
Contrat : calculer le classement
Entrée : la liste des matchs déjà joués.
Sortie : la liste des équipes classées par points décroissants.
Ne doit pas : modifier les matchs reçus.
Ne doit pas : écrire en base de données ni produire un effet externe.
```

Le contrat se définit AVANT le corps de la fonction. C'est une décision, pas un commentaire décoratif. Ici, une description en français courant suffit : la signature avec types sera étudiée plus tard dans le module TypeScript.

---

## 3) LES TROIS QUESTIONS DU MODÉLISATEUR

Quand tu construis un modèle, tu poses ces trois questions pour chaque entité :

**De quoi cette entité a-t-elle besoin pour exister ?**
Ce sont ses champs obligatoires.

**Qu'est-ce qu'elle ne doit jamais contenir ?**
Ce sont ses invariants : les règles qui ne peuvent jamais être violées.

**Comment est-ce qu'elle change dans le temps ?**
Ce sont ses transitions d'état.

```text
Entité : Match

Besoin pour exister : deux équipes, un statut initial
Invariant : score.domicile >= 0 && score.extérieur >= 0
      statut ne peut pas revenir de "terminé" à "en cours"
Transitions : "planifié" --> "en cours" --> "terminé"
       jamais de saut : "planifié" --> "terminé" directement
```

Un modèle sans invariants, c'est un modèle qui laisse entrer des données impossibles. Et des données impossibles produisent des bugs impossibles à tracer.

---

## 4) L'ERREUR : MODÉLISER PAR L'AFFICHAGE

La plupart des devs débutants modélisent par ce qu'ils voient à l'écran.

```text
// Mauvais : modélisé par l'UI
Joueur : {
 nomAffiché: string,    // ce que t'affiches
 photoUrl: string,     // ce que t'affiches
 statsFormatées: string,  // "85 buts / 23 passes" -- fusion de deux données
}

// Correct : modélisé par le domaine
Joueur : {
 id: string,
 nom: string,
 stats: { buts: number, passes: number }
}
// l'affichage "85 buts / 23 passes" : c'est le boulot de la couche présentation
```

Si ton modèle change chaque fois que l'UI change : t'as modélisé l'affichage, pas le domaine.

---

## 5) MODÉLISER LES ÉTATS D'UN SYSTÈME

Certains bugs viennent pas d'un calcul faux. Ils viennent d'un état impossible.

Naruto qui lance un jutsu alors que son chakra est à zéro : état impossible.
Un match "terminé" dont le score change encore : état impossible.

La solution : modéliser les états explicitement et les transitions autorisées.

```text
// Mauvais : un boolean qui porte trop de poids
match.estTerminé = true
// rien n'empêche match.estTerminé = true && match.estEnCours = true en même temps

// Correct : un type discriminant qui rend les états impossibles... impossibles
type StatutMatch =
 | { type: "planifié"; dateKickoff: Date }
 | { type: "enCours"; minuteActuelle: number }
 | { type: "terminé"; scoreFinal: Score }

// maintenant un match ne peut pas être "terminé" et "enCours" en même temps
// le compilateur te protège
```

---

## 6) LE MODÈLE COMME OUTIL DE COMMUNICATION

Un bon modèle se lit comme une histoire.

```text
Chevalier
- identifiant : texte
- nom : texte
- armure : statut + temps restant

Statuts possibles de l'armure
- portée
- détruite
- en recharge

Combat
- chevalier concerné
- adversaire
- heure de début
- durée maximale : 99 900 millisecondes

Règle : un chevalier ne peut combattre que si son armure est portée.
```

Si quelqu'un lit ce modèle et comprend le domaine sans explication supplémentaire, c'est un bon modèle. Les déclarations `type` et les unions TypeScript seront revues après le module TypeScript ; ici, les mots et les règles suffisent.

---

## EXERCICES

> **Périmètre de cette première passe :** décris les données, invariants et transitions en langage courant, tableau ou pseudo-code. Les exemples TypeScript ne sont pas des prérequis ; aucune implémentation TypeScript n'est attendue avant le module `02-CONSTRUCTION/12-TYPESCRIPT`. Le prolongement après TypeScript est facultatif.

## EXO 1 : Modélise le système d'évasion de Michael Scofield

Michael a besoin d'un plan d'évasion pour Fox River. Le système doit gérer :
les prisonniers, les sections de la prison, les gardes, les checkpoints, et le plan d'évasion lui-même.

Modélise chaque entité (champs, invariants, transitions d'état si applicable).
Identifie les contrats entre les pièces.
Identifie deux états impossibles que ton modèle doit rendre impossibles.

---

## EXO 2 : Le modèle cassé de T-Bag

T-Bag a modélisé les prisonniers comme ça :

```text
prisonnier = {
 nomComplet: "Theodore Bagwell",
 celluleEtSection: "A-5",   // fusion de deux données distinctes
 statutEtDate: "libéré le 12/03", // fusion statut + date
 dangereux: true
}
```

Identifie les problèmes. Propose un modèle correct avec invariants.

---

## EXO 3 : Les états impossibles du Ballon d'Or

Un vote du Ballon d'Or peut être dans ces états :
"ouvert", "clôturé", "en dépouillement", "résultat publié".

Modélise les transitions autorisées (format `A --> B`).
Identifie deux transitions qui doivent être impossibles.
Présente le résultat sous forme de tableau ou de schéma : aucun code n'est demandé dans cette première passe. Après le module TypeScript, tu pourras revenir à cet exercice pour traduire le modèle en type discriminant ; ce prolongement est différé et ne bloque pas Problem Solving.

---

---

## SIGNES QU'IL NE FAUT PAS CODER MAINTENANT

Cinq signaux nets. Si un seul est allumé, tu poses le clavier et tu vas résoudre le signal avant.

1. **La spec est floue** : tu n'arrives pas à écrire en une phrase ce que le code doit produire. Coder maintenant = coder à ta place la spec qui n'existe pas. Tu vas la réécrire trois fois.
2. **Ton hypothèse n'est pas prouvée** : tu supposes que le bug vient de X sans l'avoir vérifié. Coder = fixer un truc qui n'était peut-être pas cassé. Va prouver d'abord.
3. **Il n'y a pas de test qui capture le comportement attendu** : tu vas savoir que tu as fini quand ? Aucun test = aucune fin. Écris le test qui échouera avant.
4. **Il n'y a pas d'ADR (ni de discussion tracée)** : la décision est encore dans la tête de quelqu'un. Coder maintenant = imposer par le fait accompli. Écris l'ADR, poste-la, attends 24h de retour.
5. **Il reste un désaccord non résolu dans l'équipe** : deux collègues ont deux approches. Coder maintenant = provoquer un merge conflict humain à la revue. Résous le désaccord d'abord.

Un dev senior se reconnaît à ce qu'il ne code pas. Un junior code pour se rassurer, un senior s'arrête pour dérisquer.

## RÉSUMÉ

Modéliser avant de coder : c'est décider de la forme des données et des contrats avant que le code existe. Un bon modèle rend les états impossibles... impossibles. Il se lit comme une histoire. Il change quand le domaine change, pas quand l'UI change. Un modèle sans invariants laisse entrer n'importe quoi : et n'importe quoi produit des bugs qu'on comprend pas.

## CHECKPOINT DE PROFONDEUR : variation F : coût et fiabilité

Explique ce que ce mécanisme coûte lorsqu'on l'applique à grande échelle. Identifie un bénéfice, une dette opérationnelle et un mode de défaillance. Propose une garde-fou minimal et précise ce qu'il ne garantit pas.

<!-- AF-LESSON-PROFILE: debug -->

## Repères de décision

- **Pourquoi :** Sans reproduction, un correctif peut masquer le symptôme tout en laissant la cause active. Un diagnostic solide réduit le risque de régression et le temps perdu en production.
- **Quand l’utiliser / quand l’éviter :** Utilise cette méthode dès qu'un défaut est observable mais sa cause incertaine. Évite de modifier plusieurs variables à la fois ou d'ajouter des logs qui exposent des données sensibles.
- **Limites :** Un bug intermittent peut disparaître sous instrumentation. Une reproduction locale peut ne pas contenir la charge, le réseau ou les données du terrain ; conserve les limites de ton diagnostic.

## Mécanisme : la version sans magie

Énonce une hypothèse falsifiable, fixe les entrées, reproduis, collecte un signal ciblé, élimine les hypothèses, corrige puis garde un test de non-régression.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Modéliser avant de coder** se rattache à ce cas concret : Kintana reçoit un signalement de double demande après un délai réseau. Il faut déterminer s'il s'agit d'un double clic, d'un retry, d'un worker rejoué ou d'une transaction non atomique.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Reproduction et correction d'un incident Kintana

> **Statut Kintana : prolongement produit différé, facultatif et sans gate supplémentaire.** La première passe de Problem Solving se fait avec les exercices fictifs de Noa et les pratiques locales de cette leçon. La reproduction d'un incident Kintana suppose des notions d'API, de persistance, de concurrence, de logs et de tests qui sont enseignées plus tard. Ne tente pas de corriger un vrai système et ne fabrique pas de preuve terrain : reprends cette extension après les modules techniques concernés, sur une simulation locale.

> **Arc Walking Dead :** quand l'alerte sonne, courir dans tous les sens ne sauve personne. Reproduis, isole, mesure, puis répare.

**Mission liée à « Modéliser avant de coder » :** Reproduis un scénario de double création ou de notification manquante. Écris trois hypothèses classées, collecte un identifiant de corrélation, isole une cause puis ajoute un test qui échoue avant le correctif.

**Livrable :** un rapport d'incident court, les étapes de reproduction, le patch minimal, le test de régression et les limites non reproduites.

**Critères d’acceptation :** la cause est étayée par un signal ; une seule variable principale change à la fois ; le test détecte l'ancien défaut ; les données sensibles sont masquées dans les traces.

**Transfert facultatif, à la reprise :** change l'ordre des événements ou ajoute une latence variable dans la simulation locale. Vérifie si la même hypothèse tient toujours ; conserve le résultat comme `SIMULATION`, pas comme preuve de terrain.
