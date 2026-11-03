---
stability: intemporel
last_reviewed: 2026-10-31
depends_on_vendor: false
acte: comprendre
cognitive_level: L3
perturbation_modes: [fausse_piste, changement_echelle]
anti_recipe_key: fausse_piste+changement_echelle
transfer_distance: medium
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Konoha sous siège :** les quartiers, portes et équipes ont des responsabilités différentes. Si tout le monde peut entrer partout, tu n'as pas une architecture : tu as une cour de récréation avec des incendies.

# 07b : Race Condition Hunt (bouclier senior)

<!-- AF-DIAGRAM:race -->

```text
Temps ───────────────────────────────────►

Worker A ───── read ───── write A ───────

Worker B ─────────── read ───── write B ─
                       ▲
                       └─ résultat dépend de l’ordre
```

Une race condition apparaît lorsque plusieurs chemins concurrents peuvent produire des états différents selon leur ordre d’arrivée.

Temps de lecture ~7 min

> Compagnon avancé de `06-race_condition_hunter.md`. Ici on ne se contente pas
> de reproduire : on **instrumente**, on **falsifie** et on distingue une
> observation empirique d'une garantie structurelle. Aucun nombre fini d'essais
> ne prouve à lui seul l'absence universelle d'une race.

## Principe

Une race condition ne se corrige pas par simple observation. Écris à l'avance
une **condition de falsification** : quel scénario violerait l'invariant, quel
signal serait observé et dans quel environnement. Les essais répétés mesurent
le comportement testé ; l'analyse du mécanisme et de la coordination établit la
portée de la garantie.

---

## 3 cas silencieux à chasser

### Cas 1 : Double clic sur un formulaire de soumission

- Symptôme : deux entrées créées, ou un paiement dupliqué.
- Fenêtre de course : entre le premier `click` et l'idempotency token posé.
- Piège : le bug disparaît en dev (latence < 50 ms) et sort en prod.
- Instrumentation : logger `event.timeStamp` + `requestId` côté client,
  corréler avec `Idempotency-Key` côté serveur.
- Remède candidat : désactiver le bouton **avant** l'`await`, pas après ;
  clé d'idempotence côté serveur avec une rétention alignée sur la fenêtre
  maximale de retry/rejeu et les obligations métier (pas une durée universelle).
- Vérification : envoie deux `POST` rapprochés et vérifie l'invariant avec
  la contrainte de stockage. Note le nombre d'essais et l'environnement ;
  zéro doublon observé n'est pas une preuve absolue.

### Cas 2 : Requête en vol lors du démontage du composant

- Symptôme : `setState` sur un composant démonté, ou données d'une vue N
  qui écrasent la vue N+1.
- Fenêtre de course : entre `fetch()` et le retour de la promesse, l'utilisateur
  a changé de route.
- Instrumentation : `AbortController` par montage + logger le `requestId` et
  le `mountId` ; assertion "un requestId ne peut committer un state que si
  son mountId est encore actif".
- Remède : `AbortController.abort()` dans le cleanup quand l'API le supporte ;
  ignorer aussi les réponses tardives avec un identifiant de requête/génération.
  L'annulation côté client ne prouve pas que le serveur n'a pas exécuté l'écriture.
- Vérification : alterne montages/démontages avec des réponses contrôlées et
  vérifie qu'une ancienne réponse ne valide jamais l'état de la nouvelle vue.

### Cas 3 : Cache LRU avec calcul asynchrone concurrent

- Symptôme : deux appels `get(key)` qui se chevauchent constatent tous les deux
  un cache miss et lancent deux `compute(key)` ; un résultat ancien peut aussi
  écraser une valeur plus récente si le cache ne définit pas sa politique d'écriture.
- Fenêtre de course : après le cache miss, pendant `await compute(key)`, avant
  l'écriture du résultat. Sur un agent JavaScript, le code synchrone n'est pas
  interrompu au milieu ; l'entrelacement se fait aux points de suspension.
- Instrumentation : compteur simple des appels à `compute()` dans ce processus,
  identifiant de requête et journal de l'ordre des résolutions. `Atomics` n'est
  pas nécessaire pour ce compteur local ; il concerne une mémoire réellement partagée.
- Remède dans **un seul agent/processus** : coalescing, en plaçant immédiatement
  la `Promise` en vol dans la Map avant de céder la main, afin que les appels
  locaux partagent le même calcul.
- Limite : une `Map` locale ne coordonne pas des Workers, processus ou machines
  distincts. À cette échelle, il faut une coordination partagée, une contrainte
  persistante ou accepter/traiter explicitement les calculs dupliqués.
