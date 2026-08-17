---
stability: intemporel
acte: restituer
---

# Page verrouillée

> Rappel : ce grimoire simplifie via analogies. Lire d'abord [`05-MAITRISE/06_annexes/GRIMOIRE_CODE_HONNEUR.md`](../../05-MAITRISE/06_annexes/18_GRIMOIRE_CODE_HONNEUR.md).

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

## GRIMOIRE DES ERREURS : LE BESTIAIRE COMPLET

Référence. Pas un cours. Chaque terme, sa définition, du code, deux analogies.

---

| Terme                         | Définition                                                                      | Code                                      | Analogies                                                                                              | Limite |
| ----------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| **Error**                     | Classe de base de toutes les erreurs JS. Porte `name`, `message`, `stack`.      | `throw new Error("raison")`               | le carton rouge sans détail / l'alarme générique sans zone                                             | « le carton rouge sans détail » n'a ni facture ni horloge ; sur Error, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **TypeError**                 | Levée quand une opération s'applique à un type incorrect.                       | `null.prop // TypeError`                  | passer un ballon à quelqu'un qui n'est pas là / demander le chakra d'un objet sans ninja               | « passer un ballon à quelqu'un qui n'est pas là » raconte le cas nominal ; sur TypeError, le chemin d'échec n'est presque jamais couvert par les tests, donc jamais exercé avant l'incident. Nomme l'erreur par sa cause, pas par son symptôme. |
| **ReferenceError**            | Variable utilisée avant déclaration ou inexistante.                             | `console.log(x) // x non déclaré`         | appeler un joueur qui n'est pas dans l'équipe / invoquer un jutsu non appris                           | « appeler un joueur qui n'est pas dans l'équipe » raconte le cas nominal ; sur ReferenceError, le retry aveugle multiplie l'effet de bord déjà appliqué avant l'échec. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **RangeError**                | Valeur hors des limites acceptables.                                            | `new Array(-1) // RangeError`             | dépasser la jauge de chakra maximale / prendre plus d'argent qu'il n'y a dans la caisse                | « dépasser la jauge de chakra maximale » décrit un monde où chaque étape se voit ; sur RangeError, le message affiché à l'utilisateur et la trace technique n'ont ni le même public ni la même durée de vie. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **SyntaxError**               | Code JS malformé, détecté à la phase de parsing.                                | `eval("if (")`                            | règle de match mal rédigée / partition musicale avec une note impossible                               | « règle de match mal rédigée » suppose un seul acteur à la fois ; sur SyntaxError, un code d'erreur générique empêche toute décision automatique en aval. Nomme l'erreur par sa cause, pas par son symptôme. |
| **URIError**                  | Encodage/décodage d'URI malformé.                                               | `decodeURIComponent("%")`                 | URL de transfert corrompue / QR code illisible                                                         | « URL de transfert corrompue » tient tant que rien ne tombe en route ; sur URIError, la pile d'appels est tronquée dès qu'un appel asynchrone la coupe. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **EvalError**                 | Erreur liée à `eval()` : rare, historique.                                      | héritage JS : évite eval                  | règle de compétition obsolète / loi abrogée toujours dans les textes                                   | « règle de compétition obsolète » décrit un monde où chaque étape se voit ; sur EvalError, un code d'erreur générique empêche toute décision automatique en aval. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **AggregateError**            | Groupe plusieurs erreurs en une seule. Utilisée par `Promise.any`.              | `new AggregateError([e1, e2], "tous KO")` | rapport d'incidents multiple / synthèse post-match de toutes les blessures                             | « rapport d'incidents multiple » n'a ni facture ni horloge ; sur AggregateError, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **Custom Error**              | Sous-classe d'Error avec contexte métier supplémentaire.                        | `class ValidationError extends Error {}`  | carton rouge avec rapport détaillé / alerte Garo avec coordonnées du Horror                            | « carton rouge avec rapport détaillé » a une frontière visible à l'oeil ; sur Custom Error, une exception traverse les couches sans porter le contexte métier qui permettrait de décider. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **throw**                     | Instruction qui lève une exception et interrompt l'exécution courante.          | `throw new Error("msg")`                  | sifflet de l'arbitre / déclenchement de l'alarme de la prison                                          | « sifflet de l'arbitre » se corrige toute seule quand elle dérape ; sur throw, une exception traverse les couches sans porter le contexte métier qui permettrait de décider. Nomme l'erreur par sa cause, pas par son symptôme. |
| **try/catch**                 | Bloque une zone à risque et intercepte les exceptions synchrones.               | `try { ... } catch(e) { ... }`            | zone protégée pendant un duel / filet sous le trapéziste                                               | « zone protégée pendant un duel » a une frontière visible à l'oeil ; sur try/catch, une exception traverse les couches sans porter le contexte métier qui permettrait de décider. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **finally**                   | Bloc qui s'exécute toujours après try/catch, succès ou échec.                   | `try { } catch { } finally { }`           | nettoyage du terrain après le match / fermeture de l'armure Garo peu importe l'issue                   | « nettoyage du terrain après le match » suppose que quelqu'un surveille ; sur finally, le retry aveugle multiplie l'effet de bord déjà appliqué avant l'échec. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **stack trace**               | Chemin d'exécution complet depuis le point d'erreur.                            | `console.log(e.stack)`                    | tracé GPS de la course jusqu'à l'accident / replay des actions avant l'expulsion                       | « tracé GPS de la course jusqu'à l'accident » suppose un seul acteur à la fois ; sur stack trace, le message affiché à l'utilisateur et la trace technique n'ont ni le même public ni la même durée de vie. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **error.cause**               | Propriété ES2022 pour préserver l'erreur originale dans un wrapping.            | `throw new Error("msg", { cause: e })`    | rapport d'incident avec rapport d'incident précédent attaché / carton rouge avec historique des fautes | « rapport d'incident avec rapport d'incident précédent attaché » décrit un monde où chaque étape se voit ; sur error.cause, un code d'erreur générique empêche toute décision automatique en aval. Nomme l'erreur par sa cause, pas par son symptôme. |
| **Propagation**               | Une erreur remonte la call stack jusqu'à ce qu'un catch l'intercepte.           | `fn1 --> fn2 --> fn3 --> throw`           | carton rouge remonté à l'arbitre central / alerte passée de cellule en cellule à Fox River             | « carton rouge remonté à l'arbitre central » n'a ni facture ni horloge ; sur Propagation, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Nomme l'erreur par sa cause, pas par son symptôme. |
| **Rethrow**                   | Catcher une erreur, inspecter, et la relancer si elle n'est pas de son ressort. | `catch(e) { if (...) throw e }`           | arbitre qui transmet le litige à la VAR / Chevalier qui passe l'alerte au Conseil                      | « arbitre qui transmet le litige à la VAR » décrit un monde où chaque étape se voit ; sur Rethrow, attraper sans relancer transforme une panne bruyante en corruption silencieuse. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **Wrapping**                  | Emballer une erreur dans une nouvelle avec contexte supplémentaire.             | `throw new ServiceError("ctx", e)`        | résumé du rapport original avec annotations / traduction du rapport médical en termes simples          | « résumé du rapport original avec annotations » s'arrête à la première surprise ; sur Wrapping, un code d'erreur générique empêche toute décision automatique en aval. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **UnhandledPromiseRejection** | Promise rejetée sans `.catch()` ni `await` dans un try/catch.                   | `fetch(url) // pas de .catch`             | but marqué sans que le gardien soit là / alerte déclenchée dans une salle vide                         | « but marqué sans que le gardien soit là » suppose que quelqu'un surveille ; sur UnhandledPromiseRejection, attraper sans relancer transforme une panne bruyante en corruption silencieuse. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **Fail-fast**                 | Arrêter immédiatement dès qu'une condition invalide est détectée.               | `if (!config.db) throw new Error(...)`    | arbitre qui siffle à la première faute grave / Kurama refusé si chakra insuffisant                     | « arbitre qui siffle à la première faute grave » a une frontière visible à l'oeil ; sur Fail-fast, le chemin d'échec n'est presque jamais couvert par les tests, donc jamais exercé avant l'incident. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **Fallback**                  | Valeur ou comportement de secours si l'opération principale échoue.             | `catch(e) { return valeurSecours }`       | remplaçant qui entre si le titulaire se blesse / fournisseur B si fournisseur A est KO                 | « remplaçant qui entre si le titulaire se blesse » tient tant que rien ne tombe en route ; sur Fallback, la pile d'appels est tronquée dès qu'un appel asynchrone la coupe. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **Retry**                     | Réessayer une opération après un délai, sur erreur transitoire.                 | `while (tentatives < max) { ... }`        | remise en jeu après interruption pour blessure / Naruto qui retente le jutsu après un raté             | « remise en jeu après interruption pour blessure » n'a ni facture ni horloge ; sur Retry, le retry aveugle multiplie l'effet de bord déjà appliqué avant l'échec. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **Backoff exponentiel**       | Augmenter progressivement le délai entre les tentatives.                        | `delai *= 2` par retry                    | 5min de pause, puis 10min, puis 20min / espacer les tentatives d'infiltration à Fox River              | « 5min de pause, puis 10min, puis 20min » suppose que quelqu'un surveille ; sur Backoff exponentiel, la pile d'appels est tronquée dès qu'un appel asynchrone la coupe. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **Circuit breaker**           | Stopper les appels vers un service défaillant après N échecs.                   | `if (etat === "OUVERT") throw`            | sifflet de fin de match si trop de fautes / couper la radio si pile critique après 3 échecs            | « sifflet de fin de match si trop de fautes » raconte le cas nominal ; sur Circuit breaker, le chemin d'échec n'est presque jamais couvert par les tests, donc jamais exercé avant l'incident. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **instanceof**                | Teste si un objet est une instance d'une classe (et de ses parents).            | `e instanceof ValidationError`            | vérifier le grade d'un Chevalier / vérifier le type de carton avant la sanction                        | « vérifier le grade d'un Chevalier » a une frontière visible à l'oeil ; sur instanceof, attraper sans relancer transforme une panne bruyante en corruption silencieuse. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **error.name**                | Propriété string du nom de la classe d'erreur. À définir explicitement.         | `this.name = "ValidationError"`           | nom sur le dossier d'incident / identifiant du jutsu dans le registre                                  | « nom sur le dossier d'incident » se corrige toute seule quand elle dérape ; sur error.name, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Nomme l'erreur par sa cause, pas par son symptôme. |
| **error.message**             | Description textuelle de ce qui s'est passé.                                    | `e.message`                               | description sur le carton / message d'alerte du Conseil                                                | « description sur le carton » suppose que quelqu'un surveille ; sur error.message, le message affiché à l'utilisateur et la trace technique n'ont ni le même public ni la même durée de vie. Distingue par écrit ce qui se réessaie de ce qui s'abandonne. |
| **error.code**                | Propriété custom : code HTTP ou code métier attaché à l'erreur.                 | `this.code = 404`                         | numéro de règle enfreinte / code de cellule à Fox River                                                | « numéro de règle enfreinte » suppose un seul acteur à la fois ; sur error.code, un code d'erreur générique empêche toute décision automatique en aval. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **Catch sélectif**            | Ne catcher qu'un type précis d'erreur, relancer les autres.                     | `if (e instanceof X) { } else throw e`    | gérer son propre cas, remonter le reste / Chevalier gère ses Horror, passe les Demons au Conseil       | « gérer son propre cas, remonter le reste » suppose un seul acteur à la fois ; sur Catch sélectif, attraper sans relancer transforme une panne bruyante en corruption silencieuse. Nomme l'erreur par sa cause, pas par son symptôme. |
| **Global error handler**      | Handler process pour les erreurs non catchées : dernier filet.                  | `process.on("unhandledRejection", ...)`   | filet sous le filet / arbitre de secours en cas de défaillance de l'arbitre principal                  | « filet sous le filet » a une frontière visible à l'oeil ; sur Global error handler, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Vérifie qu'un incident réel produit une trace exploitable, pas un « erreur inconnue ». |
| **Promise.allSettled**        | Attend toutes les Promises : succès ou échec : et retourne chaque résultat.     | `await Promise.allSettled([...])`         | rapport de tous les matchs du week-end, même les annulés / état de tous les Chevaliers en mission      | « rapport de tous les matchs du week-end, même les annulés » décrit un monde où chaque étape se voit ; sur Promise.allSettled, le retry aveugle multiplie l'effet de bord déjà appliqué avant l'échec. Teste le chemin d'échec au moins autant que le chemin nominal. |
| **safeAsync / Result type**   | Wrapper qui retourne `{ ok, valeur }` ou `{ ok: false, erreur }` sans throw.    | `return { ok: true, valeur: data }`       | rapport structuré sans alarme / fiche de mission avec case "statut" plutôt qu'alerte                   | « rapport structuré sans alarme » raconte le cas nominal ; sur safeAsync / Result type, une erreur récupérable et une erreur fatale se ressemblent au moment où on les attrape. Nomme l'erreur par sa cause, pas par son symptôme. |

