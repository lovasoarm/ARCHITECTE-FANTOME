---
stability: intemporel
acte: comprendre
cognitive_level: L3
perturbation_modes: [decision_organisationnelle, regression]
anti_recipe_key: decision_organisationnelle+regression
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# Synthèse a : le protocole de garo après le blackout

Temps de lecture ~6 min

> Couvre : `00-SOCLE/04-FUNDAMENTALS` + `01-CADRAGE/02-ASYNC` + `01-CADRAGE/04-ERROR-HANDLING` + `02-CONSTRUCTION/03-TESTING`
> Durée cible : 90 à 150 minutes
> Pas un exercice de plus. Un point de contrôle : si ça casse ici, c'est que les fondations bougent encore.

---

## LE CONTEXTE

Le QG des Chevaliers Garo vient de subir un blackout réseau de 40 minutes. Pendant ce temps, les alertes Horror ont continué d'arriver mais aucune n'a été traitée : elles se sont empilées dans un buffer local.

Ta mission : reconstruire le module `ReseauDeVeille`, celui qui va vider ce buffer, dispatcher chaque alerte au Chevalier le plus proche, gérer les erreurs réseau qui vont forcément se reproduire, et le tout testé avant d'être validé.

Si tu codes ce module en pensant "je vais juste utiliser une closure ici, un try/catch là" sans te demander pourquoi : tu rates le point de la mission. Le but, c'est que ces 4 modules arrêtent d'être des silos dans ta tête et deviennent un seul réflexe.

---

## CE QUE TU DOIS LIVRER

```text
src/
├── reseauDeVeille.js    le coeur du système
├── alerteHorror.js     le modèle d'une alerte
└── dispatcher.js      la logique d'assignation aux Chevaliers

tests/
└── reseauDeVeille.test.js suite de tests qui couvre les 3 fichiers ci-dessus
```

---

## CONTRAINTES TECHNIQUES PRÉCISES

**Du module `00-SOCLE/04-FUNDAMENTALS` (fundamentals) :**
Le buffer d'alertes en attente doit être un état immuable à chaque étape : pas de `push` direct sur le tableau original, pas de mutation d'un objet alerte une fois créé. Chaque opération retourne un nouveau tableau.
(indice : repense à ce que `const` garantit vraiment, et ce qu'il garantit pas)

**Du module `01-CADRAGE/02-ASYNC` (async) :**
Le dispatch de chaque alerte doit être asynchrone : un Chevalier met un délai variable à répondre (entre 200ms et 2s, simulé avec `setTimeout` dans une Promise). Plusieurs alertes peuvent être dispatchées en parallèle, mais le système doit pouvoir dire "tout est traité" seulement quand TOUTES les réponses sont arrivées, qu'elles aient réussi ou échoué.
(indice : une seule méthode de `Promise` permet ça sans qu'un seul échec fasse tout planter)

**Du module `01-CADRAGE/03-DEBUGGING` (error handling) :**
Trois scénarios d'erreur doivent être gérés distinctement, pas avec un seul `catch` générique :

- Un Chevalier ne répond pas dans les 3 secondes (timeout)
- Un Chevalier répond mais signale qu'il est déjà en mission (conflit)
- Le réseau coupe en plein dispatch (erreur réseau)

Chaque cas doit avoir sa propre classe d'erreur custom, et le système doit décider une stratégie différente pour chacun : fail-fast pour le réseau qui coupe (on arrête tout, c'est critique), retry pour le timeout (on retente une fois), fallback pour le conflit (on réassigne au Chevalier suivant disponible).

**Du module `02-CONSTRUCTION/03-TESTING` (testing) :**
Le module entier doit être développé en TDD : le test avant le code, pas après. Au minimum :

- Un test qui vérifie que le buffer reste immuable après dispatch
- Un test qui mock le délai de réponse d'un Chevalier pour vérifier le comportement de timeout sans attendre 3 vraies secondes
- Un test qui simule les 3 scénarios d'erreur et vérifie que chacun déclenche la bonne stratégie

---

## CE QUI SE PASSE SI TU ZAPPES UNE CONTRAINTE

Si tu mutes le buffer directement : tes tests vont parfois passer et parfois échouer selon l'ordre d'exécution, parce que l'état partagé entre tests va polluer. C'est exactement le genre de bug qui rend un mec fou en CI à 23h alors que ça marchait en local.

Si tu gères tout avec un seul `try/catch` générique : tu vas pas pouvoir distinguer "il faut retry" de "il faut tout arrêter", et ton système va soit spam des retries sur une coupure réseau totale (inutile), soit abandonner direct sur un simple conflit (trop prudent).

---

## CHECKLIST AVANT DE VALIDER

```json
[ ] Le buffer ne mute jamais, chaque opération retourne un nouvel état
[ ] Promise.allSettled (ou équivalent justifié) gère le dispatch parallèle
[ ] 3 classes d'erreur custom distinctes existent
[ ] Chaque erreur a une stratégie différente (fail-fast / retry / fallback)
[ ] Les tests sont écrits AVANT le code correspondant (vérifiable dans ton historique git)
[ ] Le timeout est testé sans attendre le vrai délai (mock)
```

Si une seule case manque : c'est pas que t'as raté la mission, c'est qu'un des 4 modules a encore un trou. Retourne dessus avant d'avancer dans le curriculum.

---

> **Rappel `DEPENDENCY_LEDGER`** : avant de clore ce bloc, ouvre `09-DEPENDENCY_LEDGER.md` à la racine et ajoute une ligne par outil IA utilisé (quoi, quand, pourquoi, combien de temps gagné/perdu). Silence = drift.

## CHECKPOINT DE PROFONDEUR : variation B : défendre l'inverse

Ferme la page et défends pendant quelques minutes une stratégie opposée à celle implicitement recommandée ici. Cherche son meilleur cas d'usage, puis montre le cas où elle casse. Reviens ensuite à la stratégie initiale et justifie le choix par des mécanismes, pas par le vocabulaire du cours.