- Vérification : mesure les appels dans le périmètre local, puis vérifie séparément
  le comportement multi-processus si cette garantie est requise.

---

## Boîte à outils d'instrumentation

- `AsyncLocalStorage` (Node) pour propager un `traceId` sans polluer les signatures.
- `performance.now()` est monotone dans un même contexte et utile pour les durées ;
  ses valeurs ne se comparent pas entre machines. `Date.now()` suit l'horloge civile
  et peut être ajustée.
- Journal d'ordonnancement : un buffer append-only peut réduire l'intrusion ;
  toute instrumentation peut néanmoins changer le timing. Ne suppose pas que
  `console.log` est synchrone dans tous les runtimes.
- Chaos léger : injecter `await new Promise(r => setTimeout(r, Math.random()*50))`
  aux points suspects pour élargir la fenêtre.

## Condition de falsification écrite

Avant de dire "c'est corrigé", tu écris **dans le PR** :

```text
Invariant attendu : ...
Scénario qui le violerait : ...
Contrôle structurel (transaction, verrou, version, idempotence) : ...
Essais empiriques : N runs, charge, délais injectés, plateforme, résultats : ...
Limites de preuve / périmètre non testé : ...
```

Le nombre d'essais se justifie selon le risque et les moyens disponibles ;
10 000 n'est pas un seuil universel. La review doit examiner le mécanisme,
les preuves et leurs limites, pas cocher un compte rond.

## Livrables

- `HYPOTHESES.md` (voir `02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/07-HYPOTHESES_TEMPLATE.md`).
- Script de reproduction contrôlée, avec nombre d'essais justifié.
- Fix + test qui détecte l'ancien défaut.
- Condition de falsification écrite et limites de preuve.
- ADR (`02-CONSTRUCTION/02-MINI-PROJECTS/97-templates/03-ADR_TEMPLATE.md`).

## CHECKPOINT DE PROFONDEUR : variation J : conflit d'acteurs

Ajoute deux parties prenantes dont les objectifs se contredisent. Quelle décision technique proposes-tu ? Qui gagne, qui perd, quelle incitation perverse apparait et quelle preuve permettrait de renégocier l'accord ?

### Transfert : changer de contexte

Applique le mécanisme de « 07b : Race Condition Hunt (bouclier senior) » à une autre ressource partagée ou à plusieurs instances d'un service. Explique comment la portée de coordination change, quel invariant doit rester vrai et quelle preuve permet de confirmer que tu n'as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: errors -->

## Repères de décision

- **Pourquoi :** Une politique d'erreur explicite empêche un échec temporaire de devenir une boucle infinie et évite de cacher un défaut métier derrière un message vague.
- **Quand l’utiliser / quand l’éviter :** Classe l'erreur selon sa cause et sa récupérabilité. Retry uniquement les erreurs transitoires et les opérations idempotentes ; remonte les violations métier et sécurité sans boucle automatique.
- **Limites :** Un `catch` trop large masque la cause. Un retry peut amplifier une panne et doubler un effet ; une erreur personnalisée ne rend pas un message sûr à exposer au client.

## Mécanisme : la version sans magie

Capture au niveau qui peut décider, enrichis avec le contexte utile, transforme en contrat stable et préserve la cause originale pour le diagnostic.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **07b : Race Condition Hunt (bouclier senior)** se rattache à ce cas concret : La création de demande Kintana doit distinguer validation, refus d'accès, conflit d'idempotence, timeout fournisseur et panne de base.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Contrat d'erreur stable pour l'API Kintana

> **Arc Walking Dead :** une erreur n'est pas toujours un zombie à abattre. Certaines se récupèrent ; d'autres doivent arrêter la mission immédiatement.

**Mission liée à « 07b : Race Condition Hunt (bouclier senior) » :** Définis les erreurs du parcours de création de demande. Ajoute une conversion stable vers les réponses API, une politique retry par classe et des tests qui vérifient qu'un secret ou une pile interne ne fuit pas.

**Livrable :** un catalogue d'erreurs, un mapper HTTP, des tests de contrat et une table de décision retry/no-retry.

**Critères d’acceptation :** les erreurs métier, techniques et de sécurité sont séparées ; les causes sont conservées côté serveur ; aucun retry n'est fait sur opération non idempotente sans clé ; les réponses client restent stables.

**Transfert obligatoire :** Ajoute une panne fournisseur qui récupère après deux tentatives et compare le comportement avec une validation refusée.