---

## HIÉRARCHIE DES ERREURS NATIVES JS

```
Error
├── TypeError     : mauvais type
├── ReferenceError   : variable inconnue
├── RangeError     : valeur hors limites
├── SyntaxError    : code malformé (parsing)
├── URIError      : URI malformée
├── EvalError     : problème eval (rare)
└── AggregateError   : groupe d'erreurs (Promise.any)
```

---

## HIÉRARCHIE CUSTOM RECOMMANDÉE

```
Error
└── AppError (base de domaine)
  ├── ValidationError   : données invalides
  ├── NotFoundError    : ressource manquante
  ├── AuthError      : accès refusé
  ├── DatabaseError    : problème de persistance
  └── ServiceError    : erreur de couche service
```

---

## QUAND UTILISER QUOI

```
Situation                 Solution
----------------------------------------------------------
Condition impossible à compenser      fail-fast + throw
Erreur transitoire (réseau, timeout)    retry avec backoff
Feature dégradable             fallback
Service externe souvent KO         circuit breaker
Erreur d'une sous-couche à enrichir    wrapping avec cause
Erreur hors de ta responsabilité      rethrow
Multiple Promises, résultats indépendants Promise.allSettled
Logs lisibles en prod           custom error + serialisation JSON
```

---

## CHECK RAPIDE : LES PIÈGES QU'ON OUBLIE

