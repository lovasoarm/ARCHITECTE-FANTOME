---
stability: intemporel
last_reviewed: 2026-07
depends_on_vendor: false
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

Temps de lecture ~7 min

> **Interdit de lire cette page avant d'avoir coché la checklist ci-dessous.**
> Un grimoire lu trop tôt donne l'illusion de savoir. C'est le pire piège pédagogique.

## Checklist prérequis

- [ ] J'ai fini **tous** les exercices du module courant.
- [ ] J'ai réussi le `00_prereq_check.md` du module suivant.
- [ ] J'ai écrit **au moins un** de mes propres exemples (pas copié).
- [ ] Je peux réexpliquer les 3 concepts phares du module **sans regarder**.

Si une seule case n'est pas cochée : ferme ce fichier. Reviens plus tard.

---

## GRIMOIRE DES PROMISES

---

| Terme                | Définition                                                                                                                               | Code                                                                                                                                                        | Analogies                                                                               | Limite |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| Promise              | Objet qui représente une valeur qui n'est pas encore disponible. Trois états : pending, fulfilled, rejected.                             | `const p = new Promise((resolve, reject) => { ... })`                                                                                                       | Un ticket de livraison Amazon / une promesse de paie en fin de mois                     | « Un ticket de livraison Amazon » n'a ni facture ni horloge ; sur Promise, le rejet d'une promesse non attrapée ne stoppe pas le programme, il le laisse continuer dans un état faux. Écris le test qui lance deux appels concurrents, pas un seul. |
| pending              | État initial d'une Promise. L'opération async tourne encore. Ni resolve ni reject n'a été appelé.                                        | `const p = new Promise(() => {}) // reste pending pour toujours`                                                                                            | Une requête en cours de traitement / un match pas encore sifflé                         | « Une requête en cours de traitement » a une frontière visible à l'oeil ; sur pending, deux opérations qui se recouvrent dans le temps entrelacent leurs effets, et l'état intermédiaire devient observable. Rejoue le cas avec une latence artificielle de 2 s pour voir l'entrelacement. |
| fulfilled            | La Promise a résolu avec succès. `resolve(valeur)` a été appelé. Le `.then()` reçoit la valeur.                                          | `resolve("Naruto a gagné")`                                                                                                                                 | Le colis livré / le but marqué                                                          | « Le colis livré » suppose que quelqu'un surveille ; sur fulfilled, une erreur levée après le premier `await` ne remonte plus dans le `try` de l'appelant synchrone. Instrumente avec un horodatage à chaque étape avant d'affirmer un ordre. |
| rejected             | La Promise a échoué. `reject(erreur)` a été appelé ou une exception a été throwée. Le `.catch()` reçoit l'erreur.                        | `reject(new Error("mission échouée"))`                                                                                                                      | Le colis perdu / le carton rouge                                                        | « Le colis perdu » suppose que quelqu'un surveille ; sur rejected, une erreur levée après le premier `await` ne remonte plus dans le `try` de l'appelant synchrone. Trace le chemin d'erreur, pas seulement le chemin nominal. |
| resolve              | Fonction qui termine une Promise avec succès. Appelée une seule fois. Si appelée plusieurs fois, les appels suivants sont ignorés.       | `new Promise((resolve) => resolve(42))`                                                                                                                     | Valider une mission / signer le bon de livraison                                        | « Valider une mission » tient tant que rien ne tombe en route ; sur resolve, les micro-tâches passent avant les macro-tâches, donc deux appels « simultanés » ne le sont jamais. Écris le test qui lance deux appels concurrents, pas un seul. |
| reject               | Fonction qui termine une Promise avec une erreur. Appelée une seule fois.                                                                | `new Promise((_, reject) => reject(new Error("fail")))`                                                                                                     | Annuler la mission / retourner le colis                                                 | « Annuler la mission » suppose un seul acteur à la fois ; sur reject, une erreur levée après le premier `await` ne remonte plus dans le `try` de l'appelant synchrone. Trace le chemin d'erreur, pas seulement le chemin nominal. |
| .then()              | Méthode chaînable. Reçoit la valeur résolue, retourne une nouvelle Promise. Ce qu'on `return` devient le résultat du prochain `.then()`. | `fetch(url).then(res => res.json()).then(data => data.items)`                                                                                               | Chaque maillon d'une chaîne de montage / chaque étape d'un plan d'évasion               | « Chaque maillon d'une chaîne de montage » suppose un seul acteur à la fois ; sur .then(), deux opérations qui se recouvrent dans le temps entrelacent leurs effets, et l'état intermédiaire devient observable. Rejoue le cas avec une latence artificielle de 2 s pour voir l'entrelacement. |
| .catch()             | Attrape les erreurs dans la chaîne. Si il retourne une valeur, la chaîne reprend (resolved). Si il re-throw, l'erreur continue.          | `.catch(err => { console.log(err); return [] })`                                                                                                            | Le filet de sécurité sous le trapéziste / le plan B de Michael Scofield                 | « Le filet de sécurité sous le trapéziste » n'a ni facture ni horloge ; sur .catch(), l'ordre d'exécution est décidé par la boucle d'événements, pas par l'ordre d'écriture des lignes. Trace le chemin d'erreur, pas seulement le chemin nominal. |
| .finally()           | S'exécute toujours, resolved ou rejected. Ne reçoit pas de valeur. N'influence pas le résultat.                                          | `.finally(() => db.close())`                                                                                                                                | Nettoyer le labo quoi qu'il arrive / fermer le dossier mission                          | « Nettoyer le labo quoi qu'il arrive » raconte le cas nominal ; sur .finally(), le temps réseau varie d'un facteur dix entre ta machine et la production. Instrumente avec un horodatage à chaque étape avant d'affirmer un ordre. |
| Promise.resolve()    | Crée une Promise déjà résolue avec la valeur donnée. Utile pour normaliser une valeur en Promise.                                        | `Promise.resolve(42).then(n => console.log(n))`                                                                                                             | Démarrer une chaîne avec une valeur connue / un joueur déjà qualifié                    | « Démarrer une chaîne avec une valeur connue » se rejoue à l'identique, le code non ; sur Promise.resolve(), annuler une opération déjà partie ne défait pas l'effet déjà écrit côté serveur. Instrumente avec un horodatage à chaque étape avant d'affirmer un ordre. |
| Promise.reject()     | Crée une Promise déjà rejetée. Utile pour forcer une erreur dans une chaîne.                                                             | `Promise.reject(new Error("interdit"))`                                                                                                                     | Déclencher une alerte immédiatement / souffler le penalty dès le départ                 | « Déclencher une alerte immédiatement » décrit un monde où chaque étape se voit ; sur Promise.reject(), annuler une opération déjà partie ne défait pas l'effet déjà écrit côté serveur. Trace le chemin d'erreur, pas seulement le chemin nominal. |
| Promise.all()        | Attend que toutes les Promises réussissent. Une seule rejection coupe tout. Retourne un tableau dans le même ordre.                      | `Promise.all([fetchA(), fetchB()]).then(([a, b]) => ...)`                                                                                                   | La formation complète ou la mission est annulée / tous les ninjas ou on ne part pas     | « La formation complète ou la mission est annulée » se corrige toute seule quand elle dérape ; sur Promise.all(), la file d'attente n'est pas ordonnée par priorité métier mais par ordre d'arrivée technique. Instrumente avec un horodatage à chaque étape avant d'affirmer un ordre. |
| Promise.race()       | La première Promise qui se résout ou rejette gagne. Les autres continuent de tourner mais sont ignorées.                                 | `Promise.race([fetch(url), timeout(3000)])`                                                                                                                 | Le premier coup décide du combat / le premier arrivé à la ligne                         | « Le premier coup décide du combat » suppose que quelqu'un surveille ; sur Promise.race(), la file d'attente n'est pas ordonnée par priorité métier mais par ordre d'arrivée technique. Écris le test qui lance deux appels concurrents, pas un seul. |
| Promise.allSettled() | Attend que toutes finissent, succès ou échec. Retourne un tableau de `{ status, value \| reason }`. Ne rejette jamais.                   | `Promise.allSettled([...]).then(res => res.filter(r => r.status === "fulfilled"))` | Le rapport complet après la bataille / le bilan de toutes les missions | « Le rapport complet après la bataille » n'a ni facture ni horloge ; sur Promise.allSettled(), les micro-tâches passent avant les macro-tâches, donc deux appels « simultanés » ne le sont jamais. Rejoue le cas avec une latence artificielle de 2 s pour voir l'entrelacement. |
| Promise.any()        | La première qui réussit suffit. Si toutes échouent, rejette avec un `AggregateError`.                                                    | `Promise.any([mirror1(), mirror2()]).then(data => ...)`                                                                                                     | Un seul fragment suffit pour activer le cristal / un seul but pour gagner               | « Un seul fragment suffit pour activer le cristal » raconte le cas nominal ; sur Promise.any(), l'ordre d'exécution est décidé par la boucle d'événements, pas par l'ordre d'écriture des lignes. Écris le test qui lance deux appels concurrents, pas un seul. |
| AggregateError       | Erreur throwée par `Promise.any()` quand toutes les Promises rejettent. Contient `.errors` : le tableau de toutes les erreurs.           | `err.errors.forEach(e => console.log(e.message))`                                                                                                           | Le rapport d'échec total / tous les équipiers tombés                                    | « Le rapport d'échec total » se corrige toute seule quand elle dérape ; sur AggregateError, une erreur levée après le premier `await` ne remonte plus dans le `try` de l'appelant synchrone. Trace le chemin d'erreur, pas seulement le chemin nominal. |
| thenable             | Tout objet avec une méthode `.then()`. JS le traite comme une Promise dans les chaînes.                                                  | `const t = { then: (resolve) => resolve(42) }`                                                                                                              | Un contrat non officiel mais respecté / une parole sans papier mais valable             | « Un contrat non officiel mais respecté » suppose que quelqu'un surveille ; sur thenable, le temps réseau varie d'un facteur dix entre ta machine et la production. Rejoue le cas avec une latence artificielle de 2 s pour voir l'entrelacement. |
| microtask            | Une Promise résolue ne déclenche pas `.then()` immédiatement. Elle s'inscrit dans la microtask queue, après le code synchrone courant.   | `Promise.resolve().then(() => console.log("après")) // log après le code sync`                                                                              | La livraison express mais pas instantanée / le message envoyé mais lu entre deux tâches | « La livraison express mais pas instantanée » a une frontière visible à l'oeil ; sur microtask, une erreur levée après le premier `await` ne remonte plus dans le `try` de l'appelant synchrone. Écris le test qui lance deux appels concurrents, pas un seul. |

