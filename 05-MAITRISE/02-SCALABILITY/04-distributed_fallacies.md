---
stability: intemporel
last_reviewed: 2026-10-31
acte: comprendre
cognitive_level: L3
perturbation_modes: [defaut_cache, decision_organisationnelle]
anti_recipe_key: defaut_cache+decision_organisationnelle
transfer_distance: high
assessment_role: instructional_checkpoint
---

> **SCÈNE CRAZYDEVS : Mur Maria :** découper un système, c'est choisir où placer les murs et surtout où ne pas en mettre. Chaque frontière doit payer son loyer en autonomie, résilience ou changement futur.

# Les 8 sophismes du distribué (fallacies)

Temps de lecture ~5 min

> **REPÈRES HISTORIQUES** : ces avertissements sont notamment associés aux travaux
> de Peter Deutsch et à Sun Microsystems. Ils restent utiles pour raisonner sur le
> distribué, mais ne sont pas des lois universelles : protocoles, outils et garanties
> concrètes évoluent et doivent être vérifiés dans leur contexte.

Chaque sophisme est une **croyance implicite fausse** que ton code trahit
souvent sans que tu le saches.

## Les 8

1. **Le réseau est fiable.** → Il ne l'est pas. Toute opération distante à durée bornée a besoin d'une deadline ou d'un timeout adapté ; une connexion longue demande aussi une politique d'inactivité, de heartbeat et de fermeture.
2. **La latence est nulle.** → 100 appels séquentiels = 100 × RTT.
3. **La bande passante est infinie.** → Payload matters. Compresse, pagine.
4. **Le réseau est sécurisé.** → Chiffre en transit, jamais de "trust the LAN".
5. **La topologie ne change pas.** → Elle change (scaling, panne, DNS).
6. **Il y a un seul administrateur.** → Il y a N équipes, N horaires.
7. **Le coût de transport est nul.** → Egress cloud = cher (FinOps).
8. **Le réseau est homogène.** → HTTP/1, HTTP/2, gRPC, mobile 3G, edge…

## 5 outils universels

### Idempotence

`POST /transfer` avec `Idempotency-Key: uuid`. Rejouer = même effet.

### Retry avec backoff exponentiel + jitter

<!-- AF-DIAGRAM:retry -->

```text
┌────────┐   fail   ┌─────────┐   wait   ┌────────┐
│ call 1 │─────────►│ backoff │────────►│ call 2 │
└────────┘          └─────────┘          └────┬───┘
                                              │ fail
                                              ▼
                                        wait plus long
```

Un retry sain combine décision de retry, délai de backoff et limite d’essais pour éviter d’amplifier la panne.

```js
async function retry(
  fn,
  { maxAttempts = 3, baseDelayMs = 100, shouldRetry = () => false } = {},
) {
  if (typeof fn !== "function")
    throw new TypeError("fn doit être une fonction");
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new RangeError("maxAttempts doit être un entier >= 1");
  }
  if (!Number.isFinite(baseDelayMs) || baseDelayMs < 0) {
    throw new RangeError("baseDelayMs doit être un nombre fini >= 0");
  }
  if (typeof shouldRetry !== "function")
    throw new TypeError("shouldRetry doit être une fonction");
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      const decision = shouldRetry(error);
      if (typeof decision !== "boolean") {
        throw new TypeError(
          "shouldRetry doit retourner un booléen de façon synchrone",
        );
      }
      if (!decision) throw error;
      const plafond = Math.min(30_000, baseDelayMs * 2 ** (attempt - 1));
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * plafond),
      );
    }
  }
}
```

Le **full jitter** tire chaque attente dans `[0, plafond]` ; les délais ne sont donc
pas exactement 100 ms puis 200 ms. Le prédicat doit reconnaître des erreurs réellement
transitoires ; la limite d'essais ne protège pas d'un effet métier dupliqué.
Ne rejoue une opération que si elle est idempotente ou protégée par une clé / déduplication.

### Timeouts

Toute opération distante à durée bornée a besoin d'une deadline ou d'un timeout
adapté au client. Une connexion longue (WebSocket, flux, abonnement) demande plutôt
une politique d'inactivité, des heartbeats et une fermeture explicite. Avec `fetch`,
`AbortSignal.timeout(ms)` ou un `AbortController` permet d'annuler l'attente côté
client. L'annulation ne prouve pas que le serveur n'a pas déjà exécuté l'opération :
les écritures doivent aussi gérer l'idempotence et l'incertitude de résultat.

### Circuit breaker (conceptuel)

<!-- AF-DIAGRAM:circuit_breaker -->

```text
           seuil d'échecs consécutifs atteint
[ CLOSED ] ─────────────────► [ OPEN ]
     ▲                            │
     │ succès de la sonde         │ délai écoulé
     │                            ▼
     └────────────── [ HALF-OPEN ]
```

Le circuit breaker protège une dépendance en passant de trafic normal à ouvert,
puis en testant prudemment la récupération. Dans cette variante simple, `open` est
déclenché après N échecs consécutifs ; d'autres implémentations utilisent une fenêtre
de temps et un taux d'échec, qu'il faut alors définir explicitement.