```
throw new Error("x") vs throw "x"
  → new Error() capture la stack trace au moment du throw.
  → throw "x" ne capture rien : impossible de savoir d'où ça vient en prod.

try/catch/finally, ordre d'exécution :
  → erreur levée dans try  : catch s'exécute, PUIS finally, PUIS propagation
    si catch a re-throw (ou pas de propagation si catch a géré).
  → pas d'erreur          : try se termine, finally s'exécute quand même.
  → finally tourne TOUJOURS, que l'erreur soit gérée ou non.

Promise rejetée jamais catch/await-ée (Node 20+) :
  → déclenche l'event 'unhandledRejection', et Node 20+ TERMINE le process
    par défaut (comportement différent des vieilles versions qui logguaient
    juste un warning).

throw dans un callback synchrone passé à setTimeout :
  → le throw remonte dans le contexte d'exécution du callback, PAS dans le
    contexte où setTimeout a été appelé. Le try autour de setTimeout(...)
    est déjà "sorti" (call stack vidée) quand le callback s'exécute plus
    tard : il ne peut structurellement rien attraper.

Quand catch(e) DOIT re-throw plutôt qu'avaler :
  → si tu ne sais pas traiter l'erreur à cet endroit précis (pas de fallback
    sensé, pas de retry pertinent) : rethrow. Avaler silencieusement une
    erreur qu'on ne sait pas gérer transforme un bug visible en bug fantôme.
```

---

## RÉFÉRENCES

→ Leçon complète try/catch : `01_try_catch_basics.md`
→ Leçon complète custom errors : `02_custom_errors.md`
→ Leçon complète propagation : `03_error_propagation.md`
→ Leçon complète async errors : `04_async_error_traps.md`
→ Leçon complète stratégies : `05_error_strategy.md`
→ Async en profondeur : `01-CADRAGE/02_async/`
→ Testing des erreurs : `02-CONSTRUCTION/03_testing/03_mocking_madness.md`

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