---

## OÙ L'ANALOGIE CASSE

Rappel Partie B.2 : toute analogie de ce grimoire simplifie un mécanisme.
Quand tu dois **décider** (fix, refactor, ADR), retourne au mécanisme réel,
pas à l'image. L'analogie sert à comprendre vite ; elle ment toujours un peu.

---

## OÙ LES ANALOGIES CASSENT (règle B.2)

Les analogies de ce grimoire simplifient : elles ne définissent pas. Une
closure **nest pas** un tiroir ; un event loop **nest pas** un carrousel ;
une pile **nest pas** une pile de crêpes. Chaque analogie sert à visualiser
un mécanisme ; elle cesse dès que tu veux raisonner sur la complexité, la
mémoire, la concurrence ou les cas limites. Reviens toujours à la définition
technique avant de coder, débugger ou expliquer à un pair. Une analogie
prise pour la réalité devient un obstacle épistémologique.

---

## Ou l'analogie casse (promise)

Garde-fou epistemologique : l'analogie seduisante est utile a l'entree, dangereuse a la sortie.
Ce tableau liste les endroits **precis** ou l'analogie courante trompe.

| Analogie courante | Ou elle casse | Limite |
|-------------------|---------------| ------- |
| "Promise = future async" | Trop court : c est un **etat (pending/fulfilled/rejected) + un pipeline `.then` non annulable par defaut**. | L'image simplifie "Promise = future async" : le comportement réel dépend du moteur, des cas limites et du temps, pas de la métaphore. |
| "`await` = bloquer" | Non : ca **suspend la fonction**, la boucle d evenements continue. Croire que ca bloque = deadlocks imagines. | L'image aide à poser "await = bloquer", elle ne dit rien du coût réel : mesure "await = bloquer" avant de t'en servir comme argument. |
| "Promise.all echoue = tout retente" | Faux : `Promise.all` echoue **des la premiere** rejection ; utilise `Promise.allSettled` si tu veux tout attendre. | L'analogie s'arrête là où "Promise.all echoue = tout retente" rencontre la concurrence : plusieurs acteurs en même temps changent la réponse. |

Regle : si tu ne peux pas nommer *une* case ou ton analogie casse, tu ne l'as
pas encore comprise ; tu l'as juste memorisee.