Trois états : `closed` (normal) → `open` (les appels sont court-circuités)
→ `half-open` (une sonde représentative est autorisée). Un simple ping réseau ne
prouve pas que le parcours métier fonctionne. Cela évite d'amplifier une panne d'une
dépendance déjà malade.

### Exactly-once : préciser la frontière de garantie

Dire « exactly-once est toujours impossible » est trop catégorique. Certains systèmes
peuvent garantir un traitement ou un commit unique **dans un périmètre technique défini**
(par exemple une transaction ou un flux intégré au broker). Cela ne garantit pas
automatiquement un effet unique dans un service externe non coordonné.

Pour une application avec rejeux, `at-least-once` + déduplication atomique / idempotence
peut produire un effet métier unique **dans le périmètre où la clé et l'effet sont
coordonnés**. Un e-mail ou un paiement externe nécessite aussi un contrat d'idempotence
côté fournisseur, un outbox/inbox ou une réconciliation. Ne promets jamais « exactement
une fois » sans nommer la frontière et les défaillances couvertes.

## Exercice de modélisation

Un tir au but est validé pendant un match. Le serveur :

1. écrit le but en DB,
2. appelle le service de stats externes,
3. envoie une notification au coach.

Dessine sur papier :

- Que se passe-t-il si (2) répond après le timeout de l'arbitre vidéo ?
- Que se passe-t-il si (3) réussit mais (1) est rollback (le but n'est plus en DB) ?
- Quelle propriété manque pour rendre le retour au tableau d'affichage "sûr" ?

Réponse : la **transaction sortante** (outbox pattern). Cherche pourquoi,
puis écris ta réponse dans `MODELE.md`.

## (attention) Ce que l'analogie "appel de fonction" cache

Un appel réseau **ressemble** à un appel de fonction (même syntaxe `await`).
Il n'en est pas un : il peut échouer, être dupliqué, arriver hors ordre,
partir sans jamais revenir. Traite-le comme tel.

## Transférable

Ces 8 fallacies sont vraies en Go, Java, Rust, Python. Le vocabulaire "queue,
consumer, backoff" est identique. Le module reste valide sans JS.

## CHECKPOINT DE PROFONDEUR : variation I : reconstruction sans template

Ferme la page et écris de mémoire : problème → mécanisme → invariant → décision → limite. Tu n'as pas le droit d'utiliser le vocabulaire de la section comme structure imposée. Compare ensuite ta reconstruction avec la source et note ce qui manquait.

### Transfert : changer de contexte

Applique le mécanisme de « Les 8 sophismes du distribué (fallacies) » à une panne partielle avec retard, duplication et ordre différent. Explique ce qui reste invariant, ce qui doit changer et quelle preuve te permet de confirmer que tu n’as pas simplement mémorisé le cas initial.

**Preuve à conserver :** le raisonnement ou l’artefact produit, le résultat observé, les hypothèses et une limite non démontrée.

<!-- AF-LESSON-PROFILE: performance -->

## Repères de décision

- **Pourquoi :** La performance influence l'expérience utilisateur et le coût d'exploitation. Il faut repérer le goulot réel avant de changer l'algorithme, le cache ou la mémoire.
- **Quand l’utiliser / quand l’éviter :** Mesure avant toute optimisation. Utilise profiling et benchmark sur une charge représentative ; évite un micro-benchmark qui n'observe pas le chemin de production.
- **Limites :** Un benchmark local ne prédit pas exactement la production. Les caches chauds, le GC, le matériel, la concurrence et la distribution des données peuvent changer le résultat.

## Mécanisme : la version sans magie

Établis une baseline, profile, identifie le coût dominant, change une seule variable, relance plusieurs fois et compare quantiles et mémoire.

## Ancrage produit / terrain : Kintana

Dans [Kintana](../../06-ANNEXES-TRANSVERSES/77-FIL-ROUGE-KINTANA/README.md), **Les 8 sophismes du distribué (fallacies)** se rattache à ce cas concret : Sur Kintana, la liste des demandes ou l'agrégation des créneaux peut devenir lente à mesure que le nombre de demandes augmente.

**À observer :** le comportement attendu, le cas d'échec, la trace ou mesure utile et le niveau de preuve. Étiquette `CONCEPT`, `LAB`, `SIMULATION`, `PILOT` ou `PRODUCTION` selon ce qui a réellement été fait. Une fixture synthétique n'est pas une observation de terrain.

## Mission utile : Kintana : Mettre à l’épreuve une hypothèse distribuée

**Mission liée à « Les 8 sophismes du distribué (fallacies) » :** Choisis deux hypothèses classiques (réseau fiable, latence nulle, bande passante infinie, topologie stable, etc.) et construis pour Kintana un contre-scénario qui montre l’impact sur le métier.

**Livrable :** Table hypothèse/contre-exemple/impact/mitigation et séquence d’incident.

**Critères d’acceptation :** Chaque contre-exemple décrit un mécanisme concret ; la mitigation ne masque pas le coût ; la simulation est étiquetée comme telle.

**Transfert obligatoire :** Une mitigation limite le symptôme mais pas la cause : indique le risque résiduel.
